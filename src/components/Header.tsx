import { SubjectPicker } from './SubjectPicker';
import { subjectOption } from '../lib/subjects';
import { useState, useEffect } from 'react';
import { UserState, SubjectKey, SubjectId } from '../types';
import { User, Flame, Coins, Zap, X, Heart, Clock, Users, Sun, Moon, LayoutGrid, BookOpen, Edit3, Calculator, Terminal, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHaptic } from '../utils';
import { getSyncedHearts, refillHeartsWithCoins, HEARTS_REFILL_COIN_COST } from '../lib/heartsManager';
import { formatPromoSeconds } from '../services/promotionService';
import { useTheme, LIGHT_THEME_READY } from '../services/themeManager';
import { JasneLogo } from './ui/JasneLogo';

export interface HeaderProps {
  state: UserState;
  onProfileClick?: () => void;
  onLogoClick?: () => void;
  currentTab?: string;
  selectedSubjectKey?: SubjectKey;
  onSelectSubject?: (key: SubjectKey) => void;
  currentSubject?: SubjectId;
  onSelectSubjectId?: (subjectId: SubjectId) => void;
  onOpenLobby?: () => void;
  onOpenFormulas?: () => void;
  onOpenDictionary?: () => void;
  onOpenScratchpad?: () => void;
  onOpenParentSponsor?: () => void;
  onOpenProPopup?: () => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  isGuest?: boolean;
  onLoginClick?: () => void;
  guestPromoSecondsLeft?: number;
  onOpenGuestPromo?: () => void;
  onOpenDevHub?: () => void;
  onOpenBlikModal?: () => void;
}

