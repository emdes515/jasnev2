import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Flame,
  Heart,
  LineChart,
  ListChecks,
  Lightbulb,
  Timer,
  X,
} from 'lucide-react';
import type { SubjectKey } from '../types';
import { triggerHaptic, playSuccessSound } from '../utils';
import { SUBJECT_OPTIONS, subjectOption } from '../lib/subjects';
import { onboardingDemoFor } from '../data/onboardingDemo';
import { JasneLogo } from './ui/JasneLogo';

export interface OnboardingPreferences {
  targetExam: 'matura_2025' | 'poprawka' | 'e8';
  targetScore: '30' | '70' | '100';
  dailyMinutes: 5 | 10 | 15;
}

/** Cel i czas nauki można zmienić w profilu; onboarding już o nie nie pyta. */
export const DEFAULT_ONBOARDING_PREFERENCES: OnboardingPreferences = {
  targetExam: 'matura_2025',
  targetScore: '70',
  dailyMinutes: 10,
};

interface OnboardingOverlayProps {
  onClose: () => void;
  onNavigate?: (tab: 'nauka' | 'dashboard' | 'arena' | 'profile' | 'simulator') => void;
  /** solvedDemoTask: czy uczeń rozwiązał zadanie próbne (tylko wtedy należy się XP i dzień serii). */
  onComplete?: (prefs: OnboardingPreferences, shouldOpenAuth?: boolean, solvedDemoTask?: boolean, subjectKey?: SubjectKey) => void;
  onOpenAuthModal?: () => void;
  hasProgress?: boolean;
  onLogin?: () => void;
}

type Step = 'welcome' | 'subject' | 'try' | 'showcase' | 'done';
const STEPS: Step[] = ['welcome', 'subject', 'try', 'showcase', 'done'];

const VALUE_POINTS = [
  { icon: Timer, text: 'Lekcje po 4–6 minut, jeden temat naraz' },
  { icon: Lightbulb, text: 'Po błędzie widzisz pułapkę, a nie tylko wynik' },
  { icon: LineChart, text: 'Prognoza wyniku z Twoich rozwiązanych zadań' },
];

const SHOWCASE = [
  {
    id: 'lesson',
    icon: ListChecks,
    title: 'Pełna lekcja albo same zadania',
    text: 'Zaczynasz od krótkiej pigułki albo od razu od zadań. Teorię otworzysz w trakcie i wrócisz do tego samego zadania.',
  },
  {
    id: 'trap',
    icon: Lightbulb,
    title: 'Wiesz, dlaczego się pomyliłeś',
    text: 'Po błędzie dostajesz pułapkę, w którą wpadłeś. Trudne zadania wracają później jako powtórki.',
  },
  {
    id: 'forecast',
    icon: LineChart,
    title: 'Prognoza wyniku',
    text: 'Liczymy ją z zadań, które rozwiązałeś. To szacunek, a nie gwarancja, i staje się dokładniejszy z każdym dniem nauki.',
  },
  {
    id: 'streak',
    icon: Flame,
    title: 'Seria i serca',
    text: 'Jedno zadanie dziennie podtrzymuje serię. Serca odnawiają się same, więc pomyłka nie blokuje nauki.',
  },
] as const;

function ShowcaseMock({ id }: { id: (typeof SHOWCASE)[number]['id'] }) {
  const card = 'rounded-xl border border-surface-border bg-surface-bg p-3';
  if (id === 'lesson') {
    return (
      <div className={card} aria-hidden="true">
        <p className="text-sm font-semibold text-text-primary">Procenty i punkty procentowe</p>
        <p className="mt-0.5 text-xs text-text-secondary">około 5 minut</p>
        <div className="mt-3 flex gap-2">
          <span className="flex-1 rounded-lg bg-primary py-2 text-center text-xs font-semibold text-[#080B11]">Pełna lekcja</span>
          <span className="flex-1 rounded-lg border border-surface-border py-2 text-center text-xs font-semibold text-text-primary">Same zadania</span>
        </div>
      </div>
    );
  }
  if (id === 'trap') {
    return (
      <div className={`${card} space-y-2`} aria-hidden="true">
        <p className="rounded-lg border border-alert-crimson/40 bg-alert-crimson/10 px-2.5 py-1.5 text-xs text-text-primary">Jest niższa o 20%</p>
        <p className="rounded-lg border border-surface-border px-2.5 py-2 text-xs leading-relaxed text-text-secondary">
          <span className="font-semibold text-primary">Pułapka: </span>drugie 20% liczysz od ceny po podwyżce.
        </p>
      </div>
    );
  }
  if (id === 'forecast') {
    return (
      <div className={`${card} flex items-center gap-4`} aria-hidden="true">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-primary/70 text-lg font-bold text-text-primary">58%</div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Szacowany wynik</p>
          <p className="text-xs text-text-secondary">na podstawie 24 zadań</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`${card} flex items-center justify-between`} aria-hidden="true">
      <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
        <Flame size={20} className="text-streak-flame" /> Dzień 1
      </span>
      <span className="flex items-center gap-1 text-alert-crimson">
        {[0, 1, 2, 3, 4].map(i => <Heart key={i} size={16} className="fill-current" />)}
      </span>
    </div>
  );
}

