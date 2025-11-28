# LoveLingua

LoveLingua is a hybrid Android application focused on helping couples understand and practice the five love languages through quizzes, personalized suggestions, and gamified couple tools.

## Key goals
- Deliver an offline-first experience so quizzes, suggestions, and history remain available without connectivity.
- Provide synchronized couple and multiplayer modes through a lightweight Node.js API.
- Maintain a quick mobile experience with fast startup and smooth Ionic navigation.

## Tech stack
### Mobile (Ionic / Angular)
- Ionic 7+ with Angular 16+ (prefer standalone components)
- Capacitor runtime for Android
- SQLite for local data and Ionic Storage for lightweight flags/cache
- SCSS-based styling using Ionic components

### Backend (Node.js)
- Node.js 20+ with an Express/Nest-style REST API
- SQLite persistence on the server via an ORM/query builder
- Simple device-based authentication using a generated user ID header

## Repository layout
- `lovelingua-mobile/`: Ionic/Angular scaffold with shared models and starter services wired for offline caching and API calls.
- `lovelingua-api/`: Express + SQLite API seed with couple and progress endpoints plus startup migrations.
- `CC.txt`: full functional and technical specification (cahier des charges).

## Next steps
- Complete the Ionic bootstrap (root module, routing, and pages) using the provided models/services as building blocks.
- Add SQLite integration on-device and map caches to local tables.
- Expand the API with validation, partner quiz, multiplayer sessions, and authentication headers.
