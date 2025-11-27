export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TheorySlide {
  id: string;
  title: string;
  content: string;
  bibleReference: string;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  bibleReference: string;
  theory: TheorySlide[];
  questions: Question[]; // In a full app, this would be 20 items
  type: 'lesson' | 'review' | 'exam';
}

export interface UserProgress {
  xp: number;
  streak: number;
  hearts: number;
  completedLessonIds: number[];
  currentLessonId: number; // The next lesson to play
  name: string;
}

export const INITIAL_HEARTS = 5;
export const XP_PER_LESSON = 50;
export const XP_PER_QUESTION = 10;