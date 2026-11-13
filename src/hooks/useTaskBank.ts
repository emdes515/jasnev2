import { useEffect, useState } from 'react';
import { curriculumRepository } from '../services/curriculumRepository';

/** Both modern and legacy task browsers use the same Firestore/cache/offline policy. */
export function useTaskBank(subject: string, practice = false): any[] {
  const [bank, setBank] = useState<{ subject: string; tasks: any[] }>({ subject, tasks: [] });
  useEffect(() => {
    let active = true;
    const request = practice ? curriculumRepository.getPracticeTasks(subject) : curriculumRepository.getCkeExamTasks(subject);
    request.then(tasks => { if (active) setBank({ subject, tasks }); }).catch(() => { if (active) setBank({ subject, tasks: [] }); });
    return () => { active = false; };
  }, [subject, practice]);
  return bank.subject === subject ? bank.tasks : [];
}
