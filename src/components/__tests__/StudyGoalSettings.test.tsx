// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StudyGoalSettings } from '../StudyGoalSettings';

describe('StudyGoalSettings', () => {
  afterEach(cleanup);
  it('keeps edits as a draft until save and preserves unchanged preferences', () => {
    const onSave = vi.fn();
    render(<StudyGoalSettings value={{ targetExam: 'poprawka', targetScore: '70', dailyMinutes: 10 }} onSave={onSave} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Docelowy wynik'), { target: { value: '100' } });
    expect(onSave).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Zapisz cel' }));
    expect(onSave).toHaveBeenCalledExactlyOnceWith({ targetExam: 'poprawka', targetScore: '100', dailyMinutes: 10 });
  });
  it('cancels without saving', () => {
    const onSave = vi.fn(), onCancel = vi.fn();
    render(<StudyGoalSettings onSave={onSave} onCancel={onCancel} />);
    fireEvent.change(screen.getByLabelText('Czas dziennie'), { target: { value: '15' } });
    fireEvent.click(screen.getByRole('button', { name: 'Anuluj' }));
    expect(onSave).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledOnce();
  });
});
