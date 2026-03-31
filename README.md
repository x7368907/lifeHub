# LifeHub

Fullstack productivity app for tasks, expenses, and AI planning.

## Stack
- Mobile: React Native (Expo), TypeScript, React Navigation, Zustand, Axios
- Backend: FastAPI, SQLAlchemy, PostgreSQL
- Docker: Compose with backend + postgres

## Project Structure
```
backend/
mobile/
```

## Running (Local)

### Backend
1. Create a virtualenv and install deps:
```
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```
2. Start the API:
```
uvicorn app.main:app --reload
```
Run from `backend/`:
```
cd backend
uvicorn app.main:app --reload
```

### Mobile
From `mobile/`:
```
cd mobile
npm install
npx expo start
```

Note: When running on a physical device, update `baseURL` in `mobile/src/api/client.ts` to your machine's LAN IP.

## Running With Docker
```
docker compose up --build
```
API will be available at `http://localhost:8000`.

## API Docs
FastAPI provides OpenAPI docs at:
- `http://localhost:8000/docs`
- `http://localhost:8000/redoc`
