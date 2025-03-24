import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectTable from '../../components/ProjectTable';

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  manager: string;
}

const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/projects');
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="mb-10 text-right">
        <Link href="/projects/new">
          <button className="bg-blue-500 text-white p-2 rounded">
            Create Project
          </button>
        </Link>
      </div>
      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ProjectTable projects={projects} />
      )}
    </div>
  );
};

export default ProjectsList;
