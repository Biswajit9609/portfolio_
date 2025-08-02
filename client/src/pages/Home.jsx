import { useEffect, useState } from 'react'
import axios from 'axios'
import image from '../assets/me.jpg'
import { CalendarDays, User, ArrowRight, ExternalLink, Github, Copy } from 'lucide-react'
import { 
    Link
} from "react-router-dom"

const Home = () => {
  const [projects, setProjects] = useState([])
  const [articles, setArticles] = useState([])
  const [codes, setCodes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proj, art, cod] = await Promise.all([
          axios.get('http://localhost:4000/api/projects'),
          axios.get('http://localhost:4000/api/articles'),
          axios.get('http://localhost:4000/api/codes')
        ])
        setProjects(proj.data.filter(p => p.featured))
        setArticles(art.data.filter(a => a.featured))
        setCodes(cod.data.filter(c => c.featured))
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#1e1b4b] min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <img src={image} alt="Profile" className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-blue-600" />
        <div>
          <h2 className="text-4xl font-extrabold mb-3">Hi, I’m Biswajit 👋</h2>
          <p className="text-xl text-blue-500 font-medium mb-4">Full Stack Developer | IoT Enthusiast</p>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            I build full-stack web apps and embedded systems. Currently working on smart solutions like MedAlert and Sh-xi.
            I'm passionate about blending software with hardware to solve real-world problems.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container mx-auto px-6 py-14">
        <h3 className="text-3xl font-bold mb-10 text-center">🚀 Featured Projects</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map(p => (
            <div key={p._id} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl overflow-hidden shadow-lg">
              <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h4 className="text-2xl font-bold mb-2">{p.title}</h4>
                <p className="text-sm text-gray-300 mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p?.technologies?.map((tech, i) => (
                    <span key={i} className="bg-purple-700 px-2 py-1 rounded-full text-xs">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <a href={p.projectLink} target="_blank" className="flex items-center gap-1 text-blue-400 hover:underline">
                    <ExternalLink size={16} /> Demo
                  </a>
                  <a href={p.githubLink} target="_blank" className="flex items-center gap-1 text-green-400 hover:underline">
                    <Github size={16} /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="container mx-auto px-6 py-14">
        <h3 className="text-3xl font-bold mb-10 text-center">📚 Featured Articles</h3>
        <div className="grid sm:grid-cols-2 gap-8">
          {articles?.map(a => (
            <div key={a._id} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 shadow-lg flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-semibold mb-2">{a.title}</h4>
                <p className="text-sm text-gray-300 mb-4">{a.excerpt || a.content.substring(0, 100)}...</p>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{a.author || 'Biswajit Chatterjee'}</span>
                </div>
              </div>
              <Link to='/articles/' className="mt-4 text-purple-400 flex items-center gap-1 hover:underline">
                Read More <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Code Snippets */}
      <section id="coding" className="container mx-auto px-6 py-14">
        <h3 className="text-3xl font-bold mb-10 text-center">💻 Featured Code Snippets</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {codes?.map(c => (
            <div key={c._id} className="bg-[#0f172a] text-green-400 rounded-xl p-6 shadow-lg relative overflow-hidden">
              <div className="text-white font-bold text-lg mb-2">
                {c.title}
                <span className="ml-2 text-sm text-gray-400">({c.language})</span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(c.code)}
                className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
              >
                <Copy size={14} /> Copy
              </button>
              <pre className="mt-2 text-sm overflow-x-auto whitespace-pre-wrap max-h-60">{c.code}</pre>
              <div className="flex flex-wrap gap-2 mt-4">
                {c.tags?.map((tag, i) => (
                  <span key={i} className="bg-purple-800 px-2 py-1 rounded-full text-xs text-white">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
