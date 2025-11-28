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
