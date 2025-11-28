import path from 'path';
import { createDatabase } from './sqlite.js';

const databasePath = path.resolve(process.env.SQLITE_PATH || 'data/lovelingua.sqlite');
const db = createDatabase(databasePath);

db.prepare(
  `CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL
  );`
).run();

db.prepare('INSERT INTO greetings (message) VALUES (?)').run('Hello from LoveLingua API');

console.log(`Migrations applied to ${databasePath}`);
