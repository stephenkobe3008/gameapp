import React from 'react';
import { TrendingUp, Award } from 'lucide-react';
import { achievements } from '../../constants/gameConstants';
import { buildingTypes } from '../../constants/buildingTypes';

export const StatsScreen = ({ gameState, onClose }) => {
  const unlockedAchievements = achievements.filter(a => a.check(gameState));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-amber-100 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
            <TrendingUp /> 統計情報
          </h3>
          <button onClick={onClose} className="text-3xl text-amber-700 hover:text-amber-900">×</button>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3 text-amber-900">📊 現在の状況</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-amber-50 p-3 rounded">
                <div className="text-gray-600">プレイ期間</div>
                <div className="text-xl font-bold">{gameState.year}年目</div>
              </div>
              <div className="bg-amber-50 p-3 rounded">
                <div className="text-gray-600">信者数</div>
                <div className="text-xl font-bold">{gameState.followers}人</div>
              </div>
              <div className="bg-amber-50 p-3 rounded">
                <div className="text-gray-600">総資産</div>
                <div className="text-xl font-bold">{gameState.gold}💰</div>
              </div>
              <div className="bg-amber-50 p-3 rounded">
                <div className="text-gray-600">影響力</div>
                <div className="text-xl font-bold">{gameState.influence}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3 text-amber-900 flex items-center gap-2">
              <Award /> 実績 ({unlockedAchievements.length}/{achievements.length})
            </h4>
            <div className="space-y-2">
              {achievements.map(achievement => {
                const unlocked = unlockedAchievements.some(a => a.id === achievement.id);
                return (
                  <div key={achievement.id} className={`p-3 rounded flex items-center gap-3 ${unlocked ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-100 opacity-50'}`}>
                    <div className="text-2xl">{unlocked ? '🏆' : '🔒'}</div>
                    <div className="flex-1">
                      <div className="font-bold">{achievement.name}</div>
                      <div className="text-xs text-gray-600">{achievement.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-lg mb-3 text-amber-900">🏗️ 建設物の内訳</h4>
            <div className="space-y-2">
              {Object.entries(buildingTypes).map(([key, building]) => {
                const count = gameState.buildings.filter(b => b.type === key).length;
                if (count === 0) return null;
                return (
                  <div key={key} className="flex justify-between items-center bg-amber-50 p-2 rounded">
                    <span>{building.icon} {building.name}</span>
                    <span className="font-bold">{count}棟</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
