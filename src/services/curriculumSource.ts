export type CurriculumSource = 'firestore' | 'saved-firestore' | 'offline';
interface Saved<T> { version: number; savedAt: number; data: T }
const VERSION = 3;
const TTL = 12 * 60 * 60 * 1000;
const memory = new Map<string, Saved<unknown>>();
const pending = new Map<string, Promise<unknown>>();
const sources = new Map<string, CurriculumSource>();
const fallbackMemory = new Map<string, { data: unknown; retryAt: number }>();

export function getCurriculumSource(key: string): CurriculumSource | undefined { return sources.get(key); }
export function clearCurriculumSources(clearSaved = false): void {
  memory.clear(); pending.clear(); sources.clear(); fallbackMemory.clear();
  if (clearSaved && typeof localStorage !== 'undefined') {
    for (const key of Object.keys(localStorage)) if (key.startsWith('jasne_content_v3_') || key.startsWith('jasne_curriculum_')) localStorage.removeItem(key);
  }
}

/** Only successful Firestore reads enter the persistent cache. Offline data never impersonates cloud data. */
export async function resolveCurriculum<T>(key: string, fetchRemote: () => Promise<T>, fallback: () => Promise<T>, timeoutMs = 5000): Promise<T> {
  const storageKey = `jasne_content_v${VERSION}_${key}`;
  let saved = memory.get(key) as Saved<T> | undefined;
  if (!saved) {
    try { const raw = localStorage.getItem(storageKey); const value = raw ? JSON.parse(raw) : null; if (value?.version === VERSION && value.data !== undefined) saved = value; } catch {}
  }
  if (saved && Date.now() - saved.savedAt < TTL) { memory.set(key, saved); sources.set(key, 'saved-firestore'); return saved.data; }
  if (pending.has(key)) return pending.get(key) as Promise<T>;
  const offline = fallbackMemory.get(key);
  if (offline && Date.now() < offline.retryAt) return offline.data as T;
  const request = (async () => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const data = await Promise.race([fetchRemote(), new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('Curriculum read timeout')), timeoutMs); })]);
      const entry: Saved<T> = { version: VERSION, savedAt: Date.now(), data };
      memory.set(key, entry); fallbackMemory.delete(key); sources.set(key, 'firestore');
      console.debug(`[curriculum] ${key}: firestore`);
      try { localStorage.setItem(storageKey, JSON.stringify(entry)); } catch {}
      return data;
    } catch {
      if (saved) { sources.set(key, 'saved-firestore'); return saved.data; }
      const data = await fallback();
      fallbackMemory.set(key, { data, retryAt: Date.now() + 30_000 }); sources.set(key, 'offline');
      console.debug(`[curriculum] ${key}: offline`);
      return data;
    } finally { clearTimeout(timer); }
  })();
  pending.set(key, request);
  try { return await request; } finally { pending.delete(key); }
}
