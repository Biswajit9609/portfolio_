import { useEffect, useState } from "react"
import { getAllProjects } from "../services/api"
import ProjectCard from "../components/ProjectCard"

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getAllProjects().then(res => setProjects(res.data))
  }, [])

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project._id}
          title={project.title}
          description={project.description}
          image={project.image}
          technologies={project.technologies}
          githubLink={project.githubLink}
          projectLink={project.projectLink}
        />
      ))}
    </div>
  )
}
