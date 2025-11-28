import { Router } from 'express';
import { z } from 'zod';
import { answerPartnerQuiz, createPartnerQuiz, getPartnerQuiz, joinPartnerQuiz } from '../services/partnerQuizService';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const schema = z.object({ initiatorId: z.number().int(), coupleId: z.number().int(), data: z.record(z.any()).optional() });
    const payload = schema.parse(req.body);
    const session = await createPartnerQuiz(payload.initiatorId, payload.coupleId, payload.data || {});
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
});

router.get('/:code', async (req, res, next) => {
  try {
    const session = await getPartnerQuiz(req.params.code);
    if (!session) return res.status(404).json({ message: 'Partner quiz not found' });
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.post('/:code/join', async (req, res, next) => {
  try {
    const schema = z.object({ userId: z.number().int() });
    const { userId } = schema.parse(req.body);
    const session = await joinPartnerQuiz(req.params.code, userId);
    if (!session) return res.status(404).json({ message: 'Partner quiz not found' });
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.post('/:code/answer', async (req, res, next) => {
  try {
    const schema = z.object({
      userId: z.number().int(),
      answer: z.any(),
      scores: z.record(z.any()).optional(),
      stats: z.record(z.any()).optional(),
    });
    const payload = schema.parse(req.body);
    const session = await answerPartnerQuiz(req.params.code, payload.userId, payload.answer, payload.scores, payload.stats);
    if (!session) return res.status(404).json({ message: 'Partner quiz not found' });
    res.json(session);
  } catch (error) {
    next(error);
  }
});

export default router;
