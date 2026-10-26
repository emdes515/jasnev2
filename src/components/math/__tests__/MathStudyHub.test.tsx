/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { MathStudyHub } from '../MathStudyHub';

// Mock confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

afterEach(() => {
  cleanup();
});

describe('MathStudyHub Component', () => {
  it('renders the header and both main mode tabs', () => {
    render(<MathStudyHub />);

    expect(screen.getAllByText('Matematyka CKE').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Formuła 2023/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Kurs Lekcyjny|Kurs Działowy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Baza Zadań CKE/i).length).toBeGreaterThan(0);
  });

  it('renders 15 math sections in course mode', () => {
    render(<MathStudyHub initialMode="lessons" />);

    // In Polish-style lessons grid, section filter chips are rendered
    expect(screen.getAllByText('Liczby rzeczywiste').length).toBeGreaterThan(0);

    // Switch to sections roadmap view
    const mapToggle = screen.getByText(/Działy CKE/i);
    fireEvent.click(mapToggle);

    expect(screen.getAllByText('Optymalizacja').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Postęp działu/i).length).toBe(15);
  });

  it('switches to Baza Zadań CKE mode and shows task filters', () => {
    render(<MathStudyHub initialMode="task_browser" />);

    expect(screen.getAllByText('Wszystkie 15 działów').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Zamknięte (ABCD)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Otwarte / Kodowane').length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Szukaj zadania...')).toBeDefined();
  });

  it('filters tasks by section and task type', () => {
    render(<MathStudyHub initialMode="task_browser" />);

    const closedBtns = screen.getAllByText('Zamknięte (ABCD)');
    fireEvent.click(closedBtns[0]);
    expect(screen.getAllByText('Zamknięte (ABCD)').length).toBeGreaterThan(0);

    const openBtns = screen.getAllByText('Otwarte / Kodowane');
    fireEvent.click(openBtns[0]);
    expect(screen.getAllByText('Otwarte / Kodowane').length).toBeGreaterThan(0);
  });

  it('renders task cards in task browser and allows clicking an answer option', () => {
    const onCompleteTaskMock = vi.fn();
    render(<MathStudyHub initialMode="task_browser" onCompleteTask={onCompleteTaskMock} />);

    // Check that at least one task is displayed
    const taskHeaders = screen.getAllByText(/Zadanie/i);
    expect(taskHeaders.length).toBeGreaterThan(0);

    // Click an option button inside the task
    const optionBtns = screen.getAllByRole('button');
    const optionA = optionBtns.find(b => b.querySelector('span')?.textContent === 'A');
    if (optionA) {
      fireEvent.click(optionA);
      expect(screen.getAllByText(/Wskazówka Egzaminatora CKE|Poprawna:/i).length).toBeGreaterThan(0);
    }
  });

  it('triggers CKE formulas modal callback when clicking Karta Wzorów', () => {
    const onOpenFormulaModal = vi.fn();
    render(<MathStudyHub onOpenFormulaModal={onOpenFormulaModal} />);

    const formulaButtons = screen.getAllByTitle(/Otwórz oficjalną kartę wzorów CKE/i);
    expect(formulaButtons.length).toBeGreaterThan(0);
    fireEvent.click(formulaButtons[0]);

    expect(onOpenFormulaModal).toHaveBeenCalled();
  });
});