export function Header({
  state,
  onProfileClick,
  onLogoClick,
  currentTab,
  selectedSubjectKey,
  onSelectSubject,
  currentSubject,
  onSelectSubjectId,
  onOpenLobby,
  onOpenFormulas,
  onOpenDictionary,
  onOpenScratchpad,
  onOpenParentSponsor,
  onOpenProPopup,
  onUpdateUserState,
  isGuest,
  onLoginClick,
  guestPromoSecondsLeft,
  onOpenGuestPromo,
  onOpenDevHub,
  onOpenBlikModal
}: HeaderProps) {
  const [showXpTooltip, setShowXpTooltip] = useState(false);
  const [showHeartsPopup, setShowHeartsPopup] = useState(false);
  useEffect(() => {
    if (!showHeartsPopup) return;
    const onPointer = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('#header-hearts-button, [data-hearts-panel]')) setShowHeartsPopup(false);
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setShowHeartsPopup(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [showHeartsPopup]);
  const { resolvedTheme, toggleTheme } = useTheme();
  const currentXpInLevel = state.xp % 1000;
  const xpPercent = Math.min(100, Math.max(0, (currentXpInLevel / 1000) * 100));

  const activeSubject = subjectOption(selectedSubjectKey, currentSubject);
  const heartsData = getSyncedHearts(state);

  const handleRefillCoins = () => {
    triggerHaptic('success');
    if (!onUpdateUserState) return;
    const result = refillHeartsWithCoins(state);
    if (result.success) {
      onUpdateUserState(() => result.updatedState);
      setShowHeartsPopup(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-bg/90 backdrop-blur-2xl border-b border-surface-border px-3 sm:px-6 min-h-14 sm:min-h-16 py-2 flex flex-wrap items-center justify-between gap-2 relative select-none">
      {/* LEWA STRONA: Klikalny Brand & Logo JASNE. (widoczny tylko na mobile/tablecie, na PC ukryty bo jest w stałym sidebarze) */}
      <button
        id="header-brand-logo"
        onClick={() => {
          triggerHaptic('medium');
          if (onLogoClick) onLogoClick();
        }}
        className="lg:hidden flex items-center gap-1 sm:gap-2 group cursor-pointer select-none active:scale-95 transition-all text-left py-1 px-1 -ml-1 rounded-xl hover:bg-white/[0.04] shrink-0"
        title="Przejdź do pulpitu głównego JASNE."
        aria-label="Pulpit główny JASNE."
      >
        <JasneLogo variant="icon" size={24} glow={true} className="group-hover:scale-105 transition-transform duration-200 shrink-0" />
        {/* Na wąskich telefonach samo logo-żarówka: napis nie mieści się obok przełącznika i liczników */}
        <div className="hidden min-[400px]:flex flex-col text-left min-w-0">
          <span className="text-xs sm:text-base font-black tracking-wider text-text-primary group-hover:text-primary transition-colors leading-none">
            JASNE<span className="text-primary">.</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-bold text-text-muted tracking-wider uppercase mt-0.5">
            Matura staje się prosta
          </span>
        </div>
      </button>

      {/* CENTRUM: Selektor przedmiotu + Przycisk Lobby */}
      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 w-full sm:w-auto order-last sm:order-none">
        <SubjectPicker value={activeSubject.key} onChange={key => {
          triggerHaptic('light');
          if (onSelectSubject) onSelectSubject(key);
          else onSelectSubjectId?.(subjectOption(key).id);
        }} />


        {/* Tablice Wzorów CKE - TYLKO DLA MATEMATYKI */}
        {(currentSubject === 'matematyka' || selectedSubjectKey === 'math' || (!currentSubject && !selectedSubjectKey)) && onOpenFormulas && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onOpenFormulas();
            }}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-secondary hover:text-primary text-[11px] font-bold transition-all cursor-pointer"
            title="Tablice Wzorów CKE (Matematyka)"
          >
            <BookOpen size={13} className="text-primary" />
            <span className="hidden 2xl:inline">Wzory</span>
          </button>
        )}

        {/* Słownik Maturalny CKE - TYLKO DLA ANGIELSKIEGO */}
        {(currentSubject === 'angielski' || selectedSubjectKey === 'eng') && onOpenDictionary && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onOpenDictionary();
            }}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-secondary hover:text-primary text-[11px] font-bold transition-all cursor-pointer"
            title="Oficjalny Słownik Maturalny CKE (Język Angielski)"
          >
            <BookOpen size={13} className="text-primary" />
            <span className="hidden 2xl:inline">Słownik</span>
          </button>
        )}

        {/* Brudnopis */}
        {onOpenScratchpad && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onOpenScratchpad();
            }}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-secondary hover:text-primary text-[11px] font-bold transition-all cursor-pointer"
            title="Otwórz brudnopis"
          >
            <Edit3 size={13} className="text-primary" />
            <span className="hidden 2xl:inline">Brudnopis</span>
          </button>
        )}
      </div>

      {/* Spacer na desktopie */}
      <div className="hidden 2xl:block w-4" />

      {/* PRAWA STRONA: Skarbiec i Profil gracza */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        <div className="header-resources" aria-label="Serca, passa i monety">
        {/* Wskaźnik Serc (Desktop >= 640px) */}
        <div className="contents">
          <button
            id="header-hearts-button"
            onClick={() => {
              triggerHaptic('light');
              setShowHeartsPopup(prev => !prev);
            }}
            className="header-resource"
            aria-expanded={showHeartsPopup}
            aria-label={heartsData.isPro ? 'Serca: bez limitu' : `Serca: ${heartsData.hearts} z ${heartsData.maxHearts}`}
            title={heartsData.isPro ? 'Pakiet PRO: Nielimitowane serca' : `Serca: ${heartsData.hearts}/${heartsData.maxHearts}`}
          >
            <Heart size={16} className={heartsData.hearts > 0 ? "text-rose-500 fill-rose-500" : "text-rose-500"} />
            <span className="text-text-primary text-sm font-semibold leading-none tabular-nums">
              {heartsData.isPro ? '∞' : heartsData.hearts}
            </span>
          </button>

          {/* Hearts Popover */}
          <AnimatePresence>
            {showHeartsPopup && (
              <>
                <motion.div
                  data-hearts-panel
                  role="dialog"
                  aria-label="Twoje serca"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-3 sm:right-6 mt-2 z-50 w-[min(20rem,calc(100vw-1.5rem))] bg-surface-elevated border border-surface-border rounded-2xl p-4 shadow-2xl text-left"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                    <div className="flex items-center gap-1.5">
                      <Heart size={16} className="text-rose-500 fill-rose-500" />
                      <span className="font-bold text-sm text-text-primary">Twoje serca</span>
                    </div>
                    <span className="font-sans text-xs font-bold text-rose-400">
                      {heartsData.isPro ? 'Nielimitowane' : `${heartsData.hearts} / ${heartsData.maxHearts}`}
                    </span>
                  </div>

                  {/* Serca ikony */}
                  <div className="flex items-center justify-center gap-2 py-3">
                    {Array.from({ length: heartsData.maxHearts }).map((_, idx) => {
                      const hasHeart = idx < heartsData.hearts || heartsData.isPro;
                      return (
                        <Heart
                          key={idx}
                          size={22}
                          className={hasHeart ? "text-rose-500 fill-rose-500 drop-shadow-none" : "text-slate-700"}
                        />
                      );
                    })}
                  </div>

                  {/* Status regeneracji */}
                  {!heartsData.isPro && heartsData.hearts < heartsData.maxHearts && (
                    <div className="bg-surface-card border border-surface-border rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <Clock size={13} className="text-primary" />
                        <span>Kolejne serce za:</span>
                      </div>
                      <span className="font-sans font-bold text-primary">{heartsData.formattedTime}</span>
                    </div>
                  )}

                  {heartsData.isPro && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 mb-3 text-center">
                      <span className="text-xs font-bold text-amber-300">
                        Pakiet PRO aktywny – brak limitu serc
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    {/* Odnów za monety */}
                    {!heartsData.isPro && heartsData.hearts < heartsData.maxHearts && (
                      <button
                        onClick={handleRefillCoins}
                        disabled={state.coins < HEARTS_REFILL_COIN_COST}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                          state.coins >= HEARTS_REFILL_COIN_COST
                            ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 cursor-pointer'
                            : 'bg-white/5 border border-white/5 text-slate-500 cursor-not-allowed opacity-75'
                        }`}
                      >
                        <span>Uzupełnij do pełna</span>
                        <span className="flex items-center gap-1 font-sans text-amber-300">
                          <Coins size={12} /> {HEARTS_REFILL_COIN_COST}
                        </span>
                      </button>
                    )}

                    {/* Poproś rodzica o PRO */}
                    {!heartsData.isPro && onOpenParentSponsor && (
                      <button
                        onClick={() => {
                          setShowHeartsPopup(false);
                          onOpenParentSponsor();
                        }}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-[#FF8800] to-[#FFB800] hover:brightness-110 text-slate-950 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
                      >
                        <Users size={14} className="fill-slate-950" />
                        <span>Poproś rodzica o PRO (BLIK)</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Wskaźnik 1: Płomień Passy (Desktop >= 640px) */}
        <button
          onClick={() => {
            triggerHaptic('light');
            if (onProfileClick) onProfileClick();
          }}
          className="header-resource"
          aria-label={`Passa: ${state.streakDays || 0} ${state.streakDays === 1 ? 'dzień' : 'dni'}`}
          title={`Aktualna seria: ${state.streakDays || 0} ${state.streakDays === 1 ? 'dzień' : 'dni'} z rzędu`}
        >
          <Flame size={16} className="text-orange-400" />
          <span className="text-text-primary text-sm font-semibold leading-none tabular-nums">
            {state.streakDays || 0}
          </span>
        </button>

        {/* Wskaźnik 2: Główne Monety (Desktop >= 640px) */}
        <button
          type="button"
          onClick={() => {
            if (onOpenBlikModal) {
              triggerHaptic('light');
              onOpenBlikModal();
            }
          }}
          className="header-resource"
          aria-label={`Monety: ${state.coins.toLocaleString('pl-PL')}`}
          title={`Monety: ${state.coins} • Kliknij, aby doładować`}
        >
          <Coins size={16} className="text-primary" />
          <span className="text-text-primary text-sm font-semibold leading-none tabular-nums">
            {state.coins.toLocaleString('pl-PL')}
          </span>
        </button>

        </div>

        {/* Wskaźnik Gościa (widoczny tylko na desktopie, gdy jest dużo miejsca) */}
        {isGuest && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              onLoginClick?.();
            }}
            className="hidden 2xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Kliknij, aby się zalogować i zapisać postępy w chmurze"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
            <span>Konto Gościa • Zaloguj się</span>
          </button>
        )}

        {/* Przełącznik Motywu (Szybki 1-tap na desktopie, na mobile w profilu) */}
        {LIGHT_THEME_READY && (
        <button
          id="header-theme-toggle"
          type="button"
          onClick={() => {
            triggerHaptic('light');
            toggleTheme();
          }}
          className="hidden sm:flex min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-muted hover:text-primary transition-all duration-150 active:scale-90 cursor-pointer shadow-sm items-center justify-center shrink-0"
          title={resolvedTheme === 'dark' ? 'Przełącz na motyw jasny (Solar Luminary)' : 'Przełącz na motyw ciemny (Nocturne Luminary)'}
          aria-label={resolvedTheme === 'dark' ? 'Przełącz na motyw jasny' : 'Przełącz na motyw ciemny'}
        >
          {resolvedTheme === 'dark' ? (
            <Sun size={15} className="text-amber-400 hover:rotate-45 transition-transform duration-200" />
          ) : (
            <Moon size={15} className="text-amber-600 hover:-rotate-12 transition-transform duration-200" />
          )}
        </button>
        )}

        {/* Wskaźnik 3: Profil & Poziom Gracza */}
        <button
          id="header-profile-button"
          onClick={() => {
            triggerHaptic('light');
            if (onProfileClick) onProfileClick();
          }}


          className="min-h-11 min-w-11 justify-center flex items-center gap-2 p-2 sm:pr-3 rounded-xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 transition-all duration-150 active:scale-95 cursor-pointer group shadow-sm shrink-0"
          title="Twój profil i postęp XP"
        >
          {/* Avatar z subtelnym bursztynowym obwodem */}
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#FFB800] to-[#D97706] p-[1.5px] shadow-none shrink-0">
            <div className="w-full h-full bg-surface-card rounded-full flex items-center justify-center">
              <User size={12} className="text-primary sm:w-[13px] sm:h-[13px]" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-display font-black text-[11px] sm:text-xs text-text-primary leading-tight group-hover:text-primary transition-colors tabular-nums font-sans">
              Poziom {state.level}
            </span>
            <span className="text-[10px] font-bold text-text-muted leading-tight tabular-nums font-sans">
              {currentXpInLevel} XP
            </span>
          </div>
        </button>

        {/* Przycisk Panelu Deweloperskiego (DEV) */}
        {onOpenDevHub && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              onOpenDevHub();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-[10px] sm:text-xs font-black shadow-none transition-all cursor-pointer active:scale-95 shrink-0"
            title="Panel Deweloperski (Pełny Dostęp do Wszystkich Zasobów)"
            aria-label="Panel Deweloperski"
          >
            <Terminal size={11} className="text-emerald-400 animate-pulse sm:w-[13px] sm:h-[13px]" />
            <span className="font-sans tracking-wider font-black">DEV</span>
          </button>
        )}
      </div>

    </header>
  );
}
