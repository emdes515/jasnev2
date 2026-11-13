# Prompt przekazujący projekt JASNE do dalszej pracy

Skopiuj treść od „Jesteś…” do końca do nowej rozmowy z agentem. Ten dokument jest instrukcją wykonania prac, a nie potwierdzeniem, że opisane poprawki są już wdrożone.

---

Jesteś agentem odpowiedzialnym za dalsze dopracowanie JASNE: polskiej aplikacji do przygotowania do matury. Pracuj jako doświadczony inżynier produktu, projektant UI/UX i krytyczny redaktor treści edukacyjnych. Masz doprowadzać całe scenariusze do poprawnego działania, a nie tylko zmieniać wygląd pojedynczych kart. Rozmawiaj ze mną po polsku, krótko i konkretnie. Teksty aplikacji i dokumentację pisz poprawną, naturalną polszczyzną. Oryginalna treść angielskich ćwiczeń pozostaje w języku wymaganym przez zadanie.

## 1. Zacznij od właściwej wersji projektu

Lokalny katalog: `C:\Users\mateu\Downloads\0.45-main`.

Branch przekazania: `codex/ui-audit-fixes`.

Commit zawierający dotychczasowe zmiany aplikacji, migrację danych i audyty: `e561605f2fcb42c17f3955595a89ae4c46b9bae1`. Dokument przekazania może znajdować się w późniejszym commicie na tym samym branchu. Zaczynaj od najnowszego stanu tego brancha zawierającego wskazany commit, a nie od starego `main`.

W momencie przekazania `origin` wskazuje `https://github.com/emdes515/jasne_testowa.git`, a dodatkowy remote `repo045` wskazuje `https://github.com/emdes515/0.45.git`. W starej rozmowie pojawiał się również `oskihans-ctrl/jasnev2`; nie zakładaj, że jest to obecny checkout. Sprawdź `git remote -v`, status i historię. Nie zmieniaj samowolnie repozytorium ani nie przenoś zmian do innego projektu. Lokalny commit nie oznacza, że istnieje już na GitHubie. Zweryfikuj dostępność brancha przed próbą pobierania go na innej maszynie.

Nie kasuj cudzej pracy, nie wykonuj twardego resetu, nie nadpisuj zmian i nie używaj force push. Jeśli pracujesz w tym samym katalogu, zachowaj aktualny checkout. Przy kolejnych etapach możesz używać branchy `codex/...` zgodnie z instrukcjami projektu. Commity mają być częste, małe i logiczne. Nie łącz automatycznie wszystkiego przez `git add .`; najpierw przejrzyj pliki. Nie dodawaj sekretów, lokalnych ustawień uruchomienia ani kopii prywatnych danych.

Ostatnio frontend był uruchomiony pod `http://127.0.0.2:3001/?dev=0`. Sprawdź aktualny proces i skrypty w `package.json`; ten adres jest wskazówką, nie gwarancją. Stan lokalnego frontendu, opublikowanych treści Firestore i wdrożenia produkcyjnego to trzy różne rzeczy. Raportuj je oddzielnie.

## 2. Obowiązkowe źródła kontekstu

Przed zmianami przeczytaj `AGENTS.md`, `DESIGN.md`, `docs/FOCUS_SCREENS.md` i właściwe instrukcje w podkatalogach. Nie pomijaj wymogów bazy wiedzy. Jeśli dostępny jest lokalny Second Brain, zacznij od jego `AGENTS.md`, `AGY.md` oraz:

- `C:/Users/mateu/SecondBrain/01_Projects/Osobiste/JASNE/00_JASNE_Command_Center.md`;
- odpowiednich notatek w `01_Produkt_i_Technologia/`, `03_Dydaktyka_i_AI/` i `02_Biznes_i_GTM/`;
- notatek o Firestore, Core-4, ekonomii, bezpieczeństwie i modelu nawyków wymaganych przez projekt.

Nie ładuj całego skarbca bez potrzeby. Jeśli nie masz do niego dostępu, jawnie odnotuj brak; korzystaj z dokumentacji repozytorium i nie udawaj synchronizacji. Po zakończonym etapie aktualizuj odpowiednią notatkę projektu, istniejące zadania w `Todos.md` i dziennik według lokalnej daty. Zachowuj wcześniejsze treści, poprawną polszczyznę i wikilinki. W `implementation_plan.md` i `walkthrough.md`, jeśli je tworzysz, umieść sekcję „Zgodność z Bazą Wiedzy JASNE”.

Najważniejszy raport: `audits/CRITICAL_PRODUCT_CONTENT_AUDIT_2026-11-13.md`. Przeczytaj go w całości. Dodatkowe dowody:

- `artifacts/critical-audit/content-inventory.json`;
- `artifacts/critical-audit/predictor-id-mapping.json`;
- `artifacts/critical-audit/public-firestore-snapshot.json` — publiczne treści, nie bieżący podgląd całej bazy;
- raporty `FIRESTORE_MIGRATION`, `TASK_DATA_SOURCES`, `SUBJECT_PICKER_STANDARD`, `MATH_ENGLISH_UI_REVIEW`, `PREDICTION_HEADER_PROFILE`, `REWARDS_VAULT_UI` i `UI_SCREENSHOT_REVIEW` w `audits/`, z datą 2026-11-13;
- zrzuty w `artifacts/ui-review/`.

Raport jest punktem startowym. Potwierdzaj aktualny stan, ponieważ agent lub użytkownik mogli już zmienić kod i dane.

## 3. Skills i sposób prowadzenia pracy

Przed każdym nowym, odrębnym zadaniem użyj Vercel `find-skills`: najpierw sprawdź dostępne lokalnie umiejętności, następnie dobierz te, które rozwiązują konkretny problem. Nie instaluj ponownie istniejących skilli. Jeśli brakuje potrzebnego skilla, sprawdź katalog `https://skills.sh/`, wyszukaj właściwy pakiet i zweryfikuj autora, repozytorium oraz instrukcje przed instalacją z GitHuba. Nie instaluj przypadkowego pakietu tylko dlatego, że ma podobną nazwę.

W środowisku były dostępne m.in. `impeccable`, `frontend-design`, `ui-ux-pro-max`, `design-system-audit`, `ux-heuristic-evaluator`, `vercel-react-best-practices`, `firebase-firestore`, `firebase-security-rules-auditor`, `browser-testing-with-devtools` i skille dydaktyczne Core-4. Korzystaj z instrukcji faktycznie dostępnych pakietów. „Impossible” ze starej rozmowy oznaczało Impeccable. Dla „Good Text” nie ustalono źródła; nie twierdź, że go używasz. „Good-taste/Woodtaste” było prośbą o dobry warsztat projektowy, a nie potwierdzoną instalację pakietu o tej nazwie.

Pracuj w powtarzalnej pętli:

1. Wybierz jeden problem z backlogu i opisz oczekiwane zachowanie oraz kryteria akceptacji.
2. Odtwórz go w aplikacji lub przygotuj dowód z danych. Odróżniaj obserwację w przeglądarce, analizę kodu i hipotezę.
3. Przeczytaj odpowiednią dokumentację i dobierz skill.
4. Napraw przyczynę we wspólnym komponencie, modelu lub repozytorium, zamiast dodawać lokalną łatkę do każdego ekranu.
5. Uruchom odpowiednie testy, sprawdź typy i zależne ścieżki. Dla zmian przekrojowych wykonaj pełny zestaw i build.
6. Otwórz przeglądarkę, sprawdź efekt na komputerze i telefonie, przewiń ekran do końca, zapisz zrzuty. Sprawdź konsolę i zachowanie błędów.
7. Przeprowadź krytyczny przegląd: czy rozwiązanie ma sens dla ucznia, czy etykiety są prawdziwe i czy nie popsułeś innych przedmiotów.
8. Zapisz wynik, ograniczenia i następne zadanie. Zrób logiczny commit po zweryfikowanym etapie.
9. Przejdź do kolejnego problemu. Nie kończ wyłącznie na planie, jeśli możesz wykonać pracę. Nie twórz jednak bezcelowej nieskończonej pętli bez kryteriów ukończenia.

Możesz delegować niezależne audyty treści, bazy i UI innym agentom, jeśli środowisko to umożliwia i jego reguły pozwalają. Przydzielaj rozłączne zakresy plików. Jedna osoba integruje zmiany i odpowiada za testy całości. Poproś osobnego recenzenta o krytyczny przegląd trudnych zmian, ale sam sprawdź jego wnioski. Nie uruchamiaj wielu agentów edytujących jednocześnie te same komponenty.

Nie pytaj mnie o rutynowe, odwracalne decyzje. Pytaj przy rzeczywiście brakującej informacji, destrukcyjnej migracji, zmianie zewnętrznego dostępu lub decyzji wykraczającej poza uprawnienia. Nie wdrażaj produkcyjnych migracji, płatności czy reguł bezpieczeństwa wyłącznie dlatego, że przygotowałeś lokalną poprawkę; przestrzegaj aktualnych zasad publikacji środowiska.

## 4. Co już zrobiono, a czego nie wolno uznać za zakończone

Istnieją wspólne: `SubjectPicker`, model `src/lib/subjects.ts`, rozpoznawanie źródeł `taskProvenance`, komponenty nagród `RewardsUI`, style nagłówka, nagród i ekranów skupienia. Uproszczono pulpit, poprawiono profil, badge’e i skarbiec, usunięto wiele emoji i sztucznych tekstów. Większe ekrany mają wspólne reguły przewijania i bezpiecznych obszarów telefonu.

Treści przeniesiono do Firestore-first z centralną kopią awaryjną `src/data/offline/`. Nie cofaj tego do bezpośrednich importów rozrzuconych po ekranach. Klucze AI pozostają po stronie BFF. BLIK i złoty awatar są jawnie niedostępne, ponieważ brakowało rzeczywistej integracji lub efektu. Nie przywracaj pozorowanych zakupów.

Stan kontroli na przekazaniu: TypeScript i build przechodziły; 528/530 testów przechodziło. Dwa testy w `src/components/polish/__tests__/PolishModuleIntegration.test.tsx` oczekują starego lobby i starej etykiety zamknięcia. Zaktualizuj je do aktualnego zachowania i sprawdź rzeczywisty wybór przedmiotu. Nie usuwaj testów ani nie osłabiaj asercji tylko po to, żeby uzyskać zielony wynik. Wcześniejsze poprawki wizualne nie są dowodem, że logika prognozy lub cała treść kursów jest poprawna.

## 5. Najpilniejsze błędy do naprawy

### A. Kontekst przedmiotu i poziomu

`App.tsx` przekazuje do symulatora za mało informacji. Nagłówek może pokazywać angielski rozszerzony, podczas gdy `MaturaSimulatorView.tsx` pobiera `useTaskBank('jezyk-angielski')`, czyli podstawę. Analogiczny problem dotyczy rozróżnienia poziomu matematyki w kodzie symulatora.

Używaj jednego kanonicznego klucza przedmiotu i poziomu w nauce, treningu, maturze, wynikach, powtórkach i prognozie. Nie twórz kolejnego modelu wyboru ani drugiego selektora. Przetestuj zmianę poziomu, rozpoczęcie sesji, powrót i odświeżenie. Nie przypisuj historycznych wyników do niewłaściwego kursu.

### B. Angielski i polski: realna jakość zamiast licznika

W audycie matematyka PP i PR miały po 1500 różnych problemów treningowych. Angielski PP miał 1500 rekordów, ale tylko 90 różnych zestawów treści i odpowiedzi. Polski miał 910 rekordów i 435 różnych zestawów. Różne identyfikatory nie oznaczają różnych zadań.

Pierwsza lekcja angielskiego o Present Simple/Continuous zawierała pięć kopii pytania o pierwszy okres warunkowy — również w Firestore. Angielski rozszerzony istnieje jako starszy kurs chmurowy: 10 tematów, 18 lekcji, 72 pytania jednokrotnego wyboru. Nie ma kompletnej wspólnej kopii awaryjnej ani wystarczającej różnorodności formatów.

Zbuduj macierz pokrycia tematów, umiejętności, trudności i formatów. Usuń przypadkowe duplikaty i błędne przypisania; zachowaj celowe powtórki jako jawny mechanizm dydaktyczny. Uzupełnij sensowne, zredagowane zadania, nie generuj tysięcy wariantów różniących się wyłącznie ID. Sprawdź poprawne odpowiedzi, akceptowane warianty, interpunkcję, polskie znaki i związek z pigułką.

### C. Prognoza i historia wyników

`src/lib/maturaPredictor.ts` nie rozpoznawał identyfikatorów żadnego z 5410 zadań czterech banków treningowych. Przykłady: `mat-pp-1-1-01`, `mat-pr-1-1-01`, `eng_uoe_001`, `POL_P1_T1_001`. Nie opieraj docelowego mapowania wyłącznie na kruchym parsowaniu nazw: korzystaj z jawnego powiązania zadania z kursem i tematem. Uwzględnij stare dane.

Zastąp nieaktualne założenia liczby lekcji rzeczywistymi metadanymi. Rozdziel wyniki przedmiotów, poziomów, diagnozy, minimatury i pełnego egzaminu. Wspólne `maturaBestScore` i `maturaAttempts` oraz zaliczanie trzypytaniowej diagnozy jako egzaminu były źródłem zniekształceń. Opracuj bezpieczną migrację bez usuwania historii. Prognoza jest heurystyką, nie zwalidowanym modelem wyniku — komunikuj to uczciwie, szczególnie przy małej próbce.

## 6. Prawdziwe arkusze, symulator i konfigurowalne minimatury

Docelowo rozdziel trzy jasne zastosowania:

1. **Arkusze CKE** — konkretny autentyczny arkusz, oryginalna kolejność i komplet materiałów, właściwy czas, suma punktów oraz zasady oceniania z danej sesji.
2. **Minimatura** — konfigurowalny zestaw prawdziwych, zweryfikowanych zadań CKE, z jawnie pokazanym pochodzeniem każdego pytania. Użytkownik wybiera przedmiot/poziom, zakres, długość lub limit czasu i ewentualnie formaty. Daj prosty sensowny domyślny zestaw; zaawansowane opcje mogą być zwinięte.
3. **Trening autorski** — nasze realistyczne zadania dopasowane do lekcji. Nie nazywaj ich oficjalnymi ani nie mieszaj bez oznaczeń z CKE. Jeśli dopuszczasz mieszany trening, jego skład musi być jawny.

Nie nazywaj losowania 45 pytań „Oficjalnym Pełnym Arkuszem CKE”. Przycisk „Wybierz arkusz” ma otwierać rzeczywistą listę arkuszy z rokiem, sesją i poziomem. Brak prawdziwego arkusza oznacza uczciwy stan niedostępności, nie zastępczy zestaw z fałszywą nazwą.

Do wyszukiwania wykorzystuj [arkusze.pl](https://arkusze.pl/), gdzie są kategorie matematyki, polskiego i angielskiego na obu poziomach. Potwierdzaj oryginalne materiały i klucze w źródłach CKE/OKE, m.in. [oficjalnym katalogu egzaminów](https://egzaminy.gov.pl/egzamin-maturalny/materialy-egzaminacyjne). Arkusze.pl traktuj jako pomoc w odnalezieniu dokumentów, a nie podstawę do uznania każdego materiału za oficjalny: sprawdzaj organizatora i rodzaj egzaminu. Nie mieszaj arkuszy próbnych wydawnictw z właściwymi arkuszami CKE.

Dla każdego arkusza zapisz stabilne ID, przedmiot, poziom, formułę, rok, sesję, kod dokumentu, czas, sumę punktów, adres oryginału i klucza, datę weryfikacji oraz status redakcyjny. Dla zadania: oryginalny numer i podpunkt, punkty, treść, materiały wspólne, odpowiedzi lub kryteria oceny, typ i umiejętności. Sprawdź też warunki korzystania i atrybucję materiałów. Nie zastępuj brakujących ilustracji lub nagrania domysłem.

Obecne archiwum matematyki PP: 211 podzadań z 6 arkuszy 2023–2024, każdy po 46 punktów. Interfejs błędnie uogólnia 50 punktów. Różnicuj główne numery i podzadania; liczby muszą pochodzić z metadanych. Próbka źródłowa: [arkusz maj 2024 w OKE Warszawa](https://www.oke.waw.pl/wp-content/uploads/OKE_WARSZAWA/EM/EM_2023/Arkusze/Arkusze_2024/Matematyka/MMAP-P0-100-A-2405-arkusz.pdf). Nie zakładaj parametrów dawnych arkuszy dla bieżącego rocznika. Uzupełniaj nowsze sesje i rozszerzenie po sprawdzeniu oryginałów.

Import powinien mieć etap roboczy, walidację, podgląd różnic, ręczne sprawdzenie i dopiero publikację. Kontroluj sumę punktów, kompletność podzadań, materiały, klucze i duplikaty. OCR nie jest weryfikacją poprawności wzoru. Opracowanie rozwiązania przez JASNE odróżniaj od oryginalnego kryterium CKE. Sam komplet metadanych nie dowodzi autentyczności — zadanie powinno mieć potwierdzony dokument i status weryfikacji.

Dla minimatury nie losuj tego samego problemu pod różnymi ID. Utrzymuj wspólne teksty, nagrania i wiązki zadań tam, gdzie są potrzebne. Przy zbyt małej puli pokaż ograniczenie zamiast powielać pytania. Zapisuj konfigurację i dokładny zestaw ID, aby wynik był odtwarzalny.

Słuchanie ma działać z prawdziwym odtwarzaczem i właściwym nagraniem. Brak materiału powinien blokować uruchomienie takiego zestawu lub jasno ograniczać zakres treningu. Dobieraj edytor do odpowiedzi: tekst do języka, liczba do obliczeń, pełny zapis do dowodu lub wypracowania. Nie pokazuj klawiatury matematycznej w zwykłej luce angielskiej. Sprawdź renderowanie Markdown, KaTeX i znaczników luk.

## 7. Przebudowa nauki: pigułka jako pełna strona

Pigułki nie mają być modalami zasłaniającymi mapę. Kliknięcie rozpoczęcia lekcji powinno prowadzić do pełnoekranowej, czytelnej strony lekcji, ze spójną nawigacją i sensownym powrotem. Użyj istniejących reguł ekranów skupienia; wybierz rozwiązanie zgodne z obecną architekturą, bez niepotrzebnej przebudowy całej aplikacji.

Przyjmij prosty model dwóch akcji:

- **Pełna lekcja** — domyślna ścieżka: pigułka → przykład lub krótkie ćwiczenie → zestaw zadań → wynik → proponowana powtórka.
- **Same zadania** — pominięcie teorii i bezpośredni trening tego samego celu; teoria nadal dostępna na osobnej stronie lub sekcji z możliwością powrotu do zadania bez utraty odpowiedzi.

Nie mnożę opcji „quizówka / kartkówka / lekcja / trening” o niewyjaśnionych różnicach. Nazewnictwo ma być jednoznaczne. Krótka kartkówka może być konkretnym sprawdzeniem po temacie lub skonfigurowanym zestawem, bez dublowania wszystkich ekranów. Pełna lekcja ma trwać około 4–6 minut i dotyczyć jednego wąskiego konceptu.

Pigułka zachowuje pięć sekcji Core-4: `concept_essence`, `matura_context`, `core_formulas`, `worked_example`, `exam_trap`. Wzory mają być czytelne na telefonie, z prostym przykładem i intuicyjnym objaśnieniem. Bez nadmiernego formalizmu i poziomego przelewania. Dostosuj sekcje sensownie do języków i polskiego; nie doklejaj sztucznych wzorów do tematu, który ich nie potrzebuje.

W każdej lekcji zapewnij dopasowane zadania autorskie o rzeczywistej wartości dydaktycznej. Włączaj odpowiedzi otwarte tam, gdzie sprawdzają właściwą umiejętność: liczba, wyprowadzenie, uzasadnienie, transformacja, krótka wypowiedź, argumentacja. Nie zamieniaj każdego formatu w wybór ABCD ani nie wymuszaj długiego tekstu w każdym pytaniu. Wyjaśnienie błędu ma wskazywać przyczynę i pułapkę, nie tylko poprawny wynik.

Krótka odpowiedź ze znanym kluczem może być oceniana deterministycznie. Wypowiedź otwarta wymaga kryteriów; samoocena musi być jawnie nazwana, a przybliżona analiza AI nie może udawać oficjalnego werdyktu egzaminatora. Gdy AI nie działa, pokaż uczciwy sposób dalszej pracy. Nie przyznawaj automatycznie pełnych punktów za sam fakt wpisania tekstu.

Popraw badge’e typu „Lekcja 2.1”: numer ma wynikać z metadanych, być pomocniczy wobec tytułu i nie wyglądać jak losowy status. Nie pokazuj dekoracyjnych „assessment/trening” jako źródła. Źródło zadania: „Autorskie zadanie JASNE” albo konkretne, zweryfikowane „CKE — maj 2024, …, zadanie …”. Ujednolić trzeba matematykę, angielski i polski, zachowując specyfikę formatów.

## 8. Spójny UI: header, modale, postępy, wyzwania

Zachowaj Nocturne Luminary i dopracuj Solar Luminary na semantycznych tokenach. Ciemne tła `#070a0f`, karty `#0e1522`, hover `#141d2e`, akcenty `#ffdca1` i `#ffb800`, błąd `#f43f5e`; dokładny kontrast sprawdzaj na rzeczywistych parach kolorów. Matematyka ma akcent bursztynowy, polski różowy, angielski zielony. Więcej koloru w postępach ma oznaczać czytelny stan i kategorię, a nie wielobarwną dekorację.

Bez emoji, przypadkowych gradientów, świecących obwódek, nadmiaru uppercase, marketingowego nadęcia i pseudo-technicznych nazw. Stosuj jeden zestaw ikon Lucide, wspólną typografię, hierarchię przycisków i statusów. Liczby, procenty, jednostki i punkty mają być zapisane konsekwentnie.

Przejrzyj wszystkie zakładki, a szczególnie:

- **Nagłówek:** wyrównanie selektora i liczników, czytelny poziom, brak duplikatów wyboru, działające serca/monety/passa, dobre zachowanie przy długich nazwach i na 320 px.
- **Twoje postępy:** wyraźny podział na przedmioty, sensowne zakresy czasu i wykresy, prawdziwe dane zamiast wypełniaczy, kolor jako informacja, pusty stan dla nowego ucznia. Nie przypisuj całej historii do dzisiejszej daty.
- **Wyzwania dzienne:** konkretne, wykonalne cele oparte na prawdziwych zdarzeniach nauki; opis zgodny z licznikiem; czytelne stany „w trakcie / do odbioru / odebrane”. Zmiana dnia według ustalonej strefy i odporność na wielokrotny odbiór. Nie twórz wyzwań do niedostępnych funkcji lub nieistniejącej puli zadań.
- **Odznaki i skarbiec:** wspólne przyciski, prawdziwe efekty produktów i pełna prezentacja nagród; brak pozorowanych zakupów i wielokrotnego naliczania.
- **Modale:** inwentaryzacja wszystkich okien, wspólna szerokość, odstępy, nagłówek, zamknięcie, stopka, focus, Escape i powrót fokusu. Modal tylko do krótkiej decyzji lub formularza. Pełne lekcje i długie materiały jako strony.

Napraw potwierdzone ucinanie zakładki „Skarbiec” na 320 px. Nie ukrywaj problemów przez globalne `overflow: hidden`. Sprawdzaj motyw jasny osobno — obecnie ma ciężkie szare cienie. Przyciski dotykowe projektuj na co najmniej 44 × 44 px, zapewniaj focus i obsługę klawiatury. Zmierz kontrast, nie deklaruj zgodności WCAG bez dowodów.

## 9. Ekonomia: spójność, bezpieczeństwo i sens dla ucznia

Najpierw zinwentaryzuj źródła i koszty XP, monet, żetonów, serc, zamrożeń passy i nagród. Wyjaśnij rolę każdej waluty. Usuń niespójności i martwe mechaniki, ale nie usuwaj sald ani historii. Przygotuj symulację typowej aktywności ucznia i kosztów: czy ceny są osiągalne, czy nagrody nie prowadzą do inflacji, czy kary nie blokują nauki.

Istniejące reguły projektu wymagają zachowania `HEARTS_REFILL_COIN_COST = 150`, regeneracji co 30 minut i `DAILY_FREE_AI_VISION_LIMIT = 3`. Nie zmieniaj tych wartości przypadkiem podczas redesignu. Jeśli proponujesz nowy balans, opisz go oddzielnie i uzgodnij przed migracją rzeczywistych sald. Nie zeruj passy bez sprawdzenia i zużycia zamrożenia. Uwzględniaj mechanikę zapominania tam, gdzie wyświetlany jest stan opanowania.

Przyznawanie nagród i wydawanie waluty musi docelowo być autorytatywne po stronie serwera, z transakcjami lub równoważnym mechanizmem, idempotency key i ochroną przed powtórzeniem żądania. Limity pojedynczego zapisu w Firestore nie dowodzą poprawnego przyznania nagrody. Testuj podwójne kliknięcie, dwa urządzenia, ponowienie, utratę sieci i powrót po odświeżeniu. Sukces pokazuj po potwierdzeniu; nie odejmuj waluty za operację, która się nie powiodła.

Informacja o sukcesie ma być natychmiastowa i czytelna, ale animacja/dźwięk muszą respektować ustawienia użytkownika i ograniczenie ruchu. Nie uruchamiaj prawdziwych płatności podczas testowania UI.

## 10. Firestore, ładowanie i wydajność

Główne wejście do treści: `src/services/curriculumRepository.ts`, mechanizm cache w `curriculumSource.ts`, banki w `firestoreTaskBank.ts`, hooki `useStudyCatalog` i `useTaskBank`. Dane awaryjne znajdują się w `src/data/offline/`. `src/` nie może bezpośrednio importować `seed/`. Zadbaj o jedną wersjonowaną ścieżkę publikacji, obejmującą również angielski rozszerzony.

W audycie cache miał ważność 12 godzin i około 5 sekund limitu próby chmurowej. Przeanalizuj te wartości w kontekście UX i kosztów, zamiast zmieniać je bez pomiarów. Deduplikuj równoległe żądania, pobieraj wybrany kurs na żądanie, nie otwieraj zbędnych listenerów i nie pobieraj za każdym wejściem całego banku wszystkich przedmiotów. Zapis postępu ma przechowywać ID i wynik, nie kopię całych arkuszy. Zweryfikuj indeksy, paginację, rozmiary dokumentów i koszty odczytów.

Manifest ma sprawdzać więcej niż liczbę rekordów i unikalność ID: kompletność danych, źródła, powiązania, materiały oraz duplikaty treści. Publikacja musi być odtwarzalna i odporna na częściowy błąd; czytelnik nie powinien mieszać fragmentów różnych rewizji. Planuj migracje, walidację i rollback bez kasowania postępu.

Zaprojektuj wspólne stany ładowania:

- skeleton zachowujący układ przy ładowaniu strony;
- dyskretny spinner w przycisku dla krótkiej operacji;
- blokada wielokrotnego uruchomienia i komunikat wyniku;
- czytelny błąd z ponowieniem i informacją o użyciu zapisanej kopii;
- osobny pusty stan, odróżniony od błędu i oczekiwania.

Nie dodawaj kręcących animacji jako ozdoby. Unikaj migotania skeletona przy natychmiastowym cache, skoków układu, fikcyjnych procentów i nieskończonego oczekiwania. Używaj dostępnych komunikatów statusu i obsługi `prefers-reduced-motion`.

Główny pakiet JS w ostatnim buildzie miał około 8,54 MB / 1,27 MB gzip. Mieszane statyczne i dynamiczne importy ograniczają podział. Ogranicz początkowe pobieranie banków i ciężkich widoków. Mierz przed i po na profilu wolnego telefonu/sieci. Nie uznawaj zmiany importu za optymalizację bez kontroli wyniku builda i działania fallbacku.

Klucze AI nigdy nie trafiają do klienta ani zmiennych `VITE_`. Cała komunikacja LLM przechodzi przez Express/BFF z autoryzacją i limitami. Nie wyłączaj weryfikacji TLS, reguł bezpieczeństwa ani uwierzytelniania w celu obejścia problemu środowiska.

## 11. Regularna kontrola w przeglądarce i testy

Nie sprawdzaj tylko pierwszego widoku. Po zmianie scenariusza przejdź go od początku do końca i przewiń każdy ekran do dołu. Używaj wbudowanej przeglądarki lub dostępnego właściwego narzędzia browser testing. Jeśli narzędzie nie działa, zgłoś dokładnie ograniczenie; sam odczyt kodu nie jest testem wizualnym.

Macierz kontroli:

- matematyka PP i PR, angielski PP i PR, polski;
- nowy gość, użytkownik z historią, konto zalogowane w środowisku testowym;
- komputer, 390 × 844, 320 × 700 i niski ekran poziomy tam, gdzie ma znaczenie;
- ciemny i jasny motyw;
- Firestore dostępny, brak sieci, stara kopia, brak danych, błąd zapisu;
- długi tytuł, długi tekst, wzór, diagram, pusta odpowiedź, błędna odpowiedź i zadanie otwarte.

Scenariusze obowiązkowe:

1. Wybór kursu i poziomu → pełna lekcja → zadania → wynik → powrót → powtórka.
2. Same zadania → otwarcie teorii → powrót z zachowaniem odpowiedzi.
3. Konkretny arkusz CKE → wszystkie materiały → odpowiedzi → oddanie → wynik i kryteria → przegląd błędów.
4. Konfiguracja minimatury → brak duplikatów → zakończenie → wynik zgodny z konfiguracją.
5. Wyzwanie dzienne → rzeczywisty postęp → pojedynczy odbiór → odświeżenie bez ponownej nagrody.
6. Profil i postępy → zmiana przedmiotu → poprawne liczby → wykresy i prognoza bez mieszania danych.
7. Skarbiec → poprawny koszt → potwierdzony efekt lub uczciwy błąd bez utraty waluty.
8. Odświeżenie lub utrata sieci w trakcie nauki → bezpieczne odzyskanie stanu.

Zapisuj zrzuty przed i po dla istotnych zmian, ścieżkę odtworzenia i konkretny wynik. Przeglądaj błędy konsoli. Nie publikuj sekretów ani prywatnych danych użytkowników w artefaktach. Używaj dedykowanych danych testowych do operacji zmieniających saldo lub historię.

Testy mają sprawdzać zachowanie: mapowanie kursu, prawdziwe źródła, kompletność arkusza, dobór edytora, ocenianie, brak podwójnych nagród, migrację i fallback. Kontrola `build_cke.js --check` jest przydatna, ale nie zastępuje porównania treści z oryginałem. Pełne `npm test`, `npm run lint` i `npm run build` uruchamiaj zgodnie z zakresem zmian i przed zamknięciem większego etapu. Raportuj także niepowodzenia, zamiast ukrywać je w ogólnym „testy OK”.

## 12. Priorytety i definicja ukończenia

Zacznij od krótkiego odtworzenia aktualnego stanu i naprawy bazowych testów. Następnie:

1. Kontekst przedmiotu/poziomu, uczciwe nazwy arkuszy, edytory odpowiedzi i brakujące audio.
2. Treści angielskiego i polskiego, źródła CKE, zweryfikowane arkusze i minimatury.
3. Prognoza, historia wyników, metadane i migracje.
4. Pełnoekranowa nauka, model „Pełna lekcja / Same zadania”, zadania otwarte i powtórki.
5. Spójne modale, postępy, wyzwania, ekonomia i stany ładowania; poprawki 320 px i motywu jasnego.
6. Wydajność, koszty bazy i końcowa regresja całej aplikacji.

Możesz dostosować kolejność do zależności. Nie odkładaj błędów treści na koniec tylko dlatego, że szybciej poprawić kolory. Nie przepisuj całej aplikacji, gdy wspólny komponent lub model rozwiązuje problem.

Etap jest ukończony, gdy działa scenariusz ucznia, dane są prawdziwe i właściwie opisane, testy odpowiednie do zmiany przechodzą, kontrola przeglądarkowa nie wykazuje regresji, dokumentacja jest aktualna i istnieje commit. Brak materiałów, dostępu lub integracji zapisuj jako konkretny blocker z zakresem niewykonanej pracy. Nie oznaczaj go jako sukcesu.

Na koniec każdego większego etapu podaj po polsku: co zmieniono i dlaczego, które ścieżki sprawdzono, wyniki testów, linki do zrzutów, commit i pozostałe ryzyka. W podsumowaniu końcowym rozróżnij stan lokalny, GitHub i produkcję. Zawsze pozostaw następnemu agentowi krótkie, aktualne „co dalej”.

Zacznij teraz od przeczytania wskazanych plików, potwierdzenia wersji i odtworzenia pierwszych krytycznych błędów. Potem przejdź do wykonania, regularnej weryfikacji i commitów.
