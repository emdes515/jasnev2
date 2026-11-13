import type { SubjectKey } from '../types';

/**
 * Zadanie próbne w onboardingu: jedno krótkie zadanie na przedmiot,
 * z wyjaśnieniem, które wskazuje pułapkę (Core-4), a nie samą odpowiedź.
 * To autorskie zadania JASNE, nie arkusze CKE.
 */
export interface OnboardingDemoTask {
  prompt: string;
  hint?: string;
  options: { id: string; text: string }[];
  correctId: string;
  /** Wyjaśnienie po poprawnej odpowiedzi: dlaczego to działa. */
  why: string;
  /** Wyjaśnienie po błędzie: pułapka, w którą łatwo wpaść. */
  trap: string;
}

const MATH: OnboardingDemoTask = {
  prompt: 'Cena kurtki wzrosła o 20%, a po miesiącu spadła o 20%. Jak cena końcowa ma się do początkowej?',
  options: [
    { id: 'a', text: 'Jest taka sama' },
    { id: 'b', text: 'Jest niższa o 4%' },
    { id: 'c', text: 'Jest wyższa o 4%' },
    { id: 'd', text: 'Jest niższa o 20%' },
  ],
  correctId: 'b',
  why: 'Po podwyżce cena to 1,2 ceny początkowej. Obniżka liczy się od nowej, wyższej ceny: 1,2 · 0,8 = 0,96. Czyli 96%, więc o 4% mniej.',
  trap: 'Procenty z różnych podstaw nie znoszą się. Drugie 20% liczysz od ceny po podwyżce, nie od początkowej.',
};

const POLISH: OnboardingDemoTask = {
  prompt: 'W zdaniu „Jej oczy są jak gwiazdy” użyto:',
  options: [
    { id: 'a', text: 'metafory' },
    { id: 'b', text: 'porównania' },
    { id: 'c', text: 'epitetu' },
    { id: 'd', text: 'personifikacji' },
  ],
  correctId: 'b',
  why: 'Dwa elementy (oczy i gwiazdy) łączy spójnik „jak”. To porównanie.',
  trap: 'Metafora nie ma słowa „jak” ani „niczym”. Gdy je widzisz, szukaj porównania.',
};

const ENGLISH: OnboardingDemoTask = {
  prompt: 'I ______ in Gdańsk since 2019.',
  hint: 'Uzupełnij lukę.',
  options: [
    { id: 'a', text: 'live' },
    { id: 'b', text: 'am living' },
    { id: 'c', text: 'have lived' },
    { id: 'd', text: 'lived' },
  ],
  correctId: 'c',
  why: 'Since 2019 łączy przeszłość z teraźniejszością, więc potrzebny jest Present Perfect: have lived.',
  trap: 'Po polsku mówimy „mieszkam od 2019”, więc kusi Present Simple. W angielskim since wymaga Present Perfect.',
};

export function onboardingDemoFor(subject: SubjectKey): OnboardingDemoTask {
  if (subject === 'pol') return POLISH;
  if (subject === 'eng' || subject === 'eng-roz') return ENGLISH;
  return MATH;
}
