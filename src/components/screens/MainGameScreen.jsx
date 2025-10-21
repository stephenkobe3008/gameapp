import React from 'react';
import { PixelBuilding, PixelPerson } from '../pixel';
import { StatusBar, InfoPanel, ActionButtons } from '../ui';
import { buildingTypes } from '../../constants/buildingTypes';

export const MainGameScreen = ({ gameState, onBuildingClick, onOpenBuildModal, onOpenMissionaryModal, onOpenResearchModal, onOpenStats, onBackToTitle }) => {
  return (
    <div className="min-h-screen bg-green-700 flex flex-col">
      <StatusBar gameState={gameState} />
      <div className="flex-1 bg-green-600 p-4 overflow-auto">
        <div className="grid grid-cols-2 gap-4">
          {gameState.buildings.map((building, index) => {
            const type = buildingTypes[building.type];
            const fillPercentage = Math.min(100, ((building.peopleInside || 0) / type.capacity) * 100);
            return (
              <button
                key={index}
                onClick={() => onBuildingClick(index)}
                className="bg-amber-100 border-4 border-amber-800 rounded-xl p-4 text-center hover:scale-105 transition-transform shadow-lg relative"
              >
                <div className="flex justify-center mb-2">
                  <PixelBuilding type={building.type} size={100} level={building.level || 1} />
                </div>
                <div className="font-bold text-amber-900 text-sm">{type.name}</div>
                <div className="text-xs text-amber-700 mt-1">{building.peopleInside || 0}/{type.capacity}人</div>
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${fillPercentage}%` }}></div>
                </div>
              </button>
            );
          })}
          {gameState.buildings.length === 0 && (
            <div className="col-span-2 text-center text-white text-lg py-12">
              <div className="mb-4">建物を建設してゲームを始めましょう！</div>
              <PixelPerson isBelievers={false} size={64} />
            </div>
          )}
        </div>
      </div>
      <InfoPanel gameState={gameState} />
      <ActionButtons
        onBuild={onOpenBuildModal}
        onMissionary={onOpenMissionaryModal}
        onResearch={onOpenResearchModal}
        onStats={onOpenStats}
        onHome={onBackToTitle}
      />
    </div>
  );
};
