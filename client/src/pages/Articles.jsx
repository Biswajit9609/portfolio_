import { useState, useEffect, useRef } from 'react';
import { getAllArticles } from '../services/api';
import { gsap } from 'gsap';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getAllArticles();
      setArticles(response.data);
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      gsap.fromTo(containerRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [articles]);

  const toggleExpand = (id) => {
    setExpandedArticleId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-2 text-center">
          Writing & <span className="text-purple-400">Articles</span>
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Thoughts on technology, development, and more.
        </p>

        <div ref={containerRef} className="space-y-8">
          {articles.map(article => {
            const isExpanded = expandedArticleId === article._id;
            const contentPreview = article.content.slice(0, 300) + (article.content.length > 300 ? '...' : '');

            return (
              <div key={article._id} className="bg-gray-800/60 p-6 rounded-lg border border-gray-700">
                <h2 className="text-3xl font-bold mb-2 text-purple-300">{article.title}</h2>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(article.createdAt).toDateString()}
                </p>
                <div className="text-gray-200 leading-relaxed whitespace-pre-line mb-4">
                  {isExpanded ? article.content : contentPreview}
                </div>
                {article.content.length > 300 && (
                  <button
                    onClick={() => toggleExpand(article._id)}
                    className="text-sm text-purple-400 hover:underline"
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
