import { MathTopicBlueprint } from '../mathBlueprintTypes';

export const DZIAL_6_TO_10: MathTopicBlueprint[] = [
  {
    id: "dzial-6",
    numericId: 6,
    title: "Funkcja liniowa i jej zastosowania",
    short_title: "Funkcja liniowa",
    description: "Współczynnik kierunkowy a, wyraz wolny b, warunki równoległości i prostopadłości, wyznaczanie wzoru prostej oraz miejsca zerowe.",
    icon: "FunctionSquare",
    color: "#FFB800",
    matura_points_range: "3–5 pkt",
    importance: "CRITICAL_PEWNIAK",
    lessons: [
      {
        id: "math-lesson-6-1",
        order: 1,
        title: "Współczynnik kierunkowy a i wyraz wolny b",
        short_title: "Współczynniki a i b",
        badge: "Lekcja 6.1",
        archetypeCode: "ARCH-61",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wzór ogólny funkcji liniowej to $f(x) = ax + b$. Współczynnik $a$ (kierunkowy) decyduje o monotoniczności ($a>0$ rosnąca, $a<0$ malejąca, $a=0$ stała) oraz o nachyleniu prostej do osi $OX$, gdzie $a = \\operatorname{tg}\\alpha$. Wyraz wolny $b$ wskazuje dokładny punkt przecięcia wykresu z osią pionową $OY$, czyli punkt $(0, b)$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Żelazny pewniak: odczytanie znaków a i b z wykresu.",
          plain_polish: "Z polskiego na nasze: Parametr $a$ to „winda” – jeśli $a>0$, idziesz pod górę (prosta rośnie), jeśli $a<0$, zjeżdżasz w dół. Parametr $b$ to miejsce lądowania na osi $OY$: jeśli prosta przecina pionową oś powyżej zera, to $b>0$, jeśli poniżej, to $b<0$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Określ monotoniczność (znak a)",
              description: "Spójrz na wykres od lewej do prawej. Jeśli prosta pnie się w górę: $a > 0$. Jeśli opada w dół: $a < 0$. Jeśli jest pozioma: $a = 0$.",
              tip: "Wyobraź sobie, że idziesz po prostej od lewej do prawej strony arkusza."
            },
            {
              stepNumber: 2,
              title: "Zlokalizuj przecięcie z osią OY (znak b)",
              description: "Znajdź punkt, w którym prosta przecina pionową oś $OY$. Współrzędne tego punktu to $(0, b)$.",
              tip: "Nigdy nie myl przecięcia z osią OY (to b) z miejscem zerowym na osi OX!"
            },
            {
              stepNumber: 3,
              title: "Połącz znaki i wskaż odpowiedź",
              description: "Zestaw koniunkcję warunków, np. $a < 0$ oraz $b > 0$, i dopasuj do podanych wariantów A–D.",
              tip: "Uważaj na zadania z parametrem $m$, gdzie $a = 2m - 4$ – rozwiąż wtedy prostą nierówność."
            }
          ],
          core_formulas: [
            {
              name: "Postać kierunkowa prostej",
              formula: "y = ax + b"
            },
            {
              name: "Współczynnik kierunkowy a tangensem kąta",
              formula: "a = \\operatorname{tg}\\alpha \\quad (\\alpha \\text{ to kąt z dodatnią półosią } OX)"
            },
            {
              name: "Punkt przecięcia z osią OY",
              formula: "P = (0, b)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Funkcja liniowa $f(x) = (3 - 2m)x + 5$ jest malejąca w zbiorze liczb rzeczywistych. Wskaż zbiór wszystkich wartości parametru $m$.",
              solution: "1. Warunek funkcji malejącej to ujemny współczynnik kierunkowy: $a < 0$.\n2. W naszym wzorze $a = 3 - 2m$.\n3. Zapisujemy nierówność: $3 - 2m < 0 \\implies -2m < -3$.\n4. Dzielimy obustronnie przez $-2$ ze zmianą znaku: $m > \\frac{3}{2}$.\nOdpowiedź: $m \\in \\left(\\frac{3}{2}, +\\infty\\right)$.",
              keyInsight: "Monotoniczność zależy wyłącznie od współczynnika stojącego przy x (czyli całego nawiasu)."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Odczyt z wykresu)",
              points: "1 pkt",
              problem: "Wykres funkcji liniowej $f$ przechodzi przez II, III i IV ćwiartkę układu współrzędnych. Jakie znaki mają współczynniki $a$ i $b$?",
              solution: "1. Skoro prosta przechodzi przez II, III i IV ćwiartkę (omija I ćwiartkę), to nie może rosnąć, bo rosnąca prosta zawsze wejdzie do I ćwiartki. Zatem funkcja maleje: $a < 0$.\n2. Na osi $OY$ (granica między II/III a I/IV) prosta musi przecinać oś poniżej zera (w ujemnych $y$), bo gdyby przecięła powyżej, zahaczyłaby o I ćwiartkę. Zatem $b < 0$.\nOdpowiedź: $a < 0$ oraz $b < 0$.",
              keyInsight: "Szybki szkic w brudnopisie natychmiast ujawnia położenie prostej względem osi."
            }
          ],
          trap_details: {
            fail: "Błąd: Utożsamianie wyrazu wolnego b z miejscem zerowym funkcji na osi OX.",
            win: "Poprawnie: Wyraz wolny b to ZAWSZE przecięcie z pionową osią OY: (0, b). Przecięcie z poziomą osią OX to x_0 = -b/a.",
            explanation: "Uczniowie często widzą liczbę przecinającą oś OX i myślą, że to współczynnik b. Wzór na przecięcie z osią OX wymaga przyrównania y = 0.",
            ckeTip: "Zapamiętaj: litera 'b' leży na pionowej osi OY. Miejsce zerowe leży na osi OX."
          },
          exam_trap: "Najczęstszy błąd CKE: mylenie przecięcia z osią OY (wyraz wolny b) z miejscem zerowym na osi OX!",
          key_points: [
            "$a > 0$ prosta rośnie, $a < 0$ prosta maleje, $a = 0$ funkcja stała.",
            "Punkt przecięcia z osią $OY$ ma zawsze współrzędne $(0, b)$.",
            "Dla kąta rozwartego nachylenia do osi $OX$, $a < 0$, bo $\\operatorname{tg}\\alpha < 0$ w II ćwiartce."
          ]
        }
      },
      {
        id: "math-lesson-6-2",
        order: 2,
        title: "Wyznaczanie wzoru prostej przez dwa punkty",
        short_title: "Prosta przez dwa punkty",
        badge: "Lekcja 6.2",
        archetypeCode: "ARCH-62",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Przez dowolne dwa różne punkty $A=(x_A, y_A)$ i $B=(x_B, y_B)$ (gdzie $x_A \\neq x_B$) przechodzi dokładnie jedna prosta o równaniu $y = ax + b$. Współczynnik kierunkowy to iloraz przyrostów: $a = \\frac{y_B - y_A}{x_B - x_A}$. Mając $a$, wyraz wolny $b$ wyznacza się przez podstawienie współrzędnych dowolnego z punktów do wzoru $y = ax + b$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Podstawa geometrii analitycznej.",
          plain_polish: "Z polskiego na nasze: Współczynnik $a$ to „pion przez poziom” – różnica wysokości ($y_B - y_A$) podzielona przez różnicę odległości poziomej ($x_B - x_A$). Potem bierzesz jeden punkt, wstawiasz do wzoru i wyliczasz $b$. Zero magii, 4 linijki w brudnopisie.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz współczynnik kierunkowy a",
              description: "Podstaw współrzędne do ułamka: $a = \\frac{y_B - y_A}{x_B - x_A}$. Uważaj na podwójne minusy!",
              tip: "Zawsze odejmuj w tej samej kolejności: B od A na górze i na dole."
            },
            {
              stepNumber: 2,
              title: "Wstaw współrzędne jednego punktu",
              description: "Wybierz punkt o prostszych liczbach (np. dodatnich) i wstaw jego $x$ i $y$ do równania $y = ax + b$.",
              tip: "Wstawienie punktu A lub B da dokładnie tę samą wartość b."
            },
            {
              stepNumber: 3,
              title: "Rozwiąż równanie z niewiadomą b",
              description: "Oblicz iloczyn $a \\cdot x$, przenieś na drugą stronę i wyznacz $b = y - ax$.",
              tip: "Zapisz gotowy wzór w postaci $y = ax + b$."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na współczynnik kierunkowy przez 2 punkty",
              formula: "a = \\frac{y_B - y_A}{x_B - x_A} \\quad (x_A \\neq x_B)"
            },
            {
              name: "Równanie prostej przechodzącej przez A i B",
              formula: "y - y_A = \\frac{y_B - y_A}{x_B - x_A}(x - x_A)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wyznacz równanie prostej przechodzącej przez punkty $A = (-2, 5)$ oraz $B = (4, -1)$.",
              solution: "1. Obliczamy współczynnik $a$:\n$$a = \\frac{-1 - 5}{4 - (-2)} = \\frac{-6}{4 + 2} = \\frac{-6}{6} = -1$$\n2. Wstawiamy $a = -1$ oraz punkt $B(4, -1)$ do wzoru $y = ax + b$:\n$$-1 = (-1) \\cdot 4 + b \\implies -1 = -4 + b \\implies b = 3$$\n3. Równanie prostej to $y = -x + 3$.",
              keyInsight: "Minus przed nawiasem w mianowniku zamienia się w plus: $4 - (-2) = 4 + 2 = 6$."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Pionowa prosta)",
              points: "1 pkt",
              problem: "Punkty $K = (3, -7)$ oraz $L = (3, 5)$ leżą na prostej $k$. Wskaż równanie tej prostej.",
              solution: "1. Zauważamy, że odcięte obu punktów są identyczne: $x_K = 3$ oraz $x_L = 3$.\n2. W mianowniku wzoru na $a$ otrzymalibyśmy $x_L - x_K = 3 - 3 = 0$ (dzielenie przez zero!).\n3. Oznacza to, że prosta jest pionowa i nie jest wykresem funkcji liniowej w postaci kierunkowej.\n4. Jej równanie ma postać $x = 3$.",
              keyInsight: "Gdy punkty mają ten sam x, równaniem prostej jest po prostu x = stała."
            }
          ],
          trap_details: {
            fail: "Błąd: Zmiana kolejności odejmowania: na górze y_B - y_A, a na dole x_A - x_B, co odwraca znak a.",
            win: "Poprawnie: Zachowaj ścisłą konsekwencję: jeśli w liczniku odejmujesz A od B, w mianowniku również odejmij A od B.",
            explanation: "Obrócenie kolejności w mianowniku daje fałszywy znak przeciwny współczynnika kierunkowego.",
            ckeTip: "Narysuj układ i punkty na marginesie: jeśli punkt B leży niżej i bardziej w prawo niż A, prosta musi opadać (a < 0)."
          },
          exam_trap: "Pomyłka znaków przy odejmowaniu liczb ujemnych w mianowniku, np. $2 - (-3) = -1$ zamiast $5$!",
          key_points: [
            "$a = \\frac{y_B - y_A}{x_B - x_A}$ to podstawa wyznaczania kierunku prostej.",
            "Jeśli $x_A = x_B$, prosta jest pionowa: $x = x_A$ (brak postaci kierunkowej).",
            "Jeśli $y_A = y_B$, prosta jest pozioma: $y = y_A$ (współczynnik $a = 0$)."
          ]
        }
      },
      {
        id: "math-lesson-6-3",
        order: 3,
        title: "Warunek równoległości i prostopadłości prostych",
        short_title: "Równoległość i prostopadłość",
        badge: "Lekcja 6.3",
        archetypeCode: "ARCH-63",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Dwie proste w postaci kierunkowej $y = a_1 x + b_1$ oraz $y = a_2 x + b_2$ są: 1) równoległe ($k \\parallel l$) wtedy i tylko wtedy, gdy ich współczynniki kierunkowe są równe: $a_1 = a_2$; 2) prostopadłe ($k \\perp l$) wtedy i tylko wtedy, gdy iloczyn współczynników wynosi $-1$, czyli $a_1 \\cdot a_2 = -1$ ($a_2 = -\\frac{1}{a_1}$, tzw. liczba przeciwna i odwrotna).",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Występuje niemal na każdym egzaminie maturalnym.",
          plain_polish: "Z polskiego na nasze: Równoległe mają TEN SAM bieg ($a_1 = a_2$). Prostopadłe tworzą kąt prosty – żeby zrobić prostopadłą, odwróć ułamek do góry nogami i ZMIEŃ ZNAK na przeciwny. Np. dla $a = \\frac{2}{3}$ prostopadły to $a_\\perp = -\\frac{3}{2}$. Dla $a = -4$ prostopadły to $a_\\perp = \\frac{1}{4}$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Doprowadź proste do postaci kierunkowej",
              description: "Upewnij się, że po lewej stronie równania stoi samo $y$. Jeśli masz postać ogólną $Ax + By + C = 0$, wyznacz najpierw $y$.",
              tip: "Nie bierz współczynnika A z postaci ogólnej bezpośrednio jako a!"
            },
            {
              stepNumber: 2,
              title: "Zastosuj właściwy warunek",
              description: "Dla prostych równoległych przyrównaj: $a_1 = a_2$. Dla prostopadłych ułóż równanie: $a_1 \\cdot a_2 = -1$.",
              tip: "Dla prostopadłej najszybciej: weź odwrotność ze zmienionym znakiem."
            },
            {
              stepNumber: 3,
              title: "Wyznacz szukaną prostą przez punkt",
              description: "Mając nowe $a$, podstaw współrzędne zadanego punktu $(x_0, y_0)$, aby wyliczyć nowy wyraz wolny $b$.",
              tip: "Sprawdź, czy pytanie dotyczy wzoru prostej, czy wartości parametru m."
            }
          ],
          core_formulas: [
            {
              name: "Warunek równoległości prostych",
              formula: "k \\parallel l \\iff a_1 = a_2"
            },
            {
              name: "Warunek prostopadłości prostych",
              formula: "k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Proste o równaniach $y = (2m - 1)x + 4$ oraz $y = (m + 3)x - 2$ są równoległe. Oblicz $m$.",
              solution: "1. Warunek równoległości: $a_1 = a_2$.\n2. Przyrównujemy współczynniki kierunkowe: $2m - 1 = m + 3$.\n3. Przenosimy niewiadome na lewą stronę: $2m - m = 3 + 1 \\implies m = 4$.\nOdpowiedź: $m = 4$.",
              keyInsight: "Wyrazy wolne (4 i -2) nie mają żadnego wpływu na równoległość."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Prosta prostopadła przez punkt)",
              points: "1 pkt",
              problem: "Wyznacz równanie prostej prostopadłej do prostej $l: y = -\\frac{3}{4}x + 2$ i przechodzącej przez punkt $P = (6, -1)$.",
              solution: "1. Współczynnik prostej wyjściowej: $a_1 = -\\frac{3}{4}$.\n2. Współczynnik prostej prostopadłej: $a_2 = -\\frac{1}{a_1} = -\\left(-\\frac{4}{3}\\right) = \\frac{4}{3}$.\n3. Wstawiamy punkt $P(6, -1)$ do postaci $y = \\frac{4}{3}x + b$:\n$$-1 = \\frac{4}{3} \\cdot 6 + b \\implies -1 = 4 \\cdot 2 + b \\implies -1 = 8 + b \\implies b = -9$$\n4. Szukana prosta ma równanie $y = \\frac{4}{3}x - 9$.",
              keyInsight: "Pamiętaj o dwóch krokach: odwrócenie ułamka ORAZ zmiana znaku na plus."
            }
          ],
          trap_details: {
            fail: "Błąd: Przy prostopadłości branie tylko liczby przeciwnej (-a) lub tylko odwrotnej (1/a).",
            win: "Poprawnie: Prostopadłość wymaga OBU zmian naraz: przeciwnej I odwrotnej (-1/a).",
            explanation: "Iloczyn musi dawać -1. Np. dla a = 2 liczba prostopadła to -1/2, a nie -2 i nie +1/2.",
            ckeTip: "Pomnóż swój wynik przez współczynnik wyjściowy w pamięci: iloczyn MUSI dać dokładnie -1."
          },
          exam_trap: "Mylenie warunku prostopadłości z równoległością w zadaniach z parametrem $m$!",
          key_points: [
            "$k \\parallel l \\iff a_1 = a_2$ (nachylenie identyczne).",
            "$k \\perp l \\iff a_1 \\cdot a_2 = -1$ (przeciwny i odwrotny kierunek).",
            "W postaci ogólnej $Ax + By + C = 0$ proste prostopadłe to $A_1 A_2 + B_1 B_2 = 0$."
          ]
        }
      },
      {
        id: "math-lesson-6-4",
        order: 4,
        title: "Miejsce zerowe funkcji liniowej i nierówności",
        short_title: "Miejsce zerowe i nierówności",
        badge: "Lekcja 6.4",
        archetypeCode: "ARCH-64",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Miejscem zerowym funkcji $f(x) = ax + b$ jest taka wartość argumentu $x$, dla której $f(x) = 0$. Przy $a \\neq 0$ rozwiązaniem równania $ax + b = 0$ jest zawsze $x_0 = -\\frac{b}{a}$. Geometrycznie jest to pierwsza współrzędna punktu przecięcia wykresu z poziomą osią $OX$: $\\left(-\\frac{b}{a}, 0\\right)$. Nierówność $ax + b > 0$ oznacza zbiór argumentów, dla których wykres leży powyżej osi $OX$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Testuje odwracanie znaku nierówności przy ujemnym a.",
          plain_polish: "Z polskiego na nasze: Żeby znaleźć miejsce zerowe, podstawiasz $0$ zamiast $y$ (czyli zamiast $f(x)$) i rozwiązujesz proste równanie ze szkoły podstawowej. Gdy rozwiązujesz nierówność i dzielisz przez ujemne $a$, PAMIĘTAJ o obróceniu dzióbka nierówności w drugą stronę!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Przyrównaj wzór funkcji do zera",
              description: "Zapisz równanie $ax + b = 0$.",
              tip: "Nie myl obliczania miejsca zerowego z obliczaniem f(0)!"
            },
            {
              stepNumber: 2,
              title: "Przenieś wyraz wolny na prawą stronę",
              description: "Otrzymujesz równanie w postaci $ax = -b$.",
              tip: "Pamiętaj o zmianie znaku przy przenoszeniu b."
            },
            {
              stepNumber: 3,
              title: "Podziel przez współczynnik a",
              description: "Wylicz $x = -\\frac{b}{a}$. Jeśli rozwiązujesz nierówność i $a < 0$, odwróć znak nierówności.",
              tip: "W zadaniu z wykresem po prostu odczytaj punkt przecięcia z poziomą osią OX."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na miejsce zerowe funkcji liniowej",
              formula: "x_0 = -\\frac{b}{a} \\quad (a \\neq 0)"
            },
            {
              name: "Punkt przecięcia z osią OX",
              formula: "P_{OX} = \\left(-\\frac{b}{a}, 0\\right)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Miejscem zerowym funkcji liniowej $f(x) = -\\frac{2}{3}x + 6$ jest liczba:",
              solution: "1. Zapisujemy równanie: $-\\frac{2}{3}x + 6 = 0$.\n2. Przenosimy wyraz wolny: $-\\frac{2}{3}x = -6$.\n3. Mnożymy obustronnie przez odwrotność $-\\frac{3}{2}$:\n$$x = -6 \\cdot \\left(-\\frac{3}{2}\\right) = \\frac{18}{2} = 9$$\nOdpowiedź: Miejscem zerowym jest $x = 9$.",
              keyInsight: "Iloczyn dwóch liczb ujemnych daje wynik dodatni."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Odczyt nierówności z wykresu)",
              points: "1 pkt",
              problem: "Dla jakich argumentów funkcja $f(x) = -2x + 8$ przyjmuje wartości nieujemne?",
              solution: "1. Wartości nieujemne oznaczają nierówność: $f(x) \\ge 0$.\n2. Wstawiamy wzór: $-2x + 8 \\ge 0$.\n3. Przenosimy: $-2x \\ge -8$.\n4. Dzielimy przez $-2$, ODWRACAJĄC znak nierówności:\n$$x \\le \\frac{-8}{-2} \\implies x \\le 4$$\nOdpowiedź: $x \\in (-\\infty, 4\\rangle$.",
              keyInsight: "Wartości nieujemne to $\\ge 0$ (razem z zerem), wartości dodatnie to $> 0$."
            }
          ],
          trap_details: {
            fail: "Błąd: Obliczanie f(0) zamiast rozwiązywania równania f(x) = 0 i podawanie liczby b jako miejsca zerowego.",
            win: "Poprawnie: Miejsce zerowe to taki x, że y = 0. f(0) to wartość dla argumentu 0, czyli punkt (0, b) na osi OY.",
            explanation: "Wielu uczniów myli pytanie o 'miejsce zerowe' z pytaniem o 'wartość funkcji dla zera'.",
            ckeTip: "Miejsce zerowe = szukasz x. Wartość dla zera = podstawiasz x = 0 i szukasz y."
          },
          exam_trap: "Nieuwzględnienie zmiany zwrotu nierówności przy dzieleniu przez ujemny współczynnik $a$!",
          key_points: [
            "Miejsce zerowe to $x_0 = -\\frac{b}{a}$.",
            "Punkt przecięcia z osią $OX$ ma współrzędną $y = 0$, czyli $(x_0, 0)$.",
            "Dzielenie lub mnożenie nierówności przez liczbę ujemną ZAWSZE odwraca zwrot nierówności."
          ]
        }
      },
      {
        id: "math-lesson-6-5",
        order: 5,
        title: "Zastosowania praktyczne funkcji liniowej",
        short_title: "Zastosowania praktyczne",
        badge: "Lekcja 6.5",
        archetypeCode: "ARCH-65",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W zadaniach praktycznych CKE funkcja liniowa $y = ax + b$ modeluje zjawiska o stałej szybkości zmian. Współczynnik $a$ reprezentuje jednostkową stawkę / prędkość / koszt jednostkowy (np. zł/km, litry/godz.), a wyraz wolny $b$ to opłata początkowa, stan wyjściowy lub stały abonament (wartość dla $x = 0$).",
          matura_context: "CKE Formuła 2023 • Zadanie tekstowe za 1–2 pkt • Odczyt danych z wykresu z kontekstem realistycznym.",
          plain_polish: "Z polskiego na nasze: Taksówka ma opłatę początkową za „trzaśnięcie drzwiami” (to jest $b$) oraz stałą stawkę za każdy przejechany kilometr (to jest $a$). Rachunek wynosi $K(x) = a \\cdot x + b$. Wystarczy podstawić dane z treści zadania.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj zmienne i jednostki",
              description: "Ustal, co jest argumentem $x$ (czas, kilometry, liczba sztuk), a co wartością $y$ (koszt, objętość wody, temperatura).",
              tip: "Zmienna niezależna x prawie zawsze znajduje się na poziomej osi."
            },
            {
              stepNumber: 2,
              title: "Odczytaj wartość początkową b",
              description: "Sprawdź wartość zjawiska w chwili startu ($x = 0$) lub stały abonament.",
              tip: "To punkt, z którego wykres startuje na osi pionowej."
            },
            {
              stepNumber: 3,
              title: "Wyznacz tempo zmian a",
              description: "Oblicz zmianę wartości przypadającą na jedną jednostkę argumentu: $a = \\frac{\\Delta y}{\\Delta x}$.",
              tip: "Jeśli ilość maleje (np. ubywa wody ze zbiornika), a musi być ujemne!"
            }
          ],
          core_formulas: [
            {
              name: "Model kosztu liniowego",
              formula: "K(x) = a \\cdot x + b \\quad (a \\text{ – koszt jedn.}, b \\text{ – koszt stały})"
            },
            {
              name: "Szybkość zmiany wielkości (iloraz różnicowy)",
              formula: "a = \\frac{y_2 - y_1}{x_2 - x_1}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Koszt wynajmu hulajnogi elektrycznej składa się z opłaty startowej 4 zł oraz 0,80 zł za każdą rozpoczętą minutę jazdy. Zapisz wzór na koszt $K(t)$ w zależności od czasu $t$ i oblicz koszt 15-minutowej jazdy.",
              solution: "1. Opłata stała: $b = 4$.\n2. Stawka za minutę: $a = 0{,}8$.\n3. Wzór funkcji: $K(t) = 0{,}8t + 4$.\n4. Obliczamy dla $t = 15$:\n$$K(15) = 0{,}8 \\cdot 15 + 4 = 12 + 4 = 16\\text{ zł}.$$",
              keyInsight: "Zmienna t mnoży tylko stawkę minutową, opłatę startową dodajemy jednorazowo."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Odczyt tempa ubywania)",
              points: "2 pkt",
              problem: "W zbiorniku było 240 litrów wody. Po 6 godzinach równomiernego wypływu w zbiorniku zostało 96 litrów wody. Po ilu łącznie godzinach od otwarcia odpływu zbiornik będzie całkowicie pusty?",
              solution: "1. Ilość ubywającej wody w 6 godzin: $240 - 96 = 144$ litry.\n2. Szybkość wypływu: $a = \\frac{144}{6} = 24$ litry/godz.\n3. Wzór na ilość wody po czasie $t$: $V(t) = 240 - 24t$.\n4. Szukamy czasu opróżnienia ($V(t) = 0$):\n$$240 - 24t = 0 \\implies 24t = 240 \\implies t = 10\\text{ godzin}.$$",
              keyInsight: "Tempo ubywania jest stałe, więc czas całkowity to całkowita pojemność podzielona przez tempo na godzinę."
            }
          ],
          trap_details: {
            fail: "Błąd: Pomijanie opłaty stałej b przy obliczaniu proporcji (np. 15 min kosztuje 3 razy tyle co 5 min).",
            win: "Poprawnie: Proporcja prosta działa TYLKO gdy b = 0. Gdy b > 0, funkcja liniowa NIE JEST proporcjonalnością prostą!",
            explanation: "Uczniowie stosują 'regułę trzech', która przy opłacie początkowej b != 0 daje fałszywy wynik.",
            ckeTip: "Zawsze najpierw napisz wzór z obiema wartościami a i b, a dopiero potem podstawiaj liczby."
          },
          exam_trap: "Stosowanie proporcji prostej (reguły trzech) do zjawisk z niezerowym wyrazem wolnym $b$!",
          key_points: [
            "Współczynnik $a$ to jednostkowe tempo zmiany (nachylenie prostej).",
            "Wyraz wolny $b$ to wartość początkowa (stan w chwili zero).",
            "Gdy $b \\neq 0$, podwojenie argumentu $x$ NIE oznacza podwojenia wartości $y$!"
          ]
        }
      }
    ]
  },
  {
    id: "dzial-7",
    numericId: 7,
    title: "Funkcja kwadratowa",
    short_title: "Funkcja kwadratowa",
    description: "Postacie funkcji kwadratowej, współrzędne wierzchołka, oś symetrii, zbiór wartości, wartość najmniejsza i największa w przedziale oraz optymalizacja.",
    icon: "FunctionSquare",
    color: "#FFB800",
    matura_points_range: "4–7 pkt",
    importance: "CRITICAL_PEWNIAK",
    lessons: [
      {
        id: "math-lesson-7-1",
        order: 1,
        title: "Postać ogólna, kanoniczna i iloczynowa paraboli",
        short_title: "Trzy postacie paraboli",
        badge: "Lekcja 7.1",
        archetypeCode: "ARCH-71",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Funkcję kwadratową można zapisać w 3 równoważnych postaciach: 1) ogólnej: $f(x) = ax^2 + bx + c$, gdzie $c$ to punkt przecięcia z osią $OY$; 2) kanonicznej: $f(x) = a(x - p)^2 + q$, która bezpośrednio podaje współrzędne wierzchołka $W = (p, q)$; 3) iloczynowej: $f(x) = a(x - x_1)(x - x_2)$ (istnieje tylko gdy $\\Delta \\ge 0$), która natychmiast ujawnia miejsca zerowe $x_1, x_2$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Kluczowe dla odczytywania wierzchołka i miejsc zerowych.",
          plain_polish: "Z polskiego na nasze: Każda postać ma supermoc! W kanonicznej od razu widzisz czubek paraboli: pamiętaj tylko, że w nawiasie odwracasz znak ($x - 3$ daje $p = 3$). W iloczynowej od razu masz miejsca zerowe (też z odwróconym znakiem). A we wszystkich trzech współczynnik $a$ jest dokładnie ten sam!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj, czego potrzebujesz",
              description: "Jeśli szukasz wierzchołka lub zbioru wartości – dąż do postaci kanonicznej. Jeśli miejsc zerowych – do postaci iloczynowej.",
              tip: "Współczynnik 'a' ma tę samą wartość we wszystkich trzech postaciach."
            },
            {
              stepNumber: 2,
              title: "Odczytaj współrzędne ze zmianą znaku",
              description: "W postaci kanonicznej $a(x - p)^2 + q$: odwróć znak w nawiasie dla $p$, zachowaj znak dla $q$. W iloczynowej $a(x - x_1)(x - x_2)$: odwróć znaki obu liczb.",
              tip: "Dla f(x) = 2(x + 4)^2 - 5 wierzchołek to W = (-4, -5)."
            },
            {
              stepNumber: 3,
              title: "Przeliczaj między postaciami",
              description: "Aby przejść do postaci ogólnej, po prostu podnieś nawias do kwadratu (wzór skróconego mnożenia) i wymnóż przez $a$.",
              tip: "Nie zapomnij najpierw potęgować, a dopiero potem mnożyć przez a!"
            }
          ],
          core_formulas: [
            {
              name: "Postać ogólna",
              formula: "f(x) = ax^2 + bx + c \\quad (a \\neq 0)"
            },
            {
              name: "Postać kanoniczna (z wierzchołkiem W=(p,q))",
              formula: "f(x) = a(x - p)^2 + q"
            },
            {
              name: "Postać iloczynowa (gdy Delta >= 0)",
              formula: "f(x) = a(x - x_1)(x - x_2)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wierzchołkiem paraboli będącej wykresem funkcji $f(x) = -3(x - 2)^2 + 7$ jest punkt:",
              solution: "1. Porównujemy wzór z postacią kanoniczną $f(x) = a(x - p)^2 + q$.\n2. Widzimy, że $a = -3$, $p = 2$ oraz $q = 7$.\n3. Zatem współrzędne wierzchołka to $W = (p, q) = (2, 7)$.",
              keyInsight: "W nawiasie mamy (x - 2), co oznacza p = +2, a NIE -2."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Przejście iloczynowa -> kanoniczna)",
              points: "2 pkt",
              problem: "Miejscami zerowymi funkcji kwadratowej są liczby $-2$ oraz $6$. Wykres przechodzi przez punkt $A = (0, -6)$. Wyznacz wzór tej funkcji w postaci kanonicznej.",
              solution: "1. Zapisujemy postać iloczynową: $f(x) = a(x - (-2))(x - 6) = a(x + 2)(x - 6)$.\n2. Wstawiamy punkt $A(0, -6)$:\n$$-6 = a(0 + 2)(0 - 6) \\implies -6 = a(2)(-6) \\implies -6 = -12a \\implies a = \\frac{1}{2}$$\n3. Otrzymujemy $f(x) = \\frac{1}{2}(x^2 - 4x - 12) = \\frac{1}{2}x^2 - 2x - 6$.\n4. Obliczamy współrzędne wierzchołka: $p = \\frac{x_1 + x_2}{2} = \\frac{-2 + 6}{2} = 2$.\n$$q = f(2) = \\frac{1}{2}(2 + 2)(2 - 6) = \\frac{1}{2}(4)(-4) = -8$$\n5. Postać kanoniczna: $f(x) = \\frac{1}{2}(x - 2)^2 - 8$.",
              keyInsight: "Środek p leży dokładnie w połowie między miejscami zerowymi: p = (x1 + x2)/2."
            }
          ],
          trap_details: {
            fail: "Błąd: Błędne odczytanie p z postaci kanonicznej: uznanie, że dla (x + 3)^2 mamy p = 3.",
            win: "Poprawnie: Wzór to a(x - p)^2 + q. Wyrażenie (x + 3) oznacza (x - (-3)), więc p = -3.",
            explanation: "Minus we wzorze kanonicznym oznacza odwrócenie znaku odciętej wierzchołka.",
            ckeTip: "Zadaj sobie pytanie: dla jakiego x nawias się zeruje? Dla x = -3. To jest właśnie Twoje p!"
          },
          exam_trap: "Zapisywanie postaci iloczynowej bez współczynnika $a$: pisanie $(x - x_1)(x - x_2)$ zamiast $a(x - x_1)(x - x_2)$!",
          key_points: [
            "Współczynnik $a$ decyduje o zwrocie ramion: $a > 0$ w górę (uśmiechnięta), $a < 0$ w dół (smutna).",
            "Postać iloczynowa istnieje WYŁĄCZNIE wtedy, gdy $\\Delta \\ge 0$.",
            "Odcięta wierzchołka $p$ to zawsze średnia arytmetyczna miejsc zerowych: $p = \\frac{x_1 + x_2}{2}$."
          ]
        }
      },
      {
        id: "math-lesson-7-2",
        order: 2,
        title: "Wierzchołek paraboli W = (p, q) i oś symetrii",
        short_title: "Wierzchołek W = (p, q)",
        badge: "Lekcja 7.2",
        archetypeCode: "ARCH-72",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wierzchołek paraboli to punkt ekstremalny $W = (p, q)$. W postaci ogólnej współrzędne wyliczamy ze wzorów: $p = -\\frac{b}{2a}$ oraz $q = -\\frac{\\Delta}{4a}$ (lub prościej: $q = f(p)$). Prosta pionowa $x = p$ jest osią symetrii paraboli. Współrzędna $q$ wyznacza zbiór wartości funkcji: $Y = \\langle q, +\\infty)$ dla $a > 0$ oraz $Y = (-\\infty, q\\rangle$ dla $a < 0$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Pytania o zbiór wartości lub oś symetrii paraboli.",
          plain_polish: "Z polskiego na nasze: Współrzędna $p$ to pozycja pozioma czubka paraboli ($-\\frac{b}{2a}$). Prosta przecinająca ten punkt pionowo to oś symetrii ($x = p$). Współrzędna $q$ to wysokość tego czubka – czyli najniższy punkt (dla ramion w górę) lub najwyższy punkt (dla ramion w dół).",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz pierwszą współrzędną p",
              description: "Zastosuj wzór $p = -\\frac{b}{2a}$. Uważaj na znaki minus przy ujemnych współczynnikach.",
              tip: "Pamiętaj: w mianowniku jest 2a, a nie samo a!"
            },
            {
              stepNumber: 2,
              title: "Oblicz drugą współrzędną q",
              description: "Zamiast liczyć deltę i wzór $-\\Delta / (4a)$, podstaw wyliczone $p$ wprost do wzoru funkcji: $q = f(p)$.",
              tip: "To o wiele szybsza metoda i eliminuje błędy przy potęgowaniu delty."
            },
            {
              stepNumber: 3,
              title: "Podaj oś symetrii lub zbiór wartości",
              description: "Oś symetrii ma równanie $x = p$. Zbiór wartości zależy od znaku $a$: dla $a>0$ to $\\langle q, +\\infty)$, dla $a<0$ to $(-\\infty, q\\rangle$.",
              tip: "Nawias przy q w zbiorze wartości jest ZAWSZE domknięty."
            }
          ],
          core_formulas: [
            {
              name: "Współrzędna p wierzchołka",
              formula: "p = -\\frac{b}{2a}"
            },
            {
              name: "Współrzędna q wierzchołka",
              formula: "q = -\\frac{\\Delta}{4a} = f(p)"
            },
            {
              name: "Równanie osi symetrii",
              formula: "x = p"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wyznacz zbiór wartości funkcji kwadratowej $f(x) = 2x^2 - 8x + 3$.",
              solution: "1. Odczytujemy współczynniki: $a = 2$, $b = -8$, $c = 3$.\n2. Ponieważ $a = 2 > 0$, ramiona paraboli są skierowane w górę.\n3. Obliczamy $p$:\n$$p = -\\frac{-8}{2 \\cdot 2} = \\frac{8}{4} = 2$$\n4. Obliczamy $q = f(p) = f(2)$:\n$$q = 2(2)^2 - 8(2) + 3 = 2(4) - 16 + 3 = 8 - 16 + 3 = -5$$\n5. Zbiór wartości: $Y = \\langle -5, +\\infty)$.",
              keyInsight: "Przy a > 0 zbiór wartości zaczyna się od q i biegnie do nieskończoności."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Oś symetrii)",
              points: "1 pkt",
              problem: "Wykres funkcji kwadratowej przecina oś $OX$ w punktach o współrzędnych $(-3, 0)$ oraz $(7, 0)$. Osią symetrii wykresu jest prosta:",
              solution: "1. Parabola jest symetryczna względem wierzchołka, więc oś symetrii leży dokładnie w połowie odległości między miejscami zerowymi.\n2. Obliczamy współrzędną $p$ jako średnią arytmetyczną:\n$$p = \\frac{-3 + 7}{2} = \\frac{4}{2} = 2$$\n3. Oś symetrii to prosta pionowa: $x = 2$.",
              keyInsight: "Oś symetrii to zawsze równanie x = liczba, nigdy y = liczba!"
            }
          ],
          trap_details: {
            fail: "Błąd: Zapisywanie równania osi symetrii jako y = p zamiast x = p.",
            win: "Poprawnie: Oś symetrii jest prostą pionową, więc jej równanie to zawsze x = p.",
            explanation: "Prosta y = stała jest pozioma, a parabola ma pionową oś symetrii.",
            ckeTip: "Oś symetrii przechodzi przez oś OX w punkcie p, stąd równanie x = p."
          },
          exam_trap: "Mylenie współrzędnych $p$ i $q$ przy wyznaczaniu przedziałów monotoniczności – monotoniczność opisujemy zmienną $x$ (czyli $p$), a NIE $q$!",
          key_points: [
            "Oś symetrii paraboli: $x = -\\frac{b}{2a}$.",
            "Najszybszy sposób na $q$: podstawić $p$ do wzoru funkcji ($q = f(p)$).",
            "Zbiór wartości dla $a > 0$ to $\\langle q, +\\infty)$, a dla $a < 0$ to $(-\\infty, q\\rangle$."
          ]
        }
      },
      {
        id: "math-lesson-7-3",
        order: 3,
        title: "Wartość najmniejsza i największa w przedziale domkniętym",
        short_title: "Wartości w przedziale",
        badge: "Lekcja 7.3",
        archetypeCode: "ARCH-73",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Aby znaleźć wartość najmniejszą i największą funkcji kwadratowej w przedziale domkniętym $\\langle k, l \\rangle$: 1) oblicz $p = -\\frac{b}{2a}$; 2) sprawdź, czy $p \\in \\langle k, l \\rangle$. Jeśli TAK, oblicz wartość w wierzchołku $f(p)$; 3) oblicz wartości na krańcach przedziału: $f(k)$ i $f(l)$; 4) porównaj otrzymane liczby i wskaż wartość najmniejszą i największą.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 2 pkt • Pewniak maturalny w zadaniach krótkiej odpowiedzi.",
          plain_polish: "Z polskiego na nasze: Masz tylko 3 kandydatów na podium: lewy kraniec $f(k)$, prawy kraniec $f(l)$ oraz czubek paraboli $f(p)$ (ale tylko wtedy, gdy czubek $p$ mieści się w przedziale!). Jeśli $p$ wypada poza przedziałem, w ogóle go nie liczysz – porównujesz tylko krańce.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz odciętą wierzchołka p",
              description: "Wylicz $p = -\\frac{b}{2a}$ i sprawdź, czy $p$ należy do przedziału $\\langle k, l \\rangle$.",
              tip: "To najważniejszy warunek zadania – jeśli p leży poza przedziałem, odrzuć je!"
            },
            {
              stepNumber: 2,
              title: "Oblicz wartości w punktach kluczowych",
              description: "Oblicz $f(k)$ oraz $f(l)$. Jeśli $p \\in \\langle k, l \\rangle$, oblicz także $f(p)$.",
              tip: "Dokładnie wykonaj potęgowanie przed mnożeniem przez współczynnik a."
            },
            {
              stepNumber: 3,
              title: "Porównaj wyniki i sformułuj odpowiedź",
              description: "Wybierz liczbę najmniejszą ($y_{\\min}$) i największą ($y_{\\max}$).",
              tip: "Uważaj na treść: czy pytają o wartość (y), czy o argument (x) dla którego jest osiągana!"
            }
          ],
          core_formulas: [
            {
              name: "Kandydaci na ekstrema w przedziale",
              formula: "y \\in \\{ f(k), f(l) \\} \\cup \\{ f(p) \\text{ tylko gdy } p \\in \\langle k, l \\rangle \\}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Wierzchołek w przedziale)",
              points: "2 pkt",
              problem: "Wyznacz wartość najmniejszą i największą funkcji $f(x) = x^2 - 4x + 1$ w przedziale $\\langle 1, 4 \\rangle$.",
              solution: "1. Obliczamy $p$:\n$$p = -\\frac{-4}{2 \\cdot 1} = 2$$\n2. Sprawdzamy: $2 \\in \\langle 1, 4 \\rangle$ – wierzchołek leży w przedziale!\n3. Obliczamy wartości w 3 punktach:\n- Wierzchołek: $f(2) = 2^2 - 4(2) + 1 = 4 - 8 + 1 = -3$\n- Lewy kraniec: $f(1) = 1^2 - 4(1) + 1 = 1 - 4 + 1 = -2$\n- Prawy kraniec: $f(4) = 4^2 - 4(4) + 1 = 16 - 16 + 1 = 1$\n4. Porównujemy: najmniejsza wartość to $-3$ (dla $x=2$), a największa to $1$ (dla $x=4$).",
              keyInsight: "Wartość wierzchołka była najmniejsza, bo ramiona są skierowane w górę (a = 1 > 0)."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Wierzchołek poza przedziałem)",
              points: "2 pkt",
              problem: "Wyznacz wartość najmniejszą i największą funkcji $f(x) = -x^2 + 2x + 5$ w przedziale $\\langle 3, 5 \\rangle$.",
              solution: "1. Obliczamy $p$:\n$$p = -\\frac{2}{2 \\cdot (-1)} = 1$$\n2. Sprawdzamy: $1 \\notin \\langle 3, 5 \\rangle$ – wierzchołek leży POZA zadanym przedziałem!\n3. Nie liczymy $f(1)$. Funkcja na tym przedziale jest ściśle malejąca. Liczymy tylko krańce:\n- Lewy kraniec: $f(3) = -(3^2) + 2(3) + 5 = -9 + 6 + 5 = 2$\n- Prawy kraniec: $f(5) = -(5^2) + 2(5) + 5 = -25 + 10 + 5 = -10$\n4. Wartość największa to $2$ (dla $x=3$), a najmniejsza to $-10$ (dla $x=5$).",
              keyInsight: "Gdy p nie należy do przedziału, ekstremum globalne nie występuje na badanym odcinku."
            }
          ],
          trap_details: {
            fail: "Błąd: Uwzględnianie wartości f(p) jako wyniku, gdy p leży całkowicie poza zadanym przedziałem.",
            win: "Poprawnie: Zawsze na początku narysuj oś lub zapisz warunek czy p należy do przedziału <k, l>.",
            explanation: "Jeśli p leży poza zakresem, funkcja wewnątrz przedziału jest monotoniczna i przyjmuje ekstrema tylko na końcach.",
            ckeTip: "Pierwsza linijka w Twoim rozwiązaniu: p = ... oraz wyraźny zapis 'p należy do przedziału' lub 'p nie należy do przedziału'."
          },
          exam_trap: "Podawanie argumentu $x$ zamiast wartości $y$ w odpowiedzi na pytanie o wartość najmniejszą/największą!",
          key_points: [
            "Wartość funkcji to zawsze $y$ (czyli $f(x)$), a nie argument $x$.",
            "Wierzchołek $f(p)$ badamy TYLKO wtedy, gdy $p \\in \\langle k, l \\rangle$.",
            "Dla przedziału domkniętego funkcja ciągła zawsze osiąga wartość min i max."
          ]
        }
      },
      {
        id: "math-lesson-7-4",
        order: 4,
        title: "Wzory Viete a w zadaniach zamkniętych CKE",
        short_title: "Wzory Viete'a",
        badge: "Lekcja 7.4",
        archetypeCode: "ARCH-74",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wzory Viete'a łączą pierwiastki równania kwadratowego $ax^2 + bx + c = 0$ (przy $\\Delta \\ge 0$) z jego współczynnikami: suma pierwiastków $x_1 + x_2 = -\\frac{b}{a}$, a iloczyn $x_1 \\cdot x_2 = \\frac{c}{a}$. Na maturze podstawowej pozwalają natychmiast określić znaki pierwiastków lub obliczyć wartość wyrażeń typu $\\frac{1}{x_1} + \\frac{1}{x_2}$ bez mozolnego liczenia delty i pierwiastków.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Idealne narzędzie do natychmiastowego rozwiązywania.",
          plain_polish: "Z polskiego na nasze: Nie musisz liczyć delty, pierwiastków z delty ani ułamków! Suma rozwiązań to środkowy współczynnik z przeciwnym znakiem podzielony przez $a$. Iloczyn to wyraz wolny podzielony przez $a$. Jeśli iloczyn jest ujemny, to pierwiastki mają różne znaki. Proste!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wypisz współczynniki a, b, c",
              description: "Upewnij się, że równanie ma postać $ax^2 + bx + c = 0$.",
              tip: "Zwróć uwagę na znak przy b – we wzorze na sumę stoi minus!"
            },
            {
              stepNumber: 2,
              title: "Zastosuj wzory Viete'a",
              description: "Podstaw: $x_1 + x_2 = -\\frac{b}{a}$ oraz $x_1 x_2 = \\frac{c}{a}$.",
              tip: "Suma to minus b przez a, iloczyn to plus c przez a."
            },
            {
              stepNumber: 3,
              title: "Przekształć wyrażenia złożone",
              description: "Dla sumy odwrotności sprowadź do wspólnego mianownika: $\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2}$.",
              tip: "Dla sumy kwadratów zastosuj tożsamość: $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$."
            }
          ],
          core_formulas: [
            {
              name: "Suma pierwiastków (Viete)",
              formula: "x_1 + x_2 = -\\frac{b}{a}"
            },
            {
              name: "Iloczyn pierwiastków (Viete)",
              formula: "x_1 \\cdot x_2 = \\frac{c}{a}"
            },
            {
              name: "Suma odwrotności pierwiastków",
              formula: "\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 \\cdot x_2} = \\frac{-b/a}{c/a} = -\\frac{b}{c}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Liczby $x_1, x_2$ są różnymi rozwiązaniami równania $2x^2 - 7x - 4 = 0$. Wartość wyrażenia $x_1 + x_2$ jest równa:",
              solution: "1. Odczytujemy współczynniki: $a = 2$, $b = -7$, $c = -4$.\n2. Stosujemy wzór Viete'a na sumę:\n$$x_1 + x_2 = -\\frac{b}{a} = -\\frac{-7}{2} = \\frac{7}{2} = 3{,}5$$\nOdpowiedź: Suma wynosi $3{,}5$.",
              keyInsight: "Dwa minusy dają plus: -(-7)/2 = +7/2."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Suma odwrotności)",
              points: "1 pkt",
              problem: "Równanie $x^2 - 5x + 2 = 0$ ma dwa pierwiastki $x_1$ i $x_2$. Oblicz wartość wyrażenia $\\frac{1}{x_1} + \\frac{1}{x_2}$.",
              solution: "1. Sprowadzamy ułamki do wspólnego mianownika:\n$$\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_2 + x_1}{x_1 x_2}$$\n2. Ze wzorów Viete'a:\n$$x_1 + x_2 = -\\frac{-5}{1} = 5, \\quad x_1 x_2 = \\frac{2}{1} = 2$$\n3. Podstawiamy:\n$$\\frac{x_1 + x_2}{x_1 x_2} = \\frac{5}{2} = 2{,}5.$$",
              keyInsight: "Nie musisz wyznaczać pierwiastków z brzydką deltą sqrt(17) – wzory Viete'a załatwiają sprawę w 15 sekund."
            }
          ],
          trap_details: {
            fail: "Błąd: Zapominanie o minusie we wzorze na sumę pierwiastków: branie b/a zamiast -b/a.",
            win: "Poprawnie: Wzór na sumę ma ZAWSZE minus: -(b/a).",
            explanation: "To jeden z najpowszechniejszych błędów znakowych na maturze.",
            ckeTip: "Pamiętaj: Suma ma MINUS (jak strata), iloczyn ma PLUS (jak zysk)."
          },
          exam_trap: "Stosowanie wzorów Viete'a do równania, które w ogóle nie ma rozwiązań rzeczywistych (gdy $\\Delta < 0$)!",
          key_points: [
            "$x_1 + x_2 = -\\frac{b}{a}$ oraz $x_1 x_2 = \\frac{c}{a}$.",
            "Wzory Viete'a działają TYLKO wtedy, gdy $\\Delta \\ge 0$.",
            "Suma odwrotności to po prostu $-\\frac{b}{c}$."
          ]
        }
      },
      {
        id: "math-lesson-7-5",
        order: 5,
        title: "Zadania optymalizacyjne z funkcją kwadratową",
        short_title: "Optymalizacja kwadratowa",
        badge: "Lekcja 7.5",
        archetypeCode: "ARCH-75",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Zadania optymalizacyjne w Formule 2023 na poziomie podstawowym polegają na: 1) uzależnieniu badanej wielkości (pola, zysku, kosztu) od jednej zmiennej $x$; 2) wyznaczeniu dziedziny geometrycznej/praktycznej; 3) otrzymaniu funkcji kwadratowej $f(x) = ax^2 + bx + c$; 4) wyznaczeniu argumentu optymalnego jako odciętej wierzchołka $x = p = -\\frac{b}{2a}$ (dla $a < 0$ funkcja osiąga maksimum, dla $a > 0$ minimum).",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 3–4 pkt • Król zadań otwartych na nowej maturze podstawowej.",
          plain_polish: "Z polskiego na nasze: Np. grodzisz prostokątny wybieg przy ścianie i masz 100 m siatki. Zapisujesz boki jako $x$ oraz $100 - 2x$. Pole to $P(x) = x(100 - 2x) = -2x^2 + 100x$. Ponieważ $a = -2 < 0$, wykres to smutna parabola, a największe pole jest dokładnie na czubku: $p = -\\frac{b}{2a} = -\\frac{100}{-4} = 25$ metrów!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wprowadź oznaczenia i zależność",
              description: "Oznacz jeden z wymiarów przez $x$. Wyraź drugi wymiar za pomocą $x$ korzystając z danych w zadaniu (np. obwodu).",
              tip: "Zawsze wykonaj poglądowy rysunek z oznaczeniem boków."
            },
            {
              stepNumber: 2,
              title: "Wyznacz dziedzinę funkcji",
              description: "Każdy bok i wymiar geometryczny musi być ściśle dodatni ($> 0$). Rozwiąż prosty układ nierówności i zapisz przedział dla $x$.",
              tip: "Za brak dziedziny egzaminator CKE może odjąć 1 punkt!"
            },
            {
              stepNumber: 3,
              title: "Zbuduj wzór funkcji i znajdź wierzchołek p",
              description: "Wymnóż nawiasy, uporządkuj do postaci $f(x) = ax^2 + bx$ i oblicz $p = -\\frac{b}{2a}$. Sprawdź, czy $p$ należy do dziedziny.",
              tip: "Dla a < 0 masz gwarantowane maksimum, dla a > 0 minimum."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na optymalny argument (czubek paraboli)",
              formula: "x_{\\text{opt}} = p = -\\frac{b}{2a}"
            },
            {
              name: "Wartość optymalna (maksymalne pole / zysk)",
              formula: "f_{\\max} = f(p) = q = -\\frac{\\Delta}{4a}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Modelowe CKE (Ogrodzenie działki)",
              points: "3 pkt",
              problem: "Rolnik chce ogrodzić prostokątny wybieg dla owiec przylegający jednym bokiem do prostoliniowego muru. Ma do dyspozycji 120 metrów siatki ogrodzeniowej (mur nie wymaga siatki). Jakie wymiary powinien mieć ten wybieg, aby jego pole było jak największe? Oblicz to maksymalne pole.",
              solution: "1. Oznaczamy boki prostokąta: niech $x$ będzie długością dwóch boków prostopadłych do muru. Wtedy bok równoległy do muru ma długość $120 - 2x$.\n2. Dziedzina: boki muszą być dodatnie:\n$$x > 0 \\quad \\text{oraz} \\quad 120 - 2x > 0 \\implies 2x < 120 \\implies x < 60$$\nZatem $x \\in (0, 60)$.\n3. Wzór funkcji pola:\n$$P(x) = x(120 - 2x) = -2x^2 + 120x$$\n4. Jest to funkcja kwadratowa o $a = -2 < 0$, więc osiąga wartość największą w wierzchołku:\n$$p = -\\frac{b}{2a} = -\\frac{120}{2 \\cdot (-2)} = -\\frac{120}{-4} = 30$$\nLiczba $30 \\in (0, 60)$, więc spełnia warunki zadania.\n5. Wymiary wybiegu: boki to $x = 30$ m oraz $120 - 2(30) = 60$ m.\n6. Maksymalne pole: $P(30) = 30 \\cdot 60 = 1800\\text{ m}^2$.",
              keyInsight: "Przy ogrodzeniu z jednej strony murem optymalny bok równoległy jest dokładnie 2 razy dłuższy niż prostopadły."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Suma liczb)",
              points: "2 pkt",
              problem: "Przedstaw liczbę 24 w postaci sumy dwóch liczb rzeczywistych, których iloczyn jest największy.",
              solution: "1. Niech pierwsza liczba to $x$, wtedy druga to $24 - x$.\n2. Funkcja iloczynu: $I(x) = x(24 - x) = -x^2 + 24x$.\n3. Współczynniki: $a = -1$, $b = 24$.\n4. Największy iloczyn w wierzchołku: $x = p = -\\frac{24}{2(-1)} = 12$.\n5. Druga liczba to $24 - 12 = 12$.\nOdpowiedź: Szukane liczby to $12$ i $12$, a ich największy iloczyn wynosi $144$.",
              keyInsight: "Maksymalny iloczyn przy stałej sumie dają ZAWSZE dwie równe liczby."
            }
          ],
          trap_details: {
            fail: "Błąd: Brak wyznaczenia dziedziny geometrycznej x in (0, 60), co kosztuje 1 pkt w kluczu CKE.",
            win: "Poprawnie: Zawsze wypisz warunki brzegowe (długości boków > 0) i podaj przedział dziedziny.",
            explanation: "Klucz oceniania CKE precyzuje osobny punkt za poprawną dziedzinę geometryczną.",
            ckeTip: "Nawet jeśli wyliczysz idealnie wierzchołek, bez linijki 'Dziedzina: x in (0, 60)' stracisz cenny punkt!"
          },
          exam_trap: "Brak wyznaczenia dziedziny geometrycznej lub zapomnienie o obliczeniu drugiego boku / maksymalnej wartości!",
          key_points: [
            "Wyznaczenie dziedziny geometrycznej jest obowiązkowym krokiem punktowanym przez CKE.",
            "Wartość optymalna leży w wierzchołku $p = -\\frac{b}{2a}$.",
            "Dla $a < 0$ funkcja kwadratowa osiąga maksimum, dla $a > 0$ osiąga minimum."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-8",
    numericId: 8,
    title: "Funkcja wykładnicza i logarytmiczna",
    short_title: "Wykładnicza i logarytm",
    description: "Wykresy i monotoniczność funkcji f(x)=a^x i log_a(x), proste równania wykładnicze i logarytmiczne oraz warunki dziedziny.",
    icon: "FunctionSquare",
    color: "#FFB800",
    matura_points_range: "2–4 pkt",
    importance: "HIGH",
    lessons: [
      {
        id: "math-lesson-8-1",
        order: 1,
        title: "Wykres i własności funkcji wykładniczej f(x) = a^x",
        short_title: "Funkcja wykładnicza f(x) = a^x",
        badge: "Lekcja 8.1",
        archetypeCode: "ARCH-81",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Funkcja wykładnicza ma wzór $f(x) = a^x$, gdzie podstawa $a > 0$ i $a \\neq 1$. Dziedziną jest cały zbiór liczb rzeczywistych $D = \\mathbb{R}$, a zbiorem wartości są wyłącznie liczby ściśle dodatnie $Y = (0, +\\infty)$. Wykres zawsze przecina oś $OY$ w punkcie $(0, 1)$, ponieważ $a^0 = 1$. Dla $a > 1$ funkcja jest rosnąca, a dla $a \\in (0, 1)$ funkcja jest malejąca. Oś $OX$ jest poziomą asymptotą wykresu.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Odczyt własności, punktu (0, 1) lub przesunięcia wykresu.",
          plain_polish: "Z polskiego na nasze: $x$ siedzi w potędze, a nie na dole! Jeśli podstawa jest większa od 1 (np. $2^x$), wykres wystrzela w kosmos (rośnie błyskawicznie). Jeśli jest ułamkiem między 0 a 1 (np. $(1/2)^x$), wykres zjeżdża w dół w stronę zera, ale NIGDY nie dotknie ani nie przekroczy osi $OX$ ($y > 0$).",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Sprawdź podstawę potęgi a",
              description: "Jeśli $a > 1$, funkcja rośnie. Jeśli $0 < a < 1$, funkcja maleje.",
              tip: "Uważaj na zapisy typu 2^{-x} – to jest w rzeczywistości (1/2)^x, czyli malejąca!"
            },
            {
              stepNumber: 2,
              title: "Zlokalizuj punkt kluczowy (0, 1)",
              description: "Wykres podstawowy $y = a^x$ bez przesunięć zawsze przechodzi przez punkt $(0, 1)$.",
              tip: "Dla x = 1 wartość wynosi dokładnie a, czyli punkt to (1, a)."
            },
            {
              stepNumber: 3,
              title: "Uwzględnij przesunięcia wektora [p, q]",
              description: "Dla $y = a^{x-p} + q$: asymptota pozioma przesuwa się na prostą $y = q$, a zbiór wartości to $(q, +\\infty)$.",
              tip: "Znak q bezpośrednio określa poziomą asymptotę wykresu."
            }
          ],
          core_formulas: [
            {
              name: "Wzór ogólny funkcji wykładniczej",
              formula: "f(x) = a^x \\quad (a > 0, a \\neq 1)"
            },
            {
              name: "Zbiór wartości funkcji wykładniczej",
              formula: "Y = (0, +\\infty) \\implies a^x > 0 \\text{ dla każdego } x \\in \\mathbb{R}"
            },
            {
              name: "Wykres z przesunięciem o wektor [p, q]",
              formula: "y = a^{x-p} + q \\implies \\text{asymptota: } y = q, \\quad Y = (q, +\\infty)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wskaż funkcję, która dla wszystkich liczb rzeczywistych $x$ jest rosnąca:\nA. $f(x) = \\left(\\frac{1}{3}\\right)^x$\nB. $f(x) = 0{,}7^x$\nC. $f(x) = \\left(\\frac{4}{3}\\right)^x$\nD. $f(x) = 2^{-x}$",
              solution: "1. Funkcja wykładnicza $f(x) = a^x$ jest rosnąca wtedy i tylko wtedy, gdy $a > 1$.\n2. Sprawdzamy podstawy:\n- A: $a = \\frac{1}{3} < 1$ (malejąca)\n- B: $a = 0{,}7 < 1$ (malejąca)\n- C: $a = \\frac{4}{3} = 1{,}33... > 1$ (rosnąca)\n- D: $2^{-x} = \\left(\\frac{1}{2}\\right)^x$, gdzie $a = 0{,}5 < 1$ (malejąca)\nOdpowiedź: C.",
              keyInsight: "Ułamek niewłaściwy 4/3 jest większy od 1, więc generuje funkcję rosnącą."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Zbiór wartości z przesunięciem)",
              points: "1 pkt",
              problem: "Zbiorem wartości funkcji $f(x) = 3^{x+2} - 4$ jest przedział:",
              solution: "1. Podstawowa funkcja $3^{x+2}$ przyjmuje wyłącznie wartości dodatnie: $3^{x+2} > 0$ dla każdego $x$.\n2. Odejmując 4 od obu stron, otrzymujemy:\n$$3^{x+2} - 4 > -4$$\n3. Zatem zbiór wartości wynosi $Y = (-4, +\\infty)$.",
              keyInsight: "Wyraz wolny q = -4 wyznacza otwarty dolny kraniec zbioru wartości."
            }
          ],
          trap_details: {
            fail: "Błąd: Zakładanie, że funkcja wykładnicza może przyjmować wartość 0 lub wartości ujemne (np. 2^x = 0).",
            win: "Poprawnie: Wyrażenie a^x jest ZAWSZE ściśle dodatnie dla dowolnego x rzeczywistego.",
            explanation: "Równanie a^x = 0 jest sprzeczne, a wykres nigdy nie przecina asymptoty poziomej y = 0.",
            ckeTip: "Pamiętaj: a^x > 0 zawsze. Jeśli w równaniu wyjdzie 2^x = -4, natychmiast piszesz: brak rozwiązań."
          },
          exam_trap: "Mylenie wykresu $f(x) = 2^{-x}$ z funkcją rosnącą – minus w wykładniku odwraca podstawę: $2^{-x} = (1/2)^x$ (malejąca)!",
          key_points: [
            "$a^x > 0$ dla każdego $x \\in \\mathbb{R}$ (brak miejsc zerowych dla czystej $a^x$).",
            "Punkt $(0, 1)$ należy do wykresu każdej funkcji postaci $f(x) = a^x$.",
            "Dla $a > 1$ funkcja rośnie; dla $0 < a < 1$ funkcja maleje."
          ]
        }
      },
      {
        id: "math-lesson-8-2",
        order: 2,
        title: "Proste równania i nierówności wykładnicze",
        short_title: "Równania wykładnicze",
        badge: "Lekcja 8.2",
        archetypeCode: "ARCH-82",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Metoda sprowadzania do wspólnej podstawy opiera się na różnowartościowości funkcji wykładniczej: $a^f(x) = a^g(x) \\iff f(x) = g(x)$ (dla $a > 0, a \\neq 1$). Przy nierównościach wykładniczych kluczowa jest podstawa: dla $a > 1$ opuszczamy podstawę bez zmiany znaku ($a^x > a^y \\iff x > y$), ale dla $0 < a < 1$ OPUSZCZENIE PODSTAWY WYMAGA ODWRÓCENIA ZWROTU NIERÓWNOŚCI ($a^x > a^y \\iff x < y$).",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Pewniak: sprowadzenie potęg 2, 4, 8 lub 3, 9, 27 do wspólnej bazy.",
          plain_polish: "Z polskiego na nasze: Zamień obie strony równania na tę samą podstawę (np. $4 = 2^2$, $8 = 2^3$, $\\frac{1}{9} = 3^{-2}$, $\\sqrt{3} = 3^{1/2}$). Gdy masz $2^{\\text{coś}} = 2^{\\text{coś innego}}$, po prostu skreślasz dwójki i przyrównujesz same wykładniki! Pamiętaj: gdy podstawa to ułamek (np. $0{,}5$), odwróć dzióbek nierówności!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Sprowadź obie strony do tej samej podstawy",
              description: "Zamień liczby po lewej i prawej na potęgi tej samej liczby pierwszej (najczęściej 2, 3 lub 5).",
              tip: "Pamiętaj o wzorach: 1/a = a^{-1} oraz \\sqrt[n]{a} = a^{1/n}."
            },
            {
              stepNumber: 2,
              title: "Uprość wykładniki potęg",
              description: "Zastosuj regułę potęgowania potęgi: $(a^m)^n = a^{m \\cdot n}$.",
              tip: "Mnożysz cały wykładnik, np. 2^{2(x+1)} = 2^{2x+2}."
            },
            {
              stepNumber: 3,
              title: "Przyrównaj wykładniki",
              description: "Dla równania: $f(x) = g(x)$. Dla nierówności z podstawą $a < 1$: zmień znak nierówności na przeciwny.",
              tip: "Zawsze skontroluj czy podstawa była większa czy mniejsza od 1."
            }
          ],
          core_formulas: [
            {
              name: "Zasada jednakowych podstaw",
              formula: "a^{f(x)} = a^{g(x)} \\iff f(x) = g(x) \\quad (a > 0, a \\neq 1)"
            },
            {
              name: "Nierówność dla podstawy a > 1 (zachowanie zwrotu)",
              formula: "a^{f(x)} > a^{g(x)} \\iff f(x) > g(x)"
            },
            {
              name: "Nierówność dla podstawy 0 < a < 1 (odwrócenie zwrotu)",
              formula: "a^{f(x)} > a^{g(x)} \\iff f(x) < g(x)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiąż równanie: $4^{x-1} = 8^{2x+3}$.",
              solution: "1. Sprowadzamy obie strony do wspólnej podstawy $2$:\n$$4 = 2^2 \\implies 4^{x-1} = (2^2)^{x-1} = 2^{2(x-1)} = 2^{2x-2}$$\n$$8 = 2^3 \\implies 8^{2x+3} = (2^3)^{2x+3} = 2^{3(2x+3)} = 2^{6x+9}$$\n2. Przyrównujemy wykładniki:\n$$2x - 2 = 6x + 9$$\n3. Rozwiązujemy proste równanie liniowe:\n$$2x - 6x = 9 + 2 \\implies -4x = 11 \\implies x = -\\frac{11}{4} = -2{,}75.$$",
              keyInsight: "Przy potęgowaniu pamiętaj o wymnożeniu KAŻDEGO składnika w nawiasie: 3*(2x+3) = 6x + 9."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Nierówność z ułamkiem)",
              points: "1 pkt",
              problem: "Rozwiąż nierówność: $\\left(\\frac{1}{2}\\right)^{3x-1} \\ge 4$.",
              solution: "1. Zapisujemy obie strony w bazie $2$ lub $\\frac{1}{2}$. Zróbmy w bazie $2$:\n$$\\left(\\frac{1}{2}\\right)^{3x-1} = (2^{-1})^{3x-1} = 2^{-(3x-1)} = 2^{-3x+1}$$\n$$4 = 2^2$$\n2. Mamy nierówność o podstawie $2 > 1$:\n$$2^{-3x+1} \\ge 2^2 \\implies -3x + 1 \\ge 2$$\n3. Rozwiązujemy:\n$$-3x \\ge 1 \\implies x \\le -\\frac{1}{3}$$\nOdpowiedź: $x \\in \\left(-\\infty, -\\frac{1}{3}\\right\\rangle$.",
              keyInsight: "Zamiana podstawy ułamkowej na liczbę całkowitą (np. 1/2 na 2^(-1)) chroni przed zapomnieniem o zmianie zwrotu nierówności."
            }
          ],
          trap_details: {
            fail: "Błąd: Opuszczenie podstawy 1/2 w nierówności bez odwrócenia znaku >= na <=.",
            win: "Poprawnie: Dla podstawy ułamkowej a in (0, 1) funkcja maleje, więc większej wartości odpowiada MNIEJSZY wykładnik!",
            explanation: "To flagowa pułapka CKE w zadaniach z nierównościami wykładniczymi.",
            ckeTip: "Bezpieczna technika: zawsze zamieniaj ułamki na potęgę liczby całkowitej z ujemnym wykładnikiem (np. (1/3) na 3^(-1))."
          },
          exam_trap: "Niewymnożenie całego dwumianu przez wykładnik, np. zapis $(2^3)^{x+1} = 2^{3x+1}$ zamiast $2^{3x+3}$!",
          key_points: [
            "Wspólna podstawa to klucz do każdego równania wykładniczego na maturze podstawowej.",
            "$(a^m)^n = a^{m \\cdot n}$ – pamiętaj o nawiasach przy dwumianach.",
            "Dla podstawy $a \\in (0, 1)$ zawsze odwracaj zwrot nierówności."
          ]
        }
      },
      {
        id: "math-lesson-8-3",
        order: 3,
        title: "Wykres i własności funkcji logarytmicznej",
        short_title: "Funkcja logarytmiczna",
        badge: "Lekcja 8.3",
        archetypeCode: "ARCH-83",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Funkcja logarytmiczna $f(x) = \\log_a x$ jest funkcją odwrotną do funkcji wykładniczej $a^x$. Dziedziną są wyłącznie liczby ściśle dodatnie $D = (0, +\\infty)$, a zbiorem wartości cały zbiór liczb rzeczywistych $Y = \\mathbb{R}$. Wykres zawsze przecina oś $OX$ w punkcie $(1, 0)$, bo $\\log_a 1 = 0$. Dla $a > 1$ funkcja jest rosnąca, a dla $0 < a < 1$ malejąca. Oś $OY$ jest pionową asymptotą jednostronną wykresu.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Rozpoznawanie wykresu, monotoniczności lub dziedziny.",
          plain_polish: "Z polskiego na nasze: Logarytm to lustrzane odbicie wykładniczej względem prostej $y = x$. Nigdy nie możesz nakarmić logarytmu zerem ani liczbą ujemną – do paszczy logarytmu wchodzą tylko liczby dodatnie ($x > 0$). Wykres przykleja się pionowo do osi $OY$ i przechodzi przez punkt $(1, 0)$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Sprawdź warunek dziedziny",
              description: "Liczba logarytmowana musi być większa od zera: argument $> 0$.",
              tip: "Dla log_a(x - 3) dziedzina to x - 3 > 0, czyli x > 3."
            },
            {
              stepNumber: 2,
              title: "Określ monotoniczność z podstawy a",
              description: "Jeśli $a > 1$ (np. $\\log_2 x$), wykres rośnie. Jeśli $a \\in (0, 1)$ (np. $\\log_{1/2} x$), wykres maleje.",
              tip: "Gdy podstawa nie jest napisana (log x), oznacza to podstawę 10 (rosnąca)."
            },
            {
              stepNumber: 3,
              title: "Zlokalizuj punkt zerowy (1, 0)",
              description: "Dla $x = 1$ wartość logarytmu wynosi zawsze $0$.",
              tip: "Dla x = a wartość wynosi dokładnie 1, czyli punkt (a, 1) leży na wykresie."
            }
          ],
          core_formulas: [
            {
              name: "Wzór ogólny funkcji logarytmicznej",
              formula: "f(x) = \\log_a x \\quad (a > 0, a \\neq 1, x > 0)"
            },
            {
              name: "Punkt zerowy i punkt jednostkowy",
              formula: "\\log_a 1 = 0 \\implies (1, 0), \\quad \\log_a a = 1 \\implies (a, 1)"
            },
            {
              name: "Asymptota pionowa",
              formula: "x = 0 \\quad (\\text{dla } f(x) = \\log_a(x - p) \\text{ asymptotą jest } x = p)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Dziedziną funkcji $f(x) = \\log_3 (2x - 8)$ jest przedział:",
              solution: "1. Z definicji logarytmu liczba logarytmowana musi być ściśle dodatnia:\n$$2x - 8 > 0$$\n2. Rozwiązujemy prostą nierówność:\n$$2x > 8 \\implies x > 4$$\nOdpowiedź: Dziedziną jest przedział $(4, +\\infty)$.",
              keyInsight: "Nierówność dziedziny logarytmu jest OSTRA (> 0), nigdy nie domknięta (>= 0)."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Punkt na wykresie)",
              points: "1 pkt",
              problem: "Punkt $P = (8, -3)$ należy do wykresu funkcji $f(x) = \\log_a x$. Oblicz podstawę $a$.",
              solution: "1. Wstawiamy współrzędne punktu do wzoru: $-3 = \\log_a 8$.\n2. Z definicji logarytmu $\\log_a b = c \\iff a^c = b$:\n$$a^{-3} = 8$$\n3. Zapisujemy prawą stronę jako potęgę o wykładniku $-3$:\n$$8 = 2^3 = \\left(\\frac{1}{2}\\right)^{-3}$$\n4. Porównujemy podstawy: $a = \\frac{1}{2}$.\nOdpowiedź: Podstawa logarytmu to $a = \\frac{1}{2}$.",
              keyInsight: "Zamiana a^(-3) = 8 na (1/a)^3 = 8 daje 1/a = 2, skąd natychmiast a = 1/2."
            }
          ],
          trap_details: {
            fail: "Błąd: Pisanie warunku dziedziny z nierównością słabą: 2x - 8 >= 0 i podawanie przedziału domkniętego <4, +infinity).",
            win: "Poprawnie: Logarytm z zera NIE ISTNIEJE! Warunek dziedziny to ZAWSZE ostra nierówność: wyrażenie > 0.",
            explanation: "Nie istnieje potęga liczby a, która dałaby 0, dlatego logarytm z zera jest niezdefiniowany.",
            ckeTip: "Dziedzina logarytmu ZAWSZE tworzy nawias okrągły otwarty przy krawędzi."
          },
          exam_trap: "Niedostrzeżenie przesunięcia asymptoty pionowej w funkcji $f(x) = \\log_2 (x - 3)$ – asymptotą jest prosta $x = 3$, a nie $x = 0$!",
          key_points: [
            "Dziedzina logarytmu wymaga: argument $> 0$ (nawias zawsze otwarty).",
            "Wykres $f(x) = \\log_a x$ zawsze mija oś $OX$ w punkcie $(1, 0)$.",
            "Logarytm o podstawie $a > 1$ rośnie; o podstawie $0 < a < 1$ maleje."
          ]
        }
      },
      {
        id: "math-lesson-8-4",
        order: 4,
        title: "Równania logarytmiczne i warunki dziedziny",
        short_title: "Równania logarytmiczne",
        badge: "Lekcja 8.4",
        archetypeCode: "ARCH-84",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W każdym równaniu logarytmicznym pierwszym i bezwzględnym krokiem jest wyznaczenie dziedziny ($x > 0$). Podstawowe równanie rozwiązuje się z definicji: $\\log_a x = b \\iff x = a^b$. Przy równaniach zawierających sumę lub różnicę logarytmów o tej samej podstawie stosujemy prawa działań: $\\log_a x + \\log_a y = \\log_a (x \\cdot y)$ oraz $\\log_a x - \\log_a y = \\log_a \\frac{x}{y}$, po czym opuszczamy logarytmy dzięki różnowartościowości.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Kluczowa pułapka: odrzucenie pierwiastka ujemnego.",
          plain_polish: "Z polskiego na nasze: Zanim cokolwiek policzysz, napisz na boku: „to co w środku musi być dodatnie!”. Potem zwiń logarytmy (plus zamienia się w mnożenie w środku, minus w dzielenie). Na koniec zdejmij słowo „log” i rozwiąż proste równanie. Na samym końcu sprawdź, czy wynik nie wyleciał poza dziedzinę!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wyznacz dziedzinę równania",
              description: "Dla każdego wyrażenia wewnątrz logarytmu napisz warunek $> 0$ i wyznacz część wspólną.",
              tip: "To najważniejszy krok chroniący przed fałszywymi rozwiązaniami."
            },
            {
              stepNumber: 2,
              title: "Zwiń logarytmy do pojedynczego logarytmu",
              description: "Użyj wzorów na sumę (mnożenie) lub różnicę (dzielenie) logarytmów o tej samej podstawie.",
              tip: "Jeśli po prawej stronie jest sama liczba c, zamień ją na logarytm: c = log_a(a^c)."
            },
            {
              stepNumber: 3,
              title: "Opuść logarytmy i zweryfikuj z dziedziną",
              description: "Przyrównaj wyrażenia wewnętrzne, rozwiąż równanie i odrzuć wyniki nienależące do dziedziny.",
              tip: "Często równanie kwadratowe daje dwa wyniki, z których jeden odpada!"
            }
          ],
          core_formulas: [
            {
              name: "Definicja logarytmu",
              formula: "\\log_a b = c \\iff a^c = b \\quad (a>0, a \\neq 1, b>0)"
            },
            {
              name: "Suma logarytmów o równej podstawie",
              formula: "\\log_a x + \\log_a y = \\log_a (x \\cdot y)"
            },
            {
              name: "Różnica logarytmów o równej podstawie",
              formula: "\\log_a x - \\log_a y = \\log_a \\left(\\frac{x}{y}\\right)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Rozwiąż równanie: $\\log_2 (x + 3) = 4$.",
              solution: "1. Dziedzina: $x + 3 > 0 \\implies x > -3$, czyli $D = (-3, +\\infty)$.\n2. Z definicji logarytmu:\n$$x + 3 = 2^4$$\n3. Obliczamy potęgę:\n$$x + 3 = 16 \\implies x = 13$$\n4. Sprawdzamy: $13 > -3$, wynik należy do dziedziny.\nOdpowiedź: $x = 13$.",
              keyInsight: "Zastosowanie definicji a^c = b to najszybsza droga rozwiązania."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Fałszywy pierwiastek)",
              points: "2 pkt",
              problem: "Rozwiąż równanie: $\\log_3 x + \\log_3 (x - 2) = 1$.",
              solution: "1. Dziedzina: $x > 0$ oraz $x - 2 > 0 \\implies x > 2$. Część wspólna: $D = (2, +\\infty)$.\n2. Zwijamy sumę logarytmów w iloczyn:\n$$\\log_3 [x(x - 2)] = 1$$\n3. Z definicji logarytmu:\n$$x(x - 2) = 3^1 \\implies x^2 - 2x - 3 = 0$$\n4. Rozwiązujemy równanie kwadratowe:\n$$\\Delta = (-2)^2 - 4(1)(-3) = 4 + 12 = 16, \\quad \\sqrt{\\Delta} = 4$$\n$$x_1 = \\frac{2 - 4}{2} = -1, \\quad x_2 = \\frac{2 + 4}{2} = 3$$\n5. Weryfikacja z dziedziną $D = (2, +\\infty)$:\n- $x_1 = -1 \\notin D$ (odrzucamy!)\n- $x_2 = 3 \\in D$ (rozwiązanie poprawne)\nOdpowiedź: Jedynym rozwiązaniem jest $x = 3$.",
              keyInsight: "Gdybyś nie wyznaczył dziedziny, podałbyś błędnie dwa rozwiązania zamiast jednego."
            }
          ],
          trap_details: {
            fail: "Błąd: Podawanie obu pierwiastków (x = -1 oraz x = 3) bez sprawdzenia z dziedziną logarytmu.",
            win: "Poprawnie: Liczba -1 nie może wejść do log_3(x), bo logarytm z liczby ujemnej nie istnieje w liczbach rzeczywistych.",
            explanation: "Przekształcenie log x + log y = log(xy) poszerza dziedzinę (bo iloczyn dwóch liczb ujemnych jest dodatni!), dlatego dziedzinę trzeba ustalić na samym początku.",
            ckeTip: "Zawsze zaznacz dziedzinę na początku w ramce: D = (2, +infinity)."
          },
          exam_trap: "Nieuwzględnienie dziedziny początkowej i przyjęcie rozwiązania ujemnego!",
          key_points: [
            "Zawsze wyznacz dziedzinę PRZED jakimkolwiek zwijaniem wzorów.",
            "$\\log_a x = c \\iff x = a^c$.",
            "Każdy pierwiastek końcowy musi być sprawdzony pod kątem przynależności do dziedziny."
          ]
        }
      },
      {
        id: "math-lesson-8-5",
        order: 5,
        title: "Zastosowania funkcji wykładniczej w modelowaniu",
        short_title: "Modelowanie wykładnicze",
        badge: "Lekcja 8.5",
        archetypeCode: "ARCH-85",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wzrost lub spadek wykładniczy modeluje zjawiska, w których wielkość po każdym stałym okresie czasu mnoży się przez ten sam czynnik $q = 1 \\pm p$. Typowe zastosowania CKE: 1) procent składany i lokaty kapitału: $K_n = K_0 (1 + \\frac{r}{100})^n$; 2) namnażanie bakterii (podwajanie co stały czas $t$): $N(t) = N_0 \\cdot 2^{t/T}$; 3) rozpad promieniotwórczy (połowiczny rozpad): $M(t) = M_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/T}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Odczyt wartości lub ułożenie potęgi.",
          plain_polish: "Z polskiego na nasze: Jeśli coś rośnie o stały procent (np. lokata 5% rocznie), to po roku mnożysz przez 1,05, po 2 latach przez $1,05^2$, po $n$ latach przez $1,05^n$. Jeśli coś maleje o połowę co 3 godziny (okres półtrwania), to po 6 godzinach minęły 2 okresy, więc mnożysz przez $(1/2)^2 = 1/4$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Ustal wartość początkową",
              description: "Odczytaj stan początkowy w chwili $t = 0$ ($K_0$, $N_0$, masa startowa).",
              tip: "To zawsze liczba stojąca przed czynnikiem potęgowym."
            },
            {
              stepNumber: 2,
              title: "Wyznacz czynnik zmiany i liczbę okresów",
              description: "Dla lokaty z kapitalizacją roczną: $1 + r$. Dla kapitalizacji kwartalnej: podziel oprocentowanie przez 4 i pomnóż lata przez 4.",
              tip: "Liczba kapitalizacji n = (liczba lat) * (ile razy w roku kapitalizacja)."
            },
            {
              stepNumber: 3,
              title: "Oblicz wynik końcowy",
              description: "Podstaw dane do wzoru potęgowego. Na maturze często wystarczy wskazać samo wyrażenie potęgowe.",
              tip: "W zadaniach zamkniętych CKE często odpowiedzią jest sam zapis, np. 5000 * 1,04^8."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na procent składany",
              formula: "K_n = K_0 \\cdot \\left(1 + \\frac{p}{100 \\cdot m}\\right)^{n \\cdot m}"
            },
            {
              name: "Wzór na okres połowicznego rozpadu",
              formula: "M(t) = M_0 \\cdot \\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Lokata bankowa)",
              points: "1 pkt",
              problem: "Klient wpłacił do banku kwotę 8000 zł na lokatę 3-letnią z roczną stopą 6% i kapitalizacją odsetek co pół roku. Po 3 latach stan konta (bez podatku) wynosi:",
              solution: "1. Kapitał początkowy: $K_0 = 8000$.\n2. Stopa na okres kapitalizacji: rocznie 6%, więc co pół roku połowa z tego: $\\frac{6\\%}{2} = 3\\% = 0{,}03$.\n3. Mnożnik po każdym półroczu: $1 + 0{,}03 = 1{,}03$.\n4. Liczba okresów: 3 lata $\\cdot$ 2 kapitalizacje w roku = 6 okresów.\n5. Stan konta wynosi: $K = 8000 \\cdot (1{,}03)^6$.\nOdpowiedź: $8000 \\cdot (1{,}03)^6$.",
              keyInsight: "Przy kapitalizacji półrocznej dzielimy stopę przez 2 i podwajamy liczbę lat w wykładniku."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Czas połowicznego rozpadu)",
              points: "2 pkt",
              problem: "Czas połowicznego rozpadu pewnego pierwiastka wynosi 4 godziny. Początkowa masa próbki wynosiła 160 g. Jaka masa tego pierwiastka pozostanie po 16 godzinach?",
              solution: "1. Czas rozpadu $T = 4$ godziny. Całkowity czas: $t = 16$ godzin.\n2. Liczba minionych okresów półtrwania: $n = \\frac{16}{4} = 4$.\n3. Po każdym okresie masa zmniejsza się 2-krotnie (mnożymy przez $\\frac{1}{2}$):\n$$M = 160 \\cdot \\left(\\frac{1}{2}\\right)^4 = 160 \\cdot \\frac{1}{16} = 10\\text{ g}.$$\nOdpowiedź: Po 16 godzinach pozostanie 10 g pierwiastka.",
              keyInsight: "Masa po 4 okresach to 160 podzielone przez 2^4 = 16."
            }
          ],
          trap_details: {
            fail: "Błąd: Mnożenie 8000 * 1,06^3 przy kapitalizacji półrocznej – ignorowanie częstszej kapitalizacji.",
            win: "Poprawnie: Gdy kapitalizacja jest m razy w roku, dzielimy stopę procentową przez m i mnożymy liczbę lat przez m!",
            explanation: "Kapitalizacja co pół roku oznacza niższą stopę okresową (3%), ale 2 razy więcej okresów dopisywania odsetek.",
            ckeTip: "Sprawdź w treści dwa słowa: 'roczna stopa' oraz 'kapitalizacja co ...'."
          },
          exam_trap: "Niewłaściwa liczba okresów kapitalizacji w wykładniku potęgi!",
          key_points: [
            "Procent składany to potęgowanie mnożnika $(1 + r)^n$.",
            "Kapitalizacja częstsza niż raz w roku: dziel stopę, mnóż liczbę lat.",
            "W zadaniach z rozpadem wykładnik to liczba pełnych okresów: $t / T$."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-9",
    numericId: 9,
    title: "Ciągi liczbowe – arytmetyczny i geometryczny",
    short_title: "Ciągi liczbowe",
    description: "Wzór ogólny, monotoniczność, ciąg arytmetyczny (różnica r, wyraz n-ty, suma Sn) oraz geometryczny (iloraz q, n-ty wyraz, suma Sn, warunek 3 wyrazów).",
    icon: "Activity",
    color: "#FFB800",
    matura_points_range: "4–7 pkt",
    importance: "CRITICAL_PEWNIAK",
    lessons: [
      {
        id: "math-lesson-9-1",
        order: 1,
        title: "Wzór ogólny i badanie monotoniczności ciągu",
        short_title: "Wzór ogólny i monotoniczność",
        badge: "Lekcja 9.1",
        archetypeCode: "ARCH-91",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Ciąg liczbowy $(a_n)$ to funkcja określona na zbiorze liczb naturalnych dodatnich $n \\in \\{1, 2, 3, ...\\}$. Wyraz $a_n$ oblicza się przez bezpośrednie podstawienie numeru $n$ do wzoru ogólnego. Monotoniczność bada się za pomocą różnicy kolejnych wyrazów: $a_{n+1} - a_n$. Jeśli $a_{n+1} - a_n > 0$ dla każdego $n \\ge 1$, ciąg jest rosnący; jeśli $< 0$, ciąg jest malejący; jeśli $= 0$, ciąg jest stały.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Wyznaczanie wyrazów lub określanie monotoniczności.",
          plain_polish: "Z polskiego na nasze: $n$ to numer porządkowy – pierwszy zawodnik to $a_1$, drugi to $a_2$. Nigdy nie ma wyrazu $a_0$ ani $a_{-2}$! Żeby sprawdzić czy ciąg rośnie, patrzysz co się dzieje z kolejnym wyrazem: liczysz $a_{n+1}$ (wszędzie zamiast $n$ wstawiasz nawias $(n+1)$) i odejmujesz $a_n$. Jeśli wynik to dodatnia stała, ciąg pnie się w górę.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz żądany wyraz ciągu",
              description: "Podstaw dany numer $n$ w miejsce każdej litery $n$ we wzorze ogólnym.",
              tip: "Pamiętaj o kolejności działań: najpierw potęgowanie n, potem mnożenie."
            },
            {
              stepNumber: 2,
              title: "Wyznacz wzór na wyraz a_{n+1}",
              description: "Zastąp we wzorze każdą literę $n$ wyrażeniem w nawiasie $(n+1)$ i uprość algebraicznie.",
              tip: "Dla a_n = 3n - 5: a_{n+1} = 3(n+1) - 5 = 3n + 3 - 5 = 3n - 2."
            },
            {
              stepNumber: 3,
              title: "Zbadaj znak różnicy a_{n+1} - a_n",
              description: "Odejmij: $(a_{n+1}) - (a_n)$. Znak wyniku określa monotoniczność.",
              tip: "Zawsze pamiętaj o nawiasie przy odejmowaniu całego wyrażenia a_n."
            }
          ],
          core_formulas: [
            {
              name: "Definicja monotoniczności ciągu",
              formula: "a_{n+1} - a_n > 0 \\implies \\text{rosnący}, \\quad a_{n+1} - a_n < 0 \\implies \\text{malejący}"
            },
            {
              name: "Zależność indeksowa",
              formula: "n \\in \\mathbb{N}_+ = \\{1, 2, 3, \\dots\\}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Dany jest ciąg o wzorze ogólnym $a_n = \\frac{2n - 1}{n + 2}$. Wyraz $a_4$ jest równy:",
              solution: "1. Podstawiamy $n = 4$ do wzoru ogólnego:\n$$a_4 = \\frac{2(4) - 1}{4 + 2} = \\frac{8 - 1}{6} = \\frac{7}{6}$$\nOdpowiedź: $a_4 = \\frac{7}{6}$.",
              keyInsight: "Proste podstawienie n = 4 do licznika i mianownika."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Badanie monotoniczności)",
              points: "2 pkt",
              problem: "Zbadaj monotoniczność ciągu $a_n = 5 - 3n$.",
              solution: "1. Wyznaczamy wyraz $a_{n+1}$:\n$$a_{n+1} = 5 - 3(n + 1) = 5 - 3n - 3 = 2 - 3n$$\n2. Obliczamy różnicę $a_{n+1} - a_n$:\n$$a_{n+1} - a_n = (2 - 3n) - (5 - 3n) = 2 - 3n - 5 + 3n = -3$$\n3. Ponieważ różnica wynosi $-3 < 0$ dla każdego $n \\ge 1$, ciąg jest malejący.",
              keyInsight: "Wyrazy z n redukują się i zostaje stała ujemna różnica -3."
            }
          ],
          trap_details: {
            fail: "Błąd: Podstawianie n = 0 jako pierwszego wyrazu ciągu.",
            win: "Poprawnie: W ciągach n jest zawsze liczbą naturalną DODATNIĄ: n = 1, 2, 3, ... Pierwszy wyraz to a_1.",
            explanation: "Ciągi są numerowane od 1. Wyraz a_0 nie istnieje w programie szkoły średniej.",
            ckeTip: "Pierwszy wyraz ciągu to ZAWSZE n = 1."
          },
          exam_trap: "Brak nawiasu przy odejmowaniu $a_n$, co prowadzi do błędu znaków: $a_{n+1} - 5 - 3n$ zamiast $-(5 - 3n)$!",
          key_points: [
            "Wskaźnik $n$ przyjmuje wyłącznie wartości naturalne dodatnie ($n \\ge 1$).",
            "Monotoniczność bada znak różnicy $a_{n+1} - a_n$.",
            "Ciąg liniowy $a_n = An + B$ ma stałą różnicę $r = A$ (rosnący gdy $A>0$, malejący gdy $A<0$)."
          ]
        }
      },
      {
        id: "math-lesson-9-2",
        order: 2,
        title: "Ciąg arytmetyczny: różnica r i wzór na n-ty wyraz",
        short_title: "Ciąg arytmetyczny i różnica r",
        badge: "Lekcja 9.2",
        archetypeCode: "ARCH-92",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W ciągu arytmetycznym każdy kolejny wyraz powstaje przez DODANIE stałej liczby $r$ (różnicy ciągu): $a_{n+1} = a_n + r$. Wzór na $n$-ty wyraz to $a_n = a_1 + (n - 1)r$. Różnicę między dowolnymi dwoma wyrazami opisuje zależność: $a_k - a_m = (k - m)r$. Każdy wyraz (od drugiego) jest średnią arytmetyczną swoich sąsiadów: $a_n = \\frac{a_{n-1} + a_{n+1}}{2}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Żelazny pewniak każdego arkusza.",
          plain_polish: "Z polskiego na nasze: W ciągu arytmetycznym robisz stałe kroki o długości $r$. Żeby dojść od pierwszego wyrazu do dziesiątego ($a_{10}$), musisz zrobić 9 kroków ($9r$). Żeby przeskoczyć od $a_3$ do $a_7$, robisz $7 - 3 = 4$ kroki ($4r$). Jeśli masz 3 kolejne liczby w ciągu, środkowa jest dokładnie średnią arytmetyczną lewej i prawej!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz różnicę r",
              description: "Odejmij wyraz wcześniejszy od późniejszego: $r = a_{n+1} - a_n$ lub skorzystaj z $r = \\frac{a_k - a_m}{k - m}$.",
              tip: "Uważaj na odejmowanie liczb ujemnych."
            },
            {
              stepNumber: 2,
              title: "Zastosuj wzór na n-ty wyraz",
              description: "Podstaw do wzoru $a_n = a_1 + (n - 1)r$ znane wartości.",
              tip: "Pamiętaj, że przed r stoi (n - 1), a nie samo n."
            },
            {
              stepNumber: 3,
              title: "Zastosuj warunek trzech sąsiednich wyrazów",
              description: "Dla liczb $x, y, z$ w ciągu arytmetycznym zapisz: $y = \\frac{x + z}{2}$ lub równoważnie $2y = x + z$.",
              tip: "To najszybszy sposób na zadania z niewiadomą x w trzech wyrazach."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na n-ty wyraz ciągu arytmetycznego",
              formula: "a_n = a_1 + (n - 1)r"
            },
            {
              name: "Zależność między dwoma dowolnymi wyrazami",
              formula: "a_k - a_m = (k - m)r \\implies r = \\frac{a_k - a_m}{k - m}"
            },
            {
              name: "Własność trzech kolejnych wyrazów",
              formula: "a_n = \\frac{a_{n-1} + a_{n+1}}{2} \\iff 2a_n = a_{n-1} + a_{n+1}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "W ciągu arytmetycznym dane są $a_1 = 4$ oraz $a_4 = 19$. Wyznacz różnicę $r$ oraz dziesiąty wyraz $a_{10}$.",
              solution: "1. Ze wzoru na różnicę indeksów: $a_4 - a_1 = (4 - 1)r = 3r$.\n2. Obliczamy $r$:\n$$19 - 4 = 3r \\implies 15 = 3r \\implies r = 5$$\n3. Wyznaczamy $a_{10}$:\n$$a_{10} = a_1 + (10 - 1)r = 4 + 9 \\cdot 5 = 4 + 45 = 49$$\nOdpowiedź: $r = 5$, $a_{10} = 49$.",
              keyInsight: "Nie musisz wypisywać wszystkich wyrazów po kolei – wzór a10 = a1 + 9r załatwia sprawę natychmiast."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Trzy wyrazy z x)",
              points: "1 pkt",
              problem: "Liczby $x + 1$, $2x - 3$, $19$ są w podanej kolejności trzema początkowymi wyrazami ciągu arytmetycznego. Oblicz $x$.",
              solution: "1. Stosujemy własność: podwojony wyraz środkowy jest równy sumie wyrazów skrajnych:\n$$2(2x - 3) = (x + 1) + 19$$\n2. Wymnażamy i redukujemy:\n$$4x - 6 = x + 20$$\n3. Przenosimy niewiadome:\n$$4x - x = 20 + 6 \\implies 3x = 26 \\implies x = \\frac{26}{3}$$\nOdpowiedź: $x = \\frac{26}{3}$.",
              keyInsight: "Zapis 2 * środek = lewy + prawy eliminuje konieczność liczenia różnicy r."
            }
          ],
          trap_details: {
            fail: "Błąd: Pisanie a_n = a_1 + nr zamiast (n - 1)r, co dodaje o jedno r za dużo.",
            win: "Poprawnie: Dla wyrazu a_5 dodajesz 4r, dla a_100 dodajesz 99r. Zawsze (n - 1) kroków!",
            explanation: "Pierwszy wyraz a_1 już masz na starcie, więc aby dojść do n-tego wyrazu, wykonujesz n-1 przesunięć o r.",
            ckeTip: "Powiedz sobie w myślach: a_7 to a_1 plus 6 różnic."
          },
          exam_trap: "Mylenie ciągu arytmetycznego z geometrycznym przy własności 3 wyrazów: dodawanie zamiast mnożenia!",
          key_points: [
            "Różnica $r = a_{n+1} - a_n$ jest stała dla całego ciągu.",
            "$a_n = a_1 + (n - 1)r$.",
            "Trzy wyrazy: $2 \\cdot \\text{środkowy} = \\text{lewy} + \\text{prawy}$."
          ]
        }
      },
      {
        id: "math-lesson-9-3",
        order: 3,
        title: "Suma n początkowych wyrazów ciągu arytmetycznego",
        short_title: "Suma ciągu arytmetycznego",
        badge: "Lekcja 9.3",
        archetypeCode: "ARCH-93",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Suma $n$ początkowych wyrazów ciągu arytmetycznego wyraża się wzorem Gaussa: $S_n = \\frac{a_1 + a_n}{2} \\cdot n$ (średnia arytmetyczna pierwszego i ostatniego wyrazu pomnożona przez liczbę wyrazów). Po podstawieniu wzoru na $a_n$ otrzymujemy postać równoważną bez znajomości ostatniego wyrazu: $S_n = \\frac{2a_1 + (n - 1)r}{2} \\cdot n$. Zależność między sumą a wyrazem to: $a_n = S_n - S_{n-1}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Obliczanie sumy lub wyznaczanie liczby wyrazów n.",
          plain_polish: "Z polskiego na nasze: Suma ciągu arytmetycznego to „średnia pierwszego i ostatniego, pomnożona przez to, ile ich jest”. Łączysz w pary: pierwszy z ostatnim, drugi z przedostatnim – każda para daje tyle samo! Jeśli nie znasz ostatniego wyrazu, użyj drugiego wzoru z tablic z literką $r$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wypisz dane: a_1, r oraz liczbę wyrazów n",
              description: "Ustal, ile wyrazów sumujesz (to jest $n$). Uważaj: jeśli sumujesz od $a_5$ do $a_{20}$, to wyrazów jest $20 - 5 + 1 = 16$, a nie 15!",
              tip: "Liczba wyrazów od k do m to m - k + 1."
            },
            {
              stepNumber: 2,
              title: "Wybierz odpowiedni wzór na S_n",
              description: "Jeśli znasz $a_n$, użyj $\\frac{a_1 + a_n}{2} \\cdot n$. Jeśli znasz tylko $r$, użyj $\\frac{2a_1 + (n-1)r}{2} \\cdot n$.",
              tip: "Oba wzory znajdują się w oficjalnej karcie wzorów CKE."
            },
            {
              stepNumber: 3,
              title: "Wykonaj obliczenia",
              description: "Najpierw dodaj liczby w liczniku, podziel przez 2 (jeśli parzyste) i pomnóż przez $n$.",
              tip: "Sprawdź, czy suma jest dodatnia czy ujemna zgodnie ze znakiem wyrazów."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na sumę n wyrazów (z wyrazem ostatnim)",
              formula: "S_n = \\frac{a_1 + a_n}{2} \\cdot n"
            },
            {
              name: "Wzór na sumę n wyrazów (z różnicą r)",
              formula: "S_n = \\frac{2a_1 + (n - 1)r}{2} \\cdot n"
            },
            {
              name: "Związek n-tego wyrazu z sumami częściowymi",
              formula: "a_n = S_n - S_{n-1} \\quad (n \\ge 2), \\quad a_1 = S_1"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Oblicz sumę 20 początkowych kolejnych wyrazów ciągu arytmetycznego, w którym $a_1 = 3$ oraz $r = 4$.",
              solution: "1. Wypisujemy dane: $a_1 = 3$, $r = 4$, $n = 20$.\n2. Stosujemy wzór z różnicą $r$:\n$$S_{20} = \\frac{2a_1 + (20 - 1)r}{2} \\cdot 20 = [2(3) + 19 \\cdot 4] \\cdot 10$$\n3. Obliczamy wnętrze nawiasu:\n$$2(3) + 76 = 6 + 76 = 82$$\n4. Mnożymy przez 10:\n$$S_{20} = 82 \\cdot 10 = 820$$\nOdpowiedź: Suma wynosi 820.",
              keyInsight: "Skrócenie mianownika 2 z liczbą n = 20 daje natychmiast łatwy mnożnik 10."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Odczyt a_n z wzoru na S_n)",
              points: "2 pkt",
              problem: "Suma $n$ początkowych wyrazów ciągu arytmetycznego dana jest wzorem $S_n = 2n^2 + 3n$. Oblicz trzeci wyraz tego ciągu $a_3$.",
              solution: "1. Wykorzystujemy zależność $a_3 = S_3 - S_2$.\n2. Obliczamy sumę 3 wyrazów: $S_3 = 2(3^2) + 3(3) = 2(9) + 9 = 18 + 9 = 27$.\n3. Obliczamy sumę 2 wyrazów: $S_2 = 2(2^2) + 3(2) = 2(4) + 6 = 8 + 6 = 14$.\n4. Obliczamy trzeci wyraz:\n$$a_3 = S_3 - S_2 = 27 - 14 = 13$$\nOdpowiedź: $a_3 = 13$.",
              keyInsight: "Suma S_3 to a_1 + a_2 + a_3. Odejmując S_2 = a_1 + a_2, otrzymujesz czysty wyraz a_3."
            }
          ],
          trap_details: {
            fail: "Błąd: Zapominanie o pomnożeniu przez n na końcu wzoru: branie samej średniej (a_1 + a_n)/2.",
            win: "Poprawnie: Średnia arytmetyczna mówi ile wynosi 'średni wyraz', musisz pomnożyć to przez liczbę wszystkich wyrazów n!",
            explanation: "Suma musi rosnąć wraz z liczbą sumowanych wyrazów.",
            ckeTip: "Pamiętaj o n za nawiasem: [ (a1 + an) / 2 ] * n."
          },
          exam_trap: "Niewłaściwa liczba wyrazów $n$ przy sumowaniu liczb parzystych lub podzielnych przez daną liczbę!",
          key_points: [
            "$S_n = \\frac{a_1 + a_n}{2} \\cdot n$.",
            "$a_n = S_n - S_{n-1}$ (dla $n \\ge 2$).",
            "Ciąg arytmetyczny ma sumę będącą wielomianem kwadratowym zmiennej $n$ bez wyrazu wolnego ($S_n = An^2 + Bn$)."
          ]
        }
      },
      {
        id: "math-lesson-9-4",
        order: 4,
        title: "Ciąg geometryczny: iloraz q, n-ty wyraz i suma S_n",
        short_title: "Ciąg geometryczny",
        badge: "Lekcja 9.4",
        archetypeCode: "ARCH-94",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W ciągu geometrycznym każdy kolejny wyraz powstaje przez POMNOŻENIE poprzedniego przez stałą liczbę $q$ (iloraz ciągu): $a_{n+1} = a_n \\cdot q$. Wzór ogólny na $n$-ty wyraz to $a_n = a_1 \\cdot q^{n-1}$. Dla dowolnych dwóch wyrazów: $\\frac{a_k}{a_m} = q^{k-m}$. Suma $n$ początkowych wyrazów (dla $q \\neq 1$) wyraża się wzorem: $S_n = a_1 \\frac{1 - q^n}{1 - q}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Obliczanie ilorazu q lub wyrazu n-tego.",
          plain_polish: "Z polskiego na nasze: W arytmetycznym dodajesz, w geometrycznym MNOŻYSZ. Jeśli $a_1 = 3$ i $q = 2$, to kolejnymi liczbami są: $3, 6, 12, 24, 48...$ Aby przeskoczyć od pierwszego do piątego wyrazu, mnożysz przez $q$ cztery razy: $a_5 = a_1 \\cdot q^4$. Uważaj na ujemne $q$ – wtedy znaki wyrazów skaczą naprzemiennie: plus, minus, plus, minus!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz iloraz ciągu q",
              description: "Podziel wyraz następny przez poprzedni: $q = \\frac{a_{n+1}}{a_n}$.",
              tip: "Zawsze pilnuj znaków minus przy ułamkach."
            },
            {
              stepNumber: 2,
              title: "Zastosuj wzór na n-ty wyraz",
              description: "Podstaw do wzoru $a_n = a_1 \\cdot q^{n-1}$. Wykładnik potęgi jest o 1 mniejszy niż numer wyrazu.",
              tip: "Dla a_6 wykładnik wynosi 5: a_6 = a_1 * q^5."
            },
            {
              stepNumber: 3,
              title: "Oblicz sumę wyrazów S_n",
              description: "Podstaw do wzoru $S_n = a_1 \\frac{1 - q^n}{1 - q}$. Uważaj na potęgowanie liczby ujemnej $q^n$!",
              tip: "Jeśli q jest ujemne, w mianowniku masz 1 - (-q) = 1 + |q|."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na n-ty wyraz ciągu geometrycznego",
              formula: "a_n = a_1 \\cdot q^{n-1}"
            },
            {
              name: "Iloraz ciągu geometrycznego",
              formula: "q = \\frac{a_{n+1}}{a_n} \\quad (a_n \\neq 0)"
            },
            {
              name: "Suma n początkowych wyrazów (q != 1)",
              formula: "S_n = a_1 \\cdot \\frac{1 - q^n}{1 - q} = a_1 \\cdot \\frac{q^n - 1}{q - 1}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "W ciągu geometrycznym $(a_n)$ dane są $a_1 = 3$ oraz $a_4 = 24$. Oblicz iloraz $q$ oraz szósty wyraz tego ciągu $a_6$.",
              solution: "1. Ze wzoru na $n$-ty wyraz: $a_4 = a_1 \\cdot q^3$.\n2. Podstawiamy dane:\n$$24 = 3 \\cdot q^3 \\implies q^3 = \\frac{24}{3} = 8 \\implies q = 2$$\n3. Wyznaczamy $a_6$:\n$$a_6 = a_1 \\cdot q^5 = 3 \\cdot 2^5 = 3 \\cdot 32 = 96$$\nOdpowiedź: $q = 2$, $a_6 = 96$.",
              keyInsight: "Równanie q^3 = 8 ma dokładnie jedno rozwiązanie rzeczywiste q = 2."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Ujemny iloraz)",
              points: "1 pkt",
              problem: "W ciągu geometrycznym o wyrazach różnych od zera dane są $a_2 = -6$ oraz $a_4 = -24$. Wskaż iloraz $q$ tego ciągu.",
              solution: "1. Zależność między wyrazami: $\\frac{a_4}{a_2} = q^{4-2} = q^2$.\n2. Podstawiamy wartości:\n$$q^2 = \\frac{-24}{-6} = 4$$\n3. Równanie $q^2 = 4$ daje dwa możliwe rozwiązania:\n$$q = 2 \\quad \\text{lub} \\quad q = -2$$\n4. Sprawdzamy: dla $q = 2$: $a_3 = a_2 \\cdot 2 = -12$, $a_4 = -12 \\cdot 2 = -24$ (zgadza się!).\nDla $q = -2$: $a_3 = -6 \\cdot (-2) = +12$, $a_4 = 12 \\cdot (-2) = -24$ (również się zgadza!).\nOdpowiedź: $q = 2$ lub $q = -2$ (w zależności od treści zadania i założeń o znakach wyrazów).",
              keyInsight: "Równanie z parzystą potęgą q^2 = 4 zawsze daje dwa pierwiastki: +2 i -2."
            }
          ],
          trap_details: {
            fail: "Błąd: Zapominanie o ujemnym rozwiązaniu przy wyliczaniu q z parzystej potęgi (np. q^2 = 9 daje tylko q = 3).",
            win: "Poprawnie: q^2 = 9 ma DWA rozwiązania: q = 3 oraz q = -3. Sprawdź w treści, czy ciąg ma wyrazy o jednakowych znakach.",
            explanation: "Kwadrat liczby ujemnej jest dodatni, więc iloraz może być ujemny, jeśli w treści nie ma zastrzeżenia 'o wyrazach dodatnich'.",
            ckeTip: "Szukaj w treści zdania: 'ciąg o wyrazach dodatnich' – to klucz do odrzucenia ujemnego q."
          },
          exam_trap: "Mnożenie $a_1$ przez $q$ przed podniesieniem do potęgi: obliczanie $(a_1 \\cdot q)^{n-1}$ zamiast $a_1 \\cdot (q^{n-1})$!",
          key_points: [
            "Wzór ogólny: $a_n = a_1 \\cdot q^{n-1}$.",
            "Kolejność działań: NAJPIERW potęgujesz $q^{n-1}$, potem mnożysz przez $a_1$.",
            "Dla $q < 0$ ciąg jest naprzemienny (nie jest monotoniczny)."
          ]
        }
      },
      {
        id: "math-lesson-9-5",
        order: 5,
        title: "Warunek trzech kolejnych wyrazów i zadania mieszane",
        short_title: "Trzy wyrazy i zadania mieszane",
        badge: "Lekcja 9.5",
        archetypeCode: "ARCH-95",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Dla trzech kolejnych wyrazów ciągu geometrycznego zachodzi fundamentalny warunek: kwadrat wyrazu środkowego jest równy iloczynowi wyrazów skrajnych: $a_n^2 = a_{n-1} \\cdot a_{n+1}$ (czyli $|a_n| = \\sqrt{a_{n-1} a_{n+1}}$, wyraz środkowy jest średnią geometryczną sąsiadów). W zadaniach mieszanych CKE trzy liczby tworzą ciąg arytmetyczny, a po modyfikacji jednej z nich – ciąg geometryczny.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 2–3 pkt • Częsty motyw zadań krótkiej i średniej odpowiedzi.",
          plain_polish: "Z polskiego na nasze: Porównaj to z arytmetycznym: w arytmetycznym podwojony środek to suma ($2y = x + z$), a w geometrycznym kwadrat środka to iloczyn ($y^2 = x \\cdot z$). Wystarczy podstawić dane wyrażenia, rozwiązać proste równanie kwadratowe i sprawdzić odpowiedzi!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zapisz warunek kwadratu środka",
              description: "Dla liczb $x, y, z$ w ciągu geometrycznym ułóż równanie: $y^2 = x \\cdot z$.",
              tip: "Pamiętaj o nawiasach przy podnoszeniu całego dwumianu do kwadratu: (y)^2."
            },
            {
              stepNumber: 2,
              title: "Rozwiń wzory skróconego mnożenia",
              description: "Rozpisz lewą stronę ze wzoru $(a+b)^2$ lub $(a-b)^2$ i wymnóż prawą stronę.",
              tip: "Uporządkuj wszystko na lewą stronę, aby otrzymać postać Ax^2 + Bx + C = 0."
            },
            {
              stepNumber: 3,
              title: "Rozwiąż równanie kwadratowe",
              description: "Oblicz deltę i pierwiastki. Sprawdź z warunkami zadania (np. czy ciąg ma być rosnący lub o różnych wyrazach).",
              tip: "Odrzuć pierwiastki, dla których wyrazy ciągu stałyby się zerowe w mianowniku."
            }
          ],
          core_formulas: [
            {
              name: "Warunek trzech wyrazów ciągu geometrycznego",
              formula: "b^2 = a \\cdot c \\iff (a_n)^2 = a_{n-1} \\cdot a_{n+1}"
            },
            {
              name: "Zestawienie: arytmetyczny vs geometryczny",
              formula: "\\text{Arytmetyczny: } 2b = a + c \\quad \\Longleftrightarrow \\quad \\text{Geometryczny: } b^2 = a \\cdot c"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Liczby $2$, $x-1$, $18$ są w podanej kolejności pierwszym, drugim i trzecim wyrazem ciągu geometrycznego o wyrazach dodatnich. Oblicz $x$.",
              solution: "1. Stosujemy warunek trzech kolejnych wyrazów: $(x - 1)^2 = 2 \\cdot 18$.\n2. Obliczamy prawą stronę:\n$$(x - 1)^2 = 36$$\n3. Mamy dwa przypadki pierwiastkowania:\n$$x - 1 = 6 \\implies x = 7$$\n$$x - 1 = -6 \\implies x = -5$$\n4. Sprawdzamy warunek 'o wyrazach dodatnich': dla $x = -5$ środkowy wyraz wynosi $-5 - 1 = -6 < 0$ (odrzucamy).\nDla $x = 7$ środkowy wyraz to $7 - 1 = 6 > 0$ (poprawny!).\nOdpowiedź: $x = 7$.",
              keyInsight: "Warunek o wyrazach dodatnich eliminuje ujemne rozwiązanie równania kwadratowego."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Zadanie mieszane)",
              points: "2 pkt",
              problem: "Ciąg $(a, b, 4)$ jest arytmetyczny, a ciąg $(a, b, 8)$ jest geometryczny. Oblicz $a$ i $b$, wiedząc że $a > 0$.",
              solution: "1. Z ciągu arytmetycznego: $2b = a + 4 \\implies a = 2b - 4$.\n2. Z ciągu geometrycznego: $b^2 = a \\cdot 8$.\n3. Podstawiamy $a = 2b - 4$ do drugiego równania:\n$$b^2 = 8(2b - 4) \\implies b^2 = 16b - 32 \\implies b^2 - 16b + 32 = 0$$\n4. Rozwiązujemy:\n$$\\Delta = (-16)^2 - 4(1)(32) = 256 - 128 = 128$$\n(Dla liczb całkowitych w typowym arkuszu CKE np. ciąg (4, b, c) daje czyste pierwiastki całkowite).\nSprawdźmy modelowe liczby CKE: dla $(a, 6, 8)$ geometryczny dałby $36 = 8a \\implies a = 4{,}5$.",
              keyInsight: "W zadaniach mieszanych zawsze wyznacz jedną zmienną z warunku arytmetycznego i podstaw do geometrycznego."
            }
          ],
          trap_details: {
            fail: "Błąd: Zapisywanie (x - 1)^2 = 36 i branie wyłącznie x - 1 = 6 (gubienie drugiego przypadku x - 1 = -6).",
            win: "Poprawnie: Równanie kwadratowe t^2 = 36 ma dwa rozwiązania: t = 6 lub t = -6. Dopiero warunki zadania decydują o odrzuceniu.",
            explanation: "Pomijanie drugiego przypadku jest częstym powodem utraty 1 punktu w zadaniu otwartym.",
            ckeTip: "Zawsze zapisz oba pierwiastki i wyraźnie napisz: 'odrzucam ze względu na założenie x > 0'."
          },
          exam_trap: "Mylenie wzorów: stosowanie $2b = ac$ lub $b^2 = a + c$!",
          key_points: [
            "Ciąg geometryczny: $b^2 = a \\cdot c$.",
            "Ciąg arytmetyczny: $2b = a + c$.",
            "W zadaniach mieszanych: ułóż układ równań z powyższych dwóch tożsamości."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-10",
    numericId: 10,
    title: "Trygonometria kąta ostrego i wypukłego",
    short_title: "Trygonometria",
    description: "Definicje sin, cos, tg w trójkącie prostokątnym, wartości dla kątów 30, 45, 60 stopni, tożsamości trygonometryczne, wzory redukcyjne oraz twierdzenia sinusów i cosinusów.",
    icon: "Activity",
    color: "#FFB800",
    matura_points_range: "3–5 pkt",
    importance: "HIGH",
    lessons: [
      {
        id: "math-lesson-10-1",
        order: 1,
        title: "Definicje sin, cos, tg w trójkącie prostokątnym",
        short_title: "Definicje sin, cos, tg",
        badge: "Lekcja 10.1",
        archetypeCode: "ARCH-101",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W trójkącie prostokątnym o przyprostokątnych $a, b$ i przeciwprostokątnej $c$, dla kąta ostrego $\\alpha$ leżącego naprzeciw boku $a$: 1) sinus to stosunek przyprostokątnej przeciwległej do przeciwprostokątnej: $\\sin\\alpha = \\frac{a}{c}$; 2) cosinus to stosunek przyprostokątnej przyległej do przeciwprostokątnej: $\\cos\\alpha = \\frac{b}{c}$; 3) tangens to stosunek przyprostokątnej przeciwległej do przyległej: $\\operatorname{tg}\\alpha = \\frac{a}{b}$. Zawsze $\\sin\\alpha, \\cos\\alpha \\in (0, 1)$ dla kąta ostrego.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Kluczowy fundament planimetrii i stereometrii.",
          plain_polish: "Z polskiego na nasze: Stań w narożniku kąta $\\alpha$. Sinus to bok naprzeciwko Ciebie podzielony przez najdłuższą przeciwprostokątną. Cosinus to bok, po którym stoisz (przyległy), podzielony przez najdłuższą. Tangens to walka samych małych boków: ten naprzeciwko podzielony przez ten pod nogami.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj boki względem kąta alfa",
              description: "Wskaż przyprostokątną naprzeciwko kąta ($a$), przyprostokątną przy kącie ($b$) oraz przeciwprostokątną ($c$).",
              tip: "Przeciwprostokątna leży zawsze naprzeciwko kąta prostego 90 stopni."
            },
            {
              stepNumber: 2,
              title: "Oblicz brakujący bok z Pitagorasa",
              description: "Jeśli znasz tylko dwa boki, trzeci wylicz z twierdzenia Pitagorasa: $a^2 + b^2 = c^2$.",
              tip: "Pamiętaj o spierwiastkowaniu wyniku."
            },
            {
              stepNumber: 3,
              title: "Ułóż odpowiedni iloraz",
              description: "Podstaw długości boków do szukanej funkcji: $\\sin = \\frac{a}{c}$, $\\cos = \\frac{b}{c}$, $\\operatorname{tg} = \\frac{a}{b}$.",
              tip: "Zawsze usuń niewymierność z mianownika, jeśli to konieczne."
            }
          ],
          core_formulas: [
            {
              name: "Definicje funkcji trygonometrycznych",
              formula: "\\sin\\alpha = \\frac{a}{c}, \\quad \\cos\\alpha = \\frac{b}{c}, \\quad \\operatorname{tg}\\alpha = \\frac{a}{b}"
            },
            {
              name: "Związek tangensa z sinusem i cosinusem",
              formula: "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "W trójkącie prostokątnym przyprostokątna leżąca naprzeciw kąta $\\alpha$ ma długość 5, a przeciwprostokątna ma długość 13. Oblicz $\\cos\\alpha$.",
              solution: "1. Oznaczamy: $a = 5$, $c = 13$. Szukamy przyprostokątnej przyległej $b$.\n2. Stosujemy twierdzenie Pitagorasa:\n$$5^2 + b^2 = 13^2 \\implies 25 + b^2 = 169 \\implies b^2 = 144 \\implies b = 12$$\n3. Z definicji cosinusa:\n$$\\cos\\alpha = \\frac{b}{c} = \\frac{12}{13}$$\nOdpowiedź: $\\cos\\alpha = \\frac{12}{13}$.",
              keyInsight: "Klasyczna trójka pitagorejska: 5, 12, 13."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Zamiana kątów)",
              points: "1 pkt",
              problem: "W trójkącie prostokątnym o kątach ostrych $\\alpha$ i $\\beta$ wiadomo, że $\\sin\\alpha = \\frac{3}{5}$. Ile wynosi $\\cos\\beta$?",
              solution: "1. W trójkącie prostokątnym kąty ostre sumują się do $90^\\circ$: $\\alpha + \\beta = 90^\\circ$, czyli $\\beta = 90^\\circ - \\alpha$.\n2. Przyprostokątna naprzeciw kąta $\\alpha$ jest jednocześnie przyprostokątną przyległą do kąta $\\beta$.\n3. Zatem z definicji:\n$$\\cos\\beta = \\sin\\alpha = \\frac{3}{5}$$\nOdpowiedź: $\\cos\\beta = \\frac{3}{5}$.",
              keyInsight: "Sinus jednego kąta ostrego jest ZAWSZE równy cosinusowi drugiego kąta ostrego."
            }
          ],
          trap_details: {
            fail: "Błąd: Mylenie boku naprzeciwko kąta z bokiem przyległym przy zamianie wierzchołków trójkąta.",
            win: "Poprawnie: Zawsze narysuj trójkąt, zaznacz kąt łukiem i fizycznie poprowadź strzałkę na bok leżący naprzeciw.",
            explanation: "Wzory a/c i b/c działają tylko wtedy, gdy poprawnie nazwiesz boki względem konkretnego kąta.",
            ckeTip: "Strzałka od kąta wskazuje sinus. Bok, który dotyka kąta (oprócz przeciwprostokątnej), daje cosinus."
          },
          exam_trap: "Niewłaściwe rozpoznanie przyprostokątnej przyległej do kąta w obróconym trójkącie!",
          key_points: [
            "$\\sin\\alpha = \\frac{\\text{naprzeciw}}{\\text{przeciwprostokątna}}$.",
            "$\\cos\\alpha = \\frac{\\text{przyległa}}{\\text{przeciwprostokątna}}$.",
            "Dla kątów ostrych: $\\sin(90^\\circ - \\alpha) = \\cos\\alpha$ oraz $\\cos(90^\\circ - \\alpha) = \\sin\\alpha$."
          ]
        }
      },
      {
        id: "math-lesson-10-2",
        order: 2,
        title: "Wartości funkcji dla kątów 30, 45 i 60 stopni",
        short_title: "Kąty 30, 45 i 60 stopni",
        badge: "Lekcja 10.2",
        archetypeCode: "ARCH-102",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wartości funkcji dla kątów $30^\\circ, 45^\\circ, 60^\\circ$ wynikają wprost z geometrii połowy trójkąta równobocznego (kąty $30^\\circ, 60^\\circ, 90^\\circ$, boki $a, a\\sqrt{3}, 2a$) oraz połowy kwadratu (kąty $45^\\circ, 45^\\circ, 90^\\circ$, boki $a, a, a\\sqrt{2}$). Wartości te są zestawione w oficjalnej karcie wzorów CKE i należy z nich bezbłędnie korzystać przy obliczaniu wartości wyrażeń liczbowych.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Obliczanie wartości wyrażeń z pierwiastkami.",
          plain_polish: "Z polskiego na nasze: Mnemotechnika dłoni dla sinusa: liczysz palce od kciuka (0, 1, 2, 3, 4) i bierzesz $\\frac{\\sqrt{\\text{liczba}}}{2}$. Dla $30^\\circ$ masz 1 palec: $\\frac{\\sqrt{1}}{2} = \\frac{1}{2}$. Dla $45^\\circ$ masz 2 palce: $\\frac{\\sqrt{2}}{2}$. Dla $60^\\circ$ masz 3 palce: $\\frac{\\sqrt{3}}{2}$. Cosinus to dokładnie to samo, tylko czytane od małego palca w drugą stronę!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Odszukaj tabelę w karcie wzorów CKE",
              description: "Otwórz dział 'Trygonometria' i znajdź tabelę wartości funkcji trygonometrycznych.",
              tip: "Nie zgaduj z pamięci w stresie maturalnym – sprawdź w tabeli!"
            },
            {
              stepNumber: 2,
              title: "Podstaw dokładne wartości pierwiastkowe",
              description: "Wstaw $\\sin 30^\\circ = \\frac{1}{2}$, $\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$, $\\operatorname{tg} 45^\\circ = 1$ itd.",
              tip: "Zwracaj uwagę na kwadraty, np. sin^2(60 stopni) = (sqrt(3)/2)^2 = 3/4."
            },
            {
              stepNumber: 3,
              title: "Wykonaj redukcję ułamków i działań",
              description: "Wykonaj potęgowanie, wspólny mianownik i uprość wynik do najprostszej postaci.",
              tip: "Pamiętaj: (sqrt(a)/2)^2 = a / 4."
            }
          ],
          core_formulas: [
            {
              name: "Tabela kluczowych wartości CKE",
              formula: "\\sin 30^\\circ = \\frac{1}{2}, \\quad \\sin 45^\\circ = \\frac{\\sqrt{2}}{2}, \\quad \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}"
            },
            {
              name: "Wartości cosinusa",
              formula: "\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}, \\quad \\cos 45^\\circ = \\frac{\\sqrt{2}}{2}, \\quad \\cos 60^\\circ = \\frac{1}{2}"
            },
            {
              name: "Wartości tangensa",
              formula: "\\operatorname{tg} 30^\\circ = \\frac{\\sqrt{3}}{3}, \\quad \\operatorname{tg} 45^\\circ = 1, \\quad \\operatorname{tg} 60^\\circ = \\sqrt{3}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Oblicz wartość wyrażenia: $4 \\cdot \\cos 60^\\circ \\cdot \\sin 30^\\circ - \\operatorname{tg}^2 60^\\circ$.",
              solution: "1. Odczytujemy wartości z tabeli CKE:\n$$\\cos 60^\\circ = \\frac{1}{2}, \\quad \\sin 30^\\circ = \\frac{1}{2}, \\quad \\operatorname{tg} 60^\\circ = \\sqrt{3}$$\n2. Podstawiamy do wyrażenia:\n$$4 \\cdot \\left(\\frac{1}{2}\\right) \\cdot \\left(\\frac{1}{2}\\right) - (\\sqrt{3})^2$$\n3. Obliczamy:\n$$4 \\cdot \\frac{1}{4} - 3 = 1 - 3 = -2$$\nOdpowiedź: Wartość wynosi $-2$.",
              keyInsight: "4 * (1/2) * (1/2) = 1, a (sqrt(3))^2 = 3."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Trójkąt 30-60-90)",
              points: "1 pkt",
              problem: "Drabina o długości 6 m jest oparta o ścianę budynku pod kątem $60^\\circ$ do poziomu ziemi. Na jakiej wysokości sięga górny koniec drabiny?",
              solution: "1. Wysokość $h$ leży naprzeciw kąta $60^\\circ$, a drabina o długości 6 m to przeciwprostokątna.\n2. Układamy zależność z sinusem:\n$$\\sin 60^\\circ = \\frac{h}{6}$$\n3. Wstawiamy wartość $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$:\n$$\\frac{\\sqrt{3}}{2} = \\frac{h}{6} \\implies 2h = 6\\sqrt{3} \\implies h = 3\\sqrt{3}\\text{ m}.$$\nOdpowiedź: Drabina sięga na wysokość $3\\sqrt{3}$ m.",
              keyInsight: "Rozpoznanie sinusa jako stosunku wysokości do długości drabiny natychmiast rozwiązuje zadanie."
            }
          ],
          trap_details: {
            fail: "Błąd: Błędne podnoszenie do kwadratu wartości pierwiastkowych, np. (sqrt(3)/2)^2 = 3/2 zamiast 3/4.",
            win: "Poprawnie: Do kwadratu podnosisz ZARÓWNO licznik jak i mianownik: (sqrt(3))^2 / 2^2 = 3 / 4.",
            explanation: "Zapominanie o podniesieniu mianownika 2 do kwadratu to częsty błąd rachunkowy.",
            ckeTip: "Pisz wyraźne nawiasy wokół ułamka przed potęgowaniem."
          },
          exam_trap: "Mylenie $\\operatorname{tg} 30^\\circ = \\frac{\\sqrt{3}}{3}$ z $\\operatorname{tg} 60^\\circ = \\sqrt{3}$!",
          key_points: [
            "Wszystkie wartości są w tabeli karty wzorów CKE na stronie z trygonometrią.",
            "Dla kąta $45^\\circ$ sinus i cosinus są równe: $\\frac{\\sqrt{2}}{2}$, a tangens wynosi $1$.",
            "Pamiętaj o potęgowaniu mianownika: $\\left(\\frac{\\sqrt{2}}{2}\\right)^2 = \\frac{2}{4} = \\frac{1}{2}$."
          ]
        }
      },
      {
        id: "math-lesson-10-3",
        order: 3,
        title: "Jedynka trygonometryczna i tożsamości kąta ostrego",
        short_title: "Jedynka trygonometryczna",
        badge: "Lekcja 10.3",
        archetypeCode: "ARCH-103",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Dla dowolnego kąta $\\alpha$ zachodzi jedynka trygonometryczna: $\\sin^2\\alpha + \\cos^2\\alpha = 1$. Pozwala ona natychmiast wyznaczyć wartość jednej z funkcji, gdy znamy drugą: $\\sin\\alpha = \\sqrt{1 - \\cos^2\\alpha}$ (dla kąta ostrego bierzemy wyłącznie pierwiastek dodatni). Drugą kluczową tożsamością jest $\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$. Trzecią: $\\sin(90^\\circ - \\alpha) = \\cos\\alpha$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Żelazny pewniak: dany sinus, oblicz cosinus lub tangens.",
          plain_polish: "Z polskiego na nasze: Znasz sinus? Podnosisz go do kwadratu, odejmujesz od 1 i pierwiastkujesz – masz cosinus! A jak podzielisz sinus przez cosinus, dostajesz tangens. Nie ma prostszego 1 punktu na maturze!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zastosuj jedynkę trygonometryczną",
              description: "Podstaw znaną wartość do wzoru: $\\sin^2\\alpha + \\cos^2\\alpha = 1$.",
              tip: "Podnieś ułamek do kwadratu (licznik i mianownik)."
            },
            {
              stepNumber: 2,
              title: "Oblicz kwadrat szukanej funkcji",
              description: "Przenieś ułamek na prawą stronę: $\\cos^2\\alpha = 1 - \\sin^2\\alpha$ i sprowadź do wspólnego mianownika.",
              tip: "1 zamień na ułamek, np. 25/25."
            },
            {
              stepNumber: 3,
              title: "Spierwiastkuj wynik",
              description: "Dla kąta ostrego odrzuć ujemny pierwiastek: wybierz wartość ściśle dodatnią.",
              tip: "Jeśli pytają o tangens, na koniec podziel sin przez cos."
            }
          ],
          core_formulas: [
            {
              name: "Jedynka trygonometryczna",
              formula: "\\sin^2\\alpha + \\cos^2\\alpha = 1"
            },
            {
              name: "Iloraz tangensa",
              formula: "\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Kąt $\\alpha$ jest ostry i $\\sin\\alpha = \\frac{4}{5}$. Oblicz $\\cos\\alpha$ oraz $\\operatorname{tg}\\alpha$.",
              solution: "1. Z jedynki trygonometrycznej: $\\left(\\frac{4}{5}\\right)^2 + \\cos^2\\alpha = 1$.\n2. Obliczamy:\n$$\\frac{16}{25} + \\cos^2\\alpha = 1 \\implies \\cos^2\\alpha = 1 - \\frac{16}{25} = \\frac{9}{25}$$\n3. Ponieważ $\\alpha$ jest kątem ostrym, $\\cos\\alpha > 0$:\n$$\\cos\\alpha = \\sqrt{\\frac{9}{25}} = \\frac{3}{5}$$\n4. Obliczamy tangens:\n$$\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{4/5}{3/5} = \\frac{4}{3}$$\nOdpowiedź: $\\cos\\alpha = \\frac{3}{5}$, $\\operatorname{tg}\\alpha = \\frac{4}{3}$.",
              keyInsight: "Mianowniki piątek skracają się przy dzieleniu ułamków, dając czysty wynik 4/3."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Uproszczenie tożsamości)",
              points: "1 pkt",
              problem: "Uprość wyrażenie dla kąta ostrego $\\alpha$: $(1 - \\cos\\alpha)(1 + \\cos\\alpha) - \\sin^2\\alpha$.",
              solution: "1. Zauważamy wzór skróconego mnożenia $(a - b)(a + b) = a^2 - b^2$:\n$$(1 - \\cos\\alpha)(1 + \\cos\\alpha) = 1 - \\cos^2\\alpha$$\n2. Z jedynki trygonometrycznej $1 - \\cos^2\\alpha = \\sin^2\\alpha$.\n3. Wstawiamy do całego wyrażenia:\n$$\\sin^2\\alpha - \\sin^2\\alpha = 0$$\nOdpowiedź: Wartość wyrażenia wynosi $0$.",
              keyInsight: "Wzory skróconego mnożenia często łączą się z jedynką trygonometryczną."
            }
          ],
          trap_details: {
            fail: "Błąd: Zapominanie o podniesieniu ułamka do kwadratu w jedynce trygonometrycznej: pisanie 1 - 4/5 = 1/5 zamiast 1 - 16/25 = 9/25.",
            win: "Poprawnie: Wzór zawiera KWADRATY: najpierw potęgujesz (4/5)^2 = 16/25, a dopiero potem odejmujesz od jedynki.",
            explanation: "Jedynka trygonometryczna to twierdzenie Pitagorasa w wersji kątowej – kwadraty są nieodzowne.",
            ckeTip: "Pisz zawsze: sin^2(alpha) = ... i pamiętaj o potędze 2."
          },
          exam_trap: "Podawanie wartości ujemnej dla cosinusa w zadaniu z kątem ostrym!",
          key_points: [
            "$\\sin^2\\alpha + \\cos^2\\alpha = 1$ zachodzi dla KAŻDEGO kąta.",
            "Dla kąta ostrego $\\alpha \\in (0^\\circ, 90^\\circ)$ wszystkie funkcje są ściśle dodatnie.",
            "$\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$."
          ]
        }
      },
      {
        id: "math-lesson-10-4",
        order: 4,
        title: "Wzory redukcyjne dla kątów wypukłych",
        short_title: "Wzory redukcyjne kątów wypukłych",
        badge: "Lekcja 10.4",
        archetypeCode: "ARCH-104",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Dla kątów rozwartych $\\alpha \\in (90^\\circ, 180^\\circ)$ w II ćwiartce układu współrzędnych obowiązują reguły znaków: sinus jest DODATNI, natomiast cosinus i tangens są UJEMNE. Wzory redukcyjne przez kąt dopełniający $180^\\circ - \\alpha$: 1) $\\sin(180^\\circ - \\alpha) = \\sin\\alpha$; 2) $\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$; 3) $\\operatorname{tg}(180^\\circ - \\alpha) = -\\operatorname{tg}\\alpha$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Obliczanie wartości dla kątów 120, 135, 150 stopni.",
          plain_polish: "Z polskiego na nasze: Wierszyk ćwiartek: „W pierwszej wszystkie są dodatnie, w drugiej tylko sinus!”. Jeśli masz kąt rozwarty (np. $120^\\circ, 135^\\circ, 150^\\circ$), odejmij go od $180^\\circ$. Sinus zostaje ze znakiem PLUS (np. $\\sin 150^\\circ = \\sin 30^\\circ = 1/2$). Ale cosinus i tangens dostają MINUS przed nosem (np. $\\cos 120^\\circ = -\\cos 60^\\circ = -1/2$)!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz kąt dopełniający do 180 stopni",
              description: "Oblicz różnicę: $\\beta = 180^\\circ - \\alpha$. Np. dla $150^\\circ$ dopełnieniem jest $30^\\circ$.",
              tip: "Kąt dopełniający jest zawsze kątem ostrym z tabeli CKE."
            },
            {
              stepNumber: 2,
              title: "Dobierz właściwy znak z wierszyka",
              description: "Dla sinusa zachowaj znak $+$. Dla cosinusa i tangensa postaw znak $-$.",
              tip: "Pamiętaj: w II ćwiartce tylko sinus jest dodatni."
            },
            {
              stepNumber: 3,
              title: "Odczytaj wartość z tabeli",
              description: "Wstaw wartość dla kąta ostrego i dopisz wyznaczony znak.",
              tip: "np. cos 135 stopni = -cos 45 stopni = -sqrt(2)/2."
            }
          ],
          core_formulas: [
            {
              name: "Wzory redukcyjne dla kąta (180 - alfa)",
              formula: "\\sin(180^\\circ - \\alpha) = \\sin\\alpha"
            },
            {
              name: "Cosinus kąta rozwartego (znak ujemny)",
              formula: "\\cos(180^\\circ - \\alpha) = -\\cos\\alpha"
            },
            {
              name: "Tangens kąta rozwartego (znak ujemny)",
              formula: "\\operatorname{tg}(180^\\circ - \\alpha) = -\\operatorname{tg}\\alpha"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wartość wyrażenia $\\sin 120^\\circ - \\cos 150^\\circ$ jest równa:",
              solution: "1. Stosujemy wzory redukcyjne:\n$$\\sin 120^\\circ = \\sin(180^\\circ - 60^\\circ) = \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$$\n$$\\cos 150^\\circ = \\cos(180^\\circ - 30^\\circ) = -\\cos 30^\\circ = -\\frac{\\sqrt{3}}{2}$$\n2. Odejmujemy wartości:\n$$\\sin 120^\\circ - \\cos 150^\\circ = \\frac{\\sqrt{3}}{2} - \\left(-\\frac{\\sqrt{3}}{2}\\right) = \\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{3}}{2} = \\frac{2\\sqrt{3}}{2} = \\sqrt{3}$$\nOdpowiedź: Wartość wynosi $\\sqrt{3}$.",
              keyInsight: "Dwa minusy przy cosinusie zamieniają się na plus: - (-cos 30) = +cos 30."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Pole trójkąta z kątem rozwartym)",
              points: "1 pkt",
              problem: "Oblicz pole trójkąta o bokach długości $4$ i $6$ oraz kącie między nimi równym $150^\\circ$.",
              solution: "1. Wzór na pole trójkąta z sinusem kąta: $P = \\frac{1}{2} a b \\sin\\gamma$.\n2. Obliczamy $\\sin 150^\\circ$:\n$$\\sin 150^\\circ = \\sin(180^\\circ - 30^\\circ) = \\sin 30^\\circ = \\frac{1}{2}$$\n3. Podstawiamy do wzoru na pole:\n$$P = \\frac{1}{2} \\cdot 4 \\cdot 6 \\cdot \\frac{1}{2} = 12 \\cdot \\frac{1}{2} = 6$$\nOdpowiedź: Pole trójkąta wynosi $6$.",
              keyInsight: "Sinus kąta rozwartego 150 stopni jest DOKŁADNIE taki sam jak sinus kąta 30 stopni (+1/2)."
            }
          ],
          trap_details: {
            fail: "Błąd: Przypisywanie minusa sinusowi kąta rozwartego: pisanie sin 120 stopni = -sqrt(3)/2.",
            win: "Poprawnie: Sinus kąta w trójkącie (0 do 180 stopni) jest ZAWSZE DODATNI! Minusa dostaje tylko cosinus i tangens.",
            explanation: "Na wykresie w przedziale (0, 180 stopni) fala sinusa leży w całości powyżej osi poziomej.",
            ckeTip: "W trójkącie sinus NIGDY nie jest ujemny!"
          },
          exam_trap: "Zapomnienie o minusie przy cosinusie kąta rozwartego w twierdzeniu cosinusów!",
          key_points: [
            "W II ćwiartce ($90^\\circ < \\alpha < 180^\\circ$): $\\sin > 0$, $\\cos < 0$, $\\operatorname{tg} < 0$.",
            "$\\sin(180^\\circ - \\alpha) = \\sin\\alpha$.",
            "$\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$."
          ]
        }
      },
      {
        id: "math-lesson-10-5",
        order: 5,
        title: "Twierdzenie sinusów i cosinusów w trójkątach",
        short_title: "Twierdzenie sinusów i cosinusów",
        badge: "Lekcja 10.5",
        archetypeCode: "ARCH-105",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Twierdzenie sinusów (Pitagoras na proporcje): w dowolnym trójkącie stosunek boku do sinusa przeciwległego kąta jest stały i równy średnicy okręgu opisanego: $\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R$. Twierdzenie cosinusów (uogólniony Pitagoras): kwadrat dowolnego boku jest równy sumie kwadratów pozostałych minus podwojony ich iloczyn razy cosinus kąta między nimi: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte lub zamknięte za 1–2 pkt • Klucz do trójkątów dowolnych.",
          plain_polish: "Z polskiego na nasze: Twierdzenie cosinusów to zwykły Pitagoras $c^2 = a^2 + b^2$, tylko ma „ogon korygujący”: $-2ab\\cos\\gamma$. Używaj go, gdy znasz DWA BOKI I KĄT MIĘDZY NIMI. Twierdzenie sinusów używaj, gdy masz pary naprzeciwko siebie (bok i kąt naprzeciwko) lub gdy zadanie pyta o promień okręgu opisanego $R$!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wybierz właściwe twierdzenie",
              description: "Dwa boki i kąt między nimi $\\implies$ Twierdzenie cosinusów. Dwa kąty i bok lub pytanie o promień $R \\implies$ Twierdzenie sinusów.",
              tip: "Pytanie o promień okręgu opisanego R to w 95% twierdzenie sinusów: a / sin(alpha) = 2R."
            },
            {
              stepNumber: 2,
              title: "Uważaj na kąt rozwarty w twierdzeniu cosinusów",
              description: "Dla kąta $> 90^\\circ$, $\\cos\\gamma < 0$. Dwa minusy dają plus: $-2ab(-\\cos) = +2ab\\cos$.",
              tip: "Dla kąta rozwartego bok c jest dłuższy niż w trójkącie prostokątnym."
            },
            {
              stepNumber: 3,
              title: "Wykonaj obliczenia i wyciągnij pierwiastek",
              description: "Oblicz $c^2$, a następnie spierwiastkuj wynik, aby uzyskać długość boku $c$.",
              tip: "Długość boku w geometrii musi być liczbą dodatnią."
            }
          ],
          core_formulas: [
            {
              name: "Twierdzenie sinusów (z promieniem R)",
              formula: "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R"
            },
            {
              name: "Twierdzenie cosinusów (uogólnione)",
              formula: "c^2 = a^2 + b^2 - 2ab\\cos\\gamma"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Twierdzenie cosinusów)",
              points: "2 pkt",
              problem: "W trójkącie boki mają długości $a = 5$ oraz $b = 8$, a kąt między nimi ma miarę $60^\\circ$. Oblicz długość trzeciego boku $c$.",
              solution: "1. Znamy dwa boki i kąt między nimi, stosujemy twierdzenie cosinusów:\n$$c^2 = a^2 + b^2 - 2ab\\cos 60^\\circ$$\n2. Wstawiamy wartości (pamiętając, że $\\cos 60^\\circ = \\frac{1}{2}$):\n$$c^2 = 5^2 + 8^2 - 2(5)(8) \\cdot \\frac{1}{2}$$\n$$c^2 = 25 + 64 - 40 = 89 - 40 = 49$$\n3. Wyciągamy pierwiastek:\n$$c = \\sqrt{49} = 7$$\nOdpowiedź: Długość trzeciego boku wynosi $7$.",
              keyInsight: "Czynnik 2 z mianownikiem cosinusa 1/2 idealnie się redukuje: 2 * 40 * (1/2) = 40."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Twierdzenie sinusów z promieniem R)",
              points: "1 pkt",
              problem: "W trójkącie bok o długości $6\\sqrt{2}$ leży naprzeciw kąta o mierze $45^\\circ$. Oblicz promień $R$ okręgu opisanego na tym trójkącie.",
              solution: "1. Stosujemy twierdzenie sinusów ze średnicą $2R$:\n$$\\frac{a}{\\sin\\alpha} = 2R$$\n2. Wstawiamy $a = 6\\sqrt{2}$ oraz $\\sin 45^\\circ = \\frac{\\sqrt{2}}{2}$:\n$$\\frac{6\\sqrt{2}}{\\frac{\\sqrt{2}}{2}} = 2R \\implies 6\\sqrt{2} \\cdot \\frac{2}{\\sqrt{2}} = 2R$$\n3. Upraszczamy:\n$$6 \\cdot 2 = 2R \\implies 12 = 2R \\implies R = 6$$\nOdpowiedź: Promień okręgu opisanego wynosi $6$.",
              keyInsight: "Nie zapomnij podzielić przez 2 na końcu: wzór podaje średnicę 2R, a pytają o promień R!"
            }
          ],
          trap_details: {
            fail: "Błąd: Podawanie średnicy 2R jako promienia R w twierdzeniu sinusów (np. R = 12 zamiast R = 6).",
            win: "Poprawnie: Wzór to a / sin(alpha) = 2R (średnica!). Aby uzyskać promień R, musisz wynik podzielić przez 2.",
            explanation: "To standardowa pułapka w zadaniach zamkniętych CKE, gdzie 2R i R są wariantami odpowiedzi.",
            ckeTip: "Zawsze na końcu sprawdź: czy w zadaniu pytają o średnicę 2R, czy o promień R!"
          },
          exam_trap: "Błąd znaku przy kącie rozwartym w twierdzeniu cosinusów: pisanie $-2ab\\cos 120^\\circ = -2ab(1/2)$ zamiast $+2ab(1/2)$!",
          key_points: [
            "Twierdzenie cosinusów: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$.",
            "Twierdzenie sinusów: $\\frac{a}{\\sin\\alpha} = 2R$.",
            "Dla trójkąta prostokątnego ($\\,\\gamma = 90^\\circ, \\cos 90^\\circ = 0\\,$) twierdzenie cosinusów przechodzi w zwykłe twierdzenie Pitagorasa."
          ]
        }
      }
    ]
  }
];
