import React from 'react';
import { HiOutlineChartBar, HiOutlineBriefcase, HiOutlinePencilAlt, HiOutlineMail } from 'react-icons/hi';

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg flex justify-between items-start">
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>
      <div className="text-purple-400">{icon}</div>
    </div>
  );
};

const AdminStats = ({ articleCount, projectCount, achievementCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Articles" value={articleCount} subtitle="Published articles" icon={<HiOutlinePencilAlt size={24} />} />
      <StatCard title="Projects" value={projectCount} subtitle="Portfolio projects" icon={<HiOutlineBriefcase size={24} />} />
      <StatCard title="Achievements" value={achievementCount} subtitle="Coding achievements" icon={<HiOutlineChartBar size={24} />} />
      <StatCard title="Messages" value="0" subtitle="Contact messages" icon={<HiOutlineMail size={24} />} />
    </div>
  );
};

export default AdminStats;