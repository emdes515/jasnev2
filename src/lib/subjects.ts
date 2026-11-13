import { BookOpen, Calculator, Languages } from 'lucide-react';
import type { SubjectKey, SubjectId } from '../types';

export const SUBJECT_OPTIONS: { key: SubjectKey; id: SubjectId; name: string; level: string; icon: typeof BookOpen }[] = [
  { key: 'math', id: 'matematyka', name: 'Matematyka', level: 'Podstawa', icon: Calculator },
  { key: 'math-roz', id: 'matematyka', name: 'Matematyka', level: 'Rozszerzenie', icon: Calculator },
  { key: 'pol', id: 'polski', name: 'Język polski', level: 'Podstawa', icon: BookOpen },
  { key: 'eng', id: 'angielski', name: 'Język angielski', level: 'Podstawa', icon: Languages },
  { key: 'eng-roz', id: 'angielski', name: 'Język angielski', level: 'Rozszerzenie', icon: Languages },
];

export function subjectOption(key?: SubjectKey, id?: SubjectId) {
  return SUBJECT_OPTIONS.find(option => key ? option.key === key : option.id === id) || SUBJECT_OPTIONS[0];
}
