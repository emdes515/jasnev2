/**
 * src/utils/taskShuffler.ts
 *
 * Uniwersalne narzędzie do losowego tasowania wariantów odpowiedzi ABCD
 * we wszystkich modułach platformy JASNE (Matematyka, Język Polski, Język Angielski,
 * Symulator Maturalny CKE, Maraton i Egzaminy Działowe).
 *
 * Gwarantuje idealnie równomierny rozkład poprawnej odpowiedzi (~25% A, ~25% B, ~25% C, ~25% D),
 * trwale eliminując przewidywalny schemat stałej odpowiedzi B.
 */

// Pomocnicze tasowanie Fisher-Yates
export function shuffleArray<T>(array: T[], seed?: string | number): T[] {
  const arr = [...array];
  let rng = Math.random;
  if (seed !== undefined) {
    let s = typeof seed === 'number' ? seed : seed.split('').reduce((acc, c) => acc * 31 + c.charCodeAt(0), 12345);
    rng = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Usuwa twardo zakodowane prefiksy literowe takie jak "A. ", "B. ", "A) ", "(A) ",
 * aby po przetasowaniu nie powstały zniekształcone etykiety np. "C. A. Treść".
 */
export function cleanOptionText(opt: any): string {
  if (typeof opt === 'string') {
    return opt.replace(/^(?:\(?([A-D1-4])\)?[.:\s]+)/, '').trim();
  }
  if (opt && typeof opt === 'object') {
    const raw = opt.text || opt.content_latex || opt.label || '';
    return typeof raw === 'string' ? raw.replace(/^(?:\(?([A-D1-4])\)?[.:\s]+)/, '').trim() : '';
  }
  return String(opt || '');
}

/**
 * Tasuje opcje w zadaniu jednokrotnego wyboru (Single Choice / ABCD)
 * i precyzyjnie aktualizuje wskaźniki poprawnej odpowiedzi:
 * - options (przemieszany szyk z oczyszczonym tekstem)
 * - correctAnswer / correct_answer (np. 'A' | 'B' | 'C' | 'D')
 * - correctOptionIndex (0 | 1 | 2 | 3)
 * - is_correct / id / key w obiektach wewnątrz options
 */
export function shuffleTaskOptions<T = any>(task: T, seed?: string | number): T {
  if (!task || typeof task !== 'object') return task;
  const t = { ...(task as any) };

  // Nie tasuj zadań otwartych lub bez opcji
  if (!Array.isArray(t.options) || t.options.length < 2) {
    return task;
  }

  // Nie tasuj pytań Prawda/Fałsz (tam stały układ PRAWDA/FAŁSZ)
  const taskType = String(t.taskType || t.type || '').toUpperCase();
  if (taskType === 'TRUE_FALSE' || taskType.includes('PRAWDA_FALSZ')) {
    return task;
  }

  const origOptions = t.options;
  const count = origOptions.length;

  // 1. Zidentyfikuj poprawną opcję PRZED tasowaniem
  let correctIndex = -1;

  // A. Sprawdź correctOptionIndex
  if (typeof t.correctOptionIndex === 'number' && t.correctOptionIndex >= 0 && t.correctOptionIndex < count) {
    correctIndex = t.correctOptionIndex;
  }
  // B. Sprawdź czy opcja wewnątrz ma flagę is_correct
  if (correctIndex === -1) {
    const idx = origOptions.findIndex((o: any) => o && (o.is_correct === true || o.isCorrect === true));
    if (idx !== -1) correctIndex = idx;
  }
  // C. Sprawdź po literze 'A', 'B', 'C', 'D' w correctAnswer / correct_answer
  const rawCorrect = String(t.correctAnswer || t.correct_answer || t.correct_value || '').trim();
  if (correctIndex === -1 && /^[A-D]$/i.test(rawCorrect)) {
    const letterIdx = rawCorrect.toUpperCase().charCodeAt(0) - 65;
    if (letterIdx >= 0 && letterIdx < count) {
      correctIndex = letterIdx;
    }
  }
  // D. Sprawdź czy rawCorrect odpowiada bezpośrednio tekstowi którejś z opcji
  if (correctIndex === -1 && rawCorrect) {
    const normCorrectText = rawCorrect.toLowerCase().replace(/^(?:\(?([A-D1-4])\)?[.:\s]+)/, '').trim();
    const idx = origOptions.findIndex((o: any) => {
      const oText = cleanOptionText(o).toLowerCase();
      return oText === normCorrectText || (typeof o === 'string' && o.toLowerCase().trim() === rawCorrect.toLowerCase());
    });
    if (idx !== -1) correctIndex = idx;
  }

  // Jeśli nie udało się jednoznacznie ustalić poprawnej opcji, nie ryzykuj rozspójnienia
  if (correctIndex === -1) {
    return task;
  }

  // 2. Przygotuj opcje z zachowaniem struktury (string vs obiekt)
  const isObjectOptions = typeof origOptions[0] === 'object' && origOptions[0] !== null;

  interface IndexedOption {
    item: any;
    isCorrect: boolean;
  }

  const indexed: IndexedOption[] = origOptions.map((opt: any, idx: number) => {
    const isThisCorrect = idx === correctIndex;
    let cleanedItem = opt;

    if (typeof opt === 'string') {
      cleanedItem = cleanOptionText(opt);
    } else if (isObjectOptions) {
      cleanedItem = {
        ...opt,
        text: cleanOptionText(opt.text || opt.content_latex || opt.label || ''),
        content_latex: opt.content_latex ? cleanOptionText(opt.content_latex) : undefined,
        is_correct: isThisCorrect
      };
    }

    return {
      item: cleanedItem,
      isCorrect: isThisCorrect
    };
  });

  // 3. Przetasuj tablicę opcji
  const taskSeed = seed !== undefined ? seed : (t.id ? `${t.id}-${Math.random()}` : undefined);
  const shuffledIndexed = shuffleArray(indexed, taskSeed);

  // 4. Wyznacz nowy indeks poprawnej opcji
  const newCorrectIndex = shuffledIndexed.findIndex(item => item.isCorrect);
  const newLetter = String.fromCharCode(65 + newCorrectIndex);

  // 5. Zaktualizuj opcje i ich atrybuty
  const newOptions = shuffledIndexed.map((item, idx) => {
    const letter = String.fromCharCode(65 + idx);
    if (typeof item.item === 'string') {
      return item.item;
    }
    return {
      ...item.item,
      id: letter,
      key: letter,
      label: letter,
      is_correct: idx === newCorrectIndex
    };
  });

  return {
    ...t,
    options: newOptions,
    correctAnswer: newLetter,
    correct_answer: newLetter,
    correctOptionIndex: newCorrectIndex,
    optionsDetailed: newOptions
  };
}

/**
 * Tasuje pytanie Gatekeepera (quiz wstępu teoretycznego)
 */
export function shuffleGatekeeperQuestion<T extends { question: string; options: string[]; correctIndex?: number; tip?: string; explanation?: string }>(gk: T): T {
  if (!gk || !Array.isArray(gk.options) || gk.options.length < 2) return gk;
  const origCorrectIdx = gk.correctIndex ?? 0;

  const indexed = gk.options.map((opt, i) => ({ opt: cleanOptionText(opt), isCorrect: i === origCorrectIdx }));
  const shuffled = shuffleArray(indexed);
  const newCorrectIdx = shuffled.findIndex(x => x.isCorrect);

  return {
    ...gk,
    options: shuffled.map(x => x.opt),
    correctIndex: newCorrectIdx
  };
}
