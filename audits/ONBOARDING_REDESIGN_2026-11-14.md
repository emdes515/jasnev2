# Nowy onboarding (14 listopada 2026)

## Dlaczego zmiana

Poprzedni onboarding miał 5 kroków: wybór celu procentowego (30/70/100% i „ratunek”), zadanie z wykresem tylko z matematyki, dwa ekrany z opisem funkcji i podsumowanie. Cel nie wpływał na nic w aplikacji, przedmiot był zawsze ustawiany na matematykę, a opisy obiecywały funkcje, które nie istnieją lub są ukryte.

## Co mówią najlepsze aplikacje

- Duolingo pozwala zrobić lekcję przed założeniem konta. Według relacji zespołu wzrostu przesunięcie rejestracji dalej dało ok. 20% więcej aktywnych użytkowników dziennie (dane z wtórnych opracowań, nie z opublikowanego badania).
- Brilliant używa odpowiedzi z onboardingu do ułożenia ekranu głównego, a nie do ankiety bez skutku.
- Wspólna zasada ze źródeł o onboardingu: jak najszybciej doprowadzić do realnego efektu w produkcie, a prośbę o konto zostawić na później.

## Nowy przepływ (5 ekranów, ok. 1 minuty)

1. **Obietnica**: „Matura w 5 minut dziennie”, trzy krótkie punkty wartości, „Zaczynam” i „Mam już konto”.
2. **Przedmiot i poziom**: jedyne pytanie, bo naprawdę zmienia aplikację. Lista pochodzi ze wspólnego modelu `src/lib/subjects.ts`.
3. **Zadanie próbne**: jedno krótkie zadanie z przedmiotu, natychmiastowa informacja zwrotna, wyjaśnienie pułapki po błędzie i po sukcesie (Core-4). XP i dzień serii tylko za rozwiązane zadanie.
4. **Co jeszcze tu masz**: cztery przesuwane karty z podglądem (pełna lekcja albo same zadania, wyjaśnienie pułapki, prognoza wyniku, seria i serca). Opisują wyłącznie funkcje, które działają.
5. **Gotowe**: podsumowanie, „Zaczynam naukę”, opcjonalne „Zapisz postęp kontem”.

„Pomiń” jest dostępne na każdym ekranie i nie daje nagrody. Cel procentowy i czas nauki zniknęły z onboardingu. Zapisujemy domyślne preferencje (70%, 10 minut), bo reguły Firestore wymagają tego kształtu danych. Użytkownik zmienia je w profilu (`StudyGoalSettings`).

## Zmiany w kodzie

- `src/components/OnboardingOverlay.tsx`: przepisany od zera (z 918 do ok. 400 linii). Styl na tokenach semantycznych, pola dotykowe min. 44 px, zamknięcie i powrót z nazwami dostępnościowymi, fokus na nagłówku po zmianie kroku, `prefers-reduced-motion` wyłącza animacje i konfetti, ekran skupienia według `docs/FOCUS_SCREENS.md`.
- `src/data/onboardingDemo.ts`: trzy autorskie zadania próbne (matematyka, polski, angielski) z wyjaśnieniami.
- `src/App.tsx`: `handleOnboardingComplete` przyjmuje wybrany przedmiot (wcześniej zawsze matematyka).
- Test `OnboardingOverlay.test.tsx` zastąpiony nowym.

## Sprawdzone

Typy i pełny zestaw testów (557/557). W przeglądarce: pełny przepływ na 375 × 812 (przedmiot angielski, błędna i poprawna odpowiedź, karty, zakończenie, nagroda, zapis przedmiotu), nagłówek na 320 px po poprawce (przycisk „Pomiń” mieści się), brak błędów w konsoli.

## Ograniczenia

- Nie sprawdzono motywu jasnego ani poziomego widoku telefonu, nie testowano na fizycznym urządzeniu.
- Karty z podglądem pokazują przykładowe dane (oznaczone „Przykładowy podgląd”).
- Zadania próbne są autorskie, nie z arkuszy CKE.
- Nie zmieniano `DiagnosticTestModal` ani ekranu profilu.
- Nie mierzono wpływu na konwersję ani retencję; to wymaga danych z użycia.

## Zgodność z Bazą Wiedzy JASNE

Time-to-Value poniżej 30 sekund bez logowania, konto jako opcja (płynna migracja gościa bez zmian), język bezpośredni, bez emoji, ikony Lucide, paleta Nocturne Luminary przez tokeny. Nie zmieniono ekonomii serc, limitów AI ani reguł Firestore; nagroda za zadanie próbne (15 XP, 10 monet i dzień serii) jest taka jak wcześniej i tylko za rozwiązanie.
