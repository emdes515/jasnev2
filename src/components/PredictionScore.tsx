import { PredictorResult } from '../types';
import { formatPoints } from '../utils';

/** Shared score typography for the dashboard and prediction details. */
export function PredictionScore({ result }: { result: PredictorResult }) {
  if (result.isCalibrating) return <p className="text-xl font-semibold text-text-primary">Zbieramy dane do prognozy</p>;
  return <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
    <span aria-label={`Prognozowany wynik: ${result.predictedPercent} procent`} className="inline-flex items-baseline gap-1 text-text-primary tabular-nums whitespace-nowrap">
      <span className="text-4xl sm:text-5xl font-semibold leading-none tracking-tight">{result.predictedPercent}</span>
      <span className="text-xl font-medium text-text-secondary">%</span>
    </span>
    <span className="text-sm text-text-secondary tabular-nums">{formatPoints(result.predictedPoints)} z {result.totalExamPoints} pkt</span>
  </div>;
}
