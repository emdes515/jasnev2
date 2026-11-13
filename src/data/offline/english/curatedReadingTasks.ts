/**
 * Autorskie, zredagowane zadania do Działów 9–11 (rozumienie tekstów pisanych).
 * Każda lekcja ma własne teksty. To zadania JASNE, a nie arkusze CKE.
 */
import type { EnglishTask } from '../../../types/englishTypes';
import { createCuratedBuilders, lessonIdsOf } from './curatedBuilders';

const section = (n: number, title: string) => createCuratedBuilders({ topicId: `eng-dzial-${n}`, sectionTitle: title, sectionNumber: n, pillar: 'reading' });
const d9 = section(9, 'Dział 9: Dobieranie nagłówków do akapitów (Headings Matching A–D)');
const d10 = section(10, 'Dział 10: Uzupełnianie luk brakującymi zdaniami (Gapped Text A–E)');
const d11 = section(11, 'Dział 11: Artykuły, teksty narracyjne i mediacja językowa (MCQ ABCD & Notatki)');

const L = (d: number, l: number) => `eng-lesson-${d}-${l}`;
const HEADING = 'Wybierz nagłówek (A–D), który najlepiej podsumowuje cały akapit:';
const GAP = 'Wybierz zdanie (A–D), które najlepiej uzupełnia lukę [LUKA] w tekście:';

// ===== Teksty =====
const BIKES = 'In many Polish cities, bike-sharing schemes have grown faster than anyone expected. Commuters pick up a bike near the station, ride to the office and leave it at a designated stand. Councils say this has reduced traffic in the centre, and users say they save both time and money.';
const LIBRARY = 'Public libraries are no longer just places to borrow books. Many now offer free coding workshops, quiet rooms for students and even tool-lending services for neighbours. Staff say that visitors stay longer and come for more reasons than ever before.';
const CANTEEN = 'The school canteen in Gdynia has changed its menu. Students can now choose vegetarian dishes, fresh salads and fruit instead of fried snacks. Teachers noticed that pupils are more focused after lunch, and the canteen manager says that food waste has fallen by a third.';
const SHELTER = 'More teenagers are volunteering at animal shelters. They walk dogs, clean cages and help new owners choose a pet. Shelter managers say the young volunteers are reliable, and many of them say the experience helped them decide on a future career.';
const SOLAR = 'Many Polish homes now produce their own electricity. Solar panels on the roof can cover most of a family\'s needs in summer, and any extra energy is sold back to the grid. The price of panels has dropped sharply over the last decade, so more households can afford them.';
const NIGHTBUS = 'City buses used to stop running at midnight, which left night-shift workers and students without a way home. Since the introduction of night lines, several thousand passengers use them every weekend. The council plans to add more routes if the numbers keep growing.';
const FESTIVAL = 'The Gdańsk Youth Film Festival takes place from 12 to 14 June at the Baltic Cinema. Tickets cost 15 zloty for students and 25 zloty for adults. The programme includes 20 short films by teenage directors, and a workshop on editing starts at 10 a.m. on Saturday.';
const MALL = 'The new shopping centre opened last Friday and has 120 shops. In my opinion, it is the ugliest building in the city. The mayor, however, called it "a great success for local business".';
const NOISE = 'Scientists measured the noise in the school corridor and found it reached 85 decibels. It is absolutely shocking that nobody has done anything about it. Surely a quieter corridor would help everyone to learn.';
const BIKE_ADS = 'A. City Bikes: 20 zloty per day, helmet included, open 9 a.m. – 6 p.m.\nB. Green Wheels: 15 zloty per day, helmet costs 5 zloty extra, open 10 a.m. – 8 p.m.\nC. Speedy Rent: 30 zloty per day, electric bikes only, open 8 a.m. – 4 p.m.';

