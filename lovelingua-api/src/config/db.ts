import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();

const dbPath = path.join(__dirname, '../../data/lovelingua.db');

export const db = new sqlite3.Database(dbPath);

export function runMigrations(): void {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        first_name TEXT NOT NULL,
        birth_date TEXT NOT NULL,
        gender TEXT NOT NULL,
        relationship_status TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS couples (
        id TEXT PRIMARY KEY,
        user1_id TEXT NOT NULL,
        user1_name TEXT NOT NULL,
        user2_id TEXT,
        user2_name TEXT,
        status TEXT NOT NULL,
        love_reservoir INTEGER NOT NULL,
        created_at TEXT NOT NULL
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS user_progress (
        user_id TEXT PRIMARY KEY,
        level INTEGER NOT NULL,
        current_level_xp INTEGER NOT NULL,
        next_level_xp INTEGER NOT NULL,
        total_xp INTEGER NOT NULL,
        stats_json TEXT NOT NULL
      )`
    );
  });
}
