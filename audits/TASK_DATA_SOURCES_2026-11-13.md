# Źródła zadań JASNE — stan kodu przed migracją, 13 listopada 2026

> Raport historyczny. Opisaną niezgodność usunięto w późniejszej migracji. Aktualny stan: [Firestore jako źródło danych](FIRESTORE_MIGRATION_2026-11-13.md).

## Wynik kontroli

Aktualna aplikacja korzysta z modelu mieszanego, z pierwszeństwem treści zapisanych w kodzie dla głównych kursów. Sama obecność Firebase i `curriculumRepository` nie oznacza, że wyświetlane zadania pobrano z Firestore. Nie odczytywano w tej kontroli zawartości produkcyjnej bazy, dlatego nie potwierdzono jej kompletności ani zgodności z obecnymi plikami.

| Ścieżka | Faktyczne zachowanie kodu |
| --- | --- |
| Lista działów matematyki podstawowej i rozszerzonej, polskiego oraz angielskiego | `curriculumRepository.getTopics()` zwraca lokalne tablice przed dojściem do odczytu Firestore. |
| Lekcje i zadania kursowe | `getLesson()` rozwiązuje lekcje przez lokalne funkcje `getPolishLessonDocument`, `getEnglishLessonDocument`, `getMathLessonDocument` i `getMathRozLessonDocument` przed odczytem Firestore. |
| Bank i arkusze matematyki | `getCkeExamTasks()` oraz `getCkeExamSheet()` preferują treści wbudowane w aplikację. Dopiero brak lokalnego wyniku uruchamia odczyt `exams`. |
| Symulator polskiego i angielskiego | `MaturaSimulatorView` bezpośrednio importuje `ALL_POLISH_TASKS` i `ALL_ENGLISH_TASKS` i z nich buduje pulę. |
| Widoki kursów językowych | `PolishStudyHub` i `EnglishStudyHub` bezpośrednio korzystają z lokalnych danych, w tym tablic zadań. |
| Składanie sesji | `dzial1TaskPool` korzysta z cache repozytorium, ale również importuje lokalny `getMathLessonDocument`. Komentarz o braku treści w paczce nie odzwierciedla obecnej architektury. |
| Wzory i wagi CKE | `ckeCatalogRepository` odczytuje dokumenty `system/ckeFormulas` i `system/ckeSubjectWeights`; zawiera też lokalne konfiguracje domyślne. |
| Promocje | Odczyt `system/promotions`, z domyślną konfiguracją przy błędzie. Lokalne `firestore.rules` już zezwalają na publiczny odczyt tego konkretnego dokumentu. Ostrzeżenie z testu wymaga sprawdzenia wdrożonych reguł i docelowego projektu, a nie dodania szerokiego dostępu do całej kolekcji `system`. |

## Miejsca wymagające migracji

1. Zweryfikować aktualną instancję Firestore i sporządzić zestawienie istniejących przedmiotów, działów, lekcji oraz arkuszy wraz z identyfikatorami. Projekt domyślny w `.firebaserc`: `jasne-7efe7`.
2. Porównać identyfikatory i treść z lokalnymi zbiorami. Szczególnie ważne są zgodność postępu użytkowników, liczba działów, wersja kurikulum i limit wielkości dokumentu. Nie nadpisywać starszych kolekcji bez tego porównania.
3. Przygotować i zweryfikować import aktualnej treści do docelowego schematu `subjects/{subjectId}/topics/{topicId}/lessons/{lessonId}` oraz danych egzaminacyjnych. Istniejące skrypty seedowania nie są dowodem zgodności z bieżącym kurikulum.
4. Przełączyć repozytorium na cache treści pobranych z Firestore, usunąć lokalne pierwszeństwo oraz bezpośrednie importy z widoków i modułu sesji. Pamięć podręczna musi zachować pochodzenie i wersję danych; nie wolno przedstawiać lokalnego fallbacku jako odpowiedzi bazy.
5. Dodać test, w którym zmiana dokumentu testowego Firestore zmienia wyświetlane zadanie bez przebudowania aplikacji, oraz testy braku danych, błędu odczytu i powrotu offline.

Ta kontrola nie przeniosła zadań do Firestore i nie zmieniła źródła treści. Masowe przełączenie przed sprawdzeniem zgodności bazy mogłoby wyświetlić starszy kurs albo zablokować lekcje. Wynik kontroli stanowi konkretną listę miejsc do migracji.

## Naprawy błędów z testu gościa

- Wspólna normalizacja aliasów lekcji eliminuje wielokrotne sumowanie tego samego błędu na pulpicie i w prognozie. Zachowuje oddzielne identyfikatory przedmiotów i ignoruje niepoprawne wartości liczbowe.
- Symulator otrzymuje te same błędy lekcji i ukończone lekcje co pulpit, a prognozę oblicza dla aktualnego przedmiotu.
- Samoocena zadania otwartego ma własny nagłówek i komunikat zapisania punktów; nie deklaruje niezależnej weryfikacji rozwiązania przez egzaminatora.
- Licznik błędów lekcji nie jest opisywany jako liczba wszystkich zadań czekających w odrębnym banku błędów egzaminacyjnych.
- Poprawiono odmianę „1 dzień” w podpowiedziach nagłówka.

## Zgodność z Bazą Wiedzy JASNE

Docelowa architektura wymaga treści z Firestore przez cache repozytorium. Kontrola wykazała odstępstwo od tej reguły. Wprowadzane poprawki interfejsu i statystyk nie zmieniają ekonomii serc, zasad serii ani uprawnień bazy. Migracja źródeł pozostaje jawnym zadaniem do wykonania.
