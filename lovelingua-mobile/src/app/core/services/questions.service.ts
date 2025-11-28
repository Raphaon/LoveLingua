import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

export interface ConversationQuestion {
  id: string;
  prompt: string;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private readonly http: HttpClient) {}

  fetchQuestions(category?: string) {
    return this.http.get<ConversationQuestion[]>(`${environment.apiBaseUrl}/api/questions`, {
      params: { category: category ?? '' }
    });
  }
}
