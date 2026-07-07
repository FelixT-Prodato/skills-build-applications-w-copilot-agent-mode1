# OctoFit Tracker

OctoFit Tracker is a modern multi-tier fitness application with a React/Vite frontend, an Express/TypeScript backend, and a MongoDB data layer.

## Project Structure

- frontend: React 19 + Vite + Bootstrap + React Router
- backend: Node.js + Express + TypeScript + Mongoose
- data: MongoDB running locally on port 27017

## Prerequisites

- Node.js and npm
- MongoDB running locally

## Run the Application

### Frontend

```bash
npm --prefix octofit-tracker/frontend run dev
```

Open http://localhost:5173/

### Backend

```bash
npm --prefix octofit-tracker/backend run dev
```

The API will run on http://localhost:8000/

### Seed the Database

```bash
npx ts-node octofit-tracker/backend/src/scripts/seed.ts
```

## API Endpoints

- GET /api/health
- GET /api/users/
- GET /api/teams/
- GET /api/activities/
- GET /api/leaderboard/
- GET /api/workouts/

## Notes

When running in GitHub Codespaces, the backend base URL will use the Codespaces URL format based on CODESPACE_NAME.

