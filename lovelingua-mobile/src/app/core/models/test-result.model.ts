export interface TestResult {
  id: string;
  userId: string;
  date: string;
  scores: Record<string, number>;
  primaryLanguage: string;
  primaryLanguageId: string;
}
