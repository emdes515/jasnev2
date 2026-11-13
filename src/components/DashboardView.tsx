import { uniqueLessonMistakes } from '../lib/lessonMistakes';
import React, { useMemo, useState, useEffect } from 'react';
import { 
  Flame, 
  Check, 
  Play, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  Clock,
  BookOpen,
  Calculator,
  Globe,
  Dna,
  FlaskConical,
  Lock,
  Target,
  Cpu,
  FileText,
  Layers,
  GraduationCap,
  PenTool
} from 'lucide-react';
import { motion } from 'motion/react';
import { triggerHaptic, getMilestoneStreakDays, filterActualTaskIds } from '../utils';
import { UserState, SubjectKey, DailyChallengeId } from '../types';
import { ExamHubModal } from './ExamHubModal';
import { POLISH_EPOCHS, POLISH_LESSONS } from '../data/polish';
import { MATURA_LEKTURY } from '../data/maturaLektury';

import { getLessonsForTopic, formatLessonDuration } from '../utils/lessonGrouping';
import { drawSessionTasks } from '../data/dzial1TaskPool';
import { curriculumRepository } from '../services/curriculumRepository';
import { PredictorWidget } from './PredictorWidget';
import { PredictorDetailsModal } from './PredictorDetailsModal';
import { calculateMaturaPrediction } from '../lib/maturaPredictor';
import { getExamResult } from '../lib/examResults';
import { getCkeAvailableSubjects, normalizeSubjectFirestoreId, useCkeCatalogs } from '../services/ckeCatalogRepository';
import { DailyChallengesWidget } from './DailyChallengesWidget';

interface DashboardViewProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  userState?: UserState;
  completedTasks?: string[];
  lessonMistakes?: Record<string, number>;
  taskStars?: Record<string, number>;
  selectedSubjectKey?: SubjectKey;
  onSelectSubject?: (key: SubjectKey) => void;
  onStartTask?: (task: any, lessonTasks?: any[], lessonTitle?: string, nextLesson?: any) => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  saveUserData?: (state: UserState) => void;
  onOpenParentSponsor?: () => void;
  onOpenProPopup?: () => void;
  onOpenDiagnostic?: () => void;
  onOpenAiGenerator?: () => void;
  onOpenMistakesBank?: () => void;
  onClaimDailyChallenge?: (challengeId: DailyChallengeId, rewardCoins: number) => void;
}

