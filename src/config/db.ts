import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'lovelingua.db');

if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export const getDb = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  if (!dbInstance) {
    dbInstance = await open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });
    await runMigrations(dbInstance);
  }
  return dbInstance;
};

const runMigrations = async (db: Database<sqlite3.Database, sqlite3.Statement>): Promise<void> => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS couples (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE,
      user1_id INTEGER,
      user2_id INTEGER,
      status TEXT DEFAULT 'pending',
      data_json TEXT DEFAULT '{}',
      scores_json TEXT DEFAULT '{}',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      couple_id INTEGER,
      result_json TEXT DEFAULT '{}',
      scores_json TEXT DEFAULT '{}',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      stats_json TEXT DEFAULT '{}',
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_code TEXT UNIQUE,
      couple_id INTEGER,
      host_user_id INTEGER,
      status TEXT DEFAULT 'open',
      data_json TEXT DEFAULT '{}',
      messages_json TEXT DEFAULT '[]',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS partner_quiz_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_code TEXT UNIQUE,
      couple_id INTEGER,
      initiator_id INTEGER,
      partner_id INTEGER,
      status TEXT DEFAULT 'waiting',
      data_json TEXT DEFAULT '{}',
      scores_json TEXT DEFAULT '{}',
      stats_json TEXT DEFAULT '{}',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
