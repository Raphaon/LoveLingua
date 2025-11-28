import express from 'express';
import cors from 'cors';
import path from 'path';
import { createDatabase } from './sqlite.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = createDatabase(path.resolve(process.env.SQLITE_PATH || 'data/lovelingua.sqlite'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/v1/sample', (_req, res) => {
  const statement = db.prepare('SELECT message FROM greetings LIMIT 1');
  const row = statement.get();
  res.json({ message: row?.message ?? 'Welcome to LoveLingua API' });
});

app.listen(port, () => {
  console.log(`LoveLingua API running on port ${port}`);
});