export function DashboardView({ 
  onNavigate, 
  userState, 
  completedTasks = [], 
  lessonMistakes = {},
  taskStars = {},
  selectedSubjectKey: propSubjectKey,
  onSelectSubject,
  onStartTask,
  onOpenParentSponsor,
  onOpenProPopup,
  onOpenDiagnostic,
  onOpenAiGenerator,
  onOpenMistakesBank,
  onClaimDailyChallenge
}: DashboardViewProps) {
  useCkeCatalogs();
  const streakDays = userState?.streakDays || 0;
  const [isExamHubOpen, setIsExamHubOpen] = useState<boolean>(false);
  const [polishTopics, setPolishTopics] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    curriculumRepository.getTopics('jezyk-polski').then(t => {
      if (isMounted && t && t.length > 0) {
        setPolishTopics(t);
      }
    }).catch(err => {
      console.warn('[DashboardView] Could not load Polish topics from repository:', err);
    });
    return () => { isMounted = false; };
  }, []);



  // 1. ZADANIA - Rzeczywista liczba unikalnych, poprawnie rozwiązanych zadań
  const actualCompletedTasks = useMemo(() => {
    return filterActualTaskIds(completedTasks);
  }, [completedTasks]);

  const masteredTasksCount = actualCompletedTasks.length;

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const todayTasksCount = userState?.dailyTaskCounts?.[todayStr] || 0;

  // 2. SKUTECZNOŚĆ - Rzeczywisty procent wyliczony z rozwiązanych zadań oraz popełnionych błędów
  const { accuracyPercent, totalMistakes, accuracyBadgeLabel } = useMemo(() => {
    const uniqueMistakes = uniqueLessonMistakes(lessonMistakes);

    const mistakesSum = Object.values(uniqueMistakes).reduce((acc, curr) => acc + curr, 0);
    const solvedCount = actualCompletedTasks.length;

    if (solvedCount === 0 && mistakesSum === 0) {
      if (userState?.maturaBestScore && userState.maturaBestScore > 0) {
        return {
          accuracyPercent: userState.maturaBestScore,
          totalMistakes: 0,
          accuracyBadgeLabel: `${userState.maturaBestScore}%`
        };
      }
      return {
        accuracyPercent: 0,
        totalMistakes: 0,
        accuracyBadgeLabel: '0%'
      };
    }

    const totalAttempts = solvedCount + mistakesSum;
    const computedPct = totalAttempts > 0 
      ? Math.min(100, Math.max(0, Math.round((solvedCount / totalAttempts) * 100)))
      : 100;

    let badgeLabel = 'Świetnie';
    if (computedPct === 100) badgeLabel = '100%';
    else if (computedPct >= 90) badgeLabel = 'Top';
    else if (computedPct >= 75) badgeLabel = 'Dobra';
    else badgeLabel = 'W toku';

    return {
      accuracyPercent: computedPct,
      totalMistakes: mistakesSum,
      accuracyBadgeLabel: badgeLabel
    };
  }, [actualCompletedTasks.length, lessonMistakes, userState?.maturaBestScore]);

  // 3. CZAS NAUKI - Rzeczywisty czas aktywności w bieżącym tygodniu
  const { studyTimeValue, studyTimeUnit, isStudyActiveThisWeek, activeDaysLabel } = useMemo(() => {
    const weeklyMins = userState?.weeklyTimeSpentMinutes || 0;
    const totalSecs = userState?.timeSpentTotalSeconds || 0;

    let effectiveMinutes = weeklyMins;
    if (effectiveMinutes === 0 && totalSecs >= 60) {
      effectiveMinutes = Math.floor(totalSecs / 60);
    }

    const activeDates = userState?.streakActiveDates || [];
    const daysCount = activeDates.length > 0 
      ? Math.min(7, activeDates.length) 
      : (streakDays > 0 ? Math.min(7, streakDays) : 0);

    const hasActivity = effectiveMinutes > 0 || streakDays > 0 || totalSecs > 0;

    if (effectiveMinutes === 0 && totalSecs > 0 && totalSecs < 60) {
      return {
        studyTimeValue: '< 1',
        studyTimeUnit: 'min',
        isStudyActiveThisWeek: true,
        activeDaysLabel: daysCount > 0 ? `${daysCount} dni z nauką` : 'Aktywna sesja'
      };
    }

    return {
      studyTimeValue: String(effectiveMinutes),
      studyTimeUnit: 'min',
      isStudyActiveThisWeek: hasActivity,
      activeDaysLabel: daysCount > 0 ? `${daysCount} dni z nauką` : 'Ten tydzień'
    };
  }, [userState?.weeklyTimeSpentMinutes, userState?.timeSpentTotalSeconds, userState?.streakActiveDates, streakDays]);

  const { days: streakMilestones, isCompletedToday, todayTargetDayNumber } = useMemo(() => {
    return getMilestoneStreakDays(
      streakDays,
      userState?.lastStreakDate,
      userState?.streakActiveDates
    );
  }, [streakDays, userState?.lastStreakDate, userState?.streakActiveDates]);

  const [internalSubjectKey, setInternalSubjectKey] = useState<SubjectKey>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_selected_subject');
      if (stored && ['math', 'pol', 'eng', 'math-roz', 'eng-roz'].includes(stored)) {
        return stored as SubjectKey;
      }
      return 'math';
    } catch {
      return 'math';
    }
  });

  const selectedSubjectKey = (propSubjectKey || internalSubjectKey) as SubjectKey;

  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    const firestoreSubjectId = normalizeSubjectFirestoreId(selectedSubjectKey);

    curriculumRepository.getTopics(firestoreSubjectId).then(loaded => {
      if (isSubscribed && loaded && loaded.length > 0) {
        setTopics(loaded);
      }
    });
    return () => { isSubscribed = false; };
  }, [selectedSubjectKey]);

  useEffect(() => {
    const handleStorage = () => {
      try {
        const stored = localStorage.getItem('matura_quest_selected_subject') || 'math';
        const validKeys: SubjectKey[] = ['math', 'pol', 'eng', 'math-roz', 'eng-roz'];
        if (stored !== selectedSubjectKey && validKeys.includes(stored as SubjectKey)) {
          setInternalSubjectKey(stored as SubjectKey);
          onSelectSubject?.(stored as SubjectKey);
        }
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [selectedSubjectKey, onSelectSubject]);

  const [showPredictorDetails, setShowPredictorDetails] = useState<boolean>(false);

  const handleSelectSubject = (newSubjectKey: string) => {
    const subMeta = getCkeAvailableSubjects().find(s => s.key === newSubjectKey);
    if (subMeta && !subMeta.isAvailable) {
      return; // ignores unavailable subjects
    }
    const validKeys: SubjectKey[] = ['math', 'pol', 'eng', 'math-roz', 'eng-roz'];
    if (!validKeys.includes(newSubjectKey as SubjectKey)) return;
    const key = newSubjectKey as SubjectKey;
    setInternalSubjectKey(key);
    onSelectSubject?.(key);
    try {
      localStorage.setItem('matura_quest_selected_subject', key);
      window.dispatchEvent(new Event('storage'));
    } catch {}
  };

  const currentSubjectId = normalizeSubjectFirestoreId(selectedSubjectKey);

  const allCompletedLessonIds = useMemo(() => [
    ...(userState?.completed_lessons || []),
    ...(userState?.completedLessonsPolish || []),
    ...(userState?.completedLessonsEnglish || []),
  ], [userState?.completed_lessons, userState?.completedLessonsPolish, userState?.completedLessonsEnglish]);
  const subjectExam = getExamResult(userState, selectedSubjectKey ?? 'math');

  // Dynamiczny predyktor wyniku maturalnego CKE (obliczany w czasie rzeczywistym)
  const maturaPrediction = useMemo(() => {
    return calculateMaturaPrediction({
      subjectId: currentSubjectId,
      completedTasks,
      lessonMistakes,
      userLessonsCompleted: allCompletedLessonIds,
      maturaAttempts: subjectExam.attempts,
      maturaBestScore: subjectExam.bestScore
    });
  }, [
    currentSubjectId,
    completedTasks,
    lessonMistakes,
    allCompletedLessonIds,
    subjectExam.attempts,
    subjectExam.bestScore
  ]);

  const nextUp = useMemo(() => {
    for (let topicIdx = 0; topicIdx < topics.length; topicIdx++) {
      const topic = topics[topicIdx];
      const lessons = getLessonsForTopic(topic);
      const incompleteLesson = lessons.find(l => {
        const cleanId = l.id.replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?lesson[-_]?/i, '');
        const dotId = cleanId.replace('-', '.');
        const userLessons: string[] = (userState as any)?.completed_lessons || [];
        const isDone = 
          completedTasks.includes(`LESSON-${l.id}`) ||
          completedTasks.includes(`LESSON-${cleanId}`) ||
          completedTasks.includes(`LESSON-${dotId}`) ||
          completedTasks.includes(l.id) ||
          completedTasks.includes(cleanId) ||
          userLessons.includes(l.id) ||
          userLessons.includes(cleanId) ||
          userLessons.includes(dotId);
        return !isDone;
      });

      if (incompleteLesson) {
        return {
          topicIdx,
          topicId: topic.id,
          topicName: topic.name || topic.title,
          groupId: incompleteLesson.id,
          lessonName: `${incompleteLesson.badge}: ${incompleteLesson.name}`,
          lessonBadge: incompleteLesson.badge,
          task: null,
          groupTasks: incompleteLesson.tasks || [],
          incompleteLesson,
          completedCount: 0,
          totalCount: incompleteLesson.required_correct_tasks || 3
        };
      }
    }
    return null;
  }, [topics, completedTasks, userState]);

  const handleResumeClick = async () => {
    triggerHaptic('medium');
    if (!nextUp) {
      onNavigate?.('nauka');
      return;
    }

    // Dla języka polskiego: otwórz dedykowany gamingowy widok lekcji PolishLessonView
    if (selectedSubjectKey === 'pol') {
      onNavigate?.('nauka', nextUp.groupId);
      return;
    }

    const defaultTopicId = (() => {
      switch (selectedSubjectKey) {
        case 'eng': return 'eng-dzial-1';
        case 'math-roz': return 'mat-roz-dzial-1';
        case 'eng-roz': return 'eng-roz-dzial-1';
        case 'math':
        default:
          return 'dzial-1';
      }
    })();
    const topicId = nextUp.topicId || defaultTopicId;
    const subjectFirestoreId = normalizeSubjectFirestoreId(selectedSubjectKey);

    // 1 document read (0 if cached)
    let lessonDoc: any = null;
    try {
      lessonDoc = await curriculumRepository.getLesson(topicId, nextUp.groupId, subjectFirestoreId);
    } catch (err) {
      console.warn('Could not fetch lesson from repository, falling back to local curriculum', err);
    }

    const localTasks = (nextUp.groupTasks && nextUp.groupTasks.length > 0)
      ? nextUp.groupTasks
      : ((nextUp as any).incompleteLesson?.tasks || []);
    const tasks = (lessonDoc?.tasks && lessonDoc.tasks.length > 0) ? lessonDoc.tasks : localTasks;
    const lessonFormulaSheet = lessonDoc?.formula_sheet || lessonDoc?.formulaSheet || (nextUp as any).incompleteLesson?.formula_sheet;
    const poolResult = drawSessionTasks(nextUp.groupId, tasks, lessonFormulaSheet);
    const tasksToRun = (poolResult.sessionTasks && poolResult.sessionTasks.length > 0)
      ? poolResult.sessionTasks
      : (tasks.length > 0 ? tasks : localTasks);

    if (!tasksToRun || tasksToRun.length === 0) {
      onNavigate?.('nauka', nextUp.groupId);
      return;
    }

    const isEng = selectedSubjectKey === 'eng';
    const sessionPayload = {
      isSession: true,
      originTab: 'dashboard',
      isPolish: false,
      isEnglish: isEng,
      subjectKey: selectedSubjectKey,
      subjectId: subjectFirestoreId,
      topicId,
      lessonId: nextUp.groupId,
      lessonTitle: nextUp.lessonName,
      tasks: tasksToRun,
      firstTask: tasksToRun[0],
      allTasks: tasks,
      formulaSheet: lessonFormulaSheet || poolResult.formulaSheet || null,
      theoryPill: lessonDoc?.theory_pill || poolResult.theoryPill || ((nextUp as any).incompleteLesson as any)?.theory_pill,
      allTaskIdsToMarkCompleted: tasks.map((t: any) => t.id),
      required_correct_tasks: (nextUp as any).incompleteLesson?.required_correct_tasks || poolResult.required_correct_tasks || 3,
      estimated_time_formatted: (nextUp as any).incompleteLesson?.estimated_time_formatted || poolResult.estimated_time_formatted || '~5 min'
    };

    if (onStartTask) {
      onStartTask(sessionPayload, tasksToRun, sessionPayload.lessonTitle);
    } else {
      onNavigate?.('nauka', nextUp.groupId);
    }
  };

  const renderStreakWidget = () => (
    <motion.div 
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="bg-surface-card border border-surface-border rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-sm group"
    >
      <div className="flex items-center justify-between relative z-10 mb-3.5">
        <div className="pr-2">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-black text-streak-flame text-lg sm:text-xl tracking-wide">
              {streakDays} {streakDays === 1 ? 'Dzień' : 'Dni'} z rzędu!
            </h3>
          </div>
          <p className="text-text-secondary text-[11px] leading-tight mt-0.5">
            {isCompletedToday 
              ? "Dzisiejsza nauka zaliczona."
              : `Cel na dziś: rozwiąż zadanie, aby zaliczyć Dzień ${todayTargetDayNumber}!`}
          </p>
        </div>
        
        <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 flex items-center justify-center shrink-0">
          <Flame size={20} className="text-[#F97316] fill-[#F97316]" />
        </div>
      </div>

      {/* 7-dniowa ścieżka serii z wysokim kontrastem */}
      <div className="grid grid-cols-7 gap-1 xs:gap-1.5 sm:gap-2 relative z-10 pt-3 border-t border-surface-border">
        {streakMilestones.map((m) => {
          return (
            <div key={m.dayNumber} className="flex flex-col items-center gap-1">
              <div 
                className={`w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-[11px] sm:text-xs font-black transition-all duration-200 relative ${
                  m.isCompleted
                    ? 'bg-[#F97316] text-white shadow-sm border border-[#F97316]'
                    : m.isTargetToday
                    ? 'border-2 border-dashed border-[#F97316] text-[#F97316] bg-[#F97316]/10 shadow-sm'
                    : 'bg-surface-elevated/80 border border-white/10 text-slate-400'
                }`}
                title={m.fullLabel}
              >
                {m.isCompleted ? (
                  <Check size={15} strokeWidth={3} />
                ) : m.isTargetToday ? (
                  <Flame size={14} className="fill-[#EA580C]" />
                ) : (
                  <span>{m.dayNumber}</span>
                )}
              </div>
              <span 
                className={`text-[10px] font-bold text-center leading-none truncate max-w-full ${
                  m.isCompleted 
                    ? 'text-[#EA580C]' 
                    : m.isTargetToday 
                    ? 'text-white font-extrabold' 
                    : 'text-text-muted'
                }`}
              >
                {m.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div 
      id="dashboard-scroll-content"
      className="flex flex-col p-4 sm:p-6 lg:p-8 pt-5 pb-28 sm:pb-32 md:pb-24 max-w-6xl xl:max-w-7xl mx-auto w-full"
    >
      <h1 className="mb-5 text-xl font-semibold text-text-primary">Twoja nauka</h1>

      {/* GŁÓWNA SIATKA DASHBOARDU: 2 KOLUMNY NA DESKTOPIE, 1 NA MOBILE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEWA KOLUMNA: KARTA LEKCJI (HERO), PREDYKTOR, STATYSTYKI */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          
          {/* 1. KARTA BIEŻĄCEGO POSTĘPU / NASTĘPNA LEKCJA (HERO CARD) - UNIWERSALNA DLA WSZYSTKICH PRZEDMIOTÓW */}
          {(() => {
            const activeSub = getCkeAvailableSubjects().find(s => s.key === selectedSubjectKey) || {
              name: 'Matematyka',
              shortName: 'Matematyka',
              accentColor: '#FFB800'
            };
            const accentColor = (activeSub as any).accentColor || '#FFB800';

            return (
              <motion.div
                key={`hero-${selectedSubjectKey}`}
                initial={{ y: 8, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleResumeClick}
                className="bg-surface-card border rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-colors shadow-lg group cursor-pointer"
                style={{
                  borderColor: `${accentColor}40`,
                  boxShadow: `0 0 35px -8px ${accentColor}25`
                }}
              >
                {/* Luminous ambient highlight */}
                <div 
                  className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none blur-3xl opacity-20 transition-opacity group-hover:opacity-30"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="flex flex-col gap-3 relative z-10">
                  {/* Tag działu i nazwa przedmiotu */}
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider"
                      style={{
                        color: accentColor === '#FFB800' ? 'var(--text-accent)' : `color-mix(in srgb, ${accentColor} 65%, var(--text-primary))`,
                        backgroundColor: `${accentColor}18`,
                        border: `1px solid ${accentColor}35`
                      }}
                    >
                      {nextUp ? `Dział ${(nextUp.topicIdx ?? 0) + 1}` : 'Dział 1'}
                    </span>
                    <span className="text-xs font-semibold text-text-secondary">
                      {(activeSub as any).name || activeSub.shortName}
                    </span>
                  </div>

                  {/* Tytuł lekcji */}
                  <div>
                    <h2 className="font-display font-black text-text-primary text-lg sm:text-2xl leading-tight">
                      {nextUp ? nextUp.lessonName : topics.length === 0 ? 'Wczytywanie materiałów…' : 'Wszystkie działy ukończone!'}
                    </h2>
                    {nextUp?.topicName && (
                      <p className="text-xs sm:text-sm text-text-secondary font-medium mt-1">
                        {nextUp.topicName}
                      </p>
                    )}
                  </div>

                  {/* Pigułki metadanych lekcji: czas, zadania, pewniak */}
                  <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-bg border border-surface-border text-xs font-medium text-text-secondary">
                      <Clock size={13} className="text-text-muted" />
                      <span>{nextUp ? formatLessonDuration(nextUp.incompleteLesson) : '~5 min'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-bg border border-surface-border text-xs font-medium text-text-secondary">
                      <FileText size={13} className="text-text-muted" />
                      <span>{nextUp ? `Zadania: ${nextUp.totalCount}` : 'Powtórka'}</span>
                    </span>
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        color: accentColor === '#FFB800' ? 'var(--text-accent)' : `color-mix(in srgb, ${accentColor} 65%, var(--text-primary))`,
                        backgroundColor: `${accentColor}12`,
                        border: `1px solid ${accentColor}25`
                      }}
                    >
                      <Target size={13} />
                      <span>Program maturalny</span>
                    </span>
                  </div>
                </div>

                {/* Stopka karty: postęp i wyrazisty CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-4 mt-2 border-t border-surface-border relative z-10">
                  <span className="text-xs sm:text-sm font-medium text-text-secondary">
                    {nextUp ? `${nextUp.completedCount}/${nextUp.totalCount} zadań zaliczonych w tej lekcji` : topics.length === 0 ? 'Pobieramy program nauki.' : 'Wszystko zaliczone!'}
                  </span>

                  <button
                    id="dashboard-resume-learning-button"
                    type="button"
                    onClick={handleResumeClick}
                    className="shrink-0 font-display font-black text-xs sm:text-sm py-3 px-6 sm:px-7 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap self-stretch sm:self-auto hover:brightness-105 active:scale-[0.98]"
                    style={{
                      backgroundColor: accentColor,
                      color: accentColor === '#FFB800' ? '#070A0F' : '#FFFFFF',
                      boxShadow: 'none'
                    }}
                  >
                    <span>{nextUp ? ((nextUp.completedCount || 0) > 0 ? 'Wznów lekcję' : 'Rozpocznij lekcję') : 'Otwórz mapę'}</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* WIDGET SERII (STREAK) NA MOBILE - WYŻEJ W PIONOWYM UKŁADZIE PONIŻEJ KARTY LEKCJI */}
          <div className="block lg:hidden">
            {renderStreakWidget()}
          </div>

          <section className="border-y border-surface-border py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-text-primary">Sprawdź się na maturze</h3>
              <p className="text-sm text-text-secondary mt-1">Wybierz krótki trening lub pełny arkusz.</p>
            </div>
            <button type="button" onClick={() => onNavigate?.('simulator', 'hub')}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-surface-border text-text-primary hover:bg-surface-card-hover font-semibold text-sm focus-visible:outline-2 focus-visible:outline-primary">
              Wybierz trening <ArrowRight size={16} />
            </button>
          </section>

          {/* 2. DYNAMICZNY PREDYKTOR WYNIKU MATURALNEGO CKE */}
          <PredictorWidget
            result={maturaPrediction}
            currentSubjectKey={selectedSubjectKey}
            onOpenDetails={() => setShowPredictorDetails(true)}
            onOpenDiagnostic={onOpenDiagnostic}
            onNavigate={onNavigate}
          />

          <section aria-labelledby="study-progress-title" className="pt-2">
            <h2 id="study-progress-title" className="text-base font-semibold text-text-primary mb-3">Twoje postępy</h2>
            <div id="dashboard-study-stats-panel" className="rounded-2xl border border-surface-border bg-surface-card divide-y sm:divide-y-0 sm:divide-x divide-surface-border grid grid-cols-1 sm:grid-cols-3">
              <div className="p-5 flex flex-col gap-2">
                <span className="text-sm leading-5 min-h-10 text-text-secondary">Rozwiązane zadania</span>
                <strong className="text-2xl font-semibold text-text-primary tabular-nums">{masteredTasksCount}</strong>
                <span className="text-xs text-text-secondary">Łącznie ze wszystkich przedmiotów</span>
              </div>
              <button type="button" disabled={!onOpenMistakesBank} onClick={onOpenMistakesBank}
                className="p-5 flex flex-col items-start gap-2 text-left hover:bg-surface-card-hover focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-default">
                <span className="text-sm leading-5 min-h-10 text-text-secondary">Skuteczność</span>
                <strong className="text-2xl font-semibold text-text-primary tabular-nums">{accuracyPercent}%</strong>
                <span className="text-xs text-text-secondary">{totalMistakes > 0 ? 'Przejdź do błędnych odpowiedzi' : 'Brak błędów do powtórki'}</span>
              </button>
              <div className="p-5 flex flex-col gap-2">
                <span className="text-sm leading-5 min-h-10 text-text-secondary">Czas nauki</span>
                <strong className="text-2xl font-semibold text-text-primary tabular-nums">{studyTimeValue} <span className="text-sm font-normal text-text-secondary">{studyTimeUnit}</span></strong>
                <span className="text-xs text-text-secondary">Zapisany czas aktywności</span>
              </div>
            </div>
          </section>
        </div>

        {/* PRAWA KOLUMNA: SERIA DNI (STREAK) + SZYBKIE NARZĘDZIA */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
          
          {/* WIDGET SERII (STREAK) NA DESKTOPIE */}
          <div className="hidden lg:block">
            {renderStreakWidget()}
          </div>

          {/* WYZWANIA DNIA (DAILY CHALLENGES) */}
          <DailyChallengesWidget
            userState={userState}
            onClaimChallenge={onClaimDailyChallenge}
            onNavigate={onNavigate}
            onOpenMistakesBank={onOpenMistakesBank}
          />

          {/* Dodatkowe narzędzia nie konkurują ze startem lekcji. */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-text-secondary py-3">Więcej sposobów nauki</summary>
          <div className="flex flex-col gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-0.5">
              <Cpu size={14} className="text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Narzędzia Egzaminacyjne
              </h3>
            </div>

            {onOpenDiagnostic && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  onOpenDiagnostic();
                }}
                className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 transition-all flex items-center justify-between text-left group shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Target size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
                        Test Poziomu
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        CKE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-text-primary truncate mt-0.5">
                      Sprawdź, co już umiesz
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-primary shrink-0 group-hover:translate-x-1 transition-all" />
              </button>
            )}

            {onOpenAiGenerator && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  onOpenAiGenerator();
                }}
                className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-purple-500/40 transition-all flex items-center justify-between text-left group shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Cpu size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-purple-300 uppercase tracking-wider">
                        Generator Zadań AI
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        Model CKE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-text-primary truncate mt-0.5">
                      Wygeneruj dodatkowe ćwiczenia
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-purple-400 shrink-0 group-hover:translate-x-1 transition-all" />
              </button>
            )}

            {onOpenMistakesBank && totalMistakes > 0 && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  onOpenMistakesBank();
                }}
                className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 transition-all flex items-center justify-between text-left group shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Zap size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
                        Bank Błędów
                      </span>
                      <span className="text-[10px] font-extrabold text-primary bg-primary/15 border border-primary/30 px-1.5 py-0.5 rounded-full">
                        Otwórz bank błędów
                      </span>
                    </div>
                    <p className="text-xs font-bold text-text-primary truncate mt-0.5">
                      Powtórz zadania z błędami
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-primary shrink-0 group-hover:translate-x-1 transition-all" />
              </button>
            )}
          </div>
          </details>
        </div>

      </div>

      {/* MODAL SZCZEGÓŁOWY I SYMULATOR PREDYKTORA */}
      <PredictorDetailsModal
        isOpen={showPredictorDetails}
        onClose={() => setShowPredictorDetails(false)}
        baseResult={maturaPrediction}
        subjectId={currentSubjectId}
        currentSubjectKey={selectedSubjectKey}
        onSelectSubject={handleSelectSubject}
        completedTasks={completedTasks}
        lessonMistakes={lessonMistakes}
        userLessonsCompleted={allCompletedLessonIds}
        maturaAttempts={subjectExam.attempts}
        maturaBestScore={subjectExam.bestScore}
        onNavigate={onNavigate}
        onOpenParentSponsor={onOpenParentSponsor}
        onOpenProPopup={onOpenProPopup}
      />


      {/* Centrum Egzaminacyjne CKE Modal */}
      <ExamHubModal
        isOpen={isExamHubOpen}
        onClose={() => setIsExamHubOpen(false)}
        onSelectMode={(mode) => onNavigate?.('simulator', mode)}
        selectedSubjectKey={selectedSubjectKey}
      />
    </div>
  );
}

