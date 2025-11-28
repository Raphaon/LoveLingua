export interface UserProfile {
  id: string;
  firstName: string;
  birthDate: string;
  gender: string;
  relationshipStatus: string;
  createdAt: string;
}

export interface CoupleData {
  id: string;
  user1Id: string;
  user1Name: string;
  user2Id?: string;
  user2Name?: string;
  status: 'waiting' | 'linked';
  loveReservoir: number;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  totalXp: number;
  stats: Record<string, number | string>;
}
