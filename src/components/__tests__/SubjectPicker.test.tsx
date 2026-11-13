// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SubjectPicker } from '../SubjectPicker';

describe('SubjectPicker', () => {
  afterEach(cleanup);
  it('preserves the selected level and emits one complete selection', () => {
    const onChange = vi.fn();
    render(<SubjectPicker value="math-roz" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Zmień przedmiot: Matematyka, Rozszerzenie'));
    fireEvent.click(screen.getByLabelText('Język angielski, Rozszerzenie'));
    expect(onChange).toHaveBeenCalledExactlyOnceWith('eng-roz');
  });
  it('closes the list with Escape without changing the subject', () => {
    const onChange = vi.fn();
    const { container } = render(<SubjectPicker value="pol" onChange={onChange} />);
    const details = container.querySelector('details')!;
    details.open = true;
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(details.open).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });
});
