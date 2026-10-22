import { MathTopicBlueprint } from '../mathBlueprintTypes';

export const DZIAL_11_TO_15: MathTopicBlueprint[] = [
  {
    id: "dzial-11",
    numericId: 11,
    title: "Planimetria – trójkąty, czworokąty i okręgi",
    short_title: "Planimetria",
    description: "Pola figur, cechy podobieństwa i skala k^2, własności czworokątów, kąty wpisane i środkowe oraz okręgi wpisane i opisane.",
    icon: "Box",
    color: "#FFB800",
    matura_points_range: "5–8 pkt",
    importance: "CRITICAL_PEWNIAK",
    lessons: [
      {
        id: "math-lesson-11-1",
        order: 1,
        title: "Pola trójkątów i twierdzenie Pitagorasa",
        short_title: "Pola trójkątów i Pitagoras",
        badge: "Lekcja 11.1",
        archetypeCode: "ARCH-111",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Pole trójkąta można obliczyć na kilka sposobów w zależności od danych: 1) wzór klasyczny: $P = \\frac{1}{2}ah$; 2) ze znajomością dwóch boków i kąta między nimi: $P = \\frac{1}{2}ab\\sin\\gamma$; 3) wzór na trójkąt równoboczny: $P = \\frac{a^2\\sqrt{3}}{4}$, z wysokością $h = \\frac{a\\sqrt{3}}{2}$; 4) wzór z promieniem okręgu wpisanego: $P = p \\cdot r$ (gdzie $p = \\frac{a+b+c}{2}$ to połowa obwodu); 5) wzór z promieniem opisanego: $P = \\frac{abc}{4R}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Jeden z największych działów punktowych na maturze.",
          plain_polish: "Z polskiego na nasze: W trójkącie równobocznym nie licz wysokości z Pitagorasa – wykuj wzór z pierwiastkiem z 3: $h = \\frac{a\\sqrt{3}}{2}$ i pole $\\frac{a^2\\sqrt{3}}{4}$. W trójkącie prostokątnym pole to po prostu połowa iloczynu przyprostokątnych: $\\frac{a \\cdot b}{2}$. A jak masz dowolny trójkąt z kątem – bierz wzór z sinusem!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Określ typ trójkąta",
              description: "Równoboczny $\\implies$ wzory z $\\sqrt{3}$. Prostokątny $\\implies$ Pitagoras i $P = \\frac{a \\cdot b}{2}$. Dowolny z kątem $\\implies P = \\frac{1}{2}ab\\sin\\gamma$.",
              tip: "Trójkąt równoramienny zawsze warto przeciąć wysokością na dwa przystające prostokątne."
            },
            {
              stepNumber: 2,
              title: "Oblicz brakujące boki lub wysokość",
              description: "Zastosuj twierdzenie Pitagorasa $a^2 + b^2 = c^2$.",
              tip: "Pamiętaj: przeciwprostokątna c to ZAWSZE najdłuższy bok."
            },
            {
              stepNumber: 3,
              title: "Oblicz pole i sprawdź jednostki",
              description: "Podstaw dane do wybranego wzoru na pole z karty CKE.",
              tip: "Nie zapomnij o ułamku 1/2 na początku wzoru na pole!"
            }
          ],
          core_formulas: [
            {
              name: "Wzór klasyczny i wzór z sinusem",
              formula: "P = \\frac{1}{2} a h = \\frac{1}{2} a b \\sin\\gamma"
            },
            {
              name: "Wzory dla trójkąta równobocznego",
              formula: "h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}"
            },
            {
              name: "Pole z promieniami okręgów",
              formula: "P = p \\cdot r \\quad \\left(p = \\frac{a+b+c}{2}\\right), \\quad P = \\frac{abc}{4R}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Trójkąt równoboczny)",
              points: "1 pkt",
              problem: "Wysokość trójkąta równobocznego jest równa $6\\sqrt{3}$. Oblicz pole tego trójkąta.",
              solution: "1. Ze wzoru na wysokość: $h = \\frac{a\\sqrt{3}}{2}$.\n2. Przyrównujemy: $6\\sqrt{3} = \\frac{a\\sqrt{3}}{2}$.\n3. Dzielimy przez $\\sqrt{3}$ i mnożymy przez 2:\n$$6 = \\frac{a}{2} \\implies a = 12$$\n4. Obliczamy pole:\n$$P = \\frac{a^2\\sqrt{3}}{4} = \\frac{12^2\\sqrt{3}}{4} = \\frac{144\\sqrt{3}}{4} = 36\\sqrt{3}$$\nOdpowiedź: Pole wynosi $36\\sqrt{3}$.",
              keyInsight: "Wyznaczenie boku a ze wzoru na wysokość to standardowy 2-krokowy schemat CKE."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Pole z sinusem)",
              points: "1 pkt",
              problem: "Pole trójkąta o bokach długości $6$ i $10$ jest równe $15$. Oblicz miarę kąta ostrego między tymi bokami.",
              solution: "1. Stosujemy wzór na pole z sinusem: $P = \\frac{1}{2} a b \\sin\\gamma$.\n2. Podstawiamy dane:\n$$15 = \\frac{1}{2} \\cdot 6 \\cdot 10 \\cdot \\sin\\gamma \\implies 15 = 30 \\cdot \\sin\\gamma$$\n3. Wyznaczamy sinus:\n$$\\sin\\gamma = \\frac{15}{30} = \\frac{1}{2}$$\n4. Dla kąta ostrego $\\sin\\gamma = \\frac{1}{2} \\implies \\gamma = 30^\\circ$.\nOdpowiedź: Miara kąta wynosi $30^\\circ$.",
              keyInsight: "Iloraz pola i połowy iloczynu boków daje bezpośrednio wartość sinusa."
            }
          ],
          trap_details: {
            fail: "Błąd: Używanie wzoru a^2 * sqrt(3) / 4 do trójkąta równoramiennego (nie równobocznego!).",
            win: "Poprawnie: Wzór z pierwiastkiem z 3 działa WYŁĄCZNIE dla trójkąta RÓWNOBOCZNEGO (wszystkie 3 boki równe).",
            explanation: "Dla trójkąta równoramiennego opuść wysokość na podstawę, która dzieli podstawę na dwie równe części i policz h z Pitagorasa.",
            ckeTip: "Zanim użyjesz wzoru z sqrt(3)/4, upewnij się 2 razy: czy trójkąt ma na pewno WSZYSTKIE trzy boki równe?"
          },
          exam_trap: "Zapominanie o podzieleniu iloczynu przez 2 przy obliczaniu pola trójkąta!",
          key_points: [
            "Trójkąt równoboczny: $h = \\frac{a\\sqrt{3}}{2}$, $P = \\frac{a^2\\sqrt{3}}{4}$.",
            "Pole trójkąta z kątem: $P = \\frac{1}{2}ab\\sin\\gamma$.",
            "Wysokość w trójkącie równoramiennym dzieli podstawę dokładnie na pół."
          ]
        }
      },
      {
        id: "math-lesson-11-2",
        order: 2,
        title: "Cechy podobieństwa i przystawania trójkątów",
        short_title: "Podobieństwo trójkątów i skala k",
        badge: "Lekcja 11.2",
        archetypeCode: "ARCH-112",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Dwa trójkąty są podobne ($T_1 \\sim T_2$), gdy mają odpowiednio równe kąty i proporcjonalne boki. Cechy podobieństwa: 1) bok-bok-bok (BBB); 2) bok-kąt-bok (BKB); 3) kąt-kąt-kąt (KKK – najczęstsza w arkuszu). Jeśli skala podobieństwa długości wynosi $k = \\frac{a_2}{a_1}$, to stosunek obwodów wynosi $k$, ale STOSUNEK PÓL WYNOSI $k^2$ ($P_2 / P_1 = k^2$).",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Kluczowa pułapka: kwadrat skali k^2 dla pól.",
          plain_polish: "Z polskiego na nasze: Jeśli powiększysz trójkąt 3 razy (skala $k = 3$), to każdy jego bok i obwód rosną 3 razy, ale jego POLE ROŚNIE $3^2 = 9$ RAZY! Pamiętaj: boki to centymetry (skala $k$), a pole to centymetry KWADRATOWE (skala $k^2$).",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Udowodnij podobieństwo (zazwyczaj cecha KKK)",
              description: "Wskaż równe kąty: wierzchołkowe, odpowiadające lub naprzemianległe przy prostych równoległych.",
              tip: "Wystarczy wykazać równość DWÓCH par kątów, bo trzeci wynika z sumy 180 stopni."
            },
            {
              stepNumber: 2,
              title: "Wyznacz skalę podobieństwa k",
              description: "Podziel długość boku trójkąta drugiego przez odpowiadający mu bok trójkąta pierwszego: $k = \\frac{b_2}{b_1}$.",
              tip: "Zawsze dopasowuj boki leżące naprzeciw TYCH SAMYCH kątów!"
            },
            {
              stepNumber: 3,
              title: "Zastosuj zależność dla pól lub obwodów",
              description: "Dla boków i obwodów: $\\text{Obw}_2 = k \\cdot \\text{Obw}_1$. Dla pól figur: $P_2 = k^2 \\cdot P_1$.",
              tip: "Jeśli znasz stosunek pól, wyciągnij pierwiastek, aby poznać skalę boków k = sqrt(P2/P1)."
            }
          ],
          core_formulas: [
            {
              name: "Skala podobieństwa długości (boki, obwody, wysokości)",
              formula: "\\frac{a_2}{a_1} = \\frac{\\text{Obw}_2}{\\text{Obw}_1} = \\frac{h_2}{h_1} = k"
            },
            {
              name: "Stosunek pól figur podobnych (kwadrat skali)",
              formula: "\\frac{P_2}{P_1} = k^2"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Trójkąt $T_1$ o polu $18\\text{ cm}^2$ jest podobny do trójkąta $T_2$ w skali $k = \\frac{2}{3}$. Pole trójkąta $T_2$ jest równe:",
              solution: "1. Stosunek pól trójkątów podobnych jest równy kwadratowi skali: $\\frac{P_2}{P_1} = k^2$.\n2. Obliczamy kwadrat skali:\n$$k^2 = \\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}$$\n3. Wyznaczamy pole $P_2$:\n$$P_2 = k^2 \\cdot P_1 = \\frac{4}{9} \\cdot 18 = 4 \\cdot 2 = 8\\text{ cm}^2$$\nOdpowiedź: Pole trójkąta $T_2$ wynosi $8\\text{ cm}^2$.",
              keyInsight: "Mnożymy przez k^2 = 4/9, a nie przez samo k = 2/3."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Od pól do obwodów)",
              points: "2 pkt",
              problem: "Pola dwóch trójkątów podobnych są równe $16\\text{ cm}^2$ oraz $25\\text{ cm}^2$. Obwód mniejszego trójkąta wynosi $24\\text{ cm}$. Oblicz obwód większego trójkąta.",
              solution: "1. Stosunek pól wynosi:\n$$\\frac{P_2}{P_1} = \\frac{25}{16} = k^2$$\n2. Obliczamy skalę długości $k$, wyciągając pierwiastek kwadratowy:\n$$k = \\sqrt{\\frac{25}{16}} = \\frac{5}{4}$$\n3. Stosunek obwodów jest równy skali $k$:\n$$\\frac{\\text{Obw}_2}{\\text{Obw}_1} = k \\implies \\frac{\\text{Obw}_2}{24} = \\frac{5}{4}$$\n4. Mnożymy przez 24:\n$$\\text{Obw}_2 = 24 \\cdot \\frac{5}{4} = 6 \\cdot 5 = 30\\text{ cm}.$$\nOdpowiedź: Obwód większego trójkąta wynosi $30\\text{ cm}$.",
              keyInsight: "Przejście z pól na obwody ZAWSZE wymaga wyciągnięcia pierwiastka kwadratowego ze stosunku pól."
            }
          ],
          trap_details: {
            fail: "Błąd: Mnożenie pola przez skalę k zamiast przez k^2 (np. 18 * (2/3) = 12 zamiast 8).",
            win: "Poprawnie: Pole powierzchni ma zawsze jednostki kwadratowe, więc MUSI być pomnożone przez k do kwadratu.",
            explanation: "Oba wymiary trójkąta (podstawa i wysokość) zmieniają się w skali k, więc pole zmienia się w skali k * k = k^2.",
            ckeTip: "Pomyśl: 'Pole ma cm^2, więc skala też ma k^2'."
          },
          exam_trap: "Dopasowywanie niewłaściwych boków do proporcji – boki muszą leżeć naprzeciw tych samych kątów!",
          key_points: [
            "Boki i obwody rosną w skali $k$.",
            "Pola rosną w skali $k^2$.",
            "Cecha KKK (kąt-kąt-kąt) to najczęstszy sposób dowodzenia podobieństwa w CKE."
          ]
        }
      },
      {
        id: "math-lesson-11-3",
        order: 3,
        title: "Własności czworokątów: trapez, romb, równoległobok",
        short_title: "Czworokąty: trapez, romb, równoległobok",
        badge: "Lekcja 11.3",
        archetypeCode: "ARCH-113",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W czworokątach kluczowe własności CKE to: 1) Równoległobok: przeciwległe boki i kąty równe, przekątne dzielą się na pół, $P = ah = ab\\sin\\alpha$; 2) Romb: wszystkie boki równe, przekątne przecinają się pod kątem prostym ($90^\\circ$) i dzielą na pół, $P = \\frac{1}{2}d_1 d_2 = ah = a^2\\sin\\alpha$; 3) Trapez: przynajmniej jedna para boków równoległych, suma kątów przy ramieniu wynosi $180^\\circ$, $P = \\frac{a+b}{2} \\cdot h$; w trapezie równoramiennym kąty przy podstawach są równe, a rzut wysokości na dłuższą podstawę daje odcinek $x = \\frac{a-b}{2}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Pewniak planimetryczny arkusza.",
          plain_polish: "Z polskiego na nasze: W rombie przekątne to miecze przecinające się pod kątem prostym – dzielą romb na 4 identyczne trójkąty prostokątne o bokach $\\frac{d_1}{2}, \\frac{d_2}{2}$ i boku $a$ (twierdzenie Pitagorasa!). W trapezie równoramiennym dwie wysokości odcinają na dole prostokąt i dwa równe trójkąciki o podstawie $\\frac{a-b}{2}$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Rozpoznaj figurę i własności kątów",
              description: "Kąty przy jednym ramieniu trapezu i przy sąsiednich bokach równoległoboku sumują się do $180^\\circ$.",
              tip: "W trapezie kąt ostry i rozwarty przy tym samym ramieniu dają 180 stopni."
            },
            {
              stepNumber: 2,
              title: "Wykorzystaj przekątne w rombie",
              description: "Zastosuj twierdzenie Pitagorasa w ćwiartce rombu: $\\left(\\frac{d_1}{2}\\right)^2 + \\left(\\frac{d_2}{2}\\right)^2 = a^2$.",
              tip: "Pole rombu to połowa iloczynu przekątnych: (d1 * d2) / 2."
            },
            {
              stepNumber: 3,
              title: "Rozetnij trapez równoramienny",
              description: "Opuść dwie wysokości na dłuższą podstawę $a$. Otrzymasz odcinek środkowy $b$ oraz dwa równe odcinki boczne $x = \\frac{a - b}{2}$.",
              tip: "Wysokość h obliczysz z Pitagorasa: x^2 + h^2 = c^2 (gdzie c to ramię)."
            }
          ],
          core_formulas: [
            {
              name: "Pola czworokątów",
              formula: "P_{\\text{trapez}} = \\frac{a + b}{2} \\cdot h, \\quad P_{\\text{romb}} = \\frac{d_1 \\cdot d_2}{2} = a^2 \\sin\\alpha"
            },
            {
              name: "Pitagoras w rombie z przekątnymi",
              formula: "\\left(\\frac{d_1}{2}\\right)^2 + \\left(\\frac{d_2}{2}\\right)^2 = a^2"
            },
            {
              name: "Odcinek boczny w trapezie równoramiennym",
              formula: "x = \\frac{a - b}{2} \\implies x^2 + h^2 = c^2"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Romb)",
              points: "1 pkt",
              problem: "Przekątne rombu mają długości 12 i 16. Oblicz długość boku tego rombu.",
              solution: "1. Przekątne rombu przecinają się pod kątem prostym i dzielą na połowy:\n$$\\frac{d_1}{2} = \\frac{12}{2} = 6, \\quad \\frac{d_2}{2} = \\frac{16}{2} = 8$$\n2. W trójkącie prostokątnym bok rombu $a$ jest przeciwprostokątną:\n$$6^2 + 8^2 = a^2 \\implies 36 + 64 = a^2 \\implies a^2 = 100 \\implies a = 10$$\nOdpowiedź: Długość boku rombu wynosi $10$.",
              keyInsight: "Połowy przekątnych 6 i 8 tworzą z bokiem klasyczny trójkąt pitagorejski (3-4-5 pomnożony przez 2)."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Trapez równoramienny)",
              points: "2 pkt",
              problem: "W trapezie równoramiennym podstawy mają długości $a = 14$ oraz $b = 6$, a ramię ma długość $c = 5$. Oblicz pole tego trapezu.",
              solution: "1. Obliczamy długość odcinka bocznego $x$ z rzutu wysokości na dłuższą podstawę:\n$$x = \\frac{a - b}{2} = \\frac{14 - 6}{2} = \\frac{8}{2} = 4$$\n2. Obliczamy wysokość $h$ z twierdzenia Pitagorasa w trójkącie z ramieniem:\n$$x^2 + h^2 = c^2 \\implies 4^2 + h^2 = 5^2 \\implies 16 + h^2 = 25 \\implies h^2 = 9 \\implies h = 3$$\n3. Obliczamy pole trapezu:\n$$P = \\frac{a + b}{2} \\cdot h = \\frac{14 + 6}{2} \\cdot 3 = \\frac{20}{2} \\cdot 3 = 10 \\cdot 3 = 30$$\nOdpowiedź: Pole trapezu wynosi $30$.",
              keyInsight: "Odcinek x = (14 - 6)/2 = 4 to kluczowy krok przed użyciem twierdzenia Pitagorasa."
            }
          ],
          trap_details: {
            fail: "Błąd: Wstawianie całych przekątnych (12^2 + 16^2 = a^2) do Pitagorasa w rombie zamiast ich połówek.",
            win: "Poprawnie: Trójkąt prostokątny tworzą POŁOWY przekątnych: (d1/2)^2 + (d2/2)^2 = a^2.",
            explanation: "Przekątne przecinają się w połowie, więc przyprostokątnymi są połówki przekątnych.",
            ckeTip: "Zawsze najpierw podziel przekątne rombu przez 2, a dopiero potem licz Pitagorasa."
          },
          exam_trap: "Zapominanie o podzieleniu różnicy podstaw przez 2 w trapezie równoramiennym ($x = a - b$ zamiast $(a - b)/2$)!",
          key_points: [
            "W rombie przekątne są prostopadłe: $\\left(\\frac{d_1}{2}\\right)^2 + \\left(\\frac{d_2}{2}\\right)^2 = a^2$.",
            "W trapezie równoramiennym odcinek odcięty wysokością to $x = \\frac{a - b}{2}$.",
            "Kąty przy ramieniu każdego trapezu dają sumę $180^\\circ$."
          ]
        }
      },
      {
        id: "math-lesson-11-4",
        order: 4,
        title: "Kąty środkowe i wpisane oparte na tym samym łuku",
        short_title: "Kąty w okręgu",
        badge: "Lekcja 11.4",
        archetypeCode: "ARCH-114",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W okręgu kąt środkowy ma wierzchołek w środku okręgu, a kąt wpisany na okręgu. Kluczowe twierdzenia CKE: 1) Kąt środkowy oparty na tym samym łuku jest DWA RAZY WIĘKSZY od kąta wpisanego: $\\beta = 2\\alpha$; 2) Wszystkie kąty wpisane oparte na TYM SAMYM łuku mają RÓWNE miary; 3) Kąt wpisany oparty na ŚREDNICY okręgu jest ZAWSZE kątem prostym ($90^\\circ$); 4) Promień poprowadzony do punktu styczności tworzy z prostą styczną kąt prosty ($90^\\circ$).",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Żelazny pewniak każdego arkusza majowego.",
          plain_polish: "Z polskiego na nasze: Środek to 'szef' – ma dwa razy większy kąt niż kąt na brzegu oparty na tym samym łuku! Jeśli wpisany ma $35^\\circ$, środkowy ma $70^\\circ$. A jak kąt wpisany stoi na średnicy (czyli przecina okrąg idealnie przez środek), to ma dokładnie $90^\\circ$. Trójkąt oparty na średnicy to ZAWSZE trójkąt prostokątny!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zlokalizuj łuk, na którym oparte są kąty",
              description: "Poprowadź palcem ramiona kąta do okręgu i sprawdź, czy kończą się w tych samych punktach A i B.",
              tip: "Tylko kąty oparte na TYM SAMYM łuku mają relację beta = 2 * alfa."
            },
            {
              stepNumber: 2,
              title: "Rozpoznaj typ kąta (środkowy czy wpisany)",
              description: "Wierzchołek w punkcie S (środek) $\\implies$ środkowy. Wierzchołek na łuku okręgu $\\implies$ wpisany.",
              tip: "Kąt środkowy jest zawsze 2 razy większy od kąta wpisanego."
            },
            {
              stepNumber: 3,
              title: "Zastosuj własności szczególne",
              description: "Oparty na średnicy $\\implies 90^\\circ$. Trójkąt ze środkiem okręgu $\\implies$ trójkąt równoramienny o ramionach $R$.",
              tip: "Promienie R w trójkącie tworzą równe kąty przy podstawie!"
            }
          ],
          core_formulas: [
            {
              name: "Twierdzenie o kącie środkowym i wpisanym",
              formula: "\\beta = 2\\alpha \\quad (\\text{kąt środkowy } = 2 \\times \\text{kąt wpisany na tym samym łuku})"
            },
            {
              name: "Kąt wpisany oparty na średnicy (Twierdzenie Talesa)",
              formula: "\\alpha = 90^\\circ"
            },
            {
              name: "Kąt między styczną a promieniem",
              formula: "r \\perp k_{\\text{styczna}} \\implies \\angle (r, k) = 90^\\circ"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Kąt środkowy i kąt wpisany są oparte na tym samym łuku okręgu. Suma ich miar jest równa $120^\\circ$. Oblicz miarę kąta wpisanego.",
              solution: "1. Oznaczamy: kąt wpisany to $\\alpha$, wtedy kąt środkowy to $2\\alpha$.\n2. Zapisujemy równanie sumy miar:\n$$\\alpha + 2\\alpha = 120^\\circ \\implies 3\\alpha = 120^\\circ$$\n3. Dzielimy przez 3:\n$$\\alpha = 40^\\circ$$\nOdpowiedź: Miara kąta wpisanego wynosi $40^\\circ$.",
              keyInsight: "Środkowy kąt ma 2 części, wpisany 1 część – razem 3 równe części."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Trójkąt oparty na średnicy)",
              points: "1 pkt",
              problem: "Punkty $A, B, C$ leżą na okręgu o środku $S$. Odcinek $AB$ jest średnicą okręgu, a kąt $\\angle BAC = 32^\\circ$. Oblicz miarę kąta $\\angle ABC$.",
              solution: "1. Ponieważ odcinek $AB$ jest średnicą, kąt wpisany $\\angle ACB$ jest oparty na średnicy, czyli ma miarę $90^\\circ$.\n2. Trójkąt $ABC$ jest trójkątem prostokątnym.\n3. Suma kątów ostrych w trójkącie prostokątnym wynosi $90^\\circ$:\n$$\\angle ABC = 90^\\circ - 32^\\circ = 58^\\circ$$\nOdpowiedź: Miara kąta $\\angle ABC$ wynosi $58^\\circ$.",
              keyInsight: "Średnica okręgu natychmiast generuje kąt prosty 90 stopni przy wierzchołku C."
            }
          ],
          trap_details: {
            fail: "Błąd: Przyjmowanie kąta wpisanego jako 2 razy większego od środkowego (alfa = 2 beta).",
            win: "Poprawnie: To kąt ŚRODKOWY jest duży (2 razy większy!), a wpisany jest MNIEJSZY (połowa środkowego).",
            explanation: "Wierzchołek kąta wpisanego leży dalej (na obwodzie), więc jego rozwarcie jest węższe.",
            ckeTip: "Zapamiętaj: Środek jest GRUBY (2 razy większy), brzeg jest CHUDY (połowa)."
          },
          exam_trap: "Nieuwzględnienie, że kąty muszą być oparte na TYM SAMYM łuku, a nie na łukach dopełniających!",
          key_points: [
            "$\\text{Kąt środkowy} = 2 \\times \\text{kąt wpisany}$ na tym samym łuku.",
            "Kąt wpisany oparty na średnicy ma ZAWSZE $90^\\circ$.",
            "Promień okręgu tworzy ze styczną kąt $90^\\circ$."
          ]
        }
      },
      {
        id: "math-lesson-11-5",
        order: 5,
        title: "Okrąg wpisany i opisany na wielokątach",
        short_title: "Okrąg wpisany i opisany",
        badge: "Lekcja 11.5",
        archetypeCode: "ARCH-115",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W trójkącie równobocznym promienie okręgów stanowią części wysokości: wpisany $r = \\frac{1}{3}h = \\frac{a\\sqrt{3}}{6}$, opisany $R = \\frac{2}{3}h = \\frac{a\\sqrt{3}}{3}$ (stąd $R = 2r$). W trójkącie prostokątnym środek okręgu opisanego leży w połowie przeciwprostokątnej: $R = \\frac{c}{2}$, a promień wpisanego to $r = \\frac{a + b - c}{2}$. W czworokątach: 1) okrąg można opisać $\\iff$ sumy przeciwległych kątów wynoszą $180^\\circ$; 2) okrąg można wpisać $\\iff$ sumy przeciwległych boków są równe: $a + c = b + d$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Kluczowe twierdzenie o sumach boków lub kątów.",
          plain_polish: "Z polskiego na nasze: W czworokątach zapamiętaj prostą zasadę: żeby WPISAĆ okrąg do środka, boki naprzeciwko muszą sumować się po równo (góra + dół = lewo + prawo). Żeby OPISAĆ okrąg na zewnątrz, kąty naprzeciwko muszą dawać $180^\\circ$. A w trójkącie prostokątnym promień opisanego to po prostu połowa najdłuższego boku!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj figurę i rodzaj okręgu",
              description: "Trójkąt równoboczny $\\implies r = \\frac{1}{3}h, R = \\frac{2}{3}h$. Trójkąt prostokątny $\\implies R = \\frac{c}{2}, r = \\frac{a+b-c}{2}$.",
              tip: "W trójkącie prostokątnym przeciwprostokątna c jest średnicą 2R!"
            },
            {
              stepNumber: 2,
              title: "Zastosuj warunek dla czworokąta wpisanego w okrąg",
              description: "Kąty naprzeciw siebie dają $180^\\circ$: $\\alpha + \\gamma = 180^\\circ$ oraz $\\beta + \\delta = 180^\\circ$.",
              tip: "Dotyczy to m.in. każdego trapezu równoramiennego i prostokąta."
            },
            {
              stepNumber: 3,
              title: "Zastosuj warunek dla czworokąta opisanego na okręgu",
              description: "Sumy długości przeciwległych boków są równe: $a + c = b + d$.",
              tip: "Szczególnie ważne w zadaniach z trapezem opisanym na okręgu: a + b = 2c."
            }
          ],
          core_formulas: [
            {
              name: "Promienie w trójkącie równobocznym",
              formula: "r = \\frac{1}{3}h = \\frac{a\\sqrt{3}}{6}, \\quad R = \\frac{2}{3}h = \\frac{a\\sqrt{3}}{3} \\implies R = 2r"
            },
            {
              name: "Promienie w trójkącie prostokątnym",
              formula: "R = \\frac{c}{2}, \\quad r = \\frac{a + b - c}{2}"
            },
            {
              name: "Warunki wpisywalności i opisywalności czworokąta",
              formula: "\\text{Opisany na okręgu: } a + c = b + d \\quad \\Longleftrightarrow \\quad \\text{Wpisany w okrąg: } \\alpha + \\gamma = 180^\\circ"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Czworokąt opisany)",
              points: "1 pkt",
              problem: "Czworokąt $ABCD$ jest opisany na okręgu. Długości boków wynoszą: $|AB| = 7$, $|BC| = 9$, $|CD| = 5$. Oblicz długość boku $DA$.",
              solution: "1. Warunek czworokąta opisanego na okręgu: sumy przeciwległych boków są równe:\n$$|AB| + |CD| = |BC| + |DA|$$\n2. Wstawiamy znane długości:\n$$7 + 5 = 9 + |DA| \\implies 12 = 9 + |DA|$$\n3. Obliczamy $|DA|$:\n$$|DA| = 12 - 9 = 3$$\nOdpowiedź: Długość boku $DA$ wynosi $3$.",
              keyInsight: "Góra + dół = lewo + prawo: 7 + 5 = 9 + 3 = 12."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Trójkąt prostokątny z okręgiem)",
              points: "1 pkt",
              problem: "W trójkącie prostokątnym przyprostokątne mają długości 6 i 8. Oblicz promień $R$ okręgu opisanego oraz promień $r$ okręgu wpisanego.",
              solution: "1. Z twierdzenia Pitagorasa obliczamy przeciwprostokątną $c$:\n$$c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$$\n2. Promień okręgu opisanego to połowa przeciwprostokątnej:\n$$R = \\frac{c}{2} = \\frac{10}{2} = 5$$\n3. Promień okręgu wpisanego:\n$$r = \\frac{a + b - c}{2} = \\frac{6 + 8 - 10}{2} = \\frac{4}{2} = 2$$\nOdpowiedź: $R = 5$, $r = 2$.",
              keyInsight: "W trójkącie prostokątnym nie musisz stosować skomplikowanych wzorów z polem – wzory R = c/2 i r = (a+b-c)/2 dają wynik natychmiast."
            }
          ],
          trap_details: {
            fail: "Błąd: Mylenie warunku boków (a + c = b + d) z warunkiem kątów (alfa + gamma = 180 stopni).",
            win: "Poprawnie: Okrąg w środku (opisany wielokąt) = BOKI przeciwległe równe. Okrąg na zewnątrz (wpisany wielokąt) = KĄTY dają 180 stopni.",
            explanation: "To jedna z najczęstszych pomyłek definicyjnych na maturze podstawowej.",
            ckeTip: "Mnemotechnika: Kółko wpada DO ŚRODKA $\\implies$ Boki ściskają kółko ($a+c=b+d$)."
          },
          exam_trap: "Mylenie promienia wpisanego $r$ z opisanym $R$ w trójkącie równobocznym ($1/3$ vs $2/3$ wysokości)!",
          key_points: [
            "W trójkącie prostokątnym $R = \\frac{c}{2}$ (środek leży na przeciwprostokątnej).",
            "Czworokąt opisany na okręgu: $a + c = b + d$.",
            "Czworokąt wpisany w okrąg: $\\alpha + \\gamma = \\beta + \\delta = 180^\\circ$."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-12",
    numericId: 12,
    title: "Geometria analityczna na płaszczyźnie kartezjańskiej",
    short_title: "Geometria analityczna",
    description: "Odległość i środek odcinka, prosta przez dwa punkty, prostopadłość i równoległość, równanie okręgu oraz punkty wspólne.",
    icon: "Box",
    color: "#FFB800",
    matura_points_range: "4–6 pkt",
    importance: "HIGH",
    lessons: [
      {
        id: "math-lesson-12-1",
        order: 1,
        title: "Odległość dwóch punktów i współrzędne środka odcinka",
        short_title: "Odległość i środek odcinka",
        badge: "Lekcja 12.1",
        archetypeCode: "ARCH-121",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Dla punktów $A = (x_A, y_A)$ i $B = (x_B, y_B)$: 1) Długość odcinka $|AB|$ (odległość punktów) to twierdzenie Pitagorasa na współrzędnych: $|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$; 2) Środek odcinka $S = (x_S, y_S)$ to średnia arytmetyczna współrzędnych końców: $x_S = \\frac{x_A + x_B}{2}$, $y_S = \\frac{y_A + y_B}{2}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Pewniak: obliczenie środka lub wyznaczenie brakującego końca odcinka.",
          plain_polish: "Z polskiego na nasze: Środek odcinka to zwykła średnia arytmetyczna: dodajesz iksy i dzielisz przez 2, dodajesz igreki i dzielisz przez 2. Długość odcinka to Pitagoras: liczysz ile kroków w poziomie ($\\,\\Delta x\\,$), ile kroków w pionie ($\\,\\Delta y\\,$), podnosisz do kwadratu, dodajesz i pierwiastkujesz!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wypisz współrzędne punktów",
              description: "Podpisz precyzyjnie $x_A, y_A, x_B, y_B$. Uważaj na znaki minus.",
              tip: "Minus przed ujemną liczbą daje plus: x_B - (-3) = x_B + 3."
            },
            {
              stepNumber: 2,
              title: "Zastosuj właściwy wzór",
              description: "Dla środka: dodaj i podziel przez 2. Dla odległości: odejmij, podnieś do kwadratu i spierwiastkuj sumę.",
              tip: "Kwadrat liczby ujemnej jest ZAWSZE dodatni!"
            },
            {
              stepNumber: 3,
              title: "Wyznacz brakujący koniec (jeśli dany jest środek)",
              description: "Ułóż równania: $\\frac{x_A + x_B}{2} = x_S \\implies x_B = 2x_S - x_A$.",
              tip: "Środek pomnóż przez 2 i odejmij znany koniec."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na odległość dwóch punktów",
              formula: "|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"
            },
            {
              name: "Współrzędne środka odcinka",
              formula: "S = \\left( \\frac{x_A + x_B}{2}, \\; \\frac{y_A + y_B}{2} \\right)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Długość odcinka)",
              points: "1 pkt",
              problem: "Oblicz odległość punktów $A = (-3, 2)$ oraz $B = (5, -4)$.",
              solution: "1. Stosujemy wzór na długość odcinka:\n$$|AB| = \\sqrt{(5 - (-3))^2 + (-4 - 2)^2}$$\n2. Obliczamy różnice w nawiasach:\n$$5 - (-3) = 5 + 3 = 8, \\quad -4 - 2 = -6$$\n3. Podnosimy do kwadratu i sumujemy:\n$$|AB| = \\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$$\nOdpowiedź: Odległość punktów wynosi $10$.",
              keyInsight: "Kwadrat (-6)^2 = +36, więc pod pierwiastkiem zawsze dodajemy liczby dodatnie."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Wyznaczanie końca odcinka)",
              points: "1 pkt",
              problem: "Punkt $S = (2, -1)$ jest środkiem odcinka $AB$, gdzie $A = (-4, 5)$. Wyznacz współrzędne punktu $B$.",
              solution: "1. Korzystamy ze wzoru na współrzędne środka:\n$$x_S = \\frac{x_A + x_B}{2} \\implies 2 = \\frac{-4 + x_B}{2} \\implies 4 = -4 + x_B \\implies x_B = 8$$\n$$y_S = \\frac{y_A + y_B}{2} \\implies -1 = \\frac{5 + y_B}{2} \\implies -2 = 5 + y_B \\implies y_B = -7$$\n2. Zatem szukany punkt to $B = (8, -7)$.",
              keyInsight: "Mnożymy współrzędne środka przez 2 i odejmujemy współrzędne punktu A."
            }
          ],
          trap_details: {
            fail: "Błąd: Przyjmowanie punktu S jako końca odcinka i liczenie środka między S i A zamiast wyznaczania B.",
            win: "Poprawnie: Uważnie czytaj treść zadania: czy S jest środkiem, czy szukasz środka odcinka SA!",
            explanation: "CKE celowo podaje środek i jeden koniec, aby sprawdzić czy uczeń układa równanie, czy bezmyślnie liczy średnią.",
            ckeTip: "Podkreśl w treści słowo: 'Punkt S jest ŚRODKIEM'."
          },
          exam_trap: "Błąd znaku przy potęgowaniu różnicy: zapis $(-6)^2 = -36$ zamiast $+36$ pod pierwiastkiem!",
          key_points: [
            "Pod pierwiastkiem odległości ZAWSZE mamy sumę liczb nieujemnych: $\\Delta x^2 + \\Delta y^2$.",
            "Środek to średnia: $S = \\left(\\frac{x_A+x_B}{2}, \\frac{y_A+y_B}{2}\\right)$.",
            "Brakujący koniec: $x_B = 2x_S - x_A$ oraz $y_B = 2y_S - y_A$."
          ]
        }
      },
      {
        id: "math-lesson-12-2",
        order: 2,
        title: "Równanie prostej przechodzącej przez dwa punkty",
        short_title: "Równanie prostej przez punkty",
        badge: "Lekcja 12.2",
        archetypeCode: "ARCH-122",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Równanie prostej przechodzącej przez punkty $A=(x_A, y_A)$ i $B=(x_B, y_B)$ można wyznaczyć dwoma sposobami: 1) przez układ równań z niewiadomymi $a$ i $b$ we wzorze $y = ax + b$; 2) wyliczając najpierw współczynnik kierunkowy $a = \\frac{y_B - y_A}{x_B - x_A}$, a następnie wyraz wolny $b = y_A - ax_A$. Postać ogólna prostej to $Ax + By + C = 0$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Kluczowe dla geometrii analitycznej.",
          plain_polish: "Z polskiego na nasze: Współczynnik $a$ to „różnica pionowa przez różnicę poziomą”. Potem bierzesz współrzędne dowolnego punktu, wstawiasz za $x$ i $y$ i w jednej linijce wyliczasz $b$. Jeśli prosta ma $x_A = x_B$, jest pionowa: $x = x_A$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz współczynnik kierunkowy a",
              description: "Oblicz $a = \\frac{y_B - y_A}{x_B - x_A}$. Pilnuj znaków ujemnych w mianowniku.",
              tip: "Gdy mianownik jest równy 0, prosta jest pionowa o równaniu x = stała."
            },
            {
              stepNumber: 2,
              title: "Wstaw współrzędne punktu A lub B",
              description: "Podstaw $a$ oraz $(x_A, y_A)$ do wzoru $y = ax + b$, aby wyznaczyć $b$.",
              tip: "Wybierz punkt z mniejszymi liczbami, najlepiej dodatnimi."
            },
            {
              stepNumber: 3,
              title: "Zapisz gotowe równanie prostej",
              description: "Podaj wynik w postaci kierunkowej $y = ax + b$ lub ogólnej $Ax + By + C = 0$.",
              tip: "Sprawdź, czy drugi punkt leży na wyznaczonej prostej."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na współczynnik kierunkowy",
              formula: "a = \\frac{y_B - y_A}{x_B - x_A} \\quad (x_A \\neq x_B)"
            },
            {
              name: "Postać ogólna prostej",
              formula: "Ax + By + C = 0 \\quad (A^2 + B^2 > 0)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wyznacz równanie prostej przechodzącej przez punkty $A = (1, 3)$ i $B = (3, 7)$.",
              solution: "1. Obliczamy współczynnik $a$:\n$$a = \\frac{7 - 3}{3 - 1} = \\frac{4}{2} = 2$$\n2. Wstawiamy punkt $A(1, 3)$ do równania $y = 2x + b$:\n$$3 = 2(1) + b \\implies 3 = 2 + b \\implies b = 1$$\n3. Równanie prostej to $y = 2x + 1$.",
              keyInsight: "Sprawdzenie z punktem B: y = 2(3) + 1 = 7, wynik jest w 100% poprawny."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Przekształcenie do postaci ogólnej)",
              points: "1 pkt",
              problem: "Prosta przechodzi przez punkty $A = (0, -2)$ i $B = (4, 1)$. Zapisz jej równanie w postaci ogólnej $Ax + By + C = 0$.",
              solution: "1. Punkt $(0, -2)$ to przecięcie z osią $OY$, więc $b = -2$.\n2. Obliczamy współczynnik $a$:\n$$a = \\frac{1 - (-2)}{4 - 0} = \\frac{3}{4}$$\n3. Postać kierunkowa: $y = \\frac{3}{4}x - 2$.\n4. Przekształcamy do postaci ogólnej: mnożymy przez 4:\n$$4y = 3x - 8 \\implies 3x - 4y - 8 = 0$$\nOdpowiedź: $3x - 4y - 8 = 0$.",
              keyInsight: "Mnożenie przez mianownik 4 usuwa ułamki i daje czyste liczby całkowite w postaci ogólnej."
            }
          ],
          trap_details: {
            fail: "Błąd: Zamiana kolejności współrzędnych i obliczanie delta x / delta y zamiast delta y / delta x.",
            win: "Poprawnie: Współczynnik kierunkowy to ZAWSZE igreki na górze, iksy na dole: a = (y_B - y_A) / (x_B - x_A).",
            explanation: "Igreki odpowiadają za pion (wysokość), iksy za poziom.",
            ckeTip: "Pamiętaj: 'Y jak Wysokość (na górze), X jak grunt (na dole)'."
          },
          exam_trap: "Błąd rachunkowy przy odejmowaniu liczb ujemnych w mianowniku!",
          key_points: [
            "$a = \\frac{y_B - y_A}{x_B - x_A}$ (igreki na górze).",
            "Postać kierunkowa: $y = ax + b$.",
            "Postać ogólna: $Ax + By + C = 0$."
          ]
        }
      },
      {
        id: "math-lesson-12-3",
        order: 3,
        title: "Proste prostopadłe i równoległe na płaszczyźnie",
        short_title: "Prostopadłość i równoległość",
        badge: "Lekcja 12.3",
        archetypeCode: "ARCH-123",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W geometrii analitycznej relacje między prostymi kierunkowymi $y = a_1 x + b_1$ i $y = a_2 x + b_2$ to: 1) równoległość: $a_1 = a_2$; 2) prostopadłość: $a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}$. Dla prostych w postaci ogólnej $A_1 x + B_1 y + C_1 = 0$ i $A_2 x + B_2 y + C_2 = 0$: warunek równoległości to $A_1 B_2 - A_2 B_1 = 0$, a warunek prostopadłości to $A_1 A_2 + B_1 B_2 = 0$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Kluczowe dla symetralnej odcinka i wysokości trójkąta.",
          plain_polish: "Z polskiego na nasze: Równoległe mają to samo nachylenie ($a$). Prostopadłe to „odwróć i zmień znak” (np. $a = 3 \\implies a_\\perp = -\\frac{1}{3}$). Gdy szukasz prostej prostopadłej przez punkt, bierzesz nowe $a_\\perp$, wstawiasz współrzędne punktu i wyliczasz nowe $b$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Odczytaj współczynnik prostej wyjściowej",
              description: "Doprowadź równanie do postaci $y = ax + b$ i odczytaj $a_1$.",
              tip: "Zawsze przenieś wyraz z x i wyraz wolny, a potem podziel przez współczynnik przy y."
            },
            {
              stepNumber: 2,
              title: "Wyznacz nowy współczynnik kierunkowy",
              description: "Dla prostej równoległej: $a_2 = a_1$. Dla prostej prostopadłej: $a_2 = -\\frac{1}{a_1}$.",
              tip: "Iloczyn a1 * a2 musi wynosić -1."
            },
            {
              stepNumber: 3,
              title: "Oblicz nowy wyraz wolny przez zadany punkt",
              description: "Podstaw współrzędne punktu $P = (x_0, y_0)$ do równania $y_0 = a_2 x_0 + b_2$ i wylicz $b_2$.",
              tip: "Zapisz pełne równanie nowej prostej."
            }
          ],
          core_formulas: [
            {
              name: "Warunek równoległości i prostopadłości",
              formula: "k \\parallel l \\iff a_1 = a_2, \\quad k \\perp l \\iff a_1 \\cdot a_2 = -1"
            },
            {
              name: "W postaci ogólnej",
              formula: "k \\perp l \\iff A_1 A_2 + B_1 B_2 = 0"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wyznacz równanie prostej prostopadłej do prostej $k: y = 2x - 5$ i przechodzącej przez punkt $P = (4, 1)$.",
              solution: "1. Współczynnik prostej $k$: $a_1 = 2$.\n2. Prosta prostopadła ma współczynnik: $a_2 = -\\frac{1}{2}$.\n3. Wstawiamy punkt $P(4, 1)$ do równania $y = -\\frac{1}{2}x + b$:\n$$1 = -\\frac{1}{2} \\cdot 4 + b \\implies 1 = -2 + b \\implies b = 3$$\n4. Szukane równanie to $y = -\\frac{1}{2}x + 3$.",
              keyInsight: "Odwrotność liczby 2 ze znakiem minus to -1/2."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Wysokość trójkąta)",
              points: "2 pkt",
              problem: "W trójkącie $ABC$ dane są punkty $A = (-2, 1)$, $B = (4, 3)$ oraz $C = (1, 6)$. Wyznacz równanie prostej zawierającej wysokość opuszczoną z wierzchołka $C$.",
              solution: "1. Wysokość z wierzchołka $C$ jest prostopadła do boku $AB$.\n2. Obliczamy współczynnik kierunkowy prostej $AB$:\n$$a_{AB} = \\frac{3 - 1}{4 - (-2)} = \\frac{2}{6} = \\frac{1}{3}$$\n3. Współczynnik prostej zawierającej wysokość (prostopadłej do $AB$):\n$$a_h = -\\frac{1}{1/3} = -3$$\n4. Prosta przechodzi przez wierzchołek $C(1, 6)$:\n$$6 = -3(1) + b \\implies 6 = -3 + b \\implies b = 9$$\n5. Równanie wysokości: $y = -3x + 9$.",
              keyInsight: "Wysokość z wierzchołka C to prosta prostopadła do boku naprzeciwko (AB) przechodząca przez punkt C."
            }
          ],
          trap_details: {
            fail: "Błąd: Użycie punktu ze środka boku AB zamiast wierzchołka C przy wyznaczaniu wysokości trójkąta.",
            win: "Poprawnie: Wysokość przechodzi przez wierzchołek C! Środek boku AB dotyczy symetralnej lub środkowej, nie wysokości.",
            explanation: "Uczniowie często mylą pojęcia: wysokość (przez wierzchołek pod kątem prostym) z symetralną (przez środek boku pod kątem prostym).",
            ckeTip: "Wysokość z C $\\implies$ podstawiasz punkt C. Symetralna boku AB $\\implies$ podstawiasz środek S_AB."
          },
          exam_trap: "Pominięcie minusa przy warunku prostopadłości (branie $a_2 = 1/a_1$ zamiast $-1/a_1$)!",
          key_points: [
            "$k \\parallel l \\iff a_1 = a_2$.",
            "$k \\perp l \\iff a_1 \\cdot a_2 = -1$.",
            "Symetralna odcinka przechodzi przez jego środek i jest do niego prostopadła."
          ]
        }
      },
      {
        id: "math-lesson-12-4",
        order: 4,
        title: "Równanie okręgu w postaci kanonicznej",
        short_title: "Równanie okręgu",
        badge: "Lekcja 12.4",
        archetypeCode: "ARCH-124",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Równanie okręgu o środku $S = (a, b)$ i promieniu $r > 0$ w postaci kanonicznej to: $(x - a)^2 + (y - b)^2 = r^2$. Współrzędne środka $a$ i $b$ odczytuje się ze ZMIENIONYMI znakami względem zapisu w nawiasach. Liczba stojąca po prawej stronie równania to KWADRAT promienia ($r^2$), więc właściwy promień to $r = \\sqrt{\\text{prawa strona}}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Odczytanie współrzędnych środka i promienia.",
          plain_polish: "Z polskiego na nasze: Równanie okręgu to znowu twierdzenie Pitagorasa! Pamiętaj o dwóch pułapkach: 1) w nawiasach odwracasz znaki (jak masz $(x + 3)^2$, to środek leży w $a = -3$); 2) po prawej stronie stoi $r^2$, więc jeśli widzisz $16$, to promień wynosi $\\sqrt{16} = 4$, a nie 16!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Odczytaj współrzędne środka S",
              description: "Zmień znaki liczb stojących przy $x$ i $y$ w nawiasach: dla $(x - a)^2 + (y - b)^2$ środkiem jest $(a, b)$.",
              tip: "Dla samego x^2 współrzędna środka wynosi 0: (x - 0)^2."
            },
            {
              stepNumber: 2,
              title: "Wyznacz promień r",
              description: "Wyciągnij pierwiastek kwadratowy z liczby stojącej po prawej stronie równania: $r = \\sqrt{r^2}$.",
              tip: "Promień r musi być liczbą ściśle dodatnią."
            },
            {
              stepNumber: 3,
              title: "Ułóż równanie ze środka i promienia",
              description: "Wstaw dane do wzoru: $(x - a)^2 + (y - b)^2 = r^2$. Pamiętaj o podniesieniu $r$ do kwadratu.",
              tip: "Jeśli r = 3*sqrt(2), to r^2 = 9 * 2 = 18."
            }
          ],
          core_formulas: [
            {
              name: "Równanie okręgu w postaci kanonicznej",
              formula: "(x - a)^2 + (y - b)^2 = r^2 \\quad (S = (a, b), \\; r > 0)"
            },
            {
              name: "Okrąg o środku w początku układu (0, 0)",
              formula: "x^2 + y^2 = r^2"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Okrąg ma równanie $(x + 4)^2 + (y - 7)^2 = 25$. Wskaż współrzędne środka $S$ i promień $r$ tego okręgu.",
              solution: "1. Porównujemy z postacią $(x - a)^2 + (y - b)^2 = r^2$.\n2. Wyznaczamy środek ze zmianą znaków:\n$$x - a = x + 4 \\implies a = -4$$\n$$y - b = y - 7 \\implies b = 7$$\nZatem środek to $S = (-4, 7)$.\n3. Wyznaczamy promień:\n$$r^2 = 25 \\implies r = \\sqrt{25} = 5$$\nOdpowiedź: Środek $S = (-4, 7)$, promień $r = 5$.",
              keyInsight: "Znak przy 4 zmienia się na minus, znak przy -7 na plus, a 25 pierwiastkujemy do 5."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Okrąg o średnicy AB)",
              points: "2 pkt",
              problem: "Punkty $A = (-1, 3)$ oraz $B = (5, -5)$ są końcami średnicy okręgu. Zapisz równanie tego okręgu.",
              solution: "1. Środek okręgu $S$ to środek średnicy $AB$:\n$$S = \\left( \\frac{-1 + 5}{2}, \\; \\frac{3 + (-5)}{2} \\right) = \\left( \\frac{4}{2}, \\; \\frac{-2}{2} \\right) = (2, -1)$$\n2. Promień to połowa długości średnicy lub odległość $|SA|$:\n$$r^2 = |SA|^2 = (2 - (-1))^2 + (-1 - 3)^2 = 3^2 + (-4)^2 = 9 + 16 = 25$$\n3. Zapisujemy równanie okręgu:\n$$(x - 2)^2 + (y - (-1))^2 = 25 \\implies (x - 2)^2 + (y + 1)^2 = 25.$$",
              keyInsight: "Wzór (x - 2)^2 + (y + 1)^2 = 25 wymaga kwadratu promienia, czyli r^2 = 25."
            }
          ],
          trap_details: {
            fail: "Błąd: Podawanie liczby po prawej stronie jako promienia (np. dla = 25 branie r = 25 zamiast r = 5).",
            win: "Poprawnie: Prawa strona równania to r^2! Aby poznać promień r, ZAWSZE wyciągnij pierwiastek kwadratowy.",
            explanation: "To najbardziej powszechny błąd w zadaniach o okręgu na poziomie podstawowym.",
            ckeTip: "Napisz na arkuszu: r^2 = 25, więc r = 5."
          },
          exam_trap: "Mylenie znaków współrzędnych środka – uznanie, że $(x - 3)^2$ oznacza $a = -3$ zamiast $+3$!",
          key_points: [
            "Środek okręgu $S = (a, b)$ ma ZAWSZE znaki przeciwne do liczb w nawiasach.",
            "Promień to pierwiastek prawej strony: $r = \\sqrt{r^2}$.",
            "Środek średnicy jest środkiem okręgu."
          ]
        }
      },
      {
        id: "math-lesson-12-5",
        order: 5,
        title: "Punkty wspólne prostej i okręgu oraz pola figur",
        short_title: "Punkty wspólne prostej i okręgu",
        badge: "Lekcja 12.5",
        archetypeCode: "ARCH-125",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wzajemne położenie prostej i okręgu bada się przez odległość środka okręgu $S$ od prostej $d$ lub przez wstawienie równania prostej $y = ax + b$ do równania okręgu: 1) $d > r$ (lub $\\Delta < 0$) $\\implies$ prosta rozłączna (0 punktów wspólnych); 2) $d = r$ (lub $\\Delta = 0$) $\\implies$ prosta styczna (dokładnie 1 punkt wspólny); 3) $d < r$ (lub $\\Delta > 0$) $\\implies$ prosta sieczna (2 punkty wspólne tworzące cięciwę okręgu).",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Określanie liczby punktów wspólnych lub długości cięciwy.",
          plain_polish: "Z polskiego na nasze: Wstaw $y$ z prostej do równania okręgu – dostaniesz równanie kwadratowe z jedną niewiadomą $x$. Liczysz deltę: jeśli $\\Delta > 0$, prosta przecina okrąg w 2 miejscach (sieczna). Jeśli $\\Delta = 0$, ledwo go muska w 1 punkcie (styczna). Jeśli $\\Delta < 0$, omija go z daleka (brak punktów).",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wyznacz y z równania prostej",
              description: "Zapisz prostą w postaci $y = ax + b$.",
              tip: "Jeśli prosta jest pozioma y = c lub pionowa x = c, podstawienie jest natychmiastowe."
            },
            {
              stepNumber: 2,
              title: "Podstaw do równania okręgu",
              description: "Zastąp literę $y$ wyrażeniem $ax + b$ w równaniu $(x - a)^2 + (y - b)^2 = r^2$.",
              tip: "Zastosuj wzory skróconego mnożenia i uporządkuj do postaci Ax^2 + Bx + C = 0."
            },
            {
              stepNumber: 3,
              title: "Oblicz deltę i zinterpretuj wynik",
              description: "Oblicz $\\Delta$. Znak delty mówi o liczbie punktów wspólnych (2, 1 lub 0).",
              tip: "Jeśli szukasz punktów, wylicz x_1, x_2 i oblicz odpowiadające im y z równania prostej."
            }
          ],
          core_formulas: [
            {
              name: "Układ równań prostej i okręgu",
              formula: "\\begin{cases} (x - a)^2 + (y - b)^2 = r^2 \\\\ y = mx + k \\end{cases}"
            },
            {
              name: "Interpretacja wyróżnika delty",
              formula: "\\Delta > 0 \\implies 2 \\text{ punkty (sieczna)}, \\quad \\Delta = 0 \\implies 1 \\text{ punkt (styczna)}, \\quad \\Delta < 0 \\implies 0 \\text{ punktów}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Ile punktów wspólnych ma prosta $y = 3$ z okręgiem o równaniu $(x - 1)^2 + (y + 2)^2 = 25$?",
              solution: "1. Podstawiamy $y = 3$ do równania okręgu:\n$$(x - 1)^2 + (3 + 2)^2 = 25 \\implies (x - 1)^2 + 5^2 = 25$$\n2. Upraszczamy:\n$$(x - 1)^2 + 25 = 25 \\implies (x - 1)^2 = 0$$\n3. Równanie $(x - 1)^2 = 0$ ma dokładnie jedno rozwiązanie: $x = 1$.\nOdpowiedź: Prosta ma dokładnie 1 punkt wspólny z okręgiem (jest styczna w punkcie $(1, 3)$).",
              keyInsight: "Otrzymanie kwadratu równego 0 oznacza dokładnie jeden punkt styczności."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Długość cięciwy)",
              points: "2 pkt",
              problem: "Prosta $y = 0$ (oś $OX$) przecina okrąg $x^2 + (y - 3)^2 = 25$ w punktach $A$ i $B$. Oblicz długość cięciwy $AB$.",
              solution: "1. Podstawiamy $y = 0$ do równania okręgu:\n$$x^2 + (0 - 3)^2 = 25 \\implies x^2 + 9 = 25 \\implies x^2 = 16$$\n2. Rozwiązujemy równanie:\n$$x_1 = -4, \\quad x_2 = 4$$\n3. Punkty przecięcia to $A = (-4, 0)$ oraz $B = (4, 0)$.\n4. Długość cięciwy $AB$ to odległość między tymi punktami na osi $OX$:\n$$|AB| = |4 - (-4)| = 4 + 4 = 8$$\nOdpowiedź: Długość cięciwy wynosi $8$.",
              keyInsight: "Oś OX ma równanie y = 0, co niesamowicie upraszcza rachunki."
            }
          ],
          trap_details: {
            fail: "Błąd: Zapominanie o ujemnym rozwiązaniu przy równaniu x^2 = 16 (branie tylko x = 4 i podawanie długości 4).",
            win: "Poprawnie: x^2 = 16 daje DWA punkty: -4 oraz +4. Długość odcinka między nimi to 4 - (-4) = 8.",
            explanation: "Cięciwa rozciąga się od ujemnej do dodatniej półosi.",
            ckeTip: "Narysuj okrąg i prostą: cięciwa łączy oba brzegi okręgu."
          },
          exam_trap: "Mylenie równania osi: oś $OX$ ma równanie $y = 0$, a oś $OY$ ma równanie $x = 0$!",
          key_points: [
            "Liczba punktów wspólnych wynika ze znaku delty po podstawieniu prostej.",
            "Oś $OX$ to prosta $y = 0$; oś $OY$ to prosta $x = 0$.",
            "Dla cięciwy długość to odległość między dwoma wyliczonymi punktami."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-13",
    numericId: 13,
    title: "Stereometria – graniastosłupy, ostrosłupy i bryły",
    short_title: "Stereometria",
    description: "Pola i objętości graniastosłupów i ostrosłupów, kąty nachylenia krawędzi i ścian, bryły obrotowe (walec, stożek, kula) oraz przekroje.",
    icon: "Box",
    color: "#FFB800",
    matura_points_range: "4–7 pkt",
    importance: "HIGH",
    lessons: [
      {
        id: "math-lesson-13-1",
        order: 1,
        title: "Graniastosłupy proste i prawidłowe: pole i objętość",
        short_title: "Graniastosłupy proste i prawidłowe",
        badge: "Lekcja 13.1",
        archetypeCode: "ARCH-131",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W graniastosłupie prostym ściany boczne są prostokątami prostopadłymi do podstaw. Graniastosłup prawidłowy ma w podstawie wielokąt foremny (trójkąt równoboczny, kwadrat, sześciokąt foremny). Objętość to iloczyn pola podstawy i wysokości: $V = P_p \\cdot H$. Pole całkowite to $P_c = 2P_p + P_b$, gdzie pole boczne to obwód podstawy razy wysokość: $P_b = \\text{Obw}_p \\cdot H$. Główna przekątna prostopadłościanu: $D = \\sqrt{a^2 + b^2 + c^2}$, a sześcianu: $D = a\\sqrt{3}$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Przekątne i kąty w sześcianie i prostopadłościanie.",
          plain_polish: "Z polskiego na nasze: Graniastosłup to „pudełko z dachem i dnem”. Objętość to pole podłogi pomnożone przez wysokość pokoju. W sześcianie przekątna ściany to $a\\sqrt{2}$ (jak w kwadracie), a wielka przekątna przestrzenna przez cały środek sześcianu to $a\\sqrt{3}$. Pamiętaj: pole całkowite ma DWIE podstawy ($2P_p$)!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj figurę w podstawie",
              description: "Trójkątny prawidłowy $\\implies$ trójkąt równoboczny ($P_p = \\frac{a^2\\sqrt{3}}{4}$). Czworokątny prawidłowy $\\implies$ kwadrat ($P_p = a^2$). Sześciokątny $\\implies$ 6 trójkątów równobocznych.",
              tip: "Słowo 'prawidłowy' ZAWSZE oznacza figurę foremną w podstawie."
            },
            {
              stepNumber: 2,
              title: "Oblicz pole podstawy i obwód",
              description: "Oblicz $P_p$ oraz $\\text{Obw}_p$.",
              tip: "Pole powierzchni bocznej P_b to Obwód * H."
            },
            {
              stepNumber: 3,
              title: "Oblicz objętość V i pole całkowite P_c",
              description: "Podstaw do wzorów: $V = P_p \\cdot H$ oraz $P_c = 2P_p + P_b$.",
              tip: "Nie zapomnij pomnożyć pola podstawy przez 2 w polu całkowitym!"
            }
          ],
          core_formulas: [
            {
              name: "Objętość i pole całkowite graniastosłupa",
              formula: "V = P_p \\cdot H, \\quad P_c = 2P_p + P_b = 2P_p + \\text{Obw}_p \\cdot H"
            },
            {
              name: "Przekątna prostopadłościanu i sześcianu",
              formula: "D = \\sqrt{a^2 + b^2 + c^2}, \\quad D_{\\text{sześcian}} = a\\sqrt{3}, \\quad d_{\\text{ściany}} = a\\sqrt{2}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Przekątna sześcianu)",
              points: "1 pkt",
              problem: "Przekątna sześcianu ma długość $4\\sqrt{3}$. Oblicz objętość tego sześcianu.",
              solution: "1. Ze wzoru na przekątną sześcianu: $D = a\\sqrt{3}$.\n2. Przyrównujemy: $4\\sqrt{3} = a\\sqrt{3} \\implies a = 4$.\n3. Objętość sześcianu to $V = a^3$:\n$$V = 4^3 = 64$$\nOdpowiedź: Objętość sześcianu wynosi $64$.",
              keyInsight: "Dzieląc przekątną sześcianu przez sqrt(3), natychmiast otrzymujesz długość krawędzi a."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Graniastosłup prawidłowy trójkątny)",
              points: "2 pkt",
              problem: "W graniastosłupie prawidłowym trójkątnym pole podstawy wynosi $9\\sqrt{3}$, a wysokość $H$ jest równa długości krawędzi podstawy. Oblicz pole powierzchni całkowitej tej bryły.",
              solution: "1. Podstawa to trójkąt równoboczny: $P_p = \\frac{a^2\\sqrt{3}}{4} = 9\\sqrt{3}$.\n2. Wyznaczamy krawędź $a$:\n$$a^2 = 9 \\cdot 4 = 36 \\implies a = 6$$\n3. Wysokość graniastosłupa: $H = a = 6$.\n4. Obwód podstawy: $\\text{Obw}_p = 3 \\cdot 6 = 18$.\n5. Pole powierzchni bocznej: $P_b = 18 \\cdot 6 = 108$.\n6. Pole całkowite: $P_c = 2P_p + P_b = 2(9\\sqrt{3}) + 108 = 18\\sqrt{3} + 108$.\nOdpowiedź: $P_c = 18\\sqrt{3} + 108$.",
              keyInsight: "Nie dodawaj 18*sqrt(3) do 108 – to liczby niewymierna i wymierna, zapis zostaje w postaci sumy."
            }
          ],
          trap_details: {
            fail: "Błąd: Dodawanie 18*sqrt(3) + 108 i pisanie 126*sqrt(3).",
            win: "Poprawnie: Liczb z pierwiastkiem i liczb całkowitych NIE WOLNO dodawać do jednej liczby! Zostawiasz 18*sqrt(3) + 108.",
            explanation: "To błąd z zakresu redukcji wyrazów podobnych.",
            ckeTip: "Pierwiastek zachowuje się jak litera: 18x + 108 to nie 126x."
          },
          exam_trap: "Pominięcie współczynnika 2 przy polu podstawy w polu całkowitym ($P_c = P_p + P_b$ zamiast $2P_p + P_b$)!",
          key_points: [
            "Graniastosłup ma ZAWSZE 2 podstawy: $P_c = 2P_p + P_b$.",
            "Przekątna sześcianu: $D = a\\sqrt{3}$.",
            "Przekątna ściany sześcianu: $d = a\\sqrt{2}$."
          ]
        }
      },
      {
        id: "math-lesson-13-2",
        order: 2,
        title: "Ostrosłupy prawidłowe: krawędzie i ściany boczne",
        short_title: "Ostrosłupy prawidłowe",
        badge: "Lekcja 13.2",
        archetypeCode: "ARCH-132",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W ostrosłupie prawidłowym podstawa jest wielokątem foremnym, a spodek wysokości bryły $H$ leży dokładnie w środku okręgu opisanego i wpisanego w podstawę. Ściany boczne są przystającymi trójkątami równoramiennymi o wysokości $h_s$. Objętość ostrosłupa jest TRZY RAZY MNIEJSZA niż graniastosłupa: $V = \\frac{1}{3}P_p \\cdot H$. Pole całkowite to jedna podstawa plus ściany boczne: $P_c = P_p + P_b$.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 2–3 pkt • Trójkąty prostokątne z wysokością bryły H.",
          plain_polish: "Z polskiego na nasze: Ostrosłup ma czubek zamiast drugiego dna, więc jego objętość to DZIELENIE PRZEZ 3: $V = \\frac{1}{3} P_p H$. Pamiętaj o dwóch różnych wysokościach: $H$ to pionowy słup w środku bryły (wysokość bryły), a $h_s$ to wysokość ściany bocznej leżąca na pochyłym dachu. Łączy je Pitagoras!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wybierz kluczowy trójkąt prostokątny",
              description: "1) Trójkąt z krawędzią boczną $b$: $H^2 + R^2 = b^2$; 2) Trójkąt z wysokością ściany bocznej $h_s$: $H^2 + r^2 = h_s^2$.",
              tip: "R to promień okręgu opisanego na podstawie, r to wpisanego."
            },
            {
              stepNumber: 2,
              title: "Wyznacz wysokość bryły H z Pitagorasa",
              description: "Oblicz $R$ lub $r$ podstawy i wylicz $H = \\sqrt{b^2 - R^2}$ lub $H = \\sqrt{h_s^2 - r^2}$.",
              tip: "W ostrosłupie prawidłowym czworokątnym R = d/2 = a*sqrt(2)/2, a r = a/2."
            },
            {
              stepNumber: 3,
              title: "Oblicz objętość pamiętając o 1/3",
              description: "Zastosuj wzór $V = \\frac{1}{3} P_p \\cdot H$.",
              tip: "Zawsze na koniec sprawdź, czy nie zapomniałeś podzielić przez 3!"
            }
          ],
          core_formulas: [
            {
              name: "Objętość i pole całkowite ostrosłupa",
              formula: "V = \\frac{1}{3} P_p \\cdot H, \\quad P_c = P_p + P_b"
            },
            {
              name: "Pitagoras w ostrosłupie prawidłowym czworokątnym",
              formula: "H^2 + \\left(\\frac{a\\sqrt{2}}{2}\\right)^2 = b^2, \\quad H^2 + \\left(\\frac{a}{2}\\right)^2 = h_s^2"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość 6, a wysokość bryły $H = 4$. Oblicz wysokość ściany bocznej $h_s$.",
              solution: "1. Spodek wysokości dzieli bok podstawy na połowę: $r = \\frac{a}{2} = \\frac{6}{2} = 3$.\n2. Trójkąt prostokątny tworzą: wysokość bryły $H$, odcinek $r = 3$ i wysokość ściany bocznej $h_s$:\n$$H^2 + r^2 = h_s^2 \\implies 4^2 + 3^2 = h_s^2$$\n$$16 + 9 = h_s^2 \\implies h_s^2 = 25 \\implies h_s = 5$$\nOdpowiedź: Wysokość ściany bocznej wynosi $5$.",
              keyInsight: "Klasyczny trójkąt pitagorejski 3-4-5 w przekroju ostrosłupa."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Objętość z krawędzią boczną)",
              points: "2 pkt",
              problem: "W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $a = 4\\sqrt{2}$, a krawędź boczna $b = 5$. Oblicz objętość tego ostrosłupa.",
              solution: "1. Obliczamy przekątną podstawy $d = a\\sqrt{2}$:\n$$d = 4\\sqrt{2} \\cdot \\sqrt{2} = 4 \\cdot 2 = 8$$\n2. Połowa przekątnej to $R = \\frac{d}{2} = 4$.\n3. Z trójkąta prostokątnego $H^2 + R^2 = b^2$:\n$$H^2 + 4^2 = 5^2 \\implies H^2 + 16 = 25 \\implies H^2 = 9 \\implies H = 3$$\n4. Pole podstawy (kwadrat):\n$$P_p = a^2 = (4\\sqrt{2})^2 = 16 \\cdot 2 = 32$$\n5. Objętość ostrosłupa:\n$$V = \\frac{1}{3} P_p \\cdot H = \\frac{1}{3} \\cdot 32 \\cdot 3 = 32$$\nOdpowiedź: Objętość wynosi $32$.",
              keyInsight: "Czynnik 1/3 idealnie skraca się z wysokością H = 3."
            }
          ],
          trap_details: {
            fail: "Błąd: Użycie wzoru V = P_p * H (jak dla graniastosłupa) bez ułamka 1/3.",
            win: "Poprawnie: Ostrosłup to ZAWSZE jedna trzecia: V = (1/3) * P_p * H.",
            explanation: "Ostrosłup mieści dokładnie 1/3 objętości graniastosłupa o tej samej podstawie i wysokości.",
            ckeTip: "Ostrosłup ma ostrą końcówkę, która 'odcina' 2/3 objętości – zostaje tylko 1/3!"
          },
          exam_trap: "Mylenie wysokości bryły $H$ z wysokością ściany bocznej $h_s$ we wzorze na objętość!",
          key_points: [
            "Objętość ostrosłupa: $V = \\frac{1}{3} P_p \\cdot H$.",
            "Ściana boczna $h_s$ łączy się z połową boku: $H^2 + (a/2)^2 = h_s^2$.",
            "Krawędź boczna $b$ łączy się z połową przekątnej: $H^2 + (d/2)^2 = b^2$."
          ]
        }
      },
      {
        id: "math-lesson-13-3",
        order: 3,
        title: "Kąty w stereometrii: kąt nachylenia krawędzi i ściany",
        short_title: "Kąty w stereometrii",
        badge: "Lekcja 13.3",
        archetypeCode: "ARCH-133",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W zadaniach CKE kluczowe jest prawidłowe zidentyfikowanie rzutu prostokątnego i kąta: 1) Kąt $\\alpha$ nachylenia krawędzi bocznej do płaszczyzny podstawy: zawarty między krawędzią boczną a jej rzutem prostokątnym (odcinkiem łączącym spodek z wierzchołkiem podstawy, czyli promieniem $R$); 2) Kąt $\\beta$ nachylenia ściany bocznej do podstawy (kąt dwuścienny): zawarty między wysokością ściany bocznej $h_s$ a promieniem okręgu wpisanego $r$ (odcinkiem $\\frac{a}{2}$).",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Poprawny wybór trójkąta z kątem alfa lub beta.",
          plain_polish: "Z polskiego na nasze: Spójrz na cień! Kąt krawędzi bocznej to kąt między tą krawędzią a jej cieniem na podłodze (leci do rogu kwadratu, czyli do połowy przekątnej). Kąt ściany bocznej to kąt między dachem (wysokością ściany $h_s$) a podłogą (leci do środka boku, czyli do $a/2$). Nigdy ich nie myl!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj, o który kąt pyta zadanie",
              description: "Kąt krawędzi bocznej $\\implies$ trójkąt z krawędzią $b$ i połową przekątnej $R$. Kąt ściany bocznej $\\implies$ trójkąt z wysokością $h_s$ i połową boku $r$.",
              tip: "Zaznacz kąt łukiem na rysunku w brudnopisie."
            },
            {
              stepNumber: 2,
              title: "Zastosuj funkcję trygonometryczną",
              description: "Zazwyczaj tangens lub cosinus: $\\operatorname{tg}\\alpha = \\frac{H}{R}$ lub $\\operatorname{tg}\\beta = \\frac{H}{r}$.",
              tip: "Wysokość bryły H stoi ZAWSZE naprzeciw badanego kąta nachylenia do podstawy."
            },
            {
              stepNumber: 3,
              title: "Wylicz szukaną wielkość",
              description: "Wyznacz $H$, $b$ lub $h_s$ w zależności od polecenia.",
              tip: "Jeśli kąt to 30, 45 lub 60 stopni, wykorzystaj własności trójkątów ze szkoły podstawowej."
            }
          ],
          core_formulas: [
            {
              name: "Kąt nachylenia krawędzi bocznej do podstawy",
              formula: "\\operatorname{tg}\\alpha = \\frac{H}{R}, \\quad \\sin\\alpha = \\frac{H}{b}, \\quad \\cos\\alpha = \\frac{R}{b}"
            },
            {
              name: "Kąt nachylenia ściany bocznej do podstawy",
              formula: "\\operatorname{tg}\\beta = \\frac{H}{r}, \\quad \\sin\\beta = \\frac{H}{h_s}, \\quad \\cos\\beta = \\frac{r}{h_s}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "W ostrosłupie prawidłowym czworokątnym kąt nachylenia ściany bocznej do płaszczyzny podstawy ma miarę $60^\\circ$. Krawędź podstawy ma długość 8. Oblicz wysokość bryły $H$.",
              solution: "1. Kąt nachylenia ściany bocznej leży w trójkącie z $H$, $h_s$ oraz $r = \\frac{a}{2}$.\n2. Obliczamy odcinek na podstawie: $r = \\frac{8}{2} = 4$.\n3. Korzystamy z tangensa kąta $60^\\circ$:\n$$\\operatorname{tg} 60^\\circ = \\frac{H}{r} \\implies \\sqrt{3} = \\frac{H}{4} \\implies H = 4\\sqrt{3}$$\nOdpowiedź: Wysokość bryły wynosi $4\\sqrt{3}$.",
              keyInsight: "Kąt ściany bocznej opiera się na połowie boku r = a/2 = 4."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Kąt krawędzi)",
              points: "1 pkt",
              problem: "W ostrosłupie prawidłowym czworokątnym krawędź boczna o długości 10 jest nachylona do płaszczyzny podstawy pod kątem $30^\\circ$. Oblicz wysokość tego ostrosłupa.",
              solution: "1. Krawędź boczna $b = 10$ to przeciwprostokątna w trójkącie prostokątnym z wysokością $H$.\n2. Kąt $30^\\circ$ leży przy podstawie, naprzeciw wysokości $H$.\n3. Stosujemy sinus kąta $30^\\circ$:\n$$\\sin 30^\\circ = \\frac{H}{b} \\implies \\frac{1}{2} = \\frac{H}{10} \\implies H = 5$$\nOdpowiedź: Wysokość wynosi $5$.",
              keyInsight: "Naprzeciw kąta 30 stopni leży bok równy dokładnie połowie przeciwprostokątnej (10 / 2 = 5)."
            }
          ],
          trap_details: {
            fail: "Błąd: Umieszczenie kąta ściany bocznej w trójkącie z połową przekątnej (mylenie kąta ściany z kątem krawędzi).",
            win: "Poprawnie: Ściana boczna opada na BOK podstawy (odcinek a/2), a krawędź boczna biegnie do NAROŻNIKA (połowa przekątnej d/2).",
            explanation: "To kardynalny błąd rysunkowy w stereometrii.",
            ckeTip: "Ściana $\\implies$ bok ($a/2$). Krawędź $\\implies$ róg ($d/2$)."
          },
          exam_trap: "Pomylenie kąta nachylenia do podstawy z kątem przy wierzchołku ostrosłupa!",
          key_points: [
            "Kąt krawędzi bocznej opiera się na $R$ (do narożnika).",
            "Kąt ściany bocznej opiera się na $r$ (do środka boku).",
            "Wysokość $H$ jest zawsze pionową przyprostokątną naprzeciw tych kątów."
          ]
        }
      },
      {
        id: "math-lesson-13-4",
        order: 4,
        title: "Bryły obrotowe: walec, stożek i kula",
        short_title: "Walec, stożek i kula",
        badge: "Lekcja 13.4",
        archetypeCode: "ARCH-134",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Bryły obrotowe powstają przez obrót figur płaskich wokół osi: 1) Walec (obrót prostokąta): $V = \\pi r^2 H$, $P_b = 2\\pi r H$, $P_c = 2\\pi r(r + H)$; 2) Stożek (obrót trójkąta prostokątnego): $V = \\frac{1}{3}\\pi r^2 H$, $P_b = \\pi r l$ (gdzie $l$ to tworząca, $r^2 + H^2 = l^2$), $P_c = \\pi r(r + l)$; 3) Kula (obrót półkola): $V = \\frac{4}{3}\\pi R^3$, $P = 4\\pi R^2$. Przekrój osiowy walca to prostokąt $2r \\times H$, a stożka trójkąt równoramienny o podstawie $2r$ i ramionach $l$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Pewniak: obliczanie objętości lub pola z tworzącą l.",
          plain_polish: "Z polskiego na nasze: W stożku masz Pitagorasa: promień podłogi $r$, pionowa wysokość $H$ i spadzista tworząca $l$: $r^2 + H^2 = l^2$. W kuli pamiętaj o ułamku $\\frac{4}{3}$ i potędze TRZECIEJ w objętości ($R^3$), a w polu o liczbie 4 i kwadracie ($4\\pi R^2$). Nie gub liczby $\\pi$ w rachunkach!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj bryłę i wypisz r, H, l",
              description: "Walec $\\implies r, H$. Stożek $\\implies r, H, l$. Kula $\\implies R$.",
              tip: "W stożku tworząca l to przeciwprostokątna: r^2 + H^2 = l^2."
            },
            {
              stepNumber: 2,
              title: "Wybierz wzór z karty wzorów CKE",
              description: "Stożek ma $1/3$, walec nie ma $1/3$, kula ma $4/3$ i promień do sześcianu.",
              tip: "Nie myl pola bocznego stożka (pi * r * l) z objętością."
            },
            {
              stepNumber: 3,
              title: "Wykonaj działania z liczbą pi",
              description: "Liczbę $\\pi$ traktuj jak symbol (np. $x$) – nie przybliżaj jej jako 3,14, chyba że zadanie wyraźnie tego wymaga.",
              tip: "W zadaniach zamkniętych odpowiedzi zawierają dokładny symbol pi."
            }
          ],
          core_formulas: [
            {
              name: "Walec: objętość i pole całkowite",
              formula: "V = \\pi r^2 H, \\quad P_c = 2\\pi r^2 + 2\\pi r H"
            },
            {
              name: "Stożek: objętość, pole i Pitagoras",
              formula: "V = \\frac{1}{3}\\pi r^2 H, \\quad P_c = \\pi r^2 + \\pi r l, \\quad r^2 + H^2 = l^2"
            },
            {
              name: "Kula: objętość i pole powierzchni",
              formula: "V = \\frac{4}{3}\\pi R^3, \\quad P = 4\\pi R^2"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Stożek z tworzącą)",
              points: "1 pkt",
              problem: "Tworząca stożka ma długość $l = 10$ i jest nachylona do płaszczyzny podstawy pod kątem $30^\\circ$. Oblicz objętość tego stożka.",
              solution: "1. W trójkącie prostokątnym tworząca $l = 10$ jest przeciwprostokątną.\n2. Wysokość $H$ leży naprzeciw kąta $30^\\circ$:\n$$H = l \\cdot \\sin 30^\\circ = 10 \\cdot \\frac{1}{2} = 5$$\n3. Promień $r$ z twierdzenia Pitagorasa lub cosinusa:\n$$r = l \\cdot \\cos 30^\\circ = 10 \\cdot \\frac{\\sqrt{3}}{2} = 5\\sqrt{3}$$\n4. Obliczamy objętość stożka:\n$$V = \\frac{1}{3} \\pi r^2 H = \\frac{1}{3} \\pi (5\\sqrt{3})^2 \\cdot 5 = \\frac{1}{3} \\pi (75) \\cdot 5 = 25 \\cdot 5 \\pi = 125\\pi$$\nOdpowiedź: Objętość stożka wynosi $125\\pi$.",
              keyInsight: "Kwadrat promienia: (5*sqrt(3))^2 = 25 * 3 = 75, co pięknie skraca się z 1/3 dając 25."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Kula)",
              points: "1 pkt",
              problem: "Pole powierzchni kuli jest równe $100\\pi$. Oblicz objętość tej kuli.",
              solution: "1. Ze wzoru na pole kuli: $P = 4\\pi R^2$.\n2. Przyrównujemy: $4\\pi R^2 = 100\\pi \\implies 4R^2 = 100 \\implies R^2 = 25 \\implies R = 5$.\n3. Obliczamy objętość:\n$$V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi (5^3) = \\frac{4}{3}\\pi (125) = \\frac{500}{3}\\pi = 166\\frac{2}{3}\\pi$$\nOdpowiedź: Objętość wynosi $\\frac{500}{3}\\pi$.",
              keyInsight: "Promień R = 5 podnosimy do sześcianu (125), a nie do kwadratu."
            }
          ],
          trap_details: {
            fail: "Błąd: Podnoszenie promienia w objętości kuli do kwadratu zamiast do sześcianu (pisanie (4/3)*pi*R^2).",
            win: "Poprawnie: Objętość ma ZAWSZE 3 wymiary, więc promień musi być w potędze TRZECIEJ: R^3.",
            explanation: "Pole powierzchni ma R^2, objętość ma R^3.",
            ckeTip: "Objętość = cm^3 $\\implies R^3$. Pole = cm^2 $\\implies R^2$."
          },
          exam_trap: "Mylenie tworzącej stożka $l$ z wysokością $H$ przy obliczaniu objętości!",
          key_points: [
            "Stożek: $r^2 + H^2 = l^2$ oraz $V = \\frac{1}{3}\\pi r^2 H$.",
            "Pole powierzchni kuli: $4\\pi R^2$, objętość kuli: $\\frac{4}{3}\\pi R^3$.",
            "Przekrój osiowy stożka to trójkąt o podstawie $2r$, a walca prostokąt o podstawie $2r$."
          ]
        }
      },
      {
        id: "math-lesson-13-5",
        order: 5,
        title: "Przekroje brył płaszczyznami w arkuszu CKE",
        short_title: "Przekroje brył płaszczyznami",
        badge: "Lekcja 13.5",
        archetypeCode: "ARCH-135",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Przekrój bryły to figura płaska powstała z przecięcia bryły płaszczyzną. Najważniejsze typy w CKE: 1) Przekrój osiowy walca (prostokąt $2r \\times H$) i stożka (trójkąt równoramienny $2r, l, l$); 2) Przekrój sześcianu płaszczyzną przechodzącą przez przekątne przeciwległych ścian (prostokąt $a \\times a\\sqrt{2}$) lub przez przekątne podstaw (prostokąt o polu $a^2\\sqrt{2}$); 3) Przekrój ostrosłupa prawidłowego czworokątnego przechodzący przez przekątną podstawy i wierzchołek (trójkąt równoramienny o podstawie $d = a\\sqrt{2}$ i wysokości $H$).",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Identyfikacja kształtu przekroju lub obliczenie jego pola.",
          plain_polish: "Z polskiego na nasze: Przekrój to jak cięcie nożem przez tort. Jeśli przetniesz sześcian po przekątnej podstawy pionowo, dostaniesz prostokąt o bokach $a$ oraz $a\\sqrt{2}$. Jeśli przetniesz ostrosłup przez przekątną podstawy i czubek, dostaniesz trójkąt o podstawie $a\\sqrt{2}$ i wysokości $H$!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Naszkicuj bryłę i ślad płaszczyzny cięcia",
              description: "Połącz punkty przecięcia na krawędziach bryły odcinkami.",
              tip: "Linie leżące na ścianach równoległych muszą być do siebie równoległe."
            },
            {
              stepNumber: 2,
              title: "Określ kształt figury przekroju",
              description: "Zidentyfikuj czy przekrój jest prostokątem, trójkątem równoramiennym czy trapezem.",
              tip: "Przekrój osiowy stożka to zawsze trójkąt równoramienny."
            },
            {
              stepNumber: 3,
              title: "Oblicz pole przekroju",
              description: "Wyznacz wymiary boków z twierdzenia Pitagorasa i zastosuj wzór na pole danej figury.",
              tip: "Pole przekroju osiowego stożka to P = (1/2) * 2r * H = r * H."
            }
          ],
          core_formulas: [
            {
              name: "Pole przekroju osiowego stożka",
              formula: "P_{\\text{przekroju}} = \\frac{1}{2} \\cdot 2r \\cdot H = r \\cdot H"
            },
            {
              name: "Pole przekroju osiowego walca",
              formula: "P_{\\text{przekroju}} = 2r \\cdot H"
            },
            {
              name: "Przekrój przekątniowy sześcianu",
              formula: "P = a \\cdot a\\sqrt{2} = a^2\\sqrt{2}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Przekrój osiowy stożka jest trójkątem równobocznym o boku długości 6. Oblicz objętość tego stożka.",
              solution: "1. Skoro przekrój osiowy jest trójkątem równobocznym o boku 6, to:\n- Średnica podstawy: $2r = 6 \\implies r = 3$\n- Tworząca stożka: $l = 6$\n- Wysokość stożka $H$ to wysokość trójkąta równobocznego: $H = \\frac{6\\sqrt{3}}{2} = 3\\sqrt{3}$\n2. Obliczamy objętość stożka:\n$$V = \\frac{1}{3}\\pi r^2 H = \\frac{1}{3}\\pi (3^2) \\cdot 3\\sqrt{3} = \\frac{1}{3}\\pi (9) \\cdot 3\\sqrt{3} = 9\\sqrt{3}\\pi$$\nOdpowiedź: Objętość stożka wynosi $9\\sqrt{3}\\pi$.",
              keyInsight: "Średnica 2r to bok trójkąta równobocznego, więc promień r wynosi dokładnie połowę (3)."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Przekrój przekątniowy ostrosłupa)",
              points: "2 pkt",
              problem: "Przekrój płaszczyzną zawierającą przekątną podstawy i wierzchołek ostrosłupa prawidłowego czworokątnego jest trójkątem prostokątnym o polu 18. Oblicz objętość tego ostrosłupa.",
              solution: "1. Przekrój jest trójkątem równoramiennym o ramionach równych krawędziom bocznym $b$ i podstawie $d = a\\sqrt{2}$.\n2. Skoro jest prostokątny, to kąt przy wierzchołku wynosi $90^\\circ$, a wysokość $H$ opuszczona na przeciwprostokątną $d$ jest równa połowie przeciwprostokątnej:\n$$H = \\frac{d}{2}$$\n3. Pole tego trójkąta:\n$$P = \\frac{1}{2} \\cdot d \\cdot H = \\frac{1}{2} \\cdot 2H \\cdot H = H^2$$\n4. Przyrównujemy: $H^2 = 18 \\implies H = \\sqrt{18} = 3\\sqrt{2}$.\n5. Wtedy $d = 2H = 2(3\\sqrt{2}) = 6\\sqrt{2}$.\n6. Ponieważ $d = a\\sqrt{2}$, krawędź podstawy to $a = 6$.\n7. Pole podstawy: $P_p = a^2 = 6^2 = 36$.\n8. Objętość ostrosłupa:\n$$V = \\frac{1}{3} P_p \\cdot H = \\frac{1}{3} \\cdot 36 \\cdot 3\\sqrt{2} = 36\\sqrt{2}.$$\nOdpowiedź: Objętość wynosi $36\\sqrt{2}$.",
              keyInsight: "W trójkącie prostokątnym równoramiennym wysokość opuszczona na przeciwprostokątną jest równa dokładnie jej połowie."
            }
          ],
          trap_details: {
            fail: "Błąd: Przyjmowanie boku trójkąta przekroju osiowego jako promienia r zamiast średnicy 2r.",
            win: "Poprawnie: Podstawa przekroju osiowego opiera się na CAŁEJ średnicy okręgu podstawy (2r)!",
            explanation: "Cięcie osiowe przechodzi przez środek koła, więc przecina je po pełnej średnicy.",
            ckeTip: "Pamiętaj: spód przekroju osiowego to 2r, promień to połowa tej długości."
          },
          exam_trap: "Niewłaściwe rozpoznanie figury przekroju w sześcianie (np. mylenie prostokąta z kwadratem)!",
          key_points: [
            "Przekrój osiowy stożka: podstawa to $2r$, wysokość to $H$, ramiona to $l$.",
            "Przekrój osiowy walca: podstawa to $2r$, wysokość to $H$ (pole $2rH$).",
            "W ostrosłupie czworokątnym przekrój przekątniowy ma podstawę $d = a\\sqrt{2}$."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-14",
    numericId: 14,
    title: "Kombinatoryka i rachunek prawdopodobieństwa",
    short_title: "Prawdopodobieństwo",
    description: "Reguła mnożenia i dodawania, permutacje i silnia, klasyczna definicja prawdopodobieństwa P(A)=|A|/|Omega|, drzewa stochastyczne i zdarzenie przeciwne.",
    icon: "PieChart",
    color: "#FFB800",
    matura_points_range: "3–6 pkt",
    importance: "HIGH",
    lessons: [
      {
        id: "math-lesson-14-1",
        order: 1,
        title: "Reguła mnożenia i reguła dodawania w zliczaniu",
        short_title: "Reguła mnożenia i dodawania",
        badge: "Lekcja 14.1",
        archetypeCode: "ARCH-141",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Reguła mnożenia: jeśli wybór składa się z kilku kolejnych etapów, a na pierwszym etapie mamy $n_1$ możliwości, na drugim $n_2$, ..., na $k$-tym $n_k$, to łączna liczba wszystkich możliwych wyborów wynosi $n_1 \\cdot n_2 \\cdot \\dots \\cdot n_k$. Reguła dodawania: jeśli zbiory możliwości są rozłączne (wybieramy wariant A LUB wariant B), to liczby możliwości dodajemy: $N = N_A + N_B$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Tworzenie liczb 3- i 4-cyfrowych o zadanych własnościach.",
          plain_polish: "Z polskiego na nasze: Spójnik „I” oznacza MNOŻENIE (wybierasz pierwszą cyfrę I drugą I trzecią $\\implies$ mnożysz kreski). Spójnik „LUB” oznacza DODAWANIE (liczba kończy się na 0 LUB na 5 $\\implies$ liczysz osobno i dodajesz). Najważniejsza zasada: ZERO NIGDY NIE MOŻE STAĆ NA PIERWSZYM MIEJSCU!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Narysuj kreski (metoda slotów)",
              description: "Narysuj tyle kresek, ile pozycji ma tworzona liczba lub kod (np. 3 kreski dla liczby 3-cyfrowej).",
              tip: "Kreska odpowiada jednemu etapowi wyboru."
            },
            {
              stepNumber: 2,
              title: "Wpisz liczbę możliwości na każdą kreskę",
              description: "Pamiętaj: na pierwszej pozycji zero jest zabronione (dla cyfr 0–9 zostaje 9 opcji). Sprawdź, czy cyfry mogą się powtarzać, czy muszą być różne!",
              tip: "Dla cyfr różnych każda kolejna kreska ma o 1 opcję mniej."
            },
            {
              stepNumber: 3,
              title: "Wymnóż liczby z kresek",
              description: "Oblicz iloczyn wszystkich wpisanych liczb.",
              tip: "Jeśli rozpatrujesz kilka rozłącznych przypadków, na koniec zsumuj wyniki."
            }
          ],
          core_formulas: [
            {
              name: "Reguła mnożenia",
              formula: "N = n_1 \\cdot n_2 \\cdot \\dots \\cdot n_k"
            },
            {
              name: "Reguła dodawania (dla zbiorów rozłącznych)",
              formula: "|A \\cup B| = |A| + |B| \\quad (A \\cap B = \\emptyset)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Ile jest wszystkich liczb trzycyfrowych o różnych cyfrach utworzonych ze zbioru cyfr $\\{1, 2, 3, 4, 5, 6\\}$?",
              solution: "1. Mamy 3 pozycje (kreski): _ _ _.\n2. Na pierwsze miejsce wybieramy 1 z 6 cyfr: 6 możliwości.\n3. Na drugie miejsce cyfry nie mogą się powtarzać, więc zostaje 5 cyfr: 5 możliwości.\n4. Na trzecie miejsce zostają 4 cyfry: 4 możliwości.\n5. Stosujemy regułę mnożenia:\n$$N = 6 \\cdot 5 \\cdot 4 = 120$$\nOdpowiedź: Jest 120 takich liczb.",
              keyInsight: "Ponieważ w zbiorze nie ma zera, na pierwszej pozycji mamy do dyspozycji wszystkie 6 cyfr."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Liczby z zerem)",
              points: "1 pkt",
              problem: "Ile jest wszystkich liczb czterocyfrowych nieparzystych, w których zapisie występują wyłącznie cyfry ze zbioru $\\{0, 1, 2, 3, 4, 5\\}$ i cyfry mogą się powtarzać?",
              solution: "1. Mamy 4 kreski: _ _ _ _.\n2. Liczba ma być nieparzysta, więc ostatnia cyfra musi być nieparzysta: $\\{1, 3, 5\\}$ (3 możliwości).\n3. Pierwsza cyfra nie może być zerem: $\\{1, 2, 3, 4, 5\\}$ (5 możliwości).\n4. Druga i trzecia cyfra mogą być dowolne z 6 cyfr: po 6 możliwości każda.\n5. Stosujemy regułę mnożenia:\n$$N = 5 \\cdot 6 \\cdot 6 \\cdot 3 = 540$$\nOdpowiedź: Jest 540 takich liczb.",
              keyInsight: "Zacznij od nałożenia ograniczeń: najpierw ostatnia cyfra (nieparzysta), potem pierwsza (bez zera)."
            }
          ],
          trap_details: {
            fail: "Błąd: Wstawianie 6 możliwości na pierwszą pozycję przy użyciu zbioru z zerem {0, 1, 2, 3, 4, 5}.",
            win: "Poprawnie: Zero na pierwszym miejscu tworzyłoby liczbę 3-cyfrową (np. 0234 to 234)! Na start masz tylko 5 opcji.",
            explanation: "Liczba wielocyfrowa nigdy nie może zaczynać się cyfrą 0.",
            ckeTip: "Zawsze gdy w zbiorze cyfr jest 0, postaw wykrzyknik przy pierwszej kresce: 'BEZ ZERA!'."
          },
          exam_trap: "Niedoczytanie czy cyfry mogą się powtarzać, czy muszą być różne!",
          key_points: [
            "Reguła mnożenia: łączna liczba dróg to iloczyn etapów.",
            "Cyfra 0 nie może stać na pierwszym miejscu liczby wielocyfrowej.",
            "Jeśli cyfry są różne: każda kolejna kreska ma o 1 opcję mniej."
          ]
        }
      },
      {
        id: "math-lesson-14-2",
        order: 2,
        title: "Silnia, permutacje i kombinacje w praktyce",
        short_title: "Silnia, permutacje i kombinacje",
        badge: "Lekcja 14.2",
        archetypeCode: "ARCH-142",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Silnia $n! = 1 \\cdot 2 \\cdot \\dots \\cdot n$ (z umową $0! = 1$) oznacza iloczyn kolejnych liczb naturalnych. Permutacja zbioru $n$-elementowego to każde uporządkowanie wszystkich $n$ elementów: $P_n = n!$. Kombinacja bez powtórzeń to wybór podzbioru $k$ elementów z $n$ elementów bez względu na kolejność: $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$. Na maturze podstawowej symbole silni stosuje się do skracania ułamków i ustawiania osób w kolejce.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Ustawianie osób w rzędzie lub skracanie silni.",
          plain_polish: "Z polskiego na nasze: Silnia $n!$ to po prostu mnożenie w dół: $5! = 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 120$. Jeśli 4 osoby siadają na 4 krzesłach, to mogą usiąść na $4! = 24$ sposoby. Przy skracaniu silni rozpisujesz większą do poziomu mniejszej i skreślasz, np. $\\frac{7!}{5!} = \\frac{7 \\cdot 6 \\cdot 5!}{5!} = 42$.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Rozpoznaj problem przestawiania (permutacja)",
              description: "Jeśli przestawiasz WSZYSTKIE $n$ elementów w kolejce/szeregu, liczba sposobów to $n!$.",
              tip: "Dla n = 3: 3! = 6; dla n = 4: 4! = 24; dla n = 5: 5! = 120."
            },
            {
              stepNumber: 2,
              title: "Skracaj silnie w ułamkach",
              description: "Rozpisz większą silnię jako iloczyn mniejszej i brakujących czynników: $n! = n \\cdot (n-1)!$.",
              tip: "Nigdy nie mnóż wielkich liczb przed skróceniem ułamka!"
            },
            {
              stepNumber: 3,
              title: "Uwzględnij osoby siedzące obok siebie",
              description: "Jeśli dwie osoby muszą stać obok siebie, 'sklej je' w jeden super-element. Wynik pomnóż przez $2!$ (ich wewnętrzne przestawienie).",
              tip: "Metoda klejenia elementów to ulubiony schemat CKE."
            }
          ],
          core_formulas: [
            {
              name: "Definicja silni i permutacja",
              formula: "n! = 1 \\cdot 2 \\cdot \\dots \\cdot n, \\quad 0! = 1, \\quad P_n = n!"
            },
            {
              name: "Własność redukcyjna silni",
              formula: "\\frac{n!}{(n-1)!} = n, \\quad \\frac{n!}{(n-2)!} = n(n-1)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Oblicz wartość ułamka: $\\frac{8!}{6! \\cdot 2!}$.",
              solution: "1. Rozpisujemy większą silnię w liczniku do poziomu $6!$:\n$$8! = 8 \\cdot 7 \\cdot 6!$$\n2. Wstawiamy do ułamka i skracamy $6!$:\n$$\\frac{8 \\cdot 7 \\cdot 6!}{6! \\cdot (2 \\cdot 1)} = \\frac{8 \\cdot 7}{2}$$\n3. Skracamy 8 z 2:\n$$4 \\cdot 7 = 28$$\nOdpowiedź: Wartość wynosi $28$.",
              keyInsight: "Skrócenie 6! w ułamku zajmuje 3 sekundy i chroni przed liczeniem 40320 / 1440."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Osoby obok siebie w kinie)",
              points: "1 pkt",
              problem: "Cztery dziewczynki i trzech chłopców siada w jednym rzędzie na 7 ponumerowanych krzesłach. Na ile sposobów mogą usiąść, jeśli wszystkie dziewczynki muszą siedzieć obok siebie?",
              solution: "1. Sklejamy 4 dziewczynki w jeden blok $[D_1 D_2 D_3 D_4]$.\n2. Mamy teraz 4 obiekty do ustawienia: blok dziewczynek oraz 3 chłopców:\n$$P_4 = 4! = 24$$\n3. Wewnątrz bloku dziewczynki mogą zamieniać się miejscami na $4!$ sposobów:\n$$4! = 24$$\n4. Z reguły mnożenia łączna liczba sposobów wynosi:\n$$4! \\cdot 4! = 24 \\cdot 24 = 576$$\nOdpowiedź: Mogą usiąść na 576 sposobów.",
              keyInsight: "Metoda sklejenia: przestawiasz 4 obiekty (4!) i mnożysz przez wewnętrzne permutacje dziewczynek (4!)."
            }
          ],
          trap_details: {
            fail: "Błąd: Skracanie liczb wewnątrz silni, np. 8! / 4! = 2!.",
            win: "Poprawnie: 8! / 4! to NIE JEST 2! Silnia to iloczyn: 8! / 4! = 8 * 7 * 6 * 5 = 1680, podczas gdy 2! = 2.",
            explanation: "Znaku wykrzyknika nie wolno skracać jak zwykłego czynnika liczbowego.",
            ckeTip: "Nigdy nie dziel liczb wewnątrz wykrzykników! Zawsze rozpisz: 8! = 8 * 7 * 6 * 5 * 4!."
          },
          exam_trap: "Dzielenie liczb pod silnią ($6! / 3! = 2!$ – totalny błąd kardynalny)!",
          key_points: [
            "$n! = n \\cdot (n-1)!$.",
            "$0! = 1$ oraz $1! = 1$.",
            "Nigdy nie wolno dzielić argumentów silni przed ich rozpisaniem."
          ]
        }
      },
      {
        id: "math-lesson-14-3",
        order: 3,
        title: "Klasyczna definicja prawdopodobieństwa P(A) = |A| / |Omega|",
        short_title: "Definicja klasyczna P(A)",
        badge: "Lekcja 14.3",
        archetypeCode: "ARCH-143",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W modelu klasycznym Laplace'a przestrzeń zdarzeń elementarnych $\\Omega$ składa się ze skończonej liczby jednakowo prawdopodobnych zdarzeń. Prawdopodobieństwo zdarzenia $A$ to stosunek liczby zdarzeń sprzyjających $|A|$ do liczby wszystkich możliwych zdarzeń $|\\Omega|$: $P(A) = \\frac{|A|}{|\\Omega|}$. Prawdopodobieństwo ZAWSZE mieści się w przedziale domkniętym: $0 \\le P(A) \\le 1$. Zdarzenie niemożliwe ma $P(\\emptyset) = 0$, a pewne $P(\\Omega) = 1$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte lub otwarte za 1–2 pkt • Rzut dwiema kostkami lub losowanie kul.",
          plain_polish: "Z polskiego na nasze: Prawdopodobieństwo to ułamek: na dole wpisujesz WSZYSTKIE możliwe scenariusze ($|\\Omega|$), a na górze tylko te DOBRE, o które pytają w zadaniu ($|A|$). Dla dwóch kostek do gry podłoga to ZAWSZE $|\\Omega| = 6 \\cdot 6 = 36$. Wynik nigdy nie może wyjść większy niż 1 ani ujemny!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wyznacz moc przestrzeni |Omega|",
              description: "Oblicz ile jest wszystkich możliwych wyników doświadczenia. Dla 2 kostek: $6 \\cdot 6 = 36$. Dla 2 monet: $2 \\cdot 2 = 4$.",
              tip: "Zapisz wyraźnie: |Omega| = ..."
            },
            {
              stepNumber: 2,
              title: "Wypisz zdarzenia sprzyjające A",
              description: "Zastosuj tabelę $6 \\times 6$ dla dwóch kostek lub wypisz pary sumujące się do danej liczby.",
              tip: "Pary uporządkowane: (2, 5) to co innego niż (5, 2)!"
            },
            {
              stepNumber: 3,
              title: "Oblicz iloraz P(A) = |A| / |Omega|",
              description: "Podstaw do wzoru i skróć ułamek do postaci nieskracalnej.",
              tip: "Sprawdź, czy 0 <= P(A) <= 1."
            }
          ],
          core_formulas: [
            {
              name: "Klasyczna definicja prawdopodobieństwa",
              formula: "P(A) = \\frac{|A|}{|\\Omega|} \\quad (0 \\le P(A) \\le 1)"
            },
            {
              name: "Przestrzeń rzutu dwiema kostkami",
              formula: "|\\Omega| = 6^2 = 36"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE (Dwie kostki)",
              points: "2 pkt",
              problem: "Rzucamy dwa razy symetryczną sześcienną kostką do gry. Oblicz prawdopodobieństwo zdarzenia $A$ polegającego na tym, że suma wyrzuconych oczek jest równa 8.",
              solution: "1. Liczba wszystkich zdarzeń elementarnych: $|\\Omega| = 6 \\cdot 6 = 36$.\n2. Wypisujemy wszystkie pary dające sumę 8:\n$$A = \\{ (2, 6), (3, 5), (4, 4), (5, 3), (6, 2) \\}$$\nLiczba zdarzeń sprzyjających: $|A| = 5$.\n3. Obliczamy prawdopodobieństwo:\n$$P(A) = \\frac{|A|}{|\\Omega|} = \\frac{5}{36}$$\nOdpowiedź: $P(A) = \\frac{5}{36}$.",
              keyInsight: "Pary (2, 6) i (6, 2) to dwa różne zdarzenia elementarne, a (4, 4) występuje tylko raz."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Losowanie kul ze zwracaniem vs bez)",
              points: "1 pkt",
              problem: "W urnie jest 4 kule białe i 6 czarnych. Losujemy jedną kulę. Prawdopodobieństwo wylosowania kuli białej wynosi:",
              solution: "1. Wszystkich kul w urnie: $|\\Omega| = 4 + 6 = 10$.\n2. Kul sprzyjających (białych): $|A| = 4$.\n3. Prawdopodobieństwo:\n$$P(A) = \\frac{4}{10} = \\frac{2}{5} = 0{,}4$$\nOdpowiedź: $P(A) = \\frac{2}{5}$.",
              keyInsight: "Łączna liczba kul w urnie to mianownik ułamka prawdopodobieństwa."
            }
          ],
          trap_details: {
            fail: "Błąd: Uznawanie par (2, 6) i (6, 2) za jedno zdarzenie i podawanie |A| = 3 zamiast 5.",
            win: "Poprawnie: Kostki są rozróżnialne (np. pierwsza i druga). Wyrzucenie 2 na pierwszej i 6 na drugiej to inny wynik niż 6 na pierwszej i 2 na drugiej!",
            explanation: "Tylko pary z identycznymi liczbami (np. (4, 4)) występują dokładnie jeden raz.",
            ckeTip: "Dla dwóch kostek narysuj w brudnopisie tabelkę 6x6 – wtedy nie pominiesz żadnej pary."
          },
          exam_trap: "Wynik prawdopodobieństwa większy od 1 (np. $P(A) = 36/5$) – natychmiastowy sygnał błędu!",
          key_points: [
            "$0 \\le P(A) \\le 1$ – prawdopodobieństwo nigdy nie jest ujemne ani większe od 1.",
            "Dla 2 kostek $|\\Omega| = 36$.",
            "Pary $(a, b)$ i $(b, a)$ są odrębnymi zdarzeniami, jeśli $a \\neq b$."
          ]
        }
      },
      {
        id: "math-lesson-14-4",
        order: 4,
        title: "Drzewo stochastyczne w doświadczeniach wieloetapowych",
        short_title: "Drzewo stochastyczne",
        badge: "Lekcja 14.4",
        archetypeCode: "ARCH-144",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Drzewo stochastyczne wizualizuje doświadczenia wieloetapowe (np. kolejne losowania bez zwracania z urny). Reguły drzewa: 1) Reguła mnożenia wzdłuż gałęzi: prawdopodobieństwo danej ścieżki (ciągu zdarzeń) jest iloczynem prawdopodobieństw na jej gałęziach; 2) Reguła dodawania między ścieżkami: prawdopodobieństwo całego zdarzenia to suma prawdopodobieństw wszystkich sprzyjających ścieżek; 3) Suma prawdopodobieństw wychodzących z jednego węzła wynosi ZAWSZE 1.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 2 pkt • Losowanie dwóch kul bez zwracania.",
          plain_polish: "Z polskiego na nasze: Jak idziesz po jednej gałęzi w głąb drzewa – MNOŻYSZ ułamki. Jak masz kilka pasujących gałęzi – DODAJESZ ich wyniki. Przy losowaniu BEZ ZWRACANIA pamiętaj: w drugim losowaniu w urnie jest o 1 kulę mniej (mianownik spada np. z 10 na 9) i kuli wylosowanego koloru też ubyło!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Narysuj drzewo 2-etapowe",
              description: "Rozgałęź start na kolory (np. B i C). Z każdego wyniku wyprowadź drugie losowanie.",
              tip: "Podpisz każdą gałąź ułamkiem prawdopodobieństwa."
            },
            {
              stepNumber: 2,
              title: "Zredukuj liczby kul przy braku zwracania",
              description: "W drugim etapie w mianowniku jest $N - 1$. Jeśli w pierwszym etapie wylosowano białą, liczba białych w liczniku spada o 1.",
              tip: "Liczba kul innego koloru w drugim etapie pozostaje bez zmian!"
            },
            {
              stepNumber: 3,
              title: "Pomnóż wzdłuż ścieżek i zsumuj",
              description: "Wskaż ścieżki sprzyjające (np. B-C oraz C-B dla kul różnych kolorów), pomnóż ułamki na gałęziach i dodaj wyniki.",
              tip: "Wspólny mianownik dla obu ścieżek jest ten sam: N * (N - 1)."
            }
          ],
          core_formulas: [
            {
              name: "Prawdopodobieństwo ścieżki (wzdłuż gałęzi)",
              formula: "P(\\text{ścieżka}) = P(E_1) \\cdot P(E_2 | E_1)"
            },
            {
              name: "Prawdopodobieństwo całkowite zdarzenia",
              formula: "P(A) = \\sum P(\\text{ścieżki sprzyjające})"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "2 pkt",
              problem: "W urnie jest 3 kule białe i 5 czarnych. Losujemy kolejno dwa razy po jednej kuli bez zwracania. Oblicz prawdopodobieństwo wylosowania kul o różnych kolorach.",
              solution: "1. Razem kul na starcie: $3 + 5 = 8$.\n2. Zdarzeniu sprzyjają dwie ścieżki:\n- Ścieżka 1: (Biała, potem Czarna) $\\implies P(B_1 C_2) = \\frac{3}{8} \\cdot \\frac{5}{7} = \\frac{15}{56}$\n- Ścieżka 2: (Czarna, potem Biała) $\\implies P(C_1 B_2) = \\frac{5}{8} \\cdot \\frac{3}{7} = \\frac{15}{56}$\n3. Dodajemy prawdopodobieństwa obu ścieżek:\n$$P(A) = \\frac{15}{56} + \\frac{15}{56} = \\frac{30}{56} = \\frac{15}{28}$$\nOdpowiedź: Prawdopodobieństwo wynosi $\\frac{15}{28}$.",
              keyInsight: "Po wyciągnięciu pierwszej kuli w urnie zostaje 7 kul, stąd mianownik 7 w drugim kroku."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Dwie kule tego samego koloru)",
              points: "2 pkt",
              problem: "Z tej samej urny (3 białe, 5 czarnych) losujemy dwa razy bez zwracania. Oblicz prawdopodobieństwo wylosowania kul tego samego koloru.",
              solution: "1. Ścieżki sprzyjające to (Biała, Biała) oraz (Czarna, Czarna).\n2. Obliczamy:\n$$P(B_1 B_2) = \\frac{3}{8} \\cdot \\frac{2}{7} = \\frac{6}{56}$$\n$$P(C_1 C_2) = \\frac{5}{8} \\cdot \\frac{4}{7} = \\frac{20}{56}$$\n3. Sumujemy:\n$$P = \\frac{6}{56} + \\frac{20}{56} = \\frac{26}{56} = \\frac{13}{28}.$$\n(Zauważ: $\\frac{15}{28} + \\frac{13}{28} = \\frac{28}{28} = 1$ – zdarzenia przeciwne!).",
              keyInsight: "Gdy losujesz drugą białą, w urnie zostały już tylko 2 białe z 7 kul."
            }
          ],
          trap_details: {
            fail: "Błąd: Niezmienianie mianownika w drugim losowaniu bez zwracania (pisanie 3/8 * 5/8 zamiast 3/8 * 5/7).",
            win: "Poprawnie: 'Bez zwracania' oznacza, że kula NIE WRACA do urny. Mianownik w drugim kroku to bezwzględnie 7!",
            explanation: "Brak redukcji mianownika to traktowanie losowania jako 'ze zwracaniem'.",
            ckeTip: "Zawsze sprawdź w tekście zwrot: 'bez zwracania' czy 'ze zwracaniem'."
          },
          exam_trap: "Zapomnienie o uwzględnieniu obu kolejności przy kulach różnych kolorów (B-C oraz C-B)!",
          key_points: [
            "Wzdłuż gałęzi MNOŻYSZ, między gałęziami DODAJESZ.",
            "Bez zwracania: mianownik drugiego ułamka maleje o 1.",
            "Kule o różnych kolorach to DWIE ścieżki: (B, C) oraz (C, B)."
          ]
        }
      },
      {
        id: "math-lesson-14-5",
        order: 5,
        title: "Własności prawdopodobieństwa i zdarzenie przeciwne",
        short_title: "Zdarzenie przeciwne i własności",
        badge: "Lekcja 14.5",
        archetypeCode: "ARCH-145",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Własności rachunku prawdopodobieństwa: 1) Zdarzenie przeciwne $A'$: zachodzi wtedy i tylko wtedy, gdy NIE zachodzi $A$. Wzór kluczowy: $P(A) = 1 - P(A')$. Używamy go ZAWSZE, gdy w treści pojawia się zwrot „co najmniej raz”; 2) Suma zdarzeń: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$; 3) Zdarzenia rozłączne ($A \\cap B = \\emptyset$): $P(A \\cup B) = P(A) + P(B)$; 4) Zawieranie zdarzeń: jeśli $A \\subset B$, to $P(A) \\le P(B)$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Zadania z wzorem na P(A u B) lub 'co najmniej jeden'.",
          plain_polish: "Z polskiego na nasze: Gdy widzisz w treści słowa „co najmniej jeden sukces”, NIE LICZ każdego przypadku osobno! Znacznie szybciej policzyć zdarzenie przeciwne: „ZERO sukcesów” (same porażki) i odjąć ten ułamek od 1! A gdy masz dane $P(A), P(B)$ i sumę – wstaw do wzoru z tablic i wylicz część wspólną.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wypisz dane prawdopodobieństwa",
              description: "Zapisz $P(A)$, $P(B)$ oraz $P(A \\cup B)$ lub $P(A \\cap B)$.",
              tip: "Upewnij się, że wszystkie prawdopodobieństwa są <= 1."
            },
            {
              stepNumber: 2,
              title: "Zastosuj tożsamość sumy zdarzeń",
              description: "Podstaw do wzoru: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
              tip: "Przekształć wzór, aby wyznaczyć szukaną wielkość."
            },
            {
              stepNumber: 3,
              title: "Zastosuj regułę zdarzenia przeciwnego",
              description: "Dla zwrotu 'co najmniej raz': $P(A) = 1 - P(A')$, gdzie $A'$ oznacza 'ani razu'.",
              tip: "Odejmij ułamek od 1, np. 1 - 25/36 = 11/36."
            }
          ],
          core_formulas: [
            {
              name: "Prawdopodobieństwo zdarzenia przeciwnego",
              formula: "P(A') = 1 - P(A) \\iff P(A) = 1 - P(A')"
            },
            {
              name: "Prawdopodobieństwo sumy zdarzeń",
              formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Dane są zdarzenia losowe $A, B \\subset \\Omega$, dla których $P(A) = 0{,}6$, $P(B) = 0{,}5$ oraz $P(A \\cup B) = 0{,}8$. Oblicz $P(A \\cap B)$.",
              solution: "1. Stosujemy wzór na sumę zdarzeń:\n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$\n2. Podstawiamy dane liczbowe:\n$$0{,}8 = 0{,}6 + 0{,}5 - P(A \\cap B)$$\n$$0{,}8 = 1{,}1 - P(A \\cap B)$$\n3. Przenosimy:\n$$P(A \\cap B) = 1{,}1 - 0{,}8 = 0{,}3$$\nOdpowiedź: $P(A \\cap B) = 0{,}3$.",
              keyInsight: "Suma 0,6 + 0,5 = 1,1 przekracza 0,8 dokładnie o część wspólną 0,3."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Zdarzenie przeciwne)",
              points: "1 pkt",
              problem: "Rzucamy dwa razy symetryczną monetą. Oblicz prawdopodobieństwo wyrzucenia co najmniej jednego orła.",
              solution: "1. Zdarzenie $A$: 'wyrzucono co najmniej jednego orła'.\n2. Zdarzenie przeciwne $A'$: 'nie wyrzucono ani jednego orła' (czyli wyrzucono same reszki: $(R, R)$).\n3. Moc przestrzeni: $|\\Omega| = 2 \\cdot 2 = 4$. Zdarzenie przeciwne ma tylko 1 wynik: $|A'| = 1$.\n4. Obliczamy prawdopodobieństwo zdarzenia przeciwnego:\n$$P(A') = \\frac{1}{4}$$\n5. Ze wzoru na zdarzenie przeciwne:\n$$P(A) = 1 - P(A') = 1 - \\frac{1}{4} = \\frac{3}{4}$$\nOdpowiedź: Prawdopodobieństwo wynosi $\\frac{3}{4}$.",
              keyInsight: "Zdarzenie przeciwne do 'co najmniej jeden orzeł' to 'zero orłów' (same reszki)."
            }
          ],
          trap_details: {
            fail: "Błąd: Dodawanie P(A u B) = P(A) + P(B) bez odejmowania części wspólnej, co daje wynik 0,6 + 0,5 = 1,1 > 1.",
            win: "Poprawnie: Zdarzenia nie są rozłączne, więc część wspólna jest liczona podwójnie! ZAWSZE odejmij P(A i B).",
            explanation: "Prawdopodobieństwo nigdy nie może przekroczyć 1.",
            ckeTip: "Gdy suma P(A) + P(B) przekracza 1, natychmiast przypomnij sobie o odjęciu części wspólnej."
          },
          exam_trap: "Niewłaściwe zdefiniowanie zdarzenia przeciwnego do 'co najmniej raz' – przeciwne to 'ANI RAZU', a nie 'dokładnie raz'!",
          key_points: [
            "$P(A) = 1 - P(A')$.",
            "Co najmniej jeden sukces $\\iff 1 - P(\\text{zero sukcesów})$.",
            "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$."
          ]
        }
      }
    ]
  },
  {
    id: "dzial-15",
    numericId: 15,
    title: "Statystyka opisowa i optymalizacja",
    short_title: "Statystyka i optymalizacja",
    description: "Średnia arytmetyczna i ważona, mediana i dominanta, odchylenie standardowe i wariancja, analiza diagramów oraz zadania optymalizacyjne.",
    icon: "PieChart",
    color: "#FFB800",
    matura_points_range: "3–5 pkt",
    importance: "HIGH",
    lessons: [
      {
        id: "math-lesson-15-1",
        order: 1,
        title: "Średnia arytmetyczna i średnia ważona danych",
        short_title: "Średnia arytmetyczna i ważona",
        badge: "Lekcja 15.1",
        archetypeCode: "ARCH-151",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Średnia arytmetyczna zestawu $n$ liczb to ich suma podzielona przez ich liczbę: $\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n} \\iff x_1 + x_2 + \\dots + x_n = n \\cdot \\bar{x}$. Średnia ważona uwzględnia wagi (istotność) poszczególnych ocen: $\\bar{x}_w = \\frac{w_1 x_1 + w_2 x_2 + \\dots + w_k x_k}{w_1 + w_2 + \\dots + w_k}$. W mianowniku średniej ważonej stoi ZAWSZE SUMA WAG, a nie liczba ocen!",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Wyznaczanie brakującej liczby w zestawie o danej średniej.",
          plain_polish: "Z polskiego na nasze: Jeśli średnia 5 liczb wynosi 12, to ich łączna suma to $5 \\cdot 12 = 60$! W średniej ważonej mnożysz każdą ocenę przez jej wagę, dodajesz te iloczyny na górze, a na dole dzielisz przez SUMĘ WSZYSTKICH WAG. Nie dziel przez liczbę ocen!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz łączną sumę danych ze średniej",
              description: "Skorzystaj z tożsamości: $\\text{Suma} = n \\cdot \\bar{x}$.",
              tip: "To najszybszy sposób na znalezienie brakującej niewiadomej x."
            },
            {
              stepNumber: 2,
              title: "Dla średniej ważonej: pomnóż oceny przez wagi",
              description: "Oblicz iloczyny $w_i \\cdot x_i$ i dodaj je w liczniku.",
              tip: "Licznik to łączny dorobek punktowy z uwzględnieniem wag."
            },
            {
              stepNumber: 3,
              title: "Podziel przez sumę wag",
              description: "W mianowniku zsumuj same wagi: $w_1 + w_2 + \\dots + w_k$.",
              tip: "Nigdy nie dziel przez liczbę składników k!"
            }
          ],
          core_formulas: [
            {
              name: "Średnia arytmetyczna",
              formula: "\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}"
            },
            {
              name: "Średnia ważona",
              formula: "\\bar{x}_w = \\frac{w_1 x_1 + w_2 x_2 + \\dots + w_k x_k}{w_1 + w_2 + \\dots + w_k}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Średnia arytmetyczna zestawu danych $3, 7, 8, x, 12$ jest równa $8$. Oblicz liczbę $x$.",
              solution: "1. W zestawie jest $n = 5$ liczb, a ich średnia to 8.\n2. Łączna suma wszystkich liczb wynosi:\n$$\\text{Suma} = n \\cdot \\bar{x} = 5 \\cdot 8 = 40$$\n3. Sumujemy znane liczby:\n$$3 + 7 + 8 + 12 = 30$$\n4. Obliczamy niewiadomą $x$:\n$$30 + x = 40 \\implies x = 10$$\nOdpowiedź: Liczba $x$ jest równa $10$.",
              keyInsight: "Mnożenie średniej przez liczbę elementów n = 5 natychmiast daje sumę całkowitą 40."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Średnia ważona)",
              points: "1 pkt",
              problem: "Uczeń otrzymał oceny: 5 (z wagą 3), 4 (z wagą 2) oraz 2 (z wagą 5). Średnia ważona jego ocen jest równa:",
              solution: "1. Obliczamy licznik (suma iloczynów ocena * waga):\n$$L = 5 \\cdot 3 + 4 \\cdot 2 + 2 \\cdot 5 = 15 + 8 + 10 = 33$$\n2. Obliczamy mianownik (suma wag):\n$$M = 3 + 2 + 5 = 10$$\n3. Obliczamy średnią ważoną:\n$$\\bar{x}_w = \\frac{33}{10} = 3{,}3$$\nOdpowiedź: Średnia ważona wynosi $3{,}3$.",
              keyInsight: "W mianowniku dzielimy przez sumę wag (10), a NIE przez liczbę ocen (3)."
            }
          ],
          trap_details: {
            fail: "Błąd: Dzielenie w średniej ważonej przez 3 (liczbę ocen) zamiast przez sumę wag 10 (33 / 3 = 11 - ocena 11!).",
            win: "Poprawnie: W mianowniku średniej ważonej ZAWSZE stoi suma wag: w_1 + w_2 + ... + w_k.",
            explanation: "Średnia ocen nie może wyjść większa niż maksymalna możliwa ocena (5).",
            ckeTip: "Zawsze sprawdź: wynik średniej MUSI leżeć pomiędzy najmniejszą a największą oceną!"
          },
          exam_trap: "Dzielenie przez liczbę ocen zamiast przez sumę wag w średniej ważonej!",
          key_points: [
            "Suma wszystkich elementów to $n \\cdot \\bar{x}$.",
            "W średniej ważonej mianownik to $\\sum w_i$ (suma wag).",
            "Średnia arytmetyczna zawsze leży między wartością minimalną a maksymalną."
          ]
        }
      },
      {
        id: "math-lesson-15-2",
        order: 2,
        title: "Mediana i dominanta (moda) zestawu liczb",
        short_title: "Mediana i dominanta",
        badge: "Lekcja 15.2",
        archetypeCode: "ARCH-152",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Mediana (wartość środkowa) to element leżący dokładnie pośrodku UPORZĄDKOWANEGO NIEMALEJĄCO zestawu danych. Dla nieparzystej liczby danych $n$: mediana to element środkowy $M_e = x_{\\frac{n+1}{2}}$. Dla parzystej liczby danych $n$: mediana to ŚREDNIA ARYTMETYCZNA dwóch elementów środkowych: $M_e = \\frac{x_{n/2} + x_{n/2 + 1}}{2}$. Dominanta (moda) to wartość występująca w zestawie NAJCZĘŚCIEJ.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Żelazny pewniak: wyznaczenie mediany z tabeli lub ciągu liczb.",
          plain_polish: "Z polskiego na nasze: Zanim policzysz medianę, MUSISZ USTAWIĆ LICZBY OD NAJMNIEJSZEJ DO NAJWIĘKSZEJ! Jeśli tego nie zrobisz, masz 0 punktów. Potem skreślasz po jednej z lewej i z prawej: jeśli zostanie jedna liczba w środku – to Twoja mediana. Jeśli zostaną dwie liczby – dodajesz je i dzielisz przez 2. Dominanta to 'król popularności' – liczba, która pojawia się najwięcej razy.",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Uporządkuj liczby niemalejąco",
              description: "Wypisz liczby w kolejności od najmniejszej do największej. Policz ile ich jest ($n$).",
              tip: "To absolutnie obowiązkowy krok 1 – bez uporządkowania mediana jest fałszywa!"
            },
            {
              stepNumber: 2,
              title: "Sprawdź parzystość n",
              description: "Jeśli $n$ jest nieparzyste (np. 7) $\\implies$ wybierz 1 liczbę ze środka (4. element). Jeśli $n$ jest parzyste (np. 8) $\\implies$ weź średnią z 4. i 5. elementu.",
              tip: "Dla parzystego n mediana może być ułamkiem z połówką, np. 3,5."
            },
            {
              stepNumber: 3,
              title: "Wskaż dominantę",
              description: "Znajdź liczbę o największej częstości występowania.",
              tip: "Dominanta nie wymaga żadnych obliczeń – to najczęstsza wartość."
            }
          ],
          core_formulas: [
            {
              name: "Mediana dla nieparzystej liczby danych",
              formula: "M_e = x_{\\frac{n+1}{2}} \\quad (\\text{po uporządkowaniu})"
            },
            {
              name: "Mediana dla parzystej liczby danych",
              formula: "M_e = \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2} + 1}}{2}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Wyznacz medianę zestawu danych: $4, 8, 2, 9, 3, 7, 5, 8$.",
              solution: "1. Liczba danych: $n = 8$ (parzysta).\n2. Porządkujemy liczby niemalejąco:\n$$2, 3, 4, 5, 7, 8, 8, 9$$\n3. Ponieważ $n = 8$, bierzemy dwa środkowe elementy (czwarty i piąty):\n$$x_4 = 5, \\quad x_5 = 7$$\n4. Obliczamy ich średnią arytmetyczną:\n$$M_e = \\frac{5 + 7}{2} = \\frac{12}{2} = 6$$\nOdpowiedź: Mediana wynosi $6$.",
              keyInsight: "Średnia z 5 i 7 to 6 – mediana nie musi być liczbą z wyjściowego zestawu."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Mediana z niewiadomą)",
              points: "1 pkt",
              problem: "Mediana uporządkowanego rosnąco zestawu liczb $2, 3, x, 7, 9, 11$ jest równa $5{,}5$. Oblicz $x$.",
              solution: "1. Zestaw jest już uporządkowany i ma $n = 6$ liczb (parzysta).\n2. Środkowe elementy to trzeci i czwarty: $x_3 = x$ oraz $x_4 = 7$.\n3. Z definicji mediany:\n$$M_e = \\frac{x + 7}{2} = 5{,}5$$\n4. Rozwiązujemy równanie:\n$$x + 7 = 11 \\implies x = 4$$\nOdpowiedź: $x = 4$.",
              keyInsight: "Sprawdzamy: dla x = 4 ciąg 2, 3, 4, 7, 9, 11 jest poprawnie uporządkowany (4 leży między 3 a 7)."
            }
          ],
          trap_details: {
            fail: "Błąd: Wyznaczanie mediany z liczb nieuporządkowanych (np. branie środkowych z 4, 8, 2, 9, 3, 7, 5, 8).",
            win: "Poprawnie: ZAWSZE pierwszym krokiem jest przepisanie liczb rosnąco: 2, 3, 4, 5, 7, 8, 8, 9.",
            explanation: "Mediana bez uporządkowania to losowa liczba niemająca żadnego sensu statystycznego.",
            ckeTip: "Pierwsza linijka w Twoim brudnopisie to: 'PORZĄDKUJĘ DANE: ...'."
          },
          exam_trap: "Zapomnienie o podzieleniu przez 2 sumy dwóch środkowych elementów przy parzystej liczbie danych!",
          key_points: [
            "Zawsze uporządkuj dane niemalejąco przed szukaniem mediany.",
            "Dla parzystego $n$: mediana to średnia dwóch środkowych.",
            "Dominanta to wartość występująca najczęściej."
          ]
        }
      },
      {
        id: "math-lesson-15-3",
        order: 3,
        title: "Odchylenie standardowe i wariancja próby",
        short_title: "Odchylenie standardowe i wariancja",
        badge: "Lekcja 15.3",
        archetypeCode: "ARCH-153",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Wariancja $\\sigma^2$ to średnia arytmetyczna kwadratów odchyleń poszczególnych wartości od średniej arytmetycznej: $\\sigma^2 = \\frac{(x_1 - \\bar{x})^2 + (x_2 - \\bar{x})^2 + \\dots + (x_n - \\bar{x})^2}{n}$. Odchylenie standardowe $\\sigma$ to pierwiastek kwadratowy z wariancji: $\\sigma = \\sqrt{\\sigma^2}$. Obie wielkości mierzą rozrzut danych wokół średniej: im mniejsze odchylenie, tym dane są bardziej skupione wokół średniej.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Obliczenie wariancji małego zestawu liczb (3–5 elementów).",
          plain_polish: "Z polskiego na nasze: Wariancja mówi: „jak bardzo liczby rozbiegły się od średniej”. Krok po kroku: 1) liczysz średnią; 2) od każdej liczby odejmujesz średnią; 3) te różnice podnosisz do kwadratu (żeby zniknęły minusy!); 4) wyciągasz średnią z tych kwadratów – to wariancja. Jak na koniec wyciągniesz pierwiastek – masz odchylenie standardowe!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Oblicz średnią arytmetyczną zestawu",
              description: "Zsumuj liczby i podziel przez $n$, aby otrzymać $\\bar{x}$.",
              tip: "Średnia musi być dokładna – błąd w średniej psuje całą wariancję."
            },
            {
              stepNumber: 2,
              title: "Oblicz kwadraty odchyleń od średniej",
              description: "Dla każdej liczby oblicz $(x_i - \\bar{x})^2$. Wszystkie te wartości są nieujemne!",
              tip: "Kwadrat liczby ujemnej to liczba dodatnia, np. (-2)^2 = 4."
            },
            {
              stepNumber: 3,
              title: "Wylicz wariancję i spierwiastkuj",
              description: "Zsumuj kwadraty odchyleń i podziel przez $n$ (to wariancja $\\sigma^2$). Wyciągnij pierwiastek, aby otrzymać odchylenie $\\sigma$.",
              tip: "Odchylenie standardowe to sigma = sqrt(wariancja)."
            }
          ],
          core_formulas: [
            {
              name: "Wzór na wariancję",
              formula: "\\sigma^2 = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2 = \\frac{(x_1 - \\bar{x})^2 + \\dots + (x_n - \\bar{x})^2}{n}"
            },
            {
              name: "Wzór na odchylenie standardowe",
              formula: "\\sigma = \\sqrt{\\sigma^2} = \\sqrt{\\frac{(x_1 - \\bar{x})^2 + \\dots + (x_n - \\bar{x})^2}{n}}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Oblicz odchylenie standardowe zestawu danych: $2, 4, 6, 8$.",
              solution: "1. Obliczamy średnią arytmetyczną ($n = 4$):\n$$\\bar{x} = \\frac{2 + 4 + 6 + 8}{4} = \\frac{20}{4} = 5$$\n2. Obliczamy kwadraty odchyleń od średniej 5:\n- $(2 - 5)^2 = (-3)^2 = 9$\n- $(4 - 5)^2 = (-1)^2 = 1$\n- $(6 - 5)^2 = 1^2 = 1$\n- $(8 - 5)^2 = 3^2 = 9$\n3. Obliczamy wariancję:\n$$\\sigma^2 = \\frac{9 + 1 + 1 + 9}{4} = \\frac{20}{4} = 5$$\n4. Obliczamy odchylenie standardowe:\n$$\\sigma = \\sqrt{5}$$\nOdpowiedź: Odchylenie standardowe wynosi $\\sqrt{5}$.",
              keyInsight: "Wariancja to 5, a odchylenie standardowe to pierwiastek z wariancji, czyli sqrt(5)."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Własność przesunięcia)",
              points: "1 pkt",
              problem: "Zestaw danych ma odchylenie standardowe $\\sigma = 3$. Jeśli do każdej liczby z tego zestawu dodamy 10, to odchylenie standardowe nowego zestawu będzie równe:",
              solution: "1. Dodanie stałej liczby do każdego elementu przesuwa wszystkie dane o tę samą wartość na osi liczbowej.\n2. Średnia arytmetyczna wzrasta o 10, ale wzajemne odległości między liczbami pozostają BEZ ZMIAN.\n3. Zatem odchylenia $(x_i - \\bar{x})$ są dokładnie takie same jak wcześniej.\n4. Nowe odchylenie standardowe wynosi nadal $\\sigma = 3$.\nOdpowiedź: $\\sigma = 3$.",
              keyInsight: "Dodanie lub odjęcie stałej NIE ZMIENIA odchylenia standardowego ani wariancji!"
            }
          ],
          trap_details: {
            fail: "Błąd: Podawanie wariancji zamiast odchylenia standardowego (np. odpowiedź 5 zamiast sqrt(5)).",
            win: "Poprawnie: Wariancja to sigma^2, a odchylenie to sigma (musisz wyciągnąć pierwiastek!).",
            explanation: "Zwracaj baczną uwagę na słowa w pytaniu: 'wariancja' czy 'odchylenie standardowe'.",
            ckeTip: "Odchylenie ma tę samą jednostkę co dane (dlatego pierwiastkujemy kwadraty)."
          },
          exam_trap: "Zapominanie o podniesieniu odchyleń do kwadratu – suma samych różnic $(x_i - \\bar{x})$ ZAWSZE wynosi 0!",
          key_points: [
            "Wariancja: $\\sigma^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n}$.",
            "Odchylenie standardowe: $\\sigma = \\sqrt{\\sigma^2}$.",
            "Dodanie stałej liczby do wszystkich danych nie zmienia odchylenia standardowego."
          ]
        }
      },
      {
        id: "math-lesson-15-4",
        order: 4,
        title: "Interpretacja diagramów słupkowych, kołowych i tabel",
        short_title: "Diagramy i tabele statystyczne",
        badge: "Lekcja 15.4",
        archetypeCode: "ARCH-154",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "W zadaniach z wykresami CKE kluczowe jest rozróżnienie wartości badanej cechy $x_i$ (np. oceny, liczby rodzeństwa) od jej liczebności / częstości $n_i$ (liczby osób, wysokości słupka). Łączna liczebność to suma wysokości wszystkich słupków: $N = \\sum n_i$. Średnia z tabeli/diagramu to $\\bar{x} = \\frac{\\sum (x_i \\cdot n_i)}{N}$. Na diagramie kołowym udział procentowy przelicza się na kąt środkowy: $\\alpha = p\\% \\cdot 360^\\circ$.",
          matura_context: "CKE Formuła 2023 • Zadanie zamknięte za 1 pkt • Odczyt mediany lub średniej z diagramu słupkowego.",
          plain_polish: "Z polskiego na nasze: Spójrz na osie diagramu: pozioma oś to zazwyczaj CECHA (np. ocena: 1, 2, 3...), a pionowa oś to ILE OSÓB dostało taką ocenę (liczebność). Żeby policzyć średnią klasy, mnóż ocenę przez liczbę uczniów i podziel przez łączną liczbę uczniów w klasie!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Zidentyfikuj cechę i liczebność",
              description: "Ustal, co jest wartością $x_i$, a co liczebnością $n_i$ ze słupków.",
              tip: "Zsumuj wysokości słupków, aby poznać łączną liczbę osób N."
            },
            {
              stepNumber: 2,
              title: "Wyznacz średnią z tabeli",
              description: "Pomnóż każdą wartość przez jej liczebność, dodaj iloczyny i podziel przez łączną sumę liczebności $N$.",
              tip: "Wzór: (x1*n1 + x2*n2 + ...) / N."
            },
            {
              stepNumber: 3,
              title: "Wyznacz medianę z liczebności skumulowanej",
              description: "Połowa liczebności to $\\frac{N}{2}$. Sprawdź, na którym słupku ląduje środkowa osoba.",
              tip: "To eliminuje konieczność mozolnego wypisywania 30 liczb w rzędzie!"
            }
          ],
          core_formulas: [
            {
              name: "Średnia z szeregu rozdzielczego (tabeli / diagramu)",
              formula: "\\bar{x} = \\frac{x_1 n_1 + x_2 n_2 + \\dots + x_k n_k}{n_1 + n_2 + \\dots + n_k} = \\frac{1}{N} \\sum_{i=1}^k x_i n_i"
            },
            {
              name: "Kąt na diagramie kołowym",
              formula: "\\alpha = \\frac{n_i}{N} \\cdot 360^\\circ"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Standardowe CKE",
              points: "1 pkt",
              problem: "Tabela przedstawia oceny ze sprawdzianu w klasie:\nOcena: 2 (4 uczniów), 3 (6 uczniów), 4 (8 uczniów), 5 (2 uczniów).\nOblicz średnią arytmetyczną ocen tej klasy.",
              solution: "1. Obliczamy łączną liczbę uczniów w klasie ($N$):\n$$N = 4 + 6 + 8 + 2 = 20$$\n2. Obliczamy sumę iloczynów ocena * liczba uczniów:\n$$\\text{Suma} = 2 \\cdot 4 + 3 \\cdot 6 + 4 \\cdot 8 + 5 \\cdot 2 = 8 + 18 + 32 + 10 = 68$$\n3. Obliczamy średnią:\n$$\\bar{x} = \\frac{68}{20} = \\frac{34}{10} = 3{,}4$$\nOdpowiedź: Średnia ocen wynosi $3{,}4$.",
              keyInsight: "Mianownikiem jest 20 (łączna liczba uczniów), a nie 4 (liczba rodzajów ocen)."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Mediana z diagramu)",
              points: "1 pkt",
              problem: "Dla danych z powyższej tabeli (20 uczniów) wyznacz medianę ocen.",
              solution: "1. Łącznie mamy $N = 20$ ocen (liczba parzysta).\n2. Mediana to średnia arytmetyczna oceny 10. i 11. ucznia w uporządkowanym szeregu.\n3. Kumulujemy liczebności od najniższej oceny:\n- Ocenę 2 ma 4 uczniów (pozycje 1–4)\n- Ocenę 3 ma 6 uczniów (pozycje 5–10)\n- Ocenę 4 ma 8 uczniów (pozycje 11–18)\n4. Widzimy, że:\n- 10. uczeń ma ocenę 3\n- 11. uczeń ma ocenę 4\n5. Obliczamy medianę:\n$$M_e = \\frac{3 + 4}{2} = 3{,}5$$\nOdpowiedź: Mediana wynosi $3{,}5$.",
              keyInsight: "Liczebność skumulowana pozwala błyskawicznie ustalić, jakie oceny mają 10. i 11. uczeń."
            }
          ],
          trap_details: {
            fail: "Błąd: Dzielenie sumy ocen (2 + 3 + 4 + 5 = 14) przez 4 i podawanie średniej 3,5 bez uwzględnienia liczby uczniów.",
            win: "Poprawnie: Oceny mają różne wagi (liczebności)! Każdą ocenę musisz pomnożyć przez liczbę uczniów, którzy ją otrzymali.",
            explanation: "Ignorowanie liczebności słupków sprowadza zadanie do średniej samych etykiet.",
            ckeTip: "Pamiętaj: jeśli 8 osób dostało 4, to czwórka występuje 8 razy!"
          },
          exam_trap: "Mylenie osi wartości cechy z osią liczebności na diagramie słupkowym!",
          key_points: [
            "Łączna liczebność $N$ to suma wszystkich częstości (wysokości słupków).",
            "Średnia to suma iloczynów (wartość $\\cdot$ częstość) podzielona przez $N$.",
            "Mediana z tabeli wymaga zlokalizowania środkowych pozycji w skumulowanej liczebności."
          ]
        }
      },
      {
        id: "math-lesson-15-5",
        order: 5,
        title: "Optymalizacja z użyciem funkcji kwadratowej w CKE",
        short_title: "Optymalizacja w arkuszu CKE",
        badge: "Lekcja 15.5",
        archetypeCode: "ARCH-155",
        estimated_time_formatted: "~6 min",
        theory_pill: {
          reading_time_minutes: 3.5,
          concept_essence: "Zadania optymalizacyjne w Formule 2023 CKE polegają na modelowaniu zjawiska ekonomicznego lub geometrycznego za pomocą funkcji kwadratowej $f(x) = ax^2 + bx + c$. Kluczowe schematy: 1) Dochód ze sprzedaży biletów / towaru: $\\text{Dochód}(x) = (\\text{cena} + \\Delta c \\cdot x)(\\text{liczba sztuk} - \\Delta n \\cdot x)$; 2) Pole działki / wybiegu przy stałym obwodzie siatki; 3) Suma kwadratów dwóch liczb o stałej sumie. Argument optymalny to ZAWSZE odcięta wierzchołka paraboli: $x = p = -\\frac{b}{2a}$.",
          matura_context: "CKE Formuła 2023 • Zadanie otwarte za 3–4 pkt • Ostatnie lub przedostatnie zadanie arkusza maturalnego.",
          plain_polish: "Z polskiego na nasze: Np. bilet do kina kosztuje 20 zł i kupuje go 100 osób. Każda podwyżka ceny o 2 zł odstrasza 5 widzów. Wzór na kasę ze sprzedaży po $x$ podwyżkach to: $P(x) = (20 + 2x)(100 - 5x)$. Wymnażasz nawiasy, dostajesz parabolę ze smutnymi ramionami w dół ($a < 0$), a największy utarg jest dokładnie na czubku wierzchołka $p = -\\frac{b}{2a}$!",
          algorithm_steps: [
            {
              stepNumber: 1,
              title: "Wprowadź zmienną x i ułóż wzór funkcji",
              description: "Oznacz przez $x$ liczbę podwyżek/obniżek lub jeden z wymiarów figury. Zapisz iloczyn dwóch czynników.",
              tip: "Zawsze nazwij zmienną: 'Niech x oznacza liczbę podwyżek ceny o 2 zł'."
            },
            {
              stepNumber: 2,
              title: "Podaj dziedzinę zadania",
              description: "Wymiary geometryczne, ceny i liczby biletów muszą być większe od zera. Zapisz przedział dziedziny.",
              tip: "Za podanie dziedziny CKE przyznaje 1 punkt!"
            },
            {
              stepNumber: 3,
              title: "Wymnóż i oblicz współrzędną wierzchołka p",
              description: "Sprowadź funkcję do postaci $ax^2 + bx + c$ i oblicz $x = p = -\\frac{b}{2a}$. Oblicz optymalną cenę lub zysk.",
              tip: "Upewnij się, czy w poleceniu pytają o liczbę podwyżek x, nową cenę, czy o maksymalny dochód!"
            }
          ],
          core_formulas: [
            {
              name: "Wzór na optymalny argument wierzchołka",
              formula: "x_{\\text{opt}} = p = -\\frac{b}{2a} \\quad (a < 0 \\implies \\text{maksimum})"
            },
            {
              name: "Maksymalna wartość zjawiska",
              formula: "f_{\\max} = f(p) = -\\frac{\\Delta}{4a}"
            }
          ],
          worked_examples: [
            {
              title: "Zadanie Modelowe CKE (Maksymalny przychód z biletów)",
              points: "3 pkt",
              problem: "Bilet do teatru kosztuje 40 zł i przy tej cenie teatr sprzedaje średnio 300 biletów na spektakl. Badania wykazały, że każda podwyżka ceny biletu o 5 zł powoduje spadek sprzedaży o 15 biletów. Jaką cenę biletu powinien ustalić teatr, aby uzyskać największy przychód ze sprzedaży? Ile wyniesie ten maksymalny przychód?",
              solution: "1. Oznaczamy: niech $x$ oznacza liczbę podwyżek ceny o 5 zł.\n- Nowa cena biletu: $40 + 5x$\n- Liczba sprzedanych biletów: $300 - 15x$\n2. Dziedzina: cena i liczba widzów muszą być dodatnie:\n$$40 + 5x > 0 \\implies x > -8, \\quad 300 - 15x > 0 \\implies 15x < 300 \\implies x < 20$$\nPonieważ $x$ to liczba podwyżek, $x \\in \\langle 0, 20)$.\n3. Funkcja przychodu $P(x)$:\n$$P(x) = (40 + 5x)(300 - 15x) = 12000 - 600x + 1500x - 75x^2 = -75x^2 + 900x + 12000$$\n4. Jest to funkcja kwadratowa o $a = -75 < 0$, więc osiąga maksimum w wierzchołku:\n$$p = -\\frac{b}{2a} = -\\frac{900}{2 \\cdot (-75)} = -\\frac{900}{-150} = 6$$\nLiczba $x = 6$ mieści się w dziedzinie zadania.\n5. Obliczamy optymalną cenę biletu:\n$$\\text{Cena} = 40 + 5(6) = 40 + 30 = 70\\text{ zł}$$\n6. Obliczamy maksymalny przychód:\n$$P(6) = (40 + 30)(300 - 15 \\cdot 6) = 70 \\cdot (300 - 90) = 70 \\cdot 210 = 14700\\text{ zł}.$$\nOdpowiedź: Teatr powinien ustalić cenę 70 zł. Maksymalny przychód wyniesie 14 700 zł.",
              keyInsight: "Uważaj na odpowiedź końcową: x = 6 to liczba podwyżek, a pytanie dotyczyło ceny biletu (70 zł) i maksymalnego przychodu (14 700 zł)."
            },
            {
              title: "Zadanie Podchwytliwe CKE (Suma kwadratów liczb)",
              points: "2 pkt",
              problem: "Liczbę 16 przedstaw jako sumę dwóch liczb tak, aby suma ich kwadratów była jak najmniejsza.",
              solution: "1. Oznaczamy: pierwsza liczba to $x$, druga to $16 - x$.\n2. Funkcja sumy kwadratów: $S(x) = x^2 + (16 - x)^2$.\n3. Rozwijamy wzór skróconego mnożenia:\n$$S(x) = x^2 + 256 - 32x + x^2 = 2x^2 - 32x + 256$$\n4. Funkcja kwadratowa ma $a = 2 > 0$, więc osiąga minimum w wierzchołku:\n$$p = -\\frac{b}{2a} = -\\frac{-32}{2 \\cdot 2} = \\frac{32}{4} = 8$$\n5. Druga liczba to $16 - 8 = 8$.\nOdpowiedź: Szukane liczby to $8$ i $8$, a najmniejsza suma kwadratów to $8^2 + 8^2 = 128$.",
              keyInsight: "Minimum sumy kwadratów osiągamy, gdy obie liczby są równe."
            }
          ],
          trap_details: {
            fail: "Błąd: Podanie wartości x = 6 jako odpowiedzi na pytanie o 'optymalną cenę biletu'.",
            win: "Poprawnie: x = 6 to tylko liczba podwyżek o 5 zł! Nowa cena biletu to 40 + 5(6) = 70 zł.",
            explanation: "To klasyczna nieuwaga na maturze – odpowiedzenie na zmienną pomocniczą zamiast na pytanie egzaminatora.",
            ckeTip: "Zawsze przed postawieniem kropki w zadaniu otwartym przeczytaj jeszcze raz OSTATNIE ZDANIE polecenia."
          },
          exam_trap: "Brak podania dziedziny lub zapomnienie o obliczeniu końcowych wielkości (ceny i maksymalnego przychodu)!",
          key_points: [
            "Optymalny argument: $x = -\\frac{b}{2a}$.",
            "Dziedzina zadania jest obowiązkowym punktem w kluczu oceniania CKE.",
            "Sprawdź, czy polecenie pyta o $x$, o wymiary, czy o optymalną wartość funkcji."
          ]
        }
      }
    ]
  }
];
