const LETTER_PREFIX = /^\(?([A-Ha-h])[.):]\s+/;

const stripPrefix = (text: string) => text.trim().replace(LETTER_PREFIX, '').trim().toLowerCase();

/**
 * Sprawdza odpowiedź zamkniętą bez dopasowania podciągów.
 * `correct` może być literą (A–H) albo pełnym tekstem opcji; opcje mogą mieć prefiks „A. ”.
 */
export function isChoiceAnswerCorrect(options: string[] | undefined, selected: string | null | undefined, correct: string | undefined): boolean {
  if (!selected || !correct) return false;
  const sel = selected.trim();
  const cor = correct.trim();
  const list = options || [];
  const index = list.findIndex(option => option === selected);
  const letter = /^[A-Ha-h]$/.test(sel)
    ? sel
    : sel.match(LETTER_PREFIX)?.[1] ?? (index >= 0 ? String.fromCharCode(65 + index) : '');
  if (/^[A-Ha-h]$/.test(cor)) return letter.toUpperCase() === cor.toUpperCase();
  return stripPrefix(sel) === stripPrefix(cor);
}
