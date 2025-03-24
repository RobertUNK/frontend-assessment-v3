import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  manager: string;
}

let projects: Project[] = [
  {
    id: uuidv4(),
    name: "Project A",
    description: "Descriere A",
    startDate: "2023-01-01",
    endDate: "2023-06-01",
    manager: "Alice",
  },
  {
    id: uuidv4(),
    name: "Project B",
    description: "Descriere B",
    startDate: "2023-02-01",
    endDate: "2023-07-01",
    manager: "Bob",
  },
];

let favorites: Array<{ id: string; name: string }> = [];

app.get("/api/favorites", (_req, res) => {
  res.json(favorites);
});

app.post("/api/favorites", (req, res) => {
  favorites.push(req.body);
  res.status(201).json(req.body);
});

app.delete("/api/favorites/:id", (req, res) => {
  favorites = favorites.filter((fav) => fav.id !== req.params.id);
  res.status(204).end();
});

app.get("/api/projects", (req: Request, res: Response) => {
  res.json(projects);
});

app.get("/api/projects/:projectId", (req: Request, res: Response): void => {
  const project = projects.find((p) => p.id === req.params.projectId);
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(project);
});

app.post("/api/projects", (req: Request, res: Response) => {
  const newProject: Project = {
    ...req.body,
    id: uuidv4(),
  };
  projects.push(newProject);
  res.json(newProject);
});

app.put("/api/projects/:projectId", (req: Request, res: Response) => {
  projects = projects.map((p) =>
    p.id === req.params.projectId ? { ...p, ...req.body } : p
  );
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Mock API server running on http://localhost:${port}`);
});
