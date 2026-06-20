# AI & Robotics Summer Workshop — Landing Page

A responsive workshop landing page (inspired by Kidrove's style) built with **React + TypeScript + Tailwind CSS**, backed by a serverless **Vercel Functions** API for the registration form.

## Project structure

```
kidrove-workshop/
├── frontend/   React + TypeScript + Tailwind CSS (Vite)
├── api/        Vercel serverless functions (deployed API — POST /api/enquiry, GET /api/health)
├── backend/    Standalone Express server (same logic, for local development only)
└── vercel.json Root deployment config
```

There are two ways this project runs the API, intentionally:
- **`api/`** is what actually deploys to Vercel as serverless functions, alongside the frontend, as a single project.
- **`backend/`** is a traditional always-running Express server you can run locally with `npm run dev` — handy for quick local testing without needing to emulate serverless functions.

Both implement identical validation and response behavior.

## Deploying to Vercel (single project, frontend + serverless API)

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project**, import the repo.
3. Leave the **Root Directory** as the repo root (not `frontend` — the root `vercel.json` handles building the frontend and wiring up `/api`).
4. (Optional) Add an environment variable `MONGODB_URI` if you want persistence — otherwise the API logs enquiries instead of storing them.
5. Deploy. Vercel will build the frontend into `frontend/dist` and automatically expose everything under `api/` as serverless functions at `/api/...`.
6. Your live demo link will be the Vercel URL it gives you (e.g. `https://your-project.vercel.app`). Both the page and the API live on that same domain, so no CORS configuration or separate API URL is needed in production.

## Running everything locally

### Frontend

```bash
cd frontend
npm install
cp .env.example .env      # only needed if your local API runs somewhere other than localhost:5000
npm run dev                # http://localhost:5173
```

### Backend (local Express server — for local dev only)

```bash
cd backend
npm install
cp .env.example .env       # optionally set MONGODB_URI
npm run dev                 # http://localhost:5000
```

The server runs fine **without** MongoDB configured — enquiries are logged to the console instead of persisted. To enable persistence, set `MONGODB_URI` in `backend/.env` (locally) or in Vercel's environment variables (production) to a real connection string (e.g. a free MongoDB Atlas cluster).

## API reference

### `POST /api/enquiry`

**Request body**

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "phone": "9876543210"
}
```

**Success — `201`**

```json
{ "success": true, "message": "Registration received! We'll be in touch soon." }
```

**Validation error — `400`**

```json
{
  "success": false,
  "message": "Please correct the highlighted fields and try again.",
  "errors": { "name": "Name is required.", "email": "Please provide a valid email address." }
}
```

### `GET /api/health`

Returns `{ "status": "ok", "message": "Kidrove Workshop API is running." }` — useful to confirm the deployment is live.

## Approach & notes (for submission)

See `SUBMISSION_NOTE.md` for the 100–150 word note required by the assignment.

## Tech choices

- **React 19 + TypeScript** (Vite) for the frontend, with components split by section (Hero, WorkshopDetails, LearningOutcomes, FAQ, RegistrationForm).
- **Tailwind CSS v4** for styling, using a custom theme (`src/index.css`) rather than default utility colors, to match a deliberate visual identity instead of generic defaults.
- **Vercel Serverless Functions** for the deployed API, with the same validation and response contract as the local Express server, so behavior is identical in both environments.
- Form includes client-side validation, loading state, and success/error feedback; the API independently re-validates the same fields, so it's safe to call directly.

