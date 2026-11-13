import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Coins, Crown, Zap } from 'lucide-react';
import type { AchievementTier } from '../../data/achievements';

export function RewardButton({ primary = false, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return <button type="button" {...props} className={`reward-button ${primary ? 'reward-button-primary' : 'reward-button-secondary'} ${className}`} />;
}

export function RewardStatus({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'ready' | 'complete' }) {
  return <span className={`reward-status reward-status-${tone}`}>{children}</span>;
}

export function formatQuantity(value: number, forms: [string, string, string]) {
  const last = value % 10, lastTwo = value % 100;
  const index = value === 1 ? 0 : last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14) ? 1 : 2;
  return `${value.toLocaleString('pl-PL')} ${forms[index]}`;
}

export function targetLabel(value: number, unit: string) {
  if (unit === 'zadanie' || unit === 'zadań') return formatQuantity(value, ['zadanie', 'zadania', 'zadań']);
  if (unit === 'test') return formatQuantity(value, ['test', 'testy', 'testów']);
  if (unit === 'arkuszy') return formatQuantity(value, ['arkusz', 'arkusze', 'arkuszy']);
  if (unit === 'dni') return value === 1 ? '1 dzień' : `${value} dni`;
  if (unit === 'lvl') return `poziom ${value}`;
  return `${value} ${unit}`;
}

export function RewardSummary({ tier }: { tier: AchievementTier }) {
  const effect = tier.perkEffect;
  const extras = [
    effect?.streakFreezes ? `Ochrona serii: +${effect.streakFreezes}` : '',
    effect?.xpBoostPercent ? `Premia XP: +${effect.xpBoostPercent}%` : '',
    effect?.coinBoostPercent ? `Premia monet: +${effect.coinBoostPercent}%` : '',
    effect?.temporaryXpBoostCharges ? `Podwójne XP: ${effect.temporaryXpBoostCharges} sesji` : '',
    effect?.arenaShields ? `Ochrona rankingu Areny: +${effect.arenaShields}` : '',
    effect?.arenaTokenBonusPercent ? `Premia żetonów Areny: +${effect.arenaTokenBonusPercent}%` : ''
  ].filter(Boolean);
  return <div className="space-y-2">
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary tabular-nums" aria-label="Nagrody">
      <span className="inline-flex items-center gap-1.5"><Coins size={15} className="text-primary" aria-hidden="true" />+{formatQuantity(tier.rewardCoins, ['moneta', 'monety', 'monet'])}</span>
      <span className="inline-flex items-center gap-1.5"><Crown size={15} className="text-primary" aria-hidden="true" />+{formatQuantity(tier.rewardTokens, ['żeton', 'żetony', 'żetonów'])}</span>
      <span className="inline-flex items-center gap-1.5"><Zap size={15} className="text-primary" aria-hidden="true" />+{tier.rewardXp} XP</span>
    </div>
    {extras.length > 0 && <p className="text-xs leading-relaxed text-text-secondary">{extras.join(' · ')}</p>}
  </div>;
}
