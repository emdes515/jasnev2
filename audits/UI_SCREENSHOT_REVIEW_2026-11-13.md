# Przegląd zrzutów UI — 13 listopada 2026

Sprawdzono i przewinięto do końca: pulpit, kurs polskiego, profil, odznaki, bonusy i hub matury. Dodatkowo sprawdzono początek i koniec kursu oraz pulpitu przy szerokości 390 px. To zapis tych widoków, nie wszystkich możliwych ekranów, przedmiotów i stanów aplikacji.

## Naprawione problemy

- Kurs polskiego: dwie czytelne kolumny zamiast trzech ciasnych, pełne tytuły, rozwijany podgląd lekcji, prostsze nazwy, usunięte zdublowane liczniki nagłówka.
- Pulpit: wyrównana wysokość etykiet statystyk; nagłówek wyzwań zawija się bez ściskania.
- Matura: szybki trening ma osobny wiersz na tytuł i sterowanie; karty formatów dostosowują liczbę kolumn do szerokości, a główne przyciski mają co najmniej 44 px wysokości.
- Odznaki: poprawny stan gotowej nagrody, czytelne niezdobyte pozycje i postęp ograniczony do celu w prezentacji.
- Bonusy: ikona zastępcza dla nieobsługiwanego typu, czytelniejsze niedostępne ceny, stan zapasu zamiast „aktywna: 0” i prostsze nazwy. Ceny oraz logika zakupów pozostają bez zmian.

## Dowody i ograniczenia

Zrzuty before pokazują stan przed poprawkami; pozostałe dokumentują wskazany moment przeglądu. Nie każdy zrzut bez słowa before przedstawia ostateczny stan wszystkich późniejszych poprawek. Nie naciskano przycisków zakupu ani odbierania nagród. Nie testowano tutaj całych egzaminów, logowania, wszystkich lektur ani motywu jasnego.

TypeScript i 12 testów regresji selektora, sesji oraz źródeł zadań przeszły.

## Zgodność z Bazą Wiedzy JASNE

Zachowano Nocturne Luminary, repozytorium Firestore, ekonomię serc i nagród. Zmiany dotyczą prezentacji i czytelności.

## Galeria zrzutów

### achievements-bottom.jpg

![achievements-bottom.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/achievements-bottom.jpg)

### achievements-top-before.jpg

![achievements-top-before.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/achievements-top-before.jpg)

### dashboard-bottom-before.jpg

![dashboard-bottom-before.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/dashboard-bottom-before.jpg)

### dashboard-mobile-bottom-after.jpg

![dashboard-mobile-bottom-after.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/dashboard-mobile-bottom-after.jpg)

### dashboard-mobile-top-after.jpg

![dashboard-mobile-top-after.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/dashboard-mobile-top-after.jpg)

### dashboard-top.jpg

![dashboard-top.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/dashboard-top.jpg)

### exam-bottom-after.jpg

![exam-bottom-after.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/exam-bottom-after.jpg)

### exam-top-before.jpg

![exam-top-before.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/exam-top-before.jpg)

### perks-bottom-after.jpg

![perks-bottom-after.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/perks-bottom-after.jpg)

### perks-top-before.jpg

![perks-top-before.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/perks-top-before.jpg)

### polish-course-bottom-before.jpg

![polish-course-bottom-before.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/polish-course-bottom-before.jpg)

### polish-course-mobile-bottom.jpg

![polish-course-mobile-bottom.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/polish-course-mobile-bottom.jpg)

### polish-course-mobile-top.jpg

![polish-course-mobile-top.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/polish-course-mobile-top.jpg)

### polish-course-top-after.jpg

![polish-course-top-after.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/polish-course-top-after.jpg)

### polish-course-top-before.jpg

![polish-course-top-before.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/polish-course-top-before.jpg)

### profile-bottom.jpg

![profile-bottom.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/profile-bottom.jpg)

### profile-top.jpg

![profile-top.jpg](C:/Users/mateu/Downloads/0.45-main/artifacts/ui-review/profile-top.jpg)
