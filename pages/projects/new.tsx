import React from 'react';
import { useRouter } from 'next/router';
import ProjectForm from '../../components/ProjectForm';
import { Project } from './index';

const CreateProject = () => {
  const router = useRouter();

  const handleCreate = async (data: Omit<Project, 'id'> & { id?: string }) => {
    try {
      const { id, ...payload } = data;
      
      const res = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Create project failed');
      
      router.push('/projects');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateProject;
