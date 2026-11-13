# Awaryjna kopia treści JASNE

To jest jedyne miejsce utrzymywania lokalnych zestawów kursów i banków zadań używanych awaryjnie. Firestore jest podstawowym źródłem danych aplikacji.

## Kolejność odczytu

1. Świeża kopia z Firestore w pamięci podręcznej, jeśli została już pobrana (ważność 12 godzin).
2. Odczyt Firestore, gdy nie ma świeżej kopii. Równoległe żądania tego samego zasobu są łączone.
3. Ostatnia zapisana kopia z Firestore, jeśli odczyt się nie powiedzie lub przekroczy 5 sekund.
4. Zestaw z tego katalogu, jeśli nie ma żadnej kopii z Firestore.

Dane awaryjne nie są zapisywane jako dane z chmury. Po ich użyciu ponowne sprawdzenie Firestore jest możliwe po 30 sekundach, a odświeżenie aplikacji rozpoczyna nową sesję pamięci RAM. Zapisana kopia z Firestore i pliki awaryjne są rozróżniane przez warstwę `curriculumSource`.

## Układ plików

- `catalog.ts` — wspólny punkt wejścia do zestawów awaryjnych.
- `mathCurriculumData.ts`, `mathRozCurriculumData.ts`, `polishCurriculumData.ts`, `englishCurriculumData.ts` — składanie dokumentów kursów.
- `math/generated/` — wygenerowane zadania i metadane matematyki.
- `english/generated/` — wygenerowane zadania angielskiego.
- `polish/`, `english/`, `tasks_polski/` — banki zadań, metadane starszych widoków i materiały pomocnicze.

Stare ścieżki modułów w `src/data` zawierają przekierowania eksportów dla zgodności. Nie edytuj w nich treści kursów. Generatory matematyki zapisują wynik bezpośrednio do nowych katalogów `offline`.

## Utrzymanie

Zmiany treści przygotuj w danych źródłowych/generatorach, sprawdź testami i opublikuj przez `scripts/publish_curriculum.ts`. Domyślnie skrypt tylko weryfikuje zestaw. Opcja `--publish` publikuje treści i manifesty do projektu JASNE oraz zachowuje lokalną kopię poprzednich dokumentów. Dane kont użytkowników nie są częścią tej operacji.

Widoki aplikacji korzystają z `curriculumRepository` albo hooków `useTaskBank` i `useStudyCatalog`. Nie należy przywracać w widokach bezpośrednich importów tablic zadań jako głównego źródła.

Pliki awaryjne pomagają przy niedostępności Firestore; nie zastępują pełnego mechanizmu PWA do pierwszego uruchomienia strony bez internetu. Pliki aplikacji muszą być dostępne w przeglądarce.
