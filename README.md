# Research Registry

A lightweight research registry that allows students to browse professors by research area and submit expressions of interest.

## Live Demo

- **Frontend:** https://research-registry.vercel.app
- **API:** https://research-registry-api.onrender.com

## Problem Statement

Undergraduate students often struggle to identify research opportunities early in their academic careers. Existing university pages provide professor research information but lack structured tools for students to express interest or discover opportunities efficiently.

This project explores whether a lightweight registry system could reduce this friction.

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL (hosted on Neon)
- Raw SQL via node-postgres (no ORM)

### Frontend
- React 18 + Vite
- Fetch API

### Deployment
- Backend → Render
- Frontend → Vercel
- Database → Neon

## Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │───────▶ │  Express API    │───────▶ │  PostgreSQL     │
│  (Vercel)       │  fetch  │  (Render)       │   SQL   │  (Neon)         │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## API Endpoints

### GET /professors
Returns list of all professors.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Dr. Socrates of Athens",
    "department": "Philosophy",
    "research_area": "Ethics & Epistemology",
    "keywords": ["examined life", "Socratic method", "knowing nothing"],
    "accepting_students": true
  }
]
```

### POST /interest
Submit an expression of interest.

**Request Body:**
```json
{
  "student_name": "Plato",
  "student_email": "plato@academy.athens.edu",
  "student_program": "MA Philosophy of Forms",
  "message": "I believe your questioning method could help me understand the nature of reality. Also, I take excellent notes.",
  "professor_id": 1
}
```

**Response:**
```json
{
  "message": "Expression of interest submitted successfully",
  "id": 1
}
```

### GET /health
Health check endpoint.

## Data Models

### Professor
| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL | Primary key |
| name | TEXT | Professor's name |
| department | TEXT | Academic department |
| research_area | TEXT | Primary research focus |
| keywords | TEXT[] | Related keywords |
| accepting_students | BOOLEAN | Currently accepting students |

### ExpressionOfInterest
| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL | Primary key |
| student_name | TEXT | Student's name |
| student_email | TEXT | Contact email |
| student_program | TEXT | Current program |
| message | TEXT | Interest message |
| professor_id | INTEGER | FK to professors |

## Local Development

### Prerequisites
- Node.js 20+
- PostgreSQL database (or Neon account)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Add your DATABASE_URL
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
research-registry/
├── backend/
│   ├── src/
│   │   ├── server.js      # Express app entry point
│   │   ├── db.js          # PostgreSQL connection
│   │   └── routes/
│   │       ├── professors.js
│   │       └── interest.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   └── App.jsx        # Main React component
│   └── package.json
└── README.md
```

## Future Improvements

- UX/UI styling updates
- Ability to request a professor to be added to the registry
- Professor authentication and dashboard
- Email notifications on interest submission
- Search and pagination
- Student accounts and application tracking

---

Built as a project demonstrating full-stack development with Node.js, React, and PostgreSQL.
