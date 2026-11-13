# Dopracowanie postępów, profilu i widoku matury

## Zmiany

- Postępy na pulpicie: trzy równe kolumny na komputerze i uporządkowane wiersze na telefonie. Wartości, podpisy i akcja powtórki mają wspólny rytm; usunięto nakładające się absolutnie pozycjonowane badge’e i unoszenie kart. Statystyki globalne nie są już podpisane jako dotyczące wyłącznie wybranego programu.
- Profil: szerszy obszar roboczy, zwarta karta konta, jednakowe pola statystyk, zwykła czcionka liczb, prostsze nazwy. Usunięto podpis „Tryb Demo” i przestarzałe „CKE 2025”. Wykres dzienny nie przypisuje całej historii rozwiązanych zadań do dzisiejszej daty ani nie wymyśla liczby zadań z samej obecności serii.
- Nagłówek: usunięto cienki pasek XP na całej szerokości oraz część poświat. Postęp XP pozostaje w profilu i nawigacji.
- Prognoza: spokojniejsza powierzchnia, czytelniejszy podpis obliczeń, mniej pulsowania.
- Symulator: usunięto kolejny duplikat wyboru przedmiotu i ozdobne litery/flagę. Przyciski zakresu treningu układają się pionowo na wąskim telefonie. Licznik postępu korzysta z liczby zadań aktywnego przedmiotu; 0% nie rysuje sztucznego wypełnienia. Uproszczono nazwy treningów i część niepotwierdzonych obietnic oficjalnego pochodzenia.

## Weryfikacja i ograniczenia

Wbudowana przeglądarka: pulpit, profil i hub matury, komputer oraz 390 × 844. Po weryfikacji przywrócono domyślny rozmiar. Potwierdzono czytelny profil i postępy oraz zmianę mianownika banku angielskiego z 211 na 1500 zadań. TypeScript i 19 testów regresji selektora, sesji oraz prognozy przeszły.

Jest to przegląd wskazanych powierzchni, nie dowód idealnego wyglądu całej aplikacji. Pozostałe ekrany, wszystkie przedmioty, długie treści, puste stany i jasny motyw wymagają osobnych przejść. Bank zadań i prognoza nadal wymagają osobnej kontroli merytorycznej; zmiana stylu nie potwierdza poprawności wszystkich założeń produktu.

## Zgodność z Bazą Wiedzy JASNE

Zachowano Nocturne Luminary, Firestore jako źródło kursów i ekonomię nagród. Wprowadzono wspólną hierarchię typografii, odstępy i powierzchnie; nie zmieniano historii postępów ani reguł serii.
