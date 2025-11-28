import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { CoupleData } from '../models/couple.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CoupleService {
  constructor(private readonly http: HttpClient, private readonly storage: StorageService) {}

  createCouple(userId: string, userName: string) {
    return this.http.post<CoupleData>(`${environment.apiBaseUrl}/api/couples`, { userId, userName });
  }

  joinCouple(coupleId: string, userId: string, userName: string) {
    return this.http.post<CoupleData>(`${environment.apiBaseUrl}/api/couples/${coupleId}/join`, { userId, userName });
  }

  fetchCouple(coupleId: string) {
    return this.http.get<CoupleData>(`${environment.apiBaseUrl}/api/couples/${coupleId}`);
  }

  async cacheCouple(data: CoupleData): Promise<void> {
    await this.storage.cacheCouple(data);
  }
}
