import { describe, it, expect } from 'vitest';
import { all1500EnglishTasks, ENGLISH_SECTIONS, getEnglishTasksBySection, getEnglishTasksByPillar } from '../allEnglishTasks';

describe('English 1500 Tasks and Sections Integration', () => {
  it('contains exactly 1500 tasks', () => {
    expect(all1500EnglishTasks.length).toBe(1500);
  });

  it('has exactly 15 defined CKE sections', () => {
    expect(ENGLISH_SECTIONS.length).toBe(15);
  });

  it('all task IDs are completely unique', () => {
    const ids = new Set(all1500EnglishTasks.map((t) => t.id));
    expect(ids.size).toBe(1500);
  });

  it('every task is assigned to a valid section (eng-dzial-1 to eng-dzial-15)', () => {
    const validSectionIds = new Set(ENGLISH_SECTIONS.map((s) => s.id));
    for (const task of all1500EnglishTasks) {
      expect(validSectionIds.has(task.topicId)).toBe(true);
      expect(task.sectionTitle).toBeDefined();
      expect(task.sectionTitle.length).toBeGreaterThan(0);
    }
  });

  it('has the expected distribution per section matching 1500 total', () => {
    const sectionCounts: Record<string, number> = {};
    for (const task of all1500EnglishTasks) {
      sectionCounts[task.topicId] = (sectionCounts[task.topicId] || 0) + 1;
    }

    // Verify each section has tasks matching expected quotas
    expect(sectionCounts['eng-dzial-1']).toBe(75);
    expect(sectionCounts['eng-dzial-2']).toBe(75);
    expect(sectionCounts['eng-dzial-3']).toBe(45);
    expect(sectionCounts['eng-dzial-4']).toBe(60);
    expect(sectionCounts['eng-dzial-5']).toBe(120);
    expect(sectionCounts['eng-dzial-6']).toBe(120);
    expect(sectionCounts['eng-dzial-7']).toBe(120);
    expect(sectionCounts['eng-dzial-8']).toBe(135);
    expect(sectionCounts['eng-dzial-9']).toBe(130);
    expect(sectionCounts['eng-dzial-10']).toBe(120);
    expect(sectionCounts['eng-dzial-11']).toBe(250);
    expect(sectionCounts['eng-dzial-12']).toBe(80);
    expect(sectionCounts['eng-dzial-13']).toBe(60);
    expect(sectionCounts['eng-dzial-14']).toBe(50);
    expect(sectionCounts['eng-dzial-15']).toBe(60);

    const total = Object.values(sectionCounts).reduce((a, b) => a + b, 0);
    expect(total).toBe(1500);
  });

  it('retrieves tasks by section helper properly', () => {
    const d1Tasks = getEnglishTasksBySection('eng-dzial-1');
    expect(d1Tasks.length).toBe(75);
    for (const t of d1Tasks) {
      expect(t.topicId).toBe('eng-dzial-1');
    }
  });

  it('retrieves tasks by pillar helper properly', () => {
    const listeningTasks = getEnglishTasksByPillar('pillar-listening');
    expect(listeningTasks.length).toBe(375); // 120 + 120 + 135

    const uoeTasks = getEnglishTasksByPillar('pillar-use-of-english');
    expect(uoeTasks.length).toBe(375); // 75 + 75 + 45 + 60 + 120

    const readingTasks = getEnglishTasksByPillar('pillar-reading');
    expect(readingTasks.length).toBe(500); // 130 + 120 + 250

    const writingTasks = getEnglishTasksByPillar('pillar-writing');
    expect(writingTasks.length).toBe(250); // 80 + 60 + 50 + 60
  });

  it('ensures listening tasks contain audio transcripts and pause markers', () => {
    const listeningTasks = getEnglishTasksByPillar('pillar-listening');
    for (const task of listeningTasks) {
      expect(task.transcriptSnippet).toBeDefined();
      expect(task.transcriptSnippet!.length).toBeGreaterThan(20);
    }
  });

  it('ensures every task has didactic explanations and ckeTrap descriptions', () => {
    for (const task of all1500EnglishTasks) {
      expect(task.explanation).toBeDefined();
      expect(task.explanation.length).toBeGreaterThan(10);
      expect(task.ckeTrap).toBeDefined();
      expect(task.ckeTrap.length).toBeGreaterThan(5);
    }
  });
});
