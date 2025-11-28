import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { Couple } from '../models/couple.model';

@Injectable({ providedIn: 'root' })
export class CoupleService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  async saveCouple(couple: Partial<Couple>) {
    await this.storage.set('local_couple', couple);
    const online = (await Network.getStatus()).connected;
    if (online) {
      await this.http.post(`${environment.apiBaseUrl}/couple`, couple).toPromise().catch(() => {});
    }
  }

  async compareCouplePreferences() {
    const data = (await this.storage.get<Couple>('local_couple')) ?? { partnerName: 'Partner', goal: '' };
    return [
      { label: 'Shared goal', detail: data.goal || 'Define together' },
      { label: 'Quality time', detail: 'Schedule at least two weekly check-ins.' }
    ];
  }
}
