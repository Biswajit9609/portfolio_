import React, { useState, useEffect } from 'react';

const CodeForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: '',
    code: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: '', description: '', language: '', code: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Snippet Title (e.g., GraphQL Query Optimization)"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        required
      />
      <input
        name="language"
        value={formData.language}
        onChange={handleChange}
        placeholder="Language (e.g., javascript)"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Brief description of the snippet"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        rows="2"
      />
      <textarea
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="// Your code snippet here"
        className="w-full p-2 bg-slate-700 rounded-md text-white font-mono text-sm"
        rows="10"
        required
      />
      <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
        {initialData ? 'Update Snippet' : 'Create Snippet'}
      </button>
    </form>
  );
};

export default CodeForm;