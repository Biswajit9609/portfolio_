const ProjectCard = ({ title, description, image, technologies, githubLink, projectLink }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 flex flex-col">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies?.map((tech, index) => (
            <span key={index} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4 mt-auto pt-4 border-t border-gray-700/50">
          <a href={projectLink} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors w-full text-center">
            Live Project
          </a>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors w-full text-center">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;