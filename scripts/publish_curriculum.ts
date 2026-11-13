/** Dry-run by default. --publish writes verified content without deleting existing documents. */
import fs from 'node:fs';
import crypto from 'node:crypto';
import { initializeApp, cert } from 'firebase-admin/app';
import { initializeFirestore } from 'firebase-admin/firestore';
import { offlineSubjects, offlineTopics, offlineLesson, offlineTasks, offlinePracticeTasks, offlineExam, offlineStudyCatalog } from '../src/data/offline/catalog';

const clean = (data: any) => JSON.parse(JSON.stringify(data));
const size = (data: any) => Buffer.byteLength(JSON.stringify(data), 'utf8');
type Entry = { path: string; data: any };
const content: Entry[] = [];
const manifests: Entry[] = [];
const summary: any[] = [];

function add(path: string, data: any, manifest = false) {
  const value = clean(data);
  if (size(value) > 800_000) throw Error(`Document too large: ${path}`);
  (manifest ? manifests : content).push({ path, data: value });
}

function bank(subject: string, name: string, tasks: any[]) {
  if (!tasks.length) return;
  const ids = tasks.map(t => t.id);
  if (ids.some(id => typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) throw Error(`Invalid task IDs: ${subject}/${name}`);
  const revision = crypto.createHash('sha256').update(JSON.stringify(tasks)).digest('hex').slice(0, 16);
  const chunks: any[][] = [];
  let current: any[] = [];
  for (const task of tasks) {
    if (current.length && size([...current, task]) > 400_000) { chunks.push(current); current = []; }
    current.push(task);
  }
  if (current.length) chunks.push(current);
  const chunkIds = chunks.map((tasks, index) => {
    const id = `${revision}-${String(index).padStart(3, '0')}`;
    add(`subjects/${subject}/taskBanks/${name}/chunks/${id}`, { tasks, revision });
    return id;
  });
  add(`subjects/${subject}/taskBanks/${name}`, { revision, chunkIds, taskCount: tasks.length }, true);
}

async function main() {
  const subjects = await offlineSubjects();
  for (const subject of subjects) {
    const topics = await offlineTopics(subject.id);
    let lessons = 0;
    for (const topic of topics) {
      add(`subjects/${subject.id}/topics/${topic.id}`, topic);
      for (const metadata of topic.lessons_metadata || []) {
        const lesson = await offlineLesson(subject.id, topic.id, metadata.id);
        if (!lesson || !Array.isArray(lesson.tasks) || lesson.tasks.length === 0) throw Error(`Incomplete lesson ${subject.id}/${metadata.id}`);
        // The ID selected by the topic metadata is the canonical publication path.
        add(`subjects/${subject.id}/topics/${topic.id}/lessons/${metadata.id}`, { ...lesson, id: metadata.id });
        lessons++;
      }
    }
    bank(subject.id, 'exam', await offlineTasks(subject.id));
    bank(subject.id, 'practice', await offlinePracticeTasks(subject.id));
    const catalog = await offlineStudyCatalog(subject.id);
    bank(subject.id, 'study', [
      ...catalog.lessons.map((data, i) => ({ id: `lesson-${i}`, kind: 'lesson', data })),
      ...catalog.sections.map((data, i) => ({ id: `section-${i}`, kind: 'section', data })),
      ...catalog.epochs.map((data, i) => ({ id: `epoch-${i}`, kind: 'epoch', data }))
    ]);
    add(`subjects/${subject.id}`, { ...subject, publishedTopicIds: topics.map(t => t.id), topics_count: topics.length, lessons_count: lessons }, true);
    summary.push({ subject: subject.id, topics: topics.length, lessons });
  }
  for (const id of ['matura-maj-2023', 'matura-czerwiec-2023', 'matura-sierpien-2023', 'matura-maj-2024', 'matura-czerwiec-2024', 'matura-sierpien-2024']) {
    const tasks = await offlineExam(id);
    if (tasks.length) add(`exams/${id}`, { tasks });
  }
  console.log(JSON.stringify({ mode: process.argv.includes('--publish') ? 'publish' : 'dry-run', documents: content.length + manifests.length, subjects: summary, largestDocumentBytes: Math.max(...content.map(e => size(e.data))) }, null, 2));
  if (!process.argv.includes('--publish')) return;
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!keyFile) throw Error('Set GOOGLE_APPLICATION_CREDENTIALS to an authorized service account file');
  const account = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
  if (account.project_id !== 'jasne-7efe7') throw Error('Unexpected Firebase project');
  const app = initializeApp({ credential: cert(account), projectId: account.project_id });
  const db = initializeFirestore(app, { preferRest: true });
  const backup: Entry[] = [];
  const entries = [...content, ...manifests];
  for (let offset = 0; offset < entries.length; offset += 100) {
    const snapshots = await db.getAll(...entries.slice(offset, offset + 100).map(e => db.doc(e.path)));
    for (const snapshot of snapshots) if (snapshot.exists) backup.push({ path: snapshot.ref.path, data: snapshot.data() });
  }
  fs.mkdirSync('artifacts/curriculum-backups', { recursive: true });
  const backupFile = `artifacts/curriculum-backups/${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(backupFile, JSON.stringify(backup));
  console.log(`Saved ${backup.length} previous documents to ${backupFile}`);
  // Publish content first, then expose manifests. No delete or collection reset.
  for (const group of [content, manifests]) {
    for (let offset = 0; offset < group.length; offset += 100) {
      const batch = db.batch();
      for (const entry of group.slice(offset, offset + 100)) batch.set(db.doc(entry.path), entry.data);
      await batch.commit();
    }
  }
  console.log('Published verified curriculum content and manifests.');
  await app.delete();
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
