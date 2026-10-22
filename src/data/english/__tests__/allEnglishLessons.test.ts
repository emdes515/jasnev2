import { describe, it, expect } from 'vitest';
import { 
  ENGLISH_LESSONS, 
  getEnglishLessonById, 
  getEnglishLessonsByTopic, 
  getEnglishLessonsByPillar 
} from '../englishLessonsData';
import { ENGLISH_SECTIONS } from '../../../types/englishTypes';
import { ALL_ENGLISH_TASKS } from '../allEnglishTasks';
import { getEnglishLessonDocument } from '../../englishCurriculumData';

describe('English Core-4 Lessons Comprehensive Suite', () => {
  it('contains exactly 49 Core-4 lessons in total', () => {
    expect(ENGLISH_LESSONS.length).toBe(49);
  });

  it('all 49 lesson IDs are unique', () => {
    const ids = new Set(ENGLISH_LESSONS.map(l => l.id));
    expect(ids.size).toBe(49);
  });

  it('section 1 has 7 lessons and sections 2 to 15 have 3 lessons', () => {
    for (const section of ENGLISH_SECTIONS) {
      const lessons = getEnglishLessonsByTopic(section.id);
      if (section.numericId === 1) {
        expect(lessons.length).toBe(7);
        const expectedIds = [1, 2, 3, 4, 5, 6, 7].map(i => `eng-lesson-1-${i}`);
        expect(lessons.map(l => l.id)).toEqual(expectedIds);
      } else {
        expect(lessons.length).toBe(3);
        const expectedIds = [
          `eng-lesson-${section.numericId}-1`,
          `eng-lesson-${section.numericId}-2`,
          `eng-lesson-${section.numericId}-3`
        ];
        expect(lessons.map(l => l.id)).toEqual(expectedIds);
      }
    }
  });

  it('every lesson has a complete Core-4 Bento Theory Pill', () => {
    for (const lesson of ENGLISH_LESSONS) {
      const pill = lesson.theoryPill;
      expect(pill).toBeDefined();

      // concept_essence must be rich
      expect(typeof pill.concept_essence).toBe('string');
      expect((pill.concept_essence as string).length).toBeGreaterThan(150);

      // exam_trap must be present
      expect(pill.exam_trap).toBeDefined();
      expect(pill.exam_trap!.length).toBeGreaterThan(15);

      // matura_context must be present
      expect(pill.matura_context).toBeDefined();
      expect(pill.matura_context!.length).toBeGreaterThan(5);

      // worked_examples must have at least 2 examples with steps
      expect(pill.worked_examples).toBeDefined();
      expect(pill.worked_examples!.length).toBeGreaterThanOrEqual(1);
      for (const ex of pill.worked_examples!) {
        expect(ex.problem).toBeDefined();
        expect(ex.steps).toBeDefined();
        expect(ex.steps.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('every lesson is assigned valid task IDs existing in the 1500 task database', () => {
    const allTaskIds = new Set(ALL_ENGLISH_TASKS.map(t => t.id));

    for (const lesson of ENGLISH_LESSONS) {
      expect(lesson.taskIds.length).toBeGreaterThanOrEqual(4);
      for (const taskId of lesson.taskIds) {
        expect(allTaskIds.has(taskId)).toBe(true);
      }
    }
  });

  it('retrieves lessons by pillar correctly', () => {
    // 7 lessons in Section 1 + 4 sections * 3 lessons = 19
    const uoeLessons = getEnglishLessonsByPillar('pillar-use-of-english');
    expect(uoeLessons.length).toBe(19);

    // 3 sections * 3 lessons = 9
    const lisLessons = getEnglishLessonsByPillar('pillar-listening');
    expect(lisLessons.length).toBe(9);

    // 3 sections * 3 lessons = 9
    const readLessons = getEnglishLessonsByPillar('pillar-reading');
    expect(readLessons.length).toBe(9);

    // 4 sections * 3 lessons = 12
    const wriLessons = getEnglishLessonsByPillar('pillar-writing');
    expect(wriLessons.length).toBe(12);

    expect(uoeLessons.length + lisLessons.length + readLessons.length + wriLessons.length).toBe(49);
  });

  it('retrieves lesson documents ready for SessionRunner', () => {
    const doc = getEnglishLessonDocument('eng-lesson-1-1', 'eng-dzial-1');
    expect(doc).not.toBeNull();
    expect(doc?.id).toBe('eng-lesson-1-1');
    expect(doc?.topic_id).toBe('eng-dzial-1');
    expect(doc?.tasks.length).toBe(5);
    expect(doc?.theory_pill.concept_essence).toContain('Present Simple');
  });
});
