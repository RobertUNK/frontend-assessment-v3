# Frontend Assessment V3

A Next.js + React application with a mock Express API for managing projects and favorites. Built using TypeScript, Tailwind CSS v4, Material‑UI (MUI), and Styled‑Components (with full SSR support).

---

## Tech Stack

- Next.js 15 (React 19)  
- Express (Mock API server on port 3001)  
- Tailwind CSS v4  
- Material‑UI v5  
- Styled‑Components v6  
- TypeScript  

---

## Features

- List, create, and edit projects  
- Mark/unmark favorites (persisted in-memory until server restart)  
- Server‑Side Rendering of styled-components  
- Responsive layout with sidebar of favorite projects  

---

### Prerequisites

- Node.js v18+  
- npm v9+  

### Installation

```bash
git clone <repo-url>
cd frontend-assessment-v3
npm install

## API Reference

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| GET    | `/api/projects`       | List all projects               |
| GET    | `/api/projects/:id`   | Get a single project            |
| POST   | `/api/projects`       | Create a new project            |
| PUT    | `/api/projects/:id`   | Update an existing project      |
| GET    | `/api/favorites`      | List favorite projects          |
| POST   | `/api/favorites`      | Add a project to favorites      |
| DELETE | `/api/favorites/:id`  | Remove a project from favorites |

## Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Run Next.js development server      |
| `npm run mock-api` | Run Express mock API (port 3001)    |
| `npm run build`    | Build for production               |
| `npm start`        | Start production server            |
