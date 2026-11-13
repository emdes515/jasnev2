import { describe, expect, it } from 'vitest';
import { expectedLessonsForTopic, topicIdFromBankId } from '../predictorTopics';
import { calculateMaturaPrediction } from '../maturaPredictor';
import { offlinePracticeTasks, offlineStudyCatalog } from '../../data/offline/catalog';
import { ENGLISH_LESSONS } from '../../data/offline/english/englishLessonsData';
import { ALL_ENGLISH_TASKS } from '../../data/offline/english/allEnglishTasks';

const lessonCounts = (ids: string[], topicOf: (id: string) => string | null) => {
  const counts: Record<string, number> = {};
  new Set(ids).forEach(id => { const t = topicOf(id); if (t) counts[t] = (counts[t] || 0) + 1; });
  return counts;
};

describe('mapowanie zadań i lekcji na działy prognozy', () => {
  it('każde zadanie angielskiego trafia do swojego działu', () => {
    for (const task of ALL_ENGLISH_TASKS) {
      expect(topicIdFromBankId(task.id), task.id).toBe(task.topicId);
    }
  });

  it('zadania matematyki podstawowej i rozszerzonej trafiają do działów kluczy konfiguracji', async () => {
    const pp: any[] = await offlinePracticeTasks('matematyka-podstawowa');
    const pr: any[] = await offlinePracticeTasks('matematyka-rozszerzona');
    expect(pp.length).toBe(1500);
    expect(pr.length).toBe(1500);
    for (const t of pp) expect(topicIdFromBankId(t.id), t.id).toBe(t.topicId);
    for (const t of pr) expect(topicIdFromBankId(t.id), t.id).toBe(`mat-roz-${t.topicId.replace('pr-', '')}`);
    for (const t of pp) expect(topicIdFromBankId(t.lessonId), t.lessonId).toBe(t.topicId);
  });

  it('oczekiwane liczby lekcji zgadzają się z katalogami', async () => {
    for (const [topic, count] of Object.entries(lessonCounts(ENGLISH_LESSONS.map(l => l.id), topicIdFromBankId))) {
      expect(expectedLessonsForTopic(topic), topic).toBe(count);
    }
    const pol = await offlineStudyCatalog('jezyk-polski');
    const polCounts = lessonCounts(pol.lessons.map((l: any) => l.id), id => { const m = id.match(/^pol-lesson-(\d+)-/); return m ? `pol-dzial-${m[1]}` : null; });
    for (const [topic, count] of Object.entries(polCounts)) expect(expectedLessonsForTopic(topic), topic).toBe(count);
    const pp: any[] = await offlinePracticeTasks('matematyka-podstawowa');
    for (const [topic, count] of Object.entries(lessonCounts(pp.map(t => t.lessonId), topicIdFromBankId))) {
      expect(expectedLessonsForTopic(topic), topic).toBe(count);
    }
  });

  it('polskie zadania pogrupowane wg arkusza nie są przypisywane do działów na siłę', () => {
    expect(topicIdFromBankId('POL_P1_T1_001')).toBeNull();
  });
});

describe('prognoza uwzględnia rzeczywiste zadania z banków', () => {
  it('rozwiązane zadania angielskiego podnoszą opanowanie właściwego działu', () => {
    const base = calculateMaturaPrediction({ subjectId: 'jezyk-angielski' });
    const solved = calculateMaturaPrediction({ subjectId: 'jezyk-angielski', completedTasks: ['eng_uoe_076', 'eng_uoe_077', 'eng_uoe_078', 'eng_uoe_079', 'eng_uoe_080', 'eng_uoe_081', 'eng_uoe_082', 'eng_uoe_083', 'eng_uoe_084'] });
    const dzial1 = solved.topicBreakdown.find(t => t.topicId === 'eng-dzial-1')!;
    expect(dzial1.completedTasksCount).toBe(9);
    expect(dzial1.masteryPercent).toBeGreaterThan(base.topicBreakdown.find(t => t.topicId === 'eng-dzial-1')!.masteryPercent);
    expect(solved.topicBreakdown.find(t => t.topicId === 'eng-dzial-2')!.completedTasksCount).toBe(0);
  });

  it('zadania matematyki rozszerzonej liczą się tylko w prognozie rozszerzenia', () => {
    const ids = ['mat-pr-1-1-01', 'mat-pr-1-1-02', 'mat-pr-1-1-03'];
    const roz = calculateMaturaPrediction({ subjectId: 'matematyka-rozszerzona', completedTasks: ids });
    const pp = calculateMaturaPrediction({ subjectId: 'matematyka-podstawowa', completedTasks: ids });
    expect(roz.topicBreakdown.find(t => t.topicId === 'mat-roz-dzial-1')!.completedTasksCount).toBe(3);
    expect(pp.topicBreakdown.reduce((s, t) => s + t.completedTasksCount, 0)).toBe(0);
  });

  it('pięć lekcji matematyki w dziale to pełne pokrycie tego działu', () => {
    const lessons = ['math-lesson-1-1', 'math-lesson-1-2', 'math-lesson-1-3', 'math-lesson-1-4', 'math-lesson-1-5'];
    const result = calculateMaturaPrediction({ subjectId: 'matematyka-podstawowa', userLessonsCompleted: lessons });
    const t = result.topicBreakdown.find(x => x.topicId === 'dzial-1')!;
    expect(t.completedLessonsCount).toBe(5);
    expect(t.totalLessonsCount).toBe(5);
    expect(t.masteryPercent).toBe(100);
  });
});
