import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import Home from './pages/Home.jsx'
import ProjectsPage from './pages/Projects';
import ArticlesPage from './pages/Articles';
import CodesPage from './pages/Coding';
import AdminPage from './pages/Admin';



const Navbar = () => {
  const linkStyle = "text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkStyle = "text-white bg-gray-700/50";

  return (
    <nav className="bg-gray-800/30 backdrop-blur-lg fixed top-4 left-1/2 -translate-x-1/2 w-auto z-50 rounded-full border border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="block max-w-[80dvw] md:w-auto">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Home</NavLink>
                <NavLink to="/projects" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Projects</NavLink>
                <NavLink to="/articles" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Articles</NavLink>
                <NavLink to="/coding-achievements" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Achievements</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
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