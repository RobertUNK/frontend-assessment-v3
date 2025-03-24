import React, { useState, FormEvent } from 'react';

interface ProjectFormProps {
  initialData?: {
    id?: string;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    manager?: string;
  };
  onSubmit: (data: any) => void;
}

const ProjectForm = ({ initialData = {}, onSubmit }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    id: initialData.id || '',
    name: initialData.name || '',
    description: initialData.description || '',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    manager: initialData.manager || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (!submitData.id) {
      delete submitData.id;
    }
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formData.id && (
        <div>
          <label className="block font-bold">Project ID</label>
          <span>{formData.id}</span>
        </div>
      )}
      <div>
        <label className="block font-bold">Project Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-bold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-bold">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-bold">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-bold">Project Manager</label>
        <input
          type="text"
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        {formData.id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default ProjectForm;
