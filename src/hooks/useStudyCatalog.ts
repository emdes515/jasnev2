import { useEffect, useState } from 'react';
import { curriculumRepository } from '../services/curriculumRepository';
const empty = { lessons: [] as any[], sections: [] as any[], epochs: [] as any[] };
export function useStudyCatalog(subject: string) {
  const [state, setState] = useState({ subject, data: empty });
  useEffect(() => {
    let active = true;
    curriculumRepository.getStudyCatalog(subject).then(data => { if (active) setState({ subject, data }); }).catch(() => { if (active) setState({ subject, data: empty }); });
    return () => { active = false; };
  }, [subject]);
  return state.subject === subject ? state.data : empty;
}
