import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

export interface Suggestion {
  id: string;
  language: string;
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class SuggestionsService {
  constructor(private readonly http: HttpClient) {}

  fetchSuggestions(language: string) {
    return this.http.get<Suggestion[]>(`${environment.apiBaseUrl}/api/suggestions`, {
      params: { language }
    });
  }
}
