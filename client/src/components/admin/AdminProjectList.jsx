import React from 'react';
import { HiPencil, HiTrash, HiOutlineExternalLink, HiCode } from 'react-icons/hi';
// Assume you'll create a ProjectForm component for adding/editing

const AdminProjectList = ({ projects, onDelete }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">+ Add Project</button>
      </div>
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project._id} className="bg-slate-800 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-white">{project.title}</h3>
                <p className="text-slate-400 text-sm">{project.description}</p>
              </div>
              <div className="flex space-x-3 flex-shrink-0 ml-4">
                <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"><HiPencil /></button>
                <button onClick={() => onDelete(project._id)} className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"><HiTrash /></button>
              </div>
            </div>
            <div className="mt-3 flex items-center flex-wrap gap-2">
              {project.technologies?.map(tech => (
                <span key={tech} className="text-xs bg-slate-700 text-cyan-300 px-2 py-1 rounded-full">{tech}</span>
              ))}
              <a href={project.projectLink} className="flex items-center text-xs text-slate-300 ml-auto mr-2 hover:text-white">
                <HiOutlineExternalLink className="mr-1" /> Demo
              </a>
              <a href={project.githubLink} className="flex items-center text-xs text-slate-300 hover:text-white">
                <HiCode className="mr-1" /> Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjectList;