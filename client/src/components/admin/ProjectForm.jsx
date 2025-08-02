import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    projectLink: '',
    image: null,
  });

  useEffect(() => {
    if (initialData) {
      // Pre-fill form, converting the technologies array back to a string
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        technologies: initialData.technologies?.join(', ') || '',
        githubLink: initialData.githubLink || '',
        projectLink: initialData.projectLink || '',
        image: null, // Image field cannot be pre-filled for security reasons
      });
    } else {
      // Reset form for adding new
      setFormData({ title: '', description: '', technologies: '', githubLink: '', projectLink: '', image: null });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The main page handles converting this to FormData
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        rows="3"
        required
      />
      <input
        name="technologies"
        value={formData.technologies}
        onChange={handleChange}
        placeholder="Technologies (comma-separated, e.g., React, Node.js)"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        required
      />
      <input
        name="githubLink"
        type="url"
        value={formData.githubLink}
        onChange={handleChange}
        placeholder="GitHub Link"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        required
      />
      <input
        name="projectLink"
        type="url"
        value={formData.projectLink}
        onChange={handleChange}
        placeholder="Live Project Link"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        required
      />
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Project Image</label>
        <input
          name="image"
          type="file"
          onChange={handleChange}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
          // Image is only required when creating a new project
          required={!initialData} 
        />
        {initialData && <p className="text-xs text-slate-400 mt-1">Leave blank to keep the existing image.</p>}
      </div>
      <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
        {initialData ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;