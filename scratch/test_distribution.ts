import { MATH_LESSON_DOCUMENTS, loadMathTopicBossExam } from '../src/data/mathCurriculumData';
import { loadPolishTopicBossExam, POLISH_LESSON_DOCUMENTS } from '../src/data/polishCurriculumData';
import { loadEnglishTopicBossExam, ENGLISH_LESSON_DOCUMENTS } from '../src/data/englishCurriculumData';
import { generateFullMaturaExam, getAll1500MathTasks } from '../src/services/maturaExamGenerator';

function getLetter(t: any) {
  if (t.correctAnswer && typeof t.correctAnswer === 'string' && ['A','B','C','D'].includes(t.correctAnswer.toUpperCase())) {
    return t.correctAnswer.toUpperCase();
  }
  if (t.correct_answer && typeof t.correct_answer === 'string' && ['A','B','C','D'].includes(t.correct_answer.toUpperCase())) {
    return t.correct_answer.toUpperCase();
  }
  if (t.correctOptionIndex !== undefined && t.correctOptionIndex >= 0 && t.correctOptionIndex < 4) {
    return ['A','B','C','D'][t.correctOptionIndex];
  }
  if (t.options && Array.isArray(t.options)) {
    const idx = t.options.findIndex((o: any) => o && (o.is_correct || o.isCorrect));
    if (idx !== -1) return ['A','B','C','D'][idx];
  }
  return null;
}

// 1. Math lessons tasks from MATH_LESSON_DOCUMENTS
const mathCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
MATH_LESSON_DOCUMENTS.forEach((doc) => {
  (doc.tasks || []).forEach((task: any) => {
    const l = getLetter(task);
    if (l && mathCounts[l] !== undefined) mathCounts[l]++;
  });
});
console.log('Math Lessons Tasks Distribution:', mathCounts);

// 2. Math Boss Exams
const mathBossCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
for (let i = 1; i <= 15; i++) {
  const boss = loadMathTopicBossExam('dzial-' + i);
  boss.tasks.forEach((t: any) => {
    const l = getLetter(t);
    if (l && mathBossCounts[l] !== undefined) mathBossCounts[l]++;
  });
}
console.log('Math Boss Exams Distribution:', mathBossCounts);

// 3. Full Matura Exam tasks (20 simulated exams = 500 closed tasks)
const examCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
for (let i = 0; i < 20; i++) {
  const exam = generateFullMaturaExam(100 + i);
  exam.tasks.filter(t => t.isClosed).forEach(t => {
    const l = getLetter(t);
    if (l && examCounts[l] !== undefined) examCounts[l]++;
  });
}
console.log('20 Full Matura Exams (500 closed tasks) Distribution:', examCounts);

// 4. Polish Lessons
const polLessonCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
POLISH_LESSON_DOCUMENTS.forEach((doc) => {
  (doc.tasks || []).forEach((task: any) => {
    const l = getLetter(task);
    if (l && polLessonCounts[l] !== undefined) polLessonCounts[l]++;
  });
});
console.log('Polish Lessons Tasks Distribution:', polLessonCounts);

// 5. Polish Boss Exams (15 topics)
const polishBossCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
for (let i = 1; i <= 15; i++) {
  const boss = loadPolishTopicBossExam('pol-dzial-' + i);
  boss.tasks.forEach((t: any) => {
    const l = getLetter(t);
    if (l && polishBossCounts[l] !== undefined) polishBossCounts[l]++;
  });
}
console.log('Polish Boss Exams Distribution:', polishBossCounts);

// 6. English Lessons
const engLessonCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
ENGLISH_LESSON_DOCUMENTS.forEach((doc) => {
  (doc.tasks || []).forEach((task: any) => {
    const l = getLetter(task);
    if (l && engLessonCounts[l] !== undefined) engLessonCounts[l]++;
  });
});
console.log('English Lessons Tasks Distribution:', engLessonCounts);

// 7. English Boss Exams (15 topics)
const engBossCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
for (let i = 1; i <= 15; i++) {
  const boss = loadEnglishTopicBossExam('eng-dzial-' + i);
  boss.tasks.forEach((t: any) => {
    const l = getLetter(t);
    if (l && engBossCounts[l] !== undefined) engBossCounts[l]++;
  });
}
console.log('English Boss Exams Distribution:', engBossCounts);
