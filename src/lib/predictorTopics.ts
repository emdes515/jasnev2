/**
 * Jawne powiązania zadań i lekcji z działami używanymi w prognozie wyniku.
 * Identyfikatory zadań w bankach treningowych nie zawsze zawierają numer działu,
 * dlatego mapowanie jest zapisane wprost i sprawdzane testem względem banków.
 */

/** Zakresy numerów zadań angielskiego (prefiks → [od, do, numer działu]). */
const ENGLISH_ID_RANGES: Record<string, [number, number, number][]> = {
  uoe: [[1, 75, 2], [76, 150, 1], [151, 210, 4], [211, 330, 5], [331, 375, 3]],
  lis: [[1, 120, 7], [121, 240, 6], [241, 375, 8]],
  read: [[1, 130, 9], [131, 250, 10], [251, 500, 11]],
  wri: [[1, 80, 12], [81, 140, 13], [141, 190, 14], [191, 250, 15]],
};

/**
 * Zwraca klucz działu dla bieżących identyfikatorów zadań i lekcji z banków JASNE
 * albo null, gdy identyfikator nie niesie informacji o dziale
 * (np. polskie POL_P1_T1_001 są pogrupowane wg formatu arkusza, a nie wg działu).
 */
export function topicIdFromBankId(id: string): string | null {
  let m = id.match(/^mat-pp-(\d+)-\d+-\d+$/) || id.match(/^math-lesson-(\d+)-\d+$/);
  if (m) return `dzial-${m[1]}`;
  m = id.match(/^mat-pr-(\d+)-\d+-\d+$/) || id.match(/^math-pr-lesson-(\d+)-\d+$/);
  if (m) return `mat-roz-dzial-${m[1]}`;
  m = id.match(/^eng_cur_(\d+)_\d+_\d+$/) || id.match(/^eng-lesson-(\d+)-\d+$/);
  if (m) return `eng-dzial-${m[1]}`;
  m = id.match(/^eng_(uoe|lis|read|wri)_(\d+)$/);
  if (m) {
    const n = parseInt(m[2], 10);
    const range = ENGLISH_ID_RANGES[m[1]].find(([from, to]) => n >= from && n <= to);
    return range ? `eng-dzial-${range[2]}` : null;
  }
  return null;
}

/**
 * Liczba lekcji w dziale wg aktualnych katalogów (sprawdzana testem).
 * Dział bez lekcji w aplikacji zwraca 0 — wtedy opanowanie zostaje na poziomie zgadywania.
 */
export function expectedLessonsForTopic(topicId: string): number {
  const num = parseInt(topicId.match(/(\d+)$/)?.[1] || '0', 10);
  if (topicId.startsWith('eng-roz-')) return 2; // starszy kurs w chmurze, bez lokalnego katalogu
  if (topicId.startsWith('mat-roz-')) return num >= 1 && num <= 15 ? 5 : 0;
  if (topicId.startsWith('eng-')) return num === 1 ? 7 : num >= 2 && num <= 15 ? 3 : 0;
  if (topicId.startsWith('pol-')) return num >= 1 && num <= 15 ? 5 : 0;
  return num >= 1 && num <= 15 ? 5 : 0;
}
