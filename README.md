# AI & Robotics Summer Workshop — Landing Page

A responsive workshop landing page (inspired by Kidrove's style) built with **React + TypeScript + Tailwind CSS**, backed by a simple **Express.js** API for the registration form.

## Project structure

```
kidrove-workshop/
├── frontend/   React + TypeScript + Tailwind CSS (Vite)
└── backend/    Express.js API (POST /api/enquiry)
```

## Live preview (in this environment)

Open the `frontend-preview.html` artifact shared alongside this project for an instant visual preview — no setup needed.

To run the real project locally, follow the steps below.

## Running the frontend

```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_BASE_URL if your backend runs elsewhere
npm run dev                # starts on http://localhost:5173
```

Build for production:

```bash
npm run build
```

## Running the backend

```bash
cd backend
npm install
cp .env.example .env       # optionally set MONGODB_URI
npm run dev                 # starts on http://localhost:5000 (uses nodemon)
# or
npm start
```

The server runs fine **without** MongoDB configured — enquiries are logged to the console instead of persisted. To enable persistence, set `MONGODB_URI` in `backend/.env` to a real connection string (e.g. a free MongoDB Atlas cluster).

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

## Approach & notes (for submission)

See `SUBMISSION_NOTE.md` for the 100–150 word note required by the assignment.

## Tech choices

- **React 19 + TypeScript** (Vite) for the frontend, with components split by section (Hero, WorkshopDetails, LearningOutcomes, FAQ, RegistrationForm).
- **Tailwind CSS v4** for styling, using a custom theme (`src/index.css`) rather than default utility colors, to match a deliberate visual identity instead of generic defaults.
- **Express.js + Mongoose** for the backend, with validation as dedicated middleware and MongoDB persistence made optional so the API works out of the box.
- Form includes client-side validation, loading state, and success/error feedback; the backend re-validates independently so the API is safe to call from anywhere.
