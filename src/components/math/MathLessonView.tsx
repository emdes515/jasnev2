import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Award,
  FileText,
  Bookmark,
  Eye,
  XCircle,
  HelpCircle,
  Check,
  Send,
  Lightbulb,
  GraduationCap,
  ListOrdered,
  Flame,
  CheckCheck,
  Lock,
  Unlock,
  ShieldCheck,
  RefreshCw,
  Target,
  Trophy,
  Compass,
  ArrowRight,
  ChevronDown,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { MathRenderer } from '../MathRenderer';
import { MathDiagram } from '../MathDiagram';
import { NumberLineDiagram } from '../NumberLineDiagram';
import { LessonTheoryPill, UserState } from '../../types';
import { playSuccessSound, playErrorSound, triggerHaptic } from '../../utils';
import { shuffleGatekeeperQuestion } from '../../utils/taskShuffler';
import { recordMistake } from '../../data/mistakesManager';

export interface MathLessonDefinitionData {
  id: string;
  order: number;
  title: string;
  short_title: string;
  badge: string;
  archetypeCode?: string;
  estimated_time_formatted?: string;
  topicId?: string;
  topicTitle?: string;
  theory_pill: LessonTheoryPill;
  tasks?: any[];
}

export interface MathLessonViewProps {
  lesson: MathLessonDefinitionData;
  onBack: () => void;
  onNextLesson?: (nextLessonId: string) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
  onOpenFormulas?: (topicId?: string) => void;
  userState?: UserState;
}

export type MathLessonStage = 'intro' | 'practice' | 'summary';

interface TaskAnswerState {
  selectedOption: string | null;
  numericAnswer: string;
  isSubmitted: boolean;
  attempts: number;
  pointsAwarded: number;
  maxPoints: number;
  isCorrect: boolean | null;
  feedback: {
    message: string;
    isCorrect: boolean;
  } | null;
}

