export interface Quest {
  id?: string;
  title: string;
  description?: string;
  status: 'pending' | 'active' | 'completed';
  completedOn?: string;
}
