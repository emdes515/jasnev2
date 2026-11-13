import type { SubjectKey, UserState } from '../types';

/** Poniżej tej liczby punktów sesja to krótki trening, a nie arkusz, więc nie wpływa na prognozę. */
export const FULL_EXAM_MIN_POINTS = 20;

export interface ExamResult { attempts: number; bestScore: number }

/**
 * Zapisuje wynik arkusza osobno dla przedmiotu i poziomu.
 * Stare pola maturaAttempts / maturaBestScore zostają nietknięte (historia, osiągnięcia),
 * ale prognoza korzysta wyłącznie z tej mapy.
 */
export function recordExamResult<T extends UserState>(prev: T, key: SubjectKey, score: number, maxScore: number): T {
  if (!(maxScore >= FULL_EXAM_MIN_POINTS)) return prev;
  const percent = Math.max(0, Math.min(100, Math.round((score / maxScore) * 100)));
  const current = prev.examResults?.[key] ?? { attempts: 0, bestScore: 0 };
  return {
    ...prev,
    examResults: {
      ...(prev.examResults || {}),
      [key]: { attempts: current.attempts + 1, bestScore: Math.max(current.bestScore, percent) },
    },
  };
}

export function getExamResult(state: Pick<UserState, 'examResults'> | undefined, key: SubjectKey): ExamResult {
  return state?.examResults?.[key] ?? { attempts: 0, bestScore: 0 };
}
