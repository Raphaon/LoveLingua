import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

export function createDatabase(databasePath: string) {
  const directory = path.dirname(databasePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const db = new Database(databasePath);
  db.pragma('journal_mode = WAL');
  return db;
}
