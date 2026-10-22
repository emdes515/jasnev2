import { describe, it, expect } from 'vitest';
import { ENGLISH_LESSONS } from '../englishLessonsData';
import { parseEnglishBentoTheory } from '../../../components/english/EnglishConceptFormatter';

describe('EnglishBentoParser', () => {
  it('parses lesson 1-1 into clean Bento points (Present Simple vs Present Continuous)', () => {
    const lesson = ENGLISH_LESSONS.find(l => l.id === 'eng-lesson-1-1');
    expect(lesson).toBeDefined();

    const parsed = parseEnglishBentoTheory(lesson!.theoryPill.concept_essence);
    expect(parsed.intro).toContain('Dwa fundamentalne czasy teraźniejsze');
    expect(parsed.bentoPoints.length).toBeGreaterThanOrEqual(2);

    const pSimp = parsed.bentoPoints.find(p => /present simple/i.test(p.title));
    expect(pSimp).toBeDefined();
    expect(pSimp?.title).toBe('Present Simple');
    expect(pSimp?.formula).toContain('Podmiot + V₁ / -s');

    const pCont = parsed.bentoPoints.find(p => /present continuous/i.test(p.title));
    expect(pCont).toBeDefined();
    expect(pCont?.title).toBe('Present Continuous');
    expect(pCont?.formula).toContain('Podmiot + am/is/are + V-ing');

    expect(parsed.goldenRule).toBeDefined();
    expect(parsed.goldenRule).toContain('0 punktów');
  });

  it('parses lesson 1-4 into clean Bento points (Present Perfect vs Past Simple)', () => {
    const lesson = ENGLISH_LESSONS.find(l => l.id === 'eng-lesson-1-4');
    expect(lesson).toBeDefined();

    const parsed = parseEnglishBentoTheory(lesson!.theoryPill.concept_essence);
    expect(parsed.bentoPoints.length).toBeGreaterThanOrEqual(2);

    const pPerf = parsed.bentoPoints.find(p => /present perfect/i.test(p.title));
    expect(pPerf).toBeDefined();
    expect(pPerf?.title).toContain('Present Perfect');
    expect(pPerf?.formula).toMatch(/have\/has \+ V₃/i);

    const pPast = parsed.bentoPoints.find(p => /past simple/i.test(p.title));
    expect(pPast).toBeDefined();
    expect(pPast?.title).toContain('Past Simple');

    expect(parsed.goldenRule).toBeDefined();
    expect(parsed.goldenRule).toContain('have/has + V₃');
  });

  it('parses lesson 1-6 into future forms (will, be going to, Present Continuous)', () => {
    const lesson = ENGLISH_LESSONS.find(l => l.id === 'eng-lesson-1-6');
    expect(lesson).toBeDefined();

    const parsed = parseEnglishBentoTheory(lesson!.theoryPill.concept_essence);
    expect(parsed.bentoPoints.length).toBeGreaterThanOrEqual(3);

    expect(parsed.bentoPoints[0].title).toContain('Will');
    expect(parsed.bentoPoints[1].title).toContain('Be going to');
    expect(parsed.bentoPoints[2].title).toContain('Present Continuous');
  });

  it('parses modal verbs lesson 2-2 cleanly', () => {
    const lesson = ENGLISH_LESSONS.find(l => l.id === 'eng-lesson-2-2');
    expect(lesson).toBeDefined();

    const parsed = parseEnglishBentoTheory(lesson!.theoryPill.concept_essence);
    expect(parsed.bentoPoints.length).toBeGreaterThanOrEqual(4);

    const mustCard = parsed.bentoPoints.find(p => p.title.toLowerCase() === 'must');
    expect(mustCard).toBeDefined();
    expect(mustCard?.example).toContain('call my mom');
  });
});
