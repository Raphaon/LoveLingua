import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { db } from '../config/db';
import { CoupleData } from '../models/types';

export function couplesRouter(): Router {
  const router = Router();

  router.post('/', (req, res) => {
    const id = uuid();
    const { userId, userName } = req.body;
    const now = new Date().toISOString();
    db.run(
      `INSERT INTO couples (id, user1_id, user1_name, status, love_reservoir, created_at) VALUES (?, ?, ?, ?, ?, ?);`,
      [id, userId, userName, 'waiting', 50, now],
      (err) => {
        if (err) {
          res.status(500).json({ error: 'failed_to_create_couple' });
          return;
        }
        const payload: CoupleData = {
          id,
          user1Id: userId,
          user1Name: userName,
          status: 'waiting',
          loveReservoir: 50,
          createdAt: now
        };
        res.status(201).json(payload);
      }
    );
  });

  router.post('/:coupleId/join', (req, res) => {
    const { coupleId } = req.params;
    const { userId, userName } = req.body;
    db.run(
      `UPDATE couples SET user2_id = ?, user2_name = ?, status = 'linked' WHERE id = ?;`,
      [userId, userName, coupleId],
      function (err) {
        if (err || this.changes === 0) {
          res.status(404).json({ error: 'couple_not_found' });
          return;
        }
        res.json({ coupleId, userId, userName });
      }
    );
  });

  router.get('/:coupleId', (req, res) => {
    const { coupleId } = req.params;
    db.get(
      `SELECT * FROM couples WHERE id = ?;`,
      [coupleId],
      (err, row) => {
        if (err || !row) {
          res.status(404).json({ error: 'couple_not_found' });
          return;
        }
        const payload: CoupleData = {
          id: row.id,
          user1Id: row.user1_id,
          user1Name: row.user1_name,
          user2Id: row.user2_id,
          user2Name: row.user2_name,
          status: row.status,
          loveReservoir: row.love_reservoir,
          createdAt: row.created_at
        };
        res.json(payload);
      }
    );
  });

  return router;
}
