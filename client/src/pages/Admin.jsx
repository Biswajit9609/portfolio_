import React, { useState, useEffect } from 'react';
import {
  getAllProjects, addProject, updateProject, deleteProject,
  getAllArticles, addArticle, updateArticle, deleteArticle,
  getAllCodes, addCode, updateCode, deleteCode
} from '../services/api';


import AdminStats from '../components/admin/AdminStats';
import AdminModal from '../components/admin/AdminModal';
import AdminProjectList from '../components/admin/AdminProjectList';
import AdminArticleList from '../components/admin/AdminArticleList';
import AdminCodeList from '../components/admin/AdminCodeList';
import ArticleForm from '../components/admin/ArticleForm';
import ProjectForm from '../components/admin/ProjectForm';
import CodeForm from '../components/admin/CodeForm';

const AdminPage = () => {

  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  const [codes, setCodes] = useState([]);
  const [activeTab, setActiveTab] = useState('Articles');


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);


  const fetchData = async () => {
    try {
      setProjects((await getAllProjects()).data);
      setArticles((await getAllArticles()).data);
      setCodes((await getAllCodes()).data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (type === 'project') await deleteProject(id);
        if (type === 'article') await deleteArticle(id);
        if (type === 'code') await deleteCode(id);
        fetchData();
      } catch (error) {
        console.error(`Failed to delete ${type}:`, error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const isEditing = !!editingItem;
      const itemType = activeTab.slice(0, -1).toLowerCase();

      if (isEditing) {
        if (itemType === 'article') await updateArticle(editingItem._id, formData);
        if (itemType === 'project') await updateProject(editingItem._id, formData);
        if (itemType === 'achievement') await updateCode(editingItem._id, formData);
      } else {
        if (itemType === 'article') await addArticle(formData);
        if (itemType === 'project') await addProject(formData);
        if (itemType === 'achievement') await addCode(formData);
      }
      
      fetchData();
      handleCloseModal(); 
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };
  
  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Projects':
        return <AdminProjectList projects={projects} onDelete={(id) => handleDelete(id, 'project')} onAdd={() => handleOpenModal()} onEdit={handleOpenModal} />;
      case 'Achievements':
        return <AdminCodeList codes={codes} onDelete={(id) => handleDelete(id, 'code')} onAdd={() => handleOpenModal()} onEdit={handleOpenModal} />;
      case 'Articles':
      default:
        return <AdminArticleList articles={articles} onDelete={(id) => handleDelete(id, 'article')} onAdd={() => handleOpenModal()} onEdit={handleOpenModal} />;
    }
  };
  
  const renderModalContent = () => {
    switch (activeTab) {
      case 'Projects':
        return <ProjectForm onSubmit={handleFormSubmit} initialData={editingItem} />;
      case 'Achievements':
        return <CodeForm onSubmit={handleFormSubmit} initialData={editingItem} />;
      case 'Articles':
      default:
        return <ArticleForm onSubmit={handleFormSubmit} initialData={editingItem} />;
    }
  };
  
  const TabButton = ({ name }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === name
          ? 'bg-purple-600 text-white'
          : 'text-gray-300 hover:bg-slate-700'
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-400">Manage your portfolio content</p>
        </header>

        <AdminStats
          articleCount={articles.length}
          projectCount={projects.length}
          achievementCount={codes.length}
        />
        
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6 mt-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2 bg-slate-800 p-1 rounded-lg">
                    <TabButton name="Articles" />
                    <TabButton name="Projects" />
                    <TabButton name="Achievements" />
                </div>
            </div>
            {renderContent()}
        </div>
      </div>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
      >
        {renderModalContent()}
      </AdminModal>
    </div>
  );
};

export default AdminPage;