export const CURATED_READING_TASKS: EnglishTask[] = [
  // ===== 9-1 Zdanie przewodnie =====
  d9.readChoice({ lesson: L(9, 1), n: 1, title: 'Nagłówek: rowery miejskie', explanation: 'Pierwsze zdanie mówi o szybkim rozwoju rowerów miejskich, a reszta pokazuje, jak zmieniają dojazdy. Nagłówek A obejmuje całość.', trap: 'Wybór nagłówka dotyczącego tematu, którego w tekście nie ma (historia roweru, naprawa).' },
    BIKES, HEADING, ['Shared bikes change how people travel to work', 'The history of the bicycle', 'Why cyclists dislike public transport', 'How to repair a broken bike chain'], 'A'),
  d9.readChoice({ lesson: L(9, 1), n: 2, title: 'Nagłówek: biblioteki', explanation: 'Akapit wylicza nowe usługi bibliotek i podsumowuje je zdaniem, że to nie tylko wypożyczanie książek. Pasuje nagłówek A.', trap: 'Nagłówek zbyt wąski albo sprzeczny z tekstem (zamykanie bibliotek).' },
    LIBRARY, HEADING, ['Libraries offer far more than books', 'Libraries are closing across the country', 'A guide to borrowing tools', 'Why students avoid quiet rooms'], 'A'),
  d9.readTruth({ lesson: L(9, 1), n: 3, title: 'Gdzie jest zdanie przewodnie?', explanation: 'W akapicie o rowerach pierwsze zdanie wprowadza główną myśl, a kolejne ją rozwijają.', trap: 'Szukanie głównej myśli w ostatnim zdaniu zamiast w całości akapitu.' },
    BIKES, 'Pierwsze zdanie akapitu o rowerach miejskich jest jego zdaniem przewodnim.', 'TRUE'),
  d9.readTruth({ lesson: L(9, 1), n: 4, title: 'Szczegół to nie zdanie przewodnie', explanation: 'Zdanie o dłuższych wizytach to szczegół. Główna myśl brzmi: biblioteki oferują dziś więcej niż książki.', trap: 'Uznanie szczegółu za główną myśl akapitu.' },
    LIBRARY, 'Zdanie „Staff say that visitors stay longer…” jest zdaniem przewodnim akapitu o bibliotekach.', 'FALSE'),
  d9.readWord({ lesson: L(9, 1), n: 5, title: 'Słowo z tekstu', explanation: 'W akapicie o bibliotekach słowo neighbours oznacza mieszkańców sąsiedztwa.', trap: 'Zapis neighbours bez litery u (neigbours).' },
    LIBRARY, 'Znajdź w tekście wyraz oznaczający „sąsiedzi” i wpisz go: [GAP]', 'neighbours', ['neighbors'], 'Uzupełnij lukę jednym wyrazem z tekstu:'),

  // ===== 9-2 Nagłówek ogólny vs za wąski =====
  d9.readChoice({ lesson: L(9, 2), n: 1, title: 'Nagłówek: stołówka', explanation: 'Akapit opisuje zmianę jadłospisu i kilka skutków. Nagłówek A obejmuje całość, a pozostałe są zbyt wąskie lub nieprawdziwe.', trap: 'Nagłówek oparty na jednym detalu albo na informacji spoza tekstu.' },
    CANTEEN, HEADING, ['A healthier menu brings several benefits', 'Fried snacks are cheaper than salads', "One teacher's favourite lunch", 'Why students dislike school lunches'], 'A'),
  d9.readChoice({ lesson: L(9, 2), n: 2, title: 'Który nagłówek jest za wąski?', explanation: 'Nagłówek B opisuje tylko jeden szczegół (marnowanie jedzenia), a cały akapit dotyczy zmiany jadłospisu.', trap: 'Wybór nagłówka, który zgadza się z tekstem, ale obejmuje tylko jedno zdanie.' },
    CANTEEN, 'Który z nagłówków jest zbyt wąski, bo opisuje tylko jeden szczegół akapitu?', ['A change of menu at a Gdynia school', 'Food waste falls by a third', 'School lunches: what has changed', 'A cooking competition for teachers'], 'B'),
  d9.readChoice({ lesson: L(9, 2), n: 3, title: 'Nagłówek: wolontariat', explanation: 'Akapit pokazuje, co robią młodzi wolontariusze i jak ocenia ich praca. Nagłówek A oddaje sens całości.', trap: 'Nagłówek zbyt ogólny albo niezgodny z tekstem.' },
    SHELTER, HEADING, ['Young people find purpose in helping animals', 'Dogs are not allowed in shelters', 'Cats are the most popular pets', 'The cost of building a new shelter'], 'A'),
  d9.readTruth({ lesson: L(9, 2), n: 4, title: 'Zbyt wąski nagłówek', explanation: 'Nagłówek „Teenagers clean cages” opisuje jedną z kilku czynności, więc nie podsumowuje akapitu.', trap: 'Nagłówek oparty na pierwszym napotkanym szczególe.' },
    SHELTER, 'Nagłówek „Teenagers clean cages” dobrze podsumowuje cały akapit o wolontariuszach.', 'FALSE'),
  d9.readWord({ lesson: L(9, 2), n: 5, title: 'Uzupełnij nagłówek', explanation: 'W tekście mowa o schroniskach dla zwierząt: animal shelters.', trap: 'Zapis w liczbie pojedynczej (shelter), gdy w nagłówku jest liczba mnoga.' },
    SHELTER, 'Young people help at animal [GAP]', 'shelters', [], 'Uzupełnij nagłówek jednym wyrazem z tekstu:'),

  // ===== 9-3 Skimming i parafrazy =====
  d9.readChoice({ lesson: L(9, 3), n: 1, title: 'Nagłówek jako parafraza', explanation: 'Home-made power to parafraza własnej produkcji prądu, a affordable odpowiada spadkowi cen paneli.', trap: 'Szukanie tych samych słów w tekście i nagłówku zamiast tego samego sensu.' },
    SOLAR, HEADING, ['Home-made power becomes affordable', 'Solar panels are banned on old roofs', 'Why summers are getting hotter', 'Electricity bills have doubled'], 'A'),
  d9.readWord({ lesson: L(9, 3), n: 2, title: 'Parafraza zdania o cenach', explanation: 'Zdanie „The price of panels has dropped sharply” znaczy, że panele stały się znacznie tańsze: cheaper.', trap: 'Wpisanie wyrazu o przeciwnym znaczeniu (more expensive).' },
    SOLAR, 'Panels have become much [GAP] than before.', 'cheaper', [], 'Uzupełnij parafrazę zdania o cenie paneli jednym wyrazem:'),
  d9.readChoice({ lesson: L(9, 3), n: 3, title: 'Nagłówek: nocne autobusy', explanation: 'Tekst mówi o autobusach nocnych, które rozwiązały realny problem. Nagłówek A odpowiada całości.', trap: 'Nagłówek o temacie z tekstu, którego akapit w ogóle nie rozwija.' },
    NIGHTBUS, HEADING, ['Night buses meet a real need', 'Taxis are cheaper than buses', 'A new design for city buses', 'Workers strike for higher pay'], 'A'),
  d9.readChoice({ lesson: L(9, 3), n: 4, title: 'Parafraza zdania', explanation: 'Left … without a way home znaczy, że nie mieli czym wrócić.', trap: 'Dosłowne rozumienie słów zamiast sensu zdania.' },
    NIGHTBUS, 'Które zdanie ma to samo znaczenie co „left night-shift workers and students without a way home”?', ['Night-shift workers and students had no transport home', 'Night-shift workers and students lost their keys', 'Students lived far from school', 'Workers refused to go home'], 'A'),
  d9.readTruth({ lesson: L(9, 3), n: 5, title: 'Skanowanie tekstu', explanation: 'Plany rozbudowy tras są w ostatnim zdaniu, więc przy szybkim szukaniu informacji wystarczy do niego przejść.', trap: 'Czytanie całości, gdy informacja jest w jednym zdaniu.' },
    NIGHTBUS, 'Aby sprawdzić, czy miasto planuje nowe trasy, wystarczy przeczytać ostatnie zdanie akapitu o nocnych autobusach.', 'TRUE'),

  // ===== 10-1 Zaimki jako wskazówki =====
  d10.readChoice({ lesson: L(10, 1), n: 1, title: 'Zaimek she wskazuje Maya', explanation: 'Kolejne zdanie mówi o niej (her), więc luka musi zawierać osobę w liczbie pojedynczej: She.', trap: 'Wybór zdania z zaimkiem, który nie ma w tekście swojego odpowiednika (They, He).' },
    'Maya joined the school robotics club in September. [LUKA] It took her three weeks to build a robot that could follow a line on the floor.',
    GAP, ['She had never worked with electronics before.', 'They had never worked with electronics before.', 'It had never worked in the classroom before.', 'He had many years of experience.'], 'A'),
  d10.readChoice({ lesson: L(10, 1), n: 2, title: 'That is why', explanation: 'Zwrot „That is why” wymaga w luce przyczyny. Owady mogą użądlić, więc dziadek nosi kombinezon.', trap: 'Wybór zdania na ten sam temat, ale bez związku przyczynowego.' },
    'My grandfather keeps bees in his garden. [LUKA] That is why he wears a special suit when he opens the hives.',
    GAP, ['The insects can sting if they feel threatened.', 'Honey is sold in the village shop.', 'His garden is full of apple trees.', 'The hives are painted blue.'], 'A'),
  d10.readChoice({ lesson: L(10, 1), n: 3, title: 'Because of this', explanation: 'Fraza „Because of this” odnosi się do zdania z luki. Kolejki są powodem sprzedaży biletów online.', trap: 'Pominięcie, że this musi wskazywać na zdanie w luce.' },
    'The museum opens at nine, but queues start much earlier. [LUKA] Because of this, the staff began selling tickets online.',
    GAP, ['Many visitors want to avoid waiting for hours.', 'The paintings were cleaned last spring.', 'Entry is free on the first Sunday.', 'The café has a new menu.'], 'A'),
  d10.readTruth({ lesson: L(10, 1), n: 4, title: 'Do czego odnosi się This?', explanation: 'This odnosi się do całej sytuacji: telefon zgubiony i znaleziony.', trap: 'Zawężenie zaimka do jednego rzeczownika.' },
    'Tom lost his phone, but he found it the next day. This made him careful.',
    'W zdaniu „This made him careful” słowo „This” odnosi się do zgubienia telefonu i jego odnalezienia.', 'TRUE'),
  d10.readWord({ lesson: L(10, 1), n: 5, title: 'Wpisz zaimek', explanation: 'The twins to osoby w liczbie mnogiej, więc w kolejnym zdaniu potrzebny jest zaimek They.', trap: 'Wpisanie He lub It zamiast zaimka w liczbie mnogiej.' },
    '', 'The twins love football. [GAP] play every Saturday.', 'They', [], 'Wpisz jeden zaimek osobowy, który uzupełnia lukę:'),

  // ===== 10-2 Łączniki logiczne =====
  d10.readChoice({ lesson: L(10, 2), n: 1, title: 'Skutek', explanation: 'Tanie bilety to przyczyna, rezerwacja to skutek. Pasuje therefore.', trap: 'Wybór however tam, gdzie zdanie nie zawiera przeciwstawienia.' },
    'The tickets were cheap; ______, we booked the whole weekend.', 'Wybierz łącznik, który poprawnie uzupełnia lukę:', ['therefore', 'however', 'although', 'unless'], 'A'),
  d10.readChoice({ lesson: L(10, 2), n: 2, title: 'Przeciwstawienie', explanation: 'Uczyła się, a nie zdała, więc potrzebny jest łącznik przeciwstawny: However.', trap: 'Użycie Therefore, które sugeruje skutek.' },
    'She studied hard. ______, she failed the test.', 'Wybierz łącznik, który poprawnie uzupełnia lukę:', ['However', 'Therefore', 'Moreover', 'For example'], 'A'),
  d10.readChoice({ lesson: L(10, 2), n: 3, title: 'On the other hand', explanation: 'Druga część zdania wprowadza kontrast: lubi wędrówki, ale nie lubi biwakowania.', trap: 'Wybór In addition, który dodaje informację tego samego rodzaju.' },
    "I like hiking. ______, I don't enjoy camping.", 'Wybierz łącznik, który poprawnie uzupełnia lukę:', ['On the other hand', 'As a result', 'In addition', 'For instance'], 'A'),
  d10.readWord({ lesson: L(10, 2), n: 4, title: 'Przyczyna i skutek', explanation: 'Choroba jest przyczyną, a pozostanie w domu skutkiem: so, therefore lub thus.', trap: 'Wpisanie but, które przeciwstawia zamiast łączyć przyczynę ze skutkiem.' },
    '', 'He was ill. [GAP], he stayed at home.', 'So', ['Therefore', 'Thus'], 'Wpisz jeden łącznik oznaczający „dlatego”:'),
  d10.readTruth({ lesson: L(10, 2), n: 5, title: 'Moreover', explanation: 'Moreover dodaje kolejną informację tego samego rodzaju, a nie przeciwstawia.', trap: 'Mylenie łączników dodających z przeciwstawnymi.' },
    'He studies hard. Moreover, he volunteers at weekends.', 'Spójnik „moreover” wprowadza zdanie, które przeciwstawia się poprzedniemu.', 'FALSE'),

  // ===== 10-3 Kontekst przed i po luce =====
  d10.readChoice({ lesson: L(10, 3), n: 1, title: 'Zapach chleba', explanation: 'Kolejne zdanie mówi o czekaniu na pierwszy domowy chleb, więc luka opisuje otwarcie piekarnika i zapach chleba.', trap: 'Wybór zdania na zupełnie inny temat, np. o bracie na boisku.' },
    'Anna opened the oven door carefully. [LUKA] She had been waiting all afternoon to taste her first homemade bread.',
    GAP, ['The smell of fresh bread filled the kitchen.', 'Her brother was playing football outside.', 'The oven had been broken for years.', 'She decided to buy a new coat.'], 'A'),
  d10.readChoice({ lesson: L(10, 3), n: 2, title: 'Spóźniony pociąg', explanation: 'Fortunately i he still reached the interview wskazują, że wcześniej pojawiła się obawa o spóźnienie.', trap: 'Pominięcie zdania po luce, które wyjaśnia, jaka informacja musi być w środku.' },
    'The train was thirty minutes late. [LUKA] Fortunately, he had left home early, so he still reached the interview on time.',
    GAP, ['Daniel started to worry about missing his interview.', 'Daniel had a very quiet breakfast.', 'The station café was closed for repairs.', 'Daniel bought a new suit that morning.'], 'A'),
  d10.readChoice({ lesson: L(10, 3), n: 3, title: 'Torby wielokrotnego użytku', explanation: 'As a result mówi o mniejszej liczbie plastikowych toreb, więc luka powinna wskazywać przyczynę, np. opłatę za torby plastikowe.', trap: 'Wybór zdania zgodnego tylko z poprzednim zdaniem.' },
    'Many shops now offer reusable bags. [LUKA] As a result, fewer plastic bags end up in the sea.',
    GAP, ['Customers are asked to pay a small fee for plastic ones.', 'The shops open earlier on Sundays.', 'Some cafés sell cheaper coffee.', 'Bags are usually made in Asia.'], 'A'),
  d10.readTruth({ lesson: L(10, 3), n: 4, title: 'Czytaj obie strony luki', explanation: 'Zdanie przed luką i po niej razem zawężają wybór, więc trzeba przeczytać oba.', trap: 'Sprawdzanie tylko zdania przed luką.' },
    'Zadanie z luką wymaga wyboru brakującego zdania.', 'Aby dobrać zdanie do luki, trzeba przeczytać zarówno zdanie przed luką, jak i zdanie po niej.', 'TRUE'),
  d10.readWord({ lesson: L(10, 3), n: 5, title: 'Wniosek z kontekstu', explanation: 'Następny autobus jedzie dopiero za godzinę, więc bohater poszedł pieszo. Pasuje łącznik so.', trap: 'Wpisanie but, które nie pasuje do związku przyczynowego.' },
    '', 'Tom missed the bus. The next one was due in an hour, [GAP] he walked to school.', 'so', [], 'Wpisz jeden wyraz, który łączy przyczynę ze skutkiem:'),

  // ===== 11-1 Przenoszenie informacji =====
  d11.readWord({ lesson: L(11, 1), n: 1, title: 'Notatka: czas trwania', explanation: 'Od 12 do 14 czerwca to trzy dni (12, 13 i 14).', trap: 'Odjęcie 14 − 12 i wpisanie 2 zamiast liczenia wszystkich dni.' },
    FESTIVAL, 'Uzupełnij notatkę: The festival lasts [GAP] days.', '3', ['three'], 'Wpisz liczbę lub słowo:'),
  d11.readWord({ lesson: L(11, 1), n: 2, title: 'Notatka: cena biletu', explanation: 'Bilet dla uczniów kosztuje 15 złotych.', trap: 'Wpisanie ceny dla dorosłych (25).' },
    FESTIVAL, 'Uzupełnij notatkę: A student ticket costs [GAP] zloty.', '15', ['fifteen'], 'Wpisz liczbę lub słowo:'),
  d11.readChoice({ lesson: L(11, 1), n: 3, title: 'Informacja po polsku', explanation: 'W tekście warsztat montażu zaczyna się w sobotę o 10:00.', trap: 'Przeniesienie informacji z innej części tekstu (cena, miejsce).' },
    FESTIVAL, 'Które zdanie po polsku jest zgodne z tekstem?', ['Warsztat montażu zaczyna się w sobotę o 10:00.', 'Bilet ulgowy kosztuje 25 złotych.', 'Festiwal odbywa się w Gdyni.', 'W programie jest 12 filmów.'], 'A'),
  d11.readTruth({ lesson: L(11, 1), n: 4, title: 'Liczba filmów', explanation: 'W programie jest 20 krótkich filmów młodych reżyserów.', trap: 'Pomylenie liczby filmów z datami festiwalu.' },
    FESTIVAL, 'W programie festiwalu jest 20 krótkich filmów nakręconych przez nastoletnich reżyserów.', 'TRUE'),
  d11.readChoice({ lesson: L(11, 1), n: 5, title: 'Zdanie do e-maila', explanation: 'Festiwal trwa od 12 do 14 czerwca w Baltic Cinema. Tylko opcja A przenosi informacje poprawnie.', trap: 'Zmiana jednej informacji (daty, miejsca, miesiąca) w pozornie podobnym zdaniu.' },
    FESTIVAL, 'Piszesz e-mail do kolegi. Które zdanie po angielsku poprawnie podaje, kiedy i gdzie jest festiwal?', ['The festival is on 12–14 June at the Baltic Cinema.', 'The festival is on 14–16 June at the Baltic Cinema.', 'The festival is on 12–14 June at the Gdynia Cinema.', 'The festival is on 12–14 July at the Baltic Cinema.'], 'A'),

  // ===== 11-2 Fakty i opinie =====
  d11.readChoice({ lesson: L(11, 2), n: 1, title: 'Opinia autora', explanation: 'Zdanie „ugliest building” wyraża osąd autora (In my opinion). Pozostałe to fakty albo opinia burmistrza.', trap: 'Uznanie opinii burmistrza za opinię autora.' },
    MALL, 'Które zdanie jest opinią autora tekstu?', ['The new shopping centre opened last Friday.', 'It has 120 shops.', 'It is the ugliest building in the city.', 'The mayor called it a success.'], 'C'),
  d11.readChoice({ lesson: L(11, 2), n: 2, title: 'Fakt do sprawdzenia', explanation: 'Liczbę sklepów (120) można sprawdzić. Oceny „ugliest” i „great success” to opinie.', trap: 'Uznanie oceny za fakt, bo zdanie brzmi pewnie.' },
    MALL, 'Który fragment jest faktem, który można sprawdzić?', ['It is the ugliest building in the city.', 'a great success for local business', 'In my opinion, it is the ugliest building', 'it has 120 shops'], 'D'),
  d11.readTruth({ lesson: L(11, 2), n: 3, title: 'Czyja to opinia?', explanation: 'Słowa „a great success” są cytatem burmistrza, więc to jego opinia.', trap: 'Przypisanie cudzej opinii autorowi tekstu.' },
    MALL, 'Słowa „a great success” to opinia burmistrza, a nie autora tekstu.', 'TRUE'),
  d11.readChoice({ lesson: L(11, 2), n: 4, title: 'Ton autora', explanation: 'Słowa shocking i surely pokazują krytykę i zaniepokojenie autora.', trap: 'Uznanie tonu za neutralny tylko dlatego, że w tekście są dane liczbowe.' },
    NOISE, 'Jaki jest ton autora tekstu?', ['critical and concerned', 'neutral and objective', 'amused and relaxed', 'admiring and enthusiastic'], 'A'),
  d11.readWord({ lesson: L(11, 2), n: 5, title: 'Słowo wyrażające emocje', explanation: 'Przymiotnik shocking pokazuje emocje autora, a nie sam fakt.', trap: 'Wpisanie słowa neutralnego, np. measured.' },
    NOISE, 'It is absolutely [GAP] that nobody has done anything about it.', 'shocking', [], 'Uzupełnij zdanie jednym wyrazem z tekstu, który pokazuje emocje autora:'),

  // ===== 11-3 Wiele źródeł =====
  d11.readChoice({ lesson: L(11, 3), n: 1, title: 'Najtańsza oferta do wieczora', explanation: 'Do 20:00 otwarte jest tylko Green Wheels, a jego cena jest najniższa (15 zł).', trap: 'Wybór oferty tylko po jednym kryterium.' },
    BIKE_ADS, 'Chcesz wypożyczyć rower tak tanio, jak to możliwe, i oddać go o 19:30. Którą ofertę wybierzesz?', ['City Bikes', 'Green Wheels', 'Speedy Rent', 'Żadnej z nich'], 'B'),
  d11.readChoice({ lesson: L(11, 3), n: 2, title: 'Rower elektryczny', explanation: 'Elektryczne rowery są tylko w ofercie C.', trap: 'Wybór po cenie bez sprawdzenia typu roweru.' },
    BIKE_ADS, 'Kto wypożycza wyłącznie rowery elektryczne?', ['City Bikes', 'Green Wheels', 'Speedy Rent', 'Wszyscy trzej'], 'C'),
  d11.readWord({ lesson: L(11, 3), n: 3, title: 'Koszt całkowity', explanation: 'Dzień w Green Wheels kosztuje 15 zł, a kask 5 zł. Razem 20 zł.', trap: 'Pominięcie dodatkowej opłaty za kask.' },
    BIKE_ADS, 'How much will you pay in total for one day at Green Wheels, including a helmet? [GAP] zloty', '20', ['twenty'], 'Wpisz liczbę:'),
  d11.readTruth({ lesson: L(11, 3), n: 4, title: 'Kask w cenie', explanation: 'W ofercie City Bikes jest napis „helmet included”.', trap: 'Pomylenie ofert, np. z Green Wheels, gdzie kask jest dodatkowo płatny.' },
    BIKE_ADS, 'W ofercie City Bikes kask jest wliczony w cenę wypożyczenia.', 'TRUE'),
  d11.readChoice({ lesson: L(11, 3), n: 5, title: 'Zdanie zgodne z ogłoszeniami', explanation: 'Green Wheels jest otwarte do 8 p.m., czyli do 20:00.', trap: 'Zamiana godzin lub ofert w zdaniu, które brzmi podobnie.' },
    BIKE_ADS, 'Które zdanie jest zgodne z ogłoszeniami?', ['Green Wheels is open until 8 p.m.', 'City Bikes opens at 8 a.m.', 'Speedy Rent sells helmets.', 'City Bikes is cheaper than Green Wheels.'], 'A'),
];

export const CURATED_READING_TASK_IDS = lessonIdsOf(CURATED_READING_TASKS);
