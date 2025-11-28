import { Router } from 'express';
import { db } from '../config/db';
import { UserProgress } from '../models/types';

export function progressRouter(): Router {
  const router = Router();

  router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    db.get(`SELECT * FROM user_progress WHERE user_id = ?;`, [userId], (err, row) => {
      if (err || !row) {
        res.status(404).json({ error: 'progress_not_found' });
        return;
      }
      const payload: UserProgress = {
        userId: row.user_id,
        level: row.level,
        currentLevelXp: row.current_level_xp,
        nextLevelXp: row.next_level_xp,
        totalXp: row.total_xp,
        stats: JSON.parse(row.stats_json)
      };
      res.json(payload);
    });
  });

  router.post('/:userId/add-xp', (req, res) => {
    const { userId } = req.params;
    const { amount = 0 } = req.body;
    const xp = Number(amount) || 0;
    db.get(`SELECT * FROM user_progress WHERE user_id = ?;`, [userId], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'failed_to_read_progress' });
        return;
      }

      if (!row) {
        const stats = { quizCompleted: 0, questsCompleted: 0, daysStreak: 0, lastActivity: new Date().toISOString() };
        db.run(
          `INSERT INTO user_progress (user_id, level, current_level_xp, next_level_xp, total_xp, stats_json) VALUES (?, ?, ?, ?, ?, ?);`,
          [userId, 1, xp, 100, xp, JSON.stringify(stats)],
          (insertErr) => {
            if (insertErr) {
              res.status(500).json({ error: 'failed_to_create_progress' });
              return;
            }
            res.status(201).json({ userId, level: 1, currentLevelXp: xp, nextLevelXp: 100, totalXp: xp, stats });
          }
        );
        return;
      }

      const updatedTotal = row.total_xp + xp;
      const updatedCurrent = row.current_level_xp + xp;
      db.run(
        `UPDATE user_progress SET current_level_xp = ?, total_xp = ? WHERE user_id = ?;`,
        [updatedCurrent, updatedTotal, userId],
        (updateErr) => {
          if (updateErr) {
            res.status(500).json({ error: 'failed_to_update_progress' });
            return;
          }
          res.json({
            userId,
            level: row.level,
            currentLevelXp: updatedCurrent,
            nextLevelXp: row.next_level_xp,
            totalXp: updatedTotal,
            stats: JSON.parse(row.stats_json)
          });
        }
      );
    });
  });

  return router;
}
