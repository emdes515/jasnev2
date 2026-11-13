import { useState } from 'react';
import { Trophy, CheckCircle2, Flame, Zap, GraduationCap, Star, Swords, Gift, ChevronDown, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARENA_ENABLED } from '../config/features';
import { ACHIEVEMENTS, AchievementCategory, AchievementContext, getAchievementProgress } from '../data/achievements';
import { UserState } from '../types';
import { triggerHaptic, filterActualTaskIds } from '../utils';
import { RewardButton, RewardStatus, RewardSummary, targetLabel } from './rewards/RewardsUI';

interface AchievementsSectionProps {
  userState: UserState;
  completedTasks: string[];
  onClaimTier: (achievementId: string, tierNumber: number) => void;
}

const icons = { Trophy, CheckCircle2, Flame, Zap, GraduationCap, Star, Swords };

export function AchievementsSection({ userState, completedTasks, onClaimTier }: AchievementsSectionProps) {
  const [category, setCategory] = useState<AchievementCategory | 'all' | 'claimable'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const context: AchievementContext = {
    completedTasksCount: filterActualTaskIds(completedTasks).length,
    arenaWins: userState.arenaWins || 0,
    arenaRating: userState.arenaRating || 1000,
    streakDays: userState.streakDays || 0,
    maturaAttempts: userState.maturaAttempts || 0,
    maturaBestScore: userState.maturaBestScore || 0,
    level: userState.level || 1
  };
  const items = ACHIEVEMENTS.filter(achievement => ARENA_ENABLED || achievement.category !== 'arena')
    .map(achievement => getAchievementProgress(achievement, context, userState.claimedAchievements || {}));
  const ready = items.filter(item => item.canClaim).length;
  const claimed = items.reduce((sum, item) => sum + item.claimedTier, 0);
  const total = items.reduce((sum, item) => sum + item.achievement.tiers.length, 0);
  const filtered = items.filter(item => category === 'all' || (category === 'claimable' ? item.canClaim : item.achievement.category === category));
  const filters: { key: typeof category; label: string }[] = [
    { key: 'all', label: `Wszystkie (${items.length})` },
    { key: 'claimable', label: `Do odebrania (${ready})` },
    { key: 'tasks', label: 'Zadania' },
    { key: 'streak', label: 'Passa' },
    { key: 'matura', label: 'Matura' },
    { key: 'levels', label: 'Poziom' },
    ...(ARENA_ENABLED ? [{ key: 'arena' as const, label: 'Arena' }] : [])
  ];
  const claim = (id: string, tier: number) => {
    triggerHaptic('success');
    onClaimTier(id, tier);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
  };

  return <div className="space-y-5">
    <section className="reward-panel" aria-label="Postęp odznak">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div><h2 className="reward-heading">Twoje odznaki</h2><p className="text-sm text-text-secondary mt-1">Odebrane rangi: {claimed} z {total}</p></div>
        <RewardStatus tone={ready ? 'ready' : 'neutral'}>Do odebrania: {ready}</RewardStatus>
      </div>
      <div className="reward-progress" role="progressbar" aria-label="Odebrane rangi" aria-valuemin={0} aria-valuemax={total} aria-valuenow={claimed}>
        <span style={{ width: `${total ? claimed / total * 100 : 0}%` }} />
      </div>
    </section>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtruj odznaki">
      {filters.map(filter => <RewardButton key={filter.key} aria-pressed={category === filter.key} onClick={() => setCategory(filter.key)} className={category === filter.key ? '!border-primary/40 !bg-primary/10 !text-primary' : ''}>{filter.label}</RewardButton>)}
    </div>
    {filtered.length === 0 && <div className="reward-panel text-sm text-text-secondary" role="status">
      <p>Nie masz teraz nagród do odebrania.</p><RewardButton onClick={() => setCategory('all')} className="mt-4">Pokaż wszystkie odznaki</RewardButton>
    </div>}
    <div className="space-y-4">
      {filtered.map(item => {
        const achievement = item.achievement, tier = item.activeTier;
        const Icon = icons[achievement.iconName as keyof typeof icons] || Star;
        const open = expanded === achievement.id;
        const status = item.canClaim ? 'Do odebrania' : item.isFullyCompleted ? 'Ukończona' : item.claimedTier ? `Odebrano ${item.claimedTier} z ${achievement.tiers.length} rang` : 'W trakcie';
        return <article key={achievement.id} className="reward-panel" aria-labelledby={`achievement-${achievement.id}`}>
          <div className="flex items-start gap-3">
            <span className="reward-icon"><Icon size={20} aria-hidden="true" /></span>
            <div className="flex-1 min-w-0">
              <h3 id={`achievement-${achievement.id}`} className="reward-heading">{achievement.name}</h3>
              <p className="text-sm leading-relaxed text-text-secondary mt-1">{achievement.id === 'flawless_exam' && !ARENA_ENABLED ? 'Uzyskaj 100% w arkuszu maturalnym.' : achievement.description}</p>
              <div className="mt-2"><RewardStatus tone={item.canClaim ? 'ready' : item.isFullyCompleted ? 'complete' : 'neutral'}>{status}</RewardStatus></div>
            </div>
          </div>
          {tier && <div className="mt-5">
            <div className="flex flex-wrap justify-between gap-2 text-sm mb-2">
              <span className="text-text-secondary">Ranga {tier.tier} z {achievement.tiers.length}</span>
              <span className="text-text-primary tabular-nums">{achievement.unit === 'lvl' ? `Poziom ${item.currentValue} z ${tier.target}` : `${Math.min(item.currentValue, tier.target)} / ${targetLabel(tier.target, achievement.unit)}`}</span>
            </div>
            <div className="reward-progress" role="progressbar" aria-label={`Postęp: ${achievement.name}`} aria-valuemin={0} aria-valuemax={tier.target} aria-valuenow={Math.min(item.currentValue, tier.target)}>
              <span style={{ width: `${item.progressPercent}%` }} />
            </div>
            <div className="mt-4"><RewardSummary tier={tier} /></div>
          </div>}
          {item.isFullyCompleted && <p className="flex items-center gap-2 text-sm text-text-secondary mt-4"><CheckCircle2 size={16} className="text-emerald-400" />Wszystkie nagrody odebrane.</p>}
          <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-surface-border">
            {item.canClaim && tier && <RewardButton primary onClick={() => claim(achievement.id, tier.tier)} aria-label={`Odbierz nagrodę: ${achievement.name}`}><Gift size={16} />Odbierz nagrodę</RewardButton>}
            <RewardButton aria-expanded={open} aria-controls={`ranks-${achievement.id}`} onClick={() => setExpanded(open ? null : achievement.id)}><ChevronDown size={16} className={open ? 'rotate-180' : ''} />{open ? 'Zwiń rangi' : 'Pokaż rangi'}</RewardButton>
          </div>
          {open && <div id={`ranks-${achievement.id}`} className="mt-4 border-t border-surface-border divide-y divide-surface-border">
            {achievement.tiers.map(rank => <div key={rank.tier} className="py-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-text-primary">Ranga {rank.tier} · {targetLabel(rank.target, achievement.unit)}</h4>
                <RewardStatus tone={rank.tier <= item.claimedTier ? 'complete' : rank.tier === tier?.tier && item.canClaim ? 'ready' : 'neutral'}>
                  {rank.tier <= item.claimedTier ? <><Check size={13} className="mr-1" />Odebrana</> : rank.tier === tier?.tier && item.canClaim ? 'Do odebrania' : 'Przed Tobą'}
                </RewardStatus>
              </div>
              <RewardSummary tier={rank} />
            </div>)}
          </div>}
        </article>;
      })}
    </div>
  </div>;
}