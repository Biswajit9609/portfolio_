import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/coding">Coding</Link>
    </nav>
  );
}
