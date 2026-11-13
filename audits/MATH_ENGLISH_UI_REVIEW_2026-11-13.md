# Matematyka i angielski — przegląd UI/UX, 13 listopada 2026

Sprawdzono lokalną aplikację na branchu `codex/ui-audit-fixes`, w przeglądarce wbudowanej. Zmiany frontendu nie zostały wdrożone publicznie.

## Zakres i dowody

- Komputer: mapy obu przedmiotów przewinięte do ostatniego działu; listy lekcji pierwszego działu od góry do sprawdzianu.
- Telefon: viewport 390 × 844; obie mapy i listy lekcji przewinięte do końca. To test responsywności, nie fizycznego urządzenia.
- Angielski: teoria od początku do końca, minićwiczenie odblokowujące zadania, odpowiedzi, wynik 100% i powrót do lekcji. Test zwiększył lokalny postęp konta gościa.
- Matematyka: teoria od początku do końca, przejście do zadania i potwierdzenie wyjścia. W tej rundzie nie kończono ponownie całej sesji matematyki.
- 26 zrzutów w `artifacts/ui-review`. Nazwy `before` oznaczają stan sprzed tej partii zmian; pozostałe dokumentują kolejne etapy kontroli. `math-map-desktop-top.jpg` pokazuje zachowaną pozycję w środku mapy, a nie rzeczywisty początek — ten błąd przewijania następnie poprawiono.

## Poprawione

1. Nagłówek działu zawija cały tytuł; na telefonie słownik i licznik lekcji mają osobny wiersz.
2. Tylko aktualna lekcja ma główny złoty przycisk. Powtórka i pozostałe lekcje korzystają z przycisków drugorzędnych.
3. Ograniczono obramowania i poświaty aktywnej lekcji oraz sprawdzianu. Nazwę „Walka z bossem” zastąpiono „Sprawdzian działu”.
4. Rozgrzewka angielskiego jest opcjonalna i domyślnie zwinięta, dzięki czemu właściwa lekcja pojawia się wcześniej.
5. Filtry angielskiego zawijają się, mają czytelne etykiety i pola dotykowe o wysokości minimum 44 px. Opis pod filtrami nie jest ucinany.
6. Zmiana przedmiotu i widoku zeruje przewijanie właściwego kontenera aplikacji. Wcześniej mapa mogła otwierać się w połowie.
7. Gramatyka i przykłady angielskiego używają czytelnego fontu bezszeryfowego. Formuły interpretują formatowanie zamiast pokazywać surowe backticki. Usunięto przekreślenie całych błędnych zdań.
8. Uproszczono etykiety teorii i pułapek; usunięto dekoracyjny wskaźnik częstotliwości CKE i podpis „Klucz CKE” z autorskiej karty przykładu.

## Otwarte błędy treści i ograniczenia

