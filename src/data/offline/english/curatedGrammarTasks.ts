/**
 * Autorskie, zredagowane zadania do Działów 2–5 (gramatyka, słowotwórstwo, parafrazy).
 * Każde zadanie dotyczy tematu lekcji, do której jest przypisane.
 * To zadania JASNE, a nie arkusze CKE — nie oznaczamy ich jako oficjalnych.
 */
import type { EnglishTask } from '../../../types/englishTypes';
import { createCuratedBuilders, lessonIdsOf } from './curatedBuilders';

const d2 = createCuratedBuilders({ topicId: 'eng-dzial-2', sectionTitle: 'Dział 2: Konstrukcje czasownikowe: Gerund, Infinitive i Modals', sectionNumber: 2 });
const d3 = createCuratedBuilders({ topicId: 'eng-dzial-3', sectionTitle: 'Dział 3: Okresy warunkowe (Conditionals 0, 1, 2) i zdania czasowe', sectionNumber: 3 });
const d4 = createCuratedBuilders({ topicId: 'eng-dzial-4', sectionTitle: 'Dział 4: Słowotwórstwo i części mowy (Word Formation & False Friends)', sectionNumber: 4 });
const d5 = createCuratedBuilders({ topicId: 'eng-dzial-5', sectionTitle: 'Dział 5: Parafrazy zdań i tłumaczenie fragmentów PL -> EN', sectionNumber: 5 });

const L = (d: number, l: number) => `eng-lesson-${d}-${l}`;
const WORD_FORMATION = 'Uzupełnij lukę, przekształcając wyraz z nawiasu tak, aby powstało poprawne zdanie:';
const REACTION = 'Wybierz wypowiedź, która najlepiej kończy minidialog:';

