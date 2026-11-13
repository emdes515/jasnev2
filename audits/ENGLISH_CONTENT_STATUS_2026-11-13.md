# Angielski: stan treści po pierwszym etapie (13 listopada 2026)

## Co zmieniono

- **Dział 1 (7 lekcji):** każda lekcja ma 5 nowych, zredagowanych zadań autorskich (35 łącznie) z formatami wybór, luka i prawda/fałsz. Zadania dotyczą tematu lekcji. Wcześniej wszystkie pięć zadań lekcji 1-1 było kopiami pytania o pierwszy okres warunkowy, a lekcje 1-2 do 1-7 miały po 1–2 różne pytania nie z ich tematu. Źródło: „Autorskie zadanie JASNE”, bez udawania CKE.
- **Punktowanie w lekcjach angielskiego:** sprawdzanie odpowiedzi zamkniętych używało dopasowania podciągów. Przy kluczu literowym (np. „E”) dowolna opcja zawierająca tę literę była poprawna. W 630 z 1005 zadań zamkniętych poprawna fraza jest podciągiem błędnej opcji. Teraz `src/lib/choiceAnswer.ts` porównuje dokładnie.
- **Działy 2–5 (12 lekcji):** 60 kolejnych zadań autorskich (po 5 na lekcję), zawsze co najmniej 3 formaty. Dział 4 (lekcja o false friends) ma teraz zadania o fałszywych przyjaciołach, a nie o słowotwórstwie.
- **Czytanie, Działy 9–11 (9 lekcji):** 45 zadań autorskich z własnymi tekstami w każdej lekcji: nagłówki do akapitów, luki zdaniami, fakty i opinie, przenoszenie informacji, wiele źródeł. Zawsze co najmniej 3 formaty.
- **Pula symulatora:** `dedupeTasksByContent` usuwa kopie różniące się tylko identyfikatorem i „Wariantem N”.
- Bank historyczny (1500 rekordów) pozostaje bez zmian, żeby nie zerwać powiązań i migracji.

## Co nadal jest do zrobienia

Liczba różnych zadań na 5 przydzielonych w lekcjach (bank historyczny):

| Dział | Lekcje | Różne zadania na lekcję | Uwagi |
| --- | --- | --- | --- |
| 2–5 | 2-1…5-3 | 5 (nowe) | zadania autorskie z drugiego etapu (60 zadań), stan: zrobione |
| 6 | 6-x | 3 | te same 3 nagrania; brak plików audio |
| 7, 8 | 7-x, 8-x | 4 i 3 | brak plików audio |
| 9–11 | 9-1…11-3 | 5 (nowe) | zadania autorskie z trzeciego etapu (45 zadań, własne teksty w każdej lekcji), stan: zrobione |
| 12, 13, 14 | 12-x, 13-x, 14-x | 2–3 | pisanie i korekta |
| 15 | 15-x | 2 | |

Kolejne kroki: pisanie (12–15), na końcu słuchanie (wymaga prawdziwych nagrań). Opublikować poprawiony bank w Firestore dopiero po przeglądzie.

## Ograniczenia

- Nie opublikowano nic w Firestore; zmiany są lokalne w `src/data/offline/`.
- Symulator matury ma własne dopasowanie odpowiedzi; sprawdzono tylko widok lekcji.
- Nowe zadania napisano i sprawdzono merytorycznie bez porównania z zewnętrznym recenzentem.

## Zgodność z Bazą Wiedzy JASNE

Zadania zachowują Core-4: wąski koncept na lekcję, różne formaty, wyjaśnienie wskazujące pułapkę. Nie zmieniono ekonomii, passy ani limitów AI.
