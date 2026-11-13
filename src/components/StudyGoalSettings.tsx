import { useState } from 'react';
import { UserState } from '../types';

type Preferences = NonNullable<UserState['onboardingPreferences']>;

export function StudyGoalSettings({ value, onSave, onCancel }: {
  value?: Preferences;
  onSave: (value: Preferences) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Preferences>(value || { targetExam: 'matura_2025', targetScore: '70', dailyMinutes: 10 });
  const field = 'mt-2 w-full min-h-11 rounded-lg border border-surface-border bg-surface-card px-3 text-sm text-text-primary focus-visible:outline-2 focus-visible:outline-primary';
  return <form className="p-4 sm:p-5 border-b border-surface-border" onSubmit={event => { event.preventDefault(); onSave(draft); }}>
    <h3 className="text-base font-semibold text-text-primary">Ustaw cel nauki</h3>
    <div className="grid sm:grid-cols-3 gap-4 mt-4">
      <label className="text-sm text-text-secondary">Egzamin
        <select className={field} value={draft.targetExam} onChange={event => setDraft({ ...draft, targetExam: event.target.value as Preferences['targetExam'] })}>
          <option value="matura_2025">Matura</option><option value="poprawka">Matura poprawkowa</option><option value="e8">Egzamin ósmoklasisty</option>
        </select>
      </label>
      <label className="text-sm text-text-secondary">Docelowy wynik
        <select className={field} value={draft.targetScore} onChange={event => setDraft({ ...draft, targetScore: event.target.value as Preferences['targetScore'] })}>
          <option value="30">30%</option><option value="70">70%</option><option value="100">100%</option>
        </select>
      </label>
      <label className="text-sm text-text-secondary">Czas dziennie
        <select className={field} value={draft.dailyMinutes} onChange={event => setDraft({ ...draft, dailyMinutes: Number(event.target.value) as Preferences['dailyMinutes'] })}>
          <option value={5}>5 minut</option><option value={10}>10 minut</option><option value={15}>15 minut</option>
        </select>
      </label>
    </div>
    <div className="flex gap-3 mt-5">
      <button type="submit" className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-[#080B11] cursor-pointer">Zapisz cel</button>
      <button type="button" onClick={onCancel} className="min-h-11 rounded-lg px-4 text-sm text-text-secondary hover:bg-surface-card-hover cursor-pointer">Anuluj</button>
    </div>
  </form>;
}
