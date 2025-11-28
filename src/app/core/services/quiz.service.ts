import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { StorageService } from './storage.service';
import { TestResult } from '../models/test-result.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  async loadResults(): Promise<TestResult[]> {
    const online = (await Network.getStatus()).connected;
    if (online) {
      try {
        const results = await this.http
          .get<TestResult[]>(`${environment.apiBaseUrl}/quiz/results`)
          .toPromise();
        if (results) {
          await this.storage.set('local_test_results', results);
          return results;
        }
      } catch (err) {
        console.warn('Falling back to cached results', err);
      }
    }
    return (await this.storage.get('local_test_results')) ?? [];
  }

  async saveResponses(questions: any[], responses: string[]) {
    const payload: TestResult = {
      title: 'Daily Quiz',
      summary: `${responses.length} responses saved`,
      date: new Date().toISOString()
    };
    const existing = ((await this.storage.get<TestResult[]>('local_test_results')) ?? []).concat(payload);
    await this.storage.set('local_test_results', existing);
    return payload;
  }
}
