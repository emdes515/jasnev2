import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/** A manifest selects one complete revision; old chunks can remain without leaking into the active bank. */
export async function readFirestoreTaskBank(subject: string, bank: 'exam' | 'practice' | 'study'): Promise<any[]> {
  const manifest = await getDoc(doc(db, 'subjects', subject, 'taskBanks', bank));
  const ids = manifest.exists() ? manifest.data().chunkIds : null;
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > 200 || ids.some(id => typeof id !== 'string' || id.includes('/'))) throw new Error('Invalid task bank manifest');
  const chunks = await Promise.all(ids.map(id => getDoc(doc(db, 'subjects', subject, 'taskBanks', bank, 'chunks', id))));
  if (chunks.some(chunk => !chunk.exists() || !Array.isArray(chunk.data().tasks))) throw new Error('Incomplete task bank revision');
  const tasks = chunks.flatMap(chunk => chunk.data().tasks);
  if (manifest.data()?.taskCount !== undefined && manifest.data().taskCount !== tasks.length) throw new Error('Task bank size mismatch');
  if (tasks.some(task => typeof task.id !== 'string') || new Set(tasks.map(task => task.id)).size !== tasks.length) throw new Error('Duplicate or invalid task IDs');
  return tasks;
}
