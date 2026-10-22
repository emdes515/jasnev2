/**
 * src/data/english/englishTrapData.ts
 *
 * Baza danych pułapek egzaminacyjnych CKE i mini-treningów („Typowy błąd”)
 * dla wszystkich lekcji języka angielskiego (Formuła 2023).
 *
 * Zgodność ze standardami:
 * - 3-kartowy układ Nocturne Luminary: Częsty błąd (L1 interference) + Klucz CKE + Wskazówka egzaminatora
 * - 3 rotujące formaty interaktywne:
 *   1. A_VS_B: Pojedynek wariantów (DO vs DON'T showdown)
 *   2. SPOT_AND_FIX: Wskaż i napraw błąd (wybór poprawnego zamiennika)
 *   3. TRUE_FALSE_AUDIT: Audyt poprawności zdania (Prawda/Fałsz z pułapką CKE)
 */

export type TrapChallengeType = 'A_VS_B' | 'SPOT_AND_FIX' | 'TRUE_FALSE_AUDIT';

export interface TrapCardData {
  error: {
    wrongText: string;
    explanation: string;
    l1InterferenceNote?: string;
  };
  correct: {
    rightText: string;
    explanation: string;
    ckeStandardRule?: string;
  };
  tip: {
    examinerTip: string;
    examTrapFrequency?: string;
  };
}

export interface TrapChallengeAVsB {
  type: 'A_VS_B';
  instruction: string;
  optionA: {
    text: string;
    isCorrect: boolean;
  };
  optionB: {
    text: string;
    isCorrect: boolean;
  };
  trapExplanation: string;
  whyIncorrectExplanation: string;
}

export interface TrapChallengeSpotAndFix {
  type: 'SPOT_AND_FIX';
  instruction: string;
  sentenceWithMistake: string;
  highlightedMistake: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  correctedSentence: string;
  trapExplanation: string;
}

export interface TrapChallengeTrueFalse {
  type: 'TRUE_FALSE_AUDIT';
  instruction: string;
  statement: string;
  containsCkeTrap: boolean; // true = zdanie zawiera błąd dyskwalifikujący CKE; false = zdanie jest poprawne
  trapExplanation: string;
}

export type EnglishTrapChallenge = TrapChallengeAVsB | TrapChallengeSpotAndFix | TrapChallengeTrueFalse;

export interface EnglishLessonTrapData {
  lessonId: string;
  topicId: string;
  cards: TrapCardData;
  challenge: EnglishTrapChallenge;
}

