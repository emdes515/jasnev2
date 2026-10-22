import { LessonTheoryPill } from '../../types';

export interface MathLessonDefinition {
  id: string;
  order: number;
  title: string;
  short_title: string;
  badge: string;
  archetypeCode: string;
  estimated_time_formatted: string;
  theory_pill: LessonTheoryPill;
  formula_sheet?: {
    lessonId: string;
    title: string;
    formulas: { title: string; latex: string }[];
    goldenRule: string;
    ckeTrap?: { error: string; correct: string; description: string } | null;
  };
}

export interface MathTopicBlueprint {
  id: string;
  numericId: number;
  title: string;
  short_title: string;
  description: string;
  icon: string;
  color: string;
  matura_points_range: string;
  importance: 'CRITICAL_PEWNIAK' | 'HIGH';
  lessons: MathLessonDefinition[];
}
