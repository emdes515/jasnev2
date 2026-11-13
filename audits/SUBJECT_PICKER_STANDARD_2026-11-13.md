# Wspólny wybór przedmiotu

Model `src/lib/subjects.ts` określa nazwy, poziomy, klucze i ikony pięciu dostępnych programów. `SubjectPicker` renderuje jedną listę: ten sam rozmiar ikon Lucide, nazwa przedmiotu i poziom w oddzielnych wierszach, oznaczenie aktualnego wyboru, zamykanie po wyborze, poza listą i klawiszem Escape.

Nagłówek jest głównym miejscem zmiany przedmiotu. Usunięto powielony selektor z pulpitu oraz klikalne selektory z nagłówków mapy i listy lekcji. Pozostałe okna wyboru korzystają ze wspólnego komponentu. Na wąskim ekranie selektor zajmuje osobny wiersz zamiast ściskać logo i liczniki.

Naprawiono mapowanie `eng-roz` do bazowego przedmiotu: wcześniej handler aplikacji mógł przypisać matematykę. Nagłówek nie wywołuje już jednocześnie dwóch handlerów, z których drugi gubił poziom rozszerzony.

Przeglądarka potwierdziła nową listę i wybór angielskiego rozszerzonego z właściwą treścią pulpitu. TypeScript, 7 testów regresji sesji i 2 testy selektora przeszły. Nie wykonywano w tej iteracji pełnego przeglądu wszystkich ekranów i przekrojów mobilnych.

## Zgodność z Bazą Wiedzy JASNE

Zachowano Nocturne Luminary, wspólny stan przedmiotu w aplikacji i istniejącą warstwę Firestore. Model zawiera metadane interfejsu, a nie treści lekcji ani zadań. Nie zmieniano ekonomii ani postępów ucznia.
