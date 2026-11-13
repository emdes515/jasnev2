# Prognoza wyniku: naprawa danych wejściowych (14 listopada 2026)

## Co było nie tak

1. **Zadania z banków nie liczyły się.** `extractTopicIdFromEntityId` nie rozpoznawało identyfikatorów `mat-pp-…`, `mat-pr-…`, `eng_uoe_…` i podobnych (5410 zadań w czterech bankach), więc składnik oparty na rozwiązanych zadaniach był zawsze zerem.
2. **Nieaktualne liczby lekcji.** Prognoza zakładała 11–15 lekcji w dziale matematyki (katalog ma 5) i 3 lekcje w każdym dziale angielskiego (dział 1 ma 7).
3. **Wyniki arkuszy mieszały się.** `maturaAttempts` i `maturaBestScore` były wspólne dla wszystkich przedmiotów, a trzypytaniowa diagnoza i dodatkowy zapis w `handleMaturaReward` zwiększały licznik. Prognoza jednego przedmiotu korzystała z wyników innego.
4. **Lekcje polskiego i angielskiego nie trafiały do prognozy.** Panel przekazywał tylko `completed_lessons`.

## Co zmieniono

- `src/lib/predictorTopics.ts`: jawne mapowanie identyfikatorów zadań i lekcji na działy oraz liczby lekcji. Zakresy angielskich identyfikatorów są zapisane tabelą i sprawdzane testem względem całego banku.
- `src/lib/examResults.ts` i pole `UserState.examResults`: wynik arkusza osobno dla `math`, `math-roz`, `pol`, `eng`, `eng-roz`. Sesje poniżej 20 punktów (trening, diagnoza) nie liczą się jako arkusz. Stare pola zostają bez zmian (historia i osiągnięcia), ale prognoza z nich nie korzysta.
- Panel przekazuje do prognozy lekcje ze wszystkich przedmiotów i wynik arkusza wybranego przedmiotu.
- Testy: `predictorTopics.test.ts` (mapowanie 1500 zadań angielskiego, 3000 zadań matematyki, liczby lekcji wg katalogów, zachowanie prognozy) i `examResults.test.ts`.

## Znane ograniczenia

- **Polskie zadania treningowe (`POL_Px_Ty_nnn`) nie mają działu.** Są pogrupowane wg formatu arkusza, więc nie wpływają na opanowanie działu. Prognoza polskiego opiera się na lekcjach. Dopiero metadane działu w banku pozwolą je uwzględnić.
- **Polski ma 28 działów w konfiguracji, ale lekcje tylko do 15.** Działy 16–28 nie mają lekcji i zostają na poziomie zgadywania (12%), co obniża prognozę.
- **`examResults` jest lokalne.** Reguły Firestore ograniczają listę zapisywalnych pól użytkownika, więc nowego pola nie dodałem do synchronizacji. Synchronizacja między urządzeniami wymaga zmiany reguł i ich wdrożenia (decyzja osobna).
- **Prognoza to heurystyka**: baza 12%, wagi i szacowana pewność, bez walidacji na rzeczywistych wynikach. Nie zmieniałem jej wzoru ani komunikatów o pewności.
- Dla angielskiego rozszerzonego wciąż brak lokalnego katalogu lekcji (stała wartość 2 z poprzedniej wersji).

## Zgodność z Bazą Wiedzy JASNE

Zmiana nie dotyka ekonomii, passy, serc ani limitów AI. Uwzględnia „rdzewienie wiedzy” tylko tak, jak dotąd (bez zmian). Reguły Firestore i dane produkcyjne nie były zmieniane.
