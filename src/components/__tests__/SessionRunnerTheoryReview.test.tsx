// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, cleanup, fireEvent } from '@testing-library/react';
import { SessionRunner } from '../SessionRunner';
import { __resetDatabaseConnectionForTests, SESSION_STORAGE_KEY } from '../../services/sessionRecoveryService';

// happy-dom odrzuca obietnicę `finished` przy Animation.cancel(), a motion jej nie przechwytuje:
// animacje WAAPI przerywane przy odmontowaniu App dają nieobsłużony AbortError i vitest kończy się kodem 1
// mimo zaliczonych testów. Bez Element.prototype.animate motion używa animacji JS, które tego nie robią.
delete (Element.prototype as { animate?: unknown }).animate;

// Mock dependencies for SessionRunner and App
vi.mock('../../lib/firebase', () => ({
  auth: { currentUser: null },
  db: {}
}));
vi.mock('../../firebase', () => ({ app: {}, auth: { currentUser: null }, db: {} }));
// Recovery tests supply session fixtures; do not leave real Firestore reads running after teardown.
vi.mock('../../services/curriculumRepository', async importOriginal => {
  const actual = await importOriginal<typeof import('../../services/curriculumRepository')>();
  return { ...actual, curriculumRepository: {
    ...actual.curriculumRepository,
    getTopics: vi.fn().mockResolvedValue([]),
    getSubjects: vi.fn().mockResolvedValue([]),
    getSubject: vi.fn().mockResolvedValue(null),
    getSubjectPillars: vi.fn().mockResolvedValue([]),
    getLesson: vi.fn().mockResolvedValue(null),
    ensureLessonLoaded: vi.fn().mockResolvedValue(null),
    getCkeExamTasks: vi.fn().mockResolvedValue([]),
    getPracticeTasks: vi.fn().mockResolvedValue([]),
    getStudyCatalog: vi.fn().mockResolvedValue({ lessons: [], sections: [], epochs: [] })
  } };
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null]
}));

vi.mock('../../lib/curriculumSync', () => ({
  checkSystemMetaVersion: vi.fn().mockResolvedValue({ upToDate: true, serverVersion: '2.0.0' }),
  APP_CURRICULUM_VERSION: '2.0.0'
}));

describe('SessionRunner: Pełna lekcja / Same zadania i powrót do teorii', () => {
  const tasks = [
    { id: 'task-th-1', type: 'SINGLE_CHOICE', question: 'Pierwsze zadanie', options: [{ id: 'A', text: 'Odp A' }, { id: 'B', text: 'Odp B' }], correctAnswer: 'A' },
    { id: 'task-th-2', type: 'SINGLE_CHOICE', question: 'Drugie zadanie', options: [{ id: 'A', text: 'Odp C' }, { id: 'B', text: 'Odp D' }], correctAnswer: 'A' }
  ];
  const theoryPill = {
    concept_essence: 'Istota pojęcia do powtórki.',
    matura_context: 'Kontekst maturalny.',
    core_formulas: [{ title: 'Wzór', formula: 'a+b', description: 'Opis' }],
    worked_example: { title: 'Przykład', problem: 'Policz', steps: [{ num: 1, text: 'Krok' }], result: '3' },
    exam_trap: 'Typowa pułapka.'
  };
  const session = (overrides: Record<string, unknown>) => ({
    sessionId: 'sess_theory_review',
    lessonId: '1.1',
    lessonTitle: 'Lekcja 1.1: Test',
    tasks,
    taskQueue: tasks,
    theoryPill,
    ...overrides
  });
  const mount = (data: any) => render(
    <SessionRunner
      sessionData={data}
      userState={{ coins: 100, hearts: 5, xp: 50, streakDays: 3, isPro: false } as any}
      onCompleteSession={vi.fn()}
      onCancelSession={vi.fn()}
    />
  );

  beforeEach(() => {
    localStorage.clear();
    __resetDatabaseConnectionForTests();
  });
  afterEach(() => {
    cleanup();
    localStorage.clear();
    __resetDatabaseConnectionForTests();
  });

  it('„Same zadania” (currentStep: 1) pomija pigułkę i od razu pokazuje zadanie', () => {
    mount(session({ currentStep: 1 }));
    expect(screen.getByText('Pierwsze zadanie')).toBeDefined();
    expect(document.getElementById('session-start-tasks-button')).toBeNull();
    expect(document.getElementById('session-theory-review-button')).not.toBeNull();
  });

  it('„Pełna lekcja” zaczyna od pigułki i nie pokazuje przycisku Teoria', () => {
    mount(session({ currentStep: 0 }));
    expect(screen.queryByText('Pierwsze zadanie')).toBeNull();
    expect(document.getElementById('session-theory-review-button')).toBeNull();
  });

  it('Teoria z poziomu zadania wraca do tego samego zadania z zachowaną odpowiedzią', async () => {
    mount(session({ currentStep: 1, currentQueueIndex: 1 }));
    expect(screen.getByText('Drugie zadanie')).toBeDefined();

    fireEvent.click(screen.getByText('Odp D'));
    fireEvent.click(document.getElementById('session-theory-review-button')!);

    expect(screen.queryByText('Drugie zadanie')).toBeNull();
    const back = document.getElementById('session-theory-return-button');
    expect(back).not.toBeNull();

    fireEvent.click(back!);
    expect(screen.getByText('Drugie zadanie')).toBeDefined();
    expect(screen.queryByText('Pierwsze zadanie')).toBeNull();

    await act(async () => { await new Promise(r => setTimeout(r, 350)); });
    const saved = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)!);
    expect(saved.currentQueueIndex).toBe(1);
    expect(saved.currentStep).toBe(1);
    expect(['B', 'Odp D']).toContain(saved.selectedOption);
  });
});
