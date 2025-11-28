import { getDb } from '../config/db';
import { parseJson, stringifyJson } from '../utils/json';

export interface UserProgressRow {
  id: number;
  user_id: number;
  xp: number;
  level: number;
  stats_json: string;
  updated_at: string;
}

const calculateLevel = (xp: number): number => Math.floor(xp / 100) + 1;

export const getProgress = async (userId: number): Promise<UserProgressRow> => {
  const db = await getDb();
  let progress = await db.get<UserProgressRow>('SELECT * FROM user_progress WHERE user_id = ?;', userId);
  if (!progress) {
    await db.run(
      'INSERT INTO user_progress (user_id, xp, level, stats_json) VALUES (?, ?, ?, ?);',
      userId,
      0,
      1,
      stringifyJson({})
    );
    progress = await db.get<UserProgressRow>('SELECT * FROM user_progress WHERE user_id = ?;', userId);
  }
  return progress as UserProgressRow;
};

export const addXp = async (userId: number, xpToAdd: number, stats?: any): Promise<UserProgressRow> => {
  const db = await getDb();
  const progress = await getProgress(userId);
  const newXp = progress.xp + xpToAdd;
  const updatedLevel = calculateLevel(newXp);
  const mergedStats = { ...parseJson(progress.stats_json, {}), ...(stats || {}) };
  await db.run(
    'UPDATE user_progress SET xp = ?, level = ?, stats_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;',
    newXp,
    updatedLevel,
    stringifyJson(mergedStats),
    progress.id
  );
  return getProgress(userId);
};
