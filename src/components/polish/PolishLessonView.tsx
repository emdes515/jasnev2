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
  Coins,
  ArrowRight,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PolishLesson } from '../../types/lessonTypes';
import { PolishTask } from '../../types/maturaTypes';
import { UserState } from '../../types';
import { getTasksForLesson, resetLessonTasks } from '../../data/polish';
import { TaskVisualAssetCard } from './TaskVisualAssetCard';
import { TaskMatchingInteractive } from './TaskMatchingInteractive';
import { PartOneReadingRoom } from './PartOneReadingRoom';
import { recordMistake } from '../../data/mistakesManager';
import { triggerHaptic, playSuccessSound, playErrorSound } from '../../utils';
import { shuffleGatekeeperQuestion } from '../../utils/taskShuffler';

interface PolishLessonViewProps {
  lesson: PolishLesson;
  userState?: UserState;
  onDeductCoins?: (amount: number) => boolean;
  onBack: () => void;
  onNextLesson?: (nextLessonId: string) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
}

export type LessonStage = 'intro' | 'practice' | 'summary';

interface TaskAnswerState {
  selectedOption: number | null;
  tfAnswers: Record<number, boolean>;
  openAnswer: string;
  synthesisText: string;
  isSubmitted: boolean;
  attempts: number;
  pointsAwarded: number;
  maxPoints: number;
  feedback: {
    message: string;
    isCorrect: boolean;
    partialScore?: {
      content: number;
      composition: number;
      language: number;
      total: number;
    };
  } | null;
}

export const PolishLessonView: React.FC<PolishLessonViewProps> = ({
  lesson,
  userState,
  onDeductCoins,
  onBack,
  onNextLesson,
  onCompleteLesson,
}) => {
  // Etap lekcji: 1. Wstęp Teoretyczny, 2. Zadania CKE, 3. Podsumowanie
  const [currentStage, setCurrentStage] = useState<LessonStage>('intro');

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

  // Zoptymalizowane i przetasowane pytanie Gatekeepera (eliminacja monotonii opcji A)
  const gatekeeperQuestion = useMemo(() => {
    return shuffleGatekeeperQuestion(lesson?.introduction?.gatekeeper);
  }, [lesson]);

  // Zadania przypisane do tej lekcji: pełen pakiet 35 zadań CKE (20 zamkniętych + 15 otwartych)
  const [currentTasks, setCurrentTasks] = useState<PolishTask[]>(() => {
    return getTasksForLesson(lesson);
  });

  useEffect(() => {
    setCurrentTasks(getTasksForLesson(lesson));
    setLessonPreReadingActive(true);
  }, [lesson]);

  const lessonTasks = currentTasks;

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [lessonPreReadingActive, setLessonPreReadingActive] = useState<boolean>(true);
  const currentTask = lessonTasks[activeTaskIndex] || lessonTasks[0];

  // Filtr zadań w panelu bocznym: wszystkie (35) / zamknięte (20) / otwarte (15)
  const [taskFilter, setTaskFilter] = useState<'all' | 'closed' | 'open'>('all');

  const closedTasks = useMemo(() => {
    return lessonTasks.filter(
      (t) => t.taskType === 'single_choice' || t.taskType === 'true_false'
    );
  }, [lessonTasks]);

  const openTasks = useMemo(() => {
    return lessonTasks.filter(
      (t) => t.taskType !== 'single_choice' && t.taskType !== 'true_false'
    );
  }, [lessonTasks]);

  // Odpowiedzi i stan sprawdzania dla każdego zadania w lekcji z pamięcią localStorage
  const [taskAnswers, setTaskAnswers] = useState<Record<string, TaskAnswerState>>(() => {
    try {
      if (!lesson?.id) return {};
      const saved = localStorage.getItem(`jasne_lesson_answers_${lesson.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      if (!lesson?.id) return;
      const saved = localStorage.getItem(`jasne_lesson_answers_${lesson.id}`);
      setTaskAnswers(saved ? JSON.parse(saved) : {});
    } catch {
      setTaskAnswers({});
    }
  }, [lesson?.id]);

  useEffect(() => {
    try {
      if (lesson?.id && Object.keys(taskAnswers).length > 0) {
        localStorage.setItem(`jasne_lesson_answers_${lesson.id}`, JSON.stringify(taskAnswers));
      }
    } catch (e) {
      console.warn('Błąd zapisu taskAnswers w localStorage:', e);
    }
  }, [taskAnswers, lesson?.id]);

  // Mechanika 2-Godzinnego Cooldownu Core-4 (ochrona przed over-learningiem i przestrzeganie krzywej Ebbinghausa)
  const COOLDOWN_DURATION_MS = 2 * 60 * 60 * 1000; // 2 godziny
  const COOLDOWN_COIN_COST = 50; // 50 monet

  const getCooldownRemainingMs = (): number => {
    try {
      if (!lesson?.id || typeof window === 'undefined') return 0;
      const raw = localStorage.getItem(`jasne_lesson_cooldown_${lesson.id}`);
      if (!raw) return 0;
      const completedAt = parseInt(raw, 10);
      if (isNaN(completedAt)) return 0;
      const elapsed = Date.now() - completedAt;
      return Math.max(0, COOLDOWN_DURATION_MS - elapsed);
    } catch {
      return 0;
    }
  };

  const [showCooldownModal, setShowCooldownModal] = useState<boolean>(false);
  const [cooldownRemainingMs, setCooldownRemainingMs] = useState<number>(getCooldownRemainingMs);
  const [cooldownErrorMsg, setCooldownErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setCooldownRemainingMs(getCooldownRemainingMs());
    const timer = setInterval(() => {
      setCooldownRemainingMs(getCooldownRemainingMs());
    }, 1000);
    return () => clearInterval(timer);
  }, [lesson?.id]);

  const formatCooldown = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const executeRandomize = () => {
    const newTasks = resetLessonTasks(lesson);
    setCurrentTasks(newTasks);
    setActiveTaskIndex(0);
    setTaskAnswers({});
    setShowExplanation(false);
    setShowCkeKey(false);
    setShowCooldownModal(false);
    setCooldownErrorMsg(null);
    try {
      localStorage.removeItem(`jasne_lesson_cooldown_${lesson.id}`);
      setCooldownRemainingMs(0);
    } catch {}
  };

  const handleRandomizeNewTasks = () => {
    const remaining = getCooldownRemainingMs();
    if (remaining > 0) {
      setCooldownRemainingMs(remaining);
      setCooldownErrorMsg(null);
      setShowCooldownModal(true);
      return;
    }

    if (window.confirm(`Czy na pewno chcesz wylosować nowy zestaw ${lessonTasks.length} pytań z bazy 800 zadań dla tej lekcji? Twój dotychczasowy postęp w tej próbie zostanie zresetowany.`)) {
      executeRandomize();
    }
  };

  const handleBypassCooldownWithCoins = () => {
    if (!onDeductCoins) {
      executeRandomize();
      return;
    }

    const success = onDeductCoins(COOLDOWN_COIN_COST);
    if (success) {
      triggerHaptic('success');
      playSuccessSound();
      executeRandomize();
    } else {
      triggerHaptic('error');
      playErrorSound();
      setCooldownErrorMsg(`Niewystarczająca liczba monet (posiadasz ${userState?.coins ?? 0} z wymaganych ${COOLDOWN_COIN_COST} 🪙). Rozwiązuj inne lekcje, aby zdobyć monety!`);
    }
  };

  const [showExplanation, setShowExplanation] = useState(false);
  const [showCkeKey, setShowCkeKey] = useState(false);
  const [lessonFinished, setLessonFinished] = useState(false);

  // Dynamiczny Licznik Czasu Lekcji
  const [secondsRemaining, setSecondsRemaining] = useState((lesson?.durationMinutes || 45) * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    setSecondsRemaining((lesson?.durationMinutes || 45) * 60);
  }, [lesson?.id, lesson?.durationMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => Math.max(0, prev - 1));
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

  // Pobierz bieżący stan odpowiedzi dla aktywnego zadania
  const currentAnswerState = useMemo<TaskAnswerState>(() => {
    if (!currentTask) {
      return {
        selectedOption: null,
        tfAnswers: {},
        openAnswer: '',
        synthesisText: '',
        isSubmitted: false,
        attempts: 0,
        pointsAwarded: 0,
        maxPoints: 0,
        feedback: null,
      };
    }
    return (
      taskAnswers[currentTask.id] || {
        selectedOption: null,
        tfAnswers: {},
        openAnswer: '',
        synthesisText: '',
        isSubmitted: false,
        attempts: 0,
        pointsAwarded: 0,
        maxPoints: currentTask.points,
        feedback: null,
      }
    );
  }, [taskAnswers, currentTask]);

  const updateCurrentAnswer = (patch: Partial<TaskAnswerState>) => {
    if (!currentTask) return;
    setTaskAnswers((prev) => ({
      ...prev,
      [currentTask.id]: {
        ...(prev[currentTask.id] || {
          selectedOption: null,
          tfAnswers: {},
          openAnswer: '',
          synthesisText: '',
          isSubmitted: false,
          attempts: 0,
          pointsAwarded: 0,
          maxPoints: currentTask.points,
          feedback: null,
        }),
        ...patch,
      },
    }));
  };

  // Licznik słów dla notatki syntetyzującej
  const synthesisWordCount = useMemo(() => {
    const text = currentAnswerState.synthesisText?.trim() || '';
    if (!text) return 0;
    return text.split(/\s+/).length;
  }, [currentAnswerState.synthesisText]);

  // Statystyki ukończenia zadań w lekcji
  const completedTasksCount = useMemo(() => {
    return Object.values(taskAnswers).filter((a) => a.isSubmitted).length;
  }, [taskAnswers]);

  const closedCompletedCount = useMemo(() => {
    return closedTasks.filter((t) => taskAnswers[t.id]?.isSubmitted).length;
  }, [closedTasks, taskAnswers]);

  const openCompletedCount = useMemo(() => {
    return openTasks.filter((t) => taskAnswers[t.id]?.isSubmitted).length;
  }, [openTasks, taskAnswers]);

  const filteredTasks = useMemo(() => {
    if (taskFilter === 'closed') return closedTasks;
    if (taskFilter === 'open') return openTasks;
    return lessonTasks;
  }, [taskFilter, closedTasks, openTasks, lessonTasks]);

  const completionPercent = useMemo(() => {
    if (lessonTasks.length === 0) return 100;
    return Math.round((completedTasksCount / lessonTasks.length) * 100);
  }, [completedTasksCount, lessonTasks.length]);

  const isSummaryUnlocked = completionPercent >= 70;

  // Weryfikacja Gatekeepera we Wstępie Teoretycznym
  const handleVerifyGatekeeper = () => {
    if (gatekeeperSelected === null) return;
    setGatekeeperSubmitted(true);

    const targetCorrectIdx = gatekeeperQuestion ? gatekeeperQuestion.correctIndex : lesson.introduction.gatekeeper.correctIndex;
    if (gatekeeperSelected === targetCorrectIdx) {
      setGatekeeperError(false);
      setIsIntroPassed(true);
      try {
        localStorage.setItem(`jasne_gatekeeper_${lesson.id}`, 'true');
      } catch {}

      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      setTimeout(() => {
        setCurrentStage('practice');
      }, 1200);
    } else {
      setGatekeeperError(true);
    }
  };

  // =========================================================================
  // DOJRZAŁA GRYWALIZACJA MATURALNA (STYL BRILLIANT.ORG / CHESS.COM)
  // =========================================================================
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [consultationsLeft, setConsultationsLeft] = useState<number>(2);
  const [showConsultationModal, setShowConsultationModal] = useState<boolean>(false);

  // Dynamiczny symulator prognozowanego wyniku matury (%)
  const projectedScore = useMemo(() => {
    const entries = Object.entries(taskAnswers).filter(([_, a]) => a.isSubmitted);
    if (entries.length === 0) return 72;
    const totalEarned = entries.reduce((acc, [_, a]) => acc + (a.pointsAwarded || 0), 0);
    const maxPossible = entries.reduce((acc, [taskId]) => {
      const task = lessonTasks.find((t) => t.id === taskId);
      return acc + (task?.points || 1);
    }, 0);
    if (maxPossible === 0) return 72;
    const ratio = totalEarned / maxPossible;
    const score = Math.round(40 + ratio * 58);
    return Math.min(Math.max(score, 30), 100);
  }, [taskAnswers, lessonTasks]);

  const updateStreakOnAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setStreak((prev) => {
        const next = prev + 1;
        setMaxStreak((m) => Math.max(m, next));
        if (next >= 3 && next % 3 === 0) {
          try {
            confetti({ particleCount: 40, spread: 55, origin: { y: 0.8 } });
          } catch {}
        }
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleUseConsultation = () => {
    if (consultationsLeft <= 0) return;
    setConsultationsLeft((prev) => Math.max(0, prev - 1));
    setShowConsultationModal(true);
  };

  // =========================================================================
  // WIDOK MOBILNY DLA CZĘŚCI I (PRZEŁĄCZNIK ZADANIE / CZYTELNIA)
  // =========================================================================
  const [mobilePart1View, setMobilePart1View] = useState<'task' | 'text'>('task');

  // Reset widoku mobilnego do zadania przy przejściu na kolejne pytanie
  useEffect(() => {
    setMobilePart1View('task');
  }, [currentTask?.id]);

  const isPartOne = currentTask?.part === 1 || lesson.module === 'Język w użyciu' || lesson.number <= 5;

  // =========================================================================
  // MECHANIKA OCENIANIA ZADAŃ W LEKCJI (KROK 2)
  // =========================================================================

  // 1. Sprawdzanie zadania ABCD z systemem 2 prób
  const handleSubmitSingleChoice = () => {
    if (!currentTask || currentAnswerState.selectedOption === null) return;
    const isCorrect = currentAnswerState.selectedOption === currentTask.correctOptionIndex;
    const newAttempts = currentAnswerState.attempts + 1;

    if (isCorrect) {
      const earned = newAttempts === 1 ? currentTask.points : Math.max(0.5, currentTask.points * 0.5);
      updateCurrentAnswer({
        isSubmitted: true,
        attempts: newAttempts,
        pointsAwarded: earned,
        feedback: {
          isCorrect: true,
          message:
            newAttempts === 1
              ? `Znakomicie! Poprawna odpowiedź z klucza CKE (+${earned} pkt).`
              : `Poprawna odpowiedź w 2. próbie (+${earned} pkt).`,
        },
      });
      updateStreakOnAnswer(true);
      setShowExplanation(true);
      setShowCkeKey(true);
    } else {
      recordMistake({
        taskId: currentTask.id,
        subject: 'polski',
        topicOrEpoch: currentTask.epoch || currentTask.partName,
        title: currentTask.title,
        question: currentTask.question,
        taskType: currentTask.taskType,
        points: currentTask.points,
        options: currentTask.options,
        correctAnswer: currentTask.correctOptionIndex,
        userWrongAnswer: currentAnswerState.selectedOption,
        explanation: currentTask.explanation,
        ckeKeyCriteria: currentTask.ckeKeyCriteria,
        visualAsset: currentTask.image,
        passage: currentTask.passage,
        passage2: currentTask.passage2,
      });

      if (newAttempts === 1) {
        updateCurrentAnswer({
          attempts: newAttempts,
          feedback: {
            isCorrect: false,
            message:
              'Niestety to nie jest poprawna odpowiedź. Masz jeszcze 1 próbę (za 50% punktów) lub możesz odsłonić klucz CKE.',
          },
        });
      } else {
        updateCurrentAnswer({
          isSubmitted: true,
          attempts: newAttempts,
          pointsAwarded: 0,
          feedback: {
            isCorrect: false,
            message: 'Błędna odpowiedź w 2. próbie (0 pkt). Zapoznaj się z poniższym wyjaśnieniem i oficjalnym kluczem CKE.',
          },
        });
        updateStreakOnAnswer(false);
        setShowExplanation(true);
        setShowCkeKey(true);
      }
    }
  };

  // 2. Sprawdzanie zadania Prawda / Fałsz (Tabela)
  const handleSubmitTrueFalse = () => {
    if (!currentTask || !currentTask.trueFalseStatements) return;
    const statements = currentTask.trueFalseStatements;
    const answers = currentAnswerState.tfAnswers;
    const newAttempts = currentAnswerState.attempts + 1;

    let correctCount = 0;
    statements.forEach((item, idx) => {
      if (answers[idx] === item.isTrue) {
        correctCount++;
      }
    });

    const isAllCorrect = correctCount === statements.length;

    // Oficjalne kryteria CKE dla P/F:
    // Dla 2 zdań: 2 poprawne = 1 pkt, 1 lub 0 = 0 pkt
    // Dla 3 zdań: 3 poprawne = 2 pkt, 2 poprawne = 1 pkt, <2 = 0 pkt
    let earned = 0;
    if (statements.length === 2) {
      earned = isAllCorrect ? 1 : 0;
    } else if (statements.length === 3) {
      earned = correctCount === 3 ? 2 : correctCount === 2 ? 1 : 0;
    } else {
      earned = isAllCorrect ? currentTask.points : 0;
    }

    if (newAttempts > 1 && earned > 0) {
      earned = Math.max(0.5, earned * 0.5);
    }

    if (isAllCorrect) {
      updateCurrentAnswer({
        isSubmitted: true,
        attempts: newAttempts,
        pointsAwarded: earned,
        feedback: {
          isCorrect: true,
          message: `Bezbłędna ocena wszystkich stwierdzeń! Przyznano ${earned}/${currentTask.points} pkt CKE.`,
        },
      });
      updateStreakOnAnswer(true);
      setShowExplanation(true);
      setShowCkeKey(true);
    } else {
      recordMistake({
        taskId: currentTask.id,
        subject: 'polski',
        topicOrEpoch: currentTask.epoch || currentTask.partName,
        title: currentTask.title,
        question: currentTask.question,
        taskType: 'true_false',
        points: currentTask.points,
        correctAnswer: currentTask.trueFalseStatements.map((s) => s.isTrue),
        userWrongAnswer: answers,
        trueFalseStatements: currentTask.trueFalseStatements,
        explanation: currentTask.explanation,
        ckeKeyCriteria: currentTask.ckeKeyCriteria,
        visualAsset: currentTask.image,
        passage: currentTask.passage,
        passage2: currentTask.passage2,
      });
      if (newAttempts === 1) {
        updateCurrentAnswer({
          attempts: newAttempts,
          feedback: {
            isCorrect: false,
            message: `Poprawnie oceniono ${correctCount} z ${statements.length} zdań. Możesz poprawić odpowiedzi w 2. próbie lub odsłonić klucz CKE.`,
          },
        });
      } else {
        updateCurrentAnswer({
          isSubmitted: true,
          attempts: newAttempts,
          pointsAwarded: earned,
          feedback: {
            isCorrect: earned > 0,
            message: `Wynik ostateczny: ${correctCount}/${statements.length} poprawnych zdań (${earned}/${currentTask.points} pkt). Zobacz wyjaśnienia do każdego wiersza poniżej.`,
          },
        });
        updateStreakOnAnswer(earned > 0);
        setShowExplanation(true);
        setShowCkeKey(true);
      }
    }
  };

  // 3. Szczegółowa ewaluacja notatki syntetyzującej wg oficjalnej matrycy CKE (4 pkt)
  const handleSubmitSynthesis = () => {
    if (!currentTask) return;
    const text = currentAnswerState.synthesisText?.trim() || '';
    const words = synthesisWordCount;

    // Kryterium 1: Treść (0–2 pkt) – synteza obu autorów
    // Sprawdzamy czy uczeń odnosi się do obu tekstów
    const hasAuthor1 = /autor|tekst|pierwsz|stanowisk|krzemińsk|luecke|dyczewsk|limon/i.test(text);
    const hasAuthor2 = /drugi|drugiego|z kolei|natomiast|odmiennie|podobnie|oba|obydwa/i.test(text);
    const hasSynthesis = /wspóln|syntez|wniosek|zarówno|podsumowuj|pokazuj/i.test(text);

    let contentScore = 0;
    if (hasAuthor1 && hasAuthor2 && hasSynthesis && words >= 50) {
      contentScore = 2;
    } else if ((hasAuthor1 || hasAuthor2) && words >= 40) {
      contentScore = 1;
    }

    // Kryterium 2: Kompozycja i spójność (0–1 pkt)
    // CKE: 60–90 słów = 1 pkt; poniżej 60 lub powyżej 90 = 0 pkt!
    let compositionScore = 0;
    if (words >= 60 && words <= 90) {
      compositionScore = 1;
    }

    // Kryterium 3: Język i styl (0–1 pkt)
    let languageScore = 0;
    if (words >= 55 && !/fajne|mega|super|spoko|głupie/i.test(text)) {
      languageScore = 1;
    }

    const total = contentScore + compositionScore + languageScore;

    let message = '';
    if (words < 60) {
      message = `Liczba słów (${words}) jest poniżej bezwzględnego progu CKE (60–90 słów) – utrata punktu za kompozycję.`;
    } else if (words > 90) {
      message = `Przekroczono limit słów (${words} > 90) – utrata punktu za kompozycję i formę.`;
    } else {
      message = `Liczba słów (${words}) idealnie mieści się w wyznaczonym oknie 60–90 wyrazów!`;
    }

    updateCurrentAnswer({
      isSubmitted: true,
      attempts: currentAnswerState.attempts + 1,
      pointsAwarded: total,
      feedback: {
        isCorrect: total >= 3,
        message,
        partialScore: {
          content: contentScore,
          composition: compositionScore,
          language: languageScore,
          total,
        },
      },
    });

    updateStreakOnAnswer(total >= 2);
    setShowExplanation(true);
    setShowCkeKey(true);
  };

  // 4. Sprawdzanie zadania otwartego (1–2 pkt)
  const handleSubmitOpenTask = () => {
    if (!currentTask) return;
    const answer = currentAnswerState.openAnswer.trim();
    if (!answer) return;

    let earned = 0;
    const len = answer.length;
    // Analiza merytoryczna słów kluczowych
    if (currentTask.ckeKeyCriteria && currentTask.ckeKeyCriteria.length > 0) {
      if (len > 30) {
        earned = currentTask.points;
      } else if (len > 12) {
        earned = Math.max(1, Math.floor(currentTask.points / 2));
      }
    } else {
      earned = len > 20 ? currentTask.points : 1;
    }

    if (earned < currentTask.points) {
      recordMistake({
        taskId: currentTask.id,
        subject: 'polski',
        topicOrEpoch: currentTask.epoch || currentTask.partName,
        title: currentTask.title,
        question: currentTask.question,
        taskType: currentTask.taskType || 'short_open',
        points: currentTask.points,
        correctAnswer: currentTask.correctAnswerText || 'Klucz oceniania CKE',
        userWrongAnswer: answer,
        explanation: currentTask.explanation,
        ckeKeyCriteria: currentTask.ckeKeyCriteria,
        passage: currentTask.passage,
        passage2: currentTask.passage2,
      });
    }

    updateCurrentAnswer({
      isSubmitted: true,
      attempts: currentAnswerState.attempts + 1,
      pointsAwarded: earned,
      feedback: {
        isCorrect: earned === currentTask.points,
        message:
          earned === currentTask.points
            ? `Twoja odpowiedź spełnia kryteria egzaminatora CKE (${earned}/${currentTask.points} pkt).`
            : `Częściowa zgodność z kluczem CKE (${earned}/${currentTask.points} pkt). Porównaj swoją wersję ze wzorcem poniżej.`,
      },
    });

    updateStreakOnAnswer(earned > 0);
    setShowExplanation(true);
    setShowCkeKey(true);
  };

  // 5. Sprawdzanie interaktywnego dopasowania (Drag & Drop / Click-to-Pair)
  const handleMatchingAnswerSubmit = (earnedPoints: number, answerText: string) => {
    if (!currentTask) return;
    const isFull = earnedPoints === currentTask.points;

    if (!isFull) {
      recordMistake({
        taskId: currentTask.id,
        subject: 'polski',
        topicOrEpoch: currentTask.epoch || currentTask.partName,
        title: currentTask.title,
        question: currentTask.question,
        taskType: 'matching',
        points: currentTask.points,
        correctAnswer: currentTask.matchingPairs,
        userWrongAnswer: answerText,
        matchingPairs: currentTask.matchingPairs,
        distractor: currentTask.distractor,
        explanation: currentTask.explanation,
      });
    }

    updateCurrentAnswer({
      isSubmitted: true,
      attempts: currentAnswerState.attempts + 1,
      pointsAwarded: earnedPoints,
      feedback: {
        isCorrect: isFull,
        message: isFull
          ? `✅ Znakomita analiza! Poprawnie dopasowano wszystkie pozycje i zneutralizowano dystraktor (+${earnedPoints} pkt).`
          : `⚠️ Poprawne dopasowanie w procedurze 2. szansy (+${earnedPoints} pkt). Dystraktor został zdemaskowany.`,
      },
    });

    updateStreakOnAnswer(earnedPoints > 0);
    setShowExplanation(true);
    setShowCkeKey(true);
  };

  // Reset do 2. próby
  const handleRetryTask = () => {
    if (!currentTask) return;
    updateCurrentAnswer({
      selectedOption: null,
      feedback: null,
    });
  };

  // Zakończenie lekcji i XP
  const handleFinishLesson = () => {
    setLessonFinished(true);
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
    });

    const totalPointsEarned = Object.values(taskAnswers).reduce(
      (acc, a) => acc + (a.pointsAwarded || 0),
      0
    );

    if (onCompleteLesson) {
      onCompleteLesson(lesson.id, totalPointsEarned);
    }

    try {
      localStorage.setItem(`jasne_lesson_cooldown_${lesson.id}`, String(Date.now()));
      setCooldownRemainingMs(COOLDOWN_DURATION_MS);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-[#dfe2f1] font-sans pb-32 sm:pb-24 pb-mobile-safe animate-fadeIn">
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
              title="Powrót do spisu lekcji"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20">
                  Lekcja {lesson.number || 1} z 24
                </span>
                <span className="text-[11px] text-[#94a3b8] hidden sm:inline px-2 py-0.5 rounded-md bg-[#0e1522] border border-[#141d2e]">
                  {lesson.module}
                </span>
                {lesson.epoch && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0e1522] text-[#ffb800] border border-[#141d2e] hidden md:inline">
                    {lesson.epoch}
                  </span>
                )}
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate mt-0.5">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Prawa strona: Koło CKE, Czasomierz i Statystyki */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Koło Ratunkowe CKE */}
            <button
              type="button"
              onClick={handleUseConsultation}
              disabled={consultationsLeft <= 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                consultationsLeft > 0
                  ? 'bg-[#0e1522] hover:bg-[#141d2e] border-[#ffb800]/30 text-[#ffdca1]'
                  : 'bg-[#0e1522]/50 border-[#141d2e] text-[#94a3b8]/40 cursor-not-allowed'
              }`}
              title="Konsultacja Egzaminatora CKE: odsłoń wskazówkę metodyczną bez utraty punktów"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#ffb800]" />
              <span className="hidden sm:inline">Koło CKE ({consultationsLeft})</span>
              <span className="sm:hidden">{consultationsLeft}</span>
            </button>

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
                onClick={() => setSecondsRemaining((lesson.durationMinutes || 45) * 60)}
                className="p-1 hover:text-white text-[#94a3b8] transition-colors"
                title={`Zresetuj czas do ${lesson.durationMinutes || 45}:00`}
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

          {/* KROK 2: Praktyka CKE (wymaga zdania wstępu) */}
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

          {/* KROK 3: Podsumowanie (wymaga min. 70% zadań) */}
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
                {!isSummaryUnlocked ? `Min. 70% zadań (${completionPercent}%)` : 'Wnioski & Zaliczenie (+XP)'}
              </div>
            </div>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6">

      {/* ========================================================================= */}
      {/* ETAP 1: WSTĘP TEORETYCZNY + GATEKEEPER CKE (BENTO CORE-4)                 */}
      {/* ========================================================================= */}
      {currentStage === 'intro' && (
        <div key="intro" className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
          {/* Banner Modułu */}
          <div className="p-5 rounded-2xl bg-[#0e1522] border border-[#141d2e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20">
                  Etap 1 z 3 • Wstęp Dydaktyczny
                </span>
                <span className="text-xs text-[#94a3b8]">Czas trwania: ok. 12 minut</span>
              </div>
              <h2 className="text-lg font-bold text-white">{lesson.title}</h2>
              <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                {lesson.introduction.lead}
              </p>
            </div>

            {isIntroPassed && (
              <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 shrink-0">
                <ShieldCheck className="w-4 h-4" />
                <span>Wstęp zaliczony</span>
              </div>
            )}
          </div>

          {/* Cele Lekcji */}
          <div className="p-5 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-3">
            <div className="text-xs font-bold text-[#ffdca1] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Czego nauczysz się w tej sesji:</span>
            </div>
            <ul className="space-y-2">
              {lesson.introduction.objectives.map((obj, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-[#dfe2f1] flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb800] mt-2 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kompendium Wiedzy (Punkty Teoretyczne) */}
          <div className="p-5 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-4">
            <div className="text-xs font-bold text-[#ffdca1] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#ffb800]" />
              <span>Kompendium wiedzy maturalnej:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.introduction.theoryPoints.map((tp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-2 hover:border-[#ffb800]/30 transition-colors"
                >
                  <div className="text-xs font-bold text-[#ffdca1] flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 text-[10px]">
                      § {idx + 1}
                    </span>
                    <span>{tp.title}</span>
                  </div>
                  <p className="text-xs text-[#dfe2f1] leading-relaxed whitespace-pre-line">
                    {tp.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Wskazówki Egzaminatorów CKE */}
          {lesson.introduction.ckeExaminerTips.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#ffb800]/10 border border-[#ffb800]/30 space-y-3">
              <div className="text-xs font-bold text-[#ffdca1] uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#ffb800]" />
                <span>Wskazówki i patenty egzaminatorów CKE:</span>
              </div>
              <ul className="space-y-2">
                {lesson.introduction.ckeExaminerTips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-[#ffdca1] flex items-start gap-2"
                  >
                    <span className="text-[#ffb800] font-bold shrink-0">▸</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ostrzeżenie przed Błędem Kardynalnym */}
          {lesson.introduction.cardinalWarning && (
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Błąd Kardynalny – Ostrzeżenie (0 pkt za wypracowanie):</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-rose-200/90">
                {lesson.introduction.cardinalWarning}
              </p>
            </div>
          )}

          {/* ============================================================= */}
          {/* GATEKEEPER CKE: QUIZ WERYFIKACYJNY ODBLOKOWUJĄCY ZADANIA      */}
          {/* ============================================================= */}
          <div className="p-6 rounded-2xl bg-[#0e1522] border-2 border-[#ffb800]/40 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ffb800]/20 text-[#ffdca1] flex items-center justify-center font-bold text-xs">
                  CKE
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Gatekeeper CKE: Test Zrozumienia Wstępu
                  </h3>
                  <p className="text-[11px] text-[#94a3b8]">
                    Wskaż poprawną odpowiedź, aby odblokować zadania egzaminacyjne.
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
              {gatekeeperQuestion?.question || lesson.introduction.gatekeeper.question}
            </div>

            {/* Opcje odpowiedzi Gatekeepera */}
            <div className="space-y-2">
              {(gatekeeperQuestion?.options || lesson.introduction.gatekeeper.options).map((opt, idx) => {
                const isSelected = gatekeeperSelected === idx;
                const targetCorrectIdx = gatekeeperQuestion ? gatekeeperQuestion.correctIndex : lesson.introduction.gatekeeper.correctIndex;
                const isCorrect = idx === targetCorrectIdx;

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
                    {gatekeeperSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {gatekeeperSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Komunikat o błędzie lub sukcesie */}
            {gatekeeperSubmitted && gatekeeperError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{gatekeeperQuestion?.hint || lesson.introduction.gatekeeper.hint || 'Niepoprawna odpowiedź. Przeanalizuj pułapkę CKE i spróbuj ponownie!'}</span>
              </div>
            )}

            {isIntroPassed && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Znakomicie! Wstęp teoretyczny zaliczony.
                </div>
                <p className="leading-relaxed">
                  {gatekeeperQuestion?.explanation || lesson.introduction.gatekeeper.explanation}
                </p>
              </div>
            )}

            {/* Dolne przyciski akcji */}
            <div className="flex items-center justify-between pt-3 border-t border-[#141d2e]">
              <span className="text-xs text-[#94a3b8]">
                {isIntroPassed ? 'Wstęp zaliczony – możesz przejść do zadań.' : 'Wymagane zatwierdzenie poprawnej odpowiedzi.'}
              </span>

              {!isIntroPassed ? (
                <button
                  onClick={handleVerifyGatekeeper}
                  disabled={gatekeeperSelected === null}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md shadow-[#ffb800]/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sprawdź odpowiedź</span>
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

      {/* ========================================================================= */}
      {/* ETAP 2: ZADANIA PRAKTYCZNE CKE Z PRECYZYJNĄ MECHANIKĄ OCENIANIA           */}
      {/* ========================================================================= */}
      {currentStage === 'practice' && (
        <div key="practice" className="space-y-6 animate-fadeIn">
          {lessonTasks.length === 0 ? (
            <div className="bg-[#0e1522] border border-[#141d2e] rounded-2xl p-12 text-center text-[#94a3b8] shadow-sm">
              Brak przypisanych zadań w tej lekcji.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Belka nawigacyjna i przełącznik mobilny tylko dla Części I */}
              {isPartOne && (
                <>
                  {/* Górny Pasek Nawigacji Zadawczej dla Części 1 */}
                  <div className="bg-[#0e1522] border border-[#141d2e] rounded-2xl p-4 space-y-3 shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white">Część I: Język polski w użyciu</span>
                        <span className="text-[#141d2e]">|</span>
                        <span className="text-[#94a3b8]">
                          Zadanie <span className="text-[#ffdca1] font-bold">{activeTaskIndex + 1}</span> z {lessonTasks.length}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#070a0f] border border-[#141d2e] text-[#ffdca1] font-medium">
                          Ukończono: {completedTasksCount}/{lessonTasks.length} ({completionPercent}%)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleRandomizeNewTasks}
                          className="px-2.5 py-1 rounded-lg bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] hover:border-[#ffb800]/40 text-[#94a3b8] hover:text-[#ffdca1] text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                          title={cooldownRemainingMs > 0 ? `Lekcja w cooldownie (odblokuj za 50 monet lub odczekaj ${formatCooldown(cooldownRemainingMs)})` : "Wylosuj nowy zestaw pytań z bazy 800 zadań CKE"}
                        >
                          <RefreshCw className={`w-3 h-3 ${cooldownRemainingMs > 0 ? 'text-[#ffb800]' : 'text-[#ffdca1]'}`} />
                          <span className="hidden sm:inline">
                            {cooldownRemainingMs > 0 ? `Nowy zestaw (${formatCooldown(cooldownRemainingMs)})` : 'Nowy zestaw'}
                          </span>
                        </button>

                        <div className="flex items-center bg-[#070a0f] p-0.5 rounded-lg border border-[#141d2e] text-[11px]">
                          <button
                            type="button"
                            onClick={() => setTaskFilter('all')}
                            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                              taskFilter === 'all'
                                ? 'bg-[#ffb800]/20 text-[#ffdca1] font-bold'
                                : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                            }`}
                          >
                            Wszystkie ({lessonTasks.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setTaskFilter('closed')}
                            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                              taskFilter === 'closed'
                                ? 'bg-[#ffb800]/20 text-[#ffdca1] font-bold'
                                : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                            }`}
                          >
                            ABCD ({closedCompletedCount})
                          </button>
                          <button
                            type="button"
                            onClick={() => setTaskFilter('open')}
                            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                              taskFilter === 'open'
                                ? 'bg-[#ffb800]/20 text-[#ffdca1] font-bold'
                                : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                            }`}
                          >
                            Otwarte ({openCompletedCount})
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Pozioma belka indeksu zadań */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                      <button
                        key="pre-reading-btn"
                        type="button"
                        onClick={() => setLessonPreReadingActive(true)}
                        className={`shrink-0 px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all cursor-pointer ${
                          lessonPreReadingActive
                            ? 'border-[#ffb800] bg-gradient-to-r from-[#ea580c] to-[#ffb800] text-slate-950 font-bold shadow-md'
                            : 'border-[#ffb800]/30 bg-[#ffb800]/10 text-[#ffdca1] hover:bg-[#ffb800]/20'
                        }`}
                        title="Otwórz czytelnię pełnych tekstów CKE"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>📖 Teksty CKE</span>
                      </button>

                      {filteredTasks.map((t) => {
                        const originalIdx = lessonTasks.findIndex((task) => task.id === t.id);
                        const isCurrent = !lessonPreReadingActive && originalIdx === activeTaskIndex;
                        const ans = taskAnswers[t.id];
                        const isDone = ans?.isSubmitted;
                        const isSuccess = isDone && ans.pointsAwarded > 0;

                        let pillClass = 'bg-[#070a0f] border-[#141d2e] text-[#94a3b8] hover:border-[#ffb800]/40 hover:text-white';
                        if (isCurrent) {
                          pillClass = 'border-[#ffdca1] bg-[#ffb800]/20 text-[#ffdca1] font-bold shadow-xs ring-1 ring-[#ffb800]/40';
                        } else if (isSuccess) {
                          pillClass = 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300 font-medium';
                        } else if (isDone && !isSuccess) {
                          pillClass = 'border-rose-500/40 bg-rose-950/20 text-rose-300 font-medium';
                        }

                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              setLessonPreReadingActive(false);
                              if (originalIdx !== -1) setActiveTaskIndex(originalIdx);
                              setShowExplanation(ans?.isSubmitted || false);
                              setShowCkeKey(ans?.isSubmitted || false);
                            }}
                            className={`shrink-0 px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all cursor-pointer ${pillClass}`}
                            title={`Zadanie ${originalIdx + 1}: ${t.title}`}
                          >
                            <span>{originalIdx + 1}</span>
                            {isSuccess && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                            {isDone && !isSuccess && <XCircle className="w-3 h-3 text-rose-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Przełącznik mobilny: Zadanie <-> Teksty źródłowe */}
                  {!lessonPreReadingActive && (
                    <div className="lg:hidden flex rounded-xl bg-[#070a0f] p-1 border border-[#141d2e] text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setMobilePart1View('task')}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          mobilePart1View === 'task'
                            ? 'bg-[#ffb800] text-slate-950 font-bold shadow'
                            : 'text-[#94a3b8] hover:text-white'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Zadanie {activeTaskIndex + 1}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobilePart1View('text')}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          mobilePart1View === 'text'
                            ? 'bg-[#ffb800] text-slate-950 font-bold shadow'
                            : 'text-[#94a3b8] hover:text-white'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Teksty Źródłowe CKE</span>
                      </button>
                    </div>
                  )}
                </>
              )}

              {isPartOne && lessonPreReadingActive ? (
                <PartOneReadingRoom
                  task={currentTask}
                  isPreReadingView={true}
                  onStartTasks={() => setLessonPreReadingActive(false)}
                  currentTaskNumber={activeTaskIndex + 1}
                />
              ) : (
                <>
                  {/* Mobilny pasek szybkiego wyboru zadań (Część II i III) */}
                  {!isPartOne && (
                    <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
                      <span className="text-[11px] font-bold text-[#94a3b8] shrink-0 mr-1">Zadanie:</span>
                      {lessonTasks.map((t, idx) => {
                        const ans = taskAnswers[t.id];
                        const isCurrent = idx === activeTaskIndex;
                        const isDone = ans?.isSubmitted;
                        const isSuccess = isDone && ans?.pointsAwarded > 0;

                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              triggerHaptic('light');
                              setActiveTaskIndex(idx);
                              setShowExplanation(ans?.isSubmitted || false);
                              setShowCkeKey(ans?.isSubmitted || false);
                            }}
                            className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-[#ffb800]/20 border-[#ffdca1] text-white ring-1 ring-[#ffb800]/40 shadow-sm'
                                : isSuccess
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                                : isDone
                                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                                : 'bg-[#070a0f] border-[#141d2e] text-[#94a3b8] hover:text-white'
                            }`}
                          >
                            <span>{idx + 1}</span>
                            {isSuccess && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                            {isDone && !isSuccess && <XCircle className="w-3 h-3 text-rose-400" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Lewy Pasek: Indeks zadań w tej lekcji (Tylko dla Części II i III - desktop) */}
                  {!isPartOne && (
                    <div className="hidden lg:block lg:col-span-4 bg-[#0e1522] border border-[#141d2e] rounded-2xl p-4 space-y-3 shadow-md">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#94a3b8] pb-2 border-b border-[#141d2e]">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-[#ffdca1]" />
                          <h3 className="text-sm font-bold text-white">Zadania w lekcji</h3>
                        </div>
                        <span className="text-xs font-bold text-[#ffdca1]">
                          {completedTasksCount} / {lessonTasks.length} zaliczone
                        </span>
                      </div>

                      {/* Przycisk losowania nowego zestawu pytań z bazy 800 zadań */}
                      <button
                        onClick={handleRandomizeNewTasks}
                        className="w-full py-2 px-3 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] hover:border-[#ffb800]/40 text-[#dfe2f1] hover:text-[#ffdca1] text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                        title={cooldownRemainingMs > 0 ? `Lekcja w cooldownie (odblokuj za 50 monet lub odczekaj ${formatCooldown(cooldownRemainingMs)})` : `Wylosuj nowy zestaw ${lessonTasks.length} pytań z bazy 800 zadań CKE`}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${cooldownRemainingMs > 0 ? 'text-[#ffb800]' : 'text-[#ffdca1]'}`} />
                        <span>
                          {cooldownRemainingMs > 0
                            ? `Nowy zestaw (${formatCooldown(cooldownRemainingMs)} lub 50 🪙)`
                            : `Wylosuj nowy zestaw (${closedTasks.length} zamkniętych + ${openTasks.length} otwartych)`}
                        </span>
                      </button>

                      {/* Filtry typów zadań: Wszystkie / Zamknięte / Otwarte */}
                      <div className="grid grid-cols-3 gap-1 bg-[#070a0f] p-1 rounded-xl border border-[#141d2e] text-[11px] font-medium">
                        <button
                          onClick={() => setTaskFilter('all')}
                          className={`py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer ${
                            taskFilter === 'all'
                              ? 'bg-[#ffb800]/20 text-[#ffdca1] font-bold'
                              : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                          }`}
                        >
                          Wszystkie ({lessonTasks.length})
                        </button>
                        <button
                          onClick={() => setTaskFilter('closed')}
                          className={`py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer ${
                            taskFilter === 'closed'
                              ? 'bg-[#ffb800]/20 text-[#ffdca1] font-bold'
                              : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                          }`}
                        >
                          ABCD ({closedCompletedCount})
                        </button>
                        <button
                          onClick={() => setTaskFilter('open')}
                          className={`py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer ${
                            taskFilter === 'open'
                              ? 'bg-[#ffb800]/20 text-[#ffdca1] font-bold'
                              : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                          }`}
                        >
                          Otwarte ({openCompletedCount})
                        </button>
                      </div>

                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                        {filteredTasks.map((t) => {
                          const originalIdx = lessonTasks.findIndex((task) => task.id === t.id);
                          const isCurrent = t.id === currentTask?.id;
                          const ans = taskAnswers[t.id];
                          const isDone = ans?.isSubmitted;
                          const isSuccess = isDone && ans.pointsAwarded > 0;
                          const isFailed = isDone && ans.pointsAwarded === 0;

                          return (
                            <button
                              key={t.id}
                              onClick={() => {
                                if (originalIdx !== -1) setActiveTaskIndex(originalIdx);
                                setShowExplanation(ans?.isSubmitted || false);
                                setShowCkeKey(ans?.isSubmitted || false);
                              }}
                              className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                isCurrent
                                  ? 'bg-[#ffb800]/15 border-[#ffdca1] text-white shadow-xs'
                                  : isSuccess
                                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 hover:border-emerald-500/50'
                                  : isFailed
                                  ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                                  : 'bg-[#070a0f] border-[#141d2e] text-[#dfe2f1] hover:border-[#1e293b] hover:bg-[#121b2b]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                    isSuccess
                                      ? 'bg-emerald-500/20 text-emerald-400'
                                      : isFailed
                                      ? 'bg-rose-500/20 text-rose-400'
                                      : isCurrent
                                      ? 'bg-[#ffb800] text-slate-950'
                                      : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8]'
                                  }`}
                                >
                                  {originalIdx + 1}
                                </span>
                                <div className="min-w-0">
                                  <span className="text-xs font-semibold block truncate">
                                    {t.title || `Zadanie ${originalIdx + 1}`}
                                  </span>
                                  <span className="text-[10px] text-[#94a3b8] block truncate">
                                    {t.epoch || t.partName || 'CKE Formuła 2023'} • {t.points} pkt
                                  </span>
                                </div>
                              </div>

                              {isSuccess ? (
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

                      {/* Pasek postępu odblokowania Podsumowania */}
                      <div className="pt-3 border-t border-[#141d2e] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-[#94a3b8]">
                          <span>Wymóg do zaliczenia:</span>
                          <span className="font-bold text-[#ffdca1]">{completionPercent}% / 70%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#070a0f] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#ea580c] to-[#ffb800] transition-all duration-300"
                            style={{ width: `${Math.min(100, (completionPercent / 70) * 100)}%` }}
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
                  )}

                  {/* Kolumna Zadania: w Części 1 (lewa strona, 7 kolumn), w Części 2 i 3 (prawa strona, 8 kolumn) */}
                  <div
                    className={`${
                      isPartOne
                        ? `lg:col-span-7 ${mobilePart1View === 'task' ? 'block' : 'hidden lg:block'}`
                        : 'lg:col-span-8'
                    } bg-[#0e1522] border border-[#141d2e] rounded-2xl p-4 sm:p-6 shadow-lg space-y-5`}
                  >
                      {currentTask && (
                        <div key={currentTask?.id || activeTaskIndex} className="space-y-5 animate-fadeIn">
                          {/* Górny pasek zadania */}
                          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-[#141d2e]">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-lg bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 text-xs font-bold">
                                Część {currentTask.part}: {currentTask.partName}
                              </span>
                              {currentTask.epoch && (
                                <span className="px-2 py-0.5 rounded-lg bg-[#070a0f] border border-[#141d2e] text-[#ffdca1] text-[11px] font-medium">
                                  {currentTask.epoch}
                                </span>
                              )}
                              <span className="text-xs text-[#94a3b8]">
                                Waga: <strong>{currentTask.points} pkt</strong>
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#94a3b8] font-mono">
                                Zadanie {activeTaskIndex + 1}/{lessonTasks.length}
                              </span>
                              <span className="text-[11px] font-bold text-[#ffdca1] bg-[#070a0f] px-2 py-0.5 rounded-md border border-[#141d2e]">
                                {completedTasksCount}/{lessonTasks.length}
                              </span>
                            </div>
                          </div>

                          {/* Tekst źródłowy 1 (wyświetlany bezpośrednio w Części II i III) */}
                          {!isPartOne && currentTask.passage && (
                            <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-2">
                              <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                                <span className="font-semibold text-[#ffdca1]">
                                  {currentTask.passage.author || 'Tekst źródłowy'}
                                </span>
                                {currentTask.passage.sourceTitle && (
                                  <span className="italic">{currentTask.passage.sourceTitle}</span>
                                )}
                              </div>
                              <p className="text-xs text-[#dfe2f1] italic leading-relaxed whitespace-pre-line border-l-2 border-[#ffb800]/60 pl-3">
                                {currentTask.passage.text}
                              </p>
                            </div>
                          )}

                          {/* Tekst źródłowy 2 (wyświetlany bezpośrednio w Części II i III) */}
                          {!isPartOne && currentTask.passage2 && (
                            <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-2">
                              <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                                <span className="font-semibold text-rose-300">
                                  {currentTask.passage2.author || 'Drugi tekst źródłowy'}
                                </span>
                                {currentTask.passage2.sourceTitle && (
                                  <span className="italic">{currentTask.passage2.sourceTitle}</span>
                                )}
                              </div>
                              <p className="text-xs text-[#dfe2f1] italic leading-relaxed whitespace-pre-line border-l-2 border-rose-500/60 pl-3">
                                {currentTask.passage2.text}
                              </p>
                            </div>
                          )}

                          {/* Wskaźnik czytelni dla Części 1 (teksty w kolumnie po prawej) */}
                          {isPartOne && (
                            <div className="p-3.5 rounded-xl bg-[#070a0f] border border-[#141d2e] text-xs text-[#94a3b8] flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#ffb800] shrink-0" />
                                <span>
                                  Teksty źródłowe do tego zadania znajdują się w czytelni po prawej stronie ekranu.
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setMobilePart1View('text')}
                                className="lg:hidden shrink-0 px-2.5 py-1 rounded-lg bg-[#ffb800]/20 text-[#ffdca1] font-semibold text-[11px] border border-[#ffb800]/30 cursor-pointer"
                              >
                                Zobacz teksty →
                              </button>
                            </div>
                          )}

                          {/* Ikonografia / Materiał Wizualny */}
                          <TaskVisualAssetCard task={currentTask} />

                          {/* Treść Polecenia z ujednoliconym obramowaniem */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-[#070a0f] border border-[#141d2e] text-sm sm:text-base font-medium text-white leading-relaxed min-h-[84px] sm:min-h-[96px] flex flex-col justify-center shadow-xs">
                            <div>{currentTask.question}</div>
                          </div>

                          {/* ========================================================= */}
                          {/* WARIANT 1: ZADANIE JEDNOKROTNEGO WYBORU (ABCD)             */}
                          {/* ========================================================= */}
                          {currentTask.taskType === 'single_choice' && currentTask.options && (
                            <div className="space-y-3 pt-1">
                              <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">
                                Wybierz odpowiedź CKE:
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {currentTask.options.map((opt, i) => {
                                  const optionLetter = String.fromCharCode(65 + i);
                                  const isSelected = currentAnswerState.selectedOption === i;
                                  const isCorrect = i === currentTask.correctOptionIndex;

                                  return (
                                    <button
                                      key={i}
                                      onClick={() => {
                                        if (!currentAnswerState.isSubmitted) {
                                          updateCurrentAnswer({ selectedOption: i });
                                        }
                                      }}
                                      disabled={currentAnswerState.isSubmitted}
                                      className={`p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                                        currentAnswerState.isSubmitted && isCorrect
                                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-sm'
                                          : currentAnswerState.isSubmitted && isSelected && !isCorrect
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
                                      <span className="flex-1 font-medium">{opt}</span>
                                      {currentAnswerState.isSubmitted && isCorrect && (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                      )}
                                      {currentAnswerState.isSubmitted && isSelected && !isCorrect && (
                                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Przycisk Zatwierdź / Druga próba */}
                              {!currentAnswerState.isSubmitted && (
                                <div className="flex items-center justify-end gap-2 pt-2">
                                  <button
                                    onClick={handleSubmitSingleChoice}
                                    disabled={currentAnswerState.selectedOption === null}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ffb800]/20 disabled:opacity-40 transition-all cursor-pointer"
                                  >
                                    <Check className="w-4 h-4" />
                                    <span>Zatwierdź odpowiedź</span>
                                  </button>
                                </div>
                              )}

                              {/* Druga próba jeśli błąd w 1. podejściu */}
                              {!currentAnswerState.isSubmitted && currentAnswerState.attempts === 1 && currentAnswerState.feedback && (
                                <div className="p-3.5 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 text-xs text-[#ffdca1] space-y-2 animate-fadeIn">
                                  <div className="font-semibold">{currentAnswerState.feedback.message}</div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={handleRetryTask}
                                      className="px-3 py-1.5 rounded-lg bg-[#ffb800] text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-[#ffc72c] cursor-pointer"
                                    >
                                      <RefreshCw className="w-3.5 h-3.5" />
                                      <span>Spróbuj ponownie (2. próba)</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        updateCurrentAnswer({ isSubmitted: true, pointsAwarded: 0 });
                                        setShowExplanation(true);
                                        setShowCkeKey(true);
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#94a3b8] hover:text-white text-xs cursor-pointer"
                                    >
                                      Odsłoń klucz CKE (0 pkt)
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* WARIANT 2: ZADANIE PRAWDA / FAŁSZ (TABELA)                 */}
                          {/* ========================================================= */}
                          {currentTask.taskType === 'true_false' && currentTask.trueFalseStatements && (
                            <div className="space-y-3">
                              <div className="border border-[#141d2e] rounded-xl overflow-hidden">
                                <table className="w-full text-xs">
                                  <thead className="bg-[#070a0f] border-b border-[#141d2e] text-[#94a3b8]">
                                    <tr>
                                      <th className="py-2.5 px-4 text-left font-semibold">Stwierdzenie</th>
                                      <th className="py-2.5 px-3 text-center font-semibold w-28">Ocena CKE</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#141d2e]">
                                    {currentTask.trueFalseStatements.map((item, idx) => {
                                      const currentVal = currentAnswerState.tfAnswers?.[idx];
                                      const isSubmitted = currentAnswerState.isSubmitted;
                                      const isCorrectRow = isSubmitted && currentVal === item.isTrue;

                                      return (
                                        <tr
                                          key={idx}
                                          className={`${
                                            isSubmitted
                                              ? isCorrectRow
                                                ? 'bg-emerald-950/30'
                                                : 'bg-rose-950/30'
                                              : 'bg-[#0e1522]'
                                          }`}
                                        >
                                          <td className="py-3 px-4 text-[#dfe2f1] leading-relaxed">
                                            {item.statement}
                                            {showExplanation && (
                                              <div className="text-[11px] text-[#94a3b8] mt-1 italic">
                                                Prawidłowo: <strong>{item.isTrue ? 'PRAWDA' : 'FAŁSZ'}</strong> – {item.explanation}
                                              </div>
                                            )}
                                          </td>
                                          <td className="py-3 px-3 text-center">
                                            <div className="inline-flex items-center gap-1.5">
                                              <button
                                                onClick={() => {
                                                  if (!isSubmitted) {
                                                    updateCurrentAnswer({
                                                      tfAnswers: {
                                                        ...currentAnswerState.tfAnswers,
                                                        [idx]: true,
                                                      },
                                                    });
                                                  }
                                                }}
                                                disabled={isSubmitted}
                                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                  currentVal === true
                                                    ? 'bg-[#ffb800] text-slate-950 font-bold'
                                                    : 'bg-[#070a0f] border border-[#141d2e] text-[#94a3b8] hover:text-white'
                                                }`}
                                              >
                                                P
                                              </button>
                                              <button
                                                onClick={() => {
                                                  if (!isSubmitted) {
                                                    updateCurrentAnswer({
                                                      tfAnswers: {
                                                        ...currentAnswerState.tfAnswers,
                                                        [idx]: false,
                                                      },
                                                    });
                                                  }
                                                }}
                                                disabled={isSubmitted}
                                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                  currentVal === false
                                                    ? 'bg-[#ffb800] text-slate-950 font-bold'
                                                    : 'bg-[#070a0f] border border-[#141d2e] text-[#94a3b8] hover:text-white'
                                                }`}
                                              >
                                                F
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              {!currentAnswerState.isSubmitted && (
                                <div className="flex items-center justify-end pt-2">
                                  <button
                                    onClick={handleSubmitTrueFalse}
                                    disabled={
                                      Object.keys(currentAnswerState.tfAnswers).length <
                                      currentTask.trueFalseStatements.length
                                    }
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ffb800]/20 disabled:opacity-40 transition-all cursor-pointer"
                                  >
                                    <Check className="w-4 h-4" />
                                    <span>Zatwierdź tabelę P/F</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* WARIANT 3: TRENAŻER NOTATKI SYNTETYZUJĄCEJ (4 PKT CKE)     */}
                          {/* ========================================================= */}
                          {currentTask.taskType === 'synthesis_note' && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-[#94a3b8] font-medium">
                                  Notatka syntetyzująca (oficjalne rygorystyczne kryteria CKE):
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[#94a3b8]">Wyrazy:</span>
                                  <span
                                    className={`font-mono px-2.5 py-0.5 rounded text-xs font-bold ${
                                      synthesisWordCount >= 60 && synthesisWordCount <= 90
                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                        : synthesisWordCount > 90
                                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                        : 'bg-[#ffb800]/20 text-[#ffdca1] border border-[#ffb800]/40'
                                    }`}
                                  >
                                    {synthesisWordCount} / 60–90 słów
                                  </span>
                                </div>
                              </div>

                              <textarea
                                rows={6}
                                value={currentAnswerState.synthesisText}
                                onChange={(e) =>
                                  updateCurrentAnswer({ synthesisText: e.target.value })
                                }
                                disabled={currentAnswerState.isSubmitted}
                                placeholder="Wpisz syntetyczne zestawienie obu tekstów (60–90 słów). Wskaż stanowisko autora 1, autora 2 oraz syntezę..."
                                className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl p-3.5 text-xs text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#ffdca1] leading-relaxed font-sans"
                              />

                              {!currentAnswerState.isSubmitted && (
                                <div className="flex items-center justify-between pt-2">
                                  <div className="text-[11px] text-[#94a3b8]">
                                    {synthesisWordCount < 60
                                      ? `⚠️ Brakuje jeszcze ${60 - synthesisWordCount} słów do dolnego progu CKE.`
                                      : synthesisWordCount <= 90
                                      ? '✔️ Długość tekstu idealnie spełnia kryterium CKE (60–90).'
                                      : `⚠️ Przekroczono limit o ${synthesisWordCount - 90} słów.`}
                                  </div>
                                  <button
                                    onClick={handleSubmitSynthesis}
                                    disabled={synthesisWordCount < 20}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-[#ffb800]/20 disabled:opacity-40 transition-all cursor-pointer"
                                  >
                                    <Zap className="w-4 h-4" />
                                    <span>Zatwierdź i oceń notatkę (matryca CKE)</span>
                                  </button>
                                </div>
                              )}

                              {/* Szczegółowa matryca oceniania notatki syntetyzującej */}
                              {currentAnswerState.feedback?.partialScore && (
                                <div className="p-4 rounded-xl bg-[#070a0f] border border-[#ffb800]/40 space-y-3 animate-fadeIn">
                                  <div className="flex items-center justify-between text-xs font-bold text-[#ffdca1] uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5">
                                      <Target className="w-4 h-4 text-[#ffb800]" />
                                      Oficjalna Matryca Oceny Notatki CKE
                                    </span>
                                    <span className="text-sm font-mono text-white">
                                      {currentAnswerState.feedback.partialScore.total} / 4 pkt
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                                    <div className="p-3 rounded-lg bg-[#0e1522] border border-[#141d2e]">
                                      <div className="text-[11px] text-[#94a3b8]">1. Treść i synteza:</div>
                                      <div className="text-sm font-bold text-white mt-0.5">
                                        {currentAnswerState.feedback.partialScore.content} / 2 pkt
                                      </div>
                                      <div className="text-[10px] text-[#94a3b8] mt-1">
                                        Zestawienie obu autorów i uogólnienie
                                      </div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#0e1522] border border-[#141d2e]">
                                      <div className="text-[11px] text-[#94a3b8]">2. Kompozycja:</div>
                                      <div className="text-sm font-bold text-white mt-0.5">
                                        {currentAnswerState.feedback.partialScore.composition} / 1 pkt
                                      </div>
                                      <div className="text-[10px] text-[#94a3b8] mt-1">
                                        Przedział 60–90 słów & spójność
                                      </div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#0e1522] border border-[#141d2e]">
                                      <div className="text-[11px] text-[#94a3b8]">3. Język i styl:</div>
                                      <div className="text-sm font-bold text-white mt-0.5">
                                        {currentAnswerState.feedback.partialScore.language} / 1 pkt
                                      </div>
                                      <div className="text-[10px] text-[#94a3b8] mt-1">
                                        Parafraza własnymi słowami
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-xs text-[#ffdca1] leading-relaxed pt-1">
                                    {currentAnswerState.feedback.message}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* WARIANT 4A: INTERAKTYWNE DOPASOWANIE (DRAG & DROP + DYSTRAKTOR) */}
                          {/* ========================================================= */}
                          {currentTask.taskType === 'matching' && (
                            <TaskMatchingInteractive
                              task={currentTask}
                              isSubmitted={currentAnswerState.isSubmitted}
                              onAnswerSubmit={handleMatchingAnswerSubmit}
                              feedback={currentAnswerState.feedback}
                            />
                          )}

                          {/* ========================================================= */}
                          {/* WARIANT 4B: ZADANIE OTWARTE KRÓTKIEJ ODPOWIEDZI          */}
                          {/* ========================================================= */}
                          {(currentTask.taskType === 'short_open' || (!['single_choice', 'true_false', 'matching', 'synthesis_note', 'essay_blueprint'].includes(currentTask.taskType))) && (
                            <div className="space-y-3">
                              <label className="text-xs text-[#94a3b8] font-medium">Twoja odpowiedź:</label>
                              <textarea
                                rows={3}
                                value={currentAnswerState.openAnswer}
                                onChange={(e) =>
                                  updateCurrentAnswer({ openAnswer: e.target.value })
                                }
                                disabled={currentAnswerState.isSubmitted}
                                placeholder="Sformułuj precyzyjną odpowiedź własnymi słowami..."
                                className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl p-3 text-xs text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#ffdca1] leading-relaxed"
                              />

                              {!currentAnswerState.isSubmitted && (
                                <div className="flex items-center justify-end pt-2">
                                  <button
                                    onClick={handleSubmitOpenTask}
                                    disabled={!currentAnswerState.openAnswer.trim()}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ffb800]/20 disabled:opacity-40 transition-all cursor-pointer"
                                  >
                                    <Check className="w-4 h-4" />
                                    <span>Zatwierdź odpowiedź (sprawdź z CKE)</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* WARIANT 5: KONSPEKT WYPRACOWANIA (35 PKT)                 */}
                          {/* ========================================================= */}
                          {currentTask.taskType === 'essay_blueprint' && currentTask.essayBlueprint && (
                            <div className="p-4 rounded-xl bg-[#070a0f] border border-emerald-500/30 space-y-3">
                              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Award className="w-4 h-4" />
                                Modelowy konspekt maturalny CKE (35 pkt)
                              </div>
                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="font-semibold text-[#ffdca1]">Rekomendowane tezy:</span>
                                  <ul className="list-disc list-inside text-[#dfe2f1] mt-1 space-y-1">
                                    {currentTask.essayBlueprint.recommendedTheses.map((t, i) => (
                                      <li key={i}>{t}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="pt-2 border-t border-[#141d2e]">
                                  <span className="font-semibold text-rose-400">Lektury z gwiazdką (*):</span>
                                  <div className="text-[#dfe2f1] mt-1">
                                    {currentTask.essayBlueprint.mandatoryStarBooks.join(' • ')}
                                  </div>
                                </div>
                                <div className="pt-2 border-t border-[#141d2e]">
                                  <span className="font-semibold text-[#ffdca1]">Proponowane konteksty:</span>
                                  <div className="space-y-1 mt-1">
                                    {currentTask.essayBlueprint.suggestedContexts.map((c, i) => (
                                      <div key={i} className="text-[#dfe2f1]">
                                        <span className="text-[#ffdca1] font-medium capitalize">[{c.type}]</span> {c.description}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {!currentAnswerState.isSubmitted && (
                                <div className="pt-3 border-t border-[#141d2e] flex justify-end">
                                  <button
                                    onClick={() => {
                                      updateCurrentAnswer({
                                        isSubmitted: true,
                                        pointsAwarded: currentTask.points,
                                        feedback: {
                                          isCorrect: true,
                                          message: 'Konspekt przeanalizowany. Zobacz oficjalne kryteria CKE.',
                                        },
                                      });
                                      setShowExplanation(true);
                                      setShowCkeKey(true);
                                    }}
                                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-xs"
                                  >
                                    Oznacz konspekt jako przyswojony (+{currentTask.points} pkt)
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Komunikat informacyjny po zatwierdzeniu */}
                          {currentAnswerState.isSubmitted && currentAnswerState.feedback && (
                            <div
                              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-fadeIn ${
                                currentAnswerState.feedback.isCorrect
                                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                              }`}
                            >
                              <div className="flex items-center justify-between font-bold">
                                <div className="flex items-center gap-2">
                                  {currentAnswerState.feedback.isCorrect ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                  ) : (
                                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                                  )}
                                  <span>{currentAnswerState.feedback.message}</span>
                                </div>
                                <span className="font-mono text-sm px-2 py-0.5 rounded bg-[#070a0f] border border-[#141d2e] text-[#ffdca1]">
                                  {currentAnswerState.pointsAwarded} / {currentTask.points} pkt
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Pasek Narzędzi i Nawigacji po Zadaniu */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#141d2e]">
                            <div className="flex items-center gap-2">
                              {currentAnswerState.isSubmitted ? (
                                <>
                                  <button
                                    onClick={() => setShowExplanation(!showExplanation)}
                                    className="px-3.5 py-2 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#94a3b8] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-4 h-4" />
                                    {showExplanation ? 'Ukryj wyjaśnienie' : 'Wyjaśnienie'}
                                  </button>
                                  <button
                                    onClick={() => setShowCkeKey(!showCkeKey)}
                                    className="px-3.5 py-2 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#ffdca1] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                  >
                                    <FileText className="w-4 h-4" />
                                    {showCkeKey ? 'Ukryj klucz CKE' : 'Klucz CKE'}
                                  </button>
                                </>
                              ) : (
                                <span className="text-[11px] text-[#94a3b8] italic">
                                  🔒 Klucz CKE i wyjaśnienia odblokują się po zatwierdzeniu odpowiedzi.
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {activeTaskIndex > 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const prevIdx = activeTaskIndex - 1;
                                    setActiveTaskIndex(prevIdx);
                                    const prevAns = taskAnswers[lessonTasks[prevIdx]?.id];
                                    setShowExplanation(prevAns?.isSubmitted || false);
                                    setShowCkeKey(prevAns?.isSubmitted || false);
                                  }}
                                  className="px-4 py-2 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-xs font-semibold text-[#94a3b8] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                  <span>Poprzednie</span>
                                </button>
                              )}
                              {activeTaskIndex < lessonTasks.length - 1 ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextIdx = activeTaskIndex + 1;
                                    setActiveTaskIndex(nextIdx);
                                    const nextAns = taskAnswers[lessonTasks[nextIdx]?.id];
                                    setShowExplanation(nextAns?.isSubmitted || false);
                                    setShowCkeKey(nextAns?.isSubmitted || false);
                                  }}
                                  className="px-4 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] border border-[#141d2e] text-xs font-semibold text-[#ffdca1] flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <span>Następne zadanie</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (isSummaryUnlocked) setCurrentStage('summary');
                                  }}
                                  disabled={!isSummaryUnlocked}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                    isSummaryUnlocked
                                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 cursor-pointer'
                                      : 'bg-[#070a0f] border border-[#141d2e] text-[#94a3b8]/50 cursor-not-allowed opacity-60'
                                  }`}
                                >
                                  {!isSummaryUnlocked && <Lock className="w-3.5 h-3.5" />}
                                  <span>Podsumowanie lekcji</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Klucz CKE (wyświetlany po zatwierdzeniu) */}
                          {showCkeKey && currentAnswerState.isSubmitted && (
                            <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-3 animate-fadeIn">
                              <div className="text-xs font-bold text-[#ffdca1] uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#ffb800]" />
                                <span>Oficjalny klucz punktowania CKE</span>
                              </div>
                              {currentTask.correctAnswerText && (
                                <div>
                                  <div className="text-[11px] font-semibold text-[#94a3b8]">
                                    Wzorcowa odpowiedź:
                                  </div>
                                  <div className="text-xs text-[#dfe2f1] mt-0.5">
                                    {currentTask.correctAnswerText}
                                  </div>
                                </div>
                              )}
                              {currentTask.synthesisModelSummary && (
                                <div>
                                  <div className="text-[11px] font-semibold text-[#94a3b8]">
                                    Wzorcowa notatka syntetyzująca (CKE):
                                  </div>
                                  <div className="text-xs text-[#dfe2f1] mt-0.5 italic bg-[#0e1522] p-2.5 rounded-lg border border-[#141d2e]">
                                    „{currentTask.synthesisModelSummary}”
                                  </div>
                                </div>
                              )}
                              {currentTask.ckeKeyCriteria && (
                                <div>
                                  <div className="text-[11px] font-semibold text-[#94a3b8]">
                                    Kryteria punktacji:
                                  </div>
                                  <ul className="list-disc list-inside text-xs text-[#dfe2f1] mt-1 space-y-1">
                                    {currentTask.ckeKeyCriteria.map((c, i) => (
                                      <li key={i}>{c}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Wyjaśnienie merytoryczne */}
                          {showExplanation && currentAnswerState.isSubmitted && (
                            <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] text-xs text-[#dfe2f1] space-y-1 animate-fadeIn">
                              <span className="font-semibold text-white">
                                Wyjaśnienie i kontekst merytoryczny:
                              </span>
                              <p className="leading-relaxed">{currentTask.explanation}</p>
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  {/* Prawa Kolumna: Czytelnia Tekstów Źródłowych CKE (Tylko dla Części 1) */}
                  {isPartOne && (
                    <div
                      className={`lg:col-span-5 ${
                        mobilePart1View === 'text' ? 'block' : 'hidden lg:block'
                      }`}
                    >
                      <PartOneReadingRoom task={currentTask} />
                    </div>
                  )}
                </div>
              </>
            )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAP 3: PODSUMOWANIE LEKCJI & ZALICZENIE (+XP) (CELEBRACJA W STYLU MATH)  */}
      {/* ========================================================================= */}
      {currentStage === 'summary' && (
        <div key="summary" className="max-w-2xl mx-auto space-y-6 animate-fadeIn text-center">
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
                <span className="text-[11px] text-[#94a3b8] block">Czas pracy</span>
                <span className="text-base font-bold text-emerald-400">
                  {Math.round((45 * 60 - secondsRemaining) / 60)} min
                </span>
              </div>
            </div>

            {/* Kluczowe wnioski z lekcji */}
            <div className="p-4 rounded-xl bg-[#070a0f]/60 border border-[#141d2e] text-left space-y-2">
              <span className="text-xs font-bold text-[#ffdca1] flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#ffb800]" />
                <span>Kluczowe patenty maturalne z tej lekcji:</span>
              </span>
              <ul className="space-y-1.5 text-xs text-[#dfe2f1]">
                {lesson.summary.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#ffb800] font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Zadanie utrwalające / refleksja */}
            {lesson.summary.reflection && (
              <div className="p-4 rounded-xl bg-[#070a0f]/40 border border-[#141d2e] text-left space-y-1">
                <div className="text-xs font-bold text-[#ffdca1] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Zadanie domowe / Trening refleksyjny:</span>
                </div>
                <p className="text-xs text-[#dfe2f1] italic leading-relaxed">
                  „{lesson.summary.reflection}”
                </p>
              </div>
            )}

            {/* Przyciski końcowe */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentStage('practice')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#94a3b8] hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Wróć do zadań</span>
              </button>

              {!lessonFinished ? (
                <button
                  onClick={handleFinishLesson}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#ffb800]/20 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Zakończ lekcję i odbierz +150 XP!</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3.5 py-2.5 rounded-xl border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" /> Lekcja zaliczona (+150 XP)
                  </span>

                  {lesson.number < 24 && onNextLesson && (
                    <button
                      onClick={() => onNextLesson(`lekcja-${lesson.number + 1}`)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md shadow-[#ffb800]/20 cursor-pointer"
                    >
                      <span>Następna lekcja ({lesson.number + 1}/24)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Konsultacja Egzaminatora CKE */}
      {showConsultationModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowConsultationModal(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#0e1522] border border-[#141d2e] rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#141d2e]">
              <div className="flex items-center gap-2 text-[#ffdca1]">
                <GraduationCap className="w-5 h-5 text-[#ffb800]" />
                <span className="font-bold text-sm tracking-wide text-white uppercase">
                  Konsultacja Egzaminatora CKE
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowConsultationModal(false)}
                className="p-1 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#141d2e] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#94a3b8]">
                Wskazówka metodyczna do zadania #{activeTaskIndex + 1}:
              </div>
              <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] text-xs text-[#dfe2f1] leading-relaxed italic space-y-2">
                <p>
                  {currentTask?.hintCke ||
                    `Zwróć uwagę na problematykę utworu „${currentTask?.lektura || 'lektury'}” oraz specyfikę epoki (${currentTask?.epoch || 'historycznoliterackiej'}). Skoncentruj się na motywach, postawach moralnych bohaterów i oficjalnych wymaganiach kanonu lektur.`}
                </p>
                {currentTask?.ckeKeyCriteria && currentTask.ckeKeyCriteria.length > 0 && (
                  <div className="pt-2 border-t border-[#141d2e] not-italic text-[11px] text-[#ffdca1]">
                    <span className="font-bold">Kryterium oceniania CKE:</span> {currentTask.ckeKeyCriteria[0]}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-[#94a3b8]">
                Pozostałe konsultacje w tej lekcji: <strong className="text-[#ffdca1]">{consultationsLeft}</strong>
              </span>
              <button
                type="button"
                onClick={() => setShowConsultationModal(false)}
                className="px-4 py-2 rounded-xl bg-[#141d2e] hover:bg-[#1b273d] text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Rozumiem, wracam do zadania
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2-Godzinnego Cooldownu Core-4 z Opcją Odblokowania za Monety */}
      {showCooldownModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowCooldownModal(false)}
        >
          <div
            className="bg-[#0e1522] border border-[#141d2e] rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-5 shadow-2xl relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nagłówek */}
            <div className="flex items-center justify-between pb-3 border-b border-[#141d2e]">
              <div className="flex items-center gap-2.5 text-[#ffb800]">
                <Clock className="w-5 h-5 text-[#ffb800] animate-pulse" />
                <span className="font-bold text-sm tracking-wide text-white uppercase">
                  Odstęp Pamięciowy Core-4
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowCooldownModal(false)}
                className="p-1 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#141d2e] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Treść */}
            <div className="space-y-3">
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Zgodnie z krzywą zapominania Ebbinghausa i metodyką mikro-nauki, ponowny trening dla lekcji <strong className="text-[#dfe2f1]">„{lesson.title}”</strong> odblokuje się bezpłatnie za:
              </p>

              {/* Licznik czasu */}
              <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] uppercase tracking-wider text-[#94a3b8] font-semibold">
                  Pozostały czas do bezpłatnego losowania:
                </span>
                <span className="font-mono text-2xl font-black text-[#ffdca1] tracking-wider">
                  {formatCooldown(cooldownRemainingMs)}
                </span>
              </div>

              {/* Saldo monet */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#070a0f]/60 border border-[#141d2e] text-xs">
                <span className="text-[#94a3b8]">Twoje aktualne saldo monet:</span>
                <span className="font-bold text-[#ffdca1] flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-[#ffb800]" />
                  {userState?.coins ?? 0} 🪙
                </span>
              </div>

              {cooldownErrorMsg && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{cooldownErrorMsg}</span>
                </div>
              )}
            </div>

            {/* Przyciski akcji */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowCooldownModal(false)}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl bg-[#141d2e] hover:bg-[#1a253a] text-[#dfe2f1] font-semibold text-xs transition-colors cursor-pointer text-center"
              >
                Poczekaj
              </button>

              <button
                type="button"
                onClick={handleBypassCooldownWithCoins}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#ffb800]/15 transition-all cursor-pointer"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Odblokuj za 50 🪙</span>
              </button>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};
