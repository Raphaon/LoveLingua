export interface Quest {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  completed: boolean;
  completedAt?: string;
}
