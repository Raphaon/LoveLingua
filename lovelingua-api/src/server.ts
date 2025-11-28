import express from 'express';
import cors from 'cors';
import { runMigrations } from './config/db';
import { couplesRouter } from './routes/couples.routes';
import { progressRouter } from './routes/progress.routes';

const app = express();
app.use(cors());
app.use(express.json());

runMigrations();

app.use('/api/couples', couplesRouter());
app.use('/api/progress', progressRouter());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'LoveLingua API ready' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`LoveLingua API listening on port ${port}`);
});
