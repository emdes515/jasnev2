import type { LessonDocument, TopicDocument, SubjectDocument } from '../../schema_firestore';

export function subjectId(id: string): string {
  return ({ math: 'matematyka-podstawowa', matematyka: 'matematyka-podstawowa', pol: 'jezyk-polski', polski: 'jezyk-polski', eng: 'jezyk-angielski', angielski: 'jezyk-angielski', 'math-roz': 'matematyka-rozszerzona', 'eng-roz': 'jezyk-angielski-rozszerzony' } as Record<string, string>)[id] || id;
}

export async function offlineSubjects(): Promise<SubjectDocument[]> {
  const englishPillars = (await import('./english/englishPillars')).ENGLISH_PILLARS;
  return [
    { id: 'matematyka-podstawowa', key: 'math', name: 'Matematyka', short_name: 'Matematyka', pillars: [] },
    { id: 'jezyk-polski', key: 'pol', name: 'Język Polski', short_name: 'Polski', pillars: [] },
    { id: 'jezyk-angielski', key: 'eng', name: 'Język Angielski', short_name: 'Angielski', pillars: englishPillars },
    { id: 'matematyka-rozszerzona', key: 'math-roz', name: 'Matematyka rozszerzona', short_name: 'Matematyka roz.', pillars: [] }
  ].map((s, index) => ({ ...s, formula: '2023', description: s.name, icon: 'BookOpen', color: '#FFB800', is_active: true, order: index + 1 } as SubjectDocument));
}

/** Single entry point for bundled emergency datasets. Never used before a Firestore/cache attempt. */
export async function offlineTopics(id: string): Promise<TopicDocument[]> {
  switch (subjectId(id)) {
    case 'jezyk-polski': return (await import('./polishCurriculumData')).POLISH_CURRICULUM_TOPICS;
    case 'jezyk-angielski': return (await import('./englishCurriculumData')).ENGLISH_CURRICULUM_TOPICS;
    case 'matematyka-rozszerzona': return (await import('./mathRozCurriculumData')).MATH_ROZ_CURRICULUM_TOPICS;
    case 'matematyka-podstawowa': return (await import('./mathCurriculumData')).MATH_CURRICULUM_TOPICS;
    default: return [];
  }
}

export async function offlineLesson(id: string, topic: string | undefined, lesson: string): Promise<LessonDocument | null> {
  switch (subjectId(id)) {
    case 'jezyk-polski': return (await import('./polishCurriculumData')).getPolishLessonDocument(topic, lesson);
    case 'jezyk-angielski': return (await import('./englishCurriculumData')).getEnglishLessonDocument(lesson, topic);
    case 'matematyka-rozszerzona': return (await import('./mathRozCurriculumData')).getMathRozLessonDocument(topic, lesson);
    case 'matematyka-podstawowa': return (await import('./mathCurriculumData')).getMathLessonDocument(topic, lesson);
    default: return null;
  }
}

export async function offlineTasks(id: string): Promise<any[]> {
  switch (subjectId(id)) {
    case 'jezyk-polski': return (await import('./polish')).ALL_POLISH_TASKS;
    case 'jezyk-angielski': return (await import('./english/allEnglishTasks')).ALL_ENGLISH_TASKS;
    case 'matematyka-podstawowa': return (await import('./math/ckeExamTasks')).getBundledCkeExamTasks();
    default: return [];
  }
}
export async function offlineExam(id: string): Promise<any[]> { return (await import('./math/ckeExamTasks')).getBundledCkeExamSheet(id); }

export async function offlinePracticeTasks(id: string): Promise<any[]> {
  switch (subjectId(id)) {
    case 'matematyka-podstawowa': return (await import('./math/generated/all_1500_tasks.json')).default;
    case 'matematyka-rozszerzona': return (await import('./math/generated/pr_tasks.json')).default;
    case 'jezyk-polski': return (await import('../tasks_polski')).ALL_POLISH_TASKS_800;
    case 'jezyk-angielski': return (await import('./english/allEnglishTasks')).ALL_ENGLISH_TASKS;
    default: return [];
  }
}

export async function offlineStudyCatalog(id: string): Promise<{ lessons: any[]; sections: any[]; epochs: any[] }> {
  if (subjectId(id) === 'jezyk-polski') {
    const data = await import('./polish');
    return { lessons: data.POLISH_LESSONS, sections: data.POLISH_SECTIONS, epochs: data.POLISH_EPOCHS };
  }
  if (subjectId(id) === 'jezyk-angielski') {
    const data = await import('./english/englishLessonsData');
    const { ENGLISH_SECTIONS } = await import('../../types/englishTypes');
    return { lessons: data.ENGLISH_LESSONS, sections: ENGLISH_SECTIONS, epochs: [] };
  }
  return { lessons: [], sections: [], epochs: [] };
}
