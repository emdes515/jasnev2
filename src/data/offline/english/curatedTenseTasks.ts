/**
 * Autorskie, zredagowane zadania do Działu 1 (czasy gramatyczne).
 * Każde zadanie dotyczy dokładnie tej lekcji, do której jest przypisane.
 * To zadania JASNE, a nie arkusze CKE — nie oznaczamy ich jako oficjalnych.
 */
import type { EnglishTask } from '../../../types/englishTypes';
import { createCuratedBuilders, lessonIdsOf } from './curatedBuilders';

const { choice, word, truth } = createCuratedBuilders({
  topicId: 'eng-dzial-1',
  sectionTitle: 'Dział 1: Czasy gramatyczne i aspekty w narracji i dialogu',
  sectionNumber: 1,
});

const L = (a: number) => `eng-lesson-1-${a}`;

export const CURATED_TENSE_TASKS: EnglishTask[] = [
  // 1-1 Present Simple vs Present Continuous
  choice({ lesson: L(1), n: 1, title: 'Nawyk kontra sytuacja tymczasowa', explanation: 'Normally sygnalizuje stały nawyk (Present Simple: I go), a this week — sytuację tymczasową (Present Continuous).', trap: 'Dobranie czasu do całego zdania zamiast do słowa-sygnału.' },
    'Normally I ______ to school by bus, but this week my dad is driving me.', ['go', 'am going', 'went'], 'go'),
  choice({ lesson: L(1), n: 2, title: 'Czynność w trakcie mówienia', explanation: 'Be quiet! wskazuje na czynność dziejącą się teraz, więc potrzebny jest Present Continuous: is sleeping.', trap: 'Present Simple po zwrotach „Look!”, „Listen!”, „Be quiet!”.' },
    'Be quiet! The baby ______ in the next room.', ['sleeps', 'is sleeping', 'sleep'], 'is sleeping'),
  word({ lesson: L(1), n: 3, title: 'Look! — Present Continuous', explanation: 'Look! oznacza „dzieje się teraz”: is snowing. Forma skrócona it\'s snowing też jest poprawna.', trap: 'Wpisanie samego snows lub snowing bez is.' },
    'Look! It (snow) [GAP] outside.', 'is snowing', ["'s snowing"]),
  word({ lesson: L(1), n: 4, title: 'Końcówka -s w 3. osobie', explanation: 'Never to słowo-sygnał nawyku. Dla she dodajemy -s: drinks.', trap: 'Pominięcie -s (she drink) — błąd, który kosztuje punkt.' },
    'She never (drink) [GAP] coffee in the evening.', 'drinks'),
  truth({ lesson: L(1), n: 5, title: 'Czasowniki stanu', explanation: 'Like to czasownik stanu i nie przyjmuje -ing. Poprawnie: My sister likes pizza very much.', trap: 'Dodanie -ing do czasowników stanu (like, know, want).' },
    '„My sister is liking pizza very much.” jest zdaniem poprawnym.', 'FALSE'),

  // 1-2 Past Simple vs Past Continuous
  choice({ lesson: L(2), n: 1, title: 'Tło i przerwanie', explanation: 'Czynność w toku w momencie przerwania opisujemy w Past Continuous: was taking. Przerywa ją krótkie zdarzenie (rang) w Past Simple.', trap: 'Użycie Past Simple dla obu czynności.' },
    'When the phone rang, I ______ a shower.', ['took', 'was taking', 'have taken'], 'was taking'),
  choice({ lesson: L(2), n: 2, title: 'Krótka czynność przerywająca', explanation: 'Krótkie, jednorazowe zdarzenie (zgubienie klucza) to Past Simple: lost. Tło (was running) jest w Past Continuous.', trap: 'Past Continuous dla krótkiego, zakończonego zdarzenia.' },
    'She ______ the key while she was running for the bus.', ['lost', 'was losing', 'loses'], 'lost'),
  word({ lesson: L(2), n: 3, title: 'While — czynność w toku', explanation: 'While wprowadza czynność trwającą: were waiting. Podmiot we wymaga were.', trap: 'Użycie was zamiast were przy we.' },
    'While we (wait) [GAP] for the train, it started to rain.', 'were waiting'),
  word({ lesson: L(2), n: 4, title: 'Przeczenie w Past Simple', explanation: 'Zakończone zdarzenie w przeszłości: did not see. Po did czasownik wraca do formy podstawowej.', trap: 'Wpisanie did not saw (podwójne zaznaczenie przeszłości).' },
    'He [GAP] the stop sign because he was texting. (not / see)', 'did not see', ["didn't see"]),
  truth({ lesson: L(2), n: 5, title: 'Czy film już trwał?', explanation: 'Past Continuous (was watching) oznacza, że czynność była w toku o 20:00, a nie że dopiero się zaczęła.', trap: 'Uznanie Past Continuous za zwykłe zdarzenie jednorazowe.' },
    'W zdaniu „At 8 p.m. I was watching a film.” film trwał już o godzinie 20:00.', 'TRUE'),

  // 1-3 Present Perfect Simple
  choice({ lesson: L(3), n: 1, title: 'Since czy for?', explanation: 'Po since podajemy punkt w czasie (2019), po for — okres (for five years).', trap: 'Zamiana since i for.' },
    'I have lived in Gdańsk ______ 2019.', ['for', 'since', 'during'], 'since'),
  choice({ lesson: L(3), n: 2, title: 'Pytanie o doświadczenie', explanation: 'Pytanie o doświadczenie życiowe zawiera ever: Have you ever been to Scotland?', trap: 'Wstawienie yet w pytaniu o doświadczenie życiowe.' },
    'Have you ______ been to Scotland?', ['yet', 'ever', 'already'], 'ever'),
  word({ lesson: L(3), n: 3, title: 'Skutek widoczny teraz', explanation: 'Nie mogę otworzyć drzwi teraz, więc liczy się skutek: have lost.', trap: 'Past Simple (lost) mimo skutku widocznego teraz.' },
    "I can't open the door. I (lose) [GAP] my keys.", 'have lost', ["'ve lost"]),
  word({ lesson: L(3), n: 4, title: 'Yet w przeczeniu', explanation: 'Yet w przeczeniu wymaga Present Perfect: has not called. Dla he używamy has, nie have.', trap: 'Użycie have zamiast has.' },
    'My brother (not / call) [GAP] me yet.', 'has not called', ["hasn't called"]),
  truth({ lesson: L(3), n: 5, title: 'Zakończony czas = Past Simple', explanation: 'Last week to zakończony okres, więc potrzebny jest Past Simple: I saw that film last week.', trap: 'Present Perfect z określeniem zakończonego czasu (last week, yesterday, in 2020).' },
    '„I have seen that film last week.” jest zdaniem poprawnym.', 'FALSE'),

  // 1-4 Present Perfect vs Past Simple
  choice({ lesson: L(4), n: 1, title: 'Konkretny rok', explanation: 'In 2022 to konkretny, zakończony moment, więc używamy Past Simple: went.', trap: 'Present Perfect z konkretną datą.' },
    'We ______ to Rome in 2022.', ['have been', 'went', 'have gone'], 'went'),
  choice({ lesson: L(4), n: 2, title: 'Niezakończony okres', explanation: 'So far this morning oznacza okres, który trwa, więc potrzebny jest Present Perfect: has written.', trap: 'Past Simple mimo trwającego okresu (this morning, today, so far).' },
    'Tom ______ three emails so far this morning.', ['has written', 'wrote', 'was writing'], 'has written'),
  word({ lesson: L(4), n: 3, title: 'Pytanie o konkretny moment', explanation: 'Gdy pytamy kiedy, mamy zakończony moment: did you buy.', trap: 'When + Present Perfect (When have you bought…).' },
    'When (you / buy) [GAP] this jacket?', 'did you buy'),
  word({ lesson: L(4), n: 4, title: 'Doświadczenie życiowe', explanation: 'Doświadczenie bez czasu: have never eaten. Never stoi po have.', trap: 'Past Simple (ate) w zdaniu o doświadczeniu życiowym.' },
    "I (never / eat) [GAP] sushi, so I'm a bit nervous.", 'have never eaten', ["'ve never eaten"]),
  truth({ lesson: L(4), n: 5, title: 'Since — czynność trwa', explanation: 'Present Perfect z since łączy przeszłość z teraźniejszością, czyli ona nadal tu pracuje.', trap: 'Tłumaczenie Present Perfect jako przeszłości zakończonej.' },
    'Zdanie „She has worked here since 2020.” oznacza, że ona nadal tu pracuje.', 'TRUE'),

  // 1-5 Past Perfect
  choice({ lesson: L(5), n: 1, title: 'Pociąg odjechał wcześniej', explanation: 'Odjazd nastąpił przed dotarciem na stację, więc czynność wcześniejsza to Past Perfect: had left.', trap: 'Past Simple dla obu czynności i utrata kolejności zdarzeń.' },
    'By the time I got to the station, the train ______.', ['had left', 'has left', 'was leaving'], 'had left'),
  choice({ lesson: L(5), n: 2, title: 'Powód w zaprzeszłości', explanation: 'Zostawienie portfela wydarzyło się przed złym samopoczuciem, więc: had left.', trap: 'Past Simple (left) bez zaznaczenia wcześniejszej kolejności.' },
    'She was upset because she ______ her wallet on the bus.', ['left', 'had left', 'has left'], 'had left'),
  word({ lesson: L(5), n: 3, title: 'After + Past Perfect', explanation: 'Po after pierwsza czynność to Past Perfect: had finished. Skrócona forma he\'d finished też jest poprawna.', trap: 'Past Simple po after bez Past Perfect.' },
    'After he (finish) [GAP] his dinner, he went for a walk.', 'had finished', ["he'd finished", "'d finished"]),
  word({ lesson: L(5), n: 4, title: 'Przeczenie w Past Perfect', explanation: 'Powód niewiedzy leży w zaprzeszłości: had not read.', trap: 'Użycie did not read bez Past Perfect.' },
    "I didn't know the answer because I (not / read) [GAP] the chapter.", 'had not read', ["hadn't read"]),
  truth({ lesson: L(5), n: 5, title: 'Kto był pierwszy?', explanation: 'Had gone mówi, że mama wyszła wcześniej niż moje przebudzenie.', trap: 'Odwrócenie kolejności zdarzeń w zdaniu z Past Perfect.' },
    'Zdanie „When I woke up, my mum had gone to work.” oznacza, że mama wyszła przed moim przebudzeniem.', 'TRUE'),

  // 1-6 Czasy przyszłe
  choice({ lesson: L(6), n: 1, title: 'Przewidywanie na podstawie dowodu', explanation: 'Look at those clouds! to dowód widoczny teraz, więc używamy be going to: is going to rain.', trap: 'Will przy przewidywaniu opartym na widocznym dowodzie.' },
    'Look at those clouds! It ______ rain.', ['is going to', 'will', 'is raining'], 'is going to'),
  choice({ lesson: L(6), n: 2, title: 'Rozkład jazdy', explanation: 'Oficjalne rozkłady opisujemy w Present Simple: leaves.', trap: 'Will leave tam, gdzie mowa o oficjalnym rozkładzie.' },
    'The train ______ at 7:45 tomorrow.', ['leaves', 'left', 'has left'], 'leaves'),
  word({ lesson: L(6), n: 3, title: 'Ustalony plan', explanation: 'Ustaliliśmy spotkanie, więc używamy Present Continuous: am meeting.', trap: 'Will meet przy ustalonym wcześniej planie.' },
    "I (meet) [GAP] my cousin at 5 p.m. tomorrow — we've arranged it.", 'am meeting', ["'m meeting"]),
  word({ lesson: L(6), n: 4, title: 'Opinia o przyszłości', explanation: 'Po I think przewidujemy bez dowodu: will be.', trap: 'Be going to bez żadnych widocznych dowodów.' },
    'I think it (be) [GAP] sunny tomorrow.', 'will be', ["'ll be"]),
  truth({ lesson: L(6), n: 5, title: 'Czas po when', explanation: 'Po when mówiącym o przyszłości używamy Present Simple: I will call you when I arrive.', trap: 'Will po spójnikach when, as soon as, if.' },
    '„I will call you when I will arrive.” jest zdaniem poprawnym.', 'FALSE'),

  // 1-7 Present Perfect Continuous i miks czasów
  choice({ lesson: L(7), n: 1, title: 'Skutek trwającej czynności', explanation: 'Zmęczenie jest skutkiem czynności, która trwała przez pewien czas, więc: has been running.', trap: 'Present Continuous przy czynności zakończonej chwilę temu.' },
    'She is tired because she ______ for two hours.', ['has been running', 'is running', 'ran'], 'has been running'),
  choice({ lesson: L(7), n: 2, title: 'Czynność od określonego momentu', explanation: 'Since 6 o\'clock i trwanie czynności prowadzą do: have been waiting.', trap: 'Present Simple (wait) przy since.' },
    "I ______ for you since 6 o'clock!", ['wait', 'have been waiting', 'am waiting'], 'have been waiting'),
  word({ lesson: L(7), n: 3, title: 'How long + Present Perfect Continuous', explanation: 'How long pyta o czas trwania, więc: have you been learning.', trap: 'How long do you learn / did you learn.' },
    'How long (you / learn) [GAP] English?', 'have you been learning'),
  choice({ lesson: L(7), n: 4, title: 'Czasownik stanu w Present Perfect', explanation: 'Know jest czasownikiem stanu, więc używamy Present Perfect Simple: have known, a nie formy ciągłej.', trap: 'Present Perfect Continuous (have been knowing) przy czasowniku stanu.' },
    'I ______ him since we were children, so I know him well.', ['know', 'have known', 'am knowing'], 'have known'),
  truth({ lesson: L(7), n: 5, title: 'Know nie przyjmuje formy ciągłej', explanation: 'Know nie występuje w formach ciągłych. Poprawnie: I have known him for years.', trap: 'Łączenie czasownika stanu z formą ciągłą.' },
    '„I have been knowing him for years.” jest zdaniem poprawnym.', 'FALSE'),
];

export const CURATED_TENSE_TASK_IDS = lessonIdsOf(CURATED_TENSE_TASKS);
