const normalize = (value: unknown) => String(value ?? '').replace(/\W+/g, ' ').trim().toLowerCase();

/** Klucz treści: pytanie, kontekst i odpowiedź. Inny identyfikator lub „Wariant N” nie czyni zadania innym. */
export function taskContentKey(task: any): string {
  return [task?.question, task?.contextText ?? task?.context_text, task?.correctAnswer].map(normalize).join('|');
}

export function dedupeTasksByContent<T>(tasks: T[]): T[] {
  const seen = new Set<string>();
  return tasks.filter(task => {
    const key = taskContentKey(task);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
