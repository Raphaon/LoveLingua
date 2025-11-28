import { Router } from 'express';
import { z } from 'zod';
import { addQuestionOrMessage, createSession, getSessionByCode, joinSession } from '../services/multiplayerService';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const schema = z.object({ hostUserId: z.number().int(), coupleId: z.number().int().optional(), data: z.record(z.any()).optional() });
    const payload = schema.parse(req.body);
    const session = await createSession(payload.hostUserId, payload.coupleId, payload.data || {});
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
});

router.get('/:code', async (req, res, next) => {
  try {
    const session = await getSessionByCode(req.params.code);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.post('/:code/join', async (req, res, next) => {
  try {
    const schema = z.object({ userId: z.number().int() });
    const { userId } = schema.parse(req.body);
    const session = await joinSession(req.params.code, userId);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (error) {
    next(error);
  }
});

router.post('/:code/add', async (req, res, next) => {
  try {
    const schema = z.object({
      type: z.enum(['question', 'message']),
      content: z.string(),
      userId: z.number().int(),
    });
    const payload = schema.parse(req.body);
    const session = await addQuestionOrMessage(req.params.code, payload);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (error) {
    next(error);
  }
});

export default router;
