// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { EnglishTrapInteractive } from '../EnglishTrapInteractive';
import { getTrapDataForLesson } from '../../../data/english/englishTrapData';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('EnglishTrapInteractive & englishTrapData', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('englishTrapData registry & retrieval', () => {
    it('provides valid trap data for lesson-1-1 with A_VS_B challenge', () => {
      const data = getTrapDataForLesson('eng-lesson-1-1', 'eng-dzial-1');
      expect(data).toBeDefined();
      expect(data.cards.error.wrongText).toContain('I am knowing him');
      expect(data.cards.correct.rightText).toContain('I have known him');
      expect(data.cards.tip.examinerTip).toBeTruthy();
      expect(data.challenge.type).toBe('A_VS_B');
    });

    it('provides SPOT_AND_FIX challenge for lesson-1-2', () => {
      const data = getTrapDataForLesson('eng-lesson-1-2', 'eng-dzial-1');
      expect(data.challenge.type).toBe('SPOT_AND_FIX');
      if (data.challenge.type === 'SPOT_AND_FIX') {
        expect(data.challenge.sentenceWithMistake).toContain('[');
        expect(data.challenge.options.length).toBeGreaterThanOrEqual(2);
        expect(data.challenge.options.some((o) => o.isCorrect)).toBe(true);
      }
    });

    it('provides TRUE_FALSE_AUDIT challenge for lesson-1-3', () => {
      const data = getTrapDataForLesson('eng-lesson-1-3', 'eng-dzial-1');
      expect(data.challenge.type).toBe('TRUE_FALSE_AUDIT');
      if (data.challenge.type === 'TRUE_FALSE_AUDIT') {
        expect(typeof data.challenge.containsCkeTrap).toBe('boolean');
        expect(data.challenge.statement).toBeTruthy();
      }
    });

    it('falls back gracefully for an unlisted lesson ID', () => {
      const data = getTrapDataForLesson('eng-lesson-nonexistent', 'eng-dzial-1');
      expect(data).toBeDefined();
      expect(data.cards).toBeDefined();
      expect(data.challenge).toBeDefined();
    });
  });

  describe('EnglishTrapInteractive Component Rendering & Interactions', () => {
    it('renders the 3-card layout (Error, Correct, Tip)', () => {
      const { container } = render(
        <EnglishTrapInteractive lessonId="eng-lesson-1-1" topicId="eng-dzial-1" />
      );

      expect(container.textContent).toContain('PUŁAPKA EGZAMINACYJNA CKE • TYPOWY BŁĄD');
      expect(container.textContent).toContain('Częsty błąd maturzystów');
      expect(container.textContent).toContain('Poprawne podejście');
      expect(container.textContent).toContain('Wskazówka egzaminatora');
    });

    it('handles A_VS_B selection: fails on wrong answer without losing hearts, unlocks on correct answer', () => {
      const onPassedMock = vi.fn();
      const { container } = render(
        <EnglishTrapInteractive
          lessonId="eng-lesson-1-1"
          topicId="eng-dzial-1"
          onPassed={onPassedMock}
        />
      );

      // Find buttons for option A and option B
      const buttons = container.querySelectorAll('button');
      const optionBButton = Array.from(buttons).find((b) =>
        b.textContent?.includes('I am understanding')
      );
      expect(optionBButton).toBeDefined();
      fireEvent.click(optionBButton!);

      expect(container.textContent).toContain('Uważaj! Wpadłeś w pułapkę egzaminatora');
      expect(container.textContent).toContain('0 serc utraconych');
      expect(onPassedMock).not.toHaveBeenCalled();

      // Click retry
      const retryButtons = container.querySelectorAll('button');
      const retryBtn = Array.from(retryButtons).find((b) =>
        b.textContent?.includes('Spróbuj ponownie')
      );
      expect(retryBtn).toBeDefined();
      fireEvent.click(retryBtn!);

      // Click option A (correct)
      const afterRetryButtons = container.querySelectorAll('button');
      const optionAButton = Array.from(afterRetryButtons).find((b) =>
        b.textContent?.includes('I understand what you mean')
      );
      expect(optionAButton).toBeDefined();
      fireEvent.click(optionAButton!);

      expect(container.textContent).toContain('Pułapka CKE zneutralizowana');
      expect(onPassedMock).toHaveBeenCalled();
      expect(localStorage.getItem('jasne_trap_passed_eng-lesson-1-1')).toBe('true');
    });

    it('renders and solves a SPOT_AND_FIX challenge', () => {
      const onPassedMock = vi.fn();
      const { container } = render(
        <EnglishTrapInteractive
          lessonId="eng-lesson-1-2"
          topicId="eng-dzial-1"
          onPassed={onPassedMock}
        />
      );

      expect(container.textContent).toContain('Wskaż prawidłowy zamiennik');

      // Click correct option "started"
      const buttons = container.querySelectorAll('button');
      const startedOption = Array.from(buttons).find(
        (b) => b.textContent?.trim() === 'started'
      );
      expect(startedOption).toBeDefined();
      fireEvent.click(startedOption!);

      expect(container.textContent).toContain('Pułapka CKE zneutralizowana');
      expect(onPassedMock).toHaveBeenCalled();
    });

    it('renders and solves a TRUE_FALSE_AUDIT challenge', () => {
      const onPassedMock = vi.fn();
      const { container } = render(
        <EnglishTrapInteractive
          lessonId="eng-lesson-1-3"
          topicId="eng-dzial-1"
          onPassed={onPassedMock}
        />
      );

      // For lesson 1-3 statement contains a trap: click "ZAWIERA BŁĄD CKE"
      const buttons = container.querySelectorAll('button');
      const containsTrapBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('ZAWIERA BŁĄD CKE')
      );
      expect(containsTrapBtn).toBeDefined();
      fireEvent.click(containsTrapBtn!);

      expect(container.textContent).toContain('Pułapka CKE zneutralizowana');
      expect(onPassedMock).toHaveBeenCalled();
    });
  });
});
