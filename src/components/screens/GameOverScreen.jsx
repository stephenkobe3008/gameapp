import React from 'react';

export const GameOverScreen = ({ gameState, onBackToTitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-amber-100 rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-4xl font-bold text-red-700">💀 ゲームオーバー</h2>
        <div className="bg-amber-50 p-6 rounded-lg space-y-2">
          <h3 className="font-bold text-lg text-amber-900 mb-4">最終成績</h3>
          <p><strong>存続期間:</strong> {gameState.year}年目</p>
          <p><strong>最大信者数:</strong> {gameState.followers}人</p>
          <p><strong>建設した施設:</strong> {gameState.buildings.length}棟</p>
          <p><strong>影響力:</strong> {gameState.influence}</p>
        </div>
        <button
          onClick={onBackToTitle}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
        >
          タイトルに戻る
        </button>
      </div>
    </div>
  );
};
