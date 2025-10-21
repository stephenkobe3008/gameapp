import React from 'react';
import { buildingTypes } from '../../constants/buildingTypes';
import { missionaryTypes } from '../../constants/missionaryTypes';
import { researchTypes } from '../../constants/researchTypes';

export const Modal = ({ type, gameState, onClose, onBuy, onHire, onResearch }) => {
  if (!type) return null;

  const getAppliedBonus = (cost, bonusType) => {
    const bonus = gameState.researches.reduce((acc, researchId) => {
      const research = researchTypes[researchId];
      return acc + (research.bonus[bonusType] || 0);
    }, 0);
    return Math.floor(cost * (1 - bonus));
  };

  const handleBuildingAction = (key) => onBuy(key);
  const handleMissionaryAction = (key) => onHire(key);
  const handleResearchAction = (key) => onResearch(key);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-amber-100 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {type === 'build' && Object.entries(buildingTypes).map(([key, building]) => {
            const finalCost = getAppliedBonus(building.cost, 'buildingDiscount');
            const finalMaintenance = getAppliedBonus(building.maintenance, 'maintenanceDiscount');
            return (
              <div key={key} className="bg-white rounded-lg p-4 border-2 border-amber-200 hover:border-amber-400 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{building.icon}</span>
                    <div>
                      <div className="font-bold text-amber-900">{building.name}</div>
                      <div className="text-xs text-gray-600">{building.description}</div>
                    </div>
                  </div>
                  <span className="text-orange-700 font-bold text-lg">💰{finalCost}</span>
                </div>
                <div className="text-xs space-y-1 mb-3">
                  <div className="text-green-700">収入:+{building.income} 影響:+{building.influence} 満足:+{building.happiness}%</div>
                  <div className="text-red-700">維持費: -{finalMaintenance}/月</div>
                  <div className="text-blue-700">収容人数: {building.capacity}人</div>
                </div>
                <button
                  onClick={() => handleBuildingAction(key)}
                  disabled={gameState.gold < finalCost}
                  className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  建設する
                </button>
              </div>
            );
          })}
          {type === 'missionary' && Object.entries(missionaryTypes).map(([key, missionary]) => {
            const bonus = gameState.researches.reduce((acc, researchId) => {
              const research = researchTypes[researchId];
              return acc + (research.bonus.missionaryBonus || 0);
            }, 0);
            const finalRate = Math.floor(missionary.conversionRate * (1 + bonus));
            const finalMaintenance = getAppliedBonus(missionary.maintenance, 'maintenanceDiscount');
            return (
              <div key={key} className="bg-white rounded-lg p-4 border-2 border-amber-200 hover:border-amber-400 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{missionary.icon}</span>
                    <div>
                      <div className="font-bold text-amber-900">{missionary.name}</div>
                      <div className="text-xs text-gray-600">{missionary.description}</div>
                    </div>
                  </div>
                  <span className="text-orange-700 font-bold text-lg">💰{missionary.cost}</span>
                </div>
                <div className="text-xs space-y-1 mb-3">
                  <div className="text-green-700">月間改宗: +{finalRate}人</div>
                  <div className="text-red-700">維持費: -{finalMaintenance}/月</div>
                </div>
                <button
                  onClick={() => handleMissionaryAction(key)}
                  disabled={gameState.gold < missionary.cost}
                  className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  雇用する
                </button>
              </div>
            );
          })}
          {type === 'research' && Object.entries(researchTypes).map(([key, research]) => {
            const isResearched = gameState.researches.includes(key);
            return (
              <div key={key} className="bg-white rounded-lg p-4 border-2 border-amber-200 hover:border-amber-400 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{research.icon}</span>
                    <div>
                      <div className="font-bold text-amber-900">{research.name}</div>
                      <div className="text-xs text-green-700">{research.effect}</div>
                    </div>
                  </div>
                  <span className="text-orange-700 font-bold text-lg">💰{research.cost}</span>
                </div>
                <button
                  onClick={() => handleResearchAction(key)}
                  disabled={gameState.gold < research.cost || isResearched}
                  className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed hover:scale-105 transition-transform mt-2"
                >
                  {isResearched ? '✓ 研究済み' : '研究する'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
