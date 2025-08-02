import React, { useState, useEffect } from 'react';

const ArticleForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: '', excerpt: '', content: '' });
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
        placeholder="Article Title"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        required
      />
      <textarea
        name="excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        placeholder="Excerpt"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        rows="3"
        required
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Full Content (Markdown supported)"
        className="w-full p-2 bg-slate-700 rounded-md text-white"
        rows="8"
        required
      />
      <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
        {initialData ? 'Update Article' : 'Create Article'}
      </button>
    </form>
  );
};

export default ArticleForm;