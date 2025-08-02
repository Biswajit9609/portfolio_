import React from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';

const AdminArticleList = ({ articles, onDelete, onAdd, onEdit }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Articles</h2>
        <button onClick={onAdd} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">+ Add Article</button>
      </div>
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article._id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-white">{article.title}</h3>
              <p className="text-slate-400 text-sm">{article.excerpt}</p>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => onEdit(article)} className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"><HiPencil /></button>
              <button onClick={() => onDelete(article._id)} className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"><HiTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArticleList;