import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PredictorResult } from '../types';
import { triggerHaptic, formatPoints } from '../utils';
import { getSubjectMetaByKey } from '../services/ckeCatalogRepository';
import { PredictionScore } from './PredictionScore';

interface PredictorWidgetProps {
  result: PredictorResult;
  currentSubjectKey?: string;
  onOpenDetails: () => void;
  onOpenDiagnostic?: () => void;
  onNavigate?: (tab: string, subTab?: string) => void;
}

export const PredictorWidget: React.FC<PredictorWidgetProps> = ({ result, currentSubjectKey = 'math', onOpenDetails }) => {
  const subjectMeta = getSubjectMetaByKey(currentSubjectKey);
  const remaining = Math.max(0, result.calibrationProgress.required - result.calibrationProgress.current);
  const missing = Math.max(0, result.passingThresholdPoints - result.predictedPoints);
  const fill = result.isCalibrating ? result.calibrationProgress.percentage : result.predictedPercent;
  return (
    <button type="button" id="matura-predictor-hero-widget" onClick={() => { triggerHaptic('light'); onOpenDetails(); }}
      className="group w-full text-left rounded-2xl bg-surface-card border border-surface-border hover:border-primary/40 p-4 sm:p-5 mb-3.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div><h3 className="text-base font-semibold text-text-primary">Prognoza wyniku</h3><p className="text-xs text-text-secondary mt-1">{subjectMeta.shortName}</p></div>
        <ChevronRight size={18} className="text-text-secondary shrink-0 mt-1 group-hover:text-primary" aria-hidden="true" />
      </div>
      <PredictionScore result={result} />
      <p className="text-sm text-text-secondary leading-relaxed mt-3">
        {result.isCalibrating
          ? `Do pierwszej prognozy pozostało ${remaining} ${remaining === 1 ? 'zadanie' : remaining < 5 ? 'zadania' : 'zadań'}.`
          : !result.isPassing
            ? `Do progu 30% brakuje ${formatPoints(missing)} pkt.`
            : `Prognoza przekracza próg 30% o ${formatPoints(result.predictedPoints - result.passingThresholdPoints)} pkt.`}
      </p>
      <div className="mt-4 h-1.5 rounded-full bg-surface-border relative" aria-hidden="true">
        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, fill))}%` }} />
        {!result.isCalibrating && <span className="absolute top-[-3px] h-3 w-px bg-text-secondary" style={{ left: `${result.passingThresholdPoints / result.totalExamPoints * 100}%` }} />}
      </div>
      <div className="flex justify-between gap-3 mt-2 text-xs text-text-secondary">
        <span>{result.isCalibrating ? `${result.calibrationProgress.current} z ${result.calibrationProgress.required} zadań` : `Próg zdania: ${result.passingThresholdPoints} pkt`}</span>
        <span className="group-hover:text-primary">Jak liczymy wynik</span>
      </div>
    </button>
  );
};