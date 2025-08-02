import React from 'react';
import { HiX } from 'react-icons/hi';

const AdminModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <HiX size={24} />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminModal;