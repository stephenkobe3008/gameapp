import React from 'react';
import { Building2, Users, BookOpen, Home, TrendingUp } from 'lucide-react';

export const ActionButtons = ({ onBuild, onMissionary, onResearch, onStats, onHome }) => {
  return (
    <div className="bg-amber-900 p-2 grid grid-cols-5 gap-2">
      <button
        onClick={onBuild}
        className="bg-gradient-to-b from-amber-600 to-amber-800 text-white p-3 rounded-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform"
      >
        <Building2 size={20} />
        <span className="text-xs font-bold">建設</span>
      </button>
      <button
        onClick={onMissionary}
        className="bg-gradient-to-b from-amber-600 to-amber-800 text-white p-3 rounded-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform"
      >
        <Users size={20} />
        <span className="text-xs font-bold">伝道者</span>
      </button>
      <button
        onClick={onResearch}
        className="bg-gradient-to-b from-amber-600 to-amber-800 text-white p-3 rounded-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform"
      >
        <BookOpen size={20} />
        <span className="text-xs font-bold">研究</span>
      </button>
      <button
        onClick={onStats}
        className="bg-gradient-to-b from-amber-600 to-amber-800 text-white p-3 rounded-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform"
      >
        <TrendingUp size={20} />
        <span className="text-xs font-bold">統計</span>
      </button>
      <button
        onClick={onHome}
        className="bg-gradient-to-b from-amber-600 to-amber-800 text-white p-3 rounded-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform"
      >
        <Home size={20} />
        <span className="text-xs font-bold">終了</span>
      </button>
    </div>
  );
};
