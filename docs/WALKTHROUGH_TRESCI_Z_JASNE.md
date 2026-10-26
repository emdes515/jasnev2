# Walkthrough: treści i dane z JASNE (0.45) w jasnev2

Gałąź `feat/tresci-z-jasne`. Źródło: repozytorium `emdes515/jasne_testowa`, gałąź `feat/matematyka-rozszerzona`, commit `5c3ef40`.
Cel: przenieść treści, dane i logikę oceniania, a wygląd i komponenty UI zostawić z jasnev2.

## Jak porównano oba repozytoria

Porównanie hashy blobów pokazało, że jasnev2 to w ~96% commit `bc68406` z 0.45 (09.10.2026), czyli 953 z 996 plików ma identyczną treść, plus własne zmiany jasnev2.
Dlatego `bc68406` posłużył jako wspólna baza do scalania trójstronnego:

- **zmiany jasnev2 od bazy (zostają):**
  - tasowanie odpowiedzi ABCD (`src/utils/taskShuffler.ts`);
  - sesje 3 zamknięte + 2 otwarte z zamianą zadań zamkniętych na otwarte;
  - `EnglishTrapInteractive` i `englishTrapData.ts`;
  - przebudowane `MathLessonView`, `EnglishLessonView`, `PolishLessonView` i `randomizer.ts`;
  - usunięcie Vercela (`api/`, CI, `vercel.json`).
- **zmiany 0.45 od bazy:** kurs PR, generator PP, arkusze CKE, ocena etapami w BFF i ponad 3000 zmian kolorów na tokeny (warstwa wyglądu 0.45, **nieprzeniesiona**).

Wniosek: różnice w 75 komponentach to w większości późniejsze refaktory wyglądu w 0.45, a nie wygląd jasnev2. Dlatego komponenty zostały z jasnev2, a logikę przeniesiono z diffów 0.45 po odfiltrowaniu samych zmian klas CSS, hunk po hunku.

## Co przeniesiono

### 1. Matematyka rozszerzona (PR)
- Generator `scripts/math_pr/*` i wspólny `scripts/math_pp/lib.js`.
- Dane: `pr_blueprints.json`, `pr_tasks.json`, `mathRozCurriculumData.ts` i `mathDataLoader.ts` (`loadMathRozCurriculum`).
- Gałęzie PR w `curriculumRepository.ts`, scalone trójstronnie z fallbackiem PP z jasnev2.
- Formuły `f-pr-*` i `withLocalCkeFormulas` w `ckeFormulasData.ts`.
- Seed `curriculum_matematyka_pr.json` oraz dokumentacja `docs/curriculum/PLAN_MATEMATYKA_ROZSZERZONA.md` i `docs/curriculum/matematyka_pr/*`.
- Karta „Matematyka Rozszerzona” w LearnView ma teraz poprawny opis: 15 działów, 75 lekcji, 1500 zadań (wcześniej „20 lekcji • 120 zadań”).

### 2. Ocena zadań otwartych etapami
- Typy `RubricStage`, `rubric_stages` i `zero_rules` w `types.ts` i `schema_firestore.ts`.
- BFF: `aiRequest.ts`, `evaluation.prompt.ts`, `taskEvaluator.service.ts`, `fallbackEvaluator.service.ts` oraz testy `rubricStages.test.ts` i `gradeFallbackFlag.test.ts`.
- UI, czyli logika wpisana w istniejące komponenty jasnev2:
  - `RubricSelfAssessment`: nowy komponent przepisany na słownik stylu jasnev2 (`#0E1522`, `#141D2E`, `#FFB800`, `white/[0.06]`), bo tokenów `hairline`, `text-strong` i `veil` z 0.45 nie ma w `index.css` jasnev2;
  - SessionRunner:
    - `OPEN_CALCULATION` w `isOpenTask`;
    - `rubric_stages` i `zero_rules` wysyłane do `/api/evaluate-task`;
    - `handleRubricSelfAssessment`;
    - komunikat „oceń się sam etapami”, gdy AI jest niedostępne;
  - znacznik „Rozszerzenie” w `CkeFormulasModal` (ten sam styl `primary`, co reszta karty).

### 3. Matematyka podstawowa
- Generator `scripts/math_pp/*`, dane `math_blueprints.json` i `all_1500_tasks.json`.
- `ckeExamTasks.ts`, `mathPpLessonDiagrams.ts`, `mathVisualRegistry.ts` i `allMathTasks.ts`.
- Seed: arkusze `exams/*`, `cke_formulas.json`, `cke_tasks_matematyka.json`, `cke_weights.json` i `zadania_matura.json`.
- Testy `src/data/__tests__/*`.
- `mathCurriculumData.ts` to wersja z 0.45 (lekcje z `math_blueprints.json`, pule po 20 zadań) plus `convertMathTaskToOpen` z jasnev2. Funkcja zamienia teraz zadanie zamknięte na otwarte tylko wtedy, gdy wynik da się jednoznacznie wpisać: liczba (także z jednostką lub procentem), ułamek, `m = 4` albo punkt `(a, b)`. Wcześniej wpisywała do pola liczbowego np. „ma dokładnie dwa rozwiązania”.
- `src/data/math/blueprints/dzial*.ts` i `mathBlueprintTypes.ts` usunięte. Korzystał z nich tylko stary `mathCurriculumData.ts`, a `math_blueprints.json` w pełni je zastępuje (15 działów, 75 lekcji z pigułkami Core-4).

### 4. Angielski
- `englishPillars.ts`, `englishDataLoader.ts`, różnice w `englishCurriculumData.ts` (scalone z tasowaniem jasnev2) i materiały `matura_angielski_podstawowy/*` (~148 MB PDF/MP3).
- `englishTrapData.ts` i testy angielskiego z jasnev2 zostają bez zmian.

### 5. Polski
- `polishLessonsData.ts` i `polishCurriculumData.ts` (scalone trójstronnie).
- `tasks_polski/randomizer.ts` zostaje z jasnev2, bo 0.45 nie zmieniał go od bazy.

### Drobne poprawki logiki z 0.45
- Kolejka powtórek `pickRetryTask` i `nextQueueIndex` (`src/lib/sessionQueue.ts`): powtórka nie dziedziczy cudzego rysunku, a podwójne „Dalej” nie przeskakuje zadania.
- `toFormulaBoxContent` w kasetonach wzorów.
- Domykanie `$` w krokach rozwiązania i w `MathRenderer`.
- „Pierwsza lekcja na próbę” (`isFirstLessonGrace` + `showToast`, `ToastHost` w App).
- Zdarzenie `storage` emitowane tylko przy realnej zmianie przedmiotu (wcześniej powodowało pętlę).
- `transitionEnd: { filter: 'none' }`, żeby modale `fixed` nie wypadały poza ekran.
- Prawdziwe liczby zadań w tekstach, np. „1500 zadań” i „211 zadań CKE z kluczem” zamiast „1006”, oraz „w stylu CKE” zamiast „Baza CKE” przy zadaniach autorskich.
- Pierwsze zadanie otwarte w sesji stoi na 3. pozycji (sesja kończy się po 3 poprawnych).

### Poprawki ponad zakres
- **Postęp matematyki PP pokazywał 400%** (błąd także w 0.45). Licznik liczy zadania z pełnej puli działu (20 na lekcję), a mianownik sumował `tasks_count` (5 na sesję). Mianownik to teraz pula działu (`LearnView.tsx`).
- `drawSessionTasks` rozpoznaje lekcje `math-pr-*` jako `matematyka-rozszerzona`.

## Czego nie przeniesiono (świadomie)
- Wygląd 0.45: tokeny kolorów, motyw jasny (`theme-light-adapter.css`, `themeManager.ts`), audyt mobilny, PWA (`public/*`, `index.html`, manifest) i emoji zamienione na ikony.
- Lazy loading ekranów w `App.tsx` (wydajność; jasnev2 importuje je statycznie).
- Zmiany biznesowe 0.45 do decyzji produktowej:
  - voucher bez odliczania (`promotionService.ts`);
  - brak banera PRO w sesji;
  - `isDevAccessAllowed` (pełny dostęp dev tylko lokalnie i z `?dev=1`);
  - licznik serc „∞” w trybie teorii.
- Logika `MaturaSimulatorView` i `MaturaExamReview` dla formatów CKE innych niż ABCD oraz test `MaturaExamReview.test.tsx`.
- `MathStudyHub` i `StructuredAnswerInput`: `MathStudyHub` nie jest renderowany w aplikacji jasnev2 (tylko w teście), główna ścieżka to LearnView → SessionRunner.
- `src/data/zadania_matura.ts` zostaje: 0.45 go usunął, w jasnev2 nic go nie importuje.

## Zmiany w testach
- `tests/curriculumTasksDistribution.test.ts` (jasnev2): wymóg 3 + 2 obowiązuje dla 74 z 75 lekcji. Lekcja 2.3 (rozkład wielomianu na czynniki) nie ma żadnej odpowiedzi, którą da się jednoznacznie wpisać, więc test ma dla niej jawny wyjątek z komentarzem. Uzupełnienie jej o zadanie otwarte to praca dla generatora `scripts/math_pp`.
- `MathStudyHub.test.tsx`: środowisko `jsdom` zmienione na `happy-dom`. Na Node 22.11 jsdom 27 nie startuje (`ERR_REQUIRE_ESM`); ten sam błąd jest na czystym jasnev2. Pozostałe testy komponentów jasnev2 używają już happy-dom.
- `CkeFormulaSheetPages.test.ts`: wersja z 0.45, zgodna z nowymi danymi karty wzorów (strony CKE 2023).
- `SessionRecoveryIntegration.test.tsx`: dodano tylko wyłączenie WAAPI z `5c3ef40` (nieobsłużony AbortError z happy-dom). Asercje klas zostały z jasnev2.

## Weryfikacja
- `npx tsc --noEmit`: 0 błędów.
- `npx vitest run`: 50 plików, 495 testów, wszystkie przechodzą (w tym testy jasnev2: angielski, `MathStudyHub`, rozkład zadań).
- `node scripts/math_pr/build.js`: 15 działów, 75 lekcji, 1500 zadań, 0 błędów lintu, wynik identyczny z repozytorium. `node scripts/math_pp/build.js` również bez różnic.
- Przeglądarka (dev server jasnev2, telefon 375 px):
  - Nauka → Matematyka Rozszerzona → 15 działów;
  - lekcja 5.3: pigułka Bento, 2 zadania ABCD;
  - zadanie otwarte za 4 pkt z przyciskiem „Oceń się etapami CKE (bez AI)”, etapami 0–4 i regułą zerującą;
  - zatwierdzenie 3/4 pkt daje raport egzaminatora i zaliczenie lekcji (XP, monety, seria).
- Render `CkeFormulasModal` pokazuje 15 znaczników „Rozszerzenie”.

**Nie sprawdzono:** ocena egzaminatorem AI na żywo (koszt zapytań), symulator arkuszy z nowymi danymi w przeglądarce, wygląd na desktopie i angielski/polski w przeglądarce. Seed nie został wysłany do Firestore.

## Zgodność z Bazą Wiedzy JASNE

| Notatka / zasada | Realizacja |
| :--- | :--- |
| Architektura Systemu i BFF | Ocena etapami działa w Expressie: `sanitizeAiBody` → `sanitizeRubricStages` / `sanitizeZeroRules` → `snapScoreToStage`. Klucze AI bez prefiksu `VITE_` (jedyne wystąpienia to istniejące ostrzeżenie o starym fallbacku w `server/config.ts`). Samoocena etapami nie kosztuje zapytań do LLM. |
| Frontend i Stan Aplikacji | Logika dopisana do komponentów jasnev2, bez wymiany ich na wersje z 0.45. Stan sesji (kolejka, `isEvaluated`) zgodny z wzorcem SessionRunnera; nowe moduły `lib/sessionQueue`, `lib/formulaBox`, `lib/toast` mają testy. |
| Model Danych Cloud Firestore | Kurs PR i PP z leniwych paczek (`mathDataLoader`) i cache `curriculumRepository` (cache-first, bez wielokrotnych odczytów). `src/` nie importuje `seed/`. Seed zaktualizowany, nie wysłany. |
| Mechanika Dydaktyczna Core-4 | Lekcje ~5 min, pigułka Bento z 5 sekcjami, Format Matrix (ABCD, P/F, liczbowe, otwarte z etapami), pułapki CKE i `zero_rules`. Zamiana na zadanie otwarte nie tworzy już zadań niemożliwych do wpisania. |
| Design System – Nocturne Luminary | Wygląd jasnev2 bez zmian. Nowe elementy (`RubricSelfAssessment`, znacznik „Rozszerzenie”, `ToastHost`) używają palety jasnev2: `#0E1522`, `#141D2E`, `#FFB800`, `#F43F5E` i tokenów `primary` / `surface-elevated`, które istnieją w `index.css`. |
| Model Bezpieczeństwa i Reguły | Bez zmian w regułach Firestore i `originGuard` (zostaje wersja jasnev2). Etapy rubryki są walidowane i przycinane po stronie serwera (limit 8 etapów, 600 znaków). |
| Ekonomia Wirtualna / Inżynieria Behawioralna | `HEARTS_REFILL_COIN_COST = 150`, `REGEN_INTERVAL_MS = 30 min`, `DAILY_FREE_AI_VISION_LIMIT = 3` bez zmian. `streakDays` nietknięte. Samoocena „0 pkt” nie zabiera serca. Pierwsza lekcja nie zabiera serc (Time-to-Value). Poprawna odpowiedź emituje konfetti, XP i monety. |
| Model Biznesowy i Cennik | Zmiany cenowe i promocyjne z 0.45 nieprzeniesione, czekają na decyzję właściciela. |
