import { useRef, useState } from 'react';
import { Shield, ShieldCheck, Zap, Crown, Coins, ShoppingBag, Check, AlertCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARENA_ENABLED } from '../config/features';
import { UserState } from '../types';
import { SHOP_ITEMS, ShopItem } from '../data/achievements';
import { triggerHaptic } from '../utils';
import { RewardButton, RewardStatus, formatQuantity } from './rewards/RewardsUI';

interface PerksVaultSectionProps {
  userState: UserState;
  onBuyItem: (item: ShopItem, currency: 'tokens' | 'coins') => boolean | Promise<boolean>;
  onUseStreakFreeze?: () => void;
  onOpenBlikModal?: () => void;
  onOpenAchievements?: () => void;
}

export function PerksVaultSection({ userState, onBuyItem, onUseStreakFreeze, onOpenBlikModal, onOpenAchievements }: PerksVaultSectionProps) {
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [pending, setPending] = useState(false);
  const purchasing = useRef(false);
  const marketRef = useRef<HTMLElement>(null);
  const perks = userState.perks;
  const tokens = userState.masteryTokens || 0, coins = userState.coins || 0;
  const freezes = perks?.streakFreezes || 0, boosts = perks?.temporaryXpBoostCharges || 0, shields = perks?.arenaShields || 0;
  const scrollToMarket = () => {
    triggerHaptic('light');
    marketRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    marketRef.current?.focus({ preventScroll: true });
  };
  const purchase = async (item: ShopItem, currency: 'tokens' | 'coins') => {
    if (purchasing.current) return;
    setMessage(null);
    if (item.effectType === 'coinBooster') return;
    const limitReached = item.effectType === 'streakFreeze' && freezes >= 2 || item.effectType === 'arenaShield' && shields >= 3;
    if (limitReached) { setMessage({ text: 'Masz już maksymalną liczbę tych bonusów.', error: true }); return; }
    purchasing.current = true;
    setPending(true);
    try {
      if (await onBuyItem(item, currency)) {
        triggerHaptic('success');
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
        setMessage({ text: `Kupiono: ${item.name}.`, error: false });
      } else {
        triggerHaptic('error');
        setMessage({ text: 'Nie udało się kupić bonusu. Sprawdź saldo i spróbuj ponownie.', error: true });
      }
    } catch {
      setMessage({ text: 'Nie udało się kupić bonusu. Spróbuj ponownie.', error: true });
    } finally {
      purchasing.current = false;
      setPending(false);
    }
  };
  const bonuses = [
    { Icon: Shield, name: 'Ochrona serii', count: freezes, description: 'Zachowuje passę po dniu bez nauki. Możesz mieć maksymalnie 2 sztuki.' },
    { Icon: Zap, name: 'Podwójne XP', count: boosts, description: 'Podwaja XP z następnej ukończonej lekcji. Jeden bonus wystarcza na jedną sesję.' },
    ...(ARENA_ENABLED ? [{ Icon: ShieldCheck, name: 'Ochrona rankingu Areny', count: shields, description: 'Chroni przed utratą punktów ELO po przegranym pojedynku.' }] : [])
  ];
  const permanent = [
    perks?.xpBoostPercent ? `XP: +${perks.xpBoostPercent}%` : '',
    perks?.coinBoostPercent ? `Monety: +${perks.coinBoostPercent}%` : '',
    ARENA_ENABLED && perks?.arenaTokenBonusPercent ? `Żetony Areny: +${perks.arenaTokenBonusPercent}%` : ''
  ].filter(Boolean);

  return <div className="space-y-6">
    <section className="reward-panel" aria-labelledby="vault-balance-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="vault-balance-title" className="reward-heading">Twoje środki</h2>
        {onOpenBlikModal && <RewardButton onClick={onOpenBlikModal}>Doładuj monety przez BLIK</RewardButton>}
      </div>
      <dl className="grid grid-cols-2 gap-4 border-t border-surface-border mt-4 pt-4">
        <div><dt className="flex items-center gap-2 text-sm text-text-secondary"><Coins size={16} className="text-primary" />Monety</dt><dd className="text-2xl font-semibold text-text-primary tabular-nums mt-2">{coins.toLocaleString('pl-PL')}</dd><p className="text-xs text-text-secondary mt-1">Z zadań i nagród</p></div>
        <div><dt className="flex items-center gap-2 text-sm text-text-secondary"><Crown size={16} className="text-primary" />Żetony</dt><dd className="text-2xl font-semibold text-text-primary tabular-nums mt-2">{tokens.toLocaleString('pl-PL')}</dd><p className="text-xs text-text-secondary mt-1">Z odznak</p></div>
      </dl>
    </section>
    <section aria-labelledby="vault-inventory-title">
      <h2 id="vault-inventory-title" className="reward-heading mb-3">Twoje bonusy</h2>
      <div className="reward-panel divide-y divide-surface-border !py-0">
        {bonuses.map(({ Icon, name, count, description }) => <div key={name} className="py-5">
          <div className="flex items-start gap-3">
            <span className="reward-icon"><Icon size={20} aria-hidden="true" /></span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap justify-between gap-2"><h3 className="reward-heading">{name}</h3><RewardStatus tone={count ? 'complete' : 'neutral'}>W zapasie: {count}</RewardStatus></div>
              <p className="text-sm leading-relaxed text-text-secondary mt-2">{description}</p>
              {name === 'Ochrona serii' && count > 0 && userState.campusRust > 0 && onUseStreakFreeze
                ? <RewardButton onClick={onUseStreakFreeze} className="mt-3">Użyj ochrony i odśwież materiał</RewardButton>
                : count === 0 ? <RewardButton onClick={scrollToMarket} className="mt-3">Przejdź do sklepu<ArrowRight size={15} /></RewardButton>
                : <p className="text-xs text-text-secondary mt-3">{name === 'Podwójne XP' ? 'Włączy się automatycznie przy kolejnej sesji.' : 'Ochrona działa automatycznie.'}</p>}
            </div>
          </div>
        </div>)}
      </div>
    </section>
    <section className="reward-panel" aria-labelledby="vault-premiums-title">
      <h2 id="vault-premiums-title" className="reward-heading">Stałe premie z odznak</h2>
      <p className="text-sm leading-relaxed text-text-secondary mt-2">{permanent.length ? permanent.join(' · ') : 'Nie masz jeszcze stałych premii.'}</p>
      {onOpenAchievements && <RewardButton onClick={onOpenAchievements} className="mt-4">Zobacz odznaki<ArrowRight size={15} /></RewardButton>}
    </section>
    <section id="perks-market-section" ref={marketRef} tabIndex={-1} className="scroll-mt-36 outline-none" aria-labelledby="vault-shop-title">
      <div className="flex items-center gap-2 mb-2"><ShoppingBag size={18} className="text-primary" /><h2 id="vault-shop-title" className="reward-heading">Sklep z bonusami</h2></div>
      <p className="text-sm text-text-secondary mb-4">Każdy bonus możesz kupić za monety albo żetony.</p>
      {message && <div role={message.error ? 'alert' : 'status'} className={`flex items-start gap-2 mb-4 p-4 rounded-xl text-sm ${message.error ? 'bg-rose-500/10 text-rose-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
        {message.error ? <AlertCircle size={18} className="shrink-0" /> : <Check size={18} className="shrink-0" />}{message.text}
      </div>}
      <div className="space-y-4">
        {SHOP_ITEMS.filter(item => ARENA_ENABLED || item.effectType !== 'arenaShield').map(item => {
          const unavailable = item.effectType === 'coinBooster';
          const atLimit = item.effectType === 'streakFreeze' && freezes >= 2 || item.effectType === 'arenaShield' && shields >= 3;
          const canTokens = tokens >= item.tokenPrice, canCoins = coins >= item.coinPrice;
          const Icon = item.icon === 'Shield' ? Shield : item.icon === 'ShieldCheck' ? ShieldCheck : item.icon === 'Zap' ? Zap : Crown;
          const reasonId = `shop-reason-${item.id}`;
          return <article key={item.id} className="reward-panel" aria-labelledby={`shop-title-${item.id}`}>
            <div className="flex items-start gap-3"><span className="reward-icon"><Icon size={20} /></span><div className="flex-1 min-w-0">
              <h3 id={`shop-title-${item.id}`} className="reward-heading">{item.name}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mt-1">{item.description}</p>
            </div></div>
            {unavailable ? <div className="mt-4"><RewardStatus>W przygotowaniu</RewardStatus><p id={reasonId} className="text-sm text-text-secondary mt-2">Zakup będzie dostępny po uruchomieniu tej funkcji.</p></div>
              : <>
                <p className="text-xs text-text-secondary mt-5 mb-2">{atLimit ? 'Osiągnięto limit w zapasie.' : 'Kup za:'}</p>
                <div className="grid grid-cols-2 gap-3">
                  <RewardButton onClick={() => purchase(item, 'tokens')} disabled={pending || atLimit || !canTokens} aria-label={`Kup ${item.name} za ${formatQuantity(item.tokenPrice, ['żeton', 'żetony', 'żetonów'])}`} aria-describedby={reasonId}><Crown size={16} className="shrink-0" />{formatQuantity(item.tokenPrice, ['żeton', 'żetony', 'żetonów'])}</RewardButton>
                  <RewardButton onClick={() => purchase(item, 'coins')} disabled={pending || atLimit || !canCoins} aria-label={`Kup ${item.name} za ${formatQuantity(item.coinPrice, ['monetę', 'monety', 'monet'])}`} aria-describedby={reasonId}><Coins size={16} className="shrink-0" />{formatQuantity(item.coinPrice, ['moneta', 'monety', 'monet'])}</RewardButton>
                </div>
                <p id={reasonId} className="text-xs text-text-secondary leading-relaxed mt-3">{atLimit ? 'Zużyj posiadany bonus, aby kupić kolejny.' : !canTokens && !canCoins ? `Brakuje ${formatQuantity(item.tokenPrice - tokens, ['żetonu', 'żetonów', 'żetonów'])} albo ${formatQuantity(item.coinPrice - coins, ['monety', 'monet', 'monet'])}.` : 'Wybierz jedną walutę. Saldo zmieni się po zakupie.'}</p>
              </>}
          </article>;
        })}
      </div>
    </section>
  </div>;
}
