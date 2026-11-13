import type { EnglishTask } from '../../../types/englishTypes';

export const CURATED_SOURCE = 'Autorskie zadanie JASNE';
const GAP_INSTRUCTION = 'Uzupełnij lukę, wpisując właściwą formę wyrazu z nawiasu:';
const CHOICE_INSTRUCTION = 'Wybierz wyraz lub frazę, która poprawnie uzupełnia lukę w zdaniu:';
const TF_INSTRUCTION = 'Zdecyduj, czy poniższe stwierdzenie jest prawdziwe (TRUE), czy fałszywe (FALSE):';

const quote = (sentence: string) => (/["\n]/.test(sentence) ? sentence : `"${sentence}"`);

export type CuratedBase = { lesson: string; n: number; title: string; explanation: string; trap: string };
export interface CuratedSection { topicId: string; sectionTitle: string; sectionNumber: number }

/** Tworzy konstruktory zadań autorskich przypisanych do jednego działu use of English. */
export function createCuratedBuilders(section: CuratedSection) {
  const base = (b: CuratedBase) => ({
    id: `eng_cur_${b.lesson.replace('eng-lesson-', '').replace('-', '_')}_${String(b.n).padStart(2, '0')}`,
    pillarId: 'pillar-use-of-english' as const,
    pillarName: 'Znajomość środków językowych',
    topicId: section.topicId,
    sectionTitle: section.sectionTitle,
    sectionNumber: section.sectionNumber,
    lessonId: b.lesson,
    title: b.title,
    explanation: b.explanation,
    ckeTrap: b.trap,
    source: CURATED_SOURCE,
    points: 1,
  });
  return {
    choice: (b: CuratedBase, sentence: string, options: string[], correct: string, instruction = CHOICE_INSTRUCTION): EnglishTask => ({
      ...base(b), type: 'SINGLE_CHOICE', question: `${instruction}\n\n"${sentence}"`, options, correctAnswer: correct,
    }),
    word: (b: CuratedBase, sentence: string, correct: string, variants: string[] = [], instruction = GAP_INSTRUCTION): EnglishTask => ({
      ...base(b), type: 'WORD_INPUT', question: `${instruction}\n\n${sentence}`, correctAnswer: correct, acceptedVariants: [correct, ...variants],
    }),
    truth: (b: CuratedBase, statement: string, correct: 'TRUE' | 'FALSE'): EnglishTask => ({
      ...base(b), type: 'TRUE_FALSE', question: `${TF_INSTRUCTION}\n\n${statement}`, options: ['TRUE', 'FALSE'], correctAnswer: correct,
    }),
  };
}

export function lessonIdsOf(tasks: EnglishTask[]): Record<string, string[]> {
  return tasks.reduce((acc, task) => {
    (acc[task.lessonId] ||= []).push(task.id);
    return acc;
  }, {} as Record<string, string[]>);
}