export const CURATED_GRAMMAR_TASKS: EnglishTask[] = [
  // ===== Dział 2 =====
  // 2-1 Gerund vs Infinitive
  d2.choice({ lesson: L(2, 1), n: 1, title: 'Enjoy + gerundium', explanation: 'Po enjoy używamy formy -ing: enjoys working.', trap: 'Bezokolicznik z to po czasownikach, które wymagają gerundium (enjoy, avoid, finish).' },
    'She enjoys ______ in the garden at weekends.', ['work', 'working', 'to work'], 'working'),
  d2.choice({ lesson: L(2, 1), n: 2, title: 'Decide + bezokolicznik', explanation: 'Po decide następuje bezokolicznik z to: decided to take.', trap: 'Użycie formy -ing po decide, hope, plan, promise.' },
    'We decided ______ a taxi because it was raining.', ['taking', 'to take', 'take'], 'to take'),
  d2.word({ lesson: L(2, 1), n: 3, title: 'Look forward to + -ing', explanation: 'W zwrocie look forward to słowo to jest przyimkiem, więc po nim stoi gerundium: seeing.', trap: 'Bezokolicznik po look forward to (look forward to see).' },
    "I'm looking forward to (see) [GAP] you next week.", 'seeing'),
  d2.word({ lesson: L(2, 1), n: 4, title: 'Przeczenie bezokolicznika', explanation: 'Przeczenie bezokolicznika tworzymy przez not przed to: not to tell.', trap: 'Wstawienie not po to lub użycie don\'t.' },
    'He promised (not / tell) [GAP] anyone our secret.', 'not to tell'),
  d2.truth({ lesson: L(2, 1), n: 5, title: 'Let + bezokolicznik bez to', explanation: 'Po let używamy bezokolicznika bez to: My parents let me stay out late.', trap: 'Dodanie to po let i make (make me to laugh).' },
    '„My parents let me to stay out late.” jest zdaniem poprawnym.', 'FALSE'),

  // 2-2 Czasowniki modalne
  d2.choice({ lesson: L(2, 2), n: 1, title: 'Obowiązek wynikający z reguły', explanation: 'Reguła szkoły oznacza obowiązek: must (lub have to).', trap: 'Użycie might lub can\'t tam, gdzie mowa o obowiązku.' },
    'You ______ wear a uniform at this school; it is the rule.', ['must', "can't", 'might'], 'must'),
  d2.choice({ lesson: L(2, 2), n: 2, title: 'Pewność, że coś jest niemożliwe', explanation: 'Skoro Anna jest w Hiszpanii, ta torba nie może być jej: can\'t be.', trap: 'Użycie must be w znaczeniu przeciwnym do sensu zdania.' },
    "That ______ be Anna's bag. She is in Spain this week.", ["can't", 'must', 'should'], "can't"),
  d2.word({ lesson: L(2, 2), n: 3, title: 'Brak przymusu', explanation: 'Don\'t have to oznacza „nie musisz”, a nie zakaz.', trap: 'Mylenie don\'t have to z mustn\'t (zakaz).' },
    "You [GAP] pay for parking here — it's free. (not / have to)", "don't have to", ['do not have to']),
  d2.word({ lesson: L(2, 2), n: 4, title: 'Wnioskowanie o przeszłości', explanation: 'Przypuszczenie o przeszłości tworzymy przez must have + III forma: must have gone.', trap: 'Użycie must go zamiast must have gone.' },
    'The lights are off. They [GAP] to bed. (must / go)', 'must have gone'),
  d2.truth({ lesson: L(2, 2), n: 5, title: 'Mustn\'t to zakaz', explanation: 'You mustn\'t park here oznacza zakaz parkowania, a „nie musisz” to don\'t have to.', trap: 'Tłumaczenie mustn\'t jako „nie musisz”.' },
    'Zdanie „You mustn\'t park here.” oznacza, że nie musisz tu parkować.', 'FALSE'),

  // 2-3 Minidialogi i rejestr
  d2.choice({ lesson: L(2, 3), n: 1, title: 'Would you mind…?', explanation: 'Na pytanie Would you mind? odpowiadamy Not at all, gdy się zgadzamy.', trap: 'Odpowiedź Yes, która oznacza „tak, przeszkadza mi”.' },
    'A: Would you mind opening the window?\nB: ______', ['Not at all, I will do it now.', "Yes, I'd love to.", "You're welcome."], 'Not at all, I will do it now.', REACTION),
  d2.choice({ lesson: L(2, 3), n: 2, title: 'Reakcja na podziękowanie', explanation: 'Na podziękowanie odpowiadamy You\'re welcome.', trap: 'Odpowiedź Never mind lub Good luck, które pasują do innych sytuacji.' },
    'A: Thanks a lot for your help!\nB: ______', ["You're welcome.", 'Never mind.', 'Good luck!'], "You're welcome.", REACTION),
  d2.word({ lesson: L(2, 3), n: 3, title: 'Uprzejma odmowa', explanation: 'Uprzejmą odmowę poprzedzamy podziękowaniem: No, thanks (lub No, thank you).', trap: 'Samo No, które w angielskim brzmi nieuprzejmie.' },
    "A: Would you like some more cake?\nB: No, [GAP], I'm full. (thank)", 'thanks', ['thank you'], 'Uzupełnij odpowiedź jednym lub dwoma wyrazami, używając podpowiedzi z nawiasu:'),
  d2.choice({ lesson: L(2, 3), n: 4, title: 'Oficjalne zakończenie e-maila', explanation: 'W wiadomości do dyrektora wybieramy formę oficjalną: I look forward to hearing from you.', trap: 'Zastosowanie slangu (ASAP, cheers) w tekście oficjalnym.' },
    'Dear Mr Kowalski,\n\nThank you for the information about the school trip.\n\n______', ['I look forward to hearing from you.', 'Write me back ASAP!', 'Cheers, talk soon!'], 'I look forward to hearing from you.', 'Wybierz zakończenie e-maila do dyrektora szkoły. Które brzmi najbardziej oficjalnie?'),
  d2.truth({ lesson: L(2, 3), n: 5, title: 'Same to you', explanation: 'Same to you to naturalna odpowiedź na życzenia, np. Have a nice weekend!', trap: 'Używanie Same to you po pytaniach lub przeprosinach.' },
    'Odpowiedź „Same to you!” pasuje do życzenia „Have a nice weekend!”.', 'TRUE'),

  // ===== Dział 3 =====
  // 3-1 Zero & First Conditional
  d3.choice({ lesson: L(3, 1), n: 1, title: 'Zero conditional — prawda ogólna', explanation: 'Zero conditional opisuje stałe prawdy: if + Present Simple, Present Simple (melts).', trap: 'Użycie will melt w zdaniu o prawdzie naukowej.' },
    'If you heat ice, it ______.', ['melts', 'will melt', 'would melt'], 'melts'),
  d3.choice({ lesson: L(3, 1), n: 2, title: 'First conditional — realny plan', explanation: 'W części z if używamy Present Simple (rains), a will pojawia się dopiero w wyniku.', trap: 'Will po if (if it will rain).' },
    "If it ______ tomorrow, we'll stay at home.", ['rains', 'will rain', 'rained'], 'rains'),
  d3.word({ lesson: L(3, 1), n: 3, title: 'If + przeczenie', explanation: 'W części z if używamy Present Simple: don\'t hurry.', trap: 'Użycie will w części z if.' },
    "If you (not / hurry) [GAP], you'll miss the bus.", "don't hurry", ['do not hurry']),
  d3.word({ lesson: L(3, 1), n: 4, title: 'Unless zastępuje if not', explanation: 'Unless ma już znaczenie przeczące, więc po nim stoi forma twierdząca: study.', trap: 'Podwójne przeczenie (unless you don\'t study).' },
    "Unless you (study) [GAP], you won't pass the test.", 'study'),
  d3.truth({ lesson: L(3, 1), n: 5, title: 'Will po if', explanation: 'Po if używamy Present Simple: If I see her, I will tell her.', trap: 'Will w obu częściach zdania warunkowego.' },
    '„If I will see her, I will tell her.” jest zdaniem poprawnym.', 'FALSE'),

  // 3-2 Second Conditional
  d3.choice({ lesson: L(3, 2), n: 1, title: 'If I were you', explanation: 'W radzie „na twoim miejscu” używamy were: If I were you.', trap: 'Użycie am lub will be w drugim okresie warunkowym.' },
    'If I ______ you, I would apologise to her.', ['were', 'am', 'will be'], 'were'),
  d3.choice({ lesson: L(3, 2), n: 2, title: 'Wynik w second conditional', explanation: 'Wynik wyrażamy przez would + bezokolicznik: would learn.', trap: 'Will w wyniku zdania nierealnego.' },
    'If she had more time, she ______ learn Italian.', ['would', 'will', 'had'], 'would'),
  d3.word({ lesson: L(3, 2), n: 3, title: 'If + Past Simple', explanation: 'W części z if używamy Past Simple: lived.', trap: 'Would w części z if.' },
    'If we (live) [GAP] by the sea, we would swim every day.', 'lived'),
  d3.word({ lesson: L(3, 2), n: 4, title: 'Pytanie w second conditional', explanation: 'Pytanie o sytuację hipotetyczną: would you do.', trap: 'Użycie will you do po czasie przeszłym w części z if.' },
    'What (you / do) [GAP] if you won a million zlotys?', 'would you do'),
  d3.truth({ lesson: L(3, 2), n: 5, title: 'Would po if', explanation: 'Po if używamy Past Simple: If I had a car, I would drive to work.', trap: 'Would w obu częściach zdania nierealnego.' },
    '„If I would have a car, I would drive to work.” jest zdaniem poprawnym.', 'FALSE'),

  // 3-3 Zdania czasowe
  d3.choice({ lesson: L(3, 3), n: 1, title: 'As soon as + Present Simple', explanation: 'Po as soon as o przyszłości używamy Present Simple: ends.', trap: 'Will end po as soon as.' },
    "I'll text you as soon as the film ______.", ['ends', 'will end', 'ended'], 'ends'),
  d3.choice({ lesson: L(3, 3), n: 2, title: 'Until + Present Simple', explanation: 'Po until o przyszłości używamy Present Simple: come back.', trap: 'Will po until.' },
    'Wait here until I ______ back.', ['come', 'will come', 'came'], 'come'),
  d3.word({ lesson: L(3, 3), n: 3, title: 'When o przyszłości', explanation: 'Po when o przyszłości używamy Present Simple, 3. osoba: arrives.', trap: 'Zapomniane -s w 3. osobie lub użycie will arrive.' },
    "When she (arrive) [GAP], we'll start the meeting.", 'arrives'),
  d3.word({ lesson: L(3, 3), n: 4, title: 'Before + Present', explanation: 'Po before o przyszłości używamy Present Simple (lub Present Perfect): finish.', trap: 'Will finish po before.' },
    "I won't go out before I (finish) [GAP] my homework.", 'finish', ['have finished']),
  d3.truth({ lesson: L(3, 3), n: 5, title: 'Will po after', explanation: 'Po after o przyszłości używamy Present Simple: after I finish work.', trap: 'Will po spójnikach czasowych.' },
    '„I will call you after I will finish work.” jest zdaniem poprawnym.', 'FALSE'),

  // ===== Dział 4 =====
  // 4-1 Przedrostki zaprzeczające
  d4.word({ lesson: L(4, 1), n: 1, title: 'Przedrostek un-', explanation: 'Zaprzeczenie przymiotnika clear to unclear.', trap: 'Wybór przedrostka in- zamiast un-.' },
    'The instructions were (CLEAR) [GAP], so nobody knew what to do.', 'unclear', [], WORD_FORMATION),
  d4.word({ lesson: L(4, 1), n: 2, title: 'Przedrostek im-', explanation: 'Przed p stosujemy im-: impossible.', trap: 'Zapis inpossible.' },
    'It is (POSSIBLE) [GAP] to finish this report in ten minutes.', 'impossible', [], WORD_FORMATION),
  d4.word({ lesson: L(4, 1), n: 3, title: 'Przedrostek il-', explanation: 'Przed l stosujemy il-: illegal.', trap: 'Zapis unlegal lub inlegal.' },
    'He was fined for (LEGAL) [GAP] parking.', 'illegal', [], WORD_FORMATION),
  d4.choice({ lesson: L(4, 1), n: 4, title: 'Przedrostek dis-', explanation: 'Zaprzeczenie wyrazu honest to dishonest.', trap: 'Dobór przedrostka na wyczucie.' },
    'HONEST', ['dishonest', 'unhonest', 'inhonest'], 'dishonest', 'Wybierz poprawne zaprzeczenie wyrazu:'),
  d4.truth({ lesson: L(4, 1), n: 5, title: 'Irresponsible', explanation: 'Zaprzeczeniem wyrazu responsible jest irresponsible, a nie unresponsible.', trap: 'Przedrostek un- tam, gdzie występuje ir-.' },
    'Zaprzeczeniem wyrazu „responsible” jest „unresponsible”.', 'FALSE'),

  // 4-2 Przyrostki
  d4.word({ lesson: L(4, 2), n: 1, title: 'Rzeczownik od przymiotnika', explanation: 'Z przymiotnika kind tworzymy rzeczownik kindness (końcówka -ness).', trap: 'Zapis kindity lub kindment.' },
    'Her (KIND) [GAP] to strangers surprised everyone.', 'kindness', [], WORD_FORMATION),
  d4.word({ lesson: L(4, 2), n: 2, title: 'Przymiotnik z -ive', explanation: 'Przymiotnik od effect to effective.', trap: 'Użycie rzeczownika effect w miejscu przymiotnika.' },
    'This medicine is (EFFECT) [GAP] against headaches.', 'effective', [], WORD_FORMATION),
  d4.word({ lesson: L(4, 2), n: 3, title: 'Rzeczownik od czasownika', explanation: 'Z czasownika decide tworzymy rzeczownik decision.', trap: 'Zapis decideion lub decidement.' },
    'The (DECIDE) [GAP] to move abroad was not easy.', 'decision', [], WORD_FORMATION),
  d4.choice({ lesson: L(4, 2), n: 4, title: 'Przyrostek -less', explanation: 'Przyrostek -less oznacza „bez”: hopeless to „bez nadziei”.', trap: 'Pomylenie -ful („pełen”) z -less („bez”).' },
    'HOPE (bez nadziei)', ['hopeless', 'hopeful', 'hopely'], 'hopeless', 'Wybierz przymiotnik utworzony od podanego wyrazu o znaczeniu w nawiasie:'),
  d4.truth({ lesson: L(4, 2), n: 5, title: 'Employ → employment', explanation: 'Z czasownika employ tworzymy rzeczownik employment.', trap: 'Zapis employation.' },
    'Od czasownika „employ” można utworzyć rzeczownik „employment”.', 'TRUE'),

  // 4-3 False friends
  d4.choice({ lesson: L(4, 3), n: 1, title: 'Actually', explanation: 'Actually znaczy „w rzeczywistości”, a „aktualnie” to currently.', trap: 'Tłumaczenie actually jako „aktualnie”.' },
    'ACTUALLY', ['w rzeczywistości', 'aktualnie', 'obecnie'], 'w rzeczywistości', 'Wybierz poprawne polskie znaczenie angielskiego słowa:'),
  d4.choice({ lesson: L(4, 3), n: 2, title: 'Sensible', explanation: 'Sensible znaczy „rozsądny”, a „wrażliwy” to sensitive.', trap: 'Tłumaczenie sensible jako „wrażliwy”.' },
    'SENSIBLE', ['rozsądny', 'wrażliwy', 'sensowny'], 'rozsądny', 'Wybierz poprawne polskie znaczenie angielskiego słowa:'),
  d4.choice({ lesson: L(4, 3), n: 3, title: 'Library to nie księgarnia', explanation: 'Library to biblioteka. Księgarnia to bookshop.', trap: 'Pomylenie library z „libretto” lub księgarnią.' },
    'Chcę kupić książkę. Idę do ______.', ['a bookshop', 'a library', 'a libretto'], 'a bookshop', 'Wybierz poprawne słowo:'),
  d4.word({ lesson: L(4, 3), n: 4, title: 'Obecnie', explanation: 'Angielskim odpowiednikiem „obecnie” jest currently lub at the moment, a nie actually.', trap: 'Użycie actually jako „obecnie”.' },
    '[GAP] I live in Gdynia. (obecnie)', 'currently', ['at the moment'], 'Uzupełnij lukę angielskim odpowiednikiem słowa z nawiasu (nie używaj słowa actually):'),
  d4.truth({ lesson: L(4, 3), n: 5, title: 'Magazine', explanation: 'Angielskie magazine oznacza czasopismo, a magazyn to warehouse lub storeroom.', trap: 'Tłumaczenie magazine jako „magazyn”.' },
    'Angielskie „magazine” oznacza po polsku „magazyn” jako pomieszczenie do przechowywania towarów.', 'FALSE'),

  // ===== Dział 5 =====
  // 5-1 Strona bierna
  d5.choice({ lesson: L(5, 1), n: 1, title: 'Past Simple Passive', explanation: 'Zakończone zdarzenie z last year w stronie biernej: was built.', trap: 'Użycie strony czynnej (built) tam, gdzie wykonawca jest nieistotny.' },
    'The new bridge ______ last year.', ['was built', 'built', 'has built'], 'was built'),
  d5.choice({ lesson: L(5, 1), n: 2, title: 'Present Simple Passive', explanation: 'English nie wykonuje czynności, więc używamy strony biernej: is spoken.', trap: 'Strona czynna (speaks) z podmiotem, który jest przedmiotem czynności.' },
    'English ______ all over the world.', ['speaks', 'is spoken', 'is speaking'], 'is spoken'),
  d5.word({ lesson: L(5, 1), n: 3, title: 'Transformacja na stronę bierną', explanation: 'Someone stole my bike → My bike was stolen. Dopełnienie staje się podmiotem.', trap: 'Zapis was stole (zamiast III formy stolen).' },
    'Someone stole my bike yesterday. → My bike [GAP] yesterday. (steal)', 'was stolen', [], 'Uzupełnij drugie zdanie tak, aby miało to samo znaczenie co pierwsze. Użyj strony biernej:'),
  d5.word({ lesson: L(5, 1), n: 4, title: 'Present Continuous Passive', explanation: 'Trwającą czynność w stronie biernej tworzymy przez is being + III forma: is being repaired.', trap: 'Pominięcie being (is repaired).' },
    'The road [GAP] at the moment. (repair)', 'is being repaired'),
  d5.truth({ lesson: L(5, 1), n: 5, title: 'Trzecia forma czasownika', explanation: 'Po was używamy III formy: written. Poprawnie: The letter was written by my uncle.', trap: 'Użycie II formy zamiast III w stronie biernej.' },
    '„The letter was wrote by my uncle.” jest zdaniem poprawnym.', 'FALSE'),

  // 5-2 Mowa zależna
  d5.choice({ lesson: L(5, 2), n: 1, title: 'Cofnięcie czasu', explanation: 'W mowie zależnej po said czas cofamy: am → was.', trap: 'Pozostawienie czasu teraźniejszego po said.' },
    'She said, "I am tired." → She said that she ______ tired.', ['was', 'is', 'has been'], 'was', 'Wybierz poprawne dokończenie zdania w mowie zależnej:'),
  d5.choice({ lesson: L(5, 2), n: 2, title: 'Pytanie w mowie zależnej', explanation: 'W pytaniu zależnym używamy szyku zdania oznajmującego i cofamy czas: where I lived.', trap: 'Zachowanie szyku pytającego (where did I live).' },
    'He asked me, "Where do you live?" → He asked me where I ______.', ['lived', 'did I live', 'live'], 'lived', 'Wybierz poprawne dokończenie zdania w mowie zależnej:'),
  d5.word({ lesson: L(5, 2), n: 3, title: 'Will → would', explanation: 'W mowie zależnej will zmienia się w would.', trap: 'Pozostawienie will po czasie przeszłym.' },
    '"I will help you," said Tom. → Tom said he [GAP] help me.', 'would', [], 'Uzupełnij lukę jednym wyrazem tak, aby zdanie miało to samo znaczenie:'),
  d5.word({ lesson: L(5, 2), n: 4, title: 'Pytanie pośrednie', explanation: 'W pytaniu pośrednim po what time stoi szyk oznajmujący: the film starts.', trap: 'Szyk pytający (does the film start).' },
    'Do you know what time [GAP]? (the film / start)', 'the film starts', [], 'Uzupełnij pytanie pośrednie, używając wyrazów z nawiasu we właściwej formie i kolejności:'),
  d5.truth({ lesson: L(5, 2), n: 5, title: 'Szyk w mowie zależnej', explanation: 'W mowie zależnej nie stosujemy szyku pytającego: She asked me where I had put the keys.', trap: 'Zachowanie did w pytaniu zależnym.' },
    '„She asked me where did I put the keys.” jest zdaniem poprawnym.', 'FALSE'),

  // 5-3 So/such, too/enough, used to
  d5.choice({ lesson: L(5, 3), n: 1, title: 'Such a + rzeczownik', explanation: 'Przed rzeczownikiem z przymiotnikiem używamy such a: such a boring film.', trap: 'Użycie so przed rzeczownikiem.' },
    'It was ______ a boring film that we left early.', ['such', 'so', 'too'], 'such'),
  d5.choice({ lesson: L(5, 3), n: 2, title: 'Too + przymiotnik', explanation: 'Too oznacza „zbyt”: too heavy for me to carry.', trap: 'Użycie enough przed przymiotnikiem.' },
    'The box is ______ heavy for me to carry.', ['too', 'enough', 'so'], 'too'),
  d5.word({ lesson: L(5, 3), n: 3, title: 'Enough po przymiotniku', explanation: 'Enough stoi po przymiotniku: old enough.', trap: 'Wstawienie enough przed przymiotnikiem (enough old).' },
    "She isn't old [GAP] to drive a car.", 'enough', [], 'Uzupełnij lukę jednym wyrazem:'),
  d5.word({ lesson: L(5, 3), n: 4, title: 'Used to', explanation: 'Dawny nawyk, który już się skończył, wyrażamy przez used to + bezokolicznik.', trap: 'Zapis use to w zdaniu twierdzącym.' },
    'I [GAP] play the piano as a child, but I stopped.', 'used to', [], 'Uzupełnij lukę dwoma wyrazami:'),
  d5.truth({ lesson: L(5, 3), n: 5, title: 'Used to + bezokolicznik', explanation: 'Po used to stoi bezokolicznik: He used to go to school by bike.', trap: 'Dodanie -ing po used to.' },
    '„He used to going to school by bike.” jest zdaniem poprawnym.', 'FALSE'),
];

export const CURATED_GRAMMAR_TASK_IDS = lessonIdsOf(CURATED_GRAMMAR_TASKS);
