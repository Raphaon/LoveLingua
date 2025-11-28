export interface UserProgress {
  id?: string;
  completedQuizzes: number;
  streak: number;
  lastCompleted?: string;
}
