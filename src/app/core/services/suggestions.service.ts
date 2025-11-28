import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class SuggestionsService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  async loadSuggestions(): Promise<any[]> {
    const cached = (await this.storage.get<any[]>('local_suggestions')) ?? [];
    const online = (await Network.getStatus()).connected;

    if (online) {
      try {
        const data = await this.http.get<any[]>(`${environment.apiBaseUrl}/suggestions`).toPromise();
        if (data) {
          await this.storage.set('local_suggestions', data);
          return data;
        }
      } catch (err) {
        console.warn('Using offline suggestions', err);
      }
    }

    if (cached.length) {
      return cached;
    }

    const fallback = await this.http.get<any[]>('assets/data/suggestions.json').toPromise();
    await this.storage.set('local_suggestions', fallback ?? []);
    return fallback ?? [];
  }
}
