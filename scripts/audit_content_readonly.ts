/** Read-only inventory: local content and public Firestore curriculum. No user documents or writes. */
import fs from 'node:fs';
import crypto from 'node:crypto';
import { offlineSubjects, offlineTopics, offlineLesson, offlineTasks, offlinePracticeTasks } from '../src/data/offline/catalog';
import { taskProvenance } from '../src/lib/taskProvenance';

const cleanText = (value: any): string => typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value ? JSON.stringify(value) : '';
const text = (task: any) => cleanText(task.content || task.question || task.prompt || task.statement);
const semantic = (value: any): any => Array.isArray(value) ? value.map(semantic) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).filter(([key]) => !['id', 'isTrue', 'is_correct', 'explanation', 'correctAnswer', 'correct_answer'].includes(key)).map(([key, item]) => [key, semantic(item)])) : value;
const signature = (task: any) => JSON.stringify({ prompt: text(task), options: (task.options || []).map((option: any) => cleanText(typeof option === 'string' ? option : option.text || option.content)).sort(), context: ['contextText', 'sourceText', 'sourceTexts', 'texts', 'text1', 'text2', 'readingText', 'passage', 'passage2', 'transcriptSnippet', 'statements', 'trueFalseStatements', 'matchingPairs', 'distractors', 'parts', 'diagram', 'plot', 'numberLine', 'image', 'imageUrl', 'imageCaption', 'synthesisTheme'].map(key => semantic(task[key] ?? null)) });
const countBy = (items: any[], key: (item: any) => string) => items.reduce((counts, item) => { const name = key(item) || '(missing)'; counts[name] = (counts[name] || 0) + 1; return counts; }, {} as Record<string, number>);
function inspect(tasks: any[]) {
  const groups = new Map<string, any[]>();
  for (const task of tasks) { const key = signature(task); groups.set(key, [...(groups.get(key) || []), task]); }
  const duplicates = [...groups.values()].filter(group => group.length > 1).sort((a, b) => b.length - a.length);
  return {
    tasks: tasks.length,
    payloadKeys: [...new Set(tasks.flatMap(task => Object.keys(task)))],
    uniqueIds: new Set(tasks.map(task => task.id)).size,
    uniquePrompts: new Set(tasks.map(text)).size,
    uniquePromptAndOptions: groups.size,
    repeatedEntriesBeyondFirst: duplicates.reduce((sum, group) => sum + group.length - 1, 0),
    missingPrompt: tasks.filter(task => !text(task)).length,
    officialByMetadata: tasks.filter(task => taskProvenance(task).official).length,
    claimsCkeWithoutCompleteMetadata: tasks.filter(task => !taskProvenance(task).official && /cke/i.test(cleanText(task.source) + cleanText(task.cke_source) + cleanText(task.sourceYear))).length,
    byType: countBy(tasks, task => task.type),
    byTopic: countBy(tasks, task => task.topicId || task.topic_id || task.section),
    byExam: countBy(tasks.filter(task => taskProvenance(task).official), task => task.examId || task.id?.match(/^matura-\w+-\d{4}/)?.[0]),
    audio: tasks.filter(task => task.audioUrl || task.audio_url || task.audio || task.listeningAudio).length,
    largestDuplicates: duplicates.slice(0, 5).map(group => ({ count: group.length, ids: group.slice(0, 8).map(task => task.id), prompt: text(group[0]).slice(0, 200) })),
  };
}
function decode(field: any): any {
  if (field == null) return null;
  if ('stringValue' in field) return field.stringValue;
  if ('integerValue' in field) return Number(field.integerValue);
  if ('doubleValue' in field) return field.doubleValue;
  if ('booleanValue' in field) return field.booleanValue;
  if ('arrayValue' in field) return (field.arrayValue.values || []).map(decode);
  if ('mapValue' in field) return Object.fromEntries(Object.entries(field.mapValue.fields || {}).map(([key, value]) => [key, decode(value)]));
  return null;
}
async function publicDocument(path: string) {
  if (fs.existsSync('artifacts/critical-audit/public-firestore-snapshot.json')) {
    const snapshot = JSON.parse(fs.readFileSync('artifacts/critical-audit/public-firestore-snapshot.json', 'utf8'))[path];
    if (snapshot) return { status: snapshot.status, data: Object.fromEntries(Object.entries(snapshot.document?.fields || {}).map(([key, value]) => [key, decode(value)])) };
  }
  const response = await fetch(`https://firestore.googleapis.com/v1/projects/jasne-7efe7/databases/(default)/documents/${path}`, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) return { status: response.status };
  const json: any = await response.json();
  return { status: response.status, data: Object.fromEntries(Object.entries(json.fields || {}).map(([key, value]) => [key, decode(value)])) };
}
const result: any = { createdAt: new Date().toISOString(), methodology: 'Exact normalized prompt and sorted answer text; metadata is not proof of authenticity.', subjects: [] };
for (const subject of await offlineSubjects()) {
  const topics = await offlineTopics(subject.id);
  const lessons: any[] = [];
  for (const topic of topics) {
    for (const metadata of topic.lessons_metadata || []) {
      const lesson: any = await offlineLesson(subject.id, topic.id, metadata.id);
      const tasks = lesson?.tasks || [];
      lessons.push({ id: metadata.id, topic: topic.id, title: metadata.title || lesson?.title, tasks: tasks.length, uniquePrompts: new Set(tasks.map(text)).size, uniqueTasks: new Set(tasks.map(signature)).size, requiredCorrect: lesson?.required_correct_tasks, missing: !lesson, missingTheory: !lesson?.theory_pill, sample: subject.key === 'eng' && metadata.id === 'eng-lesson-1-1' ? tasks.map((task: any) => ({ id: task.id, prompt: text(task), topicId: task.topicId, source: task.source })) : undefined });
    }
  }
  const exam = await offlineTasks(subject.id), practice = await offlinePracticeTasks(subject.id);
  const cloud: any = {};
  for (const [name, bank] of [['exam', exam], ['practice', practice]] as const) {
    const manifest: any = await publicDocument(`subjects/${subject.id}/taskBanks/${name}`);
    const revision = crypto.createHash('sha256').update(JSON.stringify(bank)).digest('hex').slice(0, 16);
    cloud[name] = { status: manifest.status, count: manifest.data?.taskCount, revision: manifest.data?.revision, localRevision: revision, sameRevision: manifest.data?.revision === revision, chunkCount: manifest.data?.chunkIds?.length };
  }
  result.subjects.push({ id: subject.id, topics: topics.length, lessons: lessons.length, exam: inspect(exam), practice: inspect(practice), lessonSummary: { taskInstances: lessons.reduce((sum, lesson) => sum + lesson.tasks, 0), missing: lessons.filter(lesson => lesson.missing), noTasks: lessons.filter(lesson => !lesson.tasks), requiredExceedsUnique: lessons.filter(lesson => lesson.requiredCorrect > lesson.uniqueTasks), counts: countBy(lessons, lesson => `${lesson.tasks} tasks / ${lesson.uniqueTasks} unique`) }, lessonsDetail: lessons, publicFirestore: cloud });
}
const english: any = result.subjects.find((subject: any) => subject.id === 'jezyk-angielski');
const firstEnglish = english?.lessonsDetail.find((lesson: any) => lesson.id === 'eng-lesson-1-1');
if (firstEnglish) {
  const cloud: any = await publicDocument(`subjects/jezyk-angielski/topics/${firstEnglish.topic}/lessons/eng-lesson-1-1`);
  result.cloudEnglishFirstLesson = { status: cloud.status, summary: cloud.data ? inspect(cloud.data.tasks || []) : null, sample: cloud.data?.tasks?.slice(0, 2).map((task: any) => ({ id: task.id, prompt: text(task) })) };
}
result.englishExtended = { topics: (await offlineTopics('eng-roz')).length, examTasks: (await offlineTasks('eng-roz')).length, practiceTasks: (await offlinePracticeTasks('eng-roz')).length, publicSubject: await publicDocument('subjects/jezyk-angielski-rozszerzony') };
const publicSnapshot = JSON.parse(fs.readFileSync('artifacts/critical-audit/public-firestore-snapshot.json', 'utf8'));
const extendedLessons = Object.entries(publicSnapshot).filter(([path]) => path.startsWith('subjects/jezyk-angielski-rozszerzony/topics/') && path.endsWith('/lessons')).flatMap(([, snapshot]: any) => (snapshot.collection?.documents || []).map((document: any) => Object.fromEntries(Object.entries(document.fields || {}).map(([key, value]) => [key, decode(value)]))));
result.englishExtended.cloudLessons = extendedLessons.length;
result.englishExtended.cloudTasks = inspect(extendedLessons.flatMap(lesson => lesson.tasks || []));
fs.mkdirSync('artifacts/critical-audit', { recursive: true });
fs.writeFileSync('artifacts/critical-audit/content-inventory.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify({ subjects: result.subjects.map(({ lessonsDetail, ...subject }: any) => subject), cloudEnglishFirstLesson: result.cloudEnglishFirstLesson, englishExtended: result.englishExtended }, null, 2));
