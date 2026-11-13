// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';

vi.mock('motion/react', () => ({
  motion: new Proxy({}, {
    get: (_t, tag: string) => ({ children, initial: _i, animate: _a, exit: _e, transition: _tr, ...props }: any) => React.createElement(tag, props, children),
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => true,
}));

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

vi.mock('../../utils', () => ({
  triggerHaptic: vi.fn(),
  playSuccessSound: vi.fn(),
}));

import { OnboardingOverlay, DEFAULT_ONBOARDING_PREFERENCES } from '../OnboardingOverlay';
import { SUBJECT_OPTIONS } from '../../lib/subjects';
import { onboardingDemoFor } from '../../data/onboardingDemo';

afterEach(() => cleanup());

const next = (name: RegExp | string = /^Dalej/) => fireEvent.click(screen.getByRole('button', { name }));

describe('OnboardingOverlay', () => {
  it('startuje od obietnicy wartości, bez pytania o cel', () => {
    render(<OnboardingOverlay onClose={vi.fn()} onLogin={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Matura w 5 minut dziennie' })).toBeDefined();
    expect(screen.queryByText(/cel/i)).toBeNull();
    expect(screen.getByRole('button', { name: /Zaczynam/ })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Mam już konto' })).toBeDefined();
  });

  it('Pomiń kończy bez nagrody i z domyślnym przedmiotem', () => {
    const onComplete = vi.fn();
    render(<OnboardingOverlay onClose={vi.fn()} onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: /Pomiń/ }));
    expect(onComplete).toHaveBeenCalledWith(DEFAULT_ONBOARDING_PREFERENCES, false, false, 'math');
  });

  it('pokazuje wszystkie przedmioty i poziomy ze wspólnego modelu', () => {
    render(<OnboardingOverlay onClose={vi.fn()} />);
    next(/Zaczynam/);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(SUBJECT_OPTIONS.length);
    for (const option of SUBJECT_OPTIONS) {
      expect(screen.getByRole('radio', { name: `${option.name}, ${option.level}` })).toBeDefined();
    }
  });

  it('przechodzi cały przepływ i przekazuje wybrany przedmiot oraz nagrodę za zadanie', () => {
    const onComplete = vi.fn();
    render(<OnboardingOverlay onClose={vi.fn()} onComplete={onComplete} />);
    next(/Zaczynam/);
    fireEvent.click(screen.getByRole('radio', { name: 'Język polski, Podstawa' }));
    next();

    const demo = onboardingDemoFor('pol');
    expect(screen.getByText(demo.prompt)).toBeDefined();
    expect((screen.getByRole('button', { name: /^Dalej/ }) as HTMLButtonElement).disabled).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'A. metafory' }));
    expect(screen.getByText('Pułapka')).toBeDefined();
    expect((screen.getByRole('button', { name: /^Dalej/ }) as HTMLButtonElement).disabled).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'B. porównania' }));
    expect(screen.getByText(/Dobrze\. \+15 XP/)).toBeDefined();
    next();

    expect(screen.getByRole('heading', { name: 'Co jeszcze tu masz' })).toBeDefined();
    expect(screen.getAllByRole('article')).toHaveLength(4);
    next();

    expect(screen.getByRole('heading', { name: 'Dzień 1 serii' })).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /Zaczynam naukę/ }));
    expect(onComplete).toHaveBeenCalledWith(DEFAULT_ONBOARDING_PREFERENCES, false, true, 'pol');
  });

  it('pominięcie zadania próbnego nie daje serii ani XP', () => {
    const onComplete = vi.fn();
    render(<OnboardingOverlay onClose={vi.fn()} onComplete={onComplete} />);
    next(/Zaczynam/);
    next();
    fireEvent.click(screen.getByRole('button', { name: 'Pomiń zadanie' }));
    next();
    expect(screen.getByRole('heading', { name: 'Wszystko gotowe' })).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /Zaczynam naukę/ }));
    expect(onComplete).toHaveBeenCalledWith(DEFAULT_ONBOARDING_PREFERENCES, false, false, 'math');
  });

  it('opcjonalne konto otwiera logowanie i można wrócić do poprzedniego kroku', () => {
    const onComplete = vi.fn();
    render(<OnboardingOverlay onClose={vi.fn()} onComplete={onComplete} />);
    next(/Zaczynam/);
    fireEvent.click(screen.getByRole('button', { name: 'Wróć do poprzedniego kroku' }));
    expect(screen.getByRole('heading', { name: 'Matura w 5 minut dziennie' })).toBeDefined();
    next(/Zaczynam/);
    next();
    fireEvent.click(screen.getByRole('button', { name: 'Pomiń zadanie' }));
    next();
    fireEvent.click(screen.getByRole('button', { name: 'Zapisz postęp kontem' }));
    expect(onComplete).toHaveBeenCalledWith(DEFAULT_ONBOARDING_PREFERENCES, true, false, 'math');
  });
});

describe('zadania próbne onboardingu', () => {
  it('każde ma poprawną odpowiedź wśród opcji oraz wyjaśnienie pułapki', () => {
    for (const option of SUBJECT_OPTIONS) {
      const demo = onboardingDemoFor(option.key);
      expect(demo.options.some(o => o.id === demo.correctId)).toBe(true);
      expect(new Set(demo.options.map(o => o.text)).size).toBe(demo.options.length);
      expect(demo.trap.length).toBeGreaterThan(20);
      expect(demo.why.length).toBeGreaterThan(20);
    }
  });
});
