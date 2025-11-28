import { getDb } from '../config/db';
import { parseJson, stringifyJson } from '../utils/json';

export interface PartnerQuizSessionRow {
  id: number;
  session_code: string;
  couple_id: number | null;
  initiator_id: number | null;
  partner_id: number | null;
  status: string;
  data_json: string;
  scores_json: string;
  stats_json: string;
  created_at: string;
}

const quizCode = (): string => Math.random().toString(36).slice(2, 10).toUpperCase();

export const createPartnerQuiz = async (
  initiatorId: number,
  coupleId: number,
  data?: any
): Promise<PartnerQuizSessionRow> => {
  const db = await getDb();
  const code = quizCode();
  const result = await db.run(
    `INSERT INTO partner_quiz_sessions (session_code, couple_id, initiator_id, status, data_json, scores_json, stats_json)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    code,
    coupleId,
    initiatorId,
    'waiting',
    stringifyJson(data ?? {}),
    stringifyJson({}),
    stringifyJson({})
  );
  return db.get<PartnerQuizSessionRow>('SELECT * FROM partner_quiz_sessions WHERE id = ?;', result.lastID);
};

export const getPartnerQuiz = async (code: string): Promise<PartnerQuizSessionRow | undefined> => {
  const db = await getDb();
  const row = await db.get<PartnerQuizSessionRow>('SELECT * FROM partner_quiz_sessions WHERE session_code = ?;', code);
  return row || undefined;
};

export const joinPartnerQuiz = async (code: string, userId: number): Promise<PartnerQuizSessionRow | undefined> => {
  const db = await getDb();
  const session = await getPartnerQuiz(code);
  if (!session) return undefined;
  if (session.partner_id && session.partner_id !== userId) return session;
  await db.run('UPDATE partner_quiz_sessions SET partner_id = ?, status = ? WHERE id = ?;', userId, 'active', session.id);
  return getPartnerQuiz(code);
};

export const answerPartnerQuiz = async (
  code: string,
  userId: number,
  answer: any,
  scoreUpdate?: any,
  statsUpdate?: any
): Promise<PartnerQuizSessionRow | undefined> => {
  const db = await getDb();
  const session = await getPartnerQuiz(code);
  if (!session) return undefined;
  const data = parseJson<Record<string, any>>(session.data_json, {});
  const scores = parseJson<Record<string, any>>(session.scores_json, {});
  const stats = parseJson<Record<string, any>>(session.stats_json, {});
  data.responses = [...(data.responses || []), { userId, answer, timestamp: new Date().toISOString() }];
  if (scoreUpdate) Object.assign(scores, scoreUpdate);
  if (statsUpdate) Object.assign(stats, statsUpdate);
  await db.run(
    'UPDATE partner_quiz_sessions SET data_json = ?, scores_json = ?, stats_json = ? WHERE id = ?;',
    stringifyJson(data),
    stringifyJson(scores),
    stringifyJson(stats),
    session.id
  );
  return getPartnerQuiz(code);
};