export const MathLessonView: React.FC<MathLessonViewProps> = ({
  lesson,
  onBack,
  onNextLesson,
  onCompleteLesson,
  onOpenFormulas,
  userState
}) => {
  // 3-etapowa ścieżka dydaktyczna Core-4
  const [currentStage, setCurrentStage] = useState<MathLessonStage>('intro');

  // Weryfikacja wstępu teoretycznego (Gatekeeper) – zapamiętywana lokalnie
  const [isIntroPassed, setIsIntroPassed] = useState<boolean>(() => {
    try {
      if (!lesson?.id) return false;
      const saved = localStorage.getItem(`jasne_gatekeeper_math_${lesson.id}`);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Stan odpowiedzi na pytanie Gatekeepera
  const [gatekeeperSelected, setGatekeeperSelected] = useState<number | null>(null);
  const [gatekeeperSubmitted, setGatekeeperSubmitted] = useState<boolean>(false);
  const [gatekeeperError, setGatekeeperError] = useState<boolean>(false);

  // Zadania przypisane do tej lekcji
  const lessonTasks = useMemo(() => {
    return lesson.tasks && lesson.tasks.length > 0 ? lesson.tasks : [];
  }, [lesson]);

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const currentTask = lessonTasks[activeTaskIndex] || lessonTasks[0];

  // Filtrowanie zadań w panelu bocznym
  const [taskFilter, setTaskFilter] = useState<'all' | 'closed' | 'open'>('all');
  const [isMobileTasksSheetOpen, setIsMobileTasksSheetOpen] = useState(false);

  const filteredLessonTasks = useMemo(() => {
    if (taskFilter === 'closed') {
      return lessonTasks.filter(t => t.type === 'SINGLE_CHOICE' || t.type === 'TRUE_FALSE' || !t.type);
    }
    if (taskFilter === 'open') {
      return lessonTasks.filter(t => t.type !== 'SINGLE_CHOICE' && t.type !== 'TRUE_FALSE' && t.type);
    }
    return lessonTasks;
  }, [lessonTasks, taskFilter]);

  // Odpowiedzi i stan sprawdzania dla każdego zadania w lekcji
  const [taskAnswers, setTaskAnswers] = useState<Record<string, TaskAnswerState>>(() => {
    try {
      if (!lesson?.id) return {};
      const saved = localStorage.getItem(`jasne_math_lesson_answers_${lesson.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      if (!lesson?.id) return;
      const saved = localStorage.getItem(`jasne_math_lesson_answers_${lesson.id}`);
      setTaskAnswers(saved ? JSON.parse(saved) : {});
    } catch {
      setTaskAnswers({});
    }
  }, [lesson?.id]);

  useEffect(() => {
    try {
      if (lesson?.id && Object.keys(taskAnswers).length > 0) {
        localStorage.setItem(`jasne_math_lesson_answers_${lesson.id}`, JSON.stringify(taskAnswers));
      }
    } catch (e) {
      console.warn('Błąd zapisu odpowiedzi w localStorage:', e);
    }
  }, [taskAnswers, lesson?.id]);

  const currentAnswerState = useMemo<TaskAnswerState>(() => {
    if (!currentTask) {
      return {
        selectedOption: null,
        numericAnswer: '',
        isSubmitted: false,
        attempts: 0,
        pointsAwarded: 0,
        maxPoints: 1,
        isCorrect: null,
        feedback: null
      };
    }
    return (
      taskAnswers[currentTask.id] || {
        selectedOption: null,
        numericAnswer: '',
        isSubmitted: false,
        attempts: 0,
        pointsAwarded: 0,
        maxPoints: currentTask.points || 1,
        isCorrect: null,
        feedback: null
      }
    );
  }, [taskAnswers, currentTask]);

  const updateCurrentAnswer = (patch: Partial<TaskAnswerState>) => {
    if (!currentTask) return;
    setTaskAnswers(prev => {
      const cur = prev[currentTask.id] || {
        selectedOption: null,
        numericAnswer: '',
        isSubmitted: false,
        attempts: 0,
        pointsAwarded: 0,
        maxPoints: currentTask.points || 1,
        isCorrect: null,
        feedback: null
      };
      return {
        ...prev,
        [currentTask.id]: {
          ...cur,
          ...patch
        }
      };
    });
  };

  // Timer lekcji (domyślnie 45 minut)
  const durationMin = 45;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(durationMin * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Pytanie Gatekeepera (weryfikacja zrozumienia po wstępie teoretycznym)
  const gatekeeperQuestion = useMemo(() => {
    const tp = lesson.theory_pill;
    const formulas = tp?.core_formulas || [];
    const firstFormula = formulas[0]?.formula || '|x - a| \\le r';

    return shuffleGatekeeperQuestion({
      question: `Zgodnie z zasadą CKE dla tematu "${lesson.title}": co jest kluczowym warunkiem poprawności przy rozwiązywaniu tego typu zadań?`,
      options: [
        tp?.key_points?.[0] || 'Należy bezwzględnie sprawdzić założenia i dziedzinę równania/nierówności.',
        'Można całkowicie zignorować dziedzinę, jeśli delta jest ujemna.',
        'Wystarczy podstawić zero i wybrać największy wynik liczbowy.',
        'Wszystkie wyniki ujemne należy bez wyjątku odrzucić.'
      ],
      correctIndex: 0,
      explanation: tp?.exam_trap || 'Zawsze pamiętaj o wyznaczeniu założeń oraz sprawdzeniu pułapek egzaminacyjnych CKE!'
    });
  }, [lesson]);

  const handleGatekeeperSubmit = () => {
    if (gatekeeperSelected === null) return;
    setGatekeeperSubmitted(true);
    triggerHaptic('medium');

    if (gatekeeperSelected === gatekeeperQuestion.correctIndex) {
      playSuccessSound();
      setIsIntroPassed(true);
      setGatekeeperError(false);
      try {
        localStorage.setItem(`jasne_gatekeeper_math_${lesson.id}`, 'true');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } catch {}
    } else {
      playErrorSound();
      setGatekeeperError(true);
    }
  };

  // Obliczenie statystyk ukończenia
  const completedTasksCount = useMemo(() => {
    return Object.values(taskAnswers).filter(a => a.isSubmitted && a.pointsAwarded > 0).length;
  }, [taskAnswers]);

  const completionPercent = lessonTasks.length > 0
    ? Math.round((completedTasksCount / lessonTasks.length) * 100)
    : 0;

  const isSummaryUnlocked = completionPercent >= 60 || completedTasksCount >= Math.min(3, lessonTasks.length);

  // Sprawdzanie zadania ABCD z systemem 2 prób
  const handleSubmitSingleChoice = () => {
    if (!currentTask || !currentAnswerState.selectedOption) return;
    const normCorrect = String(currentTask.correct_answer || currentTask.correctAnswer || 'A').toUpperCase().trim();
    const isCorrect = currentAnswerState.selectedOption.toUpperCase().trim() === normCorrect;
    const newAttempts = currentAnswerState.attempts + 1;
    const maxPts = currentTask.points || 1;

    if (isCorrect) {
      playSuccessSound();
      triggerHaptic('success');
      const earned = newAttempts === 1 ? maxPts : Math.max(0.5, maxPts * 0.5);

      updateCurrentAnswer({
        isSubmitted: true,
        attempts: newAttempts,
        pointsAwarded: earned,
        isCorrect: true,
        feedback: {
          isCorrect: true,
          message: newAttempts === 1
            ? `Znakomicie! Poprawna odpowiedź z oficjalnego klucza CKE (+${earned} pkt).`
            : `Poprawna odpowiedź w 2. próbie (+${earned} pkt).`
        }
      });

      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    } else {
      playErrorSound();
      triggerHaptic('error');

      if (newAttempts === 1) {
        updateCurrentAnswer({
          attempts: newAttempts,
          isCorrect: false,
          feedback: {
            isCorrect: false,
            message: 'Niestety to nie jest poprawna odpowiedź. Masz jeszcze 1 próbę (za 50% punktów) lub możesz odsłonić klucz CKE.'
          }
        });
      } else {
        updateCurrentAnswer({
          isSubmitted: true,
          attempts: newAttempts,
          pointsAwarded: 0,
          isCorrect: false,
          feedback: {
            isCorrect: false,
            message: 'Błędna odpowiedź w 2. próbie (0 pkt). Zapoznaj się z poniższym wyjaśnieniem i poprawnym rozwiązaniem CKE.'
          }
        });

        recordMistake({
          taskId: currentTask.id,
          subject: 'matematyka',
          topicOrEpoch: lesson.topicTitle || lesson.short_title,
          title: currentTask.lessonTitle || currentTask.title || `Zadanie ${activeTaskIndex + 1}`,
          question: currentTask.content || currentTask.question || '',
          taskType: currentTask.type || 'SINGLE_CHOICE',
          points: maxPts,
          correctAnswer: normCorrect,
          userWrongAnswer: currentAnswerState.selectedOption,
          explanation: currentTask.explanation || ''
        });
      }
    }
  };

  // Sprawdzanie zadania numerycznego / otwartego
  const handleSubmitNumeric = () => {
    if (!currentTask || !currentAnswerState.numericAnswer.trim()) return;
    const input = currentAnswerState.numericAnswer.trim();
    const normCorrect = String(currentTask.numeric_correct_answer || currentTask.correct_answer || currentTask.correctAnswer || '').trim();

    const parseVal = (raw: string): number => {
      const s = raw.trim().replace(/,/g, '.').replace(/[−–]/g, '-').replace(/[\$\s]/g, '');
      const frac = s.match(/\\frac\{?([^}]+)\}?\{?([^}]+)\}?/);
      if (frac) {
        const n = parseFloat(frac[1]);
        const d = parseFloat(frac[2]);
        if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d;
      }
      if (s.includes('/')) {
        const parts = s.split('/');
        if (parts.length === 2) {
          const n = parseFloat(parts[0]);
          const d = parseFloat(parts[1]);
          if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d;
        }
      }
      return parseFloat(s);
    };

    const normStr = (s: string) => s
      .replace(/\s+/g, '')
      .replace(/,/g, '.')
      .replace(/[−–]/g, '-')
      .replace(/[\$\{\}]/g, '')
      .toLowerCase();

    const valUser = parseVal(input);
    const valTarget = parseVal(normCorrect);
    const isCorrect = (normStr(input) === normStr(normCorrect)) ||
      (!isNaN(valUser) && !isNaN(valTarget) && Math.abs(valUser - valTarget) < 0.01);
    const newAttempts = currentAnswerState.attempts + 1;
    const maxPts = currentTask.points || 1;

    if (isCorrect) {
      playSuccessSound();
      triggerHaptic('success');
      const earned = newAttempts === 1 ? maxPts : Math.max(0.5, maxPts * 0.5);

      updateCurrentAnswer({
        isSubmitted: true,
        attempts: newAttempts,
        pointsAwarded: earned,
        isCorrect: true,
        feedback: {
          isCorrect: true,
          message: `Idealnie wyliczony wynik! Zgodność z kluczem CKE (+${earned} pkt).`
        }
      });

      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    } else {
      playErrorSound();
      triggerHaptic('error');

      if (newAttempts === 1) {
        updateCurrentAnswer({
          attempts: newAttempts,
          isCorrect: false,
          feedback: {
            isCorrect: false,
            message: 'Twój wynik różni się od klucza. Sprawdź obliczenia pośrednie i spróbuj ponownie (druga próba za 50% pkt).'
          }
        });
      } else {
        updateCurrentAnswer({
          isSubmitted: true,
          attempts: newAttempts,
          pointsAwarded: 0,
          isCorrect: false,
          feedback: {
            isCorrect: false,
            message: `Prawidłowy wynik wg CKE to: ${normCorrect}. Przeanalizuj poniższe obliczenia krok po kroku.`
          }
        });

        recordMistake({
          taskId: currentTask.id,
          subject: 'matematyka',
          topicOrEpoch: lesson.topicTitle || lesson.short_title,
          title: currentTask.lessonTitle || currentTask.title || `Zadanie ${activeTaskIndex + 1}`,
          question: currentTask.content || currentTask.question || '',
          taskType: currentTask.type || 'NUMERIC_INPUT',
          points: maxPts,
          correctAnswer: normCorrect,
          userWrongAnswer: input,
          explanation: currentTask.explanation || ''
        });
      }
    }
  };

  // Zaliczenie lekcji
  const handleFinalizeLesson = () => {
    triggerHaptic('success');
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch {}
    if (onCompleteLesson) {
      onCompleteLesson(lesson.id, 150);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-[#dfe2f1] font-sans pb-24 animate-fadeIn">
      {/* =========================================================================
          NAGŁÓWEK LEKCJI (TOP BAR)
          Wstecz • Tytuł • Czasomierz • Serca / Monety / Streak
         ========================================================================= */}
      <header className="sticky top-0 z-30 bg-[#070a0f]/95 backdrop-blur-md border-b border-[#141d2e] px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Lewa strona: Powrót + Tytuł lekcji */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] border border-[#141d2e] text-[#94a3b8] hover:text-[#ffdca1] transition-colors cursor-pointer shrink-0"
              title="Wróć do katalogu lekcji"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20">
                  {lesson.badge || `Lekcja ${lesson.order}`}
                </span>
                {lesson.topicTitle && (
                  <span className="text-[11px] text-[#94a3b8] hidden sm:inline">
                    {lesson.topicTitle}
                  </span>
                )}
                {lesson.archetypeCode && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0e1522] text-[#ffb800] border border-[#141d2e]">
                    {lesson.archetypeCode}
                  </span>
                )}
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate mt-0.5">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Prawa strona: Karta Wzorów, Czasomierz i Statystyki */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {onOpenFormulas && (
              <button
                onClick={() => onOpenFormulas(lesson.topicId)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] border border-[#ffb800]/30 text-[#ffdca1] text-xs font-semibold transition-all cursor-pointer shadow-xs"
                title="Otwórz Tablice Wzorów CKE"
              >
                <Compass className="w-3.5 h-3.5 text-[#ffb800]" />
                <span>Wzory CKE</span>
              </button>
            )}

            {/* Czasomierz */}
            <div className="flex items-center gap-1.5 bg-[#0e1522] px-2.5 py-1.5 rounded-xl border border-[#141d2e] text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-[#ffb800]" />
              <span className="font-bold text-white tracking-wider">{formatTimer(secondsRemaining)}</span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 hover:text-white text-[#94a3b8] transition-colors ml-0.5"
                title={isTimerRunning ? 'Pauza' : 'Wznów'}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
              </button>
              <button
                onClick={() => setSecondsRemaining(durationMin * 60)}
                className="p-1 hover:text-white text-[#94a3b8] transition-colors"
                title="Zresetuj czas"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* User State */}
            {userState && (
              <div className="hidden md:flex items-center gap-3 bg-[#0e1522] px-3 py-1.5 rounded-xl border border-[#141d2e] text-xs">
                <span className="flex items-center gap-1 text-rose-400 font-semibold" title="Serca">
                  ❤️ {userState.hearts ?? 5}
                </span>
                <span className="flex items-center gap-1 text-[#ffdca1] font-semibold" title="Monety">
                  🪙 {userState.coins ?? 0}
                </span>
                <span className="flex items-center gap-1 text-orange-400 font-semibold" title="Dni streaku">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" /> {userState.streakDays ?? 0}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================================
            3-ETAPOWA NAWIGACJA Z BLOKADAMI DYDAKTYCZNYMI
           ===================================================================== */}
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#141d2e]">
          {/* KROK 1: Wstęp Teoretyczny */}
          <button
            onClick={() => setCurrentStage('intro')}
            className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
              currentStage === 'intro'
                ? 'bg-[#ffb800]/15 border-[#ffb800]/60 text-[#ffdca1] shadow-xs'
                : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1]'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStage === 'intro'
                  ? 'bg-[#ffb800] text-slate-950'
                  : isIntroPassed
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-[#141d2e] text-[#94a3b8]'
              }`}
            >
              {isIntroPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5">
                <span className="hidden sm:inline">1. Wstęp Teoretyczny</span>
                <span className="sm:hidden">1. Teoria</span>
                {isIntroPassed && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              </div>
              <div className="text-[10px] text-[#94a3b8] truncate hidden sm:block">
                Pigułka Bento & Gatekeeper CKE
              </div>
            </div>
          </button>

          {/* KROK 2: Praktyka CKE (wymaga zaliczenia Gatekeepera) */}
          <button
            onClick={() => {
              if (isIntroPassed) setCurrentStage('practice');
            }}
            disabled={!isIntroPassed}
            className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              !isIntroPassed
                ? 'bg-[#0e1522]/40 border-[#141d2e] text-[#94a3b8]/50 cursor-not-allowed opacity-60'
                : currentStage === 'practice'
                ? 'bg-[#ffb800]/15 border-[#ffb800]/60 text-[#ffdca1] cursor-pointer shadow-xs'
                : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] cursor-pointer'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                !isIntroPassed
                  ? 'bg-[#141d2e] text-[#94a3b8]/50'
                  : currentStage === 'practice'
                  ? 'bg-[#ffb800] text-slate-950'
                  : 'bg-[#141d2e] text-[#94a3b8]'
              }`}
            >
              {!isIntroPassed ? <Lock className="w-3 h-3 text-[#94a3b8]" /> : '2'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5">
                <span className="hidden sm:inline">2. Praktyka CKE</span>
                <span className="sm:hidden">2. Zadania</span>
                {!isIntroPassed && <Lock className="w-3 h-3 text-[#ffb800]/60 shrink-0" />}
              </div>
              <div className="text-[10px] text-[#94a3b8] truncate hidden sm:block">
                {!isIntroPassed ? 'Wymaga zdania wstępu' : `Zadania z arkuszy (${completedTasksCount}/${lessonTasks.length})`}
              </div>
            </div>
          </button>

          {/* KROK 3: Podsumowanie (wymaga min. 60% zadań) */}
          <button
            onClick={() => {
              if (isSummaryUnlocked) setCurrentStage('summary');
            }}
            disabled={!isSummaryUnlocked}
            className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              !isSummaryUnlocked
                ? 'bg-[#0e1522]/40 border-[#141d2e] text-[#94a3b8]/50 cursor-not-allowed opacity-60'
                : currentStage === 'summary'
                ? 'bg-[#ffb800]/15 border-[#ffb800]/60 text-[#ffdca1] cursor-pointer shadow-xs'
                : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] cursor-pointer'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                !isSummaryUnlocked
                  ? 'bg-[#141d2e] text-[#94a3b8]/50'
                  : currentStage === 'summary'
                  ? 'bg-[#ffb800] text-slate-950'
                  : 'bg-[#141d2e] text-[#94a3b8]'
              }`}
            >
              {!isSummaryUnlocked ? <Lock className="w-3 h-3 text-[#94a3b8]" /> : '3'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5">
                <span className="hidden sm:inline">3. Podsumowanie</span>
                <span className="sm:hidden">3. Raport</span>
                {!isSummaryUnlocked && <Lock className="w-3 h-3 text-[#94a3b8] shrink-0" />}
              </div>
              <div className="text-[10px] text-[#94a3b8] truncate hidden sm:block">
                {!isSummaryUnlocked ? `Min. 60% zadań (${completionPercent}%)` : 'Wnioski & Zaliczenie (+XP)'}
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* =========================================================================
          GŁÓWNA ZAWARTOŚĆ LEKCJI
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
        {/* =====================================================================
            ETAP 1: WSTĘP TEORETYCZNY (BENTO CORE-4 + GATEKEEPER CKE)
           ===================================================================== */}
        {currentStage === 'intro' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
            {/* Banner Modułu */}
            <div className="p-5 rounded-2xl bg-[#0e1522] border border-[#141d2e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20">
                    Etap 1 z 3 • Wstęp Dydaktyczny
                  </span>
                  <span className="text-xs text-[#94a3b8]">Czas trwania: ok. 5 minut</span>
                </div>
                <h2 className="text-lg font-bold text-white">{lesson.title}</h2>
                <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                  Zapoznaj się z esencją pojęcia, oficjalnymi wzorami CKE oraz modelowym przykładem, a następnie rozwiąż pytanie Gatekeepera, aby odblokować zadania egzaminacyjne.
                </p>
              </div>

              {isIntroPassed && (
                <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Wstęp zaliczony</span>
                </div>
              )}
            </div>

            {/* Pigułka Bento: 5 Sekcji Core-4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Istota Konceptu */}
              <div className="p-5 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-2">
                <div className="flex items-center gap-2 text-[#ffdca1] text-xs font-bold uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-[#ffb800]" />
                  <span>Istota Konceptu (Z polskiego na nasze)</span>
                </div>
                <div className="text-sm text-[#dfe2f1] leading-relaxed">
                  <MathRenderer content={lesson.theory_pill?.concept_essence || 'Kluczowe pojęcie matematyczne wg standardu CKE Formuła 2023.'} />
                </div>
              </div>

              {/* 2. Kontekst CKE */}
              <div className="p-5 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>Kontekst Maturalny CKE</span>
                </div>
                <div className="text-sm text-[#dfe2f1] leading-relaxed">
                  <MathRenderer content={lesson.theory_pill?.matura_context || 'Zadanie regularnie pojawia się w arkuszach maturalnych na poziomie podstawowym.'} />
                </div>
              </div>

              {/* 3. Wzory KaTeX */}
              <div className="p-5 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-3 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#ffdca1] text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-[#ffb800]" />
                    <span>Oficjalne Wzory z Karty CKE</span>
                  </div>
                  {onOpenFormulas && (
                    <button
                      onClick={() => onOpenFormulas(lesson.topicId)}
                      className="text-xs text-[#ffdca1] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Pełna karta wzorów</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(lesson.theory_pill?.core_formulas || []).map((f, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-1">
                      <span className="text-[11px] font-semibold text-[#94a3b8]">{f.name}</span>
                      <div className="text-sm text-white font-mono py-1 overflow-x-auto">
                        <MathRenderer content={`$$${f.formula}$$`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Modelowy Przykład */}
              {lesson.theory_pill?.worked_example && (
                <div className="p-5 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-3 md:col-span-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zadanie Pokazowe (Krok po kroku)</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-2">
                    <div className="text-xs font-bold text-[#ffdca1]">Treść zadania:</div>
                    <div className="text-sm text-white">
                      <MathRenderer content={lesson.theory_pill.worked_example.problem} />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070a0f]/80 border border-[#141d2e] space-y-2">
                    <div className="text-xs font-bold text-emerald-400">Rozwiązanie egzaminatora:</div>
                    <div className="text-xs sm:text-sm text-[#dfe2f1] leading-relaxed">
                      <MathRenderer content={lesson.theory_pill.worked_example.solution} />
                    </div>
                    {lesson.theory_pill.worked_example.keyInsight && (
                      <div className="pt-2 border-t border-[#141d2e] text-xs text-[#ffdca1] flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#ffb800] shrink-0" />
                        <span><strong>Kluczowy wniosek:</strong> {lesson.theory_pill.worked_example.keyInsight}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 5. Pułapka CKE */}
              {lesson.theory_pill?.exam_trap && (
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Złota Pułapka Egzaminacyjna CKE</span>
                  </div>
                  <div className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                    <MathRenderer content={lesson.theory_pill.exam_trap} />
                  </div>
                </div>
              )}
            </div>

            {/* =================================================================
                GATEKEEPER CKE (AKTYWNA WERYFIKACJA WIEDZY PRZED ZADANIAMI)
               ================================================================= */}
            <div className="p-6 rounded-2xl bg-[#0e1522] border-2 border-[#ffb800]/40 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ffb800]/20 text-[#ffdca1] flex items-center justify-center font-bold text-xs">
                    CKE
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Gatekeeper CKE: Test Zrozumienia Konceptu
                    </h3>
                    <p className="text-[11px] text-[#94a3b8]">
                      Wskaż poprawną zasadę, aby zdjąć blokadę etapu praktyki.
                    </p>
                  </div>
                </div>

                {isIntroPassed && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    Zaliczone
                  </span>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-[#070a0f] border border-[#141d2e] text-xs sm:text-sm text-white leading-relaxed">
                {gatekeeperQuestion.question}
              </div>

              <div className="space-y-2">
                {gatekeeperQuestion.options.map((opt, idx) => {
                  const isSelected = gatekeeperSelected === idx;
                  const isCorrect = idx === gatekeeperQuestion.correctIndex;

                  return (
                    <button
                      key={idx}
                      disabled={isIntroPassed}
                      onClick={() => {
                        setGatekeeperSelected(idx);
                        setGatekeeperSubmitted(false);
                        setGatekeeperError(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                        gatekeeperSubmitted && isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-sm'
                          : gatekeeperSubmitted && isSelected && !isCorrect
                          ? 'bg-rose-950/40 border-rose-500 text-rose-200 shadow-sm'
                          : isSelected
                          ? 'bg-[#ffb800]/20 border-[#ffdca1] text-white ring-1 ring-[#ffb800]/50 shadow-sm'
                          : 'bg-[#121a2b] border border-white/10 text-white hover:border-[#ffb800]/40 hover:bg-[#18233a] shadow-xs'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-[#ffb800] text-slate-950'
                          : 'bg-white/10 border border-white/15 text-[#ffdca1]'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 font-medium">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {gatekeeperError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Niepoprawna odpowiedź. Przeanalizuj pułapkę CKE i spróbuj ponownie!</span>
                </div>
              )}

              {/* Dolne przyciski akcji */}
              <div className="flex items-center justify-between pt-3 border-t border-[#141d2e]">
                <span className="text-xs text-[#94a3b8]">
                  {isIntroPassed ? 'Wstęp zaliczony – możesz przejść do zadań.' : 'Wymagane zatwierdzenie poprawnej odpowiedzi.'}
                </span>

                {!isIntroPassed ? (
                  <button
                    onClick={handleGatekeeperSubmit}
                    disabled={gatekeeperSelected === null}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md shadow-[#ffb800]/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Sprawdź odpowiedź</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentStage('practice');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/10 transition-all cursor-pointer"
                  >
                    <span>Przejdź do zadań CKE ({lessonTasks.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            ETAP 2: PRAKTYKA CKE (ZADANIA MATURALNE Z SILNIKIEM SPRAWDZANIA)
           ===================================================================== */}
        {currentStage === 'practice' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            {/* Panel boczny: Lista zadań (4 kolumny na desktopie, ukryty na mobile na rzecz BottomSheet) */}
            <div className="hidden lg:block lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#ffdca1]" />
                    <h3 className="text-sm font-bold text-white">Zadania w lekcji</h3>
                  </div>
                  <span className="text-xs font-bold text-[#ffdca1]">
                    {completedTasksCount} / {lessonTasks.length} zaliczone
                  </span>
                </div>

                {/* Filtry zadań: Wszystkie / Zamknięte / Otwarte */}
                <div className="flex items-center gap-1 bg-[#070a0f] p-1 rounded-xl border border-[#141d2e]">
                  <button
                    onClick={() => setTaskFilter('all')}
                    className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      taskFilter === 'all'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1]'
                        : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                    }`}
                  >
                    Wszystkie ({lessonTasks.length})
                  </button>
                  <button
                    onClick={() => setTaskFilter('closed')}
                    className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      taskFilter === 'closed'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1]'
                        : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                    }`}
                  >
                    ABCD
                  </button>
                  <button
                    onClick={() => setTaskFilter('open')}
                    className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      taskFilter === 'open'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1]'
                        : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                    }`}
                  >
                    Otwarte
                  </button>
                </div>

                {/* Lista kafelków zadań */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredLessonTasks.map((t, idx) => {
                    const ans = taskAnswers[t.id];
                    const isCompleted = ans?.isSubmitted && ans.pointsAwarded > 0;
                    const isFailed = ans?.isSubmitted && ans.pointsAwarded === 0;
                    const isActive = currentTask?.id === t.id;

                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          const realIdx = lessonTasks.findIndex(x => x.id === t.id);
                          if (realIdx >= 0) setActiveTaskIndex(realIdx);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isActive
                            ? 'bg-[#ffb800]/15 border-[#ffdca1] text-white shadow-xs'
                            : isCompleted
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 hover:border-emerald-500/50'
                            : isFailed
                            ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                            : 'bg-[#070a0f] border-[#141d2e] text-[#dfe2f1] hover:border-[#1e293b] hover:bg-[#121b2b]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : isFailed
                                ? 'bg-rose-500/20 text-rose-400'
                                : isActive
                                ? 'bg-[#ffb800] text-slate-950'
                                : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8]'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <span className="text-xs font-semibold block truncate">
                              {t.lessonTitle || t.title || `Zadanie ${idx + 1}`}
                            </span>
                            <span className="text-[10px] text-[#94a3b8] block truncate">
                              {t.source || 'CKE Formuła 2023'} • {t.points || 1} pkt
                            </span>
                          </div>
                        </div>

                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isFailed ? (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Pasek postępu odblokowania podsumowania */}
                <div className="pt-3 border-t border-[#141d2e] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#94a3b8]">
                    <span>Wymóg do zaliczenia:</span>
                    <span className="font-bold text-[#ffdca1]">{completionPercent}% / 60%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#070a0f] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ea580c] to-[#ffb800] transition-all duration-300"
                      style={{ width: `${Math.min(100, (completionPercent / 60) * 100)}%` }}
                    />
                  </div>
                  {isSummaryUnlocked && (
                    <button
                      onClick={() => {
                        setCurrentStage('summary');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full mt-2 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-500/25 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Przejdź do podsumowania lekcji →</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Główny obszar: Zadanie CKE (8 kolumn na desktopie, 12 na mobile) */}
            <div className="lg:col-span-8 space-y-5">
              {currentTask ? (
                <div className="p-4 sm:p-6 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-5 shadow-lg">
                  {/* Górny pasek zadania */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-[#141d2e]">
                    <div className="flex items-center gap-2">
                      {/* Przycisk otwarcia listy zadań na mobile */}
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setIsMobileTasksSheetOpen(true);
                        }}
                        className="lg:hidden flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#ffb800]/15 border border-[#ffb800]/40 text-[#ffdca1] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
                      >
                        <Target size={13} className="text-[#ffb800]" />
                        <span>Zadanie {activeTaskIndex + 1}/{lessonTasks.length}</span>
                        <ChevronDown size={13} />
                      </button>

                      <span className="hidden lg:inline-block px-2.5 py-0.5 rounded-lg bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 text-xs font-bold">
                        Zadanie {activeTaskIndex + 1} z {lessonTasks.length}
                      </span>
                      <span className="text-xs text-[#94a3b8]">
                        Waga: <strong>{currentTask.points || 1} pkt</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] sm:text-xs text-[#94a3b8] font-mono">
                        {currentTask.source || 'CKE Formuła 2023'}
                      </span>
                      <span className="lg:hidden text-[11px] font-bold text-[#ffdca1] bg-[#070a0f] px-2 py-0.5 rounded-md border border-[#141d2e]">
                        {completedTasksCount}/{lessonTasks.length}
                      </span>
                    </div>
                  </div>

                  {/* Treść Zadania (z MathRenderer KaTeX) */}
                  <div className="space-y-3">
                    <div className="text-sm sm:text-base text-white leading-relaxed">
                      <MathRenderer content={currentTask.content || currentTask.question || ''} />
                    </div>

                    {/* Diagram / Oś liczbowa / Geometria */}
                    {currentTask.plot && (
                      <div className="my-3 p-3 bg-[#070a0f] rounded-xl border border-[#141d2e] flex justify-center">
                        <MathDiagram diagram={currentTask.plot} />
                      </div>
                    )}
                    {currentTask.diagram && (
                      <div className="my-3 p-3 bg-[#070a0f] rounded-xl border border-[#141d2e] flex justify-center">
                        <NumberLineDiagram data={currentTask.diagram} />
                      </div>
                    )}
                  </div>

                  {/* Interaktywny Selektor Odpowiedzi (ABCD lub Numeryczny) */}
                  {currentTask.type === 'SINGLE_CHOICE' || (!currentTask.type && currentTask.options && currentTask.options.length > 0) ? (
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">
                        Wybierz odpowiedź CKE:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(currentTask.options || []).map((opt: any, idx: number) => {
                          const optionLetter = String.fromCharCode(65 + idx);
                          const isSelected = currentAnswerState.selectedOption === optionLetter;
                          const normCorrect = String(currentTask.correct_answer || currentTask.correctAnswer || 'A').toUpperCase().trim();
                          const isRevealedKey = currentAnswerState.isSubmitted;

                          return (
                            <button
                              key={idx}
                              disabled={currentAnswerState.isSubmitted && currentAnswerState.isCorrect === true}
                              onClick={() => {
                                updateCurrentAnswer({
                                  selectedOption: optionLetter,
                                  feedback: null
                                });
                              }}
                              className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                                isRevealedKey && optionLetter === normCorrect
                                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-sm'
                                  : isRevealedKey && isSelected && optionLetter !== normCorrect
                                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 shadow-sm'
                                  : isSelected
                                  ? 'bg-[#ffb800]/20 border-[#ffdca1] text-white ring-1 ring-[#ffb800]/50 shadow-sm'
                                  : 'bg-[#121a2b] border border-white/10 text-white hover:border-[#ffb800]/40 hover:bg-[#18233a] shadow-xs'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                isSelected
                                  ? 'bg-[#ffb800] text-slate-950'
                                  : 'bg-white/10 border border-white/15 text-[#ffdca1]'
                              }`}>
                                {optionLetter}
                              </span>
                              <div className="flex-1 overflow-x-auto font-medium">
                                <MathRenderer content={typeof opt === 'string' ? opt : (opt.text || opt.label || '')} />
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Przycisk Sprawdzenia ABCD */}
                      {!currentAnswerState.isSubmitted && (
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={handleSubmitSingleChoice}
                            disabled={!currentAnswerState.selectedOption}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md shadow-[#ffb800]/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span>Zatwierdź odpowiedź</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Zadanie Otwarte / Numeryczne */
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">
                        Wpisz swój wynik liczbowy:
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          disabled={currentAnswerState.isSubmitted && currentAnswerState.isCorrect === true}
                          value={currentAnswerState.numericAnswer}
                          onChange={(e) => updateCurrentAnswer({ numericAnswer: e.target.value, feedback: null })}
                          placeholder="Np. 12 lub 3/4 lub 2.5"
                          className="w-48 bg-[#070a0f] border border-[#141d2e] rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#ffdca1]"
                        />
                        {!currentAnswerState.isSubmitted && (
                          <button
                            onClick={handleSubmitNumeric}
                            disabled={!currentAnswerState.numericAnswer.trim()}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                          >
                            <span>Sprawdź</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Informacja zwrotna (Feedback) */}
                  {currentAnswerState.feedback && (
                    <div
                      className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                        currentAnswerState.feedback.isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold">
                        {currentAnswerState.feedback.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                        )}
                        <span>{currentAnswerState.feedback.message}</span>
                      </div>
                    </div>
                  )}

                  {/* Rozwiązanie CKE Krok po Kroku (wyświetlane po zatwierdzeniu) */}
                  {currentAnswerState.isSubmitted && (
                    <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-3">
                      <div className="flex items-center gap-2 text-[#ffdca1] text-xs font-bold uppercase tracking-wider">
                        <CheckCheck className="w-4 h-4 text-[#ffb800]" />
                        <span>Oficjalne Rozwiązanie i Wyjaśnienie CKE</span>
                      </div>

                      <div className="text-xs sm:text-sm text-[#dfe2f1] leading-relaxed">
                        <MathRenderer content={currentTask.explanation || 'Brak dodatkowego opisu rozwiązania.'} />
                      </div>

                      {currentTask.matura_tip && (
                        <div className="pt-2 border-t border-[#141d2e] text-xs text-amber-300 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span><strong>Wskazówka maturalna:</strong> {currentTask.matura_tip}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dolna nawigacja pomiędzy zadaniami */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#141d2e]">
                    <button
                      onClick={() => setActiveTaskIndex(Math.max(0, activeTaskIndex - 1))}
                      disabled={activeTaskIndex === 0}
                      className="px-4 py-2 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-xs font-semibold text-[#94a3b8] hover:text-white flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Poprzednie</span>
                    </button>

                    <button
                      onClick={() => {
                        if (activeTaskIndex < lessonTasks.length - 1) {
                          setActiveTaskIndex(activeTaskIndex + 1);
                        } else if (isSummaryUnlocked) {
                          setCurrentStage('summary');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] border border-[#141d2e] text-xs font-semibold text-[#ffdca1] flex items-center gap-1.5 transition-colors"
                    >
                      <span>{activeTaskIndex < lessonTasks.length - 1 ? 'Następne zadanie' : 'Podsumowanie'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#0e1522] border border-[#141d2e] text-center text-[#94a3b8]">
                  Brak zadań w wybranym filtrze.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            ETAP 3: PODSUMOWANIE (CELEBRACJA + WNIOSKI + ODBIÓR XP)
           ===================================================================== */}
        {currentStage === 'summary' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn text-center">
            <div className="p-8 rounded-3xl bg-[#0e1522] border-2 border-[#ffb800]/40 shadow-2xl space-y-5">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#ea580c] to-[#ffb800] p-0.5 shadow-lg shadow-[#ffb800]/20 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#070a0f] flex items-center justify-center">
                  <Award className="w-10 h-10 text-[#ffdca1]" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Misja Zakończona Sukcesem
                </span>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Lekcja Opanowana!
                </h2>
                <p className="text-xs text-[#94a3b8] max-w-md mx-auto mt-1">
                  Świetna robota. Wymogi CKE Formuła 2023 spełnione dla lekcji: <strong>{lesson.title}</strong>.
                </p>
              </div>

              {/* Box Nagrody */}
              <div className="flex items-center justify-center gap-6 bg-[#070a0f] p-4 rounded-2xl border border-[#141d2e] max-w-xs mx-auto">
                <div className="text-center">
                  <span className="text-xs text-[#94a3b8] block">Doświadczenie</span>
                  <span className="text-lg font-black text-[#ffdca1]">+150 XP</span>
                </div>
                <div className="w-px h-8 bg-[#141d2e]" />
                <div className="text-center">
                  <span className="text-xs text-[#94a3b8] block">Monety</span>
                  <span className="text-lg font-black text-[#ffb800]">+50 🪙</span>
                </div>
              </div>

              {/* Statystyki Sesji */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-xl bg-[#070a0f] border border-[#141d2e]">
                  <span className="text-[11px] text-[#94a3b8] block">Zaliczone zadania</span>
                  <span className="text-base font-bold text-white">
                    {completedTasksCount} / {lessonTasks.length} ({completionPercent}%)
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#070a0f] border border-[#141d2e]">
                  <span className="text-[11px] text-[#94a3b8] block">Status wstępu</span>
                  <span className="text-base font-bold text-emerald-400">
                    Gatekeeper CKE Zdany
                  </span>
                </div>
              </div>

              {/* Złote reguły do zapamiętania */}
              <div className="p-4 rounded-xl bg-[#070a0f]/60 border border-[#141d2e] text-left space-y-2">
                <span className="text-xs font-bold text-[#ffdca1] flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#ffb800]" />
                  <span>Kluczowe patenty maturalne z tej lekcji:</span>
                </span>
                <ul className="space-y-1.5 text-xs text-[#dfe2f1]">
                  {(lesson.theory_pill?.key_points || [
                    'Zawsze wyznaczaj dziedzinę i założenia początkowe.',
                    'Pamiętaj o odwróceniu znaku przy zmianie stron nierówności.',
                    'Stosuj oficjalne wzory z karty CKE Formuła 2023.'
                  ]).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#ffb800] font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Przyciski końcowe */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleFinalizeLesson}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#ffb800]/20 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Zakończ lekcję i odbierz nagrodę</span>
                </button>

                {onNextLesson && (
                  <button
                    onClick={() => {
                      handleFinalizeLesson();
                      onNextLesson(`next-after-${lesson.id}`);
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#ffdca1] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Następna lekcja</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Tasks BottomSheet */}
        <AnimatePresence>
          {isMobileTasksSheetOpen && (
            <div className="fixed inset-0 z-50 flex items-end lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileTasksSheetOpen(false)}
                className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                className="relative z-10 w-full max-h-[85vh] bg-[#0E1522] border-t border-white/10 rounded-t-3xl p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl flex flex-col space-y-3.5"
              >
                {/* Drag handle */}
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto" />

                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#141d2e]">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#ffb800]" />
                      <span>Zadania w lekcji</span>
                    </h3>
                    <p className="text-[11px] text-[#94a3b8]">
                      Zaliczono: {completedTasksCount} z {lessonTasks.length} ({completionPercent}%)
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMobileTasksSheetOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Filtry zadań */}
                <div className="flex items-center gap-1 bg-[#070a0f] p-1 rounded-xl border border-[#141d2e]">
                  <button
                    onClick={() => {
                      triggerHaptic('light');
                      setTaskFilter('all');
                    }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      taskFilter === 'all'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1]'
                        : 'text-[#94a3b8]'
                    }`}
                  >
                    Wszystkie ({lessonTasks.length})
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic('light');
                      setTaskFilter('closed');
                    }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      taskFilter === 'closed'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1]'
                        : 'text-[#94a3b8]'
                    }`}
                  >
                    ABCD
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic('light');
                      setTaskFilter('open');
                    }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      taskFilter === 'open'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1]'
                        : 'text-[#94a3b8]'
                    }`}
                  >
                    Otwarte
                  </button>
                </div>

                {/* Lista zadań z przewijaniem */}
                <div className="overflow-y-auto max-h-[45vh] space-y-2 pr-1 scrollbar-thin">
                  {filteredLessonTasks.map((t, idx) => {
                    const ans = taskAnswers[t.id];
                    const isCompleted = ans?.isSubmitted && ans.pointsAwarded > 0;
                    const isFailed = ans?.isSubmitted && ans.pointsAwarded === 0;
                    const isActive = currentTask?.id === t.id;

                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          triggerHaptic('light');
                          const realIdx = lessonTasks.findIndex(x => x.id === t.id);
                          if (realIdx >= 0) setActiveTaskIndex(realIdx);
                          setIsMobileTasksSheetOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isActive
                            ? 'bg-[#ffb800]/15 border-[#ffdca1] text-white shadow-xs'
                            : isCompleted
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                            : isFailed
                            ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                            : 'bg-[#070a0f] border-[#141d2e] text-[#dfe2f1]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : isFailed
                                ? 'bg-rose-500/20 text-rose-400'
                                : isActive
                                ? 'bg-[#ffb800] text-slate-950'
                                : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8]'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <span className="text-xs font-semibold block truncate">
                              {t.lessonTitle || t.title || `Zadanie ${idx + 1}`}
                            </span>
                            <span className="text-[10px] text-[#94a3b8] block truncate">
                              {t.source || 'CKE Formuła 2023'} • {t.points || 1} pkt
                            </span>
                          </div>
                        </div>

                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isFailed ? (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Podsumowanie statusu zaliczenia */}
                <div className="pt-2 border-t border-[#141d2e] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#94a3b8]">
                    <span>Wymóg do zaliczenia:</span>
                    <span className="font-bold text-[#ffdca1]">{completionPercent}% / 60%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#070a0f] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ea580c] to-[#ffb800] transition-all duration-300"
                      style={{ width: `${Math.min(100, (completionPercent / 60) * 100)}%` }}
                    />
                  </div>

                  {isSummaryUnlocked && (
                    <button
                      onClick={() => {
                        triggerHaptic('medium');
                        setIsMobileTasksSheetOpen(false);
                        setCurrentStage('summary');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Przejdź do podsumowania lekcji →</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
