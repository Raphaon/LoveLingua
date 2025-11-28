import { getDb } from '../config/db';
import { parseJson, stringifyJson } from '../utils/json';

export interface Couple {
  id: number;
  code: string;
  user1_id: number | null;
  user2_id: number | null;
  status: string;
  data_json: string;
  scores_json: string;
  created_at: string;
}

const generateCode = (): string => Math.random().toString(36).slice(2, 8).toUpperCase();

export const createCouple = async (initiatorId: number, partnerId?: number, data?: any, scores?: any) => {
  const db = await getDb();
  const code = generateCode();
  const result = await db.run(
    `INSERT INTO couples (code, user1_id, user2_id, status, data_json, scores_json)
     VALUES (?, ?, ?, ?, ?, ?);`,
    code,
    initiatorId,
    partnerId ?? null,
    partnerId ? 'active' : 'pending',
    stringifyJson(data ?? {}),
    stringifyJson(scores ?? {})
  );
  const couple = await db.get<Couple>('SELECT * FROM couples WHERE id = ?;', result.lastID);
  return couple;
};

export const getCouple = async (id: number) => {
  const db = await getDb();
  return db.get<Couple>('SELECT * FROM couples WHERE id = ?;', id);
};

export const joinCouple = async (id: number, userId: number) => {
  const db = await getDb();
  const couple = await getCouple(id);
  if (!couple) throw new Error('Couple not found');
  if (couple.user2_id && couple.user2_id !== userId) {
    throw new Error('Couple already has a partner');
  }
  await db.run('UPDATE couples SET user2_id = ?, status = ? WHERE id = ?;', userId, 'active', id);
  return getCouple(id);
};

export const updateResult = async (id: number, data: any, scores: any) => {
  const db = await getDb();
  const couple = await getCouple(id);
  if (!couple) throw new Error('Couple not found');
  const mergedData = { ...parseJson(couple.data_json, {}), ...(data || {}) };
  const mergedScores = { ...parseJson(couple.scores_json, {}), ...(scores || {}) };
  await db.run(
    'UPDATE couples SET data_json = ?, scores_json = ? WHERE id = ?;',
    stringifyJson(mergedData),
    stringifyJson(mergedScores),
    id
  );
  return getCouple(id);
};

export const completeQuest = async (id: number, questId: string, stats: any) => {
  const db = await getDb();
  const couple = await getCouple(id);
  if (!couple) throw new Error('Couple not found');
  const existingStats = parseJson<Record<string, any>>(couple.data_json, {});
  existingStats.completedQuests = [...(existingStats.completedQuests || []), questId];
  if (stats) existingStats.questStats = { ...(existingStats.questStats || {}), ...stats };
  await db.run('UPDATE couples SET data_json = ? WHERE id = ?;', stringifyJson(existingStats), id);
  return getCouple(id);
};
