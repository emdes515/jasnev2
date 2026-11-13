import { describe, expect, it } from 'vitest';
import { dedupeTasksByContent } from '../dedupeTasks';

describe('dedupeTasksByContent', () => {
  it('usuwa kopie różniące się tylko identyfikatorem i tytułem', () => {
    const tasks = [
      { id: 'a', title: 'X (Wariant 1)', question: 'Ile to jest?', correctAnswer: '4' },
      { id: 'b', title: 'X (Wariant 2)', question: 'Ile to  jest?', correctAnswer: '4' },
      { id: 'c', title: 'Y', question: 'Ile to jest?', correctAnswer: '5' },
    ];
    expect(dedupeTasksByContent(tasks).map(t => t.id)).toEqual(['a', 'c']);
  });

  it('rozróżnia zadania z tym samym pytaniem, ale innym tekstem źródłowym', () => {
    const tasks = [
      { id: 'a', question: 'Wybierz odpowiedź.', contextText: 'Tekst 1', correctAnswer: 'A' },
      { id: 'b', question: 'Wybierz odpowiedź.', contextText: 'Tekst 2', correctAnswer: 'A' },
    ];
    expect(dedupeTasksByContent(tasks)).toHaveLength(2);
  });
});
