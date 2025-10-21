import { useState, useEffect, useCallback } from 'react';
import { initialGameState } from '../constants/gameConstants';
import { buildingTypes } from '../constants/buildingTypes';
import { missionaryTypes } from '../constants/missionaryTypes';

export const useGameState = (screen, showNotification) => {
  const [gameState, setGameState] = useState(initialGameState);

  useEffect(() => {
    if (screen !== 'game' || gameState.isGameOver) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        const newDay = prev.day + 1;
        if (newDay >= 30) {
          const newSeason = (prev.season + 1) % 4;
          const newYear = newSeason === 0 ? prev.year + 1 : prev.year;
          return processMonth({ ...prev, day: 0, season: newSeason, year: newYear }, showNotification);
        }
        return { ...prev, day: newDay };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, gameState.isGameOver, showNotification]);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const buyBuilding = useCallback((type) => {
    const building = buildingTypes[type];
    if (gameState.gold >= building.cost) {
      setGameState(prev => ({
        ...prev,
        gold: prev.gold - building.cost,
        influence: prev.influence + building.influence,
        happiness: prev.happiness + building.happiness,
        buildings: [...prev.buildings, { type, peopleInside: 0 }]
      }));
      showNotification('建設完了', `${building.name}を建設しました`);
      return true;
    }
    return false;
  }, [gameState.gold, showNotification]);

  const hireMissionary = useCallback((type) => {
    const missionary = missionaryTypes[type];
    if (gameState.gold >= missionary.cost) {
      setGameState(prev => ({
        ...prev,
        gold: prev.gold - missionary.cost,
        missionaries: [...prev.missionaries, { type }]
      }));
      showNotification('雇用成功', `${missionary.name}を雇用しました`);
      return true;
    }
    return false;
  }, [gameState.gold, showNotification]);

  const doResearch = useCallback((type, researchTypes) => {
    const research = researchTypes[type];
    if (gameState.gold >= research.cost && !gameState.researches.includes(type)) {
      setGameState(prev => ({
        ...prev,
        gold: prev.gold - research.cost,
        researches: [...prev.researches, type]
      }));
      showNotification('研究完了', `${research.name}を研究しました`);
      return true;
    }
    return false;
  }, [gameState.gold, gameState.researches, showNotification]);

  const startPrayer = useCallback((buildingIndex) => {
    if (buildingIndex === null) return;
    const movedCount = Math.min(5, gameState.followers);
    setGameState(prev => {
      const newBuildings = [...prev.buildings];
      newBuildings[buildingIndex].peopleInside = (newBuildings[buildingIndex].peopleInside || 0) + movedCount;
      return {
        ...prev,
        buildings: newBuildings,
        happiness: prev.happiness + 5,
        influence: prev.influence + 10
      };
    });
    showNotification('🙏 礼拝開始', `${movedCount}人が参加しました`);
    setTimeout(() => {
      setGameState(prev => {
        const newBuildings = [...prev.buildings];
        if (newBuildings[buildingIndex]) {
          newBuildings[buildingIndex].peopleInside = 0;
        }
        return { ...prev, buildings: newBuildings };
      });
    }, 30000);
  }, [gameState.followers, showNotification]);

  const startEvent = useCallback(() => {
    if (gameState.gold < 200) {
      showNotification('⚠️ 資金不足', '200💰必要です');
      return false;
    }
    const newFollowers = Math.floor(Math.random() * 10) + 5;
    setGameState(prev => ({
      ...prev,
      gold: prev.gold - 200,
      followers: prev.followers + newFollowers,
      happiness: prev.happiness + 15
    }));
    showNotification('🎭 行事成功', `${newFollowers}人獲得しました`);
    return true;
  }, [gameState.gold, showNotification]);

  const collectOffering = useCallback((buildingIndex) => {
    if (buildingIndex === null) return;
    const building = gameState.buildings[buildingIndex];
    const peopleCount = building.peopleInside || 0;
    if (peopleCount === 0) {
      showNotification('⚠️ 誰もいません', '礼拝で信者を集めましょう');
      return;
    }
    const offering = peopleCount * (Math.floor(Math.random() * 20) + 10);
    setGameState(prev => ({
      ...prev,
      gold: prev.gold + offering
    }));
    showNotification('💰 献金', `${offering}💰を集めました`);
  }, [gameState.buildings, showNotification]);

  return {
    gameState,
    resetGame,
    buyBuilding,
    hireMissionary,
    doResearch,
    startPrayer,
    startEvent,
    collectOffering
  };
};

const processMonth = (state, showNotification) => {
  let totalMaintenance = 0;
  state.buildings.forEach(building => {
    totalMaintenance += buildingTypes[building.type].maintenance;
  });
  state.missionaries.forEach(missionary => {
    totalMaintenance += missionaryTypes[missionary.type].maintenance;
  });

  let totalIncome = 0;
  state.buildings.forEach(building => {
    totalIncome += buildingTypes[building.type].income;
  });

  let newFollowers = 0;
  state.missionaries.forEach(missionary => {
    newFollowers += missionaryTypes[missionary.type].conversionRate;
  });

  const netIncome = totalIncome + state.followers * 2 - totalMaintenance;
  let newGold = state.gold + netIncome;
  let newHappiness = state.happiness - 5;
  let finalFollowers = state.followers + newFollowers;

  if (newGold < 0) {
    newHappiness -= 20;
    showNotification('⚠️ 資金不足', '維持費が払えず満足度が低下');
  }

  if (newHappiness < 30) {
    const lostFollowers = Math.floor(finalFollowers * 0.1);
    finalFollowers -= lostFollowers;
    if (lostFollowers > 0) {
      showNotification('😞 信者離脱', `${lostFollowers}人が去りました`);
    }
  }

  newHappiness = Math.max(0, Math.min(100, newHappiness));

  if (newGold < -500 || finalFollowers <= 0 || newHappiness <= 0) {
    return { ...state, isGameOver: true };
  }

  if (newFollowers > 0) {
    showNotification('📈 月次報告', `信者+${newFollowers} 収支${netIncome >= 0 ? '+' : ''}${netIncome}💰`);
  }

  return {
    ...state,
    followers: finalFollowers,
    gold: newGold,
    happiness: newHappiness,
    income: netIncome,
    maintenanceCost: totalMaintenance
  };
};
