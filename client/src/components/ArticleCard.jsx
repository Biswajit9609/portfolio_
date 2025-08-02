const ArticleCard = ({ title, excerpt }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/20">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{excerpt}</p>
      <a href="#" className="text-cyan-400 hover:text-cyan-300 mt-4 inline-block font-semibold">
        Read More &rarr;
      </a>
    </div>
  );
};

export default ArticleCard;