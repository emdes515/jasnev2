import { useState, useMemo, useEffect } from 'react';
import { ARENA_ENABLED } from '../config/features';
import { motion, AnimatePresence } from 'motion/react';
import { UserState } from '../types';
import {
  Settings,
  LogOut,
  Bell,
  Shield,
  Paintbrush,
  ChevronRight,
  User,
  LogIn,
  Flame,
  Trophy,
  Crown,
  CheckCircle2,
  Swords,
  Zap,
  ShoppingBag,
  Target,
  Sun,
  Moon,
  Monitor,
  Terminal
} from 'lucide-react';
import { logout, auth, loginWithGoogle } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AchievementsSection } from './AchievementsSection';
import { PerksVaultSection } from './PerksVaultSection';
import { JasneLogo } from './ui/JasneLogo';
import { StudyGoalSettings } from './StudyGoalSettings';
import { ShopItem, countTotalClaimable } from '../data/achievements';
import { triggerHaptic, getLocalDateString, filterActualTaskIds } from '../utils';
import { useTheme, ThemeMode, LIGHT_THEME_READY } from '../services/themeManager';

interface ProfileViewProps {
  userState: UserState;
  completedTasks?: string[];
  onClaimAchievement?: (achievementId: string, tier: number) => void;
  onBuyShopItem?: (item: ShopItem, currency: 'tokens' | 'coins') => boolean | Promise<boolean>;
  onUseStreakFreeze?: () => void;
  onOpenAuthModal?: () => void;
  onOpenOnboarding?: () => void;
  onUpdateUserState?: (updater: (previous: UserState) => UserState) => void;
  onOpenDevHub?: () => void;
  onOpenBlikModal?: () => void;
  initialTab?: 'overview' | 'achievements' | 'perks';
}

type ProfileTab = 'achievements' | 'perks' | 'overview';

export function ProfileView({
  userState,
  completedTasks = [],
  onClaimAchievement = () => {},
  onBuyShopItem = () => false,
  onUseStreakFreeze,
  onOpenAuthModal,
  onOpenOnboarding,
  onUpdateUserState,
  onOpenDevHub,
  onOpenBlikModal,
  initialTab = 'overview'
}: ProfileViewProps) {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);
  const streakDays = userState?.streakDays || 0;
  const { themeMode, setTheme } = useTheme();

  const claimableCount = useMemo(() => {
    return countTotalClaimable(
      {
        completedTasksCount: filterActualTaskIds(completedTasks).length,
        arenaWins: userState.arenaWins || 0,
        arenaRating: userState.arenaRating || 1000,
        streakDays: streakDays,
        maturaAttempts: userState.maturaAttempts || 0,
        maturaBestScore: userState.maturaBestScore || 0,
        level: userState.level || 1
      },
      userState.claimedAchievements || {}
    );
  }, [completedTasks, userState, streakDays]);

  const activityDays = useMemo(() => {
    const today = new Date();
    const todayStr = getLocalDateString(today);
    const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
    const days = [];

    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = getLocalDateString(d);
      const isToday = i === 0;

      let count = userState?.dailyTaskCounts?.[dateStr] || 0;

      days.push({
        date: d,
        dateStr,
        dayName: dayNames[d.getDay()],
        count,
        isToday
      });
    }
    return days;
  }, [userState?.dailyTaskCounts, userState?.streakActiveDates, completedTasks]);

  // Jedna liczba „rozwiązanych zadań” w całym profilu: unikalne zadania albo suma dziennych liczników
  // (obejmuje np. zadanie z onboardingu), zależnie od tego, która jest większa
  const totalSolvedCount = useMemo(() => {
    const distinct = filterActualTaskIds(completedTasks).length;
    const daily = Object.values(userState?.dailyTaskCounts || {}).reduce((sum: number, n) => sum + (Number(n) || 0), 0);
    return Math.max(distinct, daily);
  }, [completedTasks, userState?.dailyTaskCounts]);

  const maxActivityCount = useMemo(() => {
    return Math.max(5, ...activityDays.map(d => d.count));
  }, [activityDays]);

  const todayActivityCount = useMemo(() => {
    const todayItem = activityDays.find(d => d.isToday);
    return todayItem ? todayItem.count : 0;
  }, [activityDays]);

  const handleAuthAction = async () => {
    try {
      if (user) {
        await logout();
        triggerHaptic('light');
      } else {
        if (onOpenAuthModal) {
          onOpenAuthModal();
        } else {
          await loginWithGoogle();
        }
        triggerHaptic('medium');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 lg:p-8 pt-6 pb-28 sm:pb-32 md:pb-24 max-w-4xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-bold text-text-primary">Twój profil</h1>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Crown size={12} /> Żetony: {userState.masteryTokens || 0}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-surface-card border border-surface-border p-1.5 rounded-2xl flex items-center gap-1.5 mb-6">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('overview');
            }}
            className={`flex-1 min-h-11 py-2.5 px-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-[0.96] flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-primary/10 text-primary shadow-none'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-card-hover'
            }`}
          >
            <User size={14} />
            <span>Profil</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('achievements');
            }}
            className={`flex-1 min-h-11 py-2.5 px-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-[0.96] flex items-center justify-center gap-1.5 relative cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-primary/10 text-primary shadow-none'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-card-hover'
            }`}
          >
            <Trophy size={14} />
            <span>Odznaki</span>
            {claimableCount > 0 && (
              <span className={`w-4 h-4 text-[10px] font-black rounded-full flex items-center justify-center shadow-sm ${
                activeTab === 'achievements' ? 'bg-[#080B11] text-primary' : 'bg-primary text-[#080B11]'
              }`}>
                {claimableCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('perks');
            }}
            className={`flex-1 min-h-11 py-2.5 px-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-[0.96] flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'perks'
                ? 'bg-primary/10 text-primary shadow-none'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-card-hover'
            }`}
          >
            <Zap size={14} />
            <span>Skarbiec</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'achievements' && (
          <AchievementsSection
            userState={userState}
            completedTasks={completedTasks}
            onClaimTier={onClaimAchievement}
          />
        )}

        {activeTab === 'perks' && (
          <PerksVaultSection
            onOpenAchievements={() => setActiveTab('achievements')}
            userState={userState}
            onBuyItem={onBuyShopItem}
            onUseStreakFreeze={onUseStreakFreeze}
            onOpenBlikModal={onOpenBlikModal}
          />
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <section className="bg-surface-card border border-surface-border rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><User size={22} /></div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-text-primary break-words">{user ? (user.displayName || 'Uczeń') : 'Konto gościa'}</h2>
                  <p className="text-xs text-text-secondary mt-1">{user ? 'Postępy zapisane na koncie' : 'Postępy zapisane na tym urządzeniu'}</p>
                </div>
              </div>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 pt-5 mt-5 border-t border-surface-border">
                {[['Poziom', userState.level || 1], ['Zadania', totalSolvedCount], ['Passa (dni)', streakDays], ['Monety', userState.coins || 0]].map(([label, value]) => (
                  <div key={label} className="text-center"><dt className="text-xs text-text-secondary mb-2">{label}</dt><dd className="text-xl font-semibold tabular-nums text-text-primary">{value}</dd></div>
                ))}
              </dl>
            </section>

            {/* Wygląd aplikacji (Szybki Wybór: Ciemny / Jasny / System) */}
            {LIGHT_THEME_READY && (
            <div className="bg-surface-card border border-surface-border rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    {themeMode === 'light' ? <Sun size={18} /> : themeMode === 'dark' ? <Moon size={18} /> : <Monitor size={18} />}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-text-primary">Wygląd aplikacji</span>
                    <span className="text-xs text-text-secondary">
                      {themeMode === 'light'
                        ? 'Jasny'
                        : themeMode === 'dark'
                          ? 'Ciemny'
                          : 'Zgodny z ustawieniami urządzenia'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center bg-surface-bg border border-surface-border p-1 rounded-xl self-stretch sm:self-auto justify-between sm:justify-start shadow-inner">
                  {(
                    [
                      { id: 'dark' as ThemeMode, label: 'Ciemny', icon: Moon },
                      { id: 'light' as ThemeMode, label: 'Jasny', icon: Sun },
                      { id: 'system' as ThemeMode, label: 'System', icon: Monitor },
                    ] as const
                  ).map(item => {
                    const Icon = item.icon;
                    const isActive = themeMode === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setTheme(item.id);
                        }}
                        className={`relative min-h-11 flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors select-none cursor-pointer ${
                          isActive
                            ? 'text-text-primary font-black'
                            : 'text-text-muted hover:text-text-primary'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeThemePill"
                            className="absolute inset-0 rounded-lg bg-surface-card border border-primary/40 shadow-sm"
                            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                          <Icon size={14} className={isActive ? 'text-primary' : ''} />
                          <span>{item.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            )}

            {/* Dynamic Activity Chart (14 Dni Aktywności) */}
            <div className="bg-surface-card border border-surface-border rounded-2xl p-5 sm:p-6 overflow-hidden shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div><h2 className="text-base font-semibold text-text-primary">Historia nauki</h2><p className="text-xs text-text-secondary mt-1">Zadania z ostatnich 14 dni</p></div>
                <span className="text-sm text-text-secondary">Dzisiaj: <strong className="font-semibold text-text-primary">{todayActivityCount}</strong></span>
              </div>

              {/* 14-Day Bars Container */}
              <div className="flex items-end justify-between gap-1 sm:gap-1.5 h-28 pt-3 pb-1">
                {activityDays.map((d) => {
                  const hasTasks = d.count > 0;
                  const heightPct = hasTasks
                    ? Math.max(22, Math.min(100, Math.round((d.count / maxActivityCount) * 100)))
                    : 10;

                  return (
                    <div
                      key={d.dateStr}
                      className="flex-1 group flex flex-col items-center justify-end h-full relative cursor-pointer min-w-0"
                      title={`${d.date.toLocaleDateString('pl-PL')}: ${d.count} zadań`}
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 bg-surface-elevated text-text-primary text-[10px] font-bold py-0.5 px-1.5 rounded-md border border-surface-border pointer-events-none whitespace-nowrap z-20 shadow-lg">
                        {d.count} {d.count === 1 ? 'zadanie' : 'zadań'}
                      </div>

                      {hasTasks && (
                        <span className={`text-[10px] font-bold mb-1 leading-none ${d.isToday ? 'text-primary' : 'text-primary/80'}`}>
                          {d.count}
                        </span>
                      )}

                      {/* Bar / Point */}
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          hasTasks
                            ? d.isToday
                              ? 'bg-primary'
                              : 'bg-primary/70'
                            : 'bg-surface-border/40 group-hover:bg-surface-border/70'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />

                      {/* Day Label */}
                      <span className={`text-[10px] font-bold mt-1.5 leading-none truncate max-w-full ${d.isToday ? 'text-primary font-black' : 'text-text-muted'}`}>
                        {d.isToday ? 'Dziś' : d.dayName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Settings */}
            <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden shadow-sm">

              {onOpenDevHub && (
                <button
                  onClick={() => {
                    triggerHaptic('medium');
                    onOpenDevHub();
                  }}
                  className="w-full p-4 flex items-center gap-4 hover:bg-emerald-500/10 transition-colors border-b border-surface-border text-left cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30 group-hover:scale-105 transition-transform">
                    <Terminal size={18} />
                  </div>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        Panel Deweloperski (Super-Admin)
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                        {userState?.isDev ? '● AKTYWNY' : 'DEV'}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary truncate max-w-full">
                      Nielimitowane serca, PRO, 225 lekcji, 99 999 monet, teleport
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-text-muted group-hover:text-emerald-400 shrink-0 transition-colors" />
                </button>
              )}

              {(onUpdateUserState || onOpenOnboarding) && (
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    if (onUpdateUserState) { setGoalSaved(false); setEditingGoal(previous => !previous); }
                    else onOpenOnboarding?.();
                  }}
                  aria-expanded={editingGoal}
                  className="w-full p-4 flex items-center gap-4 hover:bg-surface-card-hover transition-colors border-b border-surface-border text-left cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <Target size={18} />
                  </div>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text-primary">Cel nauki</span>
                      <span className="text-[10px] bg-primary/15 text-primary font-bold px-2 py-0.5 rounded-full border border-primary/30">
                        {userState?.onboardingPreferences?.targetScore ? `${userState.onboardingPreferences.targetScore}%` : 'Ustaw'}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary truncate max-w-full">
                      {userState?.onboardingPreferences
                        ? `${userState.onboardingPreferences.targetExam === 'matura_2025' ? 'Nowa Formuła 2023' : userState.onboardingPreferences.targetExam === 'poprawka' ? 'Szybka Poprawka' : 'Egzamin Ósmoklasisty'} • ${userState.onboardingPreferences.dailyMinutes} min dziennie`
                        : 'Zmień cel maturalny i czas nauki'}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-text-muted shrink-0" />
                </button>
              )}

              {editingGoal && onUpdateUserState && <StudyGoalSettings value={userState.onboardingPreferences} onCancel={() => setEditingGoal(false)} onSave={preferences => {
                onUpdateUserState(previous => ({ ...previous, onboardingPreferences: preferences }));
                setEditingGoal(false);
                setGoalSaved(true);
                triggerHaptic('success');
              }} />}
              {goalSaved && <p role="status" className="px-4 py-3 text-sm text-emerald-400 border-b border-surface-border">Cel nauki zapisany.</p>}

              <button
                onClick={() => setActiveTab('achievements')}
                className="w-full p-4 flex items-center gap-4 hover:bg-surface-card-hover transition-colors border-b border-surface-border cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 border border-amber-500/20">
                  <Trophy size={18} />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-bold text-text-primary">Twoje odznaki</span>
                  <span className="text-xs text-text-secondary">Odbieraj nagrody za postępy</span>
                </div>
                <ChevronRight size={18} className="text-text-muted shrink-0" />
              </button>

              <button
                onClick={() => setActiveTab('perks')}
                className="w-full p-4 flex items-center gap-4 hover:bg-surface-card-hover transition-colors border-b border-surface-border cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 border border-purple-500/20">
                  <Zap size={18} />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-bold text-text-primary">Bonusy i nagrody</span>
                  <span className="text-xs text-text-secondary">Sprawdź dostępne bonusy</span>
                </div>
                <ChevronRight size={18} className="text-text-muted shrink-0" />
              </button>

              <button
                onClick={handleAuthAction}
                className="w-full p-4 flex items-center gap-4 hover:bg-surface-card-hover transition-colors cursor-pointer text-left"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${user ? 'bg-alert-crimson/10 text-alert-crimson' : 'bg-blue-500/10 text-blue-500'}`}>
                  {user ? <LogOut size={18} /> : <LogIn size={18} />}
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-bold text-text-primary">{user ? 'Wyloguj się' : 'Zaloguj się / Rejestracja'}</span>
                  <span className="text-xs text-text-secondary">{user ? 'Zakończ sesję' : 'Zapisz serię i postępy w chmurze'}</span>
                </div>
                <ChevronRight size={18} className="text-text-muted shrink-0" />
              </button>
            </div>

            {/* Brand Footer */}
            <div className="mt-8 pt-6 border-t border-surface-border flex flex-col items-center justify-center gap-2 opacity-75">
              <JasneLogo variant="horizontal" size={26} glow={false} />
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                Matura staje się prosta
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
