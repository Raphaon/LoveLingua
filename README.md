# LoveLingua Monorepo

This repository contains two npm projects:

- `lovelingua-mobile`: Ionic/Angular front-end prepared for Android via Capacitor.
- `lovelingua-api`: Node.js + SQLite API with a simple Express server.

## Prerequisites

- Node.js 20+
- npm 10+
- Android Studio (for building APK/AAB) with Android SDK and Java configured
- Git

## Environment variables

### Mobile

- `CAPACITOR_ANDROID_STUDIO_PATH` (optional): custom Android Studio path used by Capacitor.

### API

- `PORT`: API port (default: `3000`).
- `SQLITE_PATH`: Path to the SQLite database file. Defaults to `data/lovelingua.sqlite`.

## Setup

Install dependencies for each project:

```bash
cd lovelingua-mobile
npm install

cd ../lovelingua-api
npm install
```

## Running the API

```bash
cd lovelingua-api
npm run build
npm run migrate
npm run start
```

The sample endpoint is available at `GET http://localhost:3000/api/v1/sample`.

### Sample API calls

```bash
# Health check
curl http://localhost:3000/health

# Sample greeting
curl http://localhost:3000/api/v1/sample
```

## Running the mobile app

```bash
cd lovelingua-mobile
npm run start
```

### Building and syncing Android

```bash
npm run build
npm run android:sync
```

This produces the web build under `www/` and synchronizes Capacitor Android artifacts. If Android is not yet added, run `npx cap add android` once after installing dependencies.

### Generating APK/AAB with Android Studio

1. Open Android Studio, and choose **Open an existing project** pointing to `lovelingua-mobile/android` (after running `npm run android:sync`).
2. Let Gradle sync complete.
3. For debug builds: use **Build > Build Bundle(s)/APK(s) > Build APK(s)**.
4. For release builds: configure a signing key under **Build > Generate Signed Bundle / APK** and follow the wizard to output an **APK** or **AAB**.
5. The artifacts will be in `lovelingua-mobile/android/app/build/outputs/`.

## CI workflow

`.github/workflows/ci.yml` runs lint and tests for both projects on pushes and pull requests targeting the `work` branch.

## Docker (API)

After building the API (`npm run build`), you can create an image that mounts the SQLite file:

```bash
cd lovelingua-api
npm run build
docker build -t lovelingua-api .
docker run -p 3000:3000 -v $(pwd)/data:/usr/src/app/data lovelingua-api
```

The volume mount keeps the SQLite file on the host machine.
