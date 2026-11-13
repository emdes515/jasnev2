import { describe, expect, it } from 'vitest';
import { getExamResult, recordExamResult } from '../examResults';

const base: any = { xp: 0, maturaAttempts: 4, maturaBestScore: 80 };

describe('wyniki arkuszy per przedmiot i poziom', () => {
  it('zapisuje wynik tylko dla wskazanego klucza i zachowuje stare pola', () => {
    const next = recordExamResult(base, 'eng-roz', 30, 50);
    expect(getExamResult(next, 'eng-roz')).toEqual({ attempts: 1, bestScore: 60 });
    expect(getExamResult(next, 'eng')).toEqual({ attempts: 0, bestScore: 0 });
    expect(next.maturaAttempts).toBe(4);
    expect(next.maturaBestScore).toBe(80);
  });

  it('zlicza próby i pamięta najlepszy wynik', () => {
    let s = recordExamResult(base, 'math', 40, 50);
    s = recordExamResult(s, 'math', 20, 50);
    expect(getExamResult(s, 'math')).toEqual({ attempts: 2, bestScore: 80 });
  });

  it('krótka sesja treningowa nie jest arkuszem', () => {
    expect(recordExamResult(base, 'math', 3, 3)).toBe(base);
  });
});
