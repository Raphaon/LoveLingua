import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { UserProgress } from '../models/user-progress.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  constructor(private readonly http: HttpClient, private readonly storage: StorageService) {}

  fetchProgress(userId: string) {
    return this.http.get<UserProgress>(`${environment.apiBaseUrl}/api/progress/${userId}`);
  }

  addXp(userId: string, amount: number) {
    return this.http.post<UserProgress>(`${environment.apiBaseUrl}/api/progress/${userId}/add-xp`, { amount });
  }

  async cacheProgress(progress: UserProgress): Promise<void> {
    await this.storage.cacheProgress(progress);
  }
}
