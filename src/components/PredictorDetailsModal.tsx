import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp } from 'lucide-react';
import { PredictorResult, SubjectKey } from '../types';
import { SubjectPicker } from './SubjectPicker';
import { PredictionScore } from './PredictionScore';
import { triggerHaptic, formatPoints } from '../utils';
import { useCkeCatalogs } from '../services/ckeCatalogRepository';

interface PredictorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseResult: PredictorResult;
  subjectId: string;
  currentSubjectKey?: string;
  onSelectSubject?: (subjectKey: string) => void;
  completedTasks?: string[];
  lessonMistakes?: Record<string, number>;
  userLessonsCompleted?: string[];
  maturaAttempts?: number;
  maturaBestScore?: number;
  onNavigate?: (tab: string, subTab?: string) => void;
  onOpenParentSponsor?: () => void;
  onOpenProPopup?: () => void;
  onOpenDiagnostic?: () => void;
}

export const PredictorDetailsModal: React.FC<PredictorDetailsModalProps> = ({
  isOpen,
  onClose,
  baseResult,
  subjectId,
  currentSubjectKey = 'math',
  onSelectSubject,
  onOpenParentSponsor,
  onOpenDiagnostic,
  onNavigate
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus());
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); }
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), summary, select, [tabindex="0"]') || []).filter(element => element.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('keydown', handleKey); previousFocus?.focus(); };
  }, [isOpen]);
  const isPol = subjectId.includes('polski') || currentSubjectKey === 'pol';
  // Lista przedmiotów CKE pochodzi z Firestore (system/ckeSubjectWeights).
  useCkeCatalogs();
  const pointsMissing = Math.max(0, baseResult.passingThresholdPoints - baseResult.predictedPoints);
  const pointsOver = Math.max(0, baseResult.predictedPoints - baseResult.passingThresholdPoints);

  // Krótki, zwięzły komentarz dopasowany do aktualnego wyniku
  const commentText = (() => {
    if (baseResult.isCalibrating) return 'Prognoza pojawi się po zebraniu wystarczającej liczby odpowiedzi. Wynik jest szacunkiem, nie gwarancją rezultatu egzaminu.';
    if (!baseResult.isPassing) {
      return `Do zdania matury potrzebujesz minimum 30% (${baseResult.passingThresholdPoints} pkt). Do progu brakuje Ci jeszcze ${formatPoints(pointsMissing)} pkt. Prognoza zmienia się wraz z kolejnymi odpowiedziami.`;
    }
    if (baseResult.predictedPercent >= 70) {
      return `Bardzo wysoki wynik (${baseResult.predictedPercent}%). Masz solidnie opanowane kluczowe tematy. Utrzymuj regularny kontakt z zadaniami, by powtórzyć ten wynik na egzaminie.`;
    }
    return `Ten wynik (${baseResult.predictedPercent}%) jest powyżej progu zdania matury (+${formatPoints(pointsOver)} pkt ponad próg 30%). Aby zdobyć więcej punktów pod kątem rekrutacji na studia, przerób dział: ${baseResult.nextBestTopic.topicName}.`;
  })();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          id="predictor-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Prognoza wyniku"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="focus-dialog focus-dialog-scroll relative w-full max-w-md bg-[#0C101C] border border-white/10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
          >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isPol ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                <TrendingUp size={16} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                  Prognoza wyniku
                </h3>
                <p className="text-[11px] text-slate-400">
                  Wynik szacunkowy
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="min-w-11 min-h-11 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer border border-white/5"
              aria-label="Zamknij"
            >
              <X size={15} />
            </button>
          </div>

          <div className="p-4 border-b border-surface-border relative z-20">
            <SubjectPicker value={currentSubjectKey as SubjectKey} onChange={key => onSelectSubject?.(key)} />
          </div>

          {/* Main Content: Prosty wynik procentowy i krótki komentarz */}
          <div className="p-5 flex flex-col gap-4">
            <div className="py-1"><PredictionScore result={baseResult} /><p className="text-xs text-text-secondary mt-3">Szacunek na podstawie Twoich odpowiedzi.</p></div>

            {/* Bardzo krótki, zwięzły komentarz */}
            <div className="py-4 border-t border-surface-border text-sm text-text-secondary leading-relaxed">

              {commentText}
            </div>

            {/* Opcja Testu Diagnostycznego */}
            {onOpenDiagnostic && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-emerald-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-200">
                  <span className="font-extrabold text-amber-300 block">Szybki Test Diagnostyczny CKE</span>
                  <span className="text-[11px] text-slate-300">Rozwiąż 3 zadania, aby uzupełnić dane do prognozy.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    onClose();
                    onOpenDiagnostic();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#FFB800] hover:bg-amber-400 active:scale-95 text-amber-950 font-black text-xs shrink-0 cursor-pointer transition-all shadow-md"
                >
                  Rozpocznij ›
                </button>
              </div>
            )}

            {/* Opcja sponsoringu rodzica */}
            {onOpenParentSponsor && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-amber-300 block">Pakiet PRO</span>
                  <span>Poproś rodzica o nielimitowane serca i powtórki.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('success');
                    onClose();
                    onOpenParentSponsor();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black text-xs shrink-0 cursor-pointer transition-all"
                >
                  BLIK ›
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 active:scale-98 text-white font-bold text-xs tracking-wide transition cursor-pointer"
            >
              Zamknij prognozę
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};
