import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UserProfile } from '../models/user-profile.model';
import { UserProgress } from '../models/user-progress.model';
import { CoupleData } from '../models/couple.model';
import { TestResult } from '../models/test-result.model';
import { Quest } from '../models/quests.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  async set<T>(key: string, value: T): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }

  async get<T>(key: string): Promise<T | null> {
    const result = await Preferences.get({ key });
    if (!result.value) {
      return null;
    }
    return JSON.parse(result.value) as T;
  }

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  async cacheUserProfile(profile: UserProfile): Promise<void> {
    await this.set<UserProfile>('user_profile', profile);
  }

  async cacheCouple(data: CoupleData): Promise<void> {
    await this.set<CoupleData>('cached_couple_data', data);
  }

  async cacheProgress(progress: UserProgress): Promise<void> {
    await this.set<UserProgress>('user_progress', progress);
  }

  async cacheResult(result: TestResult): Promise<void> {
    await this.set<TestResult>('latest_test_result', result);
  }

  async cacheQuests(quests: Quest[]): Promise<void> {
    await this.set<Quest[]>('local_quests', quests);
  }
}
