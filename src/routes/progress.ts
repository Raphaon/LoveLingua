import { Router } from 'express';
import { z } from 'zod';
import { addXp, getProgress } from '../services/progressService';

const router = Router();

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const progress = await getProgress(userId);
    res.json(progress);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId/add-xp', async (req, res, next) => {
  try {
    const schema = z.object({ xp: z.number().int().positive(), stats: z.record(z.any()).optional() });
    const { xp, stats } = schema.parse(req.body);
    const userId = Number(req.params.userId);
    const progress = await addXp(userId, xp, stats || {});
    res.json(progress);
  } catch (error) {
    next(error);
  }
});

export default router;
