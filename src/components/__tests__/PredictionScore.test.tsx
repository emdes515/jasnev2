// @vitest-environment happy-dom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PredictionScore } from '../PredictionScore';
import { PredictorResult } from '../../types';

describe('PredictionScore', () => {
  afterEach(cleanup);
  const result = { isCalibrating: false, predictedPercent: 12, predictedPoints: 7.2, totalExamPoints: 60 } as PredictorResult;
  it('shows the same percentage and Polish point notation', () => {
    render(<PredictionScore result={result} />);
    expect(screen.getByLabelText('Prognozowany wynik: 12 procent')).toBeTruthy();
    expect(screen.getByText('7,2 z 60 pkt')).toBeTruthy();
  });
  it('does not present a numerical forecast before calibration completes', () => {
    render(<PredictionScore result={{ ...result, isCalibrating: true }} />);
    expect(screen.getByText('Zbieramy dane do prognozy')).toBeTruthy();
    expect(screen.queryByLabelText(/Prognozowany wynik/)).toBeNull();
  });
});
