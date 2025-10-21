import React from 'react';
import { seasons } from '../../constants/gameConstants';

export const StatusBar = ({ gameState }) => {
  return (
    <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">✝️ 光の教団</h1>
        <div className="text-sm">{gameState.year}年目 {seasons[gameState.season]}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center text-sm">
        <div>
          <div className="font-bold">{gameState.followers}</div>
          <div className="text-xs opacity-90">信者</div>
        </div>
        <div>
          <div className="font-bold">{gameState.gold}💰</div>
          <div className="text-xs opacity-90">資金</div>
        </div>
        <div>
          <div className="font-bold">{gameState.influence}</div>
          <div className="text-xs opacity-90">影響力</div>
        </div>
        <div>
          <div className="font-bold">{gameState.happiness}%</div>
          <div className="text-xs opacity-90">満足度</div>
        </div>
      </div>
    </div>
  );
};
