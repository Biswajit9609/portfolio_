import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaReact, FaJsSquare, FaNodeJs, FaCode } from 'react-icons/fa';
import { HiOutlineClipboardCopy } from 'react-icons/hi';


const getLanguageIcon = (language) => {
  const lang = language?.toLowerCase();
  if (lang === 'react') return <FaReact className="text-cyan-400" />;
  if (lang === 'javascript') return <FaJsSquare className="text-yellow-400" />;
  if (lang === 'node.js') return <FaNodeJs className="text-green-400" />;
  return <FaCode className="text-gray-400" />;
};

const CodeSnippetCard = ({ title, description, language, code, tags = [] }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 hover:border-purple-500/50">
      <div className="flex items-center gap-3">
        <div className="text-xl">{getLanguageIcon(language)}</div>
        <span className="text-slate-300 font-semibold">{language}</span>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-slate-400 text-sm mt-1">{description}</p>
      </div>

      <div className="relative group text-sm">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-1.5 bg-slate-900/50 rounded-md text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Copy code"
        >
          <HiOutlineClipboardCopy />
        </button>
        <SyntaxHighlighter language={language?.toLowerCase()} style={codeStyle} customStyle={{ margin: 0, borderRadius: '0.375rem', padding: '1rem', backgroundColor: '#1E293B' }}>
          {code}
        </SyntaxHighlighter>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs bg-slate-700 text-purple-300 px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CodeSnippetCard;