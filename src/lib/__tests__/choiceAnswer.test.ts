import { describe, expect, it } from 'vitest';
import { isChoiceAnswerCorrect } from '../choiceAnswer';

describe('isChoiceAnswerCorrect', () => {
  it('nie uznaje opcji zawierającej poprawną frazę jako podciąg', () => {
    expect(isChoiceAnswerCorrect(['in', 'in time', 'on'], 'in time', 'in')).toBe(false);
    expect(isChoiceAnswerCorrect(['in', 'in time', 'on'], 'in', 'in')).toBe(true);
  });

  it('klucz w formie litery nie pasuje do każdej opcji zawierającej tę literę', () => {
    const options = ['A. The speaker waited.', 'B. The speaker paid.', 'E. The speaker slept.'];
    expect(isChoiceAnswerCorrect(options, 'A. The speaker waited.', 'E')).toBe(false);
    expect(isChoiceAnswerCorrect(options, 'E. The speaker slept.', 'E')).toBe(true);
  });

  it('obsługuje opcje bez prefiksu i klucz literowy', () => {
    expect(isChoiceAnswerCorrect(['had', 'has', 'have'], 'has', 'B')).toBe(true);
    expect(isChoiceAnswerCorrect(['had', 'has', 'have'], 'had', 'B')).toBe(false);
  });

  it('ignoruje wielkość liter i prefiks w kluczu tekstowym', () => {
    expect(isChoiceAnswerCorrect(['TRUE', 'FALSE'], 'true', 'TRUE')).toBe(true);
    expect(isChoiceAnswerCorrect(['A. up', 'B. off'], 'A. up', 'up')).toBe(true);
  });

  it('brak wyboru lub klucza nie jest poprawną odpowiedzią', () => {
    expect(isChoiceAnswerCorrect(['a'], null, 'a')).toBe(false);
    expect(isChoiceAnswerCorrect(['a'], 'a', undefined)).toBe(false);
  });
});
