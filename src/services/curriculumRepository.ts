/**
 * Central Curriculum & Progress Data Repository (Cloud Firestore)
 *
 * Cost-Optimized Strategy:
 * - CACHE_FIRST Policy with in-memory + persistentLocalCache.
 * - getTopics(): loads topics list once (topics/{topic_id}).
 * - getTopic(topicId): exactly 1 document read containing lessons_metadata.
 * - getLesson(topicId, lessonId): exactly 1 document read containing theory_pill + tasks array.
 * - Repeated navigation between screens inside fetched topics/lessons costs 0 extra reads!
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { resolveCurriculum, clearCurriculumSources } from './curriculumSource';
import { readFirestoreTaskBank } from './firestoreTaskBank';
import { offlineSubjects, offlineTopics, offlineLesson, offlineTasks, offlineExam, offlinePracticeTasks, offlineStudyCatalog, subjectId as canonicalSubject } from '../data/offline/catalog';
import {
  TopicDocument,
  LessonDocument,
  UserTopicProgressDocument,
  SubjectDocument
} from '../schema_firestore';
import { MaturaTask } from '../types';
import { normalizeTask } from '../data/mathTasks';
import { enrichTaskWithVisual } from '../data/mathVisualRegistry';

export const DEFAULT_SUBJECT_ID = 'matematyka-podstawowa';

const isTestEnv = typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || typeof (process.env as any).VITEST !== 'undefined');

export const CURRICULUM_CACHE_VERSION = 3;
export const CURRICULUM_CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

interface CurriculumCacheEnvelope<T> {
  version: number;
  timestamp: number;
  data: T;
}

export function getFromCurriculumStorage<T>(key: string): { data: T; isStale: boolean } | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const envelope = JSON.parse(raw) as CurriculumCacheEnvelope<T>;
    if (!envelope || envelope.version !== CURRICULUM_CACHE_VERSION || envelope.data === undefined) {
      return null;
    }
    const isStale = Date.now() - (envelope.timestamp || 0) > CURRICULUM_CACHE_TTL_MS;
    return { data: envelope.data, isStale };
  } catch {
    return null;
  }
}

export function saveToCurriculumStorage<T>(key: string, data: T): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const envelope: CurriculumCacheEnvelope<T> = {
      version: CURRICULUM_CACHE_VERSION,
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // If QuotaExceededError, prune older lesson entries and retry
    try {
      const keys: string[] = Object.keys(localStorage);
      keys.filter(k => k.startsWith('jasne_curriculum_lesson_')).forEach(k => localStorage.removeItem(k));
      const envelope: CurriculumCacheEnvelope<T> = {
        version: CURRICULUM_CACHE_VERSION,
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(key, JSON.stringify(envelope));
    } catch {}
  }
}

// In-Memory Caches for zero unnecessary reads within the app session
let subjectsCache: SubjectDocument[] | null = null;
const topicsBySubjectCache = new Map<string, TopicDocument[]>();
const topicByIdCache = new Map<string, TopicDocument>();
const lessonCache = new Map<string, LessonDocument>();
const ckeExamTasksCache = new Map<string, MaturaTask[]>();
/** Lekcje po samym lessonId — potrzebne, gdy znamy tylko identyfikator lekcji. */
const lessonByIdCache = new Map<string, LessonDocument>();
const userTopicProgressCache = new Map<string, UserTopicProgressDocument>();

export function __clearCurriculumMemoryAndStorageForTests(): void {
  clearCurriculumSources();
  subjectsCache = null;
  topicsBySubjectCache.clear();
  topicByIdCache.clear();
  lessonCache.clear();
  lessonByIdCache.clear();
  ckeExamTasksCache.clear();
  userTopicProgressCache.clear();
  if (typeof localStorage !== 'undefined') {
    const keys: string[] = Object.keys(localStorage);
    keys.filter(k => k.startsWith('jasne_curriculum_')).forEach(k => localStorage.removeItem(k));
  }
}

/** Ujednolica klucze lekcji zachowując przedrostek przedmiotu (np. 'pol-lesson-1-1' -> 'pol-1.1', 'lesson-1-1' -> '1.1') */
export function normalizeLessonKey(lessonId: string): string {
  const str = String(lessonId || '').toLowerCase();
  if (str.startsWith('pol-')) {
    const after = str.replace(/^pol-(?:lesson-)?/, '');
    return `pol-${after.replace(/-/g, '.')}`;
  }
  return str.replace(/^lesson-/, '').replace(/-/g, '.');
}

