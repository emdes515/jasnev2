import { beforeEach, expect, it, vi } from 'vitest';
const { getDoc } = vi.hoisted(() => ({ getDoc: vi.fn() }));
vi.mock('firebase/firestore', () => ({ doc: (...parts: any[]) => parts.slice(1).join('/'), getDoc }));
vi.mock('../../firebase', () => ({ db: {} }));
import { readFirestoreTaskBank } from '../firestoreTaskBank';
const found = (data: any) => ({ exists: () => true, data: () => data });
beforeEach(() => getDoc.mockReset());
it('reads only the ordered chunks named by the published manifest', async () => {
  getDoc.mockResolvedValueOnce(found({ chunkIds: ['new-000', 'new-001'], taskCount: 2 }))
    .mockResolvedValueOnce(found({ tasks: [{ id: 'cloud-a' }] }))
    .mockResolvedValueOnce(found({ tasks: [{ id: 'cloud-b' }] }));
  expect(await readFirestoreTaskBank('math', 'practice')).toEqual([{ id: 'cloud-a' }, { id: 'cloud-b' }]);
  expect(getDoc).toHaveBeenNthCalledWith(2, 'subjects/math/taskBanks/practice/chunks/new-000');
});
it('rejects incomplete revisions so the repository can recover from its saved copy', async () => {
  getDoc.mockResolvedValueOnce(found({ chunkIds: ['missing'] })).mockResolvedValueOnce({ exists: () => false });
  await expect(readFirestoreTaskBank('math', 'practice')).rejects.toThrow('Incomplete');
});
it('rejects duplicate task IDs', async () => {
  getDoc.mockResolvedValueOnce(found({ chunkIds: ['one'] })).mockResolvedValueOnce(found({ tasks: [{ id: 'a' }, { id: 'a' }] }));
  await expect(readFirestoreTaskBank('math', 'practice')).rejects.toThrow('Duplicate');
});
