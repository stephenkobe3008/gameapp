import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { BuildingInterior } from '../pixel';
import { buildingTypes } from '../../constants/buildingTypes';

export const BuildingScreen = ({ building, onExit, onPrayer, onEvent, onCollectOffering }) => {
  const buildingType = buildingTypes[building.type];

  return (
    <div className="min-h-screen bg-amber-900 flex flex-col">
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white p-4 flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-2 bg-amber-800 px-4 py-2 rounded-lg hover:bg-amber-700"
        >
          <ChevronLeft size={20} />
          外に出る
        </button>
        <h2 className="text-xl font-bold">{buildingType.icon} {buildingType.name}</h2>
        <div className="text-sm">建物内: {building.peopleInside || 0}人</div>
      </div>
      <div className="flex-1 bg-amber-800 p-4 flex items-center justify-center overflow-auto">
        <BuildingInterior type={building.type} peopleCount={building.peopleInside || 0} />
      </div>
      <div className="bg-amber-900 p-4 space-y-3">
        <button
          onClick={onPrayer}
          className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-4 rounded-lg font-bold hover:scale-105 transition-transform"
        >
          🙏 礼拝を行う
        </button>
        <button
          onClick={onEvent}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-4 rounded-lg font-bold hover:scale-105 transition-transform"
        >
          🎭 特別行事 (200💰)
        </button>
        <button
          onClick={onCollectOffering}
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-6 py-4 rounded-lg font-bold hover:scale-105 transition-transform"
        >
          💰 献金を集める
        </button>
      </div>
    </div>
  );
};
