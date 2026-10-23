export interface Exercise {
  id: string;
  type: 'qcm' | 'truefalse' | 'reorder' | 'code';
  question: string;
  options?: string[];
  correctAnswer: string | number | string[];
  explanation: string;
  codeTemplate?: string;
  xp: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  exercises: Exercise[];
}

export interface UserProgress {
  xp: number;
  level: number;
  hearts: number;
  maxHearts: number;
  completedLessons: string[];
  currentLesson: string | null;
  streak: number;
  totalCorrect: number;
  totalAttempts: number;
}

export type Page = 'home' | 'lesson' | 'profile' | 'result';
