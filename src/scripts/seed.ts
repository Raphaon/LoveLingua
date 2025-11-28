import { getDb } from '../config/db';
import { stringifyJson } from '../utils/json';

const seed = async () => {
  const db = await getDb();
  await db.exec('DELETE FROM users; DELETE FROM couples; DELETE FROM user_progress; DELETE FROM sessions; DELETE FROM partner_quiz_sessions;');

  const user1 = await db.run('INSERT INTO users (email, name) VALUES (?, ?);', 'alex@example.com', 'Alex');
  const user2 = await db.run('INSERT INTO users (email, name) VALUES (?, ?);', 'jamie@example.com', 'Jamie');

  const couple = await db.run(
    'INSERT INTO couples (code, user1_id, user2_id, status, data_json, scores_json) VALUES (?, ?, ?, ?, ?, ?);',
    'COUPLE1',
    user1.lastID,
    user2.lastID,
    'active',
    stringifyJson({ compatibility: 0.8 }),
    stringifyJson({ loveLanguageScore: 42 })
  );

  await db.run(
    'INSERT INTO user_progress (user_id, xp, level, stats_json) VALUES (?, ?, ?, ?);',
    user1.lastID,
    120,
    2,
    stringifyJson({ streak: 5 })
  );

  await db.run(
    'INSERT INTO sessions (session_code, couple_id, host_user_id, status, data_json, messages_json) VALUES (?, ?, ?, ?, ?, ?);',
    'SESSION1',
    couple.lastID,
    user1.lastID,
    'open',
    stringifyJson({ participants: [user1.lastID, user2.lastID] }),
    stringifyJson([{ type: 'message', content: 'Welcome!', userId: user1.lastID }])
  );

  await db.run(
    'INSERT INTO partner_quiz_sessions (session_code, couple_id, initiator_id, partner_id, status, data_json, scores_json, stats_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
    'QUIZ1',
    couple.lastID,
    user1.lastID,
    user2.lastID,
    'active',
    stringifyJson({ question: 'Favorite food?', responses: [] }),
    stringifyJson({}),
    stringifyJson({})
  );

  // eslint-disable-next-line no-console
  console.log('Seed data inserted');
};

seed().then(() => process.exit(0)).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