export function OnboardingOverlay({ onClose, onNavigate, onComplete, onOpenAuthModal, onLogin }: OnboardingOverlayProps) {
  const reduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  const [subjectKey, setSubjectKey] = useState<SubjectKey>('math');
  const demo = onboardingDemoFor(subjectKey);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [slide, setSlide] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const wrongPick = pickedId !== null && pickedId !== demo.correctId;

  // Po zmianie ekranu fokus trafia na nagłówek (czytniki ekranu i klawiatura).
  useEffect(() => { titleRef.current?.focus(); }, [stepIndex]);

  const go = (delta: number) => {
    triggerHaptic('light');
    setStepIndex(i => Math.max(0, Math.min(STEPS.length - 1, i + delta)));
  };

  const finish = (openAuth: boolean) => {
    triggerHaptic('medium');
    if (onComplete) {
      onComplete(DEFAULT_ONBOARDING_PREFERENCES, openAuth, solved, subjectKey);
      return;
    }
    onClose();
    if (openAuth && (onOpenAuthModal || onLogin)) (onOpenAuthModal || onLogin)?.();
    else onNavigate?.('dashboard');
  };

  const chooseSubject = (key: SubjectKey) => {
    triggerHaptic('light');
    setSubjectKey(key);
    setPickedId(null);
    setSolved(false);
  };

  const pickAnswer = (id: string) => {
    if (solved) return;
    setPickedId(id);
    if (id === demo.correctId) {
      setSolved(true);
      triggerHaptic('success');
      playSuccessSound();
      if (!reduceMotion) confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      triggerHaptic('warning');
    }
  };

  const onSlidesScroll = () => {
    const el = slidesRef.current;
    if (el && el.clientWidth > 0) setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goToSlide = (index: number) => {
    const el = slidesRef.current;
    if (el) el.scrollTo({ left: index * el.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    setSlide(index);
  };

  const subject = subjectOption(subjectKey);
  const primary = 'w-full min-h-12 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-[#080B11] transition hover:bg-primary-hover active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const ghost = 'min-h-11 px-3 text-sm font-medium text-text-secondary underline decoration-surface-border underline-offset-4 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary';

  const slideMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <section
      id="onboarding-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Start z JASNE"
      className="focus-screen fixed inset-0 z-[100] flex flex-col overflow-hidden bg-surface-bg font-sans text-text-primary"
    >
      <header className="shrink-0 border-b border-surface-border">
        <div className="mx-auto flex w-full max-w-md items-center justify-between gap-2 px-3 py-2">
          {step === 'welcome' ? (
            <span className="flex min-h-11 shrink-0 items-center gap-2 pl-1">
              <JasneLogo variant="icon" size={24} glow={false} />
              <span className="text-sm font-semibold tracking-wide">JASNE<span className="text-primary">.</span></span>
            </span>
          ) : (
            <button type="button" onClick={() => go(-1)} aria-label="Wróć do poprzedniego kroku" className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-text-secondary hover:bg-surface-card-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary">
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
          )}
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={stepIndex + 1} aria-label={`Krok ${stepIndex + 1} z ${STEPS.length}`}>
            {STEPS.map((s, i) => (
              <span key={s} className={`h-1.5 w-8 min-w-2 shrink rounded-full transition-colors ${i <= stepIndex ? 'bg-primary' : 'bg-surface-border'}`} />
            ))}
          </div>
          {step !== 'done' ? (
            <button type="button" onClick={() => finish(false)} className="flex min-h-11 shrink-0 items-center gap-1 rounded-xl px-3 text-sm font-medium text-text-secondary hover:bg-surface-card-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary">
              Pomiń <X size={14} aria-hidden="true" />
            </button>
          ) : <span className="w-11" />}
        </div>
      </header>

      <main className="focus-scroll flex-1 px-4">
        <div className="mx-auto w-full max-w-md py-6">
          <AnimatePresence mode="wait">
            <motion.div key={step} {...slideMotion} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
              {step === 'welcome' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h1 ref={titleRef} tabIndex={-1} className="text-3xl font-bold leading-tight outline-none">Matura w 5 minut dziennie</h1>
                    <p className="text-base leading-relaxed text-text-secondary">Rozwiąż pierwsze zadanie w pół minuty. Bez rejestracji i bez ankiety.</p>
                  </div>
                  <ul className="space-y-2.5">
                    {VALUE_POINTS.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card px-3.5 py-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary"><Icon size={18} aria-hidden="true" /></span>
                        <span className="text-sm leading-snug">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step === 'subject' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-bold leading-tight outline-none">Czego się dziś uczysz?</h2>
                    <p className="text-sm text-text-secondary">Przedmiot i poziom możesz zmienić w każdej chwili w nagłówku.</p>
                  </div>
                  <div role="radiogroup" aria-label="Przedmiot i poziom" className="space-y-2">
                    {SUBJECT_OPTIONS.map(option => {
                      const Icon = option.icon;
                      const selected = option.key === subjectKey;
                      return (
                        <button
                          key={option.key}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          aria-label={`${option.name}, ${option.level}`}
                          onClick={() => chooseSubject(option.key)}
                          className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition focus-visible:outline-2 focus-visible:outline-primary ${selected ? 'border-primary bg-primary/10' : 'border-surface-border bg-surface-card hover:bg-surface-card-hover'}`}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-bg text-primary"><Icon size={18} aria-hidden="true" /></span>
                          <span className="flex-1 font-medium">{option.name}<span className="block text-xs font-normal text-text-secondary">{option.level}</span></span>
                          {selected && <Check size={18} className="shrink-0 text-primary" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 'try' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-bold leading-tight outline-none">Spróbuj jednego zadania</h2>
                    <p className="text-sm text-text-secondary">{subject.name}, {subject.level.toLowerCase()}. Tak wygląda codzienna nauka.</p>
                  </div>
                  <div className="space-y-4 rounded-2xl border border-surface-border bg-surface-card p-4">
                    <p className="text-base font-medium leading-relaxed">{demo.prompt}</p>
                    {demo.hint && <p className="text-sm text-text-secondary">{demo.hint}</p>}
                    <div className="space-y-2" role="group" aria-label="Odpowiedzi">
                      {demo.options.map((option, i) => {
                        const picked = pickedId === option.id;
                        const correct = solved && option.id === demo.correctId;
                        const wrong = picked && option.id !== demo.correctId;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            disabled={solved && !correct}
                            onClick={() => pickAnswer(option.id)}
                            aria-label={`${String.fromCharCode(65 + i)}. ${option.text}`}
                            className={`flex min-h-12 w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-primary ${correct ? 'border-emerald-500/60 bg-emerald-500/10' : wrong ? 'border-alert-crimson/60 bg-alert-crimson/10' : 'border-surface-border bg-surface-bg hover:bg-surface-card-hover disabled:opacity-60'}`}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-surface-border text-xs font-semibold" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                            <span className="flex-1">{option.text}</span>
                            {correct && <Check size={18} className="shrink-0 text-emerald-400" aria-hidden="true" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div role="status" aria-live="polite">
                    {wrongPick && (
                      <div className="rounded-xl border border-alert-crimson/40 bg-alert-crimson/10 p-3.5 text-sm leading-relaxed">
                        <p className="font-semibold">Pułapka</p>
                        <p className="mt-1 text-text-secondary">{demo.trap}</p>
                        <p className="mt-2 text-text-secondary">Spróbuj jeszcze raz.</p>
                      </div>
                    )}
                    {solved && (
                      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-sm leading-relaxed">
                        <p className="flex items-center gap-2 font-semibold"><Check size={16} aria-hidden="true" /> Dobrze. +15 XP</p>
                        <p className="mt-1 text-text-secondary">{demo.why}</p>
                        <p className="mt-2 text-text-secondary"><span className="font-semibold text-text-primary">Na co uważać: </span>{demo.trap}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 'showcase' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-bold leading-tight outline-none">Co jeszcze tu masz</h2>
                    <p className="text-sm text-text-secondary">Przesuń, żeby zobaczyć cztery rzeczy, które robią różnicę.</p>
                  </div>
                  <div
                    ref={slidesRef}
                    onScroll={onSlidesScroll}
                    className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    role="region"
                    aria-label="Funkcje aplikacji"
                    tabIndex={0}
                  >
                    {SHOWCASE.map(({ id, icon: Icon, title, text }, i) => (
                      <article key={id} className="mr-3 w-full shrink-0 snap-center space-y-3 rounded-2xl border border-surface-border bg-surface-card p-4" aria-label={`${i + 1} z ${SHOWCASE.length}: ${title}`}>
                        <ShowcaseMock id={id} />
                        <p className="text-xs text-text-secondary">Przykładowy podgląd</p>
                        <h3 className="flex items-center gap-2 text-base font-semibold"><Icon size={18} className="text-primary" aria-hidden="true" />{title}</h3>
                        <p className="text-sm leading-relaxed text-text-secondary">{text}</p>
                      </article>
                    ))}
                  </div>
                  <div className="flex justify-center gap-1" role="group" aria-label="Wybierz kartę">
                    {SHOWCASE.map((s, i) => (
                      <button key={s.id} type="button" onClick={() => goToSlide(i)} aria-label={`Pokaż kartę ${i + 1}: ${s.title}`} aria-current={slide === i} className="flex h-11 w-8 items-center justify-center focus-visible:outline-2 focus-visible:outline-primary">
                        <span className={`h-2 rounded-full transition-all ${slide === i ? 'w-5 bg-primary' : 'w-2 bg-surface-border'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'done' && (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-streak-flame/15 text-streak-flame">
                    <Flame size={44} aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-bold leading-tight outline-none">
                      {solved ? 'Dzień 1 serii' : 'Wszystko gotowe'}
                    </h2>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {solved ? 'Masz pierwsze 15 XP i pierwszy dzień serii. ' : ''}
                      Pierwsza lekcja z przedmiotu {subject.name.toLowerCase()} ({subject.level.toLowerCase()}) czeka na mapie nauki.
                    </p>
                  </div>
                  <div className="rounded-xl border border-surface-border bg-surface-card p-3.5 text-left text-sm leading-relaxed text-text-secondary">
                    <p className="flex items-start gap-2"><Compass size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                      <span>Konto nie jest potrzebne. Jeśli je utworzysz, zachowasz postęp i serię także na innym urządzeniu.</span></p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="focus-footer shrink-0 border-t border-surface-border bg-surface-bg">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-1 px-4 pb-3 pt-3">
          {step === 'welcome' && (
            <>
              <button type="button" id="onboarding-start-button" onClick={() => go(1)} className={primary}>Zaczynam <ArrowRight size={18} aria-hidden="true" /></button>
              {onLogin && <button type="button" onClick={onLogin} className={ghost}>Mam już konto</button>}
            </>
          )}
          {step === 'subject' && (
            <button type="button" onClick={() => go(1)} className={primary}>Dalej <ArrowRight size={18} aria-hidden="true" /></button>
          )}
          {step === 'try' && (
            <>
              <button type="button" disabled={!solved} onClick={() => go(1)} className={primary}>Dalej <ArrowRight size={18} aria-hidden="true" /></button>
              {!solved && <button type="button" onClick={() => go(1)} className={ghost}>Pomiń zadanie</button>}
            </>
          )}
          {step === 'showcase' && (
            <button type="button" onClick={() => go(1)} className={primary}>Dalej <ArrowRight size={18} aria-hidden="true" /></button>
          )}
          {step === 'done' && (
            <>
              <button type="button" id="onboarding-guest-continue-button" onClick={() => finish(false)} className={primary}>Zaczynam naukę <ArrowRight size={18} aria-hidden="true" /></button>
              <button type="button" id="onboarding-save-progress-button" onClick={() => finish(true)} className={ghost}>Zapisz postęp kontem</button>
            </>
          )}
        </div>
      </footer>
    </section>
  );
}

export default OnboardingOverlay;