export const ENGLISH_TRAP_REGISTRY: Record<string, EnglishLessonTrapData> = {
  // =========================================================================
  // DZIAŁ 1: CZASY GRAMATYCZNE I ASPEKTY
  // =========================================================================
  'eng-lesson-1-1': {
    lessonId: 'eng-lesson-1-1',
    topicId: 'eng-dzial-1',
    cards: {
      error: {
        wrongText: 'I am knowing him for three years and she is wanting a coffee now.',
        explanation: 'Czasowniki statyczne opisujące stany umysłu i emocje (know, want, understand, believe) NIE tworzą formy ciągłej z -ing.',
        l1InterferenceNote: 'Kalka z polskiego: „Znam go” i „Ona chce” mylone z czynnością trwającą w tej chwili.',
      },
      correct: {
        rightText: 'I have known him for three years and she wants a coffee now.',
        explanation: 'Do czynności trwającej od 3 lat stosujemy Present Perfect, a dla pragnienia tu i teraz Present Simple.',
        ckeStandardRule: 'Klucz CKE: State verbs = Present Simple; trwanie od przeszłości = Present Perfect.',
      },
      tip: {
        examinerTip: 'Gdy w zdaniu z „know/like/understand” widzisz „at the moment” lub „now”, to ZMYŁKA CKE! Wybierz Present Simple, nigdy formę z -ing!',
        examTrapFrequency: 'Pojawia się w 10/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Wskaż zdanie, które w 100% poprawnie spełnia standardy egzaminatora CKE:',
      optionA: {
        text: 'Listen to me! I understand what you mean.',
        isCorrect: true,
      },
      optionB: {
        text: 'Listen to me! I am understanding what you are meaning.',
        isCorrect: false,
      },
      trapExplanation: 'Doskonale! Czasowniki „understand” i „mean” to czasowniki statyczne – na maturze podstawowej nigdy nie przyjmują końcówki -ing.',
      whyIncorrectExplanation: 'Opcja B zawiera błąd dyskwalifikujący: czasowniki stanu umysłu (understand, mean) nie występują w Present Continuous!',
    },
  },

  'eng-lesson-1-2': {
    lessonId: 'eng-lesson-1-2',
    topicId: 'eng-dzial-1',
    cards: {
      error: {
        wrongText: 'While I cooked dinner, the phone was ringing.',
        explanation: 'Odwrócenie aspektów czynności ciągłej (tła) i nagłego zdarzenia punktowego.',
        l1InterferenceNote: 'W języku polskim oba czasowniki mogą brzmieć niedokonanie: „Kiedy gotowałem, dzwonił telefon”.',
      },
      correct: {
        rightText: 'While I was cooking dinner, the phone rang.',
        explanation: 'Dłuższa czynność w toku wymaga Past Continuous (was cooking), a krótkie zdarzenie przerywające – Past Simple (rang).',
        ckeStandardRule: 'Klucz CKE: while + Past Continuous, when + Past Simple.',
      },
      tip: {
        examinerTip: 'Po spójniku WHILE szukaj czasu ciągłego (-ing). Po spójniku WHEN w 90% przypadków CKE oczekuje Past Simple (II forma).',
        examTrapFrequency: 'Pojawia się w 8/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'SPOT_AND_FIX',
      instruction: 'Wskaż prawidłowy zamiennik dla błędnego fragmentu w zdaniu:',
      sentenceWithMistake: 'We walked in the park when suddenly it [was starting] to rain.',
      highlightedMistake: 'was starting',
      options: [
        { id: 'opt-1', text: 'started', isCorrect: true },
        { id: 'opt-2', text: 'has started', isCorrect: false },
        { id: 'opt-3', text: 'starts', isCorrect: false },
      ],
      correctedSentence: 'We walked in the park when suddenly it started to rain.',
      trapExplanation: 'Świetnie! „Suddenly” (nagle) sygnalizuje punktowe zdarzenie przerywające w przeszłości, które wymaga formy Past Simple („started”), a nie Continuous.',
    },
  },

  'eng-lesson-1-3': {
    lessonId: 'eng-lesson-1-3',
    topicId: 'eng-dzial-1',
    cards: {
      error: {
        wrongText: 'Look at those black clouds! It will rain in a minute.',
        explanation: 'Użycie „will” do sytuacji, w której mamy naoczny, namacalny dowód w teraźniejszości.',
        l1InterferenceNote: 'W polszczyźnie mówimy „Będzie padać” nie różnicując dowodu naocznego od przeczucia.',
      },
      correct: {
        rightText: 'Look at those black clouds! It is going to rain in a minute.',
        explanation: 'Gdy prognoza opiera się na bezpośrednim dowodzie zmysłowym (czarne chmury), CKE wymaga konstrukcji „be going to”.',
        ckeStandardRule: 'Klucz CKE: Twardy dowód w teraźniejszości = be going to.',
      },
      tip: {
        examinerTip: 'Widzisz w tekście wykrzyknik: „Look!”, „Watch out!” albo widoczne objawy (np. blada twarz)? Zawsze wybieraj „is/are going to”!',
        examTrapFrequency: 'Pojawia się w 7/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'TRUE_FALSE_AUDIT',
      instruction: 'Oceń poniższe zdanie pod kątem standardów oceniania CKE:',
      statement: 'I think that humans are going to live on Mars in 2100.',
      containsCkeTrap: true,
      trapExplanation: 'Zdanie ZAWIERA BŁĄD! Zwrot „I think / I believe” bez twardych dowodów tu i teraz wyraża subiektywną opinię i wymaga „will live”, a nie „are going to live”.',
    },
  },

  'eng-lesson-1-4': {
    lessonId: 'eng-lesson-1-4',
    topicId: 'eng-dzial-1',
    cards: {
      error: {
        wrongText: 'I live in Warsaw since 2015 and I am living here for 9 years.',
        explanation: 'Błąd kalki językowej: użycie Present Simple lub Continuous do czynności trwającej od określonego momentu w przeszłości.',
        l1InterferenceNote: 'Polskie „Mieszkam w Warszawie od 2015 roku” kusi do dosłownego przetłumaczenia jako „I live”.',
      },
      correct: {
        rightText: 'I have lived in Warsaw since 2015 / for 9 years.',
        explanation: 'Czynność rozpoczęta w przeszłości i trwająca nieprzerwanie do dziś wymaga czasu Present Perfect.',
        ckeStandardRule: 'Klucz CKE: since / for w kontekście trwania = have/has + V3.',
      },
      tip: {
        examinerTip: 'Zapamiętaj wzór: SINCE + punkt początkowy (since Monday, since 2020), FOR + okres czasu (for 3 days, for 5 years).',
        examTrapFrequency: 'Pojawia się w 10/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Wybierz poprawną odpowiedź do minidialogu maturalnego:',
      optionA: {
        text: 'How long have you had this laptop? — I bought it two years ago.',
        isCorrect: true,
      },
      optionB: {
        text: 'How long do you have this laptop? — I have it since two years.',
        isCorrect: false,
      },
      trapExplanation: 'Brawo! Pytanie o długość posiadania stanu trwającego do dziś wymaga „How long have you had”, a odpowiedź na pytanie „kiedy” wymaga Past Simple z „ago”.',
      whyIncorrectExplanation: 'Opcja B zawiera podwójny błąd: „How long do you have” (błąd czasu) oraz „since two years” (powinno być „for two years” lub „two years ago”).',
    },
  },

  'eng-lesson-1-5': {
    lessonId: 'eng-lesson-1-5',
    topicId: 'eng-dzial-1',
    cards: {
      error: {
        wrongText: 'When I arrived at the cinema, the movie already started.',
        explanation: 'Niezastosowanie czasu zaprzeszłego Past Perfect dla czynności, która wydarzyła się przed innym zdarzeniem z przeszłości.',
        l1InterferenceNote: 'W języku polskim czas zaprzeszły zanikł, dlatego uczniowie stosują zwykły czas przeszły.',
      },
      correct: {
        rightText: 'When I arrived at the cinema, the movie had already started.',
        explanation: 'Film zaczął się WCZEŚNIEJ niż moment przyjścia, dlatego wymaga Past Perfect (had + V3).',
        ckeStandardRule: 'Klucz CKE: Wcześniejsza przeszłość = had + III forma czasownika.',
      },
      tip: {
        examinerTip: 'Gdy masz dwa wydarzenia w przeszłości i jedno wydarzyło się przed drugim (szukaj słów: by the time, before, already) – to wcześniejsze musi mieć „had”!',
        examTrapFrequency: 'Pojawia się w 7/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'SPOT_AND_FIX',
      instruction: 'Wskaż prawidłową formę gramatyczną dla luki w zdaniu:',
      sentenceWithMistake: 'By the time the police arrived, the thieves [escaped] with the money.',
      highlightedMistake: 'escaped',
      options: [
        { id: 'opt-1', text: 'had escaped', isCorrect: true },
        { id: 'opt-2', text: 'were escaping', isCorrect: false },
        { id: 'opt-3', text: 'have escaped', isCorrect: false },
      ],
      correctedSentence: 'By the time the police arrived, the thieves had escaped with the money.',
      trapExplanation: 'Znakomicie! Wyrażenie „By the time + Past Simple” to klasyczny wskaźnik CKE wymuszający czas Past Perfect („had escaped”) w zdaniu głównym.',
    },
  },

  'eng-lesson-1-6': {
    lessonId: 'eng-lesson-1-6',
    topicId: 'eng-dzial-1',
    cards: {
      error: {
        wrongText: 'I didn\'t went to school yesterday and did you saw my keys?',
        explanation: 'Zastosowanie II formy czasownika po operatorze pytania lub przeczenia (did / didn\'t).',
        l1InterferenceNote: 'Polski uczeń myśli: czas przeszły = wszędzie druga forma (didn\'t went).',
      },
      correct: {
        rightText: 'I didn\'t go to school yesterday and did you see my keys?',
        explanation: 'Operator „did / didn\'t” przejął już na siebie czas przeszły, więc czasownik główny wraca do czystego bezokolicznika V1.',
        ckeStandardRule: 'Klucz CKE: Did / Didn\'t + bezokolicznik (V1).',
      },
      tip: {
        examinerTip: 'Pamiętaj o zasadzie: „Did zjadło drugą formę!”. Nigdy nie łącz did/didn\'t z czasownikiem w czasie przeszłym.',
        examTrapFrequency: 'Pojawia się w 9/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'TRUE_FALSE_AUDIT',
      instruction: 'Oceń poprawność poniższego zdania z arkusza CKE:',
      statement: 'Why didn\'t you tell me the truth about the exam yesterday?',
      containsCkeTrap: false,
      trapExplanation: 'Zdanie jest w 100% POPRAWNE! Po „didn\'t” występuje bezokolicznik „tell” (a nie błędne „told”). To modelowy szyk CKE.',
    },
  },

  'eng-lesson-1-7': {
    lessonId: 'eng-lesson-1-7',
    topicId: 'eng-dzial-1',
    cards: {
      error: {
        wrongText: 'I used to playing video games when I was a child.',
        explanation: 'Mylenie konstrukcji „used to + V1” (dawny nawyk) z „be used to + -ing” (być przyzwyczajonym do czegoś).',
        l1InterferenceNote: 'Kojarzenie zwrotu „used to” z końcówką -ing bez obecności czasownika „to be”.',
      },
      correct: {
        rightText: 'I used to play video games when I was a child.',
        explanation: 'Dawny nawyk w przeszłości, który już nie trwa, tworzymy wyłącznie przez „used to + bezokolicznik”.',
        ckeStandardRule: 'Klucz CKE: used to + V1 (przeszły nawyk).',
      },
      tip: {
        examinerTip: 'Pytania i przeczenia: „Did you use to...?” oraz „I didn\'t use to...” – zwróć uwagę na brak literki „d” w słowie „use”!',
        examTrapFrequency: 'Pojawia się w 8/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Wskaż zdanie, które poprawnie opisuje przeszły nawyk:',
      optionA: {
        text: 'Did your sister use to ride a bicycle to school?',
        isCorrect: true,
      },
      optionB: {
        text: 'Did your sister used to ride a bicycle to school?',
        isCorrect: false,
      },
      trapExplanation: 'Bezbłędnie! W pytaniu operator „Did” przejmuje czas przeszły, więc piszemy „use to”, a nie „used to”. Egzaminatorzy CKE uwielbiają tę pułapkę w parafrazach!',
      whyIncorrectExplanation: 'W opcji B występuje błąd podwójnej przeszłości: nie wolno łączyć operatora „Did” z formą „used to” z literą -d.',
    },
  },

  // =========================================================================
  // DZIAŁ 2: GERUND, INFINITIVE I MODALE
  // =========================================================================
  'eng-lesson-2-1': {
    lessonId: 'eng-lesson-2-1',
    topicId: 'eng-dzial-2',
    cards: {
      error: {
        wrongText: 'I enjoy to swim and I decided going abroad next summer.',
        explanation: 'Zamiana wzorców czasownikowych: enjoy wymaga gerundium (-ing), a decide bezokolicznika z to (infinitive).',
        l1InterferenceNote: 'W języku polskim oba czasowniki łączą się z bezokolicznikiem: „Lubię pływać” i „Zdecydowałem wyjechać”.',
      },
      correct: {
        rightText: 'I enjoy swimming and I decided to go abroad next summer.',
        explanation: 'Enjoy + V-ing (upodobania), decide + to V1 (decyzje/plany).',
        ckeStandardRule: 'Klucz CKE: avoid/enjoy/mind + -ing; decide/hope/refuse + to V1.',
      },
      tip: {
        examinerTip: 'Zwróć uwagę na pułapkę „look forward to” – słowo „to” jest tu przyimkiem, więc wymaga formy z -ing: „look forward to hearing from you”!',
        examTrapFrequency: 'Pojawia się w 9/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'SPOT_AND_FIX',
      instruction: 'Wybierz poprawny fragment uzupełniający lukę w e-mailu:',
      sentenceWithMistake: 'I am really looking forward to [see] you at the festival.',
      highlightedMistake: 'see',
      options: [
        { id: 'opt-1', text: 'seeing', isCorrect: true },
        { id: 'opt-2', text: 'to see', isCorrect: false },
        { id: 'opt-3', text: 'seen', isCorrect: false },
      ],
      correctedSentence: 'I am really looking forward to seeing you at the festival.',
      trapExplanation: 'Znakomicie! Zwrot „look forward to” to jedna z najczęstszych pułapek CKE w e-mailach – „to” to przyimek, po którym zawsze musi wystąpić forma z -ing („seeing”)!',
    },
  },

  'eng-lesson-2-2': {
    lessonId: 'eng-lesson-2-2',
    topicId: 'eng-dzial-2',
    cards: {
      error: {
        wrongText: 'I stopped to smoke because it was harmful to my lungs.',
        explanation: '„Stop to smoke” oznacza „Zatrzymałem się, żeby zapalić papierosa”. Rzucenie nałogu to „stop smoking”.',
        l1InterferenceNote: 'Zróżnicowanie znaczeniowe po czasownikach stop, remember, forget.',
      },
      correct: {
        rightText: 'I stopped smoking because it was harmful to my lungs.',
        explanation: 'Stop + -ing oznacza zaprzestanie wykonywania czynności raz na zawsze lub przerwanie jej.',
        ckeStandardRule: 'Klucz CKE: stop doing sth = przerwać czynność; stop to do sth = zatrzymać się w celu zrobienia czegoś.',
      },
      tip: {
        examinerTip: 'Remember + to V1 = pamiętaj, by coś zrobić (w przyszłości). Remember + V-ing = pamiętać zrobienie czegoś w przeszłości (wspomnienie).',
        examTrapFrequency: 'Pojawia się w 8/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'TRUE_FALSE_AUDIT',
      instruction: 'Oceń, czy poniższe zdanie poprawnie przekazuje treść „Nie zapomnij zamknąć drzwi”:',
      statement: 'Don\'t forget locking the front door when you leave.',
      containsCkeTrap: true,
      trapExplanation: 'Zdanie ZAWIERA BŁĄD! Aby polecić komuś wykonanie zadania w przyszłości, stosujemy bezokolicznik: „Don\'t forget to lock”. Forma „forget locking” oznaczałaby zapomnienie faktu, że się zamknęło drzwi w przeszłości.',
    },
  },

  'eng-lesson-2-3': {
    lessonId: 'eng-lesson-2-3',
    topicId: 'eng-dzial-2',
    cards: {
      error: {
        wrongText: 'You mustn\'t wear a tie, casual clothes are completely fine.',
        explanation: 'Użycie „mustn\'t” (kategoryczny zakaz: „nie wolno ci”) zamiast „don\'t have to” (brak przymusu: „nie musisz”).',
        l1InterferenceNote: 'Kalka ze słowa „musieć” – polskie „nie musisz” mylone z zakazem.',
      },
      correct: {
        rightText: 'You don\'t have to wear a tie, casual clothes are completely fine.',
        explanation: 'Brak obowiązku lub konieczności wyrażamy wyłącznie przez „don\'t have to / doesn\'t have to / needn\'t”.',
        ckeStandardRule: 'Klucz CKE: mustn\'t = nie wolno (zakaz); don\'t have to = nie musisz (opcjonalność).',
      },
      tip: {
        examinerTip: 'Gdy polecenie mówi, że coś jest darmowe lub opcjonalne, ZAWSZE szukaj „don\'t have to” lub „needn\'t”. „Mustn\'t” to zakaz pod groźbą kary!',
        examTrapFrequency: 'Pojawia się w 10/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Wybierz poprawną reakcję językową w muzeum:',
      optionA: {
        text: 'Entry is free, so you don\'t have to buy a ticket, but you mustn\'t touch the paintings.',
        isCorrect: true,
      },
      optionB: {
        text: 'Entry is free, so you mustn\'t buy a ticket, but you don\'t have to touch the paintings.',
        isCorrect: false,
      },
      trapExplanation: 'Perfekcyjnie! „Don\'t have to” oznacza brak konieczności zakupu biletu (wstęp wolny), a „mustn\'t” to surowy zakaz dotykania eksponatów.',
      whyIncorrectExplanation: 'Opcja B odwraca znaczenia: „mustn\'t buy” oznaczałoby zakaz kupowania pod karą, a „don\'t have to touch” sugerowałoby, że dotykanie obrazów jest opcjonalne!',
    },
  },

  // =========================================================================
  // DZIAŁ 3: CONDITIONALS I ZDANIA CZASOWE
  // =========================================================================
  'eng-lesson-3-1': {
    lessonId: 'eng-lesson-3-1',
    topicId: 'eng-dzial-3',
    cards: {
      error: {
        wrongText: 'If it will rain tomorrow, I will stay at home.',
        explanation: 'Wstawienie „will” do części warunkowej po spójniku „if”.',
        l1InterferenceNote: 'W języku polskim w obu częściach występuje czas przyszły: „Jeśli będzie padać, zostanę w domu”.',
      },
      correct: {
        rightText: 'If it rains tomorrow, I will stay at home.',
        explanation: 'W 1. okresie warunkowym po „if / when / as soon as / unless” stosujemy czas teraźniejszy Present Simple.',
        ckeStandardRule: 'Klucz CKE: If + Present Simple, will + bezokolicznik.',
      },
      tip: {
        examinerTip: 'Złota zasada CKE: „Po IF i WHEN wyrzuć WILL przez okno!”. W części z IF nigdy nie występuje will na maturze podstawowej.',
        examTrapFrequency: 'Pojawia się w 10/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'SPOT_AND_FIX',
      instruction: 'Wybierz poprawną formę czasownika po spójniku czasowym:',
      sentenceWithMistake: 'I will call you as soon as I [will arrive] at the airport.',
      highlightedMistake: 'will arrive',
      options: [
        { id: 'opt-1', text: 'arrive', isCorrect: true },
        { id: 'opt-2', text: 'will arrive', isCorrect: false },
        { id: 'opt-3', text: 'arrived', isCorrect: false },
      ],
      correctedSentence: 'I will call you as soon as I arrive at the airport.',
      trapExplanation: 'Świetnie! Po spójnikach czasowych (as soon as, when, before, after) obowiązuje dokładnie ta sama reguła co po „if” – stosujemy czas teraźniejszy Present Simple („arrive”).',
    },
  },

  'eng-lesson-3-2': {
    lessonId: 'eng-lesson-3-2',
    topicId: 'eng-dzial-3',
    cards: {
      error: {
        wrongText: 'If I would have more money, I would buy a better car.',
        explanation: 'Wstawienie „would” do części warunkowej po „if”.',
        l1InterferenceNote: 'Kalka ze struktury „Gdybym miał... kupiłbym” (polskie „-bym” w obu członach zdania).',
      },
      correct: {
        rightText: 'If I had more money, I would buy a better car.',
        explanation: 'W 2. okresie warunkowym (gdybanie o teraźniejszości) po „if” występuje Past Simple, a „would” stoi wyłącznie w zdaniu głównym.',
        ckeStandardRule: 'Klucz CKE: If + Past Simple, would + bezokolicznik.',
      },
      tip: {
        examinerTip: 'Pamiętaj o zwrocie: „If I were you, I would...” – forma „were” dla osoby „I” jest oficjalnym standardem CKE.',
        examTrapFrequency: 'Pojawia się w 9/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'TRUE_FALSE_AUDIT',
      instruction: 'Oceń poprawność poniższej porady:',
      statement: 'If I was you, I would take an umbrella because it might rain.',
      containsCkeTrap: false,
      trapExplanation: 'Zdanie jest akceptowane przez CKE (choć formą preferowaną w kluczu jest „If I were you”, to wersja z „was” w mowie potocznej jest dopuszczana w Formule 2023). Konstrukcja zachowuje poprawny schemat: Past Simple + would.',
    },
  },

  'eng-lesson-3-3': {
    lessonId: 'eng-lesson-3-3',
    topicId: 'eng-dzial-3',
    cards: {
      error: {
        wrongText: 'Unless you don\'t study hard, you won\'t pass the exam.',
        explanation: 'Podwójne przeczenie: „unless” samo w sobie oznacza „jeśli nie” (if not) i nie łączy się z przeczeniem.',
        l1InterferenceNote: 'W języku polskim podwójne przeczenie jest naturalne („O ile nie będziesz...”).',
      },
      correct: {
        rightText: 'Unless you study hard, you won\'t pass the exam.',
        explanation: 'Po spójniku „unless” czasownik zawsze występuje w formie twierdzącej.',
        ckeStandardRule: 'Klucz CKE: Unless = If ... not (zakaz don\'t / doesn\'t po unless).',
      },
      tip: {
        examinerTip: 'W zadaniach na parafrazy: „If you don\'t leave now, you will be late” = „Unless you leave now, you will be late”. Wystarczy usunąć don\'t!',
        examTrapFrequency: 'Pojawia się w 8/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Wybierz poprawną parafrazę zdania „We won\'t go out if it doesn\'t stop raining”:',
      optionA: {
        text: 'We won\'t go out unless it stops raining.',
        isCorrect: true,
      },
      optionB: {
        text: 'We won\'t go out unless it doesn\'t stop raining.',
        isCorrect: false,
      },
      trapExplanation: 'Wspaniale! „Unless” zawiera już w sobie negację („jeśli nie”), więc po nim musi być czasownik twierdzący w 3. osobie („stops”).',
      whyIncorrectExplanation: 'Opcja B tworzy niedozwolone w języku angielskim podwójne zaprzeczenie po spójniku „unless”.',
    },
  },

  // =========================================================================
  // DZIAŁ 4: SŁOWOTWÓRSTWO I FALSE FRIENDS
  // =========================================================================
  'eng-lesson-4-1': {
    lessonId: 'eng-lesson-4-1',
    topicId: 'eng-dzial-4',
    cards: {
      error: {
        wrongText: 'Actually, I am living in London, but next year I will move to Paris.',
        explanation: 'Mylenie słowa „actually” (w rzeczywistości, tak naprawdę) ze słowem „currently / at present” (obecnie, aktualnie).',
        l1InterferenceNote: 'Klasyczny False Friend (fałszywy przyjaciel) bazujący na podobieństwie fonetycznym do polskiego słowa „aktualnie”.',
      },
      correct: {
        rightText: 'Currently, I am living in London, but next year I will move to Paris.',
        explanation: '„Currently / nowadays / at present” oznaczają stan obecny w czasie teraźniejszym.',
        ckeStandardRule: 'Klucz CKE: actually = in fact; currently = at present.',
      },
      tip: {
        examinerTip: '„Actually” to „tak naprawdę / w zasadzie” (np. „Actually, I don\'t like pizza”). Gdy chcesz powiedzieć „obecnie”, wybierz „currently”!',
        examTrapFrequency: 'Pojawia się w 10/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'SPOT_AND_FIX',
      instruction: 'Wskaż poprawne słowo uzupełniające zdanie o aktualnym zatrudnieniu:',
      sentenceWithMistake: 'My brother is [actually] unemployed, but he is looking for a job.',
      highlightedMistake: 'actually',
      options: [
        { id: 'opt-1', text: 'currently', isCorrect: true },
        { id: 'opt-2', text: 'eventually', isCorrect: false },
        { id: 'opt-3', text: 'sympathetically', isCorrect: false },
      ],
      correctedSentence: 'My brother is currently unemployed, but he is looking for a job.',
      trapExplanation: 'Świetnie! „Currently” oznacza „obecnie / w tej chwili”. Słowo „actually” to klasyczny False Friend oznaczający „w rzeczywistości”.',
    },
  },

  'eng-lesson-4-2': {
    lessonId: 'eng-lesson-4-2',
    topicId: 'eng-dzial-4',
    cards: {
      error: {
        wrongText: 'She is very sympathetic, she always smiles and helps other students.',
        explanation: 'Słowo „sympathetic” nie oznacza „sympatyczny”, lecz „współczujący / pełen empatii”.',
        l1InterferenceNote: 'Kolejny groźny False Friend: polskie „sympatyczny” tłumaczy się jako „friendly / nice / pleasant / likeable”.',
      },
      correct: {
        rightText: 'She is very friendly / nice, she always smiles and helps other students.',
        explanation: 'Do opisu sympatycznej, miłej osoby używamy „friendly” lub „kind”.',
        ckeStandardRule: 'Klucz CKE: sympathetic = współczujący; friendly = sympatyczny.',
      },
      tip: {
        examinerTip: 'Gdy w tekście ktoś ma kłopoty i przyjaciel oferuje mu wsparcie, to przyjaciel jest „sympathetic”. W opisie miłego kolegi z klasy użyj „friendly”!',
        examTrapFrequency: 'Pojawia się w 8/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'TRUE_FALSE_AUDIT',
      instruction: 'Oceń, czy poniższe zdanie jest poprawne w rejestrze opisu nowej koleżanki:',
      statement: 'Our new English teacher is extremely sympathetic and told us funny jokes on the first day.',
      containsCkeTrap: true,
      trapExplanation: 'Zdanie ZAWIERA BŁĄD leksykalny! Osoba opowiadająca dowcipy i miła dla uczniów jest „friendly / cheerful / pleasant”, a nie „sympathetic” (współczująca cudzym nieszczęściom).',
    },
  },

  'eng-lesson-4-3': {
    lessonId: 'eng-lesson-4-3',
    topicId: 'eng-dzial-4',
    cards: {
      error: {
        wrongText: 'This mountain trail is very danger and the climb was unpossible.',
        explanation: 'Błąd części mowy (użycie rzeczownika „danger” zamiast przymiotnika „dangerous”) oraz zły przedrostek zaprzeczający („unpossible” zamiast „impossible”).',
        l1InterferenceNote: 'Nieuwzględnienie asymilacji fonetycznej: przed literami p/b/m stosujemy przedrostek im- (impossible, impatient, impolite).',
      },
      correct: {
        rightText: 'This mountain trail is very dangerous and the climb was impossible.',
        explanation: 'Przymiotnik od „danger” to „dangerous” (-ous), a zaprzeczenie „possible” to „impossible”.',
        ckeStandardRule: 'Klucz CKE: Prawidłowe przedrostki (un-, in-, im-, dis-) i przyrostki (-ful, -less, -ous, -ment).',
      },
      tip: {
        examinerTip: 'Przedrostek IM- łączy się ze słowami zaczynającymi się na P (patient → impatient, polite → impolite, possible → impossible). Zapamiętaj skrót: IM-P!',
        examTrapFrequency: 'Pojawia się w 9/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Wybierz zdanie z poprawnie utworzonymi wyrazami pochodnymi:',
      optionA: {
        text: 'The weather was so foggy that driving was completely impossible.',
        isCorrect: true,
      },
      optionB: {
        text: 'The weather was so fog that driving was completely unpossible.',
        isCorrect: false,
      },
      trapExplanation: 'Brawo! „Foggy” to poprawny przymiotnik z podwojoną literą „g”, a „impossible” posiada właściwy przedrostek przeczący „im-”.',
      whyIncorrectExplanation: 'Opcja B zawiera dwa błędy słowotwórcze: użycie rzeczownika „fog” zamiast przymiotnika oraz błędny przedrostek „unpossible”.',
    },
  },

  // =========================================================================
  // DZIAŁ 5: PARAFRAZY I TŁUMACZENIA PL→EN
  // =========================================================================
  'eng-lesson-5-1': {
    lessonId: 'eng-lesson-5-1',
    topicId: 'eng-dzial-5',
    cards: {
      error: {
        wrongText: 'Our success depends of your hard work and commitment.',
        explanation: 'Zły dobór przyimka po czasowniku: kalka z polskiego „zależeć od” (depend of).',
        l1InterferenceNote: 'W języku polskim mówimy „zależy OD”, co skłania uczniów do wstawienia angielskiego „of” lub „from”.',
      },
      correct: {
        rightText: 'Our success depends on your hard work and commitment.',
        explanation: 'Czasownik „depend” łączy się wyłącznie z przyimkiem „on” (lub formalnie „upon”).',
        ckeStandardRule: 'Klucz CKE: depend on (nigdy depend of / from).',
      },
      tip: {
        examinerTip: 'Podobne pułapki rekcji przyimkowej: congratulate on (nie: for), spend on (nie: for), married to (nie: with).',
        examTrapFrequency: 'Pojawia się w 10/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'SPOT_AND_FIX',
      instruction: 'Wskaż poprawny przyimek w tłumaczeniu fragmentu: „Wszystko zależy od pogody”:',
      sentenceWithMistake: 'Everything depends [of] the weather tomorrow.',
      highlightedMistake: 'of',
      options: [
        { id: 'opt-1', text: 'on', isCorrect: true },
        { id: 'opt-2', text: 'from', isCorrect: false },
        { id: 'opt-3', text: 'about', isCorrect: false },
      ],
      correctedSentence: 'Everything depends on the weather tomorrow.',
      trapExplanation: 'Idealnie! „Depend ON” to jedna z najpopularniejszych pułapek w Zadaniach 10 i 11 CKE. Kategorycznie unikaj „depend of”!',
    },
  },

  'eng-lesson-5-2': {
    lessonId: 'eng-lesson-5-2',
    topicId: 'eng-dzial-5',
    cards: {
      error: {
        wrongText: 'She is married with a doctor and they live in London.',
        explanation: 'Błąd kalki językowej z polskiego zwrotu „zamężna Z lekarzem”.',
        l1InterferenceNote: 'Polskie „z” tłumaczone mechanicznie jako „with”.',
      },
      correct: {
        rightText: 'She is married to a doctor and they live in London.',
        explanation: 'W języku angielskim stan małżeństwa wyrażamy przez zwrot „married to someone”.',
        ckeStandardRule: 'Klucz CKE: married to / engaged to (nigdy with).',
      },
      tip: {
        examinerTip: 'Zapamiętaj parę: „engaged to” (zaręczony z) oraz „married to” (poślubiony komuś). Oba łączą się z przyimkiem TO!',
        examTrapFrequency: 'Pojawia się w 9/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'TRUE_FALSE_AUDIT',
      instruction: 'Oceń, czy poniższe zdanie jest w pełni poprawne pod kątem klucza CKE:',
      statement: 'Mark has been married to Sarah for over fifteen years.',
      containsCkeTrap: false,
      trapExplanation: 'Zdanie jest w 100% POPRAWNE! Użyto właściwego przyimka „to” oraz poprawnego czasu Present Perfect („has been married”) z określnikiem „for over fifteen years”.',
    },
  },

  'eng-lesson-5-3': {
    lessonId: 'eng-lesson-5-3',
    topicId: 'eng-dzial-5',
    cards: {
      error: {
        wrongText: 'This car is too much expensive for me to buy.',
        explanation: 'Niepoprawne połączenie przysłówka: przed pojedynczym przymiotnikiem stosujemy samo „too”, a nie „too much”.',
        l1InterferenceNote: 'Polskie „za bardzo drogi” prowokuje do tworzenia kalki „too much expensive”.',
      },
      correct: {
        rightText: 'This car is too expensive for me to buy.',
        explanation: 'Wzór: TOO + przymiotnik (too expensive, too hot, too small). „Too much” łączy się tylko z rzeczownikami niepoliczalnymi.',
        ckeStandardRule: 'Klucz CKE: too + przymiotnik / too much + rzeczownik niepoliczalny.',
      },
      tip: {
        examinerTip: 'Zwróć też uwagę na pozycję słowa „enough”: stoi ono PO przymiotniku (np. „warm enough”, nie: „enough warm”)!',
        examTrapFrequency: 'Pojawia się w 8/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Wybierz poprawną wersję parafrazy zdania o zbyt trudnym egzaminie:',
      optionA: {
        text: 'The test was not easy enough for most students to finish.',
        isCorrect: true,
      },
      optionB: {
        text: 'The test was not enough easy for most students to finish.',
        isCorrect: false,
      },
      trapExplanation: 'Świetnie! „Enough” w połączeniu z przymiotnikiem ZAWSZE stoi za nim: „easy enough”, „fast enough”, „rich enough”.',
      whyIncorrectExplanation: 'W opcji B słowo „enough” stoi przed przymiotnikiem („enough easy”), co na maturze CKE jest błędem składniowym.',
    },
  },

  // =========================================================================
  // DZIAŁ 6–15: SYSTEMATYCZNE POKRYCIE WSZYSTKICH FORMATÓW I DZIAŁÓW
  // =========================================================================
  'eng-lesson-6-1': {
    lessonId: 'eng-lesson-6-1',
    topicId: 'eng-dzial-6',
    cards: {
      error: {
        wrongText: 'Wybór odpowiedzi w zadaniu ze słuchu tylko dlatego, że padło w niej dosłownie to samo słowo co w nagraniu.',
        explanation: 'Pułapka Word-Spotting CKE: egzaminatorzy celowo umieszczają w dystraktorze identyczne słowo, ale w zaprzeczeniu lub innym kontekście.',
        l1InterferenceNote: 'Uczeń w stresie egzaminacyjnym łapie się znajomych dźwięków bez analizy parafrazy.',
      },
      correct: {
        rightText: 'Szukanie synonimów i parafraz wypowiedzi mówcy w kluczu odpowiedzi.',
        explanation: 'Prawidłowa odpowiedź niemal zawsze przekazuje tę samą myśl innymi słowami (np. nagranie: „it didn\'t cost a penny” ➔ klucz: „it was free”).',
        ckeStandardRule: 'Klucz CKE: Odpowiedź oparta na parafrazie myśli, nie dosłownym powtórzeniu słów.',
      },
      tip: {
        examinerTip: 'Słyszysz w audio słowo z opcji A? Zachowaj szczególną ostrożność! Bardzo często to zmyłka, a poprawna opcja to parafraza w opcji B lub C.',
        examTrapFrequency: 'Pojawia się w 10/10 zadań ze słuchu CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Mówca w nagraniu powiedział: „I decided not to purchase the ticket because it was way too pricey”. Która opcja jest poprawna?',
      optionA: {
        text: 'The speaker found the admission too expensive.',
        isCorrect: true,
      },
      optionB: {
        text: 'The speaker wanted to purchase the ticket immediately.',
        isCorrect: false,
      },
      trapExplanation: 'Znakomicie! Słowo „purchase” z nagrania zostało użyte w opcji B jako zmyłka („word-spotting trap”), podczas gdy opcja A wiernie parafrazuje myśl („pricey” = „too expensive”).',
      whyIncorrectExplanation: 'Opcja B to pułapka słowna – powtarza wyraz „purchase”, ignorując fakt, że mówca zrezygnował z zakupu!',
    },
  },

  'eng-lesson-7-1': {
    lessonId: 'eng-lesson-7-1',
    topicId: 'eng-dzial-7',
    cards: {
      error: {
        wrongText: 'Podejmowanie decyzji o dopasowaniu nagłówka po wysłuchaniu pierwszych 3 sekund wypowiedzi.',
        explanation: 'Mówca często zaczyna od pozornej opinii (np. „At first I thought it was great...”), a po spójniku „however / but” całkowicie zmienia zdanie.',
        l1InterferenceNote: 'Zbyt wczesna konkluzja przed wysłuchaniem spójników kontrastu.',
      },
      correct: {
        rightText: 'Wysłuchanie pełnej wypowiedzi ze zwróceniem uwagi na spójniki: however, although, actually, but.',
        explanation: 'Główna puenta wypowiedzi maturalnej niemal zawsze następuje po słowach kontrastujących.',
        ckeStandardRule: 'Klucz CKE: Intencja mówcy ujawnia się w drugiej części wypowiedzi.',
      },
      tip: {
        examinerTip: 'Zwróć uwagę na intonację: gdy lektor mówi entuzjastycznie na początku, a potem obniża głos ze słowem „unfortunately” – to tam kryje się odpowiedź!',
        examTrapFrequency: 'Pojawia się w 9/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'SPOT_AND_FIX',
      instruction: 'Wskaż spójnik, po którym lektor CKE zazwyczaj przedstawia swoją prawdziwą opinię:',
      sentenceWithMistake: 'The hotel looked stunning in the brochure, [because] the service was terrible.',
      highlightedMistake: 'because',
      options: [
        { id: 'opt-1', text: 'however,', isCorrect: true },
        { id: 'opt-2', text: 'and', isCorrect: false },
        { id: 'opt-3', text: 'so that', isCorrect: false },
      ],
      correctedSentence: 'The hotel looked stunning in the brochure, however, the service was terrible.',
      trapExplanation: 'Brawo! Spójnik „however” wprowadza kontrast i unieważnia początkowe pozytywne wrażenie, wskazując rzeczywistą intencję mówcy.',
    },
  },

  'eng-lesson-8-1': {
    lessonId: 'eng-lesson-8-1',
    topicId: 'eng-dzial-8',
    cards: {
      error: {
        wrongText: 'Wpisywanie do formularza ze słuchu więcej niż jednego lub dwóch słów, gdy polecenie wymaga: „one word only”.',
        explanation: 'Niezastosowanie się do limitu słów w zadaniu otwartym ze słuchu skutkuje bezwzględnym zerem punktów.',
        l1InterferenceNote: 'Niedokładne czytanie instrukcji w nagłówku zadania.',
      },
      correct: {
        rightText: 'Wpisanie dokładnie jednego wymaganego słowa lub liczby bez zbędnych rodzajników i ozdobników.',
        explanation: 'Jeśli odpowiedzią jest np. nazwa zawodu „photographer”, wpisanie „a photographer” może przekroczyć limit słów.',
        ckeStandardRule: 'Klucz CKE: Ścisłe przestrzeganie limitu wyrazów i poprawność ortograficzna.',
      },
      tip: {
        examinerTip: 'Literówki w zadaniach otwartych ze słuchu: jeśli błąd ortograficzny tworzy inne istniejące angielskie słowo (np. „son” zamiast „sun”), egzaminator nie uzna punktu!',
        examTrapFrequency: 'Pojawia się w 8/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'TRUE_FALSE_AUDIT',
      instruction: 'Oceń procedurę wypełniania luki w notatce, gdy polecenie brzmi: „Wpisz od 1 do 2 wyrazów”:',
      statement: 'Wpisanie „very interesting presentation” w luce wymagającej do 2 wyrazów zostanie ocenione na 1 punkt.',
      containsCkeTrap: true,
      trapExplanation: 'Zdanie ZAWIERA BŁĄD! Odpowiedź składa się z 3 wyrazów („very”, „interesting”, „presentation”), więc nawet jeśli sens jest poprawny, uczeń otrzymuje 0 punktów za przekroczenie limitu wyrazów.',
    },
  },

  'eng-lesson-9-1': {
    lessonId: 'eng-lesson-9-1',
    topicId: 'eng-dzial-9',
    cards: {
      error: {
        wrongText: 'Wybór nagłówka na podstawie pojedynczego pobocznego szczegółu wymienionego w jednym zdaniu akapitu.',
        explanation: 'Dystraktory w dopasowywaniu nagłówków często cytują drobny detal z tekstu, który nie jest główną myślą całego akapitu.',
        l1InterferenceNote: 'Pobieżne skanowanie tekstu i dopasowywanie pierwszego skojarzenia.',
      },
      correct: {
        rightText: 'Wybranie nagłówka, który podsumowuje ideę całego akapitu (główną myśl).',
        explanation: 'Nagłówek musi obejmować wszystkie zdania w akapicie, a nie tylko jedno przykładowe zdanie wprowadzające.',
        ckeStandardRule: 'Klucz CKE: Główna myśl akapitu (main idea) vs poboczny detal (supporting detail).',
      },
      tip: {
        examinerTip: 'Zwróć uwagę na pierwsze i ostatnie zdanie akapitu – to w nich autorzy artykułów najczęściej umieszczają zdanie-klucz (topic sentence).',
        examTrapFrequency: 'Pojawia się w 9/10 arkuszy CKE',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Akapit opisuje historię powstania kawiarni, a w jednym zdaniu wspomina, że serwują tam także ciastka. Jaki nagłówek jest poprawny?',
      optionA: {
        text: 'How the famous coffee shop was established',
        isCorrect: true,
      },
      optionB: {
        text: 'The best homemade cakes in town',
        isCorrect: false,
      },
      trapExplanation: 'Znakomicie! Opcja A to właściwy nagłówek oddający główny sens akapitu. Opcja B to typowy dystraktor oparty na pobocznym detalu.',
      whyIncorrectExplanation: 'Opcja B skupia się na jednym drobnym szczególe o ciastkach, ignorując przeważającą treść akapitu o historii założenia lokalu.',
    },
  },

  'eng-lesson-12-1': {
    lessonId: 'eng-lesson-12-1',
    topicId: 'eng-dzial-12',
    cards: {
      error: {
        wrongText: 'Odpowiedź na kropkę polecenia jednym słowem lub równoważnikiem zdania (brak rozwinięcia).',
        explanation: 'Kryteria CKE rozróżniają „odniesienie się” (1 punkt) od „rozwinięcia” (2 punkty). Pojedyncze zdanie bez szczegółu to za mało na pełną punktację.',
        l1InterferenceNote: 'Pośpiech przy pisaniu e-maila i traktowanie kropek polecenia jako prostych pytań TAK/NIE.',
      },
      correct: {
        rightText: 'Każda z 4 kropek polecenia zawiera co najmniej 2 pełne zdania (fakt + przyczyna / konsekwencja / opinia).',
        explanation: 'Przykład rozwinięcia: „Zgubiłem telefon (odniesienie). Stało się to w autobusie, gdy wracałem z treningu (rozwinięcie)”.',
        ckeStandardRule: 'Klucz CKE: 4 kropki odniesione i rozwinięte = 5/5 punktów za treść.',
      },
      tip: {
        examinerTip: 'Stosuj zasadę: 1 kropka = minimum 2 linijki tekstu (CO się stało + DLACZEGO lub CO ZROBIŁEŚ potem).',
        examTrapFrequency: 'Decyduje o 5 punktach na 12 możliwych w zadaniu 12',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Polecenie: „Napisz, jaki prezent kupiłeś koledze i wyjaśnij, dlaczego go wybrałeś”. Który fragment gwarantuje 2 punkty za tę kropkę?',
      optionA: {
        text: 'I bought him a blue hoodie because he loves skateboarding and his old jacket got torn last week.',
        isCorrect: true,
      },
      optionB: {
        text: 'I bought him a great blue hoodie as a nice birthday gift.',
        isCorrect: false,
      },
      trapExplanation: 'Wzorowo! W opcji A uczeń nie tylko podał co kupił (bluza), ale w pełni rozwinął powód wyboru (hobby kolegi + zniszczona stara kurtka).',
      whyIncorrectExplanation: 'Opcja B to tylko odniesienie się do prezentu – brak w niej rzeczywistego wyjaśnienia powodów wyboru podarunku.',
    },
  },

  'eng-lesson-13-1': {
    lessonId: 'eng-lesson-13-1',
    topicId: 'eng-dzial-13',
    cards: {
      error: {
        wrongText: 'I am writing to you because I want to tell you about my holidays...',
        explanation: 'Używanie w wypracowaniu maturalnym powtarzających się, ubogich struktur językowych i kalk ze słownika.',
        l1InterferenceNote: 'Zastępowanie bogatego słownictwa najprostszymi czasownikami (make, get, do, have).',
      },
      correct: {
        rightText: 'Urozmaicenie wypowiedzi konstrukcjami B1/B1+ (Present Perfect, zdania przydawkowe z which/who, przymiotniki emocjonalne).',
        explanation: 'Np. „I couldn\'t believe my eyes when I saw the spectacular view from the mountain top.”',
        ckeStandardRule: 'Klucz CKE: Zakres środków językowych (bogactwo leksykalne i gramatyczne).',
      },
      tip: {
        examinerTip: 'Wstaw do wypracowania przynajmniej jeden 1. lub 2. okres warunkowy oraz konstrukcję ze „since/for” – egzaminator natychmiast zauważy dojrzałość językową!',
        examTrapFrequency: 'Wpływa na 3 punkty za zakres środków językowych',
      },
    },
    challenge: {
      type: 'SPOT_AND_FIX',
      instruction: 'Wskaż bardziej dojrzałe sformułowanie maturalne dla podkreślonego zwrotu:',
      sentenceWithMistake: 'The concert was [very good] and I had fun.',
      highlightedMistake: 'very good',
      options: [
        { id: 'opt-1', text: 'absolutely unforgettable', isCorrect: true },
        { id: 'opt-2', text: 'nice enough', isCorrect: false },
        { id: 'opt-3', text: 'okey-dokey', isCorrect: false },
      ],
      correctedSentence: 'The concert was absolutely unforgettable and I had fun.',
      trapExplanation: 'Znakomity wybór! Zwrot „absolutely unforgettable” podnosi rejestr wypowiedzi pisemnej i pozwala zdobyć maksymalne 3 punkty za zakres środków językowych.',
    },
  },

  'eng-lesson-14-1': {
    lessonId: 'eng-lesson-14-1',
    topicId: 'eng-dzial-14',
    cards: {
      error: {
        wrongText: 'Pisanie wypracowania w jednym ciągłym bloku tekstu bez akapitów i logicznych łączników zdań.',
        explanation: 'Brak podziału na akapity i brak spójników logicznych (linking words) skutkuje obniżeniem punktów za spójność i logikę.',
        l1InterferenceNote: 'Zlewanie myśli w jeden potok tekstu.',
      },
      correct: {
        rightText: 'Układ 4 wyraźnych akapitów (wstęp + rozwinięcie kropek + zakończenie) z łącznikami: First of all, What is more, Unfortunately, In the end.',
        explanation: 'Każda myśl i kropka polecenia powinna stanowić osobny, przejrzysty akapit.',
        ckeStandardRule: 'Klucz CKE: Spójność i logika wypowiedzi (0–2 pkt).',
      },
      tip: {
        examinerTip: 'Zostawiaj pustą linijkę między akapitami w arkuszu – to ułatwia egzaminatorowi lekturę i gwarantuje punkty za układ graficzny!',
        examTrapFrequency: 'Kryterium Spójności i Logiki (0–2 pkt)',
      },
    },
    challenge: {
      type: 'TRUE_FALSE_AUDIT',
      instruction: 'Oceń poniższe zdanie pod kątem reguł kohezji tekstu:',
      statement: 'Zwroty „Besides,”, „Furthermore,” oraz „Moreover,” mogą być używane do wprowadzania dodatkowego argumentu w wypowiedzi.',
      containsCkeTrap: false,
      trapExplanation: 'Zdanie jest w 100% POPRAWNE! Wszystkie trzy łączniki służą do rozwijania myśli i dodawania nowych informacji (addition markers), co jest wysoko punktowane w kryterium kohezji CKE.',
    },
  },

  'eng-lesson-15-1': {
    lessonId: 'eng-lesson-15-1',
    topicId: 'eng-dzial-15',
    cards: {
      error: {
        wrongText: 'Przekroczenie lub niedobór limitu słów: napisanie mniej niż 80 lub więcej niż 130 słów.',
        explanation: 'Poniżej 80 słów praca nie może otrzymać maksymalnej liczby punktów za treść i zakres środków.',
        l1InterferenceNote: 'Brak kontroli długości wypowiedzi na brudnopisie.',
      },
      correct: {
        rightText: 'Utrzymanie objętości wypowiedzi w bezpiecznym przedziale 90–120 słów.',
        explanation: 'Wypowiedź o długości ok. 100 słów pozwala w pełni rozwinąć wszystkie 4 kropki bez ryzyka popełnienia niepotrzebnych błędów gramatycznych.',
        ckeStandardRule: 'Klucz CKE: Wymagana długość wypowiedzi w Formule 2023: 80–130 słów.',
      },
      tip: {
        examinerTip: 'Policz słowa przed przepisaniem do arkusza: 10–12 słów w linijce oznacza, że Twoja praca powinna mieć około 9–10 linijek tekstu.',
        examTrapFrequency: 'Kluczowa zasada organizacyjna zadania 12',
      },
    },
    challenge: {
      type: 'A_VS_B',
      instruction: 'Jaka jest wzorcowa strategia zarządzania długością e-maila na maturze?',
      optionA: {
        text: 'Napisanie ok. 100–110 słów, po 2 pełne zdania na każdą kropkę polecenia.',
        isCorrect: true,
      },
      optionB: {
        text: 'Napisanie 180 słów, aby zaimponować egzaminatorowi jak najdłuższym tekstem.',
        isCorrect: false,
      },
      trapExplanation: 'Dokładnie tak! Pisanie 100–110 słów to złoty środek matury CKE – wyczerpuje polecenie i minimalizuje ryzyko popełnienia błędów językowych.',
      whyIncorrectExplanation: 'Opcja B to ryzykowna pułapka: pisanie 180 słów nie daje żadnych dodatkowych punktów, a drastycznie zwiększa liczbę błędów językowych i interpunkcyjnych!',
    },
  },
};

/**
 * Zwraca dane pułapki CKE dla danej lekcji.
 * Jeśli lekcja nie ma wpisu dedykowanego, deterministycznie dobiera wzorcową pułapkę
 * odpowiadającą działowi lub filarowi, gwarantując 100% stabilności.
 */
export function getTrapDataForLesson(lessonId: string, topicId?: string): EnglishLessonTrapData {
  if (ENGLISH_TRAP_REGISTRY[lessonId]) {
    return ENGLISH_TRAP_REGISTRY[lessonId];
  }

  // Fallback oparty o topicId
  const fallbackTopic = topicId || 'eng-dzial-1';
  const matchingKeys = Object.keys(ENGLISH_TRAP_REGISTRY).filter(
    (key) => ENGLISH_TRAP_REGISTRY[key].topicId === fallbackTopic
  );

  if (matchingKeys.length > 0) {
    const baseTrap = ENGLISH_TRAP_REGISTRY[matchingKeys[0]];
    return {
      ...baseTrap,
      lessonId,
      topicId: fallbackTopic,
    };
  }

  // Globalny fallback CKE (Dział 1)
  return {
    ...ENGLISH_TRAP_REGISTRY['eng-lesson-1-1'],
    lessonId,
    topicId: fallbackTopic,
  };
}
