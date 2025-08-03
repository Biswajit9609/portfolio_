import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import Home from './pages/Home.jsx'
import ProjectsPage from './pages/Projects';
import ArticlesPage from './pages/Articles';
import CodesPage from './pages/Coding';
import AdminPage from './pages/Admin.jsx';
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const linkStyle = "text-gray-300 hover:text-cyan-400 transition px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkStyle = "text-white bg-gray-700/50";

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex bg-gray-800/30 backdrop-blur-lg fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border border-gray-700 px-6 py-2">
        <div className="flex space-x-4">
          <NavLink to="/" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Home</NavLink>
          <NavLink to="/projects" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Projects</NavLink>
          <NavLink to="/articles" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Articles</NavLink>
          <NavLink to="/coding-achievements" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Achievements</NavLink>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="sm:hidden fixed top-4 left-4 right-4 z-50 bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700 px-4 py-2">
        <div className="flex justify-between items-center">
          <div />
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {isOpen && (
          <div className="flex flex-col mt-2 space-y-2">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Home</NavLink>
            <NavLink to="/projects" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Projects</NavLink>
            <NavLink to="/articles" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Articles</NavLink>
            <NavLink to="/coding-achievements" onClick={() => setIsOpen(false)} className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Achievements</NavLink>
          </div>
        )}
      </nav>
    </>
  );
};


function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-20 bg-gray-900 text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/coding-achievements" element={<CodesPage />} />
          
          <Route path="/admin" element={<AdminPage />} />

          <Route path="*" element={<div className="text-white text-center p-20 text-3xl">404: Page Not Found</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;