/**
 * Generuje wszystkie równoważne warianty identyfikatora lekcji
 * (np. '1.1' <-> 'lesson-1-1', 'pol-1.1' <-> 'pol-lesson-1-1' <-> 'pol-1-1').
 */
export function getLessonKeyVariants(lessonId: string): string[] {
  if (!lessonId) return [];
  const raw = String(lessonId).trim().toLowerCase();
  const clean = normalizeLessonKey(raw);
  const variants = new Set<string>([raw, clean]);

  if (raw.startsWith('pol-')) {
    const after = raw.replace(/^pol-(?:lesson-)?/, '');
    const dotForm = `pol-${after.replace(/-/g, '.')}`;
    const dashForm = `pol-${after.replace(/\./g, '-')}`;
    const lessonDashForm = `pol-lesson-${after.replace(/\./g, '-')}`;
    variants.add(dotForm);
    variants.add(dashForm);
    variants.add(lessonDashForm);
  } else {
    const cleanNoPrefix = clean.replace(/^lesson-/, '');
    const dotForm = cleanNoPrefix.replace(/-/g, '.');
    const dashForm = cleanNoPrefix.replace(/\./g, '-');
    variants.add(dotForm);
    variants.add(`lesson-${dashForm}`);
    variants.add(`lesson-${dotForm}`);
  }
  return Array.from(variants).filter(Boolean);
}

export const curriculumRepository = {
  /**
   * Fetches all registered subjects (e.g. Matematyka Podstawowa, Język Polski, etc.).
   */
  async getSubjects(): Promise<SubjectDocument[]> {
    return resolveCurriculum('subjects', async () => {
      const snapshot = await getDocs(collection(db, 'subjects'));
      if (snapshot.empty) throw new Error('Subjects not published');
      const subjects: SubjectDocument[] = [];
      snapshot.forEach(d => subjects.push({ ...d.data(), id: d.id } as SubjectDocument));
      return subjects;
    }, offlineSubjects);
  },

  /**
   * Fetches a single subject metadata document: subjects/{subjectId}.
   */
  async getSubject(subjectId: string = DEFAULT_SUBJECT_ID): Promise<SubjectDocument | null> {
    subjectId = canonicalSubject(subjectId);
    return resolveCurriculum(`subject/${subjectId}`, async () => {
      const snapshot = await getDoc(doc(db, 'subjects', subjectId));
      if (!snapshot.exists()) throw new Error('Subject not published');
      return { ...snapshot.data(), id: snapshot.id } as SubjectDocument;
    }, async () => (await offlineSubjects()).find(s => s.id === subjectId) || null);
  },

  /**
   * Fetches all topic cards (metadata + lessons_metadata) for a subject.
   * Reads the published subject hierarchy; the shared resolver owns cache and offline recovery.
   * Reads from RAM cache -> localStorage persistent cache -> Firestore.
   */
  async getTopics(subjectId: string = DEFAULT_SUBJECT_ID): Promise<TopicDocument[]> {
    subjectId = canonicalSubject(subjectId);
    const topics = await resolveCurriculum(`topics/${subjectId}`, async () => {
      const subject = await this.getSubject(subjectId);
      const snapshot = await getDocs(query(collection(db, 'subjects', subjectId, 'topics')));
      if (snapshot.empty) throw new Error('No published topics');
      const list: TopicDocument[] = [];
      snapshot.forEach(d => {
        const data = d.data() as TopicDocument;
        list.push({ ...data, id: d.id, name: data.name || data.title || d.id, title: data.title || data.name || d.id, lessons_metadata: data.lessons_metadata || [] });
      });
      const activeIds = (subject as any)?.publishedTopicIds;
      const active = Array.isArray(activeIds) ? list.filter(t => activeIds.includes(t.id)) : list;
      if (Array.isArray(activeIds) && active.length !== activeIds.length) throw new Error('Incomplete published curriculum');
      saveToCurriculumStorage(`jasne_curriculum_topics_${subjectId}_v1`, active);
      return active.sort((a, b) => (a.numericId || 0) - (b.numericId || 0));
    }, () => offlineTopics(subjectId));
    topicsBySubjectCache.set(subjectId, topics);
    for (const topic of topics) topicByIdCache.set(`${subjectId}/${topic.id}`, topic);
    return topics;
  },



  /**
   * Fetches a single topic document: subjects/{subjectId}/topics/{topicId} or topics/{topicId}.
   * Exactly 1 document read.
   */
  async getTopic(topicId: string, subjectId: string = DEFAULT_SUBJECT_ID): Promise<TopicDocument | null> {
    const topics = await this.getTopics(canonicalSubject(subjectId));
    return topics.find(t => t.id === topicId || t.name === topicId || t.title === topicId) || null;
  },

  /**
   * Fetches full lesson document:
   * subjects/{subjectId}/topics/{topicId}/lessons/{lessonId} or topics/{topicId}/lessons/{lessonId}.
   * Contains theory_pill and full tasks array.
   * Exactly 1 document read. Cached in-memory & localStorage afterwards (0 reads on revisit/refresh).
   */
  async getLesson(topicId: string, lessonId: string, subjectId: string = DEFAULT_SUBJECT_ID): Promise<LessonDocument | null> {
    subjectId = canonicalSubject(subjectId);
    const lesson = await resolveCurriculum(`lesson/${subjectId}/${topicId}/${lessonId}`, async () => {
      for (const id of getLessonKeyVariants(lessonId)) {
        const snapshot = await getDoc(doc(db, 'subjects', subjectId, 'topics', topicId, 'lessons', id));
        if (!snapshot.exists()) continue;
        const data = snapshot.data() as LessonDocument;
        const result = { ...data, id: snapshot.id, topic_id: topicId, tasks: (data.tasks || []).map((task: any) => enrichTaskWithVisual(normalizeTask(task, { id: snapshot.id, title: data.title }, { id: topicId }))) };
        for (const variant of getLessonKeyVariants(lessonId)) {
          saveToCurriculumStorage(`jasne_curriculum_lesson_${subjectId}_${variant}_v1`, result);
          saveToCurriculumStorage(`jasne_curriculum_lesson_${subjectId}_${topicId}_${variant}_v1`, result);
        }
        return result;
      }
      throw new Error('Lesson not published');
    }, () => offlineLesson(subjectId, topicId, lessonId));
    if (lesson) for (const id of new Set([...getLessonKeyVariants(lessonId), ...getLessonKeyVariants(lesson.id)])) {
      lessonCache.set(`${subjectId}/${topicId}/${id}`, lesson);
      lessonByIdCache.set(`${subjectId}:${id}`, lesson);
    }
    return lesson;
  },

  /**
   * Zwraca lekcję z pamięci podręcznej po samym lessonId ('lesson-1-1' / '1.1' / 'pol-lesson-1-1').
   * Sprawdza pamięć RAM oraz trwały cache localStorage.
   */
  getCachedLesson(lessonId: string, subjectId?: string): LessonDocument | null {
    const subject = canonicalSubject(subjectId || (lessonId.startsWith('pol-') ? 'pol' : lessonId.startsWith('eng-') ? 'eng' : DEFAULT_SUBJECT_ID));
    for (const id of getLessonKeyVariants(lessonId)) {
      const lesson = lessonByIdCache.get(`${subject}:${id}`);
      if (lesson) return lesson;
      const saved = getFromCurriculumStorage<LessonDocument>(`jasne_curriculum_lesson_${subject}_${id}_v1`);
      if (saved && !saved.isStale) {
        lessonByIdCache.set(`${subject}:${id}`, saved.data);
        return saved.data;
      }
    }
    if (typeof localStorage !== 'undefined') {
      const variants = getLessonKeyVariants(lessonId);
      for (const key of Object.keys(localStorage).filter(k => k.startsWith(`jasne_curriculum_lesson_${subject}_`))) {
        const saved = getFromCurriculumStorage<LessonDocument>(key);
        if (saved && !saved.isStale && variants.includes(saved.data.id)) {
          for (const id of variants) lessonByIdCache.set(`${subject}:${id}`, saved.data);
          return saved.data;
        }
      }
    }
    return null;
  },

  /**
   * Dociąga lekcję, jeśli nie ma jej jeszcze w pamięci (np. wznowienie sesji
   * z localStorage albo wejście z egzaminu działowego).
   * Sprawdza cache synchroniczny, a w razie braku topicId dedukuje go z metadanych lub formatu ID.
   */
  async ensureLessonLoaded(
    lessonId: string,
    topicId?: string,
    subjectId: string = DEFAULT_SUBJECT_ID
  ): Promise<LessonDocument | null> {
    subjectId = canonicalSubject(subjectId);
    const cached = this.getCachedLesson(lessonId, subjectId);
    if (cached) return cached;

    const variants = getLessonKeyVariants(lessonId);

    let resolvedTopicId = topicId;
    if (!resolvedTopicId) {
      // 1. Sprawdź czy temat da się odnaleźć w liście tematów z RAM lub localStorage
      const topics = topicsBySubjectCache.get(subjectId) ||
        getFromCurriculumStorage<TopicDocument[]>(`jasne_curriculum_topics_${subjectId}_v1`)?.data;
      if (topics && Array.isArray(topics)) {
        const found = topics.find(t =>
          t.lessons_metadata?.some(m => variants.includes(m.id) || variants.includes(normalizeLessonKey(m.id)))
        );
        if (found) resolvedTopicId = found.id;
      }

      // 2. Heurystyka z identyfikatora lekcji
      if (!resolvedTopicId) {
        if (lessonId.startsWith('pol-')) {
          const match = lessonId.match(/pol-(?:lesson-)?(\d+)/);
          if (match) resolvedTopicId = `pol-dzial-${match[1]}`;
        } else {
          const match = lessonId.match(/(?:lesson-)?(\d+)[.-]/) || lessonId.match(/^(\d+)\./);
          if (match) resolvedTopicId = `dzial-${match[1]}`;
        }
      }
    }

    if (!resolvedTopicId) {
      // Ostateczna próba: pobierz listę tematów i wyszukaj lekcję
      try {
        const topics = await this.getTopics(subjectId);
        const found = topics.find(t =>
          t.lessons_metadata?.some(m => variants.includes(m.id) || variants.includes(normalizeLessonKey(m.id)))
        );
        if (found) resolvedTopicId = found.id;
      } catch {}
    }

    if (!resolvedTopicId) return null;
    return this.getLesson(resolvedTopicId, lessonId, subjectId);
  },

  /**
   * Pobiera wszystkie lekcje działu (na podstawie lessons_metadata).
   * Koszt: 1 odczyt na lekcję, po pierwszym razie 0 (pamięć podręczna).
   * Używane do generowania egzaminów działowych.
   */
  async getTopicLessons(topicId: string, subjectId: string = DEFAULT_SUBJECT_ID): Promise<LessonDocument[]> {
    const topic = await this.getTopic(topicId, subjectId);
    if (!topic) return [];

    const lessons: LessonDocument[] = [];
    for (const meta of topic.lessons_metadata || []) {
      const lesson = await this.getLesson(topicId, meta.id, subjectId);
      if (lesson) lessons.push(lesson);
    }
    return lessons;
  },

  /**
   * Filary przedmiotu (język polski). Treść pochodzi z dokumentu subjects/{id}.
   */
  async getSubjectPillars(subjectId: string = DEFAULT_SUBJECT_ID): Promise<any[]> {
    const subject = await this.getSubject(subjectId);
    if (subject?.pillars && subject.pillars.length > 0) {
      return subject.pillars;
    }
    return [];
  },

  /**
   * Fetches user's progress for a specific topic: users/{userId}/progress/{topicId}.
   */
  async getUserTopicProgress(userId: string, topicId: string): Promise<UserTopicProgressDocument | null> {
    if (!userId || !topicId) return null;
    const cacheKey = `${userId}/${topicId}`;
    if (userTopicProgressCache.has(cacheKey)) {
      return userTopicProgressCache.get(cacheKey)!;
    }

    try {
      const progRef = doc(db, 'users', userId, 'progress', topicId);
      const snap = await getDoc(progRef);
      if (snap.exists()) {
        const data = snap.data() as UserTopicProgressDocument;
        userTopicProgressCache.set(cacheKey, data);
        return data;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Error fetching progress for ${cacheKey}:`, err);
    }

    const defaultProg: UserTopicProgressDocument = {
      topic_id: topicId,
      completedLessons: {},
      completedTasks: [],
      taskStars: {},
      mistakesCount: 0,
      unlockedItems: [],
      updatedAt: new Date().toISOString()
    };
    return defaultProg;
  },

  /**
   * Saves user's progress for a specific topic: users/{userId}/progress/{topicId}.
   */
  async saveUserTopicProgress(
    userId: string,
    topicId: string,
    progress: Partial<UserTopicProgressDocument>
  ): Promise<void> {
    if (!userId || !topicId) return;
    const cacheKey = `${userId}/${topicId}`;

    const existing = userTopicProgressCache.get(cacheKey) || {
      topic_id: topicId,
      completedLessons: {},
      completedTasks: [],
      taskStars: {},
      mistakesCount: 0,
      unlockedItems: [],
      updatedAt: new Date().toISOString()
    };

    const updated: UserTopicProgressDocument = {
      ...existing,
      ...progress,
      topic_id: topicId,
      updatedAt: new Date().toISOString()
    };

    userTopicProgressCache.set(cacheKey, updated);

    try {
      const progRef = doc(db, 'users', userId, 'progress', topicId);
      await setDoc(progRef, updated, { merge: true });
    } catch (err) {
      console.warn(`[curriculumRepository] Error saving progress for ${cacheKey}:`, err);
    }
  },

  /**
   * Helper to retrieve all tasks loaded in memory across lessons.
   */
  getAllCachedTasks(): any[] {
    const tasks: any[] = [];
    lessonCache.forEach(lesson => {
      if (Array.isArray(lesson.tasks)) {
        tasks.push(...lesson.tasks);
      }
    });
    return tasks;
  },

  /**
   * Pobiera zbiór oficjalnych zadań CKE / arkuszy maturalnych z Firestore: exams/{docId}.
   * Zgodnie z zasadą Cache-First (1 odczyt na sesję).
   */
  async getCkeExamTasks(subjectId: string = DEFAULT_SUBJECT_ID): Promise<MaturaTask[]> {
    subjectId = canonicalSubject(subjectId);
    const id = subjectId === DEFAULT_SUBJECT_ID ? 'matura-podstawowa' : `matura-${subjectId}`;
    return resolveCurriculum(`exams/${id}`, async () => {
      try {
        return await readFirestoreTaskBank(subjectId, 'exam');
      } catch { /* Existing deployments may only expose the legacy exams document. */ }
      const snapshot = await getDoc(doc(db, 'exams', id));
      if (!snapshot.exists() || !Array.isArray(snapshot.data().tasks)) throw new Error('Exam bank not published');
      return snapshot.data().tasks as MaturaTask[];
    }, () => offlineTasks(subjectId));
  },

  async getPracticeTasks(subjectId: string): Promise<any[]> {
    subjectId = canonicalSubject(subjectId);
    return resolveCurriculum(`practice/${subjectId}`, async () => {
      return readFirestoreTaskBank(subjectId, 'practice');
    }, () => offlinePracticeTasks(subjectId));
  },

  async getStudyCatalog(subjectId: string): Promise<{ lessons: any[]; sections: any[]; epochs: any[] }> {
    subjectId = canonicalSubject(subjectId);
    return resolveCurriculum(`study/${subjectId}`, async () => {
      const entries = await readFirestoreTaskBank(subjectId, 'study');
      const byKind = (kind: string) => entries.filter(e => e.kind === kind).map(e => e.data);
      return { lessons: byKind('lesson'), sections: byKind('section'), epochs: byKind('epoch') };
    }, () => offlineStudyCatalog(subjectId));
  },

  /**
   * Pobiera konkretny arkusz maturalny z Firestore: exams/{examId}.
   * Zgodnie z zasadą Cache-First.
   */
  async getCkeExamSheet(examId: string): Promise<MaturaTask[]> {
    return resolveCurriculum(`exams/${examId}`, async () => {
      const snapshot = await getDoc(doc(db, 'exams', examId));
      if (!snapshot.exists() || !Array.isArray(snapshot.data().tasks)) throw new Error('Exam not published');
      return snapshot.data().tasks as MaturaTask[];
    }, () => offlineExam(examId));
  },

  /**
   * Clears in-memory caches if manual refresh is requested.
   */
  clearCache(): void {
    clearCurriculumSources(true);
    subjectsCache = null;
    topicsBySubjectCache.clear();
    topicByIdCache.clear();
    lessonCache.clear();
    lessonByIdCache.clear();
    ckeExamTasksCache.clear();
    userTopicProgressCache.clear();
  }
};

