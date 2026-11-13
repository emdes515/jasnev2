import type { EnglishTask } from '../../../types/englishTypes';

export const CURATED_SOURCE = 'Autorskie zadanie JASNE';
const GAP_INSTRUCTION = 'Uzupełnij lukę, wpisując właściwą formę wyrazu z nawiasu:';
const CHOICE_INSTRUCTION = 'Wybierz wyraz lub frazę, która poprawnie uzupełnia lukę w zdaniu:';
const TF_INSTRUCTION = 'Zdecyduj, czy poniższe stwierdzenie jest prawdziwe (TRUE), czy fałszywe (FALSE):';

const quote = (sentence: string) => (/["\n]/.test(sentence) ? sentence : `"${sentence}"`);

export type CuratedBase = { lesson: string; n: number; title: string; explanation: string; trap: string };
export interface CuratedSection { topicId: string; sectionTitle: string; sectionNumber: number; pillar?: 'use' | 'reading' }

const PILLARS = {
  use: { pillarId: 'pillar-use-of-english' as const, pillarName: 'Znajomość środków językowych' },
  reading: { pillarId: 'pillar-reading' as const, pillarName: 'Rozumienie tekstów pisanych' },
};

/** Tworzy konstruktory zadań autorskich przypisanych do jednego działu use of English. */
export function createCuratedBuilders(section: CuratedSection) {
  const base = (b: CuratedBase) => ({
    id: `eng_cur_${b.lesson.replace('eng-lesson-', '').replace('-', '_')}_${String(b.n).padStart(2, '0')}`,
    ...PILLARS[section.pillar ?? 'use'],
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
  const LETTERS = ['A', 'B', 'C', 'D', 'E'];
  return {
    /** Zadanie czytania: tekst w contextText, opcje z prefiksem A–D, klucz w formie litery. */
    readChoice: (b: CuratedBase, passage: string, stem: string, options: string[], correct: 'A' | 'B' | 'C' | 'D'): EnglishTask => ({
      ...base(b), type: 'SINGLE_CHOICE', question: stem, contextText: passage,
      options: options.map((text, i) => `${LETTERS[i]}. ${text}`), correctAnswer: correct,
    }),
    readTruth: (b: CuratedBase, passage: string, statement: string, correct: 'TRUE' | 'FALSE'): EnglishTask => ({
      ...base(b), type: 'TRUE_FALSE', question: `${TF_INSTRUCTION}\n\n${statement}`, contextText: passage, options: ['TRUE', 'FALSE'], correctAnswer: correct,
    }),
    readWord: (b: CuratedBase, passage: string, sentence: string, correct: string, variants: string[] = [], instruction = GAP_INSTRUCTION): EnglishTask => ({
      ...base(b), type: 'WORD_INPUT', question: `${instruction}\n\n${sentence}`, contextText: passage, correctAnswer: correct, acceptedVariants: [correct, ...variants],
    }),
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
