import { describe, expect, it } from 'vitest';
import { uniqueLessonMistakes } from '../lessonMistakes';

describe('legacy lesson mistake aliases', () => {
  it('counts one mathematics lesson once across all persisted aliases', () => {
    const result = uniqueLessonMistakes({ 'math-lesson-1-1': 1, 'math.lesson.1.1': 1, 'math-1.1': 1, 'lesson-1-1': 1, '1-1': 1, '1.1': 1 });
    expect(result).toEqual({ '1.1': 1 });
  });
  it('keeps subjects separate and ignores invalid counts', () => {
    expect(uniqueLessonMistakes({ 'lesson-1-1': 1, 'pol-lesson-1-1': 2, 'pol-1.1': 2, invalid: NaN })).toEqual({ '1.1': 1, 'pol-1.1': 2 });
  });
});
