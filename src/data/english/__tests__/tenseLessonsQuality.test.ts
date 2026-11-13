import { describe, expect, it } from 'vitest';
import { ALL_ENGLISH_TASKS } from '../allEnglishTasks';
import { ENGLISH_LESSONS } from '../englishLessonsData';
import { CURATED_TENSE_TASKS } from '../../offline/english/curatedTenseTasks';
import { taskProvenance } from '../../../lib/taskProvenance';

const norm = (task: any) => `${String(task.question).replace(/\W+/g, ' ').toLowerCase()}|${String(task.correctAnswer).toLowerCase()}`;
const tenseLessons = ENGLISH_LESSONS.filter(l => l.topicId === 'eng-dzial-1');

describe('Dział 1: zadania zgodne z lekcjami o czasach', () => {
  it('każda lekcja ma 5 różnych zadań, a żadne nie powtarza się w innej lekcji', () => {
    const seen = new Map<string, string>();
    for (const lesson of tenseLessons) {
      const tasks = lesson.taskIds.map(id => ALL_ENGLISH_TASKS.find(t => t.id === id));
      expect(tasks.every(Boolean)).toBe(true);
      expect(new Set(tasks.map(t => norm(t))).size).toBe(tasks.length);
      for (const task of tasks) {
        expect(seen.has(norm(task)), `${lesson.id} powtarza zadanie z ${seen.get(norm(task))}`).toBe(false);
        seen.set(norm(task), lesson.id);
      }
    }
  });

  it('zadania należą do lekcji, w której występują, i używają różnych formatów', () => {
    for (const lesson of tenseLessons) {
      const tasks = CURATED_TENSE_TASKS.filter(t => t.lessonId === lesson.id);
      expect(tasks.map(t => t.id).sort()).toEqual([...lesson.taskIds].sort());
      expect(new Set(tasks.map(t => t.type)).size).toBeGreaterThanOrEqual(3);
    }
  });

  it('wyjaśnienie wskazuje pułapkę, a źródło nie udaje CKE', () => {
    for (const task of CURATED_TENSE_TASKS) {
      expect(task.explanation.length).toBeGreaterThan(20);
      expect(task.ckeTrap.length).toBeGreaterThan(10);
      expect(taskProvenance(task)).toEqual({ official: false, label: 'Autorskie zadanie JASNE' });
    }
  });

  it('poprawna odpowiedź jest dokładnie jedną z opcji, a zadania z luką mają akceptowane warianty', () => {
    for (const task of CURATED_TENSE_TASKS) {
      if (task.options) {
        expect(task.options.filter(o => o.toLowerCase() === task.correctAnswer.toLowerCase())).toHaveLength(1);
      } else {
        expect(task.acceptedVariants).toContain(task.correctAnswer);
      }
    }
  });
});
