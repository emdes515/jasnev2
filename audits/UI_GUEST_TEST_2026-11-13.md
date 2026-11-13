# Test ścieżki gościa — 13 listopada 2026

Test ręczny we wbudowanej przeglądarce na lokalnej aplikacji z brancha `codex/ui-audit-fixes`. Osobny origin `127.0.0.2:3001/?dev=0` pozwolił przetestować świeży stan bez nadawania uprawnień demonstracyjnych. Sprawdzono standardowe okno komputerowe i widok 390 × 844 px. To test wybranych ścieżek, nie pełny test całego produktu.

## Potwierdzone działanie

- Nowy użytkownik zaczyna z poziomem 1 i pięcioma sercami. Prognoza pokazuje kalibrację 0/5 zamiast wyniku.
- Onboarding przechodzi przez pięć kroków. Błędna odpowiedź wyświetla wyjaśnienie i poprawny symbol nawiasu; poprawna odpowiedź wyświetla prawidłowy przedział.
- Kontynuowanie jako gość daje 15 XP, 10 monet i pierwszy dzień serii. Stan monet po onboardingu: 40.
- Pierwsza lekcja otwiera teorię i zadania. Przycisk sprawdzania jest nieaktywny do wybrania odpowiedzi.
- Błędna odpowiedź wyświetla właściwą odpowiedź i wyjaśnienie przyczyny błędu. Pierwsza lekcja nie zabiera serc i informuje o tym użytkownika.
- Działa samoocena zadania otwartego według etapów. Cel osiągnięto po trzech poprawnych zadaniach przy jednym błędzie.
- Podsumowanie lekcji pokazuje 75%, 67 XP i 22 monety. Po odświeżeniu pozostaje 82 XP, 62 monety, jeden dzień serii oraz lekcja 1.2 jako następna.
- Uruchomiono egzamin ekspresowy: zegar, odpowiedź, flagowanie, następne/poprzednie zadanie oraz pauza i wznowienie reagują na działania.
- Oddanie arkusza z jedną odpowiedzią wymaga potwierdzenia i wskazuje 11 pustych pytań. Wynik poprawnie wynosi 1/15 punktów (7%).
- Mobilny ekran wyniku zachowuje czytelny układ, stałe podpisy nawigacji i dostępne przyciski.

## Wykryte problemy

1. **Wysoki priorytet — niespójne statystyki błędów.** Po jednej błędnej i trzech poprawnych odpowiedziach podsumowanie lekcji wskazuje 75% i jeden błąd. Po odświeżeniu pulpit pokazuje 50% i trzy błędy, a centrum matury jeden błąd. Prognoza również różni się: 14% na pulpicie i 13% w centrum matury. Należy sprawdzić źródła danych, zakresy statystyk oraz sposób łączenia prób i samooceny. Test nie ustalił przyczyny w kodzie.
2. **Średni priorytet — etykiety samooceny.** Po samoocenie bez wpisanej odpowiedzi pojawiają się komunikaty „Rozwiązanie zaliczone”, „Odpowiedź spełnia kryteria CKE” i „Ocena Egzaminatora CKE”. Dalszy tekst wspomina samoocenę, ale główny nagłówek sugeruje niezależną weryfikację rozwiązania. W tym stanie należy jednoznacznie mówić o samoocenie.
3. **Średni priorytet — konfiguracja promocji.** Konsola zgłasza brak uprawnień odczytu konfiguracji promocji z Firestore i użycie wartości domyślnych. Nie zablokowało to testowanej ścieżki; rzeczywista oferta promocyjna nie została sprawdzona.
4. **Niski priorytet — odmiana tekstu.** Nagłówek i podpowiedź pokazują „1 dni” zamiast „1 dzień”.

## Granice weryfikacji

Nie sprawdzano płatności, rejestracji, migracji gościa do konta, wywołań oceny AI, wygaśnięcia całego czasu egzaminu ani wszystkich przedmiotów. Oddano celowo niepełny arkusz na lokalnym profilu testowym. Nie zmieniano kodu w ramach tego testu.
