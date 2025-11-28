import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { UserProgress } from '../models/user-progress.model';
import { Quest } from '../models/quest.model';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  async getProgress(): Promise<UserProgress> {
    const online = (await Network.getStatus()).connected;
    if (online) {
      try {
        const progress = await this.http
          .get<UserProgress>(`${environment.apiBaseUrl}/progress`)
          .toPromise();
        if (progress) {
          await this.storage.set('local_user_progress', progress);
          return progress;
        }
      } catch (err) {
        console.warn('Using cached progress', err);
      }
    }
    return (await this.storage.get<UserProgress>('local_user_progress')) ?? { completedQuizzes: 0, streak: 0 };
  }

  async loadQuestHistory(): Promise<Quest[]> {
    const cached = (await this.storage.get<Quest[]>('local_quests')) ?? [];
    return cached;
  }
}
