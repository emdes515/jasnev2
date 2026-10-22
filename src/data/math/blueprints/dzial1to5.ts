import { MathTopicBlueprint } from '../mathBlueprintTypes';

export const DZIAL_1_TO_5: MathTopicBlueprint[] = [
  {
    id: "dzial-1",
    numericId: 1,
    title: "Liczby rzeczywiste, procenty i błędy przybliżeń",
    short_title: "Liczby rzeczywiste",
    description: "Wartość bezwzględna na osi liczbowej, obliczenia procentowe, podwyżki i obniżki wielokrotne oraz błąd bezwzględny i względny.",
    icon: "Hash",
    color: "#FFB800",
    matura_points_range: "3–5 pkt",
    importance: "CRITICAL_PEWNIAK",
    lessons: [
      {
        id: "math-lesson-1-1",
        order: 1,
        title: "Wartość bezwzględna i nierówności na osi liczbowej",
        short_title: "Wartość bezwzględna",
        badge: "Lekcja 1.1",
        archetypeCode: "ARCH-03",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Geometryczna interpretacja wartości bezwzględnej $|x - a|$ to odległość liczby $x$ od punktu środkowego $a$ na osi liczbowej. Nierówność $|x - a| \\le r$ oznacza przedział domknięty wokół środka $a$ o promieniu $r$, czyli $\\langle a - r, a + r \\rangle$. Z kolei nierówność ze znakiem $\\ge r$ oznacza obszar zewnętrzny: odległość większą lub równą $r$, czyli sumę dwóch przedziałów nieskończonych $(-\\infty, a - r\\rangle \\cup \\langle a + r, +\\infty)$.",
          matura_context: "CKE Formuła 2023 • Zadanie 1–3 w arkuszu • Waga: 1 pkt (Żelazny pewniak maturalny).",
          plain_polish: "Z polskiego na nasze: Nierówność $|x - 3| \\le 5$ czytaj jako: „stań w punkcie 3 i zrób maksymalnie 5 kroków w lewo i 5 kroków w prawo”. W lewo dochodzisz do $3 - 5 = -2$, w prawo do $3 + 5 = 8$. Zbiorem rozwiązań jest przedział $\\langle -2, 8 \\rangle$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wyznacz punkt środkowy a",
              description: "Zawsze odwróć znak stojący przy liczbie w nawiasie bezwzględnym. Dla $|x - 5|$ środek to $a = 5$. Dla $|x + 4|$ środek to $a = -4$.",
              tip: "Pamiętaj: wzór ogólny to $|x - a|$."
            },
            {
              stepNumber: 2,
              title: "Odczytaj promień r",
              description: "Liczba stojąca po prawej stronie nierówności to promień (odległość od środka). Wymóg: $r \\ge 0$.",
              tip: "Promień nigdy nie może być ujemny!"
            },
            {
              stepNumber: 3,
              title: "Oblicz krańce przedziału",
              description: "Lewy kraniec to $a - r$, a prawy kraniec to $a + r$.",
              tip: "Dla nierówności ostrej $\\le$ zapisz przedział domknięty $\\langle a-r, a+r \\rangle$."
            },
            {
              stepNumber: 4,
              title: "Dobierz zwrot przedziałów",
              description: "Znak $\\le$ lub $<$ oznacza wnętrze przedziału. Znak $\\ge$ lub $>$ oznacza dwa skrzydła zewnętrzne rozłączne.",
              tip: "Przy $\\ge$ rozwiązanie ma postać sumy $(-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)$."
            }
          ],
          core_formulas: [
            {
              name: "Nierówność wewnętrzna (promień r wokół a)",
              formula: "|x - a| \\le r \\iff x \\in \\langle a - r, a + r \\rangle"
            },
            {
              name: "Nierówność zewnętrzna (dwa skrzydła)",
              formula: "|x - a| \\ge r \\iff x \\in (-\\infty, a - r\\rangle \\cup \\langle a + r, +\\infty)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wskaż zbiór wszystkich rozwiązań nierówności $|x + 4| \\le 3$.",
              solution: "1. Zapisujemy wyrażenie w postaci kanonicznej: $|x - (-4)| \\le 3$.\n2. Środek przedziału: $a = -4$, promień: $r = 3$.\n3. Lewy kraniec: $-4 - 3 = -7$. Prawy kraniec: $-4 + 3 = -1$.\n4. Ponieważ nierówność to $\\le$, rozwiązaniem jest przedział domknięty: $x \\in \\langle -7, -1 \\rangle$.",
              keyInsight: "Środkiem przedziału dla $|x + 4|$ jest $-4$, a nie $+4$."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Odczyt z osi)",
              points: "2 pkt",
              problem: "Zbiorem rozwiązań pewnej nierówności z wartością bezwzględną jest suma przedziałów $(-\\infty, -2\\rangle \\cup \\langle 8, +\\infty)$. Zapisz tę nierówność.",
              solution: "1. Wyznaczamy środek $a$ jako średnią arytmetyczną krańców: $a = \\frac{-2 + 8}{2} = \\frac{6}{2} = 3$.\n2. Wyznaczamy promień $r$ jako odległość od środka do prawego krańca: $r = 8 - 3 = 5$.\n3. Ponieważ zbiór rozwiązań to obszary zewnętrzne, znak nierówności to $\\ge$.\n4. Otrzymujemy nierówność: $|x - 3| \\ge 5$.",
              keyInsight: "Środek to zawsze średnia krańców: $a = \\frac{x_1 + x_2}{2}$."
            }
          ],
          trap_details: {
            fail: "Błąd: Przyjmowanie $+4$ jako środka dla $|x + 4|$ i wyznaczanie przedziału $\\langle 1, 7 \\rangle$.",
            win: "Poprawnie: $|x + 4| = |x - (-4)|$, więc środek leży w punkcie $-4$, a przedział to $\\langle -7, -1 \\rangle$.",
            explanation: "Znak plus wewnątrz wartości bezwzględnej oznacza, że punkt odniesienia leży na ujemnej półosi. Zawsze odwracaj znak stojący przy liczbie!",
            ckeTip: "Na marginesie arkusza naszkicuj oś: zaznacz środek i odlicz promień w lewo i w prawo."
          },
          exam_trap: "Najczęstszy błąd CKE to pomyłka znaku środka przedziału: dla $|x + 4|$ środkiem jest $-4$, a NIE $+4$!",
          key_points: [
            "$|x - a| \\le r$ daje zawsze pojedynczy przedział domknięty $\\langle a - r, a + r \\rangle$.",
            "$|x - a| \\ge r$ daje sumę dwóch przedziałów nieskończonych $(-\\infty, a - r\\rangle \\cup \\langle a + r, +\\infty)$.",
            "Środek przedziału to średnia arytmetyczna jego końców: $a = \\frac{x_1 + x_2}{2}$."
          ]
        }
      },
      {
        id: "math-lesson-1-2",
        order: 2,
        title: "Obliczenia procentowe, podatki i wielokrotne obniżki",
        short_title: "Obliczenia procentowe",
        badge: "Lekcja 1.2",
        archetypeCode: "ARCH-04",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W zadaniach maturalnych kluczem jest operowanie mnożnikami dziesiętnymi zamiast żmudnego układania proporcji. Podwyżka o $p\\%$ to pomnożenie kwoty przez $(1 + 0{,}01p)$. Obniżka o $p\\%$ to pomnożenie przez $(1 - 0{,}01p)$. Przy wielokrotnych zmianach cen (np. obniżka o 20%, a potem kolejna o 30%) mnożymy kolejne współczynniki: $C_{konc} = C_0 \\cdot 0{,}8 \\cdot 0{,}7 = 0{,}56 \\cdot C_0$. Oznacza to obniżkę o $44\\%$, a NIE o $50\\%$!",
          matura_context: "CKE Formuła 2023 • Zadanie 2–4 w arkuszu • Waga: 1–2 pkt.",
          plain_polish: "Z polskiego na nasze: Jeśli bluza kosztuje $x$ zł i tanieje o 20%, płacisz 80% jej wartości, czyli $0{,}8x$. Jeśli potem drożeje o 10%, to nową cenę mnożysz przez $1{,}1$, co daje $0{,}8x \\cdot 1{,}1 = 0{,}88x$. Ostatecznie cena spadła o 12%, a nie o 10%.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wyznacz mnożniki dla każdej zmiany",
              description: "Dla podwyżki o $p\\%$ mnożnik to $(1 + \\frac{p}{100})$. Dla obniżki o $p\\%$ mnożnik to $(1 - \\frac{p}{100})$.",
              tip: "Np. $+25\\% \\to 1{,}25$, a $-15\\% \\to 0{,}85$."
            },
            {
              stepNumber: 2,
              title: "Wymnóż kolejne mnożniki",
              description: "Cena po serii zmian to iloczyn ceny początkowej i wszystkich kolejnych mnożników: $C_{konc} = C_0 \\cdot M_1 \\cdot M_2$.",
              tip: "Kolejność obniżek nie ma znaczenia dla wyniku końcowego ($0{,}8 \\cdot 0{,}7 = 0{,}7 \\cdot 0{,}8$)."
            },
            {
              stepNumber: 3,
              title: "Odczytaj zmianę procentową",
              description: "Jeśli mnożnik łączny wynosi $0{,}64$, to cena stanowi $64\\%$ ceny wyjściowej, czyli zmalała o $100\\% - 64\\% = 36\\%$.",
              tip: "Gdy mnożnik $> 1$, nastąpił wzrost. Gdy $< 1$, nastąpił spadek."
            }
          ],
          core_formulas: [
            {
              name: "Mnożnik podwyżki",
              formula: "C_1 = C_0 \\cdot \\left(1 + \\frac{p}{100}\\right)"
            },
            {
              name: "Mnożnik obniżki",
              formula: "C_1 = C_0 \\cdot \\left(1 - \\frac{p}{100}\\right)"
            },
            {
              name: "Wielokrotna zmiana ceny",
              formula: "C_{konc} = C_0 \\cdot \\left(1 \\pm \\frac{p_1}{100}\\right) \\cdot \\left(1 \\pm \\frac{p_2}{100}\\right)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Cenę towaru wynoszącą 250 zł obniżono o 20%, a następnie nową cenę podwyższono o 10%. Ile wynosi cena końcowa?",
              solution: "1. Mnożnik pierwszej obniżki: $1 - 0{,}20 = 0{,}80$.\n2. Mnożnik drugiej podwyżki: $1 + 0{,}10 = 1{,}10$.\n3. Cena końcowa: $C_{konc} = 250 \\cdot 0{,}80 \\cdot 1{,}10 = 200 \\cdot 1{,}10 = 220$ zł.",
              keyInsight: "Druga zmiana odnosi się do nowej kwoty 200 zł, a nie do początkowych 250 zł."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Rachunek wsteczny)",
              points: "2 pkt",
              problem: "Po dwukrotnej obniżce ceny, za każdym razem o 20%, płaszcz kosztuje 192 zł. Oblicz cenę płaszcza przed obiema obniżkami.",
              solution: "1. Oznaczmy cenę początkową jako $C_0$.\n2. Każda obniżka oznacza pomnożenie przez $0{,}80$.\n3. Układamy równanie: $C_0 \\cdot 0{,}80 \\cdot 0{,}80 = 192$.\n4. $C_0 \\cdot 0{,}64 = 192 \\implies C_0 = \\frac{192}{0{,}64} = \\frac{19200}{64} = 300$ zł.",
              keyInsight: "Nigdy nie dodawaj 40% do 192 zł! Dzielimy cenę końcową przez mnożnik łączny $0{,}64$."
            }
          ],
          trap_details: {
            fail: "Błąd: Dodawanie procentów obniżek: $20\\% + 30\\% = 50\\%$ obniżki.",
            win: "Poprawnie: Mnożenie współczynników: $0{,}8 \\cdot 0{,}7 = 0{,}56$, czyli realna obniżka to $1 - 0{,}56 = 44\\%$.",
            explanation: "Druga obniżka liczona jest z już obniżonej kwoty. Sumowanie procentów to jeden z najczęstszych błędów w zadaniach za 1 pkt.",
            ckeTip: "W zadaniach z dwiema zmianami zawsze zapisuj równanie z mnożnikami dziesiętnymi."
          },
          exam_trap: "Nigdy nie sumuj procentów kolejnych obniżek lub podwyżek! $20\\% + 30\\% \\ne 50\\%$.",
          key_points: [
            "Każda kolejna zmiana procentowa odnosi się do NOWEJ, aktualnej kwoty.",
            "Mnożnik obniżki o $p\\%$ to $(1 - 0{,}01p)$. Mnożnik podwyżki to $(1 + 0{,}01p)$.",
            "Cena początkowa przy rachunku wstecznym to $C_0 = \\frac{C_{konc}}{M_{laczny}}$."
          ]
        }
      },
      {
        id: "math-lesson-1-3",
        order: 3,
        title: "Błąd bezwzględny i błąd względny przybliżenia",
        short_title: "Błędy przybliżeń",
        badge: "Lekcja 1.3",
        archetypeCode: "ARCH-05",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Błąd bezwzględny $\\Delta = |x - a|$ mierzy odchylenie przybliżenia $a$ od wartości dokładnej $x$ w jednostkach mierzonych (np. cm, zł). Błąd względny $\\delta = \\frac{\\Delta}{|x|} = \\frac{|x - a|}{|x|}$ mierzy jakość przybliżenia w procentach. Kluczem arkusza CKE jest ułamek: w mianowniku ZAWSZE musi znaleźć się wartość DOKŁADNA $x$, a nie przybliżenie $a$!",
          matura_context: "CKE Formuła 2023 • Zadanie 1–3 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Mierzyłeś deskę o długości 200 cm (wartość dokładna) i wyszło ci 196 cm (przybliżenie). Pomyliłeś się o 4 cm (błąd bezwzględny). Twój błąd względny to $\\frac{4}{200} = 2\\%$. Zawsze dzielisz przez to, ile deska naprawdę miała (prawdę), a nie przez twój odczyt.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Rozróżnij wartość dokładną od przybliżenia",
              description: "Z treści zadania precyzyjnie wskaż: $x$ = wartość dokładna, $a$ = przybliżenie.",
              tip: "Słowa klucze: „liczba a jest przybliżeniem liczby x”."
            },
            {
              stepNumber: 2,
              title: "Oblicz błąd bezwzględny Δ",
              description: "Zastosuj wartość bezwzględną różnicy: $\\Delta = |x - a|$. Błąd bezwzględny jest zawsze nieujemny.",
              tip: "Np. $|50 - 54| = |-4| = 4$."
            },
            {
              stepNumber: 3,
              title: "Oblicz błąd względny δ",
              description: "Podziel błąd bezwzględny $\\Delta$ przez moduł wartości DOKŁADNEJ: $\\delta = \\frac{\\Delta}{|x|}$.",
              tip: "Pamiętaj: w mianowniku stoi $x$ (wartość dokładna)!"
            },
            {
              stepNumber: 4,
              title: "Zamień na procenty",
              description: "Pomnóż wynik przez $100\\%$, aby podać błąd procentowy.",
              tip: "Np. $\\frac{4}{50} \\cdot 100\\% = 8\\%$."
            }
          ],
          core_formulas: [
            {
              name: "Błąd bezwzględny",
              formula: "\\Delta = |x - a|"
            },
            {
              name: "Błąd względny (procentowy)",
              formula: "\\delta = \\frac{|x - a|}{|x|} \\cdot 100\\%"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Liczba 17{,}5 jest przybliżeniem z nadmiarem liczby dokładnej 16. Oblicz błąd względny tego przybliżenia.",
              solution: "1. Wartość dokładna: $x = 16$, przybliżenie: $a = 17{,}5$.\n2. Błąd bezwzględny: $\\Delta = |16 - 17{,}5| = |-1{,}5| = 1{,}5$.\n3. Błąd względny: $\\delta = \\frac{1{,}5}{16} \\cdot 100\\% = \\frac{150}{16}\\% = 9{,}375\\%$.",
              keyInsight: "W mianowniku musi znaleźć się 16 (dokładna), a nie 17,5."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Wyznaczanie liczby)",
              points: "2 pkt",
              problem: "Błąd względny przybliżenia liczby dodatniej $x$ liczbą $a = 48$ wynosi 4%, przy czym jest to przybliżenie z niedomiarem. Wyznacz dokładną wartość liczby $x$.",
              solution: "1. Przybliżenie z niedomiarem oznacza, że $a < x$, czyli $48 < x$, stąd $|x - 48| = x - 48$.\n2. Wzór na błąd względny: $\\frac{x - 48}{x} = 0{,}04$.\n3. Mnożymy obustronnie przez $x$: $x - 48 = 0{,}04x$.\n4. $0{,}96x = 48 \\implies x = \\frac{48}{0{,}96} = 50$.",
              keyInsight: "Przybliżenie z niedomiarem oznacza: $x - a > 0$."
            }
          ],
          trap_details: {
            fail: "Błąd: Wstawienie przybliżenia do mianownika: $\\delta = \\frac{|x - a|}{a}$.",
            win: "Poprawnie: W mianowniku stoi zawsze wartość dokładna: $\\delta = \\frac{|x - a|}{|x|}$.",
            explanation: "CKE niemal zawsze umieszcza w opcjach testowych wynik z odwrotnym mianownikiem. Zapamiętaj: dzielisz przez prawdę (wartość dokładną).",
            ckeTip: "Sprawdź w karcie wzorów CKE na stronie 2: wzór wyraźnie podaje $|x|$ w mianowniku."
          },
          exam_trap: "W mianowniku błędu względnego ZAWSZE stoi wartość DOKŁADNA $x$, a nie przybliżenie $a$!",
          key_points: [
            "Błąd bezwzględny ma miano (jednostkę), a błąd względny jest bezwymiarowy.",
            "W mianowniku błędu względnego ZAWSZE stoi wartość dokładna $|x|$.",
            "Przybliżenie z nadmiarem: $a > x$. Przybliżenie z niedomiarem: $a < x$."
          ]
        }
      },
      {
        id: "math-lesson-1-4",
        order: 4,
        title: "Potęgi o wykładnikach całkowitych i wymiernych",
        short_title: "Potęgi i pierwiastki",
        badge: "Lekcja 1.4",
        archetypeCode: "ARCH-01",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wszystkie zadania CKE z potęg opierają się na jednej żelaznej strategii: sprowadzeniu wszystkich liczb złożonych do potęg liczb pierwszych ($2, 3, 5, 7$). Przykładowo $4 \\to 2^2$, $8 \\to 2^3$, $27 \\to 3^3$, $81 \\to 3^4$. Wykładnik ujemny odwraca liczbę: $a^{-n} = \\frac{1}{a^n}$, a wykładnik ułamkowy zamienia się w pierwiastek: $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$.",
          matura_context: "CKE Formuła 2023 • Zadanie 1–2 w arkuszu • Waga: 1 pkt (Żelazny pewniak).",
          plain_polish: "Z polskiego na nasze: Widzisz w zadaniu $8^{4} \\cdot 16^{-2}$? Nie mnóż tych liczb! Rozbij na dwójki: $(2^3)^4 \\cdot (2^4)^{-2} = 2^{12} \\cdot 2^{-8} = 2^{4} = 16$. Zawsze schodź do najmniejszego wspólnego klocka liczbowego.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Sprowadź podstawy do liczb pierwszych",
              description: "Zastąp liczby złożone ich rozkładem: $4=2^2$, $8=2^3$, $9=3^2$, $16=2^4$, $27=3^3$, $32=2^5$, $81=3^4$.",
              tip: "Pamiętaj o nawiasach przy potęgowaniu, np. $(3^3)^2$."
            },
            {
              stepNumber: 2,
              title: "Zastosuj potęgowanie potęgi",
              description: "Wymnóż wykładniki zewnętrzne i wewnętrzne: $(a^r)^s = a^{r \\cdot s}$.",
              tip: "Np. $(2^3)^{-2} = 2^{-6}$."
            },
            {
              stepNumber: 3,
              title: "Uprość licznik i mianownik",
              description: "Przy mnożeniu potęg o tej samej podstawie dodawaj wykładniki ($a^r \\cdot a^s = a^{r+s}$). Przy dzieleniu odejmuj ($a^r : a^s = a^{r-s}$).",
              tip: "Uważaj na podwójny minus przy odejmowaniu ujemnego wykładnika: $3 - (-4) = 3 + 4 = 7$."
            },
            {
              stepNumber: 4,
              title: "Zinterpretuj wynik",
              description: "Jeśli wykładnik jest ułamkiem, zamień na pierwiastek. Jeśli jest ujemny, odwróć ułamek.",
              tip: "$a^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{a}}$."
            }
          ],
          core_formulas: [
            {
              name: "Iloczyn potęg o tej samej podstawie",
              formula: "a^r \\cdot a^s = a^{r+s}"
            },
            {
              name: "Iloraz potęg o tej samej podstawie",
              formula: "\\frac{a^r}{a^s} = a^{r-s}"
            },
            {
              name: "Potęga potęgi",
              formula: "(a^r)^s = a^{r \\cdot s}"
            },
            {
              name: "Wykładnik wymierny (pierwiastek)",
              formula: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m} \\quad (a > 0)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Oblicz wartość wyrażenia $\\frac{27^3 \\cdot 9^{-2}}{81}$.",
              solution: "1. Sprowadzamy podstawy do liczby 3: $27 = 3^3$, $9 = 3^2$, $81 = 3^4$.\n2. $27^3 = (3^3)^3 = 3^9$.\n3. $9^{-2} = (3^2)^{-2} = 3^{-4}$.\n4. Licznik: $3^9 \\cdot 3^{-4} = 3^{9 + (-4)} = 3^5$.\n5. Iloraz: $\\frac{3^5}{3^4} = 3^{5 - 4} = 3^1 = 3$.",
              keyInsight: "Działania na potęgach wykonuj wyłącznie po sprowadzeniu do wspólnej podstawy 3."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Wykładniki ułamkowe)",
              points: "2 pkt",
              problem: "Zapisz liczbę $\\sqrt[3]{4} \\cdot 8^{\\frac{1}{2}} \\cdot 16^{-\\frac{3}{4}}$ w postaci potęgi liczby 2.",
              solution: "1. $\\sqrt[3]{4} = 4^{\\frac{1}{3}} = (2^2)^{\\frac{1}{3}} = 2^{\\frac{2}{3}}$.\n2. $8^{\\frac{1}{2}} = (2^3)^{\\frac{1}{2}} = 2^{\\frac{3}{2}}$.\n3. $16^{-\\frac{3}{4}} = (2^4)^{-\\frac{3}{4}} = 2^{4 \\cdot (-\\frac{3}{4})} = 2^{-3}$.\n4. Mnożymy wszystkie składniki, sumując wykładniki: $\\frac{2}{3} + \\frac{3}{2} - 3 = \\frac{4}{6} + \\frac{9}{6} - \\frac{18}{6} = -\\frac{5}{6}$.\n5. Wynik: $2^{-\\frac{5}{6}}$.",
              keyInsight: "Wykładnik pierwiastka $\\sqrt[n]{a^m}$ zawsze trafia do mianownika ułamka: $\\frac{m}{n}$."
            }
          ],
          trap_details: {
            fail: "Błąd: Mnożenie podstaw potęg: $2^3 \\cdot 3^2 = 6^5$ lub dodawanie potęg: $2^3 + 2^4 = 2^7$.",
            win: "Poprawnie: Prawa działań dotyczą tylko mnożenia i dzielenia TYCH SAMYCH podstaw. Dla sumy wyłącz wspólny czynnik: $2^3 + 2^4 = 2^3(1 + 2) = 3 \\cdot 8 = 24$.",
            explanation: "Nie istnieje wzór na sumę potęg! Gdy widzisz dodawanie potęg o tej samej podstawie, wyciągaj najmniejszą potęgę przed nawias.",
            ckeTip: "Gdy w arkuszu masz sumę potęg w ułamku, zawsze wyłącz wspólny czynnik przed nawias w liczniku i mianowniku."
          },
          exam_trap: "Nigdy nie mnóż podstaw potęg, gdy wykładniki są różne: $2^3 \\cdot 3^2 \\ne 6^5$!",
          key_points: [
            "Zawsze rozkładaj podstawy na potęgi liczb pierwszych ($2, 3, 5$).",
            "Ujemny wykładnik odwraca liczbę: $a^{-n} = \\frac{1}{a^n}$.",
            "Przy sumie potęg o tej samej podstawie wyciągaj wspólny czynnik przed nawias."
          ]
        }
      },
      {
        id: "math-lesson-1-5",
        order: 5,
        title: "Logarytmy i ich własności w zadaniach CKE",
        short_title: "Własności logarytmów",
        badge: "Lekcja 1.5",
        archetypeCode: "ARCH-02",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Logarytm $\\log_a b = c$ odpowiada na pytanie: „Do jakiej potęgi muszę podnieść podstawę $a$, aby otrzymać liczbę $b$?” ($a^c = b$). W arkuszu CKE królują dwa prawa działań: suma logarytmów o tej samej podstawie zamienia się w logarytm iloczynu: $\\log_a x + \\log_a y = \\log_a(xy)$, a różnica w logarytm ilorazu: $\\log_a x - \\log_a y = \\log_a(\\frac{x}{y})$. Zawsze pamiętaj o założeniach: podstawa $a > 0, a \\neq 1$ oraz liczba logarytmowana $b > 0$.",
          matura_context: "CKE Formuła 2023 • Zadanie 1–3 w arkuszu • Waga: 1 pkt (Żelazny pewniak).",
          plain_polish: "Z polskiego na nasze: $\\log_2 8$ to pytanie: „2 do ilu daje 8?”. Wynik to 3, bo $2^3 = 8$. Z kolei liczbę stojącą przed logarytmem (np. $2\\log_3 6$) musisz najpierw „wciągnąć do środka na plecy liczby jako potęgę”: $\\log_3(6^2) = \\log_3 36$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wciągnij współczynniki sprzed logarytmów",
              description: "Jeśli przed logarytmem stoi liczba (np. $2\\log_a x$ lub $\\frac{1}{2}\\log_a y$), wciągnij ją jako wykładnik: $k\\log_a x = \\log_a(x^k)$.",
              tip: "Wzory na sumę i różnicę logarytmów działają TYLKO wtedy, gdy przed logarytmem nie ma żadnej liczby!"
            },
            {
              stepNumber: 2,
              title: "Upewnij się, że podstawy są identyczne",
              description: "Możesz dodawać i odejmować logarytmy wyłącznie wtedy, gdy mają dokładnie taką samą podstawę $a$.",
              tip: "Brak podstawy oznacza logarytm dziesiętny o podstawie 10: $\\log x = \\log_{10} x$."
            },
            {
              stepNumber: 3,
              title: "Zastosuj wzór na sumę lub różnicę",
              description: "Plus zamienia się w mnożenie w argumencie: $\\log_a x + \\log_a y = \\log_a(xy)$. Minus zamienia się w dzielenie: $\\log_a x - \\log_a y = \\log_a(\\frac{x}{y})$.",
              tip: "Najpierw wykonaj działanie wewnątrz nawiasu."
            },
            {
              stepNumber: 4,
              title: "Oblicz wartość liczbową z definicji",
              description: "Zadaj sobie pytanie: „podstawa do jakiej potęgi daje liczbę w argumencie?”.",
              tip: "Np. $\\log_3 9 = 2$, bo $3^2 = 9$."
            }
          ],
          core_formulas: [
            {
              name: "Definicja logarytmu",
              formula: "\\log_a b = c \\iff a^c = b \\quad (a > 0, a \\neq 1, b > 0)"
            },
            {
              name: "Suma logarytmów (logarytm iloczynu)",
              formula: "\\log_a x + \\log_a y = \\log_a (xy)"
            },
            {
              name: "Różnica logarytmów (logarytm ilorazu)",
              formula: "\\log_a x - \\log_a y = \\log_a \\left(\\frac{x}{y}\\right)"
            },
            {
              name: "Wciąganie współczynnika do potęgi",
              formula: "k \\cdot \\log_a x = \\log_a (x^k)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Oblicz wartość wyrażenia $\\log_3 18 - \\log_3 2$.",
              solution: "1. Podstawy są jednakowe i równe 3. Przed logarytmami nie ma współczynników.\n2. Stosujemy wzór na różnicę logarytmów: $\\log_3 18 - \\log_3 2 = \\log_3 \\left(\\frac{18}{2}\\right)$.\n3. Dzielimy argument: $\\frac{18}{2} = 9$.\n4. Obliczamy: $\\log_3 9 = 2$, ponieważ $3^2 = 9$.",
              keyInsight: "Różnica logarytmów to logarytm ilorazu, a nie iloraz logarytmów!"
            },
            {
              title: "Zadanie Podchwytliwe CKE (Współczynnik i suma)",
              points: "2 pkt",
              problem: "Oblicz wartość wyrażenia $2\\log_2 6 - \\log_2 9 + \\log_2\\left(\\frac{1}{4}\\right)$.",
              solution: "1. Krok 1: Wciągamy liczbę 2 do potęgi argumentu: $2\\log_2 6 = \\log_2 (6^2) = \\log_2 36$.\n2. Krok 2: Łączymy pierwsze dwa logarytmy: $\\log_2 36 - \\log_2 9 = \\log_2 \\left(\\frac{36}{9}\\right) = \\log_2 4 = 2$.\n3. Krok 3: Obliczamy trzeci składnik z definicji: $\\log_2 \\left(\\frac{1}{4}\\right) = -2$, ponieważ $2^{-2} = \\frac{1}{4}$.\n4. Krok 4: Dodajemy wyniki: $2 + (-2) = 0$.",
              keyInsight: "Nigdy nie łącz logarytmów, dopóki stoi przed nimi jakikolwiek współczynnik liczbowy!"
            }
          ],
          trap_details: {
            fail: "Błąd: Łączenie logarytmów przed wciągnięciem liczby 2: $2\\log_2 6 - \\log_2 9 = 2\\log_2(6/9)$.",
            win: "Poprawnie: Najpierw wciągnij 2 do potęgi: $\\log_2(6^2) - \\log_2 9 = \\log_2 36 - \\log_2 9 = \\log_2(36/9) = \\log_2 4 = 2$.",
            explanation: "Wzory na sumę i różnicę logarytmów wymagają czystych logarytmów z przodu. Liczba stojąca przed logarytmem blokuje zastosowanie wzorów!",
            ckeTip: "Najpierw potęga do środka, dopiero potem mnożenie/dzielenie argumentów."
          },
          exam_trap: "Zanim zastosujesz wzór na sumę lub różnicę logarytmów, bezwzględnie wciągnij każdą liczbę stojącą przed logarytmem jako potęgę!",
          key_points: [
            "Logarytm to pytanie o wykładnik potęgi: $\\log_a b = c \\iff a^c = b$.",
            "Liczbę przed logarytmem ZAWSZE wciągaj jako potęgę: $k\\log_a x = \\log_a(x^k)$.",
            "Suma logarytmów to iloczyn argumentów, różnica to iloraz argumentów."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-2",
    numericId: 2,
    title: "Wyrażenia algebraiczne i wzory skróconego mnożenia",
    short_title: "Wyrażenia algebraiczne",
    description: "Wzory skróconego mnożenia 2. i 3. stopnia, redukcja wyrazów podobnych, rozkład na czynniki oraz dowodzenie tożsamości algebraicznych.",
    icon: "Layers",
    color: "#FFB800",
    matura_points_range: "2–4 pkt",
    importance: "CRITICAL_PEWNIAK",
    lessons: [
      {
        id: "math-lesson-2-1",
        order: 1,
        title: "Kwadrat sumy, kwadrat różnicy i różnica kwadratów",
        short_title: "Kwadraty sumy i różnicy",
        badge: "Lekcja 2.1",
        archetypeCode: "ARCH-21",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wzory drugiego stopnia to fundament algebry CKE: $(a+b)^2 = a^2 + 2ab + b^2$ oraz $(a-b)^2 = a^2 - 2ab + b^2$. Najważniejszą pułapką jest brak podwojonego iloczynu $2ab$. Z kolei wzór na różnicę kwadratów $a^2 - b^2 = (a-b)(a+b)$ działa w dwie strony: pozwala błyskawicznie wymnażać sprzężenia lub rozkładać wielomiany na czynniki liniowe.",
          matura_context: "CKE Formuła 2023 • Zadanie 3–5 w arkuszu • Waga: 1–2 pkt.",
          plain_polish: "Z polskiego na nasze: $(x+3)^2$ to NIE jest $x^2 + 9$! Pomiędzy nimi ZAWSZE musi stać podwojony iloczyn: $2 \\cdot x \\cdot 3 = 6x$, więc $(x+3)^2 = x^2 + 6x + 9$. Wyobraź sobie pole kwadratu podzielonego na cztery części: dwa kwadraty i dwa identyczne prostokąty.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Rozpoznaj typ wzoru",
              description: "Sprawdź, czy masz kwadrat całego nawiasu $(a \\pm b)^2$, czy różnicę dwóch osobnych kwadratów $a^2 - b^2$.",
              tip: "$(a-b)^2 \\neq a^2 - b^2$!"
            },
            {
              stepNumber: 2,
              title: "Podnieś pierwszy wyraz do kwadratu",
              description: "Oblicz $a^2$. Jeśli wyraz ma współczynnik, podnieś do kwadratu całość: $(2x)^2 = 4x^2$, a nie $2x^2$.",
              tip: "Zawsze pamiętaj o nawiasie przy potęgowaniu współczynnika."
            },
            {
              stepNumber: 3,
              title: "Wyznacz podwojony iloczyn 2ab",
              description: "Pomnóż pierwszy wyraz przez drugi i przez 2: $\\pm 2 \\cdot a \\cdot b$.",
              tip: "Znak środkowego wyrazu zależy wyłącznie od znaku wewnątrz nawiasu."
            },
            {
              stepNumber: 4,
              title: "Dodaj kwadrat drugiego wyrazu",
              description: "Kwadrat $b^2$ jest ZAWSZE dodatni, niezależnie od znaku w nawiasie: $(-3)^2 = +9$.",
              tip: "Ostatni wyraz zawsze ma znak plus!"
            }
          ],
          core_formulas: [
            {
              name: "Kwadrat sumy",
              formula: "(a + b)^2 = a^2 + 2ab + b^2"
            },
            {
              name: "Kwadrat różnicy",
              formula: "(a - b)^2 = a^2 - 2ab + b^2"
            },
            {
              name: "Różnica kwadratów",
              formula: "a^2 - b^2 = (a - b)(a + b)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiń wyrażenie $(3x - 2)^2 - (3x + 1)(3x - 1)$.",
              solution: "1. Kwadrat różnicy: $(3x - 2)^2 = (3x)^2 - 2 \\cdot 3x \\cdot 2 + 2^2 = 9x^2 - 12x + 4$.\n2. Różnica kwadratów: $(3x + 1)(3x - 1) = (3x)^2 - 1^2 = 9x^2 - 1$.\n3. Odejmujemy (pamiętając o zmianie znaków w nawiasie): $(9x^2 - 12x + 4) - (9x^2 - 1) = 9x^2 - 12x + 4 - 9x^2 + 1 = -12x + 5$.",
              keyInsight: "Minus przed iloczynem $(3x+1)(3x-1)$ zmienia znaki obu składników po wymnożeniu."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Upraszczanie pierwiastków)",
              points: "2 pkt",
              problem: "Oblicz wartość liczbową wyrażenia $(\\sqrt{5} - 2\\sqrt{2})^2 + 4\\sqrt{10}$.",
              solution: "1. Rozwijamy kwadrat różnicy: $(\\sqrt{5})^2 - 2 \\cdot \\sqrt{5} \\cdot 2\\sqrt{2} + (2\\sqrt{2})^2$.\n2. $(\\sqrt{5})^2 = 5$.\n3. Podwojony iloczyn: $-2 \\cdot 2 \\cdot \\sqrt{10} = -4\\sqrt{10}$.\n4. Kwadrat drugiego wyrazu: $(2\\sqrt{2})^2 = 4 \\cdot 2 = 8$.\n5. Całość: $5 - 4\\sqrt{10} + 8 + 4\\sqrt{10} = 13$.",
              keyInsight: "Wyrazy z pierwiastkiem $-4\\sqrt{10}$ i $+4\\sqrt{10}$ redukują się do zera."
            }
          ],
          trap_details: {
            fail: "Błąd: Zapisywanie $(a - b)^2 = a^2 - b^2$ lub gubienie wyrazu środkowego: $(2x - 3)^2 = 4x^2 - 9$.",
            win: "Poprawnie: $(2x - 3)^2 = (2x)^2 - 2(2x)(3) + 3^2 = 4x^2 - 12x + 9$.",
            explanation: "Potęgowanie nawiasu sumy lub różnicy to nie potęgowanie każdego wyrazu z osobna. Zawsze musi powstać trójmian z wyrazem $2ab$.",
            ckeTip: "Gdy przed nawiasem ze wzorem stoi znak minus, najpierw rozwiń wzór w nawiasie kwadratowym: $-[a^2 - 2ab + b^2]$."
          },
          exam_trap: "Nigdy nie zapominaj o podwojonym iloczynie $2ab$! $(a+b)^2 \\ne a^2 + b^2$.",
          key_points: [
            "Kwadrat sumy i różnicy daje trójmian (3 wyrazy).",
            "Różnica kwadratów $(a-b)(a+b)$ daje dwumian (2 wyrazy: $a^2 - b^2$).",
            "Kwadrat ze współczynnikiem wymaga potęgowania liczby: $(3x)^2 = 9x^2$."
          ]
        }
      },
      {
        id: "math-lesson-2-2",
        order: 2,
        title: "Suma i różnica sześcianów w przekształceniach",
        short_title: "Wzory trzeciego stopnia",
        badge: "Lekcja 2.2",
        archetypeCode: "ARCH-22",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wzory trzeciego stopnia występują w dwóch odmianach: sześcian sumy/różnicy $(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3$ oraz rozkład sumy/różnicy sześcianów $a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$. W arkuszu podstawowym CKE najczęściej testowany jest rozkład różnicy sześcianów przy skracaniu ułamków algebraicznych lub wyznaczaniu pierwiastków.",
          matura_context: "CKE Formuła 2023 • Zadanie 3–6 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Wyrażenie $x^3 - 8$ to różnica sześcianów $x^3 - 2^3$. Rozkładasz je na krótki nawias $(x - 2)$ i długi nawias $(x^2 + 2x + 4)$. Zauważ, że w długim nawiasie NIE ma dwójki przy $ab$ – to tzw. niepełny kwadrat sumy, którego delta jest zawsze ujemna!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj sześciany liczb",
              description: "Znajdź liczby będące sześcianami: $1=1^3, 8=2^3, 27=3^3, 64=4^3, 125=5^3$.",
              tip: "Zapisz $a^3 - b^3$ w jawnej postaci, np. $x^3 - 27 = x^3 - 3^3$."
            },
            {
              stepNumber: 2,
              title: "Zbuduj krótki nawias liniowy",
              description: "Przepisz podstawy z tym samym znakiem: $(a - b)$ dla różnicy lub $(a + b)$ dla sumy.",
              tip: "Znak w pierwszym nawiasie jest identyczny jak w wyjściowym wyrażeniu."
            },
            {
              stepNumber: 3,
              title: "Zbuduj długi nawias trójmianu",
              description: "Utwórz niepełny kwadrat z PRZECIWNYM znakiem iloczynu: $(a^2 + ab + b^2)$.",
              tip: "Uważaj: tu jest $+ab$, a NIE $+2ab$!"
            }
          ],
          core_formulas: [
            {
              name: "Różnica sześcianów",
              formula: "a^3 - b^3 = (a - b)(a^2 + ab + b^2)"
            },
            {
              name: "Suma sześcianów",
              formula: "a^3 + b^3 = (a + b)(a^2 - ab + b^2)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Uprość ułamek algebraiczny $\\frac{x^3 - 8}{x - 2}$ dla $x \\neq 2$.",
              solution: "1. Zauważamy, że $8 = 2^3$, więc licznik to różnica sześcianów: $x^3 - 2^3$.\n2. Stosujemy wzór: $x^3 - 2^3 = (x - 2)(x^2 + 2x + 4)$.\n3. Skracamy nawias $(x - 2)$ w liczniku i mianowniku: $\\frac{(x - 2)(x^2 + 2x + 4)}{x - 2} = x^2 + 2x + 4$.",
              keyInsight: "Czynnik $(x - 2)$ znosi się idealnie z mianownikiem."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "2 pkt",
              problem: "Wykaż, że dla każdej liczby rzeczywistej $x$ wartość wyrażenia $x^2 + 2x + 4$ jest ściśle dodatnia.",
              solution: "1. Jest to trójmian kwadratowy o współczynnikach $a=1, b=2, c=4$.\n2. Obliczamy wyróżnik: $\\Delta = b^2 - 4ac = 2^2 - 4 \\cdot 1 \\cdot 4 = 4 - 16 = -12 < 0$.\n3. Ponieważ $a = 1 > 0$ oraz $\\Delta < 0$, parabola leży w całości nad osią $OX$.\n4. Zatem dla każdego $x \\in \\mathbb{R}$ zachodzi $x^2 + 2x + 4 > 0$.",
              keyInsight: "Długi nawias z wzoru na różnicę sześcianów zawsze ma $\\Delta < 0$ i przyjmuje wyłącznie wartości dodatnie dla $a>0$."
            }
          ],
          trap_details: {
            fail: "Błąd: Wstawianie podwojonego iloczynu w długim nawiasie: $a^3 - b^3 = (a-b)(a^2 + 2ab + b^2)$.",
            win: "Poprawnie: W drugim nawiasie stoi zwykły iloczyn $ab$: $(a-b)(a^2 + ab + b^2)$.",
            explanation: "Obecność $2ab$ dałaby $(a+b)^2$, co jest kardynalnym błędem tożsamościowym.",
            ckeTip: "Sprawdź kartę wzorów CKE na stronie 3: wzór na sumę i różnicę sześcianów ma pojedyncze $ab$."
          },
          exam_trap: "Nie myl $(a-b)^3$ z $a^3 - b^3$! Sześcian różnicy to 4 wyrazy, a różnica sześcianów to iloczyn dwóch nawiasów.",
          key_points: [
            "$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$.",
            "Długi nawias trójmianu ma zawsze $\\Delta < 0$.",
            "Znaki: w różnicy sześcianów pierwszy nawias ma minus, a drugi nawias ma same plusy."
          ]
        }
      },
      {
        id: "math-lesson-2-3",
        order: 3,
        title: "Grupowanie wyrazów i wyłączanie wspólnego czynnika",
        short_title: "Rozkład na czynniki",
        badge: "Lekcja 2.3",
        archetypeCode: "ARCH-23",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Rozkład wielomianu na czynniki metodą grupowania wyrazów (metoda 2x2) polega na podzieleniu czterech wyrazów na dwie pary, wyłączeniu z każdej pary wspólnego czynnika tak, aby w nawiasach powstało dokładnie to samo wyrażenie liniowe $(x - a)$, a następnie wyłączeniu tego nawiasu przed całość.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 2 pkt lub zamknięte za 1 pkt (Żelazny pewniak).",
          plain_polish: "Z polskiego na nasze: Masz $x^3 - 3x^2 + 4x - 12$. Połącz pierwsze dwa wyrazy (wyciągnij $x^2$, zostaje $x - 3$) i drugie dwa (wyciągnij $4$, zostaje $x - 3$). Skoro w obu nawiasach masz to samo $(x - 3)$, wyjmujesz je przed nawias: $(x - 3)(x^2 + 4)$. Gotowe w 30 sekund!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Podziel 4 wyrazy na dwie pary",
              description: "Połącz parę wyrazów o najwyższych potęgach ($x^3$ i $x^2$) oraz parę o niższych ($x$ i wyraz wolny).",
              tip: "Uważaj na znak minus przed trzecim wyrazem – wyłącz go razem z liczbą!"
            },
            {
              stepNumber: 2,
              title: "Wyłącz wspólny czynnik z każdej pary",
              description: "Z pierwszej pary wyciągnij zazwyczaj $x^2$ (lub $ax^2$), z drugiej odpowiednią liczbę.",
              tip: "Celem jest uzyskanie IDENTYCZNEGO nawiasu w obu częściach."
            },
            {
              stepNumber: 3,
              title: "Wyłącz powtarzający się nawias przed całość",
              description: "Zapisz wielomian jako iloczyn: $(x - x_0)(ax^2 + b)$.",
              tip: "Sprawdź, czy drugi nawias kwadratowy da się jeszcze rozłożyć ze wzoru $a^2 - b^2$."
            }
          ],
          core_formulas: [
            {
              name: "Schemat grupowania 2x2",
              formula: "ax^3 + bx^2 + cx + d = x^2(ax + b) + k(ax + b) = (ax + b)(x^2 + k)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozłóż na czynniki wielomian $W(x) = x^3 - 2x^2 - 9x + 18$.",
              solution: "1. Grupujemy po dwa wyrazy: $(x^3 - 2x^2) - (9x - 18)$.\n2. Wyłączamy czynniki: $x^2(x - 2) - 9(x - 2)$.\n3. Wyłączamy wspólny nawias $(x - 2)$: $(x - 2)(x^2 - 9)$.\n4. Drugi nawias rozkładamy różnicą kwadratów: $x^2 - 9 = (x - 3)(x + 3)$.\n5. Postać iloczynowa: $(x - 2)(x - 3)(x + 3)$.",
              keyInsight: "Nigdy nie zostawiaj $x^2 - 9$ w postaci nierozłożonej – rozbij go na $(x-3)(x+3)$!"
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "2 pkt",
              problem: "Rozwiąż równanie $2x^3 + 3x^2 - 8x - 12 = 0$.",
              solution: "1. Grupujemy: $x^2(2x + 3) - 4(2x + 3) = 0$.\n2. Wyłączamy nawias: $(2x + 3)(x^2 - 4) = 0$.\n3. Rozkładamy różnicę kwadratów: $(2x + 3)(x - 2)(x + 2) = 0$.\n4. Przyrównujemy każdy czynnik do zera: $2x + 3 = 0 \\implies x = -\\frac{3}{2}$, $x - 2 = 0 \\implies x = 2$, $x + 2 = 0 \\implies x = -2$.\n5. Odpowiedź: $x \\in \\{-2, -\\frac{3}{2}, 2\\}$.",
              keyInsight: "Równanie stopnia 3 ma maksymalnie 3 rozwiązania rzeczywiste."
            }
          ],
          trap_details: {
            fail: "Błąd znaku przy wyłączaniu ujemnej liczby: $-9x + 18 = -9(x + 2)$ zamiast $-9(x - 2)$.",
            win: "Poprawnie: Minus przed nawiasem odwraca znak wewnątrz: $-9x + 18 = -9(x - 2)$.",
            explanation: "Pomyłka znaku w drugim nawiasie uniemożliwia wyłączenie wspólnego czynnika przed całość.",
            ckeTip: "Zawsze wymnóż w pamięci wyłączony czynnik, by sprawdzić czy odzyskujesz wyjściowe wyrazy."
          },
          exam_trap: "Uważaj na zmianę znaku przy wyłączaniu minusa przed nawias: $-cx + d = -c(x - \\frac{d}{c})$!",
          key_points: [
            "Grupowanie 2x2 wymaga identycznego nawiasu w obu grupach.",
            "Po wyłączeniu sprawdź, czy nawias kwadratowy da się rozłożyć ze wzoru $a^2 - b^2$.",
            "Nawias typu $x^2 + 4$ nie ma pierwiastków rzeczywistych i nie rozkłada się dalej."
          ]
        }
      },
      {
        id: "math-lesson-2-4",
        order: 4,
        title: "Dzielenie wielomianów i pierwiastki wielomianu",
        short_title: "Pierwiastki wielomianu",
        badge: "Lekcja 2.4",
        archetypeCode: "ARCH-24",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Liczba $r$ jest pierwiastkiem wielomianu $W(x)$ wtedy i tylko wtedy, gdy $W(r) = 0$. W Formule 2023 na poziomie podstawowym sprawdzanie pierwiastków opiera się na podstawieniu liczby lub twierdzeniu o pierwiastkach całkowitych (dzielniki wyrazu wolnego $a_0$).",
          matura_context: "CKE Formuła 2023 • Zadanie 3–5 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Pytanie „czy liczba 2 jest pierwiastkiem wielomianu?” oznacza po prostu: podstaw 2 w miejsce $x$ i sprawdź, czy wyjdzie 0. Jeśli wyjdzie 0 – tak, jest pierwiastkiem. Jeśli wyjdzie inna liczba – nie jest.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wypisz dzielniki wyrazu wolnego",
              description: "Dla wielomianu o współczynnikach całkowitych potencjalne pierwiastki to dzielniki wyrazu wolnego $d \\in \\{ \\pm 1, \\pm 2, \\dots \\}$.",
              tip: "Zacznij zawsze od sprawdzenia $x = 1$ oraz $x = -1$."
            },
            {
              stepNumber: 2,
              title: "Oblicz wartość wielomianu W(r)",
              description: "Podstaw wybraną liczbę pod każdy $x$ i oblicz wynik arytmetyczny.",
              tip: "Uważaj na potęgowanie liczb ujemnych: $(-1)^3 = -1$, ale $(-1)^2 = +1$."
            },
            {
              stepNumber: 3,
              title: "Wyciągnij wniosek",
              description: "Gdy $W(r) = 0$, liczba $r$ jest pierwiastkiem, a wielomian dzieli się przez dwumian $(x - r)$.",
              tip: "Liczba pierwiastków rzeczywistych nie może przekraczać stopnia wielomianu."
            }
          ],
          core_formulas: [
            {
              name: "Warunek bycia pierwiastkiem",
              formula: "W(r) = 0 \\iff (x - r) \\text{ dzieli wielomian } W(x)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Sprawdź, która z liczb: $\\{-2, -1, 1, 2\\}$ jest pierwiastkiem wielomianu $W(x) = x^3 - 3x - 2$.",
              solution: "1. Sprawdzamy $x = 1$: $W(1) = 1^3 - 3(1) - 2 = 1 - 3 - 2 = -4 \\neq 0$.\n2. Sprawdzamy $x = -1$: $W(-1) = (-1)^3 - 3(-1) - 2 = -1 + 3 - 2 = 0$.\n3. Zatem liczba $x = -1$ jest pierwiastkiem wielomianu $W(x)$.",
              keyInsight: "Pierwiastkiem jest liczba, dla której wartość wielomianu wynosi dokładnie 0."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "2 pkt",
              problem: "Liczba 3 jest pierwiastkiem wielomianu $W(x) = 2x^3 - ax^2 + 5x - 6$. Wyznacz wartość parametru $a$.",
              solution: "1. Skoro 3 jest pierwiastkiem, to $W(3) = 0$.\n2. Podstawiamy $x = 3$: $2(3)^3 - a(3)^2 + 5(3) - 6 = 0$.\n3. $2 \\cdot 27 - 9a + 15 - 6 = 0$.\n4. $54 - 9a + 9 = 0 \\implies 63 = 9a \\implies a = 7$.",
              keyInsight: "Informacja o pierwiastku tworzy natychmiastowe równanie liniowe z niewiadomą $a$."
            }
          ],
          trap_details: {
            fail: "Błąd: Mylenie pierwiastka wielomianu z pierwiastkiem arytmetycznym $\\sqrt{x}$.",
            win: "Poprawnie: Pierwiastek wielomianu to miejsce zerowe – liczba $x$, dla której wartość wynosi 0.",
            explanation: "Słowo „pierwiastek wielomianu” to synonim „miejsca zerowego” lub „rozwiązania równania $W(x)=0$”.",
            ckeTip: "Gdy w zadaniu z parametrem podano pierwiastek, od razu wstaw go w miejsce $x$ i przyrównaj całość do zera."
          },
          exam_trap: "Pamiętaj o nawiasach przy potęgowaniu liczb ujemnych: $-x^2$ dla $x=-2$ to $-( (-2)^2 ) = -4$, a nie $+4$!",
          key_points: [
            "Pierwiastek wielomianu to liczba zerująca wielomian: $W(r) = 0$.",
            "Kandydatów na pierwiastki całkowite szukaj wśród dzielników wyrazu wolnego.",
            "Wielomian stopnia $n$ ma maksymalnie $n$ pierwiastków rzeczywistych."
          ]
        }
      },
      {
        id: "math-lesson-2-5",
        order: 5,
        title: "Wzory skróconego mnożenia w dowodach algebraicznych",
        short_title: "Dowodzenie tożsamości",
        badge: "Lekcja 2.5",
        archetypeCode: "ARCH-25",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Zadania na dowodzenie w algebrze CKE (zwykle za 2 pkt) wymagają wykazania, że dana nierówność jest prawdziwa dla wszystkich liczb rzeczywistych. Żelazna strategia polega na przeniesieniu wszystkich wyrazów na lewą stronę i zwinięciu wyrażenia w pełny kwadrat: $(a \\pm b)^2 \\ge 0$. Ponieważ kwadrat dowolnej liczby rzeczywistej jest nieujemny, teza zostaje udowodniona.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 2 pkt (Klasyk CKE).",
          plain_polish: "Z polskiego na nasze: Masz udowodnić, że $a^2 + b^2 \\ge 2ab$? Przerzuć $2ab$ na lewo: $a^2 - 2ab + b^2 \\ge 0$. Zwiń ze wzoru skróconego mnożenia: $(a - b)^2 \\ge 0$. Dopisz komentarz: „Kwadrat dowolnej liczby rzeczywistej jest zawsze $\\ge 0$, co kończy dowód”. Zdobywasz komplet 2 punktów!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Przenieś wszystkie wyrazy na lewą stronę",
              description: "Doprowadź nierówność do postaci $L \\ge 0$ lub $L > 0$.",
              tip: "Prawa strona nierówności musi wynosić 0."
            },
            {
              stepNumber: 2,
              title: "Wymnóż nawiasy i zredukuj wyrazy podobne",
              description: "Uporządkuj wyrażenie algebraiczne po lewej stronie.",
              tip: "Szukaj składników pasujących do wzoru $(x \\pm y)^2$."
            },
            {
              stepNumber: 3,
              title: "Zwiń w pełny kwadrat sumy lub różnicy",
              description: "Zapisz lewą stronę jako $(A - B)^2 \\ge 0$ lub sumę kwadratów $(A-B)^2 + C \\ge 0$.",
              tip: "Jeśli zostaje liczba dodatnia (np. $+5$), tym bardziej suma jest $> 0$."
            },
            {
              stepNumber: 4,
              title: "Dodaj obowiązkowy komentarz wnioskowy",
              description: "Zapisz: „Nierówność jest prawdziwa dla każdych $a, b \\in \\mathbb{R}$, ponieważ kwadrat liczby rzeczywistej jest zawsze nieujemny”.",
              tip: "Brak słownego wniosku może kosztować utratę 1 punktu w kluczu CKE!"
            }
          ],
          core_formulas: [
            {
              name: "Aksjomat nieujemności kwadratu",
              formula: "\\forall x \\in \\mathbb{R}: \\quad x^2 \\ge 0"
            },
            {
              name: "Nierówność Cauchy'ego między średnimi",
              formula: "\\frac{a + b}{2} \\ge \\sqrt{ab} \\iff (\\sqrt{a} - \\sqrt{b})^2 \\ge 0 \\quad (a, b \\ge 0)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "2 pkt",
              problem: "Wykaż, że dla dowolnych liczb rzeczywistych $x$ i $y$ zachodzi nierówność $x^2 + y^2 + 5 > 2(x + 2y)$.",
              solution: "1. Przenosimy wszystko na lewą stronę: $x^2 + y^2 + 5 - 2x - 4y > 0$.\n2. Grupujemy pod pełne kwadraty zmiennych $x$ oraz $y$:\n   $(x^2 - 2x) + (y^2 - 4y) + 5 > 0$.\n3. Uzupełniamy do kwadratów:\n   $(x - 1)^2 - 1 + (y - 2)^2 - 4 + 5 > 0$.\n4. Upraszczamy liczby: $-1 - 4 + 5 = 0$.\n   Otrzymujemy: $(x - 1)^2 + (y - 2)^2 > 0$ (o ile $x \\neq 1$ lub $y \\neq 2$).\n5. Komentarz: Jako suma kwadratów liczb rzeczywistych wyrażenie jest zawsze $\\ge 0$.",
              keyInsight: "Rozbij stałą $5$ na $1 + 4$, tworząc dwa niezależne kwadraty $(x-1)^2$ i $(y-2)^2$."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "2 pkt",
              problem: "Wykaż, że jeśli $a + b = 4$, to $a^2 + b^2 \\ge 8$.",
              solution: "1. Z warunku zadania wyznaczamy $b = 4 - a$.\n2. Wstawiamy do lewej strony nierówności: $a^2 + (4 - a)^2 \\ge 8$.\n3. Rozwijamy kwadrat różnicy: $a^2 + 16 - 8a + a^2 \\ge 8$.\n4. $2a^2 - 8a + 8 \\ge 0$.\n5. Dzielimy obustronnie przez 2: $a^2 - 4a + 4 \\ge 0$.\n6. Zwijamy w kwadrat: $(a - 2)^2 \\ge 0$.\n7. Ponieważ kwadrat liczby rzeczywistej jest zawsze nieujemny, nierówność jest prawdziwa, co kończy dowód.",
              keyInsight: "Gdy w zadaniu podano równość wiążącą zmienne, wyznacz jedną zmienną i podstaw do dowodzonej nierówności."
            }
          ],
          trap_details: {
            fail: "Błąd: Podstawianie konkretnych liczb (np. $a=1, b=3$) jako dowód ogólny.",
            win: "Poprawnie: Dowód musi opierać się na przekształceniach algebraicznych dla zmiennych ogólnych.",
            explanation: "Klucz CKE przyznaje 0 punktów za sprawdzenie tezy na wybranych liczbach. Dowód wymaga zwinięcia do $(a-b)^2 \\ge 0$.",
            ckeTip: "Zawsze zakończ dowód jawnym zdaniem podsumowującym: „co należało wykazać” (c.n.d.)."
          },
          exam_trap: "Nigdy nie dowodź twierdzenia przez podstawienie konkretnych cyfr! Taki dowód otrzymuje 0 punktów.",
          key_points: [
            "Celem dowodu jest postać $(A - B)^2 \\ge 0$ lub suma kwadratów.",
            "Kwadrat liczby rzeczywistej jest ZAWSZE nieujemny: $X^2 \\ge 0$.",
            "Pamiętaj o słownym wniosku kończącym dowód."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-3",
    numericId: 3,
    title: "Równania i nierówności liniowe oraz kwadratowe",
    short_title: "Równania i nierówności",
    description: "Równania liniowe i kwadratowe, wyróżnik delta, parabola i nierówności kwadratowe, równania wymierne i dziedzina mianownika.",
    icon: "EqualNot",
    color: "#FFB800",
    matura_points_range: "5–8 pkt",
    importance: "CRITICAL_PEWNIAK",
    lessons: [
      {
        id: "math-lesson-3-1",
        order: 1,
        title: "Równania i nierówności liniowe z jedną niewiadomą",
        short_title: "Równania liniowe",
        badge: "Lekcja 3.1",
        archetypeCode: "ARCH-31",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Równanie liniowe $ax + b = 0$ ma dokładnie jedno rozwiązanie $x = -\\frac{b}{a}$ dla $a \\neq 0$. W nierównościach liniowych fundamentalną zasadą CKE jest: **mnożenie lub dzielenie nierówności przez liczbę ujemną bezwzględnie odwraca zwrot znaku nierówności** (np. z $<$ na $>$, z $\\le$ na $\\ge$).",
          matura_context: "CKE Formuła 2023 • Zadanie 1–4 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Masz $-2x \\le 6$? Dzielisz przez $-2$, więc dziubek nierówności MUSI się natychmiast odwrócić w drugą stronę: $x \\ge -3$. Zapomnienie o odwróceniu znaku to numer jeden wśród błędów w zadaniach testowych.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wymnóż nawiasy lub usuń ułamki",
              description: "Pomnóż obie strony przez wspólny mianownik, aby pozbyć się ułamków.",
              tip: "Pamiętaj o pomnożeniu KAŻDEGO składnika, także wyrazów wolnych bez mianownika!"
            },
            {
              stepNumber: 2,
              title: "Przenieś niewiadome na lewo, liczby na prawo",
              description: "Zmieniaj znaki wyrazów przy przenoszeniu przez znak równości/nierówności.",
              tip: "Uporządkuj wyrażenie do postaci $ax \\le c$."
            },
            {
              stepNumber: 3,
              title: "Podziel przez współczynnik przy x",
              description: "Jeśli dzielisz przez liczbę ujemną, ODWRÓĆ ZWROT ZNAKU NIERÓWNOŚCI.",
              tip: "$-3x < 9 \\implies x > -3$."
            },
            {
              stepNumber: 4,
              title: "Zapisz wynik w postaci przedziału",
              description: "Zaznacz zbiór na osi liczbowej i zapisz przedział (np. $x \\in \\langle -3, +\\infty)$).",
              tip: "Ostra nierówność $\\le$ to kropka zamalowana i nawias ostrokątny $\\langle$."
            }
          ],
          core_formulas: [
            {
              name: "Zmiana znaku przy dzieleniu przez liczbę ujemną",
              formula: "-ax \\le b \\iff x \\ge -\\frac{b}{a} \\quad (a > 0)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiąż nierówność $\\frac{2 - x}{3} - \\frac{x + 1}{2} \\ge 1$.",
              solution: "1. Mnożymy obie strony przez wspólny mianownik 6:\n   $2(2 - x) - 3(x + 1) \\ge 6$.\n2. Wymnażamy nawiasy: $4 - 2x - 3x - 3 \\ge 6$.\n3. Redukujemy: $-5x + 1 \\ge 6 \\implies -5x \\ge 5$.\n4. Dzielimy przez $-5$, odwracając znak: $x \\le -1$.\n5. Odpowiedź: $x \\in (-\\infty, -1\\rangle$.",
              keyInsight: "Minus przed ułamkiem $\\frac{x+1}{2}$ odnosi się do całego licznika: $-(x+1) = -x - 1$."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "2 pkt",
              problem: "Wyznacz najmniejszą liczbę całkowitą spełniającą nierówność $3(1 - 2x) < 2(x + 5) - 3$.",
              solution: "1. Wymnażamy: $3 - 6x < 2x + 10 - 3$.\n2. $3 - 6x < 2x + 7$.\n3. Przenosimy: $-8x < 4$.\n4. Dzielimy przez $-8$ (odwracamy znak): $x > -\\frac{4}{8} \\implies x > -0{,}5$.\n5. Szukamy najmniejszej liczby CAŁKOWITEJ większej od $-0{,}5$: jest to $0$.\n6. Odpowiedź: $x = 0$.",
              keyInsight: "Liczba całkowita większa od $-0{,}5$ to $0$, a nie $-1$."
            }
          ],
          trap_details: {
            fail: "Błąd: Brak zmiany zwrotu nierówności przy dzieleniu przez ujemny współczynnik: $-3x < 6 \\implies x < -2$.",
            win: "Poprawnie: Dzielenie przez ujemną liczbę ZAWSZE odwraca dziubek: $-3x < 6 \\implies x > -2$.",
            explanation: "Na osi liczbowej mnożenie przez minus odwraca porządek liczb względem zera.",
            ckeTip: "Zawsze gdy dzielisz przez liczbę z minusem, narysuj w myślach wykrzyknik i natychmiast odwróć znak nierówności."
          },
          exam_trap: "Nigdy nie zapominaj o odwróceniu znaku nierówności przy dzieleniu przez liczbę ujemną!",
          key_points: [
            "Dzielenie przez minus odwraca znak nierówności.",
            "Minus przed kreską ułamkową zmienia znaki wszystkich wyrazów w liczniku.",
            "Uważaj na polecenia pytające o najmniejszą/największą liczbę całkowitą."
          ]
        }
      },
      {
        id: "math-lesson-3-2",
        order: 2,
        title: "Równania kwadratowe: wyróżnik delta i pierwiastki",
        short_title: "Delta i pierwiastki",
        badge: "Lekcja 3.2",
        archetypeCode: "ARCH-32",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Dla równania kwadratowego $ax^2 + bx + c = 0$ ($a \\neq 0$) wyróżnik wynosi $\\Delta = b^2 - 4ac$. Gdy $\\Delta > 0$, istnieją 2 rozwiązania $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$. Gdy $\\Delta = 0$, istnieje 1 podwójne rozwiązanie $x_0 = -\\frac{b}{2a}$. Gdy $\\Delta < 0$, brak rozwiązań w liczbach rzeczywistych.",
          matura_context: "CKE Formuła 2023 • Zadanie 4–6 w arkuszu • Waga: 1–2 pkt (Absolutny fundament).",
          plain_polish: "Z polskiego na nasze: Delta to termometr równania kwadratowego. Jeśli $\\Delta > 0$, masz dwa wyniki. Jeśli $\\Delta = 0$, masz jeden wynik (wierzchołek dotyka osi). Jeśli $\\Delta < 0$, wykres wisi w powietrzu i równanie nie ma rozwiązań. Uważaj na minusy przy liczeniu $b^2$: $(-5)^2 = +25$, a nie $-25$!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Doprowadź równanie do postaci ogólnej",
              description: "Przenieś wszystko na jedną stronę: $ax^2 + bx + c = 0$.",
              tip: "Wypisz współczynniki: $a = \\dots, b = \\dots, c = \\dots$."
            },
            {
              stepNumber: 2,
              title: "Oblicz wyróżnik delta",
              description: "Zastosuj wzór $\\Delta = b^2 - 4ac$.",
              tip: "Pamiętaj: kwadrat $b^2$ ZAWSZE jest dodatni!"
            },
            {
              stepNumber: 3,
              title: "Wyciągnij pierwiastek z delty",
              description: "Oblicz $\\sqrt{\\Delta}$. Na maturze podstawowej $\\Delta$ to niemal zawsze pełny kwadrat (np. 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225).",
              tip: "Jeśli delta nie jest ładnym kwadratem, sprawdź rachunki!"
            },
            {
              stepNumber: 4,
              title: "Wyznacz pierwiastki x1 i x2",
              description: "Zastosuj wzory $x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}$, $x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$.",
              tip: "W mianowniku stoi $2a$, a nie samo 2!"
            }
          ],
          core_formulas: [
            {
              name: "Wyróżnik równania kwadratowego",
              formula: "\\Delta = b^2 - 4ac"
            },
            {
              name: "Dwa pierwiastki rzeczywiste (Δ > 0)",
              formula: "x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}"
            },
            {
              name: "Jeden pierwiastek podwójny (Δ = 0)",
              formula: "x_0 = -\\frac{b}{2a}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiąż równanie $2x^2 - 5x - 3 = 0$.",
              solution: "1. Współczynniki: $a = 2, b = -5, c = -3$.\n2. $\\Delta = (-5)^2 - 4 \\cdot 2 \\cdot (-3) = 25 - (-24) = 25 + 24 = 49$.\n3. $\\sqrt{\\Delta} = \\sqrt{49} = 7$.\n4. $x_1 = \\frac{-(-5) - 7}{2 \\cdot 2} = \\frac{5 - 7}{4} = \\frac{-2}{4} = -\\frac{1}{2}$.\n5. $x_2 = \\frac{5 + 7}{4} = \\frac{12}{4} = 3$.\n6. Rozwiązania: $x \\in \\{-\\frac{1}{2}, 3\\}$.",
              keyInsight: "Minus razy minus daje plus: $-4 \\cdot 2 \\cdot (-3) = +24$."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Równanie niepełne)",
              points: "1 pkt",
              problem: "Rozwiąż równanie $3x^2 - 12x = 0$.",
              solution: "1. Nie ma potrzeby liczenia delty! Wyłączamy wspólny czynnik $3x$ przed nawias:\n   $3x(x - 4) = 0$.\n2. Iloczyn jest zerem, gdy co najmniej jeden czynnik jest zerem:\n   $3x = 0 \\implies x = 0$  lub  $x - 4 = 0 \\implies x = 4$.\n3. Odpowiedź: $x \\in \\{0, 4\\}$.",
              keyInsight: "Dla równań bez wyrazu wolnego ($c=0$) wyciągaj $x$ przed nawias. Jednym z rozwiązań ZAWSZE jest $x=0$."
            }
          ],
          trap_details: {
            fail: "Błąd: Błędny znak przy liczeniu $b^2$: dla $b=-6$ uczeń pisze $-6^2 = -36$ i delta wychodzi ujemna.",
            win: "Poprawnie: $(-6)^2 = +36$. Kwadrat liczby rzeczywistej jest zawsze dodatni!",
            explanation: "Kalkulator lub pośpiech bez nawiasu prowadzi do fatalnego błędu znaku przy delcie.",
            ckeTip: "Zawsze wpisuj $b$ do delty w nawiasie: $(b)^2$."
          },
          exam_trap: "Nigdy nie dziel równania $3x^2 - 12x = 0$ przez $x$, bo bezpowrotnie stracisz rozwiązanie $x=0$!",
          key_points: [
            "Gdy $c = 0$, wyłącz $x$ przed nawias (jedno z rozwiązań to 0).",
            "Gdy $b = 0$, przenieś wyraz wolny i spierwiastkuj ($x^2 = 9 \\implies x = \\pm 3$).",
            "W mianowniku wzoru na pierwiastki ZAWSZE stoi $2a$."
          ]
        }
      },
      {
        id: "math-lesson-3-3",
        order: 3,
        title: "Nierówności kwadratowe: szkicowanie paraboli",
        short_title: "Nierówności kwadratowe",
        badge: "Lekcja 3.3",
        archetypeCode: "ARCH-33",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Rozwiązanie nierówności kwadratowej $ax^2 + bx + c > 0$ (lub $<, \\ge, \\le$) wymaga 3 obowiązkowych kroków: wyznaczenia miejsc zerowych (z delty lub rozkładu), naszkicowania orientacyjnej paraboli z ramionami w górę ($a > 0$) lub w dół ($a < 0$), oraz odczytania przedziału nad osią ($>0$) lub pod osią ($<0$).",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 2 pkt lub zamknięte za 1 pkt (Żelazny pewniak każdego arkusza!).",
          plain_polish: "Z polskiego na nasze: Miejsca zerowe to tylko punkty graniczne na osi. Żeby podać przedział, MUSISZ narysować parabolę: uśmiechnięta ($a>0$) czy smutna ($a<0$)? Jeśli w nierówności masz $>0$, bierzesz to, co wystaje nad oś. Jeśli $<0$, bierzesz brzuch pod osią.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz miejsca zerowe x1 i x2",
              description: "Przyrównaj trójmian do zera i wyznacz pierwiastki z delty.",
              tip: "Jeśli $\\Delta < 0$, parabola nie przecina osi $OX$."
            },
            {
              stepNumber: 2,
              title: "Naszkicuj oś i parabolę",
              description: "Zaznacz miejsca zerowe na osi. Skieruj ramiona: w górę dla $a > 0$, w dół dla $a < 0$.",
              tip: "Dla nierówności $\\ge, \\le$ zamaluj kropki. Dla $>, <$ kółka są otwarte."
            },
            {
              stepNumber: 3,
              title: "Odczytaj przedział",
              description: "Dla znaku $>$ wybierz przedziały nad osią (dwa skrzydła zewnętrzne). Dla znaku $<$ wybierz przedział pod osią (jedno wnętrze).",
              tip: "Dla $a>0$ i znaku $>$ rozwiązaniem jest suma $(-\\infty, x_1) \\cup (x_2, +\\infty)$."
            }
          ],
          core_formulas: [
            {
              name: "Schemat rozwiązań dla a > 0",
              formula: "ax^2 + bx + c \\ge 0 \\iff x \\in (-\\infty, x_1\\rangle \\cup \\langle x_2, +\\infty)"
            },
            {
              name: "Schemat rozwiązań dla a > 0 (wnętrze)",
              formula: "ax^2 + bx + c \\le 0 \\iff x \\in \\langle x_1, x_2 \\rangle"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "2 pkt",
              problem: "Rozwiąż nierówność $x^2 - 3x - 10 \\le 0$.",
              solution: "1. Miejsca zerowe: $x^2 - 3x - 10 = 0$.\n2. $\\Delta = (-3)^2 - 4(1)(-10) = 9 + 40 = 49$, $\\sqrt{\\Delta} = 7$.\n3. $x_1 = \\frac{3 - 7}{2} = -2$, $x_2 = \\frac{3 + 7}{2} = 5$.\n4. Szkic paraboli: $a = 1 > 0$, ramiona skierowane w górę, kropki zamalowane w $-2$ i $5$.\n5. Znak $\\le 0$ oznacza wartości niedodatnie (pod osią i na osi).\n6. Rozwiązanie: $x \\in \\langle -2, 5 \\rangle$.",
              keyInsight: "Dla $a > 0$ i znaku $\\le 0$ rozwiązaniem jest pojedynczy przedział domknięty między pierwiastkami."
            },
            {
              title: "Zadanie Podchwytliwe CKE (a ujemne)",
              points: "2 pkt",
              problem: "Rozwiąż nierówność $-2x^2 + 8x > 0$.",
              solution: "1. Wyłączamy przed nawias: $-2x(x - 4) > 0$.\n2. Miejsca zerowe: $x_1 = 0$, $x_2 = 4$.\n3. Szkic paraboli: $a = -2 < 0$, więc ramiona są skierowane W DÓŁ.\n4. Kółka otwarte w $0$ i $4$.\n5. Szukamy wartości $> 0$, czyli NAD osią $OX$: jest to wnętrze między pierwiastkami!\n6. Odpowiedź: $x \\in (0, 4)$.",
              keyInsight: "Gdy ramiona są skierowane w dół ($a < 0$), wartości dodatnie znajdują się pomiędzy pierwiastkami!"
            }
          ],
          trap_details: {
            fail: "Błąd: Zapisywanie samego równania lub podawanie odpowiedzi w postaci $x_1 = -2, x_2 = 5$ bez przedziału.",
            win: "Poprawnie: Nierówność kwadratowa ZAWSZE kończy się przedziałem liczbowym, np. $x \\in \\langle -2, 5 \\rangle$.",
            explanation: "Samo wyliczenie miejsc zerowych to dopiero 1 z 2 punktów. Drugi punkt przyznawany jest wyłącznie za poprawny przedział odczytany z paraboli.",
            ckeTip: "Zawsze narysuj prostą poziomą i parabolę na marginesie arkusza – egzaminator musi widzieć szkic!"
          },
          exam_trap: "Nigdy nie kończ zadania na wyliczeniu pierwiastków! Rozwiązaniem nierówności jest przedział, a nie punkty.",
          key_points: [
            "Ramiona paraboli: $a > 0$ w górę, $a < 0$ w dół.",
            "Znak $\\le, \\ge$ to nawiasy domknięte $\\langle \\rangle$, znak $<, >$ to nawiasy otwarte $( )$.",
            "Gdy $\\Delta < 0$ i $a > 0$, parabola wisi nad osią: nierówność $> 0$ spełniają wszystkie liczby $x \\in \\mathbb{R}$."
          ]
        }
      },
      {
        id: "math-lesson-3-4",
        order: 4,
        title: "Równania wymierne i wyznaczanie dziedziny",
        short_title: "Równania wymierne",
        badge: "Lekcja 3.4",
        archetypeCode: "ARCH-34",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W równaniach wymiernych typu $\\frac{P(x)}{Q(x)} = 0$ absolutnym i nienaruszalnym warunkiem CKE jest wyznaczenie dziedziny: mianownik nie może być zerem ($Q(x) \\neq 0$). Ułamek jest równy zero wtedy i tylko wtedy, gdy licznik jest zerem ($P(x) = 0$), a otrzymane pierwiastki należą do dziedziny.",
          matura_context: "CKE Formuła 2023 • Zadanie 5–8 w arkuszu • Waga: 1 pkt (Żelazny pewniak).",
          plain_polish: "Z polskiego na nasze: Widzisz kreskę ułamkową i $x$ na dole? Od razu krzycz w myślach: „Mianownik NIE MOŻE być zerem!”. Zapisujesz warunek $x \\neq \\dots$ zanim w ogóle dotkniesz licznika. CKE celowo dobiera zadanie tak, by jedno z rozwiązań licznika zerowało mianownik i trzeba je było wyrzucić do kosza!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zastrzeż dziedzinę równania",
              description: "Przyrównaj każdy mianownik do zera i wyklucz te liczby: $D = \\mathbb{R} \\setminus \\{x_0\\}$.",
              tip: "Nigdy nie pomijaj tego kroku – od niego zależy poprawność wyniku!"
            },
            {
              stepNumber: 2,
              title: "Przyrównaj licznik do zera",
              description: "Ułamek $\\frac{A}{B} = 0$ zeruje się wyłącznie wtedy, gdy $A = 0$.",
              tip: "W równaniach z proporcją $\\frac{A}{B} = \\frac{C}{D}$ pomnóż „na krzyż”: $A \\cdot D = B \\cdot C$."
            },
            {
              stepNumber: 3,
              title: "Rozwiąż równanie z licznika",
              description: "Wyznacz potencjalne pierwiastki równania.",
              tip: "Może to być równanie liniowe lub kwadratowe."
            },
            {
              stepNumber: 4,
              title: "Skonfrontuj wyniki z dziedziną",
              description: "Sprawdź, czy któryś pierwiastek nie został wykluczony w Kroku 1. Odrzuć pierwiastki spoza dziedziny.",
              tip: "Podaj jako odpowiedź wyłącznie liczby należące do $D$."
            }
          ],
          core_formulas: [
            {
              name: "Zasada zerowania ułamka",
              formula: "\\frac{P(x)}{Q(x)} = 0 \\iff P(x) = 0 \\quad \\wedge \\quad Q(x) \\neq 0"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiąż równanie $\\frac{(x - 3)(x + 2)}{x - 3} = 0$.",
              solution: "1. Dziedzina: mianownik $x - 3 \\neq 0 \\implies x \\neq 3$. Zatem $D = \\mathbb{R} \\setminus \\{3\\}$.\n2. Przyrównujemy licznik do zera: $(x - 3)(x + 2) = 0$.\n3. Rozwiązania licznika: $x = 3$ lub $x = -2$.\n4. Weryfikacja z dziedziną: liczba $3$ nie należy do dziedziny ($3 \\notin D$), więc ją odrzucamy!\n5. Jedynym poprawnym rozwiązaniem jest $x = -2$.",
              keyInsight: "Liczba 3 jest fałszywym pierwiastkiem, ponieważ zeruje mianownik."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Mnożenie na krzyż)",
              points: "2 pkt",
              problem: "Rozwiąż równanie $\\frac{x + 1}{x - 1} = \\frac{2}{x - 1}$.",
              solution: "1. Dziedzina: $x - 1 \\neq 0 \\implies x \\neq 1$, czyli $D = \\mathbb{R} \\setminus \\{1\\}$.\n2. Mnożymy na krzyż (lub odejmujemy ułamki o wspólnym mianowniku):\n   $x + 1 = 2 \\implies x = 1$.\n3. Weryfikacja z dziedziną: otrzymaliśmy $x = 1$, ale $1 \\notin D$!\n4. Równanie nie ma rozwiązań (zbiór rozwiązań jest pusty: $x \\in \\emptyset$).",
              keyInsight: "Gdy jedyne wyliczone rozwiązanie odpada przez dziedzinę, równanie jest sprzeczne."
            }
          ],
          trap_details: {
            fail: "Błąd: Podanie $x = 3$ i $x = -2$ jako rozwiązań równania $\\frac{(x-3)(x+2)}{x-3}=0$.",
            win: "Poprawnie: $x = 3$ odpada przez dziedzinę, więc jedynym rozwiązaniem jest $x = -2$.",
            explanation: "Dzielenie przez zero jest niewykonalne w matematyce. Pierwiastek zerujący mianownik jest pierwiastkiem obcym.",
            ckeTip: "Zawsze zapisuj Dziedzinę wielką literą $D = \\mathbb{R} \\setminus \\{\\dots\\}$ na samym początku rozwiązania."
          },
          exam_trap: "Nigdy nie zapominaj o dziedzinie mianownika! Odrzucenie pierwiastka obcego to klucz do punktu.",
          key_points: [
            "Zawsze wyznacz dziedzinę PRZED rozwiązaniem równania.",
            "Ułamek równa się zero, gdy licznik jest zerem, a mianownik jest różny od zera.",
            "W równaniach z proporcją stosuj mnożenie na krzyż: $\\frac{a}{b} = \\frac{c}{d} \\iff ad = bc$."
          ]
        }
      },
      {
        id: "math-lesson-3-5",
        order: 5,
        title: "Równania wielomianowe w postaci iloczynowej",
        short_title: "Równania iloczynowe",
        badge: "Lekcja 3.5",
        archetypeCode: "ARCH-35",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Równanie w postaci iloczynowej $(ax+b)(cx^2+dx+e) = 0$ opiera się na podstawowym prawie algebry: **iloczyn jest równy zero wtedy i tylko wtedy, gdy co najmniej jeden z jego czynników jest równy zero**. Nie wymnażamy nawiasów – każdy nawias przyrównujemy do zera osobno!",
          matura_context: "CKE Formuła 2023 • Zadanie 4–7 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Jeśli widzisz nawiasy wymnożone przez siebie i po prawej stronie zero, to masz prezent od CKE! Pod żadnym pozorem nie wymnażaj nawiasów. Rozbij to na małe, proste równania: pierwszy nawias $=0$, drugi nawias $=0$. Rozwiązujesz każde z osobna.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Upewnij się, że po prawej stronie jest zero",
              description: "Postać iloczynowa działa WYŁĄCZNIE wtedy, gdy po prawej stronie stoi dokładnie 0.",
              tip: "Jeśli po prawej stronie jest inna liczba, najpierw przenieś ją na lewo!"
            },
            {
              stepNumber: 2,
              title: "Rozbij iloczyn na alternatywę równań",
              description: "Przyrównaj każdy nawias i każdy czynnik z $x$ do zera: $A=0 \\lor B=0 \\lor C=0$.",
              tip: "Nie zapomnij o czynniku stojącym przed nawiasami, np. $2x(x-1) \\implies 2x=0 \\implies x=0$."
            },
            {
              stepNumber: 3,
              title: "Rozwiąż każde równanie składowe",
              description: "Rozwiąż równania liniowe lub kwadratowe powstałe z poszczególnych nawiasów.",
              tip: "Jeśli z nawiasu kwadratowego $\\Delta < 0$, ten nawias nie daje rozwiązań."
            },
            {
              stepNumber: 4,
              title: "Podaj sumę wszystkich rozwiązań",
              description: "Zbierz wszystkie wyznaczone pierwiastki i wypisz zbiór rozwiązań.",
              tip: "Wypisz pierwiastki w klamrach: $x \\in \\{x_1, x_2, \\dots\\}$."
            }
          ],
          core_formulas: [
            {
              name: "Zasada iloczynowa zerowania",
              formula: "A \\cdot B \\cdot C = 0 \\iff A = 0 \\quad \\lor \\quad B = 0 \\quad \\lor \\quad C = 0"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiąż równanie $(x^2 - 4)(2x + 6)(x^2 + 9) = 0$.",
              solution: "1. Przyrównujemy każdy czynnik do zera:\n   - $x^2 - 4 = 0 \\implies x^2 = 4 \\implies x = -2 \\lor x = 2$.\n   - $2x + 6 = 0 \\implies 2x = -6 \\implies x = -3$.\n   - $x^2 + 9 = 0 \\implies x^2 = -9$ (brak rozwiązań w $\\mathbb{R}$, bo kwadrat nie może być ujemny).\n2. Zbieramy rozwiązania rzeczywiste: $x \\in \\{-3, -2, 2\\}$.",
              keyInsight: "Nawias $x^2 + 9$ nigdy się nie zeruje dla liczb rzeczywistych."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "2 pkt",
              problem: "Ile różnych rozwiązań rzeczywistych ma równanie $x(x - 1)^2 (x^2 - 1) = 0$?",
              solution: "1. Rozbijamy na czynniki liniowe:\n   - $x = 0$.\n   - $(x - 1)^2 = 0 \\implies x = 1$.\n   - $x^2 - 1 = 0 \\implies (x - 1)(x + 1) = 0 \\implies x = 1 \\lor x = -1$.\n2. Zauważamy, że pierwiastek $x = 1$ powtarza się w dwóch czynnikach.\n3. Różne rozwiązania rzeczywiste to: $\\{-1, 0, 1\\}$.\n4. Równanie ma dokładnie 3 różne rozwiązania rzeczywiste.",
              keyInsight: "Pytanie o liczbę RÓŻNYCH rozwiązań wymaga eliminacji duplikatów pierwiastków wielokrotnych."
            }
          ],
          trap_details: {
            fail: "Błąd: Próba wymnażania nawiasów: $(x-2)(x+3)(x-5)=0$ do wielomianu 3. stopnia.",
            win: "Poprawnie: Każdy nawias przyrównujemy do zera od razu bez wymnażania.",
            explanation: "Wymnożenie nawiasów niszczy gotową postać iloczynową i dramatycznie utrudnia zadanie.",
            ckeTip: "Postać iloczynowa to gotowe rozwiązanie – wystarczy odczytać liczby zerujące nawiasy."
          },
          exam_trap: "Uważaj na nawiasy typu $(x^2 + 4)$: one nigdy nie dają pierwiastków w liczbach rzeczywistych ($x^2 = -4$ brak rozw.)!",
          key_points: [
            "Nigdy nie wymnażaj nawiasów, gdy po prawej stronie jest 0.",
            "Każdy nawias przyrównaj do zera osobno.",
            "Czynnik $x^2 + k$ (gdzie $k>0$) nie ma rozwiązań rzeczywistych."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-4",
    numericId: 4,
    title: "Układy równań liniowych z dwiema niewiadomymi",
    short_title: "Układy równań",
    description: "Metoda podstawiania, metoda przeciwnych współczynników, interpretacja geometryczna (proste przecinające się, równoległe) i zadania tekstowe.",
    icon: "Binary",
    color: "#FFB800",
    matura_points_range: "2–4 pkt",
    importance: "HIGH",
    lessons: [
      {
        id: "math-lesson-4-1",
        order: 1,
        title: "Układy równań liniowych: metoda podstawiania",
        short_title: "Metoda podstawiania",
        badge: "Lekcja 4.1",
        archetypeCode: "ARCH-41",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Metoda podstawiania polega na wyznaczeniu jednej zmiennej ($x$ lub $y$) z jednego równania (najlepiej o współczynniku $1$ lub $-1$) i wstawieniu tego wyrażenia w miejsce tej zmiennej do drugiego równania. Otrzymujemy jedno równanie z jedną niewiadomą.",
          matura_context: "CKE Formuła 2023 • Zadanie 5–8 w arkuszu • Waga: 1–2 pkt.",
          plain_polish: "Z polskiego na nasze: Szukasz w układzie samotnego $x$ lub $y$ (bez liczby z przodu). Wyznaczasz go: $y = 3 - 2x$. Następnie bierzesz to wyrażenie w nawias i wklejasz w drugie równanie w miejsce $y$. Masz równanie tylko z $x$, które rozwiązujesz w minutę.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wybierz najprostszą zmienną",
              description: "Znajdź zmienną ze współczynnikiem $1$ lub $-1$ w którymkolwiek równaniu.",
              tip: "Unikaj ułamków – wybieraj zmienną bez współczynnika liczbowego."
            },
            {
              stepNumber: 2,
              title: "Wyznacz tę zmienną",
              description: "Przenieś pozostałe wyrazy na drugą stronę, np. $x = 5 - 2y$.",
              tip: "Uważaj na zmianę znaków przy przenoszeniu."
            },
            {
              stepNumber: 3,
              title: "Podstaw do DRUGIEGO równania",
              description: "Zastąp wybraną zmienną nawiasem z wyznaczonym wyrażeniem.",
              tip: "Pamiętaj o nawiasie przy mnożeniu przez współczynnik!"
            },
            {
              stepNumber: 4,
              title: "Oblicz drugą zmienną",
              description: "Wyliczoną wartość wstaw do wzoru z Kroku 2, by obliczyć pierwszą zmienną.",
              tip: "Zapisz wynik w postaci pary liczb: $x = \\dots, y = \\dots$."
            }
          ],
          core_formulas: [
            {
              name: "Postać ogólna układu 2 równań",
              formula: "\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiąż układ równań: $\\begin{cases} x - 2y = 4 \\\\ 3x + y = 5 \\end{cases}$.",
              solution: "1. Z pierwszego równania wyznaczamy $x$: $x = 4 + 2y$.\n2. Podstawiamy do drugiego równania: $3(4 + 2y) + y = 5$.\n3. Wymnażamy: $12 + 6y + y = 5 \\implies 7y = 5 - 12 \\implies 7y = -7 \\implies y = -1$.\n4. Obliczamy $x$: $x = 4 + 2(-1) = 4 - 2 = 2$.\n5. Rozwiązanie: $\\begin{cases} x = 2 \\\\ y = -1 \\end{cases}$.",
              keyInsight: "Zawsze sprawdzaj poprawność, podstawiając parę $(2, -1)$ do obu wyjściowych równań."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "2 pkt",
              problem: "Dla jakiej wartości parametru $m$ układ $\\begin{cases} x + y = 3 \\\\ 2x + 2y = m \\end{cases}$ ma nieskończenie wiele rozwiązań?",
              solution: "1. Zauważmy, że lewa strona drugiego równania to podwojona lewa strona pierwszego równania: $2(x + y) = 2 \\cdot 3 = 6$.\n2. Aby drugie równanie było tożsame z pierwszym, prawa strona również musi być podwojona: $m = 6$.\n3. Dla $m = 6$ proste pokrywają się i układ ma nieskończenie wiele rozwiązań (układ tożsamościowy).",
              keyInsight: "Nieskończenie wiele rozwiązań oznacza, że równania są swoimi wielokrotnościami."
            }
          ],
          trap_details: {
            fail: "Błąd: Brak nawiasu przy podstawianiu: $3 \\cdot 4 + 2y$ zamiast $3(4 + 2y)$.",
            win: "Poprawnie: Wyrażenie podstawiane w całości bierzemy w nawias: $3(4 + 2y) = 12 + 6y$.",
            explanation: "Współczynnik stojący przed zmienną musi pomnożyć wszystkie składniki podstawianego wyrażenia.",
            ckeTip: "Zawsze wpisuj podstawienie w nawiasie okrągłym."
          },
          exam_trap: "Pamiętaj o podaniu OBU zmiennych ($x$ i $y$). Wyliczenie samego $x$ to dopiero połowa zadania!",
          key_points: [
            "Wyznaczaj zmienną o współczynniku 1 lub -1.",
            "Wstawiaj całe wyrażenie w nawiasie.",
            "Zapisuj rozwiązanie jako parę liczb $(x, y)$."
          ]
        }
      },
      {
        id: "math-lesson-4-2",
        order: 2,
        title: "Układy równań liniowych: metoda przeciwnych współczynników",
        short_title: "Przeciwne współczynniki",
        badge: "Lekcja 4.2",
        archetypeCode: "ARCH-42",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Metoda przeciwnych współczynników polega na pomnożeniu jednego lub obu równań przez odpowiednie liczby całkowite tak, aby przy jednej ze zmiennych ($x$ lub $y$) powstały liczby przeciwne (np. $3x$ i $-3x$). Po dodaniu równań stronami zmienna ta ulega natychmiastowej redukcji.",
          matura_context: "CKE Formuła 2023 • Zadanie 5–8 w arkuszu • Waga: 1–2 pkt.",
          plain_polish: "Z polskiego na nasze: Jeśli w pierwszym równaniu masz $+2y$, a w drugim $-2y$, to dodajesz równania do siebie pionowo: iksy do iksów, igreki do igreków, liczby do liczb. Igreki kasują się do zera ($2y + (-2y) = 0$) i od razu dostajesz wynik dla $x$!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wybierz zmienną do eliminacji",
              description: "Zdecyduj, czy łatwiej zredukować $x$ czy $y$.",
              tip: "Szukaj zmiennych, które już mają przeciwne znaki."
            },
            {
              stepNumber: 2,
              title: "Przemnóż równania",
              description: "Pomnóż jedno lub oba równania przez liczby tak, aby współczynniki były przeciwne (np. $+6$ i $-6$).",
              tip: "Pamiętaj o pomnożeniu prawej strony równania!"
            },
            {
              stepNumber: 3,
              title: "Dodaj równania stronami",
              description: "Zsumuj równania pionowo: zmienna o przeciwnych współczynnikach znika.",
              tip: "Otrzymujesz proste równanie z jedną niewiadomą."
            },
            {
              stepNumber: 4,
              title: "Oblicz drugą zmienną",
              description: "Podstaw wyliczoną wartość do dowolnego równania początkowego.",
              tip: "Wybierz równanie o mniejszych liczbach, by uniknąć pomyłki."
            }
          ],
          core_formulas: [
            {
              name: "Redukcja przeciwnych współczynników",
              formula: "(Ax + By = C) + (Dx - By = E) \\implies (A+D)x = C + E"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiąż układ równań: $\\begin{cases} 3x + 2y = 12 \\\\ 2x - 3y = -5 \\end{cases}$.",
              solution: "1. Eliminujemy $y$: pierwsze równanie mnożymy przez 3, drugie przez 2:\n   $\\begin{cases} 9x + 6y = 36 \\\\ 4x - 6y = -10 \\end{cases}$.\n2. Dodajemy równania stronami:\n   $(9x + 4x) + (6y - 6y) = 36 + (-10) \\implies 13x = 26 \\implies x = 2$.\n3. Podstawiamy $x = 2$ do pierwszego równania: $3(2) + 2y = 12 \\implies 6 + 2y = 12 \\implies 2y = 6 \\implies y = 3$.\n4. Odpowiedź: $x = 2, y = 3$.",
              keyInsight: "Mnożenie przez 3 i 2 dało przy $y$ idealne współczynniki $+6$ i $-6$."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "2 pkt",
              problem: "Rozwiąż układ równań: $\\begin{cases} 2x - 4y = 6 \\\\ -x + 2y = -3 \\end{cases}$.",
              solution: "1. Mnożymy drugie równanie przez 2:\n   $\\begin{cases} 2x - 4y = 6 \\\\ -2x + 4y = -6 \\end{cases}$.\n2. Dodajemy stronami:\n   $0x + 0y = 0 \\implies 0 = 0$.\n3. Tożsamość $0 = 0$ oznacza, że układ ma nieskończenie wiele rozwiązań (układ nieoznaczony).\n4. Rozwiązaniem są wszystkie pary $(x, y)$ leżące na prostej $x - 2y = 3$.",
              keyInsight: "Tożsamość $0 = 0$ to nieskończenie wiele rozwiązań. Sprzeczność $0 = 5$ to brak rozwiązań."
            }
          ],
          trap_details: {
            fail: "Błąd: Zapomnienie o pomnożeniu prawej strony równania (np. pomnożenie tylko $2x - 3y$, a zostawienie $-5$).",
            win: "Poprawnie: Mnożymy każdy składnik: $2x \\cdot 2 - 3y \\cdot 2 = -5 \\cdot 2 = -10$.",
            explanation: "Mnożenie równania oznacza pomnożenie obu jego stron przez tę samą liczbę.",
            ckeTip: "Zapisuj mnożnik za pionową kreską: $\\dots \\quad | \\cdot 2$."
          },
          exam_trap: "Zawsze mnóż CAŁE równanie, łącznie z wyrazem wolnym po prawej stronie!",
          key_points: [
            "Metoda przeciwnych współczynników jest najszybsza przy dużych liczbach.",
            "$0 = 0$ to układ tożsamościowy (nieskończenie wiele rozwiązań).",
            "$0 = k$ (gdzie $k \\neq 0$) to układ sprzeczny (brak rozwiązań)."
          ]
        }
      },
      {
        id: "math-lesson-4-3",
        order: 3,
        title: "Interpretacja geometryczna układu równań",
        short_title: "Interpretacja geometryczna",
        badge: "Lekcja 4.3",
        archetypeCode: "ARCH-43",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Każde równanie liniowe $Ax + By = C$ reprezentuje prostą na płaszczyźnie kartezjańskiej. Rozwiązanie układu równań to **punkt przecięcia tych dwóch prostych** $P = (x_0, y_0)$. Układ ma: 1 rozwiązanie gdy proste się przecinają ($a_1 \\neq a_2$), brak rozwiązań gdy proste są równoległe i różne ($a_1 = a_2, b_1 \\neq b_2$), nieskończenie wiele rozwiązań gdy proste się pokrywają ($a_1 = a_2, b_1 = b_2$).",
          matura_context: "CKE Formuła 2023 • Zadanie 6–9 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Układ równań to po prostu dwie linie narysowane na kartce w kratkę. Jeśli linie się przecinają, to miejsce ich spotkania $(x, y)$ jest jedynym rozwiązaniem. Jeśli linie biegną równolegle jak tory kolejowe, nigdy się nie spotkają (brak rozwiązań). Jeśli narysujesz jedną linię dokładnie na drugiej, pokrywają się w każdym punkcie (nieskończenie wiele rozwiązań).",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Przekształć równania do postaci kierunkowej",
              description: "Wyznacz $y$ z każdego równania: $y = a_1 x + b_1$ oraz $y = a_2 x + b_2$.",
              tip: "Postać $y = ax + b$ pozwala od razu odczytać nachylenie $a$."
            },
            {
              stepNumber: 2,
              title: "Porównaj współczynniki kierunkowe a1 i a2",
              description: "Jeśli $a_1 \\neq a_2$, proste przecinają się w dokładnie jednym punkcie.",
              tip: "Układ jest wtedy oznaczony."
            },
            {
              stepNumber: 3,
              title: "Sprawdź wyrazy wolne b1 i b2 przy równoległości",
              description: "Gdy $a_1 = a_2$: jeśli $b_1 \\neq b_2$ to proste są równoległe (brak rozwiązań). Jeśli $b_1 = b_2$ proste pokrywają się (nieskończenie wiele).",
              tip: "Równoległość to to samo nachylenie $a_1 = a_2$."
            }
          ],
          core_formulas: [
            {
              name: "Warunek 1 rozwiązania (proste przecinające się)",
              formula: "a_1 \\neq a_2 \\iff 1 \\text{ punkt wspólny } (x_0, y_0)"
            },
            {
              name: "Warunek braku rozwiązań (proste równoległe)",
              formula: "a_1 = a_2 \\quad \\wedge \\quad b_1 \\neq b_2 \\iff \\text{brak rozwiązań (sprzeczny)}"
            },
            {
              name: "Warunek nieskończenie wielu rozwiązań",
              formula: "a_1 = a_2 \\quad \\wedge \\quad b_1 = b_2 \\iff \\text{proste pokrywające się}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Punkt $P = (2, -1)$ jest punktem przecięcia prostych o równaniach $2x + y = 3$ oraz $ax - 3y = 7$. Oblicz wartość współczynnika $a$.",
              solution: "1. Skoro punkt $P(2, -1)$ jest punktem wspólnym, jego współrzędne spełniają oba równania.\n2. Wstawiamy $x = 2$ i $y = -1$ do drugiego równania:\n   $a(2) - 3(-1) = 7$.\n3. $2a + 3 = 7 \\implies 2a = 4 \\implies a = 2$.\n4. Odpowiedź: $a = 2$.",
              keyInsight: "Punkt przecięcia prostych zawsze podstawiasz bezpośrednio w miejsce $(x, y)$."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "1 pkt",
              problem: "Wskaż układ równań, którego graficzną ilustracją są dwie proste równoległe niemające punktów wspólnych.",
              solution: "1. Proste równoległe rozłączne muszą mieć ten sam współczynnik kierunkowy $a$ i różne wyrazy wolne $b$.\n2. Rozważmy układ: $\\begin{cases} y = 2x - 4 \\\\ 2x - y = 5 \\end{cases}$.\n3. Przekształcamy drugie równanie: $y = 2x - 5$.\n4. Obie proste mają $a = 2$, a ich wyrazy wolne to $b_1 = -4$ oraz $b_2 = -5$.\n5. Proste są równoległe i nie mają punktów wspólnych.",
              keyInsight: "Identyczne lewe strony $2x - y$ przy różnych prawych stronach to gwarancja równoległości."
            }
          ],
          trap_details: {
            fail: "Błąd: Twierdzenie, że układ nie ma rozwiązań, bo $x = 0$ i $y = 0$.",
            win: "Poprawnie: Para $(0, 0)$ to konkretny punkt (początek układu współrzędnych) i normalne rozwiązanie!",
            explanation: "Brak rozwiązań oznacza sprzeczność algebraiczną ($0 = 7$), a nie punkt o współrzędnych zero.",
            ckeTip: "Punkt $(0,0)$ to pełnoprawne rozwiązanie – proste przecinają się w początku układu."
          },
          exam_trap: "Nie myl punktu $(0,0)$ z brakiem rozwiązań! $(0,0)$ to normalny punkt przecięcia.",
          key_points: [
            "Rozwiązanie układu to punkt przecięcia prostych na wykresie.",
            "Równoległe proste ($a_1 = a_2$) oznaczają brak rozwiązań.",
            "Gdy proste się pokrywają, rozwiązań jest nieskończenie wiele."
          ]
        }
      },
      {
        id: "math-lesson-4-4",
        order: 4,
        title: "Zadania tekstowe prowadzące do układu równań",
        short_title: "Zadania tekstowe",
        badge: "Lekcja 4.4",
        archetypeCode: "ARCH-44",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Rozwiązywanie zadań tekstowych za pomocą układu równań polega na precyzyjnym zdefiniowaniu dwóch niewiadomych $x$ i $y$ wraz z ich dziedziną/jednostkami, a następnie przetłumaczeniu dwóch zdań z treści zadania na dwa niezależne równania algebraiczne.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 2–3 pkt lub zamknięte za 1 pkt.",
          plain_polish: "Z polskiego na nasze: W zadaniu tekstowym najtrudniejszy jest początek. Zawsze napisz na kartce: niech $x$ = liczba biletów ulgowych, $y$ = liczba biletów normalnych. Jeśli sprzedano łącznie 50 biletów, masz pierwsze równanie: $x + y = 50$. Jeśli ulgowy kosztuje 10 zł, normalny 20 zł, a łącznie zebrano 700 zł, masz drugie: $10x + 20y = 700$. Dalej to już czysta mechanika!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zdefiniuj zmienne x i y",
              description: "Zapisz słownie, co oznacza $x$ i co oznacza $y$, określając jednostki (np. szt., zł, kg).",
              tip: "Zazwyczaj zmienne odpowiadają pytaniu na końcu zadania."
            },
            {
              stepNumber: 2,
              title: "Ułóż pierwsze równanie (bilans ilości)",
              description: "Zapisz zależność sumaryczną, np. łączna liczba sztuk, suma lat, łączna waga: $x + y = S$.",
              tip: "Szukaj w treści słów: „łącznie”, „razem”."
            },
            {
              stepNumber: 3,
              title: "Ułóż drugie równanie (bilans wartości)",
              description: "Zapisz zależność kwotową lub proporcję, np. $c_1 x + c_2 y = K$.",
              tip: "Cena razy ilość plus cena razy ilość równa się utarg."
            },
            {
              stepNumber: 4,
              title: "Rozwiąż układ i zweryfikuj sens fizyczny",
              description: "Rozwiąż układ metodą przeciwnych współczynników i sprawdź, czy liczby nie wyszły ujemne lub ułamkowe.",
              tip: "Liczba ludzi czy biletów musi być liczbą naturalną!"
            }
          ],
          core_formulas: [
            {
              name: "Klasyczny bilans wartościowy",
              formula: "\\begin{cases} x + y = N \\\\ c_1 \\cdot x + c_2 \\cdot y = W \\end{cases}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "2 pkt",
              problem: "W kinie sprzedano 120 biletów na seans filmowy: ulgowe po 16 zł i normalne po 24 zł. Łączny przychód wyniósł 2400 zł. Ile sprzedano biletów ulgowych?",
              solution: "1. Oznaczenia: $u$ – liczba biletów ulgowych, $n$ – liczba biletów normalnych.\n2. Równanie ilości biletów: $u + n = 120$.\n3. Równanie wartości biletów: $16u + 24n = 2400$.\n4. Z pierwszego równania $n = 120 - u$, podstawiamy:\n   $16u + 24(120 - u) = 2400$.\n5. $16u + 2880 - 24u = 2400 \\implies -8u = -480 \\implies u = 60$.\n6. Liczba biletów normalnych: $n = 120 - 60 = 60$.\n7. Odpowiedź: Sprzedano 60 biletów ulgowych.",
              keyInsight: "Podstawienie $n = 120 - u$ od razu daje równanie tylko z poszukiwaną zmienną $u$."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Zadanie o wieku)",
              points: "2 pkt",
              problem: "Ojciec jest obecnie 3 razy starszy od syna. Za 12 lat ojciec będzie już tylko 2 razy starszy od syna. Ile lat ma obecnie syn?",
              solution: "1. Oznaczenia: $s$ – obecny wiek syna, $o$ – obecny wiek ojca.\n2. Stan obecny: $o = 3s$.\n3. Za 12 lat obaj będą starsi o 12 lat: wiek ojca $o + 12$, wiek syna $s + 12$.\n4. Równanie za 12 lat: $o + 12 = 2(s + 12)$.\n5. Podstawiamy $o = 3s$:\n   $3s + 12 = 2s + 24 \\implies s = 12$.\n6. Wiek ojca: $o = 3 \\cdot 12 = 36$.\n7. Odpowiedź: Syn ma obecnie 12 lat.",
              keyInsight: "Pamiętaj o dodaniu 12 lat do wieku OBU osób: $(s + 12)$ oraz $(o + 12)$."
            }
          ],
          trap_details: {
            fail: "Błąd: W zadaniach o wieku dodanie 12 lat tylko do jednej osoby: $o + 12 = 2s$.",
            win: "Poprawnie: Czas płynie dla obu osób jednakowo: $o + 12 = 2(s + 12)$.",
            explanation: "Zapomnienie o nawiasie i upływie czasu u drugiej osoby to klasyczna pułapka CKE.",
            ckeTip: "Zawsze sporządź małą tabelkę: „Teraz” oraz „Za X lat” dla każdej osoby."
          },
          exam_trap: "W zadaniach o wieku dodawaj upływ lat do OBU osób w nawiasach: $2(s + 12)$!",
          key_points: [
            "Zdefiniuj zmienne na początku rozwiązania.",
            "Rozróżnij równanie liczby sztuk od równania wartości pieniężnej.",
            "Sprawdź sensowność wyniku (np. wiek nie może być ujemny)."
          ]
        }
      },
      {
        id: "math-lesson-4-5",
        order: 5,
        title: "Układy równań z parametrem w zadaniach CKE",
        short_title: "Układy z parametrem",
        badge: "Lekcja 4.5",
        archetypeCode: "ARCH-45",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W zadaniach z parametrem $m$ badamy liczbę rozwiązań układu w zależności od $m$. Układ jest oznaczony (1 rozwiązanie), gdy współczynniki przy $x$ i $y$ nie są proporcjonalne. Jest nieoznaczony (nieskończenie wiele rozwiązań) lub sprzeczny (0 rozwiązań), gdy współczynniki przy zmiennych są proporcjonalne.",
          matura_context: "CKE Formuła 2023 • Zadanie 6–9 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Zadanie pyta, dla jakiego $m$ układ nie ma rozwiązań? Sprawdzasz, kiedy lewe strony równań są identyczne, a prawe różne. Jeśli w pierwszym masz $2x + 4y = 5$, a w drugim $x + my = 3$, to mnożysz drugie przez 2: $2x + 2my = 6$. Żeby lewe strony były równe, musi zajść $2m = 4 \\implies m = 2$. Wtedy lewe strony to $2x+4y$, a prawe to $5$ i $6$ (sprzeczność!).",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wyrównaj współczynniki przy jednej zmiennej",
              description: "Pomnóż jedno równanie przez stałą, aby współczynniki przy $x$ były identyczne.",
              tip: "Ułatwia to bezpośrednie porównanie współczynników przy $y$."
            },
            {
              stepNumber: 2,
              title: "Przyrównaj współczynniki przy drugiej zmiennej",
              description: "Przyrównaj współczynniki przy $y$, aby wyznaczyć krytyczną wartość parametru $m$.",
              tip: "Dla tej wartości proste są równoległe."
            },
            {
              stepNumber: 3,
              title: "Zbadaj prawe strony równań",
              description: "Gdy prawe strony są różne $\\implies$ brak rozwiązań. Gdy prawe strony są równe $\\implies$ nieskończenie wiele rozwiązań.",
              tip: "Wyciągnij wniosek zgodnie z pytaniem w zadaniu CKE."
            }
          ],
          core_formulas: [
            {
              name: "Warunek proporcjonalności współczynników",
              formula: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2} \\implies \\text{układ sprzeczny (0 rozwiązań)}"
            },
            {
              name: "Warunek tożsamości",
              formula: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} \\implies \\text{układ tożsamościowy (}\\infty\\text{ rozwiązań)}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Dla jakiej wartości parametru $k$ układ równań $\\begin{cases} 2x - 3y = 4 \\\\ 6x + ky = 12 \\end{cases}$ ma nieskończenie wiele rozwiązań?",
              solution: "1. Mnożymy pierwsze równanie przez 3, aby współczynnik przy $x$ wynosił 6:\n   $\\begin{cases} 6x - 9y = 12 \\\\ 6x + ky = 12 \\end{cases}$.\n2. Zauważmy, że prawe strony są już identyczne ($12 = 12$).\n3. Aby układ miał nieskończenie wiele rozwiązań, współczynniki przy $y$ muszą być równe:\n   $k = -9$.\n4. Odpowiedź: $k = -9$.",
              keyInsight: "Identyczne lewe i prawe strony dają nieskończenie wiele rozwiązań."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "1 pkt",
              problem: "Układ równań $\\begin{cases} 3x - y = 2 \\\\ 6x - 2y = m \\end{cases}$ jest sprzeczny. Wynika stąd, że:\nA. $m = 4$  B. $m \\neq 4$  C. $m = 2$  D. $m \\neq 2$",
              solution: "1. Mnożymy pierwsze równanie przez 2: $6x - 2y = 4$.\n2. Drugie równanie to $6x - 2y = m$.\n3. Lewe strony są identyczne.\n4. Aby układ był sprzeczny, prawe strony muszą być RÓŻNE: $m \\neq 4$.\n5. Odpowiedź to B: $m \\neq 4$.",
              keyInsight: "Sprzeczność wymaga, aby $m$ NIE BYŁO równe 4."
            }
          ],
          trap_details: {
            fail: "Błąd: Zaznaczenie $m = 4$ przy pytaniu o układ sprzeczny.",
            win: "Poprawnie: Dla $m = 4$ układ ma nieskończenie wiele rozwiązań! Dla sprzeczności $m \\neq 4$.",
            explanation: "Maturzyści często automatycznie zaznaczają wyliczoną liczbę ze znakiem równości, zamiast warunku nierówności.",
            ckeTip: "Przeczytaj dwa razy: czy CKE pyta o brak rozwiązań ($m \\neq 4$), czy o nieskończenie wiele ($m = 4$)."
          },
          exam_trap: "Uważaj na pytanie o układ sprzeczny: szukasz warunku RÓŻNOŚCI prawych stron ($m \\ne k$)!",
          key_points: [
            "Układ sprzeczny: te same lewe strony, różne prawe strony ($0 = k$).",
            "Układ nieoznaczony: identyczne lewe i prawe strony ($0 = 0$).",
            "Układ oznaczony (1 rozwiązanie): różne nachylenia prostych."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-5",
    numericId: 5,
    title: "Funkcje – pojęcie, własności i odczytywanie z wykresu",
    short_title: "Własności funkcji",
    description: "Dziedzina, zbiór wartości, miejsca zerowe, odczytywanie własności z wykresu, monotoniczność, symetrie i przesunięcia wykresów.",
    icon: "TrendingUp",
    color: "#FFB800",
    matura_points_range: "4–6 pkt",
    importance: "CRITICAL_PEWNIAK",
    lessons: [
      {
        id: "math-lesson-5-1",
        order: 1,
        title: "Dziedzina i zbiór wartości funkcji z wykresu",
        short_title: "Dziedzina i zbiór wartości",
        badge: "Lekcja 5.1",
        archetypeCode: "ARCH-51",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Dziedzina funkcji $D_f$ to zbiór wszystkich argumentów $x$ (odczytywany z osi poziomej $OX$ od lewej do prawej). Zbiór wartości $ZW_f$ to zbiór wszystkich wartości $y$ (odczytywany z osi pionowej $OY$ od dołu do góry). Kropka zamalowana oznacza nawias domknięty $\\langle \\rangle$, a kropka otwarta nawias otwarty $( )$.",
          matura_context: "CKE Formuła 2023 • Zadanie 7–10 w arkuszu • Waga: 1 pkt (Żelazny pewniak maturalny).",
          plain_polish: "Z polskiego na nasze: Dziedzina to szerokość wykresu wzdłuż osi $OX$ (patrzysz, gdzie wykres zaczyna się z lewej strony i gdzie kończy z prawej). Zbiór wartości to wysokość wykresu wzdłuż osi $OY$ (patrzysz, jak nisko spada najniższy punkt i jak wysoko sięga najwyższy punkt).",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Odczytaj dziedzinę z osi OX (od lewej do prawej)",
              description: "Zrzutuj wykres na oś poziomą. Znajdź skrajny lewy $x_{min}$ i skrajny prawy $x_{max}$.",
              tip: "Zwróć uwagę na końce: kropka zamalowana = domknięty, otwarta = otwarty, strzałka = nieskończoność."
            },
            {
              stepNumber: 2,
              title: "Odczytaj zbiór wartości z osi OY (od dołu do góry)",
              description: "Zrzutuj wykres na oś pionową. Znajdź absolutne dno wykresu $y_{min}$ i najwyższy szczyt $y_{max}$.",
              tip: "Zbiór wartości ZAWSZE zapisuj od wartości mniejszej do większej: $\\langle y_{min}, y_{max} \\rangle$."
            },
            {
              stepNumber: 3,
              title: "Sprawdź punkty nieciągłości i luki",
              description: "Upewnij się, czy w środku dziedziny nie ma otwartego kółka (dziury) lub pionowej asymptoty.",
              tip: "Wyrzuć punkt nieciągłości ze zbioru: np. $\\langle -4, 5 \\rangle \\setminus \\{1\\}$."
            }
          ],
          core_formulas: [
            {
              name: "Dziedzina (oś OX)",
              formula: "D_f = \\{x \\in \\mathbb{R} : \\exists y \\in \\mathbb{R} \\text{ t. że } y = f(x)\\}"
            },
            {
              name: "Zbiór wartości (oś OY)",
              formula: "ZW_f = \\{y \\in \\mathbb{R} : \\exists x \\in D_f \\text{ t. że } f(x) = y\\}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wykres funkcji $f$ określonej na przedziale domkniętym ma najniższy punkt $P = (-3, -4)$, a najwyższy punkt $S = (2, 5)$. Lewy kraniec to kropka zamalowana w $(-5, 1)$, a prawy w $(4, 3)$. Wyznacz $D_f$ oraz $ZW_f$.",
              solution: "1. Dziedzina (oś $OX$): wykres rozciąga się od $x = -5$ do $x = 4$.\n   Oba końce są zamalowane: $D_f = \\langle -5, 4 \\rangle$.\n2. Zbiór wartości (oś $OY$): najniższa wartość to $-4$ (w punkcie $P$), a najwyższa to $5$ (w punkcie $S$).\n   Oba ekstrema są osiągane: $ZW_f = \\langle -4, 5 \\rangle$.",
              keyInsight: "Krańce zbioru wartości to najniższy i najwyższy punkt całego wykresu, a nie punkty na brzegach dziedziny!"
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "1 pkt",
              problem: "Dana jest funkcja $f(x) = \\frac{2x - 1}{x + 3}$. Wyznacz dziedzinę funkcji $f$.",
              solution: "1. Kreska ułamkowa wymaga, aby mianownik był różny od zera: $x + 3 \\neq 0$.\n2. $x \\neq -3$.\n3. Dziedzina to wszystkie liczby rzeczywiste z wyjątkiem $-3$.\n4. Zapis formalny: $D_f = \\mathbb{R} \\setminus \\{-3\\}$.",
              keyInsight: "Dziedzina z wzoru algebraicznego z ułamkiem to wykluczenie miejsc zerowych mianownika."
            }
          ],
          trap_details: {
            fail: "Błąd: Odczytywanie zbioru wartości z punktów skrajnych wykresu zamiast z globalnego minimum i maksimum.",
            win: "Poprawnie: Zbiór wartości to najniższy punkt dołek do najwyższego szczytu.",
            explanation: "Wykres może zaczynać się na wysokości $y=1$, ale w środku spadać do $y=-4$. Wtedy dołem zbioru wartości jest $-4$!",
            ckeTip: "Przyłóż linijkę poziomo i przesuwaj od dołu do góry – tam gdzie linijka po raz pierwszy dotyka wykresu, zaczyna się ZW."
          },
          exam_trap: "Nie myl dziedziny (oś OX, pozioma) ze zbiorem wartości (oś OY, pionowa)!",
          key_points: [
            "Dziedzina = szerokość na osi OX.",
            "Zbiór wartości = wysokość na osi OY (od dołu do góry).",
            "Zbiór wartości wyznaczają absolutne dołki i szczyty wykresu."
          ]
        }
      },
      {
        id: "math-lesson-5-2",
        order: 2,
        title: "Miejsca zerowe i punkty przecięcia z osiami",
        short_title: "Miejsca zerowe i osie",
        badge: "Lekcja 5.2",
        archetypeCode: "ARCH-52",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Miejsce zerowe funkcji to argument $x_0$, dla którego wartość funkcji wynosi zero ($f(x_0) = 0$). Geometrycznie jest to punkt przecięcia wykresu z osią $OX$: $(x_0, 0)$. Punkt przecięcia z osią $OY$ to punkt o współrzędnych $(0, f(0))$ – funkcja może mieć maksymalnie jeden taki punkt!",
          matura_context: "CKE Formuła 2023 • Zadanie 8–11 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Miejsce zerowe to $x$, w którym wykres przebija podłogę (oś poziomą $OX$). Z kolei punkt na osi $OY$ to punkt, w którym wykres przecina pionową ścianę. Pamiętaj: miejsce zerowe to sama liczba $x$, a punkt przecięcia to para współrzędnych $(x, 0)$!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wyznaczanie miejsc zerowych (oś OX)",
              description: "Przyrównaj wzór funkcji do zera: $f(x) = 0$ i rozwiąż równanie.",
              tip: "Z wykresu: odczytaj współrzędne $x$ punktów leżących na osi poziomej."
            },
            {
              stepNumber: 2,
              title: "Wyznaczanie punktu przecięcia z osią OY",
              description: "Wstaw $x = 0$ do wzoru funkcji i oblicz $y = f(0)$.",
              tip: "Punkt przecięcia z osią $OY$ ma zawsze postać $(0, y)$."
            },
            {
              stepNumber: 3,
              title: "Zwróć uwagę na polecenie CKE",
              description: "Jeśli CKE pyta o „miejsce zerowe”, podaj liczbę $x=3$. Jeśli pyta o „punkt”, podaj współrzędne $(3, 0)$.",
              tip: "Precyzja zapisu chroni przed stratą punktu."
            }
          ],
          core_formulas: [
            {
              name: "Warunek miejsca zerowego",
              formula: "f(x_0) = 0 \\iff P = (x_0, 0) \\in \\text{oś } OX"
            },
            {
              name: "Punkt przecięcia z osią OY",
              formula: "x = 0 \\implies P_{OY} = (0, f(0))"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wyznacz miejsce zerowe funkcji liniowej $f(x) = -\\frac{2}{3}x + 4$.",
              solution: "1. Przyrównujemy wzór do zera: $-\\frac{2}{3}x + 4 = 0$.\n2. $-\\frac{2}{3}x = -4$.\n3. Mnożymy przez odwrotność $-\\frac{3}{2}$:\n   $x = -4 \\cdot \\left(-\\frac{3}{2}\\right) = \\frac{12}{2} = 6$.\n4. Miejsce zerowe funkcji to $x = 6$.",
              keyInsight: "Punkt przecięcia z osią OX to $(6, 0)$."
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "1 pkt",
              problem: "Wykres funkcji $f(x) = 2x^2 - 8x + c$ przecina oś $OY$ w punkcie $(0, 5)$. Wyznacz miejsca zerowe funkcji $f$.",
              solution: "1. Punkt $(0, 5)$ leży na wykresie, więc $f(0) = 5 \\implies c = 5$.\n2. Wzór funkcji: $f(x) = 2x^2 - 8x + 5$.\n3. Szukamy miejsc zerowych: $2x^2 - 8x + 5 = 0$.\n4. $\\Delta = (-8)^2 - 4(2)(5) = 64 - 40 = 24$, $\\sqrt{\\Delta} = \\sqrt{24} = 2\\sqrt{6}$.\n5. $x_1 = \\frac{8 - 2\\sqrt{6}}{4} = \\frac{4 - \\sqrt{6}}{2}$, $x_2 = \\frac{4 + \\sqrt{6}}{2}$.",
              keyInsight: "Wyraz wolny $c$ w wielomianie to zawsze rzędna punktu przecięcia z osią $OY$."
            }
          ],
          trap_details: {
            fail: "Błąd: Podawanie jako miejsca zerowego punktu $(0, 4)$ zamiast $(4, 0)$.",
            win: "Poprawnie: Miejsce zerowe leży na osi OX, więc ma $y = 0$, czyli $(x_0, 0)$.",
            explanation: "Punkt $(0, 4)$ leży na osi pionowej $OY$, a nie na poziomej $OX$.",
            ckeTip: "Miejsce zerowe to $x$, dla którego $y$ jest zerem."
          },
          exam_trap: "Miejsce zerowe to liczba $x$, a nie para liczb! Nie myl punktu przecięcia z osią OX z osią OY.",
          key_points: [
            "Miejsce zerowe: $f(x) = 0$ (oś OX).",
            "Przecięcie z osią OY: podstaw $x = 0$.",
            "Funkcja ma co najwyżej jeden punkt przecięcia z osią OY."
          ]
        }
      },
      {
        id: "math-lesson-5-3",
        order: 3,
        title: "Monotoniczność i przedziały stałego znaku",
        short_title: "Monotoniczność funkcji",
        badge: "Lekcja 5.3",
        archetypeCode: "ARCH-53",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Funkcja jest rosnąca w przedziale, gdy wraz ze wzrostem argumentów rosną wartości funkcji (wykres pnie się w górę od lewej do prawej). Jest malejąca, gdy wykres opada. Przedziały stałego znaku ($f(x) > 0$ lub $f(x) < 0$) to zbiory argumentów $x$, dla których wykres znajduje się odpowiednio nad osią $OX$ lub pod osią $OX$.",
          matura_context: "CKE Formuła 2023 • Zadanie 8–11 w arkuszu • Waga: 1 pkt.",
          plain_polish: "Z polskiego na nasze: Idziesz po wykresie od lewej do prawej jak ludzik w grze platformowej. Jeśli wchodzisz pod górę – funkcja rośnie. Jeśli zjeżdżasz w dół – funkcja maleje. Jeśli idziesz po płaskim – jest stała. Pamiętaj: przedział monotoniczności ZAWSZE podajesz w iksach (argumentach), a NIE w igrekach!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Śledź wykres od lewej do prawej",
              description: "Podziel wykres na kawałki rosnące, malejące i stałe.",
              tip: "Znajdź punkty przełamania (lokalne szczyty i dołki)."
            },
            {
              stepNumber: 2,
              title: "Odczytaj przedziały z osi OX",
              description: "Zrzutuj początek i koniec każdego kawałka na oś poziomą $OX$.",
              tip: "Przedziały monotoniczności w szkole średniej zazwyczaj domykamy."
            },
            {
              stepNumber: 3,
              title: "Zwróć uwagę na przedziały znaku (f(x) > 0)",
              description: "Punkty graniczne przedziałów dodatniości i ujemności to ZAWSZE miejsca zerowe funkcji.",
              tip: "Dla $f(x) > 0$ przedziały są ZAWSZE otwarte przy miejscach zerowych!"
            }
          ],
          core_formulas: [
            {
              name: "Definicja funkcji rosnącej",
              formula: "x_1 < x_2 \\implies f(x_1) < f(x_2)"
            },
            {
              name: "Definicja funkcji malejącej",
              formula: "x_1 < x_2 \\implies f(x_1) > f(x_2)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wykres funkcji $f$ ma wierzchołek w punkcie $W = (3, 4)$ i ramiona skierowane w dół. Podaj maksymalny przedział, w którym funkcja jest rosnąca.",
              solution: "1. Ponieważ ramiona są skierowane w dół, funkcja rośnie z lewej strony aż do wierzchołka.\n2. Wierzchołek osiągany jest dla argumentu $x = 3$.\n3. Zrzutujemy na oś $OX$: funkcja rośnie od $-\\infty$ do $x = 3$.\n4. Odpowiedź: Funkcja jest rosnąca w przedziale $(-\\infty, 3\\rangle$.",
              keyInsight: "Podajemy przedział argumentów $x$ (do 3), a nie wartość wierzchołka $y=4$!"
            },
            {
              title: "Zadanie Podchwytliwe CKE",
              points: "1 pkt",
              problem: "Funkcja $f$ ma miejsca zerowe $-3$ oraz $5$. Wykres leży nad osią $OX$ dla $x \\in (-3, 5)$. Zapisz zbiór rozwiązań nierówności $f(x) \\le 0$.",
              solution: "1. Skoro nad osią ($f(x)>0$) wykres leży wewnątrz $(-3, 5)$, to pod osią i na osi ($f(x) \\le 0$) leży na zewnątrz tego przedziału.\n2. Dołączamy punkty zerowe (kropki zamalowane z uwagi na znak $\\le$).\n3. Odpowiedź: $x \\in (-\\infty, -3\\rangle \\cup \\langle 5, +\\infty)$.",
              keyInsight: "Dopełnieniem przedziału dodatniości ze znakiem $\\le 0$ są dwa przedziały domknięte na zewnątrz."
            }
          ],
          trap_details: {
            fail: "Błąd: Łączenie przedziałów monotoniczności znakiem sumy $\\cup$ (np. „funkcja rośnie w $\\langle -4, -1 \\rangle \\cup \\langle 2, 5 \\rangle$”).",
            win: "Poprawnie: Wymieniamy przedziały oddzielnie ze słowem „oraz”: rośnie w $\\langle -4, -1 \\rangle$ oraz w $\\langle 2, 5 \\rangle$.",
            explanation: "Suma przedziałów oznaczałaby, że funkcja rośnie pomiędzy punktami z różnych przedziałów, co często jest fałszem.",
            ckeTip: "W zadaniach zamkniętych CKE szukaj pojedynczego przedziału lub zapisu z przecinkiem/słowem „oraz”."
          },
          exam_trap: "Nigdy nie podawaj wartości y przy monotoniczności! Monotoniczność to zawsze przedział argumentów x.",
          key_points: [
            "Przedziały monotoniczności odczytujemy wyłącznie z osi OX.",
            "Dla $f(x) > 0$ odczytujemy iksy leżące ściśle nad osią.",
            "Maksymalne przedziały monotoniczności domykamy."
          ]
        }
      },
      {
        id: "math-lesson-5-4",
        order: 4,
        title: "Wartość największa i najmniejsza w przedziale",
        short_title: "Wartości skrajne funkcji",
        badge: "Lekcja 5.4",
        archetypeCode: "ARCH-54",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wartość największa $y_{max}$ (maksimum globalne) i najmniejsza $y_{min}$ (minimum globalne) funkcji ciągłej w przedziale domkniętym $\\langle a, b \\rangle$ może być osiągana wyłącznie w dwóch miejscach: w wierzchołkach/ekstremach leżących wewnątrz przedziału lub na brzegach przedziału ($f(a)$ lub $f(b)$).",
          matura_context: "CKE Formuła 2023 • Zadanie 9–12 w arkuszu • Waga: 1–2 pkt.",
          plain_polish: "Z polskiego na nasze: Szukasz najwyższego i najniższego punktu na ograniczonym kawałku wykresu. Zawsze sprawdzasz brzegi przedziału oraz wierzchołek paraboli (o ile wpada w ten przedział). Wybierasz po prostu największą i najmniejszą z wyliczonych liczb $y$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz współrzędną wierzchołka p",
              description: "Dla funkcji kwadratowej oblicz $p = -\\frac{b}{2a}$.",
              tip: "Sprawdź, czy $p$ należy do badanego przedziału $\\langle a, b \\rangle$!"
            },
            {
              stepNumber: 2,
              title: "Oblicz wartości na krańcach przedziału",
              description: "Podstaw lewy kraniec $f(a)$ oraz prawy kraniec $f(b)$ do wzoru funkcji.",
              tip: "Dokładnie przelicz potęgi i znaki."
            },
            {
              stepNumber: 3,
              title: "Oblicz wartość w wierzchołku q (jeśli p wpada w przedział)",
              description: "Jeśli $p \\in \\langle a, b \\rangle$, oblicz $q = f(p)$. Jeśli $p \\notin \\langle a, b \\rangle$, ignorujesz wierzchołek!",
              tip: "Dla paraboli z $a>0$ wierzchołek to minimum, dla $a<0$ to maksimum."
            },
            {
              stepNumber: 4,
              title: "Porównaj wyniki",
              description: "Spośród obliczonych wartości wybierz liczbę największą ($y_{max}$) i najmniejszą ($y_{min}$).",
              tip: "Odpowiedź to wartości $y$, a nie argumenty $x$."
            }
          ],
          core_formulas: [
            {
              name: "Współrzędna x wierzchołka",
              formula: "p = -\\frac{b}{2a}"
            },
            {
              name: "Zestaw kandydatów na ekstrema",
              formula: "y \\in \\{ f(a), f(b), f(p) \\} \\quad (\\text{gdy } p \\in \\langle a, b \\rangle)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "2 pkt",
              problem: "Wyznacz wartość najmniejszą i największą funkcji $f(x) = x^2 - 4x + 1$ w przedziale $\\langle 0, 3 \\rangle$.",
              solution: "1. Obliczamy współrzędną $p$: $p = -\\frac{-4}{2(1)} = \\frac{4}{2} = 2$.\n2. Sprawdzamy, czy $p \\in \\langle 0, 3 \\rangle$: liczba $2$ leży w przedziale $\\langle 0, 3 \\rangle$.\n3. Obliczamy wartości w 3 kluczowych punktach:\n   - Wierzchołek: $f(2) = 2^2 - 4(2) + 1 = 4 - 8 + 1 = -3$.\n   - Lewy brzeg: $f(0) = 0 - 0 + 1 = 1$.\n   - Prawy brzeg: $f(3) = 3^2 - 4(3) + 1 = 9 - 12 + 1 = -2$.\n4. Porównujemy: $-3, 1, -2$.\n5. Wartość najmniejsza: $y_{min} = -3$ (dla $x = 2$).\n   Wartość największa: $y_{max} = 1$ (dla $x = 0$).",
              keyInsight: "Ponieważ $p=2$ leży w przedziale, to wierzchołek jest wartością najmniejszą."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Wierzchołek poza przedziałem)",
              points: "2 pkt",
              problem: "Wyznacz wartość największą funkcji $f(x) = -x^2 + 2x + 3$ w przedziale $\\langle 2, 5 \\rangle$.",
              solution: "1. Obliczamy $p$: $p = -\\frac{2}{2(-1)} = 1$.\n2. Sprawdzamy przynależność: $1 \\notin \\langle 2, 5 \\rangle$! Wierzchołek leży poza badanym przedziałem!\n3. Funkcja w całym przedziale $\\langle 2, 5 \\rangle$ jest malejąca (bo leży na prawo od wierzchołka $p=1$ dla paraboli z ramionami w dół).\n4. Zatem wartość największa musi być na lewym brzegu przedziału: dla $x = 2$.\n5. $f(2) = -(2)^2 + 2(2) + 3 = -4 + 4 + 3 = 3$.\n6. Wartość największa to $y_{max} = 3$.",
              keyInsight: "Gdy wierzchołek nie leży w przedziale, nie bierzesz go pod uwagę!"
            }
          ],
          trap_details: {
            fail: "Błąd: Przyjmowanie wartości w wierzchołku jako minimum/maksimum w przedziale, gdy $p$ leży POZA tym przedziałem.",
            win: "Poprawnie: Zawsze najpierw sprawdź warunek $p \\in \\langle a, b \\rangle$.",
            explanation: "Jeśli wierzchołek leży poza przedziałem, funkcja jest w tym przedziale ściśle monotoniczna i ekstrema leżą wyłącznie na brzegach.",
            ckeTip: "Narysuj oś: zaznacz badany przedział i sprawdź, czy liczba $p$ wpada do środka."
          },
          exam_trap: "Zawsze najpierw sprawdź, czy wierzchołek p leży w podanym przedziale!",
          key_points: [
            "Oblicz $p = -\\frac{b}{2a}$ i sprawdź czy $p \\in \\langle a, b \\rangle$.",
            "Oblicz wartości na obu brzegach $f(a)$ i $f(b)$.",
            "Wartość to $y$, argument to $x$."
          ]
        }
      },
      {
        id: "math-lesson-5-5",
        order: 5,
        title: "Przekształcenia wykresów: translacja i symetrie",
        short_title: "Przekształcenia wykresów",
        badge: "Lekcja 5.5",
        archetypeCode: "ARCH-55",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Przesunięcie wykresu funkcji $y=f(x)$ o wektor $\\vec{v} = [p, q]$ daje funkcję $y = f(x - p) + q$. Liczba $p$ wewnątrz nawiasu przesuwa wykres w poziomie z ODWROTNYM znakiem (w prawo dla $p>0$, w lewo dla $p<0$). Liczba $q$ za nawiasem przesuwa w pionie z TYM SAMYM znakiem (w górę dla $q>0$, w dół dla $q<0$). Symetria względem osi $OX$ to $-f(x)$, a względem osi $OY$ to $f(-x)$.",
          matura_context: "CKE Formuła 2023 • Zadanie 9–13 w arkuszu • Waga: 1 pkt (Pewniak testowy).",
          plain_polish: "Z polskiego na nasze: Wewnątrz nawiasu wszystko działa na opak: $f(x - 3)$ to przesunięcie o 3 w PRAWO, a $f(x + 5)$ to o 5 w LEWO. Za nawiasem wszystko działa normalnie: $+4$ to 4 w GÓRĘ, a $-2$ to 2 w DÓŁ. Minus przed całą funkcją $-f(x)$ odbija wykres do góry nogami (jak w lustrze w jeziorze).",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj wektor przesunięcia [p, q]",
              description: "Odczytaj $p$ z wnętrza nawiasu $(x - p)$ pamiętając o odwróceniu znaku. Odczytaj $q$ z liczby za nawiasem.",
              tip: "Wzór ogólny: $y = f(x - p) + q$."
            },
            {
              stepNumber: 2,
              title: "Określ kierunek przesunięcia punktów",
              description: "Każdy punkt $(x, y)$ przechodzi na punkt $(x + p, y + q)$.",
              tip: "Przesuń charakterystyczne punkty (np. wierzchołek, punkty przecięcia)."
            },
            {
              stepNumber: 3,
              title: "Zastosuj symetrię, jeśli występuje minus",
              description: "$-f(x)$: zmień znak igreków na przeciwny (odbicie OX). $f(-x)$: zmień znak iksów (odbicie OY).",
              tip: "$-f(x)$ odwraca parabolę z ramionami w dół."
            }
          ],
          core_formulas: [
            {
              name: "Translacja o wektor [p, q]",
              formula: "y = f(x - p) + q \\implies \\vec{v} = [p, q]"
            },
            {
              name: "Symetria osiowa względem OX",
              formula: "y = -f(x) \\implies (x, y) \\to (x, -y)"
            },
            {
              name: "Symetria osiowa względem OY",
              formula: "y = f(-x) \\implies (x, y) \\to (-x, y)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wykres funkcji $g(x)$ otrzymano przez przesunięcie wykresu funkcji $f(x) = x^2$ o 3 jednostki w prawo i 2 jednostki w dół. Podaj wzór funkcji $g(x)$.",
              solution: "1. Wektor przesunięcia: w prawo o 3 oznacza $p = 3$. W dół o 2 oznacza $q = -2$.\n2. Wektor $\\vec{v} = [3, -2]$.\n3. Wstawiamy do wzoru $y = f(x - p) + q$:\n   $g(x) = (x - 3)^2 - 2$.\n4. Odpowiedź: $g(x) = (x - 3)^2 - 2$.",
              keyInsight: "Przesunięcie w prawo oznacza minus w nawiasie: $(x - 3)$."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Odczyt wektora z wykresu)",
              points: "1 pkt",
              problem: "Wierzchołek paraboli $f(x)$ znajduje się w punkcie $W_1 = (-2, 1)$. Po przesunięciu o wektor $\\vec{v}$ otrzymano parabolę o wierzchołku $W_2 = (3, -4)$. Wskaż wektor $\\vec{v}$.",
              solution: "1. Współrzędne wektora przesunięcia punktu $A$ do punktu $B$ to $\\vec{v} = [x_B - x_A, y_B - y_A]$.\n2. $p = 3 - (-2) = 3 + 2 = 5$.\n3. $q = -4 - 1 = -5$.\n4. Wektor przesunięcia to $\\vec{v} = [5, -5]$.",
              keyInsight: "Wektor przesunięcia to współrzędne końca minus współrzędne początku."
            }
          ],
          trap_details: {
            fail: "Błąd: Uznanie, że $f(x + 4)$ przesuwa wykres o 4 w prawo.",
            win: "Poprawnie: Znak plus w nawiasie oznacza przesunięcie w LEWO (o wektor $[-4, 0]$).",
            explanation: "Dla $x+4=0$ otrzymujemy $x=-4$, więc punkt zerowy przesuwa się w ujemną stronę osi.",
            ckeTip: "W nawiasie zawsze odwracaj znak: plus to lewo, minus to prawo."
          },
          exam_trap: "Znak w nawiasie działa odwrotnie: f(x + 2) to przesunięcie w LEWO, a nie w prawo!",
          key_points: [
            "Wewnątrz nawiasu $(x-p)$ odwracamy znak: minus to prawo, plus to lewo.",
            "Poza nawiasem $+q$ znak jest zachowany: plus to góra, minus to dół.",
            "Symetria względem OX: przed całą funkcją pojawia się minus."
          ]
        }
      }
    ]
  }
];
