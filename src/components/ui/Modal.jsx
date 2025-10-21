import React from 'react';
import { buildingTypes } from '../../constants/buildingTypes';
import { missionaryTypes } from '../../constants/missionaryTypes';
import { researchTypes } from '../../constants/researchTypes';

export const Modal = ({ type, gameState, onClose, onBuy, onHire, onResearch }) => {
  if (!type) return null;

  const handleBuildingAction = (key) => onBuy(key);
  const handleMissionaryAction = (key) => onHire(key);
  const handleResearchAction = (key) => onResearch(key);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-amber-100 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-amber-900">
            {type === 'build' && '🏗️ 建設'}
            {type === 'missionary' && '👥 伝道者雇用'}
            {type === 'research' && '📚 研究開発'}
          </h3>
          <button
            onClick={onClose}
            className="text-3xl text-amber-700 hover:text-amber-900"
          >
            ×
          </button>
        </div>
        <div className="space-y-3">
          {type === 'build' && Object.entries(buildingTypes).map(([key, building]) => (
            <div key={key} className="bg-white rounded-lg p-4 border-2 border-amber-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{building.icon}</span>
                  <span className="font-bold text-amber-900">{building.name}</span>
                </div>
                <span className="text-orange-700 font-bold">💰{building.cost}</span>
              </div>
              <div className="text-xs text-green-700 mb-2">
                収入:+{building.income} 影響力:+{building.influence} 満足度:+{building.happiness}%
              </div>
              <div className="text-xs text-red-700 mb-3">維持費: -{building.maintenance}/月</div>
              <button
                onClick={() => handleBuildingAction(key)}
                disabled={gameState.gold < building.cost}
                className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                建設する
              </button>
            </div>
          ))}
          {type === 'missionary' && Object.entries(missionaryTypes).map(([key, missionary]) => (
            <div key={key} className="bg-white rounded-lg p-4 border-2 border-amber-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{missionary.icon}</span>
                  <span className="font-bold text-amber-900">{missionary.name}</span>
                </div>
                <span className="text-orange-700 font-bold">💰{missionary.cost}</span>
              </div>
              <div className="text-xs text-green-700 mb-2">
                月間改宗: +{missionary.conversionRate}人
              </div>
              <div className="text-xs text-red-700 mb-3">維持費: -{missionary.maintenance}/月</div>
              <button
                onClick={() => handleMissionaryAction(key)}
                disabled={gameState.gold < missionary.cost}
                className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                雇用する
              </button>
            </div>
          ))}
          {type === 'research' && Object.entries(researchTypes).map(([key, research]) => {
            const isResearched = gameState.researches.includes(key);
            return (
              <div key={key} className="bg-white rounded-lg p-4 border-2 border-amber-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{research.icon}</span>
                    <span className="font-bold text-amber-900">{research.name}</span>
                  </div>
                  <span className="text-orange-700 font-bold">💰{research.cost}</span>
                </div>
                <div className="text-xs text-green-700 mb-3">{research.effect}</div>
                <button
                  onClick={() => handleResearchAction(key)}
                  disabled={gameState.gold < research.cost || isResearched}
                  className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  {isResearched ? '研究済み' : '研究する'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
