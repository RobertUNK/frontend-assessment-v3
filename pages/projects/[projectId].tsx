import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Project } from './index';

const ProjectDetail = () => {
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

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>Error: {error}</p>;

  return project ? (
    <div>
      <h1 className='text-xl mb-6'>Project Detail</h1>
      <div className="mb-4">
        <strong>Project ID:</strong> {project.id}
      </div>
      <div className="mb-4">
        <strong>Project Name:</strong> {project.name}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {project.description}
      </div>
      <div className="mb-4">
        <strong>Start Date:</strong> {project.startDate}
      </div>
      <div className="mb-4">
        <strong>End Date:</strong> {project.endDate}
      </div>
      <div className="mb-8">
        <strong>Project Manager:</strong> {project.manager}
      </div>
      <div className="space-x-4">
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => router.push('/projects')}
        >
          Back
        </button>
        <Link href={`/projects/${project.id}/edit`}>
          <button className="bg-blue-500 text-white p-2 rounded">
            Edit
          </button>
        </Link>
      </div>
    </div>
  ) : null;
};

export default ProjectDetail;
