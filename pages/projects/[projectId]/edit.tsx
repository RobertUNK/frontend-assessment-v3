// pages/projects/[projectId]/edit.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProjectForm from '../../../components/ProjectForm'
import { Project } from '../index';

const EditProject = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/projects/${projectId}`
        );
        if (!res.ok) throw new Error('Project not found');
        const data = await res.json();
        setProject(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleUpdate = async (updatedData: Project) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/projects/${projectId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );
      if (!res.ok) throw new Error('Update failed');
      router.push('/projects');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading project data...</p>;
  if (error) return <p>Error: {error}</p>;

  return project ? (
    <div>
      <ProjectForm initialData={project} onSubmit={handleUpdate} />
    </div>
  ) : null;
};

export default EditProject;
