import React from 'react';
import { X } from 'lucide-react';
import { SubjectId, SubjectKey } from '../types';
import { SubjectPicker } from './SubjectPicker';
import { subjectOption } from '../lib/subjects';

interface SubjectLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubject: SubjectId;
  selectedSubjectKey?: SubjectKey;
  onSelectSubject: (subject: SubjectId) => void;
  onSelectSubjectKey?: (key: SubjectKey) => void;
  polishStats?: { total: number; epochs: number; lektury: number };
  mathStats?: { total: number; topics: number };
}
export function SubjectLobbyModal({ isOpen, onClose, currentSubject, selectedSubjectKey, onSelectSubject, onSelectSubjectKey }: SubjectLobbyModalProps) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
    <section role="dialog" aria-modal="true" aria-labelledby="subject-dialog-title" className="relative w-full max-w-sm rounded-2xl border border-surface-border bg-surface-card p-6 pb-10" onClick={event => event.stopPropagation()}>
      <button type="button" onClick={onClose} aria-label="Zamknij wybór przedmiotu" className="absolute top-3 right-3 p-3 rounded-lg text-text-secondary hover:bg-surface-card-hover"><X size={18} /></button>
      <h2 id="subject-dialog-title" className="text-lg font-semibold text-text-primary mb-6 pr-8">Wybierz przedmiot i poziom</h2>
      <SubjectPicker value={subjectOption(selectedSubjectKey, currentSubject).key} onChange={key => {
        if (onSelectSubjectKey) onSelectSubjectKey(key);
        else onSelectSubject(subjectOption(key).id);
        onClose();
      }} />
    </section>
  </div>;
}