- **Istotne: angielski 1.1.** Lekcja „Present Simple vs Present Continuous” podała zdanie warunkowe „If it ...” i powtórzyła tę samą treść z inną kolejnością odpowiedzi. Lokalny model wybiera zadania przez `taskIds` w `src/data/offline/english/englishLessonsData.ts`; `src/data/offline/englishCurriculumData.ts` filtruje bank po tych identyfikatorach, a `drawSessionTasks` bierze pierwsze pięć zadań. Główne źródło sesji nadal stanowi dokument lekcji z `curriculumRepository`. Potrzebna jest korekta przypisania i duplikatów w banku oraz publikacja poprawionych dokumentów Firestore. Nie wykonano automatycznej, heurystycznej podmiany treści.
- **Naprawione dodatkowo: matematyka 1.1.** Końcowa wskazówka urywała się na „Waga: 1 pkt (”. Przyczyną był sanitizer usuwający hasło „Żelazny pewniak” wraz z zamknięciem nawiasu. Usuwa teraz cały nawias z tym hasłem, zachowując kolejne zdanie. Dodano test regresji. Zrzut `math-theory-mobile-bottom.jpg` dokumentuje stan przed tą ostatnią poprawką.
- Nazwy źródłowe lekcji angielskiego nadal zawierają przesadne sformułowania, np. „Kontrast Gigantów” i „Wielki Maturalny Miks”. Powinny zostać zredagowane w źródle Firestore razem z przypisaniem zadań, aby tytuły i treść pozostawały spójne.
- Nie zweryfikowano wszystkich 15 działów jako pełnych sesji, rozszerzeń, rzeczywistego audio, fizycznej klawiatury telefonu ani jasnego motywu. Zrzuty map nie dowodzą poprawności wszystkich zadań.
- Build nadal ostrzega o dużych pakietach i mieszanych importach statycznych/dynamicznych. Jest to osobny problem wydajności.

## Weryfikacja

TypeScript bez błędów; 41 testów w czterech zestawach zaliczonych (sesje, odzyskiwanie sesji, wybór przedmiotu, interaktywne pułapki angielskiego). Po dodatkowej poprawce sanitizera zaliczono także 66 testów w trzech zestawach funkcji sesji i odporności formatowania (część testów pokrywa się z pierwszą partią), ponowny TypeScript i końcowy build. Pozostają opisane ostrzeżenia o pakietach.

## Zgodność z Bazą Wiedzy JASNE

Zachowano Nocturne Luminary, obsługę treści przez repozytorium Firestore i metodykę Core-4. Nie zmieniano ekonomii serc, nagród ani warunków zaliczenia. Reguły przeglądania i dokumentowania ekranów są zapisane w `docs/FOCUS_SCREENS.md`.

## Galeria

### english-lessons-desktop-bottom-after.jpg

![english-lessons-desktop-bottom-after.jpg](../artifacts/ui-review/english-lessons-desktop-bottom-after.jpg)


### english-lessons-desktop-bottom-before.jpg

![english-lessons-desktop-bottom-before.jpg](../artifacts/ui-review/english-lessons-desktop-bottom-before.jpg)


### english-lessons-desktop-top-after.jpg

![english-lessons-desktop-top-after.jpg](../artifacts/ui-review/english-lessons-desktop-top-after.jpg)


### english-lessons-desktop-top-before.jpg

![english-lessons-desktop-top-before.jpg](../artifacts/ui-review/english-lessons-desktop-top-before.jpg)


### english-lessons-mobile-bottom-after.jpg

![english-lessons-mobile-bottom-after.jpg](../artifacts/ui-review/english-lessons-mobile-bottom-after.jpg)


### english-lessons-mobile-top-after.jpg

![english-lessons-mobile-top-after.jpg](../artifacts/ui-review/english-lessons-mobile-top-after.jpg)


### english-map-desktop-bottom.jpg

![english-map-desktop-bottom.jpg](../artifacts/ui-review/english-map-desktop-bottom.jpg)


### english-map-desktop-top-after.jpg

![english-map-desktop-top-after.jpg](../artifacts/ui-review/english-map-desktop-top-after.jpg)


### english-map-desktop-top-before.jpg

![english-map-desktop-top-before.jpg](../artifacts/ui-review/english-map-desktop-top-before.jpg)


### english-map-mobile-bottom-after.jpg

![english-map-mobile-bottom-after.jpg](../artifacts/ui-review/english-map-mobile-bottom-after.jpg)


### english-map-mobile-top-after.jpg

![english-map-mobile-top-after.jpg](../artifacts/ui-review/english-map-mobile-top-after.jpg)


### english-result-mobile.jpg

![english-result-mobile.jpg](../artifacts/ui-review/english-result-mobile.jpg)


### english-task-mobile.jpg

![english-task-mobile.jpg](../artifacts/ui-review/english-task-mobile.jpg)


### english-theory-mobile-bottom.jpg

![english-theory-mobile-bottom.jpg](../artifacts/ui-review/english-theory-mobile-bottom.jpg)


### english-theory-mobile-top-after.jpg

![english-theory-mobile-top-after.jpg](../artifacts/ui-review/english-theory-mobile-top-after.jpg)


### math-lessons-desktop-bottom-before.jpg

![math-lessons-desktop-bottom-before.jpg](../artifacts/ui-review/math-lessons-desktop-bottom-before.jpg)


### math-lessons-desktop-top-before.jpg

![math-lessons-desktop-top-before.jpg](../artifacts/ui-review/math-lessons-desktop-top-before.jpg)


### math-lessons-mobile-bottom-after.jpg

![math-lessons-mobile-bottom-after.jpg](../artifacts/ui-review/math-lessons-mobile-bottom-after.jpg)


### math-lessons-mobile-top-after.jpg

![math-lessons-mobile-top-after.jpg](../artifacts/ui-review/math-lessons-mobile-top-after.jpg)


### math-map-desktop-bottom.jpg

![math-map-desktop-bottom.jpg](../artifacts/ui-review/math-map-desktop-bottom.jpg)


### math-map-desktop-top.jpg

![math-map-desktop-top.jpg](../artifacts/ui-review/math-map-desktop-top.jpg)


### math-map-mobile-bottom-after.jpg

![math-map-mobile-bottom-after.jpg](../artifacts/ui-review/math-map-mobile-bottom-after.jpg)


### math-map-mobile-top-after.jpg

![math-map-mobile-top-after.jpg](../artifacts/ui-review/math-map-mobile-top-after.jpg)


### math-task-mobile-after.jpg

![math-task-mobile-after.jpg](../artifacts/ui-review/math-task-mobile-after.jpg)


### math-theory-mobile-bottom.jpg

![math-theory-mobile-bottom.jpg](../artifacts/ui-review/math-theory-mobile-bottom.jpg)


### math-theory-mobile-top.jpg

![math-theory-mobile-top.jpg](../artifacts/ui-review/math-theory-mobile-top.jpg)
