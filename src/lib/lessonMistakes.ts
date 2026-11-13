/** Collapses legacy aliases of the same lesson without merging subjects. */
export function canonicalLessonId(id: string): string {
  const normalized = id.toLowerCase().replace(/[._]/g, '-').replace(/^lesson-/, '');
  const match = normalized.match(/^(?:(math|pol|eng|mat-roz|math-roz|eng-roz)[-_])?(?:lesson[-_])?(\d+)[.-](\d+)$/);
  if (!match) return normalized;
  const subject = match[1] === 'math' ? '' : match[1] === 'math-roz' ? 'mat-roz' : match[1];
  return `${subject ? `${subject}-` : ''}${Number(match[2])}.${Number(match[3])}`;
}

export function uniqueLessonMistakes(mistakes: Record<string, number>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [id, count] of Object.entries(mistakes)) {
    if (!Number.isFinite(count) || count < 0) continue;
    const key = canonicalLessonId(id);
    result[key] = Math.max(result[key] || 0, count);
  }
  return result;
}
