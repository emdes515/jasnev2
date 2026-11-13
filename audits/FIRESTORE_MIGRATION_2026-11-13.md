# Firestore jako główne źródło kursów — 13 listopada 2026

## Wprowadzona zmiana

Centralne repozytorium pobiera przedmioty, działy, lekcje, arkusze i banki z Firestore. Kopia zapisana po poprawnym odczycie jest ważna przez 12 godzin. Po błędzie sieci lub przekroczeniu 5 sekund używana jest ostatnia kopia z Firestore, a dopiero przy jej braku pliki z `src/data/offline`. Równoległe odczyty tego samego zasobu są łączone. Nie zapisuje się lokalnego zestawu jako odpowiedzi Firestore.

Widoki kursów polskiego i angielskiego, ich lekcje oraz symulator matury otrzymują banki przez wspólną warstwę danych. Generator matematycznej minimatury jest konfigurowany pulą wybraną przez repozytorium. Synchroniczny moduł składania sesji korzysta z wcześniej załadowanej lekcji zamiast samodzielnie sięgać do lokalnej matematyki.

Treści lokalne są zebrane w katalogu `src/data/offline`. Stare moduły pozostają przekierowaniami eksportów. Historyczne dane generatorów, które nie są aktywnym źródłem aplikacji, nie są publikowane jako nowe kursy.

## Publikacja w chmurze

- Projekt: `jasne-7efe7`, baza domyślna Firestore Standard, tryb Native.
- Opublikowano 363 dokumenty kursów, banków i metadanych.
- Kurs matematyki podstawowej: 15 działów, 75 lekcji; pula ćwiczeń: 1500 zadań.
- Kanoniczny kurs polskiego: 28 działów, 34 dokumenty lekcji; pula ćwiczeń starszego widoku: 910 zadań. Osobny katalog zachowuje metadane starszego widoku kursu.
- Angielski: 15 działów, 49 dokumentów lekcji; pula ćwiczeń: 1500 zadań.
- Matematyka rozszerzona: 15 działów, 75 lekcji; pula ćwiczeń: 1500 zadań.
- Największy przygotowany dokument: 495 069 bajtów.
- Zachowano kopię 185 zastępowanych dokumentów w ignorowanym przez Git katalogu `artifacts/curriculum-backups/`. Archiwalnych dokumentów ani kolekcji użytkowników nie usuwano.

Dokument przedmiotu wskazuje aktywne działy przez `publishedTopicIds`. Duże banki znajdują się pod `subjects/{subjectId}/taskBanks/{exam|practice|study}`. Manifest zawiera `chunkIds`, `revision` i `taskCount`, a fragmenty — tablicę `tasks`. Odczytywane są wyłącznie fragmenty wskazanej wersji. Brak fragmentu, powielone identyfikatory lub niezgodna liczba zadań wywołują bezpieczny powrót do kopii.

Do aktualnie wdrożonych reguł dodano wyłącznie publiczny odczyt manifestów, fragmentów banków oraz `system/promotions`. Zachowano pozostałe reguły i zakaz klientowskiego zapisu tych treści. Poprawną postać aktualizacji reguł sprawdzono w [dokumentacji Firebase Rules API](https://firebase.google.com/docs/reference/rules/rest/v1/projects.releases/patch).

## Weryfikacja

Pełna regresja: 54 pliki testów, 514 zaliczonych testów, bez nieobsłużonych błędów. Produkcyjny build zakończył się poprawnie; zachowuje wcześniejsze ostrzeżenia o rozmiarze pakietów.

Potwierdzono publiczny odczyt metadanych wszystkich czterech przedmiotów i ich banków ćwiczeń. Wbudowana przeglądarka potwierdziła źródło `firestore` dla list działów, katalogu polskiego, polskiego banku ćwiczeń oraz dokumentu pierwszej lekcji matematyki. Uruchomiono widok polskiej lekcji z siedmioma zadaniami i matematyczną teorię.

Testy warstwy danych obejmują pierwszeństwo Firestore, odzyskiwanie zapisanej kopii, awarię sieci, limit oczekiwania, łączenie równoległych odczytów i odrzucanie niekompletnych banków. Nie wyłączano fizycznie połączenia urządzenia w teście przeglądarkowym; scenariusze awarii sprawdzono w testach automatycznych.

Kod aplikacji pozostaje na branchu `codex/ui-audit-fixes`. Publikacja treści i reguł Firestore nie oznacza wdrożenia nowej wersji frontendu na hosting.

## Zgodność z Bazą Wiedzy JASNE

Firestore jest źródłem treści, a widoki korzystają z repozytorium i pamięci podręcznej. `src/` nie importuje `seed/`. Nie zmieniano ekonomii serc, zasad ochrony serii ani dostępu do prywatnych profili. Lokalne kopie awaryjne mają jednoznaczne miejsce i nie zastępują poprawnie odczytanych danych z bazy.
