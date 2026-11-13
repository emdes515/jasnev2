/** A decorative badge or a year alone never establishes an official source. */
export function taskProvenance(task: any): { official: boolean; label: string } {
  const id = String(task?.id || '');
  const canonical = id.match(/^(matura-(maj|czerwiec|sierpien)-(20\d{2}))-zad-(\d+(?:\.\d+)?)/);
  const raw = [task?.source, task?.cke_source, task?.sourceYear].filter(v => typeof v === 'string').join(' ');
  const number = String(task?.taskNumber || raw.match(/zad(?:anie)?\.?\s*(\d+(?:\.\d+)?)/i)?.[1] || canonical?.[4] || '');
  const session = String(task?.session || canonical?.[2] || raw.match(/maj|czerwiec|sierpień|sierpien/i)?.[0] || '');
  const year = String(task?.year || canonical?.[3] || raw.match(/20\d{2}/)?.[0] || '');
  const official = Boolean((canonical || task?.isCke === true) && session && year && number);
  if (!official) return { official: false, label: 'Autorskie zadanie JASNE' };
  const sheet = String(task?.examId || task?.examName || `matura-${session}-${year}`);
  return { official: true, label: `Zadanie CKE · ${session.replace('sierpien', 'sierpień')} ${year} · arkusz ${sheet} · zadanie ${number}` };
}
