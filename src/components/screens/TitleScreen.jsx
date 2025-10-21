import React from 'react';
import { PixelPerson } from '../pixel';

export const TitleScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-yellow-300 mb-4 animate-pulse">
          ✝️ 祈りの大地 ✝️
        </h1>
        <p className="text-xl text-yellow-100">~ 信仰育成シミュレーション ~</p>
        <div className="flex justify-center">
          <PixelPerson isBelievers={true} size={128} />
        </div>
        <button
          onClick={onStart}
          className="w-64 bg-gradient-to-r from-amber-600 to-amber-800 text-white px-8 py-4 rounded-lg text-xl font-bold hover:scale-105 transition-transform shadow-lg"
        >
          最初から始める
        </button>
      </div>
    </div>
  );
};
