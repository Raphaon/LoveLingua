export interface TestResult {
  id?: string;
  title: string;
  summary: string;
  score?: number;
  date: string | Date;
}
