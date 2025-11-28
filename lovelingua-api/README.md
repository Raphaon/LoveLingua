# LoveLingua API (Express + SQLite)

Lightweight REST API scaffold that matches the endpoints in `../CC.txt` for couple sync, progress tracking, and future multiplayer features.

## Scripts
- `npm run dev` — start the API with auto-reload via `ts-node-dev`.
- `npm run build` — compile TypeScript to `dist/`.
- `npm start` — run the compiled server.

## Endpoints (initial)
- `GET /api/health` — readiness check.
- `POST /api/couples` — create a couple with user1.
- `POST /api/couples/:coupleId/join` — join a couple as user2.
- `GET /api/couples/:coupleId` — fetch couple data.
- `GET /api/progress/:userId` — fetch user progress from SQLite.
- `POST /api/progress/:userId/add-xp` — increment XP and auto-create progress if missing.

## Database
- SQLite DB stored at `data/lovelingua.db` (created on first run).
- Minimal migrations run at startup to create `users`, `couples`, and `user_progress` tables.

## Next steps
1. Add validation (e.g., Zod/Joi) to all payloads.
2. Expand schemas for sessions, partner quizzes, and messaging.
3. Implement authentication headers as outlined in the spec (`X-Device-Id`).
4. Containerize for deployment and configure HTTPS on the hosting platform.
