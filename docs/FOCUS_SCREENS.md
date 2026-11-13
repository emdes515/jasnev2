# Szablon ekranów skupienia JASNE

Wspólne klasy znajdują się w `src/styles/focus-layout.css`. Stosuj je do lekcji, sprawdzianów i większych okien; nie twórz kolejnego niezależnego zestawu wysokości i odstępów.

## Ekran lekcji lub egzaminu

```tsx
<section className="focus-screen fixed inset-0 flex flex-col overflow-hidden bg-surface-bg">
  <header className="shrink-0 border-b border-surface-border">
    {/* Wspólna szerokość treści; zamknięcie minimum 44 × 44 px. */}
  </header>
  <main className="focus-scroll flex-1 px-4 sm:px-6">
    <div className="mx-auto w-full max-w-3xl py-5">{children}</div>
  </main>
  <footer className="focus-footer border-t border-surface-border">
    {/* Jedna główna akcja; stopka poza przewijaną treścią. */}
  </footer>
</section>
```

## Okna i podsumowania

- Nowe okna korzystają z `src/components/ui/Modal.tsx`. Długie tytuły zawijają się; nie znikają za wielokropkiem.
- `focus-dialog` ogranicza wysokość do dostępnego ekranu. Dla prostego starszego okna, w którym przewija się cały panel, użyj dodatkowo `focus-dialog-scroll`.
- `focus-scroll` oznacza jednego właściciela przewijania. Elementy flex wymagają `min-height: 0`; unikaj dwóch nakładających się pionowych pasków przewijania.
- `focus-result` pozwala przewinąć podsumowanie na niskim ekranie. Nie centruj wysokiej zawartości w sposób, który ukrywa jej początek.
- `100dvh` uwzględnia zmienną wysokość przeglądarki mobilnej. Zachowaj fallback `100vh` i marginesy `safe-area-inset-*`. Nie zakładaj, że test desktopowy symuluje prawdziwą klawiaturę telefonu.
- Formuły mogą przewijać się we własnym kontenerze; cały ekran nie może przewijać się poziomo.
- Zamknięcie ma czytelną nazwę, widoczny fokus i pole dotykowe 44 × 44 px. Ekran egzaminu wymaga potwierdzenia wyjścia, więc nie zastępuj jego istniejącej logiki zwykłym zamknięciem.

## Ograniczona kontrola wizualna

W widokach list i kart dobieraj liczbę kolumn do szerokości treści po odjęciu nawigacji. Nie ucinaj podstawowych tytułów lekcji i działów. Długi podgląd lekcji pokazuj po rozwinięciu zamiast ściskać go w każdej karcie. Sprawdź także dół strony: nagłówek wyglądający poprawnie nie potwierdza jakości całego widoku. Zrzuty porównawcze zapisuj w `artifacts/ui-review`, z nazwą widoku i informacją o stanie przed poprawką.

Sprawdź raz razem: komputer, telefon 390 × 844 i niski widok 844 × 390. Zweryfikuj długi nagłówek, dół treści, dolny przycisk, przewijanie i zamknięcie. Napraw wykryte problemy w jednej partii i wykonaj jedno przejście potwierdzające. Po zakończeniu przywróć rozmiar przeglądarki.

## Zgodność z Bazą Wiedzy JASNE

Szablon zachowuje Nocturne Luminary, czytelność Core-4 i skupienie na jednym zadaniu. Nie zmienia ekonomii serc, czasu egzaminu ani zapisu postępów. Dane pozostają w repozytorium Firestore.

## Listy lekcji i zmiana widoku

Reset przewijania kieruj do rzeczywistego właściciela scrolla (main-scroll-container), nie do wewnętrznej listy. Tytuł działu zawija się; akcje pomocnicze przechodzą na osobny wiersz na telefonie. Filtry mają minimum 44 px wysokości. Tylko bieżąca lekcja otrzymuje główny przycisk, a opcjonalna rozgrzewka jest domyślnie zwinięta. Błędy przypisania zadań i niepełne fragmenty teorii zapisuj jako błędy źródła treści, niezależnie od poprawnego wyglądu ekranu.

## Prognoza i ustawienia profilu

Wynik na pulpicie i w szczegółach renderuje wspólny `PredictionScore`; przed końcem kalibracji pokazuje stan zbierania danych. Nie łącz dużej liczby punktów z drugim dużym procentem w pierścieniu. Wybór przedmiotu korzysta z `SubjectPicker` i wspólnych akcentów w `src/styles/header-ui.css`. Liczniki nagłówka mają minimum 44 px wysokości na każdym urządzeniu. Zmiana celu nauki jest edycją preferencji w profilu, a nie ponownym onboardingiem. Zapis dotyczy tylko preferencji; anulowanie nie zmienia stanu konta.

## Odznaki i skarbiec

Używaj wspólnych `RewardButton`, `RewardStatus` i `RewardSummary` z `src/components/rewards/RewardsUI.tsx`. Status ma opisywać rzeczywisty stan, także gdy kolejna ranga jest gotowa do odbioru po odebraniu poprzedniej. Nagrody wyświetlają XP, monety, żetony i faktyczne efekty. Ceny mają wskazaną walutę, brak środków i limit zapasu mają jawny opis. Nie oferuj płatności ani produktu, którego efekt nie jest zaimplementowany. Testuj wyniki asynchroniczne i blokadę podwójnego kliknięcia bez wydawania waluty użytkownika.

## Lekcja: Pełna lekcja i Same zadania

Karta lekcji w `LearnView` ma dwie akcje i żadnego okna z pigułką. Pigułka jest krokiem pełnoekranowej sesji (`SessionRunner`, `focus-screen`), a nie modalem nad mapą.

- **Pełna lekcja** (główna akcja): pigułka, następnie zadania, wynik i powtórka. Sesja startuje od `currentStep: 0`.
- **Same zadania**: `handleStartLessonSession(..., tasksOnly = true)` ustawia `currentStep: 1`, więc teoria jest pominięta. W sesji angielskiego pomija to także bramkę mini-treningu (`isEnglishTrapPassed`); uznajemy to za świadomy wybór ucznia, który zna materiał.
- **Teoria w trakcie zadań**: przycisk `session-theory-review-button` (widoczny tylko dla niesprawdzonego zadania i gdy lekcja ma pigułkę) otwiera pigułkę. Niewysłana odpowiedź jest zapamiętana, a `session-theory-return-button` („Wróć do zadania”) wraca do tego samego zadania bez zerowania kolejki. Sprawdzone zadanie nie pokazuje przycisku, więc powrót nie pozwala ponowić odpowiedzi ani wydać serca drugi raz.
- Kontrola wyglądu: nagłówek mieści się przy 320 px (przycisk powrotu skraca się do „Wróć”), cele dotykowe mają co najmniej 44 × 44 px.

Test: `src/components/__tests__/SessionRunnerTheoryReview.test.tsx`. Zrzuty: `artifacts/ui-review/lekcja-*.jpg`.
