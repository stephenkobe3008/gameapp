import React from 'react';

export const InfoPanel = ({ gameState }) => {
  return (
    <div className="bg-amber-100 p-4 space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-amber-900">月収:</span>
        <span className="font-bold">
          {gameState.income >= 0 ? '+' : ''}{gameState.income}💰
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-amber-900">維持費:</span>
        <span className="font-bold text-red-700">-{gameState.maintenanceCost}💰</span>
      </div>
      <div className="flex justify-between">
        <span className="text-amber-900">建物数:</span>
        <span className="font-bold">{gameState.buildings.length}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-amber-900">伝道者:</span>
        <span className="font-bold">{gameState.missionaries.length}人</span>
      </div>
    </div>
  );
};
