import { useEffect, useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { SubjectKey } from '../types';
import { SUBJECT_OPTIONS, subjectOption } from '../lib/subjects';

export function SubjectPicker({ value, onChange }: { value: SubjectKey; onChange: (value: SubjectKey) => void }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const active = subjectOption(value);
  const Icon = active.icon;
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) ref.current?.removeAttribute('open');
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.removeAttribute('open');
        ref.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', escape);
    };
  }, []);
  return (
    <details ref={ref} data-subject={value} className="subject-picker relative w-full sm:w-72 font-sans text-sm">
      <summary aria-label={`Zmień przedmiot: ${active.name}, ${active.level}`} className="subject-trigger list-none [&::-webkit-details-marker]:hidden cursor-pointer min-h-12 flex items-center gap-3 rounded-xl border px-3 py-2 text-text-primary focus-visible:outline-2 focus-visible:outline-primary">
        <span className="subject-icon"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
        <span className="flex-1 min-w-0 font-medium">{active.name}<span className="block text-xs font-normal text-text-secondary">{active.level}</span></span>
        <ChevronDown size={16} className="shrink-0 text-text-secondary" aria-hidden="true" />
      </summary>
      <div className="absolute top-full mt-2 left-0 w-full min-w-64 max-h-[65vh] overflow-y-auto z-50 rounded-xl border border-surface-border bg-surface-card p-1.5 shadow-xl" aria-label="Przedmioty i poziomy">
        {SUBJECT_OPTIONS.map(option => {
          const ItemIcon = option.icon;
          const selected = option.key === value;
          return <button key={option.key} data-subject={option.key} type="button" aria-label={`${option.name}, ${option.level}`} aria-pressed={selected}
            onClick={() => { onChange(option.key); ref.current?.removeAttribute('open'); ref.current?.querySelector('summary')?.focus(); }}
            className={`w-full min-h-12 flex items-center gap-3 px-3 py-2 text-left rounded-lg focus-visible:outline-2 focus-visible:outline-primary ${selected ? 'subject-selected text-text-primary' : 'text-text-secondary hover:bg-surface-card-hover hover:text-text-primary'}`}>
            <span className="subject-icon"><ItemIcon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
            <span className="flex-1 font-medium">{option.name}<span className="block font-normal text-xs text-text-secondary">{option.level}</span></span>
            {selected && <Check size={16} className="subject-check shrink-0" aria-hidden="true" />}
          </button>;
        })}
      </div>
    </details>
  );
}
