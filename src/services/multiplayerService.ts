import { getDb } from '../config/db';
import { parseJson, stringifyJson } from '../utils/json';

export interface SessionRow {
  id: number;
  session_code: string;
  couple_id: number | null;
  host_user_id: number | null;
  status: string;
  data_json: string;
  messages_json: string;
  created_at: string;
}

const sessionCode = (): string => Math.random().toString(36).slice(2, 10);

export const createSession = async (
  hostUserId: number,
  coupleId?: number,
  data?: unknown
): Promise<SessionRow> => {
  const db = await getDb();
  const code = sessionCode();
  const result = await db.run(
    `INSERT INTO sessions (session_code, couple_id, host_user_id, status, data_json, messages_json)
     VALUES (?, ?, ?, ?, ?, ?);`,
    code,
    coupleId ?? null,
    hostUserId,
    'open',
    stringifyJson({ ...(data as object), participants: [hostUserId] }),
    stringifyJson([])
  );
  return db.get<SessionRow>('SELECT * FROM sessions WHERE id = ?;', result.lastID);
};

export const getSessionByCode = async (code: string): Promise<SessionRow | undefined> => {
  const db = await getDb();
  const row = await db.get<SessionRow>('SELECT * FROM sessions WHERE session_code = ?;', code);
  return row || undefined;
};

export const joinSession = async (code: string, userId: number): Promise<SessionRow | undefined> => {
  const db = await getDb();
  const session = await getSessionByCode(code);
  if (!session) return undefined;
  const data = parseJson<Record<string, any>>(session.data_json, {});
  const participants = new Set<number>([...(data.participants || []), userId]);
  data.participants = Array.from(participants);
  await db.run('UPDATE sessions SET data_json = ? WHERE id = ?;', stringifyJson(data), session.id);
  return getSessionByCode(code);
};

export const addQuestionOrMessage = async (
  code: string,
  payload: { type: 'question' | 'message'; content: string; userId: number }
): Promise<SessionRow | undefined> => {
  const db = await getDb();
  const session = await getSessionByCode(code);
  if (!session) return undefined;
  const messages = parseJson<Array<any>>(session.messages_json, []);
  messages.push({ ...payload, timestamp: new Date().toISOString() });
  await db.run('UPDATE sessions SET messages_json = ? WHERE id = ?;', stringifyJson(messages), session.id);
  return getSessionByCode(code);
};
