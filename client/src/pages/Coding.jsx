import React, { useState, useEffect, useRef } from 'react';
import { getAllCodes } from '../services/api';
import CodeSnippetCard from '../components/CodeCard';
import { gsap } from 'gsap';

const CodesPage = () => {
  const [codes, setCodes] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await getAllCodes();
        const fetchedCodes = Array.isArray(response.data)
          ? response.data
          : response.data.codes || [];
        setCodes(fetchedCodes);
      } catch (error) {
        console.error("Failed to fetch code snippets:", error);
      }
    };
    fetchCodes();
  }, []);

  useEffect(() => {
    if (codes.length > 0 && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [codes]);

  const generateTags = (codeItem) => {
    let tags = [...(codeItem.tags || [])]; // include backend tags
    if (codeItem.language) tags.push(codeItem.language);
    if (codeItem.title?.toLowerCase().includes('react')) tags.push('React');
    if (codeItem.title?.toLowerCase().includes('hook')) tags.push('Hooks');
    if (codeItem.title?.toLowerCase().includes('graphql')) tags.push('GraphQL');
    if (codeItem.title?.toLowerCase().includes('node')) tags.push('Node.js');
    return [...new Set(tags)];
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-8 md:p-12">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {codes.length > 0 ? (
          codes.map(codeItem => (
            <CodeSnippetCard
              key={codeItem._id}
              title={codeItem.title}
              description={codeItem.description}
              language={codeItem.language}
              code={codeItem.code}
              tags={generateTags(codeItem)}
            />
          ))
        ) : (
          <p className="text-slate-400 col-span-full text-center">
            Loading code snippets...
          </p>
        )}
      </div>
    </div>
  );
};

export default CodesPage;
