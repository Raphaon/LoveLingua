# LoveLingua Mobile (Ionic / Angular)

Scaffold for the offline-first Ionic/Angular Android application described in `../CC.txt`.

## Structure
- `src/app/core/models`: shared interfaces for quiz, couple, and progress data.
- `src/app/core/services`: Angular services wired for offline caching plus REST calls to the backend API.
- `src/app/environment.ts`: base API URL placeholder.
- `capacitor.config.ts`, `ionic.config.json`: starter platform configuration.

## Next steps
1. Run `npm install` to pull Ionic/Angular dependencies.
2. Generate the root Angular module and bootstrap using `ionic start` or `ng new` and merge with this structure.
3. Add page components (onboarding, quiz, dashboard, couple setup, multiplayer, etc.) following the routes outlined in the specification.
4. Connect SQLite via `@capacitor-community/sqlite` and map the service caches to local tables.
5. Configure Android by running `npx cap sync android` once the app builds successfully.
