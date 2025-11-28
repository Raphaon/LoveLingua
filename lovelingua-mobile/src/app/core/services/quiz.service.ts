import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { TestResult } from '../models/test-result.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private readonly http: HttpClient, private readonly storage: StorageService) {}

  async saveLocalResult(result: TestResult): Promise<void> {
    await this.storage.cacheResult(result);
  }

  submitResult(userId: string, payload: TestResult) {
    return this.http.post(`${environment.apiBaseUrl}/api/progress/${userId}/add-xp`, payload);
  }
}
