import { describe, expect, it } from 'vitest';
import { ALL_ENGLISH_TASKS } from '../allEnglishTasks';
import { ENGLISH_LESSONS } from '../englishLessonsData';
import { CURATED_TENSE_TASKS } from '../../offline/english/curatedTenseTasks';
import { CURATED_GRAMMAR_TASKS } from '../../offline/english/curatedGrammarTasks';
import { taskProvenance } from '../../../lib/taskProvenance';

const norm = (task: any) => `${String(task.question).replace(/\W+/g, ' ').toLowerCase()}|${String(task.correctAnswer).toLowerCase()}`;
const CURATED = [...CURATED_TENSE_TASKS, ...CURATED_GRAMMAR_TASKS];
const tenseLessons = ENGLISH_LESSONS.filter(l => ['eng-dzial-1', 'eng-dzial-2', 'eng-dzial-3', 'eng-dzial-4', 'eng-dzial-5'].includes(l.topicId));

describe('Działy 1–5: zadania autorskie zgodne z lekcjami', () => {
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
      const tasks = CURATED.filter(t => t.lessonId === lesson.id);
      expect(tasks.map(t => t.id).sort()).toEqual([...lesson.taskIds].sort());
      expect(new Set(tasks.map(t => t.type)).size).toBeGreaterThanOrEqual(3);
    }
  });

  it('wyjaśnienie wskazuje pułapkę, a źródło nie udaje CKE', () => {
    for (const task of CURATED) {
      expect(task.explanation.length).toBeGreaterThan(20);
      expect(task.ckeTrap.length).toBeGreaterThan(10);
      expect(taskProvenance(task)).toEqual({ official: false, label: 'Autorskie zadanie JASNE' });
    }
  });

  it('poprawna odpowiedź jest dokładnie jedną z opcji, a zadania z luką mają akceptowane warianty', () => {
    for (const task of CURATED) {
      if (task.options) {
        expect(task.options.filter(o => o.toLowerCase() === task.correctAnswer.toLowerCase())).toHaveLength(1);
      } else {
        expect(task.acceptedVariants).toContain(task.correctAnswer);
      }
    }
  });
});
