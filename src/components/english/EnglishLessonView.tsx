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
  Volume2,
  Shield,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EnglishLessonData } from '../../data/english/englishLessonsData';
import { EnglishTask } from '../../types/englishTypes';
import { ALL_ENGLISH_TASKS, getEnglishTaskById } from '../../data/english/allEnglishTasks';
import { getDuetDataForLesson } from '../../data/english/englishDuetData';
import { EnglishConceptFormatter } from './EnglishConceptFormatter';
import { EnglishTrapInteractive } from './EnglishTrapInteractive';
import { playSuccessSound, playErrorSound, triggerHaptic } from '../../utils';
import { shuffleGatekeeperQuestion } from '../../utils/taskShuffler';
import { WritingWorkspace } from '../writing/WritingWorkspace';
import { WritingEvaluationData } from '../writing/CkeExaminerReport';

export interface EnglishLessonViewProps {
  lesson: EnglishLessonData;
  onBack: () => void;
  onNextLesson?: (nextLessonId: string) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
  isPro?: boolean;
  onOpenProModal?: () => void;
}

export type EnglishLessonStage = 'intro' | 'practice' | 'summary';

interface TaskAnswerState {
  selectedOption: string | null;
  textAnswer: string;
  isSubmitted: boolean;
  attempts: number;
  pointsAwarded: number;
  maxPoints: number;
  isCorrect: boolean | null;
  feedback: {
    message: string;
    explanation?: string;
    ckeTrap?: string;
  } | null;
}

