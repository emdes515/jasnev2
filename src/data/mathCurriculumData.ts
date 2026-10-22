/**
 * mathCurriculumData.ts
 * 
 * 15 Oficjalnych Działów CKE Matematyki Podstawowej (Formuła 2023)
 * z pełnym kurikulum Core-4 Bento dla silnika nauki LearnView (Trophy Road),
 * 75 autentycznymi mikrolekcjami (po dokładnie 5 na każdy dział)
 * oraz mapą lekcji opartą o bazę 1500 zweryfikowanych zadań CKE.
 */

import { TopicDocument, LessonDocument, LessonMetadataItem } from '../schema_firestore';
import rawGeneratedTasks from './math/generated/all_1500_tasks.json';
import { enrichTaskWithVisual } from './mathVisualRegistry';
import { shuffleTaskOptions } from '../utils/taskShuffler';
import { MathTopicBlueprint, MathLessonDefinition } from './math/mathBlueprintTypes';
import { DZIAL_1_TO_5 } from './math/blueprints/dzial1to5';
import { DZIAL_6_TO_10 } from './math/blueprints/dzial6to10';
import { DZIAL_11_TO_15 } from './math/blueprints/dzial11to15';

export type { MathLessonDefinition, MathTopicBlueprint };

export const MATH_TOPIC_BLUEPRINTS: MathTopicBlueprint[] = [
  ...DZIAL_1_TO_5,
  ...DZIAL_6_TO_10,
  ...DZIAL_11_TO_15
];

export function getMathTopicBlueprint(topicId: string): MathTopicBlueprint | undefined {
  return MATH_TOPIC_BLUEPRINTS.find(b => b.id === topicId);
}

export function getAllMathTopicBlueprints(): MathTopicBlueprint[] {
  return MATH_TOPIC_BLUEPRINTS;
}

/**
 * Normalizuje surowe zadanie do formatu zadania w LearnView / SessionRunner
 */
export function normalizeMathTaskForRunner(task: any, lessonId: string, topicId: string): any {
  if (!task) return null;

  const rawCorrect = task.correct_answer || task.correctAnswer || 'A';
  const isSingle = task.type === 'SINGLE_CHOICE' || !task.type;
  const isNumeric = task.type === 'NUMERIC_INPUT';

  // Format options
  let options = undefined;
  if (Array.isArray(task.options) && task.options.length > 0) {
    options = task.options.map((optText: any, idx: number) => {
      const optId = String.fromCharCode(65 + idx);
      const isCorrect = String(optId) === String(rawCorrect) || String(optText) === String(rawCorrect);
      return {
        id: optId,
        text: String(optText),
        content_latex: String(optText),
        is_correct: isCorrect
      };
    });
  }

  const questionText = task.content || task.question || '';

  const taskObj = {
    id: task.id || `math-task-${lessonId}-${Math.random().toString(36).substring(7)}`,
    lessonId,
    topicId,
    type: isNumeric ? 'NUMERIC_INPUT' : 'SINGLE_CHOICE',
    title: task.title || 'Zadanie Maturalne CKE',
    question: questionText,
    content: questionText,
    math_statement: questionText,
    options,
    correct_answer: rawCorrect,
    correctAnswer: rawCorrect,
    numeric_correct_answer: isNumeric ? rawCorrect : undefined,
    explanation: task.explanation || '',
    matura_tip: task.matura_tip || 'Zwróć uwagę na założenia i wzory z oficjalnych tablic CKE.',
    cke_tag: task.archetypeCode,
    badge: task.archetypeCode,
    points: task.points || 1,
    source: 'CKE Formuła 2023 • Baza Zadań JASNE',
    diagram: task.diagram,
    plot: task.plot,
    hints: {
      level_1: task.matura_tip || 'Zwróć uwagę na podstawowe tożsamości z karty wzorów CKE.',
      level_2: task.explanation ? `Wskazówka: ${task.explanation.slice(0, 180)}...` : 'Uważnie podstaw dane.'
    },
    hint_1: task.matura_tip || 'Zwróć uwagę na podstawowe tożsamości z karty wzorów CKE.',
    hint_2: 'Sprawdź kolejność działań i dziedzinę wyrażenia.'
  };

  return shuffleTaskOptions(enrichTaskWithVisual(taskObj, lessonId));
}

// Mapowanie 75 lekcji do zweryfikowanych 32 archetypów w all_1500_tasks.json
export const LESSON_ARCHETYPE_MAP: Record<string, string> = {
  // Dział 1: Liczby rzeczywiste, procenty i błędy przybliżeń
  'math-lesson-1-1': 'ARCH-03', // Wartość bezwzględna i nierówności na osi liczbowej
  'math-lesson-1-2': 'ARCH-04', // Obliczenia procentowe, podatki i wielokrotne obniżki
  'math-lesson-1-3': 'ARCH-05', // Błąd bezwzględny i błąd względny przybliżenia
  'math-lesson-1-4': 'ARCH-01', // Potęgi o wykładnikach całkowitych i wymiernych
  'math-lesson-1-5': 'ARCH-02', // Logarytmy i ich własności w zadaniach CKE

  // Dział 2: Wyrażenia algebraiczne i wzory skróconego mnożenia
  'math-lesson-2-1': 'ARCH-06', // Wzory skróconego mnożenia: kwadrat sumy i różnicy
  'math-lesson-2-2': 'ARCH-06', // Różnica kwadratów
  'math-lesson-2-3': 'ARCH-09', // Grupowanie wyrazów i wyłączanie wspólnego czynnika
  'math-lesson-2-4': 'ARCH-07', // Ułamki algebraiczne i dziedzina wyrażenia
  'math-lesson-2-5': 'ARCH-06', // Wzory skróconego mnożenia w dowodach algebraicznych

  // Dział 3: Równania i nierówności liniowe oraz kwadratowe
  'math-lesson-3-1': 'ARCH-07', // Równania liniowe i wymierne
  'math-lesson-3-2': 'ARCH-08', // Równania kwadratowe: wyróżnik delta i pierwiastki
  'math-lesson-3-3': 'ARCH-08', // Nierówności kwadratowe: szkicowanie paraboli
  'math-lesson-3-4': 'ARCH-07', // Równania wymierne i wyznaczanie dziedziny
  'math-lesson-3-5': 'ARCH-09', // Równania wielomianowe w postaci iloczynowej

  // Dział 4: Układy równań liniowych z dwiema niewiadomymi
  'math-lesson-4-1': 'ARCH-13', // Układy równań: metoda podstawiania
  'math-lesson-4-2': 'ARCH-13', // Układy równań: metoda przeciwnych współczynników
  'math-lesson-4-3': 'ARCH-13', // Interpretacja geometryczna układu równań
  'math-lesson-4-4': 'ARCH-04', // Zadania tekstowe prowadzące do układu równań
  'math-lesson-4-5': 'ARCH-13', // Układy równań z parametrem

  // Dział 5: Funkcje – pojęcie, własności i odczytywanie z wykresu
  'math-lesson-5-1': 'ARCH-10', // Dziedzina i zbiór wartości funkcji z wykresu
  'math-lesson-5-2': 'ARCH-10', // Miejsca zerowe i punkty przecięcia z osiami
  'math-lesson-5-3': 'ARCH-10', // Monotoniczność i przedziały stałego znaku
  'math-lesson-5-4': 'ARCH-10', // Wartość największa i najmniejsza w przedziale
  'math-lesson-5-5': 'ARCH-11', // Przekształcenia wykresów: translacja i symetrie

  // Dział 6: Funkcja liniowa i jej zastosowania
  'math-lesson-6-1': 'ARCH-13', // Współczynnik kierunkowy a i wyraz wolny b
  'math-lesson-6-2': 'ARCH-24', // Wyznaczanie wzoru prostej przez dwa punkty
  'math-lesson-6-3': 'ARCH-13', // Warunek równoległości i prostopadłości prostych
  'math-lesson-6-4': 'ARCH-13', // Miejsce zerowe funkcji liniowej i nierówności
  'math-lesson-6-5': 'ARCH-13', // Zastosowania praktyczne funkcji liniowej

  // Dział 7: Funkcja kwadratowa
  'math-lesson-7-1': 'ARCH-12', // Postać ogólna, kanoniczna i iloczynowa paraboli
  'math-lesson-7-2': 'ARCH-12', // Wierzchołek paraboli W = (p, q) i oś symetrii
  'math-lesson-7-3': 'ARCH-12', // Wartość najmniejsza i największa w przedziale domkniętym
  'math-lesson-7-4': 'ARCH-08', // Wzory Viete'a i pierwiastki
  'math-lesson-7-5': 'ARCH-32', // Zadania optymalizacyjne z funkcją kwadratową

  // Dział 8: Funkcja wykładnicza i logarytmiczna
  'math-lesson-8-1': 'ARCH-01', // Wykres i własności funkcji wykładniczej
  'math-lesson-8-2': 'ARCH-01', // Proste równania i nierówności wykładnicze
  'math-lesson-8-3': 'ARCH-02', // Wykres i własności funkcji logarytmicznej
  'math-lesson-8-4': 'ARCH-02', // Równania logarytmiczne i warunki dziedziny
  'math-lesson-8-5': 'ARCH-01', // Zastosowania funkcji wykładniczej (kapitalizacja odsetek)

  // Dział 9: Ciągi liczbowe – arytmetyczny i geometryczny
  'math-lesson-9-1': 'ARCH-14', // Wzór ogólny i badanie monotoniczności ciągu
  'math-lesson-9-2': 'ARCH-14', // Ciąg arytmetyczny: różnica r i wzór na n-ty wyraz
  'math-lesson-9-3': 'ARCH-15', // Suma n początkowych wyrazów ciągu arytmetycznego
  'math-lesson-9-4': 'ARCH-16', // Ciąg geometryczny: iloraz q, n-ty wyraz i suma
  'math-lesson-9-5': 'ARCH-16', // Warunek trzech kolejnych wyrazów i zadania mieszane

  // Dział 10: Trygonometria kąta ostrego i wypukłego
  'math-lesson-10-1': 'ARCH-18', // Definicje sin, cos, tg w trójkącie prostokątnym
  'math-lesson-10-2': 'ARCH-18', // Wartości funkcji dla kątów 30, 45 i 60 stopni
  'math-lesson-10-3': 'ARCH-17', // Jedynka trygonometryczna i tożsamości kąta ostrego
  'math-lesson-10-4': 'ARCH-17', // Wzory redukcyjne dla kątów wypukłych
  'math-lesson-10-5': 'ARCH-18', // Twierdzenie sinusów i cosinusów w trójkątach

  // Dział 11: Planimetria – trójkąty, czworokąty i okręgi
  'math-lesson-11-1': 'ARCH-20', // Pola trójkątów i twierdzenie Pitagorasa
  'math-lesson-11-2': 'ARCH-21', // Cechy podobieństwa i przystawania trójkątów
  'math-lesson-11-3': 'ARCH-21', // Własności czworokątów: trapez, romb, równoległobok
  'math-lesson-11-4': 'ARCH-19', // Kąty środkowe i wpisane oparte na tym samym łuku
  'math-lesson-11-5': 'ARCH-22', // Okrąg wpisany i opisany na wielokątach

  // Dział 12: Geometria analityczna na płaszczyźnie kartezjańskiej
  'math-lesson-12-1': 'ARCH-23', // Odległość dwóch punktów i współrzędne środka odcinka
  'math-lesson-12-2': 'ARCH-24', // Równanie prostej przechodzącej przez dwa punkty
  'math-lesson-12-3': 'ARCH-13', // Proste prostopadłe i równoległe na płaszczyźnie
  'math-lesson-12-4': 'ARCH-25', // Równanie okręgu w postaci kanonicznej
  'math-lesson-12-5': 'ARCH-25', // Punkty wspólne prostej i okręgu oraz pola figur

  // Dział 13: Stereometria – graniastosłupy, ostrosłupy i bryły
  'math-lesson-13-1': 'ARCH-26', // Graniastosłupy proste i prawidłowe: pole i objętość
  'math-lesson-13-2': 'ARCH-27', // Ostrosłupy prawidłowe: krawędzie i ściany boczne
  'math-lesson-13-3': 'ARCH-26', // Kąty w stereometrii: kąt nachylenia krawędzi i ściany
  'math-lesson-13-4': 'ARCH-28', // Bryły obrotowe: walec, stożek i kula
  'math-lesson-13-5': 'ARCH-28', // Przekroje brył płaszczyznami w arkuszu CKE

  // Dział 14: Kombinatoryka i rachunek prawdopodobieństwa
  'math-lesson-14-1': 'ARCH-29', // Reguła mnożenia i reguła dodawania w zliczaniu
  'math-lesson-14-2': 'ARCH-29', // Silnia, permutacje i kombinacje w praktyce
  'math-lesson-14-3': 'ARCH-30', // Klasyczna definicja prawdopodobieństwa
  'math-lesson-14-4': 'ARCH-30', // Drzewo stochastyczne w doświadczeniach wieloetapowych
  'math-lesson-14-5': 'ARCH-30', // Własności prawdopodobieństwa i zdarzenie przeciwne

  // Dział 15: Statystyka opisowa i optymalizacja
  'math-lesson-15-1': 'ARCH-31', // Średnia arytmetyczna i średnia ważona danych
  'math-lesson-15-2': 'ARCH-31', // Mediana i dominanta (moda) zestawu liczb
  'math-lesson-15-3': 'ARCH-31', // Odchylenie standardowe i wariancja próby
  'math-lesson-15-4': 'ARCH-31', // Interpretacja diagramów słupkowych, kołowych i tabel
  'math-lesson-15-5': 'ARCH-32'  // Optymalizacja z użyciem funkcji kwadratowej w CKE
};

export function cleanMathTargetValue(raw: any): string {
  if (!raw) return '';
  let s = String(raw).trim();
  if (s.startsWith('$') && s.endsWith('$')) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/**
 * Przekształca zadanie maturalne w zadanie otwarte (NUMERIC_INPUT)
 */
export function convertMathTaskToOpen(task: any, lessonId: string, topicId: string): any {
  if (!task) return null;

  let targetVal = '';
  if (task.numeric_correct_answer) {
    targetVal = cleanMathTargetValue(task.numeric_correct_answer);
  } else if (task.correct_answer && Array.isArray(task.options) && task.options.length > 0) {
    const rawKey = String(task.correct_answer || 'A').toUpperCase().trim();
    const idx = rawKey.charCodeAt(0) - 65;
    const opt = (idx >= 0 && idx < task.options.length) ? task.options[idx] : task.options[0];
    const rawText = typeof opt === 'string' ? opt : (opt.text || opt.content_latex || '');
    targetVal = cleanMathTargetValue(rawText);
  } else {
    targetVal = cleanMathTargetValue(task.correct_answer || task.correctAnswer || '0');
  }

  let qText = task.content || task.question || '';
  qText = qText.replace(/Dokończ zdanie\.\s*Wybierz właściwą odpowiedź spośród podanych\.\s*/i, 'Dokończ zdanie i wpisz wynik w pole poniżej:\n\n');
  qText = qText.replace(/Wybierz właściwą odpowiedź spośród podanych\.\s*/i, 'Wpisz poprawny wynik w pole poniżej:\n\n');

  const taskObj = {
    id: `${task.id}_open`,
    lessonId,
    topicId,
    type: 'NUMERIC_INPUT',
    title: task.title ? `${task.title} (Zadanie otwarte)` : 'Zadanie otwarte CKE',
    question: qText,
    content: qText,
    math_statement: qText,
    options: undefined, // Brak kafelków ABCD — zadanie otwarte
    correct_answer: targetVal,
    correctAnswer: targetVal,
    numeric_correct_answer: targetVal,
    input_placeholder: 'Wpisz wynik (np. 12, 3/4, -5)...',
    explanation: task.explanation || '',
    matura_tip: task.matura_tip || 'Wpisz dokładną liczbę lub ułamek.',
    cke_tag: task.archetypeCode || task.cke_tag,
    badge: task.archetypeCode || task.badge,
    points: 2,
    source: 'CKE Formuła 2023 • Zadanie otwarte JASNE',
    diagram: task.diagram,
    plot: task.plot,
    hints: {
      level_1: task.matura_tip || 'Zwróć uwagę na wzory z tablic CKE.',
      level_2: task.explanation ? `Wskazówka: ${task.explanation.slice(0, 180)}...` : 'Uważnie podstaw dane.'
    },
    hint_1: task.matura_tip || 'Zwróć uwagę na wzory z tablic CKE.',
    hint_2: 'Sprawdź kolejność działań i wykonaj obliczenia krok po kroku.'
  };

  return enrichTaskWithVisual(taskObj, lessonId);
}

// Mapowanie zadań z all_1500_tasks.json do archetypów
const tasksByArchetype: Record<string, any[]> = {};
(rawGeneratedTasks as any[]).forEach(task => {
  const code = task.archetypeCode || 'ARCH-01';
  if (!tasksByArchetype[code]) {
    tasksByArchetype[code] = [];
  }
  tasksByArchetype[code].push(task);
});

/**
 * Cache pełnych dokumentów lekcji dla Matematyki
 */
export const MATH_LESSON_DOCUMENTS: Map<string, LessonDocument> = new Map();

/**
 * Budowa pełnych dokumentów lekcji i tematów
 */
export const MATH_CURRICULUM_TOPICS: TopicDocument[] = MATH_TOPIC_BLUEPRINTS.map(bp => {
  const topicTasksAll: any[] = [];

  const lessonsMetadata: LessonMetadataItem[] = bp.lessons.map(l => {
    // Rozpoznaj przypisany archetyp dla lekcji
    const mappedArch = LESSON_ARCHETYPE_MAP[l.id] || (tasksByArchetype[l.archetypeCode] ? l.archetypeCode : 'ARCH-01');
    const rawArchetypeTasks = tasksByArchetype[mappedArch] || tasksByArchetype['ARCH-01'] || [];

    // Jeśli archetyp składa się z zadań otwartych (np. ARCH-32), dobierz zadania zamknięte z pokrewnego archetypu
    let closedBaseTasks = rawArchetypeTasks;
    if (mappedArch === 'ARCH-32') {
      const companionArch = l.id.startsWith('math-lesson-7-') ? 'ARCH-12' : 'ARCH-31';
      closedBaseTasks = tasksByArchetype[companionArch] || rawArchetypeTasks;
    }

    // Przygotuj pulę zadań zamkniętych i otwartych
    const closedCandidates = closedBaseTasks.slice(0, 10).map(t => normalizeMathTaskForRunner(t, l.id, bp.id));
    const openCandidates = rawArchetypeTasks.slice(0, 10).map(t => convertMathTaskToOpen(t, l.id, bp.id));

    // Dokładnie 3 zamknięte i 2 otwarte w sesji startowej, wymieszane losowo
    const selectedClosed = closedCandidates.slice(0, 3);
    const selectedOpen = openCandidates.slice(0, 2);
    const initialSessionTasks = [...selectedClosed, ...selectedOpen].sort(() => 0.5 - Math.random());

    // Cała pula lekcji: wylosowane 5 zadań na początku, po nich reszta puli dla kolejnych losowań
    const fullLessonTasks = [
      ...initialSessionTasks,
      ...closedCandidates.slice(3),
      ...openCandidates.slice(2)
    ];

    topicTasksAll.push(...initialSessionTasks);

    const lessonDoc: LessonDocument = {
      id: l.id,
      topic_id: bp.id,
      title: l.title,
      theory_pill: l.theory_pill,
      tasks: fullLessonTasks,
      required_correct_tasks: 3,
      estimated_time_formatted: l.estimated_time_formatted
    };

    // Zarejestruj ze wszystkimi wariantami kluczy
    MATH_LESSON_DOCUMENTS.set(l.id, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`${bp.id}/${l.id}`, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`matematyka-podstawowa/${bp.id}/${l.id}`, lessonDoc);

    const cleanOrder = String(bp.numericId) + '.' + String(l.order);
    MATH_LESSON_DOCUMENTS.set(cleanOrder, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`lesson-${bp.numericId}-${l.order}`, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`math-lesson-${bp.numericId}-${l.order}`, lessonDoc);

    return {
      id: l.id,
      order: l.order,
      title: l.title,
      short_title: l.short_title,
      badge: l.badge,
      tasks_count: 5,
      estimated_time_formatted: l.estimated_time_formatted,
      points_to_unlock: l.order === 1 ? 0 : 15,
      required_correct_tasks: 3
    };
  });

  return {
    id: bp.id,
    numericId: bp.numericId,
    name: bp.title,
    title: bp.title,
    short_title: bp.short_title,
    description: bp.description,
    icon: bp.icon,
    color: bp.color,
    matura_points_range: bp.matura_points_range,
    importance: bp.importance,
    lessons_metadata: lessonsMetadata,
    tasks: topicTasksAll
  };
});

/**
 * Płaska lista wszystkich lekcji matematyki CKE z przypisanymi działami
 */
export const ALL_MATH_LESSONS = MATH_TOPIC_BLUEPRINTS.flatMap(bp => 
  bp.lessons.map(l => ({
    ...l,
    topicId: bp.id,
    topicNumericId: bp.numericId,
    topicTitle: bp.title,
    topicShortTitle: bp.short_title,
    color: bp.color,
    icon: bp.icon,
  }))
);

/**
 * Pobiera dokument lekcji matematyki
 */
export function getMathLessonDocument(topicId?: string, lessonId?: string): LessonDocument | null {
  if (!lessonId) return null;
  const cleanId = String(lessonId).trim();

  const found = MATH_LESSON_DOCUMENTS.get(cleanId) ||
         (topicId ? MATH_LESSON_DOCUMENTS.get(`${topicId}/${cleanId}`) : null) ||
         (topicId ? MATH_LESSON_DOCUMENTS.get(`matematyka-podstawowa/${topicId}/${cleanId}`) : null) ||
         null;

  if (found) {
    return { ...found, id: cleanId };
  }
  return null;
}

/**
 * Generuje Boss Exam dla wybranego działu Matematyki
 */
export function loadMathTopicBossExam(topicId: string, topicTitle?: string): any {
  const bp = MATH_TOPIC_BLUEPRINTS.find(b => 
    b.id === topicId || 
    b.numericId === parseInt(String(topicId).replace(/\D/g, '') || '1', 10)
  ) || MATH_TOPIC_BLUEPRINTS[0];

  // Zbierz zadania ze wszystkich lekcji/archetypów tego działu
  const topicArchetypes = bp.lessons.map(l => l.archetypeCode);
  const candidatePool: any[] = [];
  topicArchetypes.forEach(arch => {
    const list = tasksByArchetype[arch] || [];
    candidatePool.push(...list);
  });

  const available = candidatePool.length > 0 ? candidatePool : (rawGeneratedTasks as any[]);
  // Wymieszaj i wybierz 5 zadań
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  const chosen = shuffled.slice(0, 5);

  const examTasks = chosen.map((t, idx) => {
    const norm = normalizeMathTaskForRunner(t, `${bp.id}-boss`, bp.id);
    return {
      id: norm.id || `boss-math-${bp.id}-${idx + 1}`,
      lessonId: `${bp.id}.${idx + 1}`,
      lessonOrder: idx + 1,
      lessonTitle: norm.title || `Zadanie ${idx + 1}`,
      topicLabel: `${bp.short_title} • Zadanie ${idx + 1}`,
      question: norm.question || norm.title || '',
      content: norm.content || norm.question || '',
      math_statement: norm.question || norm.title || '',
      options: norm.options || [],
      correct_answer: norm.correct_answer || norm.correctAnswer,
      correctAnswer: norm.correctAnswer || norm.correct_answer,
      numeric_correct_answer: norm.numeric_correct_answer,
      explanation: norm.explanation || '',
      matura_tip: norm.matura_tip || '',
      hint_1: norm.hint_1 || '',
      hint_2: norm.hint_2 || '',
      source: 'CKE Formuła 2023 • Egzamin Działowy JASNE',
      type: norm.type || 'SINGLE_CHOICE',
      points: norm.points || 1,
      diagram: norm.diagram,
      plot: norm.plot
    };
  });

  const totalQuestions = examTasks.length || 5;
  const passingScore = Math.max(1, Math.ceil(totalQuestions * 0.7));

  return {
    id: `BOSS-EXAM-${String(bp.id).toUpperCase()}`,
    title: `Sprawdzian: ${bp.short_title}`,
    subtitle: `Ostateczne starcie z materiałem: ${bp.title}. Rozwiąż ${totalQuestions} zadań z tego działu.`,
    boss_name: `Egzaminator CKE: ${bp.short_title}`,
    boss_message: `Egzaminator czeka! Wykaż się wiedzą z działu: ${bp.short_title}. Zdobądź minimum 70%!`,
    timeLimitMinutes: 20,
    passingScore,
    totalQuestions,
    rewardXp: 200,
    rewardCoins: 100,
    badgeId: `master_${String(bp.id).toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    tasks: examTasks
  };
}
