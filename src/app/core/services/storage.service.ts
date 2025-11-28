import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, capSQLiteSet } from '@capacitor-community/sqlite';

const TABLES = [
  'local_user_profile',
  'local_test_results',
  'local_couple',
  'local_user_progress',
  'local_quests',
  'local_favorites'
];

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage?: Storage;
  private dbInitialized = false;

  constructor(private storage: Storage) {}

  async init() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    if (!this.dbInitialized && Capacitor.isNativePlatform()) {
      const { sqlite } = CapacitorSQLite;
      await sqlite?.createConnection({
        database: 'lovelingua',
        version: 1,
        encrypted: false,
        mode: 'no-encryption'
      });
      for (const table of TABLES) {
        await sqlite?.execute({
          statements: `CREATE TABLE IF NOT EXISTS ${table}(id TEXT PRIMARY KEY, data TEXT);`
        });
      }
      this.dbInitialized = true;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    await this.init();
    return this._storage?.get(key) ?? null;
  }

  async set(key: string, value: unknown) {
    await this.init();
    return this._storage?.set(key, value);
  }

  async upsert(table: string, value: any) {
    await this.init();
    if (Capacitor.isNativePlatform()) {
      const { sqlite } = CapacitorSQLite;
      const payload: capSQLiteSet = {
        statement: `INSERT OR REPLACE INTO ${table} (id, data) VALUES (?, ?);`,
        values: [value.id ?? table, JSON.stringify(value)]
      };
      await sqlite?.run({ statements: payload.statement, values: payload.values });
    }
    await this._storage?.set(table, value);
  }

  async getAll(table: string): Promise<any[]> {
    await this.init();
    const cached = (await this._storage?.get(table)) ?? [];
    return Array.isArray(cached) ? cached : [cached];
  }
}