export const EnglishLessonView: React.FC<EnglishLessonViewProps> = ({
  lesson,
  onBack,
  onNextLesson,
  onCompleteLesson,
  isPro = false,
  onOpenProModal
}) => {
  // Etap lekcji: 1. Wstęp Teoretyczny, 2. Zadania CKE, 3. Podsumowanie
  const [currentStage, setCurrentStage] = useState<EnglishLessonStage>('intro');

  // Weryfikacja wstępu teoretycznego (Gatekeeper) – zapamiętywana lokalnie
  const [isIntroPassed, setIsIntroPassed] = useState<boolean>(() => {
    try {
      if (!lesson?.id) return false;
      const saved = localStorage.getItem(`jasne_gatekeeper_${lesson.id}`);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Stan odpowiedzi na pytanie Gatekeepera
  const [gatekeeperSelected, setGatekeeperSelected] = useState<number | null>(null);
  const [gatekeeperSubmitted, setGatekeeperSubmitted] = useState<boolean>(false);
  const [gatekeeperError, setGatekeeperError] = useState<boolean>(false);

  // Dane Pewniaków i DO vs DON'T
  const pewniakData = useMemo(() => {
    return getDuetDataForLesson(lesson.id, lesson.topicId);
  }, [lesson.id, lesson.topicId]);

  // Pobranie zadań przypisanych do tej lekcji (z fallbackiem do zadań działu)
  const lessonTasks = useMemo<EnglishTask[]>(() => {
    if (!lesson) return [];
    let tasks: EnglishTask[] = [];

    if (lesson.taskIds && lesson.taskIds.length > 0) {
      tasks = lesson.taskIds
        .map(id => getEnglishTaskById(id))
        .filter((t): t is EnglishTask => t !== undefined);
    }

    if (tasks.length === 0) {
      tasks = ALL_ENGLISH_TASKS.filter(t => t.topicId === lesson.topicId).slice(0, 5);
    }

    return tasks;
  }, [lesson]);

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const currentTask = lessonTasks[activeTaskIndex] || lessonTasks[0];

  // Odpowiedzi i stan sprawdzania dla każdego zadania w lekcji z pamięcią localStorage
  const [taskAnswers, setTaskAnswers] = useState<Record<string, TaskAnswerState>>(() => {
    try {
      if (!lesson?.id) return {};
      const saved = localStorage.getItem(`jasne_eng_lesson_answers_${lesson.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      if (lesson?.id && Object.keys(taskAnswers).length > 0) {
        localStorage.setItem(`jasne_eng_lesson_answers_${lesson.id}`, JSON.stringify(taskAnswers));
      }
    } catch (e) {
      console.warn('Błąd zapisu taskAnswers w localStorage:', e);
    }
  }, [taskAnswers, lesson?.id]);

  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [userState, setUserState] = useState<{
    hearts?: number;
    coins?: number;
    streakDays?: number;
    isPro?: boolean;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('jasne_user_state');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isProUser = useMemo(() => {
    if (isPro) return true;
    if (userState?.isPro) return true;
    return false;
  }, [isPro, userState]);

  // Evaluacje zadań pisemnych (Zadanie 12 e-mail/blog)
  const [writingEvaluations, setWritingEvaluations] = useState<Record<string, WritingEvaluationData>>(() => {
    try {
      if (!lesson?.id) return {};
      const saved = localStorage.getItem(`jasne_eng_writing_evals_${lesson.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      if (lesson?.id && Object.keys(writingEvaluations).length > 0) {
        localStorage.setItem(`jasne_eng_writing_evals_${lesson.id}`, JSON.stringify(writingEvaluations));
      }
    } catch (e) {
      console.warn('Błąd zapisu writingEvaluations w localStorage:', e);
    }
  }, [writingEvaluations, lesson?.id]);

  const [isEvaluatingWriting, setIsEvaluatingWriting] = useState(false);

  // Sprawdzenie, czy bieżące zadanie to otwarta wypowiedź pisemna (Zadanie 12 CKE)
  const isCurrentTaskWriting = useMemo(() => {
    if (!currentTask) return false;
    return (
      currentTask.type === 'OPEN_TASK' ||
      currentTask.pillarId === 'pillar-writing' ||
      String(currentTask.id).startsWith('eng_wri_') ||
      currentTask.points >= 10 ||
      /e-mail|blog|list|wpis|forum|wypowiedź pisemna|task 12|zadanie 12/i.test(currentTask.question || '')
    );
  }, [currentTask]);

  // Dynamiczny Licznik Czasu Lekcji (np. 15 minut)
  const initialDurationMinutes = lesson?.estimatedMinutes || 15;
  const [secondsRemaining, setSecondsRemaining] = useState(initialDurationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    setSecondsRemaining(initialDurationMinutes * 60);
  }, [lesson?.id, initialDurationMinutes]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Bieżący stan odpowiedzi dla aktywnego zadania
  const currentAnswerState = useMemo<TaskAnswerState>(() => {
    if (!currentTask) {
      return {
        selectedOption: null,
        textAnswer: '',
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
        textAnswer: '',
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
    setTaskAnswers(prev => ({
      ...prev,
      [currentTask.id]: {
        ...(prev[currentTask.id] || {
          selectedOption: null,
          textAnswer: '',
          isSubmitted: false,
          attempts: 0,
          pointsAwarded: 0,
          maxPoints: currentTask.points || 1,
          isCorrect: null,
          feedback: null
        }),
        ...patch
      }
    }));
  };

  // Statystyki ukończenia zadań w lekcji
  const completedTasksCount = useMemo(() => {
    return Object.values(taskAnswers).filter(a => a.isSubmitted).length;
  }, [taskAnswers]);

  const totalPointsEarned = useMemo(() => {
    return Object.values(taskAnswers).reduce((sum, a) => sum + (a.pointsAwarded || 0), 0);
  }, [taskAnswers]);

  const totalMaxPoints = useMemo(() => {
    return lessonTasks.reduce((sum, t) => sum + (t.points || 1), 0);
  }, [lessonTasks]);

  const completionPercent = useMemo(() => {
    if (lessonTasks.length === 0) return 100;
    return Math.round((completedTasksCount / lessonTasks.length) * 100);
  }, [completedTasksCount, lessonTasks.length]);

  const isSummaryUnlocked = completedTasksCount >= Math.min(lessonTasks.length, 3);

  // Dynamiczne Pytanie Gatekeepera (weryfikacja wstępu)
  const gatekeeperQuestion = useMemo(() => {
    if (lesson.theoryPill.worked_examples && lesson.theoryPill.worked_examples.length > 0) {
      const we = lesson.theoryPill.worked_examples[0];
      return shuffleGatekeeperQuestion({
        question: `Test Zrozumienia Wstępu: ${we.problem}`,
        options: [
          we.result || 'Prawidłowa forma gramatyczna zgodna z regułą CKE',
          'Forma dosłownie przetłumaczona z języka polskiego (błędna)',
          'Forma z pominiętym wskaźnikiem gramatycznym (dystraktor)'
        ],
        correctIndex: 0,
        tip: we.matura_tip || 'Zwróć uwagę na wskaźniki czasowe lub regułę rekcji.'
      });
    }
    return shuffleGatekeeperQuestion({
      question: 'Jaką złotą zasadę CKE należy bezwzględnie zastosować w tym temacie?',
      options: [
        'Zawsze kierować się sygnałami gramatycznymi i unikać kalk z języka polskiego.',
        'Tłumaczyć każde zdanie słowo w słowo z polskiego.',
        'Wybierać losowy czasownik bez sprawdzania kontekstu.'
      ],
      correctIndex: 0,
      tip: 'Egzaminator CKE punktuje wyłącznie znajomość autentycznych struktur i kolokacji.'
    });
  }, [lesson]);

  const handleGatekeeperSubmit = () => {
    if (gatekeeperSelected === null) return;
    setGatekeeperSubmitted(true);
    if (gatekeeperSelected === gatekeeperQuestion.correctIndex) {
      setGatekeeperError(false);
      setIsIntroPassed(true);
      playSuccessSound();
      triggerHaptic();
      try {
        localStorage.setItem(`jasne_gatekeeper_${lesson.id}`, 'true');
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
    } else {
      setGatekeeperError(true);
      playErrorSound();
    }
  };

  // Obsługa sprawdzania zadania w Etapie 2
  const handleSubmitCurrentTask = () => {
    if (!currentTask || currentAnswerState.isSubmitted) return;

    let isCorrect = false;
    let points = 0;

    if (currentTask.type === 'SINGLE_CHOICE' || currentTask.type === 'TRUE_FALSE') {
      const selected = currentAnswerState.selectedOption;
      if (!selected) return;

      const normSelected = selected.trim().toLowerCase();
      const normCorrect = currentTask.correctAnswer.trim().toLowerCase();

      // Check against option index or option text or letter
      isCorrect =
        normSelected === normCorrect ||
        (currentTask.options && currentTask.options.some((opt, idx) => {
          const letter = String.fromCharCode(65 + idx).toLowerCase();
          return (normSelected === letter || normSelected === opt.toLowerCase()) && opt.toLowerCase() === normCorrect;
        }));

      // Alternative direct text match
      if (!isCorrect && normSelected.includes(normCorrect)) {
        isCorrect = true;
      }
    } else {
      // WORD_INPUT
      const entered = currentAnswerState.textAnswer.trim().toLowerCase();
      const correct = currentTask.correctAnswer.trim().toLowerCase();
      const variants = (currentTask.acceptedVariants || []).map(v => v.trim().toLowerCase());

      isCorrect = entered === correct || variants.includes(entered);
    }

    points = isCorrect ? (currentTask.points || 1) : 0;

    if (isCorrect) {
      playSuccessSound();
      triggerHaptic();
    } else {
      playErrorSound();
    }

    updateCurrentAnswer({
      isSubmitted: true,
      isCorrect,
      pointsAwarded: points,
      feedback: {
        message: isCorrect ? 'Znakomicie! Odpowiedź w 100% poprawna.' : 'Niestety, to nie jest poprawna odpowiedź.',
        explanation: currentTask.explanation,
        ckeTrap: currentTask.ckeTrap
      }
    });

    setShowExplanation(true);
  };

  // Obsługa sprawdzania zadania pisemnego przez Egzaminatora CKE AI
  const handleEvaluateWriting = async () => {
    if (!currentTask || isEvaluatingWriting) return;
    const answer = (currentAnswerState.textAnswer || '').trim();
    if (answer.split(/\s+/).filter(Boolean).length < 10) return;

    setIsEvaluatingWriting(true);
    triggerHaptic('medium');

    try {
      const res = await fetch('/api/evaluate-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: currentTask.id,
          question: currentTask.question,
          contextText: currentTask.contextText || '',
          officialKey: currentTask.correctAnswer || currentTask.explanation,
          scoring_key: currentTask.explanation,
          studentAnswer: answer,
          taskType: 'OPEN_TASK',
          isEnglish: true,
          subjectId: 'jezyk-angielski',
          maxPoints: currentTask.points || 12,
          ai_tutor_rubric: currentTask.ai_tutor_rubric,
          mode: 'grade'
        })
      });

      if (res.ok) {
        const evalResult: WritingEvaluationData = await res.json();
        setWritingEvaluations(prev => ({
          ...prev,
          [currentTask.id]: evalResult
        }));

        const isPassed = evalResult.isPassed ?? (evalResult.score >= Math.ceil((currentTask.points || 12) * 0.3));
        const points = evalResult.score ?? 0;

        if (isPassed) {
          playSuccessSound();
          triggerHaptic('success');
        } else {
          playErrorSound();
          triggerHaptic('error');
        }

        updateCurrentAnswer({
          isSubmitted: true,
          isCorrect: isPassed,
          pointsAwarded: points,
          feedback: {
            message: evalResult.gradeTitle || `Zdobyto ${points} / ${currentTask.points || 12} pkt CKE`,
            explanation: evalResult.summary || evalResult.mentorComment,
            ckeTrap: currentTask.ckeTrap
          }
        });
        setShowExplanation(true);
      } else {
        console.warn('Błąd oceny AI zadania pisemnego:', res.status);
      }
    } catch (err) {
      console.warn('Błąd połączenia z /api/evaluate-task:', err);
    } finally {
      setIsEvaluatingWriting(false);
    }
  };

  // Zakończenie lekcji i przejście do podsumowania
  const handleFinishLesson = () => {
    setCurrentStage('summary');
    playSuccessSound();
    try {
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {}

    if (onCompleteLesson) {
      onCompleteLesson(lesson.id, totalPointsEarned);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-[#dfe2f1] font-sans pb-32 sm:pb-24 pb-mobile-safe animate-pageTransition">
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
              title="Powrót do Huba Angielskiego"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20">
                  {lesson.topicId.toUpperCase()}
                </span>
                <span className="text-[11px] text-[#94a3b8] hidden sm:inline px-2 py-0.5 rounded-md bg-[#0e1522] border border-[#141d2e]">
                  🔥 {pewniakData.ckeFrequency}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0e1522] text-[#ffb800] border border-[#141d2e] hidden md:inline">
                  FORMUŁA 2023
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate mt-0.5">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Prawa strona: Czasomierz i Statystyki */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Czasomierz lekcji */}
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
                onClick={() => setSecondsRemaining(initialDurationMinutes * 60)}
                className="p-1 hover:text-white text-[#94a3b8] transition-colors"
                title="Zresetuj czas"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Statystyki gracza */}
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
                  ? 'bg-[#ffb800] text-slate-950 font-bold'
                  : isIntroPassed
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-[#141d2e] text-[#94a3b8]'
              }`}
            >
              {isIntroPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5 text-white">
                <span className="hidden sm:inline">1. Wstęp Teoretyczny</span>
                <span className="sm:hidden">1. Teoria</span>
                {isIntroPassed && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              </div>
              <div className="text-[10px] text-[#94a3b8] truncate hidden sm:block">
                {isIntroPassed ? 'Zaliczono Gatekeepera ✓' : 'Zasady & Gatekeeper CKE'}
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
                  ? 'bg-[#ffb800] text-slate-950 font-bold'
                  : 'bg-[#141d2e] text-[#94a3b8]'
              }`}
            >
              {!isIntroPassed ? <Lock className="w-3 h-3 text-[#94a3b8]" /> : '2'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5 text-white">
                <span className="hidden sm:inline">2. Praktyka CKE</span>
                <span className="sm:hidden">2. Zadania</span>
                {!isIntroPassed && <Lock className="w-3 h-3 text-[#ffb800]/60 shrink-0" />}
              </div>
              <div className="text-[10px] text-[#94a3b8] truncate hidden sm:block">
                {!isIntroPassed ? 'Wymaga zdania wstępu' : `Zadania (${completedTasksCount}/${lessonTasks.length})`}
              </div>
            </div>
          </button>

          {/* KROK 3: Podsumowanie (wymaga ukończenia minimum zadań) */}
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
                  ? 'bg-[#ffb800] text-slate-950 font-bold'
                  : 'bg-[#141d2e] text-[#94a3b8]'
              }`}
            >
              {!isSummaryUnlocked ? <Lock className="w-3 h-3 text-[#94a3b8]" /> : '3'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5 text-white">
                <span className="hidden sm:inline">3. Podsumowanie</span>
                <span className="sm:hidden">3. Raport</span>
                {!isSummaryUnlocked && <Lock className="w-3 h-3 text-[#ffb800]/60 shrink-0" />}
              </div>
              <div className="text-[10px] text-[#94a3b8] truncate hidden sm:block">
                {!isSummaryUnlocked ? `Min. 3 zadania (${completionPercent}%)` : 'Raport & +XP'}
              </div>
            </div>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

      {/* ========================================================================= */}
      {/* ETAP 1: WSTĘP TEORETYCZNY + PEWNIAKI + GATEKEEPER CKE                     */}
      {/* ========================================================================= */}
      {currentStage === 'intro' && (
        <div key="intro" className="space-y-6 animate-fadeIn min-w-0">
          {/* BANER MISJI I CELE */}
          <div className="bg-[#0e1522] border border-[#141d2e] rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl min-w-0 overflow-hidden">
            <div className="border-l-4 border-[#ffb800] pl-4 space-y-1 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffb800] block">
                MISJA LEKCJI • CZAS PRZEJŚCIA: ~{lesson.estimatedMinutes || 15} MIN
              </span>
              <p className="text-base sm:text-lg text-white font-bold leading-relaxed break-words">
                Opanuj kluczowe reguły maturalne z tego działu, uniknij pułapki CKE i zdobądź przepustkę do zadań bojowych.
              </p>
            </div>

            {/* CELE MISJI */}
            <div className="bg-[#070a0f] rounded-xl p-4 sm:p-5 border border-[#141d2e] space-y-3 min-w-0 overflow-hidden">
              <div className="text-xs font-bold text-[#ffdca1] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ffb800] shrink-0" />
                <span>Czego nauczysz się w tej sesji:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#dfe2f1] min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#ffb800] mt-1.5 shrink-0" />
                  <span className="break-words flex-1">Błyskawiczne rozpoznawanie sygnałów czasowych i reguł na maturze</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#dfe2f1] min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#ffb800] mt-1.5 shrink-0" />
                  <span className="break-words flex-1">Rozbrajanie dystraktorów i eliminacja typowych kalk językowych L1</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#ffdca1] min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#ffb800] mt-1.5 shrink-0" />
                  <span className="break-words flex-1">Zaliczenie Gatekeepera CKE i zdobycie 100% punktów w zadaniach</span>
                </div>
              </div>
            </div>

            {/* KOMPENDIUM PEWNIAKÓW W KARTACH */}
            <div className="space-y-4 pt-2 min-w-0">
              <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ffb800] shrink-0" />
                <span>Pewniaki Maturalne & Zasady Gry CKE:</span>
              </div>

              {/* Pełna, sformatowana treść z dużymi kartami zasad i wzorcami */}
              <EnglishConceptFormatter content={lesson.theoryPill?.concept_essence || ''} />

              {/* Szybkie skróty par duetu */}
              {pewniakData.pairs && pewniakData.pairs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {pewniakData.pairs.map((pair, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-1.5 hover:border-[#ffb800]/30 transition-colors shadow-xs min-w-0 overflow-hidden"
                    >
                      <div className="text-xs font-bold text-[#ffdca1] flex items-center gap-2 flex-wrap min-w-0">
                        <span className="px-2 py-0.5 rounded-md bg-[#ffb800]/10 text-[#ffdca1] text-[10px] border border-[#ffb800]/20 font-mono shrink-0">
                          § {idx + 1}
                        </span>
                        <span className="break-words min-w-0 flex-1">{pair.leftText}</span>
                      </div>
                      <p className="text-xs text-[#94a3b8] font-medium leading-relaxed break-words">
                        {pair.rightText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PUŁAPKA CKE & TYPOWY BŁĄD */}
            <EnglishTrapInteractive
              lessonId={lesson.id}
              topicId={lesson.topicId}
              onPassed={() => {
                setIsIntroPassed(true);
                try {
                  localStorage.setItem(`jasne_eng_intro_passed_${lesson.id}`, 'true');
                } catch {
                  // Ignoruj błąd zapisu
                }
              }}
              isAlreadyPassed={isIntroPassed}
            />

            {/* ============================================================= */}
            {/* GATEKEEPER CKE: QUIZ WERYFIKACYJNY ODBLOKOWUJĄCY ZADANIA      */}
            {/* ============================================================= */}
            <div className="mt-6 pt-6 border-t border-[#141d2e] min-w-0">
              <div className="p-4 sm:p-6 rounded-2xl bg-[#070a0f] border-2 border-[#ffb800]/40 shadow-xl space-y-4 min-w-0 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 min-w-0">
                  <div className="flex items-center gap-2.5 text-[#ffdca1] font-bold text-sm sm:text-base min-w-0">
                    <ShieldCheck className="w-5 h-5 text-[#ffb800] shrink-0" />
                    <span className="break-words">GATEKEEPER CKE: Test Zrozumienia Wstępu</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 shrink-0">
                    Wymagane do odblokowania zadań
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed break-words">
                  Zgodnie z zasadą pełnego przygotowania maturalnego, nie możesz przejść do zadań bojowych bez wykazania zrozumienia kluczowej pułapki CKE.
                </p>

                <div className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e] text-xs sm:text-sm font-semibold text-white leading-relaxed break-words">
                  {gatekeeperQuestion.question}
                </div>

                {/* OPCJE GATEKEEPERA */}
                <div className="space-y-2.5 min-w-0">
                  {gatekeeperQuestion.options.map((opt, idx) => {
                    const isSelected = gatekeeperSelected === idx;
                    const isCorrect = idx === gatekeeperQuestion.correctIndex;
                    let style = 'border-[#141d2e] bg-[#0e1522] text-[#dfe2f1] hover:border-[#ffb800]/40';

                    if (gatekeeperSubmitted) {
                      if (isCorrect) {
                        style = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        style = 'border-rose-500/60 bg-rose-500/10 text-rose-200';
                      }
                    } else if (isSelected) {
                      style = 'border-[#ffb800] bg-[#ffb800]/15 text-white shadow-xs';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isIntroPassed}
                        onClick={() => {
                          if (!isIntroPassed) {
                            setGatekeeperSelected(idx);
                            setGatekeeperSubmitted(false);
                            setGatekeeperError(false);
                          }
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 cursor-pointer min-w-0 overflow-hidden ${style}`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 text-[#ffdca1]">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="leading-snug break-words flex-1 min-w-0">{opt}</span>
                        </div>
                        {gatekeeperSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {gatekeeperSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {gatekeeperError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5 animate-pulse min-w-0">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="break-words flex-1">Niepoprawna odpowiedź. Wskazówka: {gatekeeperQuestion.tip}</span>
                  </div>
                )}

                {/* PRZYCISK DECYZJI GATEKEEPERA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 min-w-0">
                  {!isIntroPassed ? (
                    <button
                      onClick={handleGatekeeperSubmit}
                      disabled={gatekeeperSelected === null}
                      className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        gatekeeperSelected === null
                          ? 'bg-[#141d2e] text-[#94a3b8]/50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#ffdca1] to-[#ffb800] text-slate-950 hover:brightness-110 shadow-lg shadow-[#ffb800]/20 active:scale-95'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Zatwierdź i Odblokuj Zadania</span>
                    </button>
                  ) : (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 min-w-0">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm min-w-0">
                        <CheckCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="break-words">Wstęp zaliczony! Zadania CKE zostały odblokowane.</span>
                      </div>
                      <button
                        onClick={() => setCurrentStage('practice')}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#ffb800] hover:bg-[#ffc72c] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#ffb800]/20 cursor-pointer active:scale-95 shrink-0"
                      >
                        <span>Przejdź do Zadań CKE</span>
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAP 2: MISJA BOJOWA CKE (ZADANIA)                                       */}
      {/* ========================================================================= */}
      {currentStage === 'practice' && (
        <div key="practice" className="space-y-4 sm:space-y-6 animate-fadeIn min-w-0">
          {/* Mobilny pasek szybkiego wyboru zadań */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] font-bold text-[#94a3b8] shrink-0 mr-1">Zadanie:</span>
            {lessonTasks.map((task, idx) => {
              const state = taskAnswers[task.id];
              const isActive = idx === activeTaskIndex;
              const isDone = state?.isSubmitted;
              const isCorrect = state?.isCorrect;

              return (
                <button
                  key={task.id}
                  onClick={() => {
                    triggerHaptic('light');
                    setActiveTaskIndex(idx);
                    setShowExplanation(Boolean(state?.isSubmitted));
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ffb800]/20 border-[#ffb800] text-[#ffdca1] shadow-xs'
                      : isDone
                      ? isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                      : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <span>{idx + 1}</span>
                  {isDone && (
                    isCorrect ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-w-0">
            {/* PANEL BOCZNY: LISTA ZADAŃ (HUD SIDEBAR - tylko desktop) */}
            <div className="hidden lg:block lg:col-span-4 bg-[#0e1522] border border-[#141d2e] rounded-2xl p-4 space-y-3 shadow-xl min-w-0 overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#141d2e] pb-3 min-w-0">
                <span className="text-xs font-bold uppercase text-[#ffb800] tracking-wider truncate">
                  Zadania CKE ({lessonTasks.length})
                </span>
                <span className="text-xs font-mono font-bold text-white bg-[#070a0f] border border-[#141d2e] px-2.5 py-0.5 rounded-full shrink-0">
                  {completedTasksCount} / {lessonTasks.length}
                </span>
              </div>

              {/* LISTA KAFELKÓW ZADAŃ */}
              <div className="space-y-1.5 min-w-0">
                {lessonTasks.map((task, idx) => {
                  const state = taskAnswers[task.id];
                  const isActive = idx === activeTaskIndex;
                  const isDone = state?.isSubmitted;
                  const isCorrect = state?.isCorrect;

                  return (
                    <button
                      key={task.id}
                      onClick={() => {
                        setActiveTaskIndex(idx);
                        setShowExplanation(Boolean(state?.isSubmitted));
                      }}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer min-w-0 overflow-hidden ${
                        isActive
                          ? 'bg-[#ffb800]/15 border-[#ffb800] text-white shadow-xs'
                          : isDone
                          ? isCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                            : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                          : 'bg-[#070a0f] border-[#141d2e] text-[#94a3b8] hover:bg-[#141d2e] hover:text-[#dfe2f1]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            isDone
                              ? isCorrect
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                              : isActive
                              ? 'bg-[#ffb800] text-slate-950'
                              : 'bg-[#141d2e] text-[#94a3b8]'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div className="truncate text-xs font-semibold min-w-0 flex-1">
                          {task.title || `Zadanie ${idx + 1}`}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        {isDone ? (
                          isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          )
                        ) : (
                          <span className="text-[10px] font-mono text-[#94a3b8]">
                            {task.points || 1} pkt
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* PRZYCISK PODSUMOWANIA W SIDEBARZE */}
              {isSummaryUnlocked && (
                <div className="pt-2 min-w-0">
                  <button
                    onClick={handleFinishLesson}
                    className="w-full py-2.5 rounded-xl bg-[#ffb800] hover:bg-[#ffc72c] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#ffb800]/20 cursor-pointer active:scale-95"
                  >
                    <Trophy className="w-4 h-4 shrink-0" />
                    <span>Zakończ i Zobacz Raport</span>
                  </button>
                </div>
              )}
            </div>

            {/* GŁÓWNY OBSZAR ZADANIA (TASK ARENA) */}
            <div className={`lg:col-span-8 min-w-0 ${isCurrentTaskWriting ? '' : 'bg-[#0e1522] border border-[#141d2e] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl overflow-hidden'}`}>
              {currentTask ? (
                isCurrentTaskWriting ? (
                  <WritingWorkspace
                    taskId={currentTask.id}
                    taskTitle={currentTask.title}
                    taskQuestion={currentTask.question}
                    contextText={currentTask.contextText}
                    maxPoints={currentTask.points || 12}
                    subject="angielski"
                    studentText={currentAnswerState.textAnswer}
                    onChangeText={(txt) => updateCurrentAnswer({ textAnswer: txt })}
                    onEvaluate={handleEvaluateWriting}
                    isEvaluating={isEvaluatingWriting}
                    isPro={isProUser}
                    onOpenProModal={onOpenProModal}
                    evaluation={writingEvaluations[currentTask.id] || null}
                    onResetEvaluation={() => {
                      setWritingEvaluations(prev => {
                        const next = { ...prev };
                        delete next[currentTask.id];
                        return next;
                      });
                      updateCurrentAnswer({
                        isSubmitted: false,
                        isCorrect: null,
                        pointsAwarded: 0
                      });
                      setShowExplanation(false);
                    }}
                    onContinue={() => {
                      if (activeTaskIndex < lessonTasks.length - 1) {
                        setActiveTaskIndex(prev => prev + 1);
                        setShowExplanation(false);
                      } else {
                        handleFinishLesson();
                      }
                    }}
                  />
                ) : (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#141d2e] pb-4 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span className="text-xs font-bold text-[#ffdca1] bg-[#ffb800]/10 border border-[#ffb800]/20 px-3 py-1 rounded-full">
                        {currentTask.source || 'CKE Formuła 2023'}
                      </span>
                      <span className="text-xs font-bold text-[#dfe2f1] bg-white/5 border border-[#141d2e] px-3 py-1 rounded-full">
                        {currentTask.points || 1} PKT
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#94a3b8] shrink-0">
                      Zadanie {activeTaskIndex + 1} z {lessonTasks.length}
                    </span>
                  </div>

                  {/* TYTUŁ I TREŚĆ ZADANIA */}
                  <div className="space-y-4 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white break-words">
                      {currentTask.title}
                    </h3>

                    {/* TEKST ŹRÓDŁOWY / KONTEKST */}
                    {currentTask.contextText && (
                      <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] text-xs sm:text-sm text-[#dfe2f1] leading-relaxed font-serif break-words max-h-96 overflow-y-auto">
                        {currentTask.contextText}
                      </div>
                    )}

                    {/* TRANSKRYPT AUDIO (JEŚLI ZADANIE ZE SŁUCHU) */}
                    {currentTask.transcriptSnippet && (
                      <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/30 text-xs sm:text-sm text-teal-100 leading-relaxed break-words">
                        <div className="flex items-center gap-2 font-bold text-teal-400 text-xs uppercase mb-1">
                          <Volume2 className="w-4 h-4 shrink-0" />
                          <span>Nagranie Audio CKE (Transkrypcja)</span>
                        </div>
                        {currentTask.transcriptSnippet}
                      </div>
                    )}

                    {/* POLECENIE ZADANIA */}
                    <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] text-sm sm:text-base font-semibold text-white leading-relaxed break-words">
                      {currentTask.question}
                    </div>

                    {/* OPCJE ODPOWIEDZI (DLA WYBORU WIELOKROTNEGO) */}
                    {currentTask.options && currentTask.options.length > 0 && (
                      <div className="space-y-2.5 pt-2 min-w-0">
                        {currentTask.options.map((opt, optIdx) => {
                          const letter = String.fromCharCode(65 + optIdx);
                          const isSelected = currentAnswerState.selectedOption === opt || currentAnswerState.selectedOption === letter;
                          const isSubmitted = currentAnswerState.isSubmitted;
                          const isCorrectOption = opt.trim().toLowerCase() === currentTask.correctAnswer.trim().toLowerCase() || letter.toLowerCase() === currentTask.correctAnswer.trim().toLowerCase();

                          let btnStyle = 'border-[#141d2e] bg-[#070a0f] text-[#dfe2f1] hover:border-[#ffb800]/40 hover:bg-[#141d2e]';

                          if (isSubmitted) {
                            if (isCorrectOption) {
                              btnStyle = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200 font-bold';
                            } else if (isSelected && !isCorrectOption) {
                              btnStyle = 'border-rose-500/60 bg-rose-500/10 text-rose-200';
                            }
                          } else if (isSelected) {
                            btnStyle = 'border-[#ffb800] bg-[#ffb800]/15 text-white shadow-xs';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isSubmitted}
                              onClick={() => updateCurrentAnswer({ selectedOption: opt })}
                              className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 cursor-pointer min-w-0 overflow-hidden ${btnStyle}`}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 text-[#ffdca1]">
                                  {letter}
                                </div>
                                <span className="leading-snug break-words flex-1 min-w-0">{opt}</span>
                              </div>
                              {isSubmitted && isCorrectOption && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              )}
                              {isSubmitted && isSelected && !isCorrectOption && (
                                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* POLE TEKSTOWE (DLA ZADAŃ TYPU WORD_INPUT) */}
                    {(!currentTask.options || currentTask.options.length === 0) && (
                      <div className="space-y-3 pt-2 min-w-0">
                        <label className="text-xs font-bold uppercase text-[#94a3b8] block">
                          Wpisz brakujące słowo / frazę:
                        </label>
                        <input
                          type="text"
                          disabled={currentAnswerState.isSubmitted}
                          value={currentAnswerState.textAnswer}
                          onChange={e => updateCurrentAnswer({ textAnswer: e.target.value })}
                          placeholder="Wpisz odpowiedź..."
                          className="w-full p-3.5 rounded-xl bg-[#070a0f] border border-[#141d2e] focus:border-[#ffb800] text-white font-mono text-sm sm:text-base outline-none transition-colors min-w-0 max-w-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* PRZYCISKI AKCJI ZADANIA */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#141d2e] min-w-0">
                    {!currentAnswerState.isSubmitted ? (
                      <button
                        onClick={handleSubmitCurrentTask}
                        disabled={
                          currentTask.options && currentTask.options.length > 0
                            ? !currentAnswerState.selectedOption
                            : !currentAnswerState.textAnswer.trim()
                        }
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                          (currentTask.options && currentTask.options.length > 0
                            ? !currentAnswerState.selectedOption
                            : !currentAnswerState.textAnswer.trim())
                            ? 'bg-[#141d2e] text-[#94a3b8]/50 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#ffdca1] to-[#ffb800] text-slate-950 hover:brightness-110 shadow-lg shadow-[#ffb800]/20 active:scale-95'
                        }`}
                      >
                        <Send className="w-4 h-4 shrink-0" />
                        <span>Zatwierdź odpowiedź</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            if (activeTaskIndex < lessonTasks.length - 1) {
                              setActiveTaskIndex(prev => prev + 1);
                              setShowExplanation(false);
                            } else {
                              handleFinishLesson();
                            }
                          }}
                          className="px-6 py-2.5 rounded-xl bg-[#ffb800] hover:bg-[#ffc72c] text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#ffb800]/20 cursor-pointer active:scale-95"
                        >
                          <span>{activeTaskIndex < lessonTasks.length - 1 ? 'Następne zadanie' : 'Zakończ lekcję'}</span>
                          <ChevronRight className="w-4 h-4 stroke-[3] shrink-0" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {activeTaskIndex > 0 && (
                        <button
                          onClick={() => {
                            setActiveTaskIndex(prev => prev - 1);
                            setShowExplanation(Boolean(taskAnswers[lessonTasks[activeTaskIndex - 1]?.id]?.isSubmitted));
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-xs font-semibold text-[#94a3b8] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4 shrink-0" />
                          <span>Poprzednie</span>
                        </button>
                      )}
                      {activeTaskIndex < lessonTasks.length - 1 && (
                        <button
                          onClick={() => {
                            setActiveTaskIndex(prev => prev + 1);
                            setShowExplanation(Boolean(taskAnswers[lessonTasks[activeTaskIndex + 1]?.id]?.isSubmitted));
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-xs font-semibold text-[#94a3b8] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Następne</span>
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* WYJAŚNIENIE I PUŁAPKA CKE PO ZATWIERDZENIU */}
                  {showExplanation && currentAnswerState.isSubmitted && (
                    <div className="space-y-4 pt-4 border-t border-[#141d2e] animate-fadeIn min-w-0">
                      <div
                        className={`p-4 rounded-xl border min-w-0 overflow-hidden ${
                          currentAnswerState.isCorrect
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                            : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs uppercase mb-1">
                          {currentAnswerState.isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>ZWYCIĘSKA ODPOWIEDŹ CKE</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                              <span>ANALIZA BŁĘDU</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed break-words">
                          {currentTask.explanation}
                        </p>
                      </div>

                      {currentTask.ckeTrap && (
                        <div className="p-4 rounded-xl bg-[#070a0f] border border-[#ffb800]/30 text-[#ffdca1] text-xs sm:text-sm min-w-0 overflow-hidden">
                          <div className="flex items-center gap-2 font-bold text-xs uppercase text-[#ffb800] mb-1">
                            <Lightbulb className="w-4 h-4 shrink-0" />
                            <span>Jak myślał egzaminator układający to zadanie? (CKE Trap)</span>
                          </div>
                          <p className="leading-relaxed break-words">{currentTask.ckeTrap}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )
            ) : null}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAP 3: PODSUMOWANIE SESJI & RAPORT EGZAMINACYJNY                         */}
      {/* ========================================================================= */}
      {currentStage === 'summary' && (
        <div key="summary" className="space-y-6 animate-fadeIn min-w-0">
          <div className="max-w-2xl mx-auto bg-[#0e1522] border-2 border-[#ffb800]/40 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffdca1]/20 to-[#ffb800]/30 border border-[#ffb800]/50 flex items-center justify-center text-[#ffb800] mx-auto shadow-lg shadow-[#ffb800]/10">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffb800] block">
                Etap 3 • Podsumowanie i Raport
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Gratulacje! Lekcja zaliczona pomyślnie.
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] max-w-md mx-auto">
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
                {(pewniakData.pairs && pewniakData.pairs.length > 0
                  ? pewniakData.pairs.map(p => `${p.leftText}: ${p.rightText}`)
                  : [
                    'Zawsze zwracaj uwagę na sygnały czasowe i kontekst zdania.',
                    'Unikaj kalk językowych i dosłownego tłumaczenia z języka polskiego.',
                    'Stosuj oficjalne struktury leksykalno-gramatyczne CKE Formuła 2023.'
                  ]
                ).slice(0, 3).map((pt, i) => (
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
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#ffb800]/20 transition-all cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Zakończ lekcję i odbierz nagrodę</span>
              </button>

              <button
                onClick={() => setCurrentStage('practice')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#ffdca1] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Przejrzyj zadania</span>
              </button>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};
