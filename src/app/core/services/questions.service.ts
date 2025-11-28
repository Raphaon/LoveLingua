import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private http: HttpClient) {}

  async loadConversationQuestions(type: string): Promise<any[]> {
    const online = (await Network.getStatus()).connected;
    if (online) {
      try {
        const remote = await this.http.get<any[]>(`${environment.apiBaseUrl}/questions?type=${type}`).toPromise();
        if (remote) {
          return remote;
        }
      } catch (err) {
        console.warn('Falling back to bundled conversation questions', err);
      }
    }
    return (await this.http.get<any[]>(`assets/data/${type}-questions.json`).toPromise()) ?? [];
  }
}
