import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Zap,
  Check,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  EnglishLessonTrapData,
  getTrapDataForLesson,
  TrapChallengeAVsB,
  TrapChallengeSpotAndFix,
  TrapChallengeTrueFalse
} from '../../data/english/englishTrapData';
import { playSuccessSound, playErrorSound, triggerHaptic } from '../../utils';

export interface EnglishTrapInteractiveProps {
  lessonId: string;
  topicId?: string;
  onPassed?: () => void;
  isAlreadyPassed?: boolean;
}

export const EnglishTrapInteractive: React.FC<EnglishTrapInteractiveProps> = ({
  lessonId,
  topicId,
  onPassed,
  isAlreadyPassed = false
}) => {
  const trapData: EnglishLessonTrapData = getTrapDataForLesson(lessonId, topicId);
  const { cards, challenge } = trapData;

  const storageKey = `jasne_trap_passed_${lessonId}`;

  const [hasPassed, setHasPassed] = useState<boolean>(() => {
    if (isAlreadyPassed) return true;
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });

  // Stan mini-treningu
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isAnswerEvaluated, setIsAnswerEvaluated] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [showErrorFeedback, setShowErrorFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (hasPassed && onPassed) {
      onPassed();
    }
  }, [hasPassed, onPassed]);

  const handleSelectAVsB = (isCorrect: boolean, optionKey: 'A' | 'B') => {
    if (isAnswerEvaluated && isAnswerCorrect) return;

    triggerHaptic('light');
    setSelectedAnswer(optionKey);
    setIsAnswerEvaluated(true);

    if (isCorrect) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const handleSelectSpotAndFix = (isCorrect: boolean, optionId: string) => {
    if (isAnswerEvaluated && isAnswerCorrect) return;

    triggerHaptic('light');
    setSelectedAnswer(optionId);
    setIsAnswerEvaluated(true);

    if (isCorrect) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const handleSelectTrueFalse = (userSaysContainsTrap: boolean) => {
    if (isAnswerEvaluated && isAnswerCorrect) return;

    triggerHaptic('light');
    setSelectedAnswer(userSaysContainsTrap);
    setIsAnswerEvaluated(true);

    const tfChallenge = challenge as TrapChallengeTrueFalse;
    const isCorrect = userSaysContainsTrap === tfChallenge.containsCkeTrap;

    if (isCorrect) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const handleSuccess = () => {
    setIsAnswerCorrect(true);
    setShowErrorFeedback(false);
    setHasPassed(true);

    playSuccessSound();
    triggerHaptic('medium');

    try {
      localStorage.setItem(storageKey, 'true');
    } catch {
      // Ignoruj błąd zapisu
    }

    try {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#FFB800', '#10B981', '#38BDF8']
      });
    } catch {
      // Fallback
    }

    if (onPassed) {
      onPassed();
    }
  };

  const handleFailure = () => {
    setIsAnswerCorrect(false);
    setShowErrorFeedback(true);
    playErrorSound();
    triggerHaptic('heavy');
  };

  const handleResetChallenge = () => {
    triggerHaptic('light');
    setSelectedAnswer(null);
    setIsAnswerEvaluated(false);
    setIsAnswerCorrect(false);
    setShowErrorFeedback(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* ========================================================================= */}
      {/* 1. NAGŁÓWEK PUŁAPKI CKE                                                   */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center border shadow-sm bg-rose-500/15 text-rose-400 border-rose-500/30 shrink-0">
            <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span>PUŁAPKA EGZAMINACYJNA CKE • TYPOWY BŁĄD</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Analiza różnicowa: błąd interferencji L1 vs wzorzec klucza maturalnego
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {cards.tip.examTrapFrequency && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/25 px-2.5 py-1 rounded-full shrink-0">
              {cards.tip.examTrapFrequency}
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. UKŁAD 3-KARTOWY NOCTURNE LUMINARY (BŁĄD + POPRAWNIE + WSKAZÓWKA)      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* KARTA 1: CZĘSTY BŁĄD MATURZYSTÓW (DON'T / KALKA L1) */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-rose-950/35 via-[#0E1522] to-[#070A0F] border border-rose-500/35 flex flex-col justify-between gap-3 shadow-[0_4px_24px_rgba(244,63,94,0.12)]">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 border-b border-rose-500/20 pb-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider">
                <XCircle className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span>Częsty błąd maturzystów (DON'T)</span>
              </div>
              <span className="text-[10px] font-extrabold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-md">
                0 PKT CKE
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-rose-500/30 text-rose-200 font-mono text-xs sm:text-sm font-bold line-through decoration-rose-400 decoration-2 break-words">
              {cards.error.wrongText}
            </div>

            <p className="text-xs sm:text-[13px] text-rose-100/90 leading-relaxed font-normal">
              {cards.error.explanation}
            </p>
          </div>

          {cards.error.l1InterferenceNote && (
            <div className="pt-2 border-t border-rose-500/20 text-[11px] text-rose-300/80 flex items-start gap-1.5 font-medium">
              <Info className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>{cards.error.l1InterferenceNote}</span>
            </div>
          )}
        </div>

        {/* KARTA 2: POPRAWNE PODEJŚCIE (DO / KLUCZ CKE) */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-emerald-950/35 via-[#0E1522] to-[#070A0F] border border-emerald-500/35 flex flex-col justify-between gap-3 shadow-[0_4px_24px_rgba(16,185,129,0.12)]">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 border-b border-emerald-500/20 pb-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5] shrink-0" />
                <span>Poprawne podejście (DO)</span>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                KLUCZ CKE
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-300 font-mono text-xs sm:text-sm font-bold break-words">
              {cards.correct.rightText}
            </div>

            <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-normal">
              {cards.correct.explanation}
            </p>
          </div>

          {cards.correct.ckeStandardRule && (
            <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-300/80 flex items-start gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{cards.correct.ckeStandardRule}</span>
            </div>
          )}
        </div>
      </div>

      {/* KARTA 3: WSKAZÓWKA EGZAMINATORA (CKE PATENT) */}
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-amber-950/30 via-[#0E1522] to-[#070A0F] border border-amber-500/35 shadow-[0_4px_24px_rgba(245,158,11,0.12)] space-y-2">
        <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-2 flex-wrap">
          <div className="flex items-center gap-2 text-[#FFB800] text-xs font-black uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 stroke-[2.5] shrink-0" />
            <span>Wskazówka egzaminatora • CKE Patent</span>
          </div>
          <span className="text-[10px] font-extrabold text-[#FFDCA1] bg-[#FFB800]/15 border border-[#FFB800]/30 px-2 py-0.5 rounded-md">
            MNEMOTECHNIKA
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {cards.tip.examinerTip}
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERAKTYWNY MINI-TRENING GATEKEEPERA (+5 XP)                          */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border-2 border-[#FFB800]/40 bg-gradient-to-br from-[#0F172A] via-[#0E1522] to-[#070A0F] p-4 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFB800]/20 border border-[#FFB800]/40 flex items-center justify-center text-[#FFB800] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <span>Mini-trening: Neutralizuj Pułapkę CKE</span>
                {hasPassed && (
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    ZALICZONE (+5 XP)
                  </span>
                )}
              </h4>
              <p className="text-[11px] text-slate-400">
                Wymóg Gatekeepera: Rozwiąż mini-trening, by odblokować zadania bojowe lekcji (brak utraty serc).
              </p>
            </div>
          </div>

          {!hasPassed && (
            <span className="text-[11px] font-bold text-[#FFDCA1] bg-[#FFB800]/15 border border-[#FFB800]/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Nagroda: +5 XP</span>
            </span>
          )}
        </div>

        {/* POLECENIE MINI-TRENINGU */}
        <div className="text-xs sm:text-sm font-semibold text-slate-200">
          {challenge.instruction}
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* FORMAT 1: A_VS_B (POJEDYNEK WARIANTÓW)                                */}
        {/* --------------------------------------------------------------------- */}
        {challenge.type === 'A_VS_B' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* OPCJA A */}
            {(() => {
              const c = challenge as TrapChallengeAVsB;
              const isSelected = selectedAnswer === 'A';
              const showResult = isAnswerEvaluated && isSelected;
              const isWin = showResult && isAnswerCorrect;
              const isLoss = showResult && !isAnswerCorrect;

              return (
                <button
                  type="button"
                  onClick={() => handleSelectAVsB(c.optionA.isCorrect, 'A')}
                  disabled={hasPassed}
                  className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between gap-2.5 cursor-pointer select-none min-h-[96px] ${
                    isWin
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                      : isLoss
                      ? 'bg-rose-950/40 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                      : hasPassed && c.optionA.isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-200 opacity-90'
                      : 'bg-[#121A2A] hover:bg-[#182338] border-white/10 hover:border-[#FFB800]/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs text-white">
                      A
                    </span>
                    {isWin && <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />}
                    {isLoss && <XCircle className="w-4 h-4 text-rose-400 stroke-[3]" />}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-semibold leading-relaxed">
                    {c.optionA.text}
                  </div>
                </button>
              );
            })()}

            {/* OPCJA B */}
            {(() => {
              const c = challenge as TrapChallengeAVsB;
              const isSelected = selectedAnswer === 'B';
              const showResult = isAnswerEvaluated && isSelected;
              const isWin = showResult && isAnswerCorrect;
              const isLoss = showResult && !isAnswerCorrect;

              return (
                <button
                  type="button"
                  onClick={() => handleSelectAVsB(c.optionB.isCorrect, 'B')}
                  disabled={hasPassed}
                  className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between gap-2.5 cursor-pointer select-none min-h-[96px] ${
                    isWin
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                      : isLoss
                      ? 'bg-rose-950/40 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                      : hasPassed && c.optionB.isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-200 opacity-90'
                      : 'bg-[#121A2A] hover:bg-[#182338] border-white/10 hover:border-[#FFB800]/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs text-white">
                      B
                    </span>
                    {isWin && <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />}
                    {isLoss && <XCircle className="w-4 h-4 text-rose-400 stroke-[3]" />}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-semibold leading-relaxed">
                    {c.optionB.text}
                  </div>
                </button>
              );
            })()}
          </div>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* FORMAT 2: SPOT_AND_FIX (WSKAŻ I POPRAW BŁĄD)                          */}
        {/* --------------------------------------------------------------------- */}
        {challenge.type === 'SPOT_AND_FIX' && (
          <div className="space-y-3.5 pt-1">
            {(() => {
              const c = challenge as TrapChallengeSpotAndFix;
              return (
                <>
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
                    {c.sentenceWithMistake.split('[').map((part, idx) => {
                      if (!part.includes(']')) return <span key={idx}>{part}</span>;
                      const [mistake, rest] = part.split(']');
                      return (
                        <React.Fragment key={idx}>
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/25 border border-rose-500/50 text-rose-300 font-bold underline decoration-rose-400 decoration-wavy">
                            {mistake}
                          </span>
                          <span>{rest}</span>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Wybierz poprawny zamiennik dla wyróżnionego fragmentu:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {c.options.map((opt) => {
                      const isSelected = selectedAnswer === opt.id;
                      const showResult = isAnswerEvaluated && isSelected;
                      const isWin = showResult && isAnswerCorrect;
                      const isLoss = showResult && !isAnswerCorrect;

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectSpotAndFix(opt.isCorrect, opt.id)}
                          disabled={hasPassed}
                          className={`p-3 rounded-xl border text-center font-mono font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                            isWin
                              ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-md'
                              : isLoss
                              ? 'bg-rose-950/50 border-rose-500 text-rose-200 shadow-md'
                              : hasPassed && opt.isCorrect
                              ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-300 opacity-90'
                              : 'bg-[#121A2A] hover:bg-[#182338] border-white/10 hover:border-[#FFB800]/50 text-white'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* FORMAT 3: TRUE_FALSE_AUDIT (AUDYT PRAWDA/FAŁSZ)                       */}
        {/* --------------------------------------------------------------------- */}
        {challenge.type === 'TRUE_FALSE_AUDIT' && (
          <div className="space-y-3.5 pt-1">
            {(() => {
              const c = challenge as TrapChallengeTrueFalse;
              return (
                <>
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
                    {c.statement}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelectTrueFalse(true)}
                      disabled={hasPassed}
                      className={`p-3.5 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        selectedAnswer === true && isAnswerEvaluated
                          ? isAnswerCorrect
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/50 border-rose-500 text-rose-200'
                          : hasPassed && c.containsCkeTrap
                          ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-300 opacity-90'
                          : 'bg-[#121A2A] hover:bg-[#182338] border-white/10 hover:border-rose-500/50 text-rose-300'
                      }`}
                    >
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>ZAWIERA BŁĄD CKE</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectTrueFalse(false)}
                      disabled={hasPassed}
                      className={`p-3.5 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        selectedAnswer === false && isAnswerEvaluated
                          ? isAnswerCorrect
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/50 border-rose-500 text-rose-200'
                          : hasPassed && !c.containsCkeTrap
                          ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-300 opacity-90'
                          : 'bg-[#121A2A] hover:bg-[#182338] border-white/10 hover:border-emerald-500/50 text-emerald-300'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>JEST W 100% POPRAWNE</span>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* FEEDBACK PO ROZWIĄZANIU */}
        <AnimatePresence mode="wait">
          {isAnswerEvaluated && isAnswerCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-2 shadow-lg"
            >
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Świetnie! Pułapka CKE zneutralizowana (+5 XP)</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {challenge.trapExplanation}
              </p>
            </motion.div>
          )}

          {showErrorFeedback && !isAnswerCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                  <span>Uważaj! Wpadłeś w pułapkę egzaminatora</span>
                </div>
                <span className="text-[10px] text-rose-300/80 font-semibold">
                  (0 serc utraconych)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
                {challenge.type === 'A_VS_B'
                  ? (challenge as TrapChallengeAVsB).whyIncorrectExplanation
                  : challenge.trapExplanation}
              </p>
              <button
                type="button"
                onClick={handleResetChallenge}
                className="py-2 px-4 rounded-xl font-bold text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Spróbuj ponownie</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
