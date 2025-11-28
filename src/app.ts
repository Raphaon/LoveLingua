import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import couplesRouter from './routes/couples';
import progressRouter from './routes/progress';
import multiplayerRouter from './routes/multiplayer';
import partnerQuizRouter from './routes/partnerQuiz';
import healthRouter from './routes/health';
import { errorHandler } from './middleware/errorHandler';

const allowedOrigins = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim());

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(cors({ origin: allowedOrigins || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/couples', couplesRouter);
app.use('/api/progress', progressRouter);
app.use('/api/multiplayer', multiplayerRouter);
app.use('/api/partner-quiz', partnerQuizRouter);
app.use('/health', healthRouter);

app.use(errorHandler);

export default app;
