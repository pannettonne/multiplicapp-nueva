export interface GameStats {
  id?: number;
  date: number;
  mode: 'learning' | 'challenge';
  level: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  score: number;
  accuracy: number;
}

export interface PlayerProgress {
  totalScore: number;
  totalQuestions: number;
  totalCorrect: number;
  levelAchievements: {
    [key: number]: boolean;
  };
  badges: string[];
  lastPlayed: number;
  streakDays: number;
  currentStreak: number;
}

export interface Question {
  a: number;
  b: number;
  answer: number;
  explanation: string;
  technique?: string;
}

export interface GameState {
  mode: 'menu' | 'learning' | 'challenge';
  level: number;
  currentQuestion: Question | null;
  score: number;
  lives: number;
  streak: number;
  questionsAnswered: number;
  correctAnswers: number;
  timeRemaining: number;
  answers: string;
}
