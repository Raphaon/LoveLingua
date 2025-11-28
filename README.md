# LoveLingua API

TypeScript Express API for LoveLingua featuring SQLite storage, validation, rate limiting, and seed data.

## Setup

1. Install dependencies (requires internet access):
   ```bash
   npm install
   ```
2. Configure environment variables in `.env` (see `.env.example`):
   - `PORT`: HTTP port (default 4000)
   - `DB_PATH`: Path to SQLite database file.
   - `CORS_ORIGINS`: Comma-separated list of allowed origins for CORS.
3. Run development server:
   ```bash
   npm run dev
   ```
4. Build and run production bundle:
   ```bash
   npm run build
   npm start
   ```
5. Seed local data for quick testing:
   ```bash
   npm run seed
   ```

## API Highlights
- Couples lifecycle: create, fetch, join, update results, complete quests.
- Progress tracking with XP updates and stats.
- Multiplayer sessions: create, fetch, join, add questions/messages.
- Partner quiz sessions: create, fetch, join, submit answers.
- Health check at `/health`.

All JSON payloads are validated with Zod, and data/scores/stats blobs are serialized consistently in SQLite.
