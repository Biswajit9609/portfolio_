import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { HiPencil, HiTrash, HiOutlineClipboardCopy } from 'react-icons/hi';
// Assume you'll create a CodeForm component for adding/editing

const AdminCodeList = ({ codes, onDelete }) => {
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // You could add a small notification here
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Coding Achievements</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">+ Add Achievement</button>
      </div>
      <div className="space-y-6">
        {codes.map(codeItem => (
          <div key={codeItem._id} className="bg-slate-800 rounded-lg">
            <div className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-white">{codeItem.title}</h3>
                <p className="text-slate-400 text-sm">{codeItem.description}</p>
              </div>
              <div className="flex space-x-3 flex-shrink-0 ml-4">
                <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"><HiPencil /></button>
                <button onClick={() => onDelete(codeItem._id)} className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"><HiTrash /></button>
              </div>
            </div>
            <div className="relative group">
              <button onClick={() => copyToClipboard(codeItem.code)} className="absolute top-2 right-2 p-1.5 bg-slate-900/50 rounded-md text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <HiOutlineClipboardCopy />
              </button>
              <SyntaxHighlighter language={codeItem.language?.toLowerCase()} style={vscDarkPlus} customStyle={{ margin: 0, borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                {codeItem.code}
              </SyntaxHighlighter>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCodeList;