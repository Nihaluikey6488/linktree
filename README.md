# Linktree Clone — Project README

Overview
- **Purpose**: Small Linktree-like app with backend API (Express + MongoDB) and frontend (React + Vite + Tailwind + Redux).
- **Layout**: `backend/` (API + services) and `frontend/` (React app).

Quick Start

- Backend
  - Install and run:
    ```bash
    cd backend
    npm install
    # set environment variables (MONGO_URI, JWT_SECRET)
    npm run dev
    ```
  - Defaults: server runs on `http://localhost:5000` (check `backend/package.json` scripts).

- Frontend
  - Install and run:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
  - Open the Vite dev URL shown in terminal (usually `http://localhost:5173`).

Backend Flow (Auth & Links)
- Models:
  - `User` (`src/models/auth.model.js`): `username`, `email`, `password` (hashed).
  - `Link` (`src/models/link.model.js`): `user` (ref), `title`, `url`, `clicks`, timestamps.

- Auth flow:
  - `POST /api/auth/register` -> creates user, returns `{ user, token }` (token is JWT).
  - `POST /api/auth/login` -> validates credentials, returns `{ user, token }`.
  - Token generation: `src/utils/token.js` signs `{ id, email, username }` with `JWT_SECRET`.
  - `authMiddleware` reads token from cookie (`token`) or `Authorization: Bearer <token>` header and sets `req.user`.

- Links flow:
  - `POST /api/links` (auth) -> create a new link for authenticated user.
  - `GET /api/links/:username` (auth) -> fetch links for a user (currently protected).
  - `PATCH /api/links/:linkId/click` (auth) -> increments `clicks` for a link.

- Analytics (new):
  - `GET /api/links/:username/analytics` (auth) -> returns aggregated analytics only if the requester is the same user (ownership enforced).
  - Analytics response includes: `totalLinks`, `totalClicks`, `links` (each with title, url, totalClicks, createdDate, lastClickedDate), `mostClicked`, `leastClicked`, `last7Days`, `recentActivity`.
  - Note: current implementation uses `updatedAt` and `clicks` as approximations. For precise per-click timelines, implement a click-log collection and record timestamps on each click.

Frontend Flow (State & UI)
- Tech: React + Vite + Tailwind + Redux Toolkit.
- Axios: `frontend/src/config/axiosInstance.js` sets baseURL (http://localhost:5000) and `withCredentials: true`.
- Auth state:
  - Auth thunks `loginEmployee`, `registerEmployee`, `currentEmployee` live in `features/auth/state/` and store `user` in Redux and `localStorage` under key `user` for hydration.
  - Routes and protected routes use `store.auth.user` to check authentication.

- Links UI & hooks:
  - Hook `useLinks` provides: `getLinksByUsername`, `createLink`, `incrementClick`, and `getAnalyticsByUsername`.
  - `Profile` (`/ :username`) is the public profile page; it fetches links via `getLinksByUsername(username)` and increments clicks (calls increment endpoint but swallows errors for unauthenticated visitors).
  - `Dashboard` (authenticated) shows link list, summary, and navigation to `Create` and `Analytics`.
  - `Analytics` page (`/home/analytics`) fetches `/api/links/:username/analytics` and renders:
    - Total links, total clicks, most clicked link
    - Clicks per link (bar chart SVG) and recent activity list
    - Loading and error states

Security Notes
- Backend enforces ownership for analytics. The auth middleware must run for protected endpoints.
- Public profile currently fetches links using same protected `GET /api/links/:username` — consider exposing a public read-only endpoint (without `authMiddleware`) if you want anonymous visitors to view links without a token.
- Click increment endpoint is protected; public click tracking currently attempts to call it but errors are ignored in the UI. To support anonymous clicks, make the click endpoint public and record visitor metadata or create a dedicated public click route.

Developer Notes & Next Steps
- Consider adding:
  - Click logs collection (`Click` documents) for per-click timestamps and accurate last-7-days graphs.
  - Public endpoints for `GET /api/links/:username/public` and `PATCH /api/links/:linkId/click/public` so visitors don't need to authenticate to increment clicks or view links.
  - Replace the lightweight SVG charts with Chart.js or Recharts for interactive visualizations.

Files of interest
- Backend: `backend/src/controllers/`, `backend/src/services/`, `backend/src/models/`, `backend/src/routes/link.routes.js`
- Frontend: `frontend/src/features/links/`, `frontend/src/features/auth/`, `frontend/src/app/layouts/`, `frontend/src/config/axiosInstance.js`

Contact
- If you want, I can split this README into separate `backend/README.md` and `frontend/README.md`, add environment examples, or add docker-compose for local dev.
