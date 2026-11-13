# Wybór przedmiotu, typografia i pochodzenie zadań

Zamiast poziomej listy kolorowych przedmiotów pulpit ma podpisane pole wyboru przedmiotu i poziomu. Nagłówek oraz statystyki używają zwykłej czcionki interfejsu; wspólne badge’e nie wymuszają wielkich liter i szerokiego rozstawienia. Usunięto emoji z tekstów JSX i komunikatów komponentów, zachowując wyrażenia regularne oraz treści banków zadań.

Wprowadzono wspólne `taskProvenance` dla sesji, widoku zadania, lekcji matematyki i angielskiego oraz symulatora. Sam badge, słowo „matura” lub rok nie potwierdza źródła CKE. Rozpoznanie wymaga kanonicznego identyfikatora arkusza albo jawnego znacznika `isCke`, wraz z sesją, rokiem i numerem zadania. Etykieta podaje także identyfikator arkusza. Pozostałe zadania wyświetlają zwykły tekst „Autorskie zadanie JASNE”. Nie wykonywano merytorycznego porównania wszystkich zadań ze skanami CKE; kompletność i prawdziwość metadanych nadal wymaga kontroli redakcyjnej.

Przeglądarka potwierdziła render nowego selektora i typografii na pulpicie. Testy źródeł obejmują fałszywą dekoracyjną etykietę CKE, niepełne metadane oraz kanoniczny arkusz. Skorzystano z istniejących Impeccable i frontend-design. Wyszukiwarka skilli nie znalazła pakietów Woodtaste ani Good-taste; nie deklaruje się ich instalacji.

## Zgodność z Bazą Wiedzy JASNE

Zachowano kolory Nocturne Luminary i repozytorium Firestore. Zmiany nie wpływają na nagrody, koszty serc ani zasady zapisu postępu. Kod pozostaje lokalnie na `codex/ui-audit-fixes`.
