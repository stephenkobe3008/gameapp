import { useState, useEffect, useCallback } from 'react';
import { initialGameState } from '../constants/gameConstants';
import { buildingTypes } from '../constants/buildingTypes';
import { missionaryTypes } from '../constants/missionaryTypes';
import { researchTypes } from '../constants/researchTypes';

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

  const getAppliedBonus = useCallback((cost, bonusType) => {
    const bonus = gameState.researches.reduce((acc, researchId) => {
      const research = researchTypes[researchId];
      return acc + (research.bonus[bonusType] || 0);
    }, 0);
    return Math.floor(cost * (1 - bonus));
  }, [gameState.researches]);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const buyBuilding = useCallback((type) => {
    const building = buildingTypes[type];
    const finalCost = getAppliedBonus(building.cost, 'buildingDiscount');

    if (gameState.gold >= finalCost) {
      setGameState(prev => ({
        ...prev,
        gold: prev.gold - finalCost,
        influence: prev.influence + building.influence,
        happiness: prev.happiness + building.happiness,
        buildings: [...prev.buildings, { type, peopleInside: 0, level: 1 }]
      }));
      showNotification('✅ 建設完了', `${building.name}を建設しました`);
      return true;
    }
    return false;
  }, [gameState.gold, getAppliedBonus, showNotification]);

  const hireMissionary = useCallback((type) => {
    const missionary = missionaryTypes[type];
    if (gameState.gold >= missionary.cost) {
      setGameState(prev => ({
        ...prev,
        gold: prev.gold - missionary.cost,
        missionaries: [...prev.missionaries, { type }]
      }));
      showNotification('✅ 雇用成功', `${missionary.name}を雇用しました`);
      return true;
    }
    return false;
  }, [gameState.gold, showNotification]);

  const doResearch = useCallback((type) => {
    const research = researchTypes[type];
    if (gameState.gold >= research.cost && !gameState.researches.includes(type)) {
      setGameState(prev => ({
        ...prev,
        gold: prev.gold - research.cost,
        researches: [...prev.researches, type],
        happiness: prev.happiness + (research.bonus.happiness || 0),
        influence: prev.influence + (research.bonus.influence || 0)
      }));
      showNotification('✅ 研究完了', `${research.name}を研究しました`);
      return true;
    }
    return false;
  }, [gameState.gold, gameState.researches, showNotification]);

  const startPrayer = useCallback((buildingIndex) => {
    if (buildingIndex === null) return;

    const building = gameState.buildings[buildingIndex];
    const buildingType = buildingTypes[building.type];
    const availableSpace = buildingType.capacity - (building.peopleInside || 0);
    const movedCount = Math.min(availableSpace, Math.min(10, gameState.followers));

    if (movedCount === 0) {
      showNotification('⚠️ 満員です', '建物がいっぱいです');
      return;
    }

    const prayerBonus = gameState.researches.reduce((acc, id) =>
      acc + (researchTypes[id].bonus.prayerBonus || 0), 0);

    const happinessGain = Math.floor(5 * (1 + prayerBonus));
    const influenceGain = Math.floor(10 * (1 + prayerBonus));

    setGameState(prev => {
      const newBuildings = [...prev.buildings];
      newBuildings[buildingIndex].peopleInside = (newBuildings[buildingIndex].peopleInside || 0) + movedCount;
      return {
        ...prev,
        buildings: newBuildings,
        happiness: Math.min(100, prev.happiness + happinessGain),
        influence: prev.influence + influenceGain
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
  }, [gameState.buildings, gameState.followers, gameState.researches, showNotification]);

  const startEvent = useCallback(() => {
    if (gameState.gold < 200) {
      showNotification('⚠️ 資金不足', '200💰必要です');
      return false;
    }

    const eventBonus = gameState.researches.reduce((acc, id) =>
      acc + (researchTypes[id].bonus.eventBonus || 0), 0);

    const baseFollowers = Math.floor(Math.random() * 10) + 5;
    const newFollowers = Math.floor(baseFollowers * (1 + eventBonus));
    const happinessGain = Math.floor(15 * (1 + eventBonus));

    setGameState(prev => ({
      ...prev,
      gold: prev.gold - 200,
      followers: prev.followers + newFollowers,
      happiness: Math.min(100, prev.happiness + happinessGain)
    }));
    showNotification('🎭 行事成功', `${newFollowers}人獲得しました`);
    return true;
  }, [gameState.gold, gameState.researches, showNotification]);

  const collectOffering = useCallback((buildingIndex) => {
    if (buildingIndex === null) return;

    const building = gameState.buildings[buildingIndex];
    const peopleCount = building.peopleInside || 0;

    if (peopleCount === 0) {
      showNotification('⚠️ 誰もいません', '礼拝で信者を集めましょう');
      return;
    }

    const offeringBonus = gameState.researches.reduce((acc, id) =>
      acc + (researchTypes[id].bonus.offeringBonus || 0), 0);

    const baseOffering = peopleCount * (Math.floor(Math.random() * 20) + 10);
    const offering = Math.floor(baseOffering * (1 + offeringBonus));

    setGameState(prev => ({
      ...prev,
      gold: prev.gold + offering
    }));
    showNotification('💰 献金', `${offering}💰を集めました`);
  }, [gameState.buildings, gameState.researches, showNotification]);

  return {
    gameState,
    resetGame,
    buyBuilding,
    hireMissionary,
    doResearch,
    startPrayer,
    startEvent,
    collectOffering,
    getAppliedBonus
  };
};

const processMonth = (state, showNotification) => {
  // Calculate bonuses
  const maintenanceDiscount = state.researches.reduce((acc, id) =>
    acc + (researchTypes[id].bonus.maintenanceDiscount || 0), 0);
  const missionaryBonus = state.researches.reduce((acc, id) =>
    acc + (researchTypes[id].bonus.missionaryBonus || 0), 0);

  // Calculate maintenance
  let totalMaintenance = 0;
  state.buildings.forEach(building => {
    totalMaintenance += buildingTypes[building.type].maintenance;
  });
  state.missionaries.forEach(missionary => {
    totalMaintenance += missionaryTypes[missionary.type].maintenance;
  });
  totalMaintenance = Math.floor(totalMaintenance * (1 - maintenanceDiscount));

  // Calculate income
  let totalIncome = 0;
  state.buildings.forEach(building => {
    totalIncome += buildingTypes[building.type].income;
  });
  totalIncome += state.followers * 2;

  // Missionary conversions
  let newFollowers = 0;
  state.missionaries.forEach(missionary => {
    const baseRate = missionaryTypes[missionary.type].conversionRate;
    newFollowers += Math.floor(baseRate * (1 + missionaryBonus));
  });

  // Influence bonus
  if (state.influence > 500) newFollowers += 5;
  if (state.influence > 1000) newFollowers += 10;

  const netIncome = totalIncome - totalMaintenance;
  let newGold = state.gold + netIncome;
  let newHappiness = state.happiness - 3; // Reduced natural decay
  let finalFollowers = state.followers + newFollowers;

  // Bankruptcy penalty
  if (newGold < 0) {
    newHappiness -= 15;
    showNotification('⚠️ 資金不足', '維持費が払えず満足度が低下');
  }

  // Follower loss due to low happiness
  if (newHappiness < 30) {
    const lostFollowers = Math.floor(finalFollowers * 0.08);
    finalFollowers -= lostFollowers;
    if (lostFollowers > 0) {
      showNotification('😞 信者離脱', `${lostFollowers}人が去りました`);
    }
  }

  // Happiness bonus
  if (newHappiness > 80) {
    const bonusFollowers = Math.floor(Math.random() * 5) + 3;
    finalFollowers += bonusFollowers;
    showNotification('😊 口コミ効果', `${bonusFollowers}人が加入しました`);
  }

  newHappiness = Math.max(0, Math.min(100, newHappiness));

  // Game over conditions
  if (newGold < -1000 || finalFollowers <= 0 || newHappiness <= 0) {
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
    income: totalIncome,
    maintenanceCost: totalMaintenance,
    totalFollowersGained: state.totalFollowersGained + newFollowers,
    totalGoldEarned: state.totalGoldEarned + totalIncome
  };
};
