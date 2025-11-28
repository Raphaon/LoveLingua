import { Router } from 'express';
import { z } from 'zod';
import { ApiError } from '../middleware/errorHandler';
import { completeQuest, createCouple, getCouple, joinCouple, updateResult } from '../services/couplesService';

const router = Router();

const createSchema = z.object({
  initiatorId: z.number().int(),
  partnerId: z.number().int().optional(),
  data: z.record(z.any()).optional(),
  scores: z.record(z.any()).optional(),
});

router.post('/', async (req, res, next) => {
  try {
    const payload = createSchema.parse(req.body);
    const couple = await createCouple(payload.initiatorId, payload.partnerId, payload.data, payload.scores);
    res.status(201).json(couple);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const couple = await getCouple(id);
    if (!couple) throw new ApiError('Couple not found', 404);
    res.json(couple);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/join', async (req, res, next) => {
  try {
    const joinSchema = z.object({ userId: z.number().int() });
    const { userId } = joinSchema.parse(req.body);
    const id = Number(req.params.id);
    const couple = await joinCouple(id, userId);
    res.json(couple);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/update-result', async (req, res, next) => {
  try {
    const schema = z.object({ data: z.record(z.any()).optional(), scores: z.record(z.any()).optional() });
    const parsed = schema.parse(req.body);
    const id = Number(req.params.id);
    const couple = await updateResult(id, parsed.data || {}, parsed.scores || {});
    res.json(couple);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/complete-quest', async (req, res, next) => {
  try {
    const schema = z.object({ questId: z.string(), stats: z.record(z.any()).optional() });
    const { questId, stats } = schema.parse(req.body);
    const id = Number(req.params.id);
    const couple = await completeQuest(id, questId, stats || {});
    res.json(couple);
  } catch (error) {
    next(error);
  }
});

export default router;
