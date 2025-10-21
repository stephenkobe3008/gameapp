import React, { useState, useCallback } from 'react';
import { TitleScreen, GameOverScreen, BuildingScreen, MainGameScreen, StatsScreen } from './components/screens';
import { Modal, Notification } from './components/ui';
import { useGameState } from './hooks/useGameState';

export default function ReligionGame() {
  const [screen, setScreen] = useState('title');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [notification, setNotification] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const showNotification = useCallback((title, message) => {
    setNotification({ title, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const {
    gameState,
    resetGame,
    buyBuilding,
    hireMissionary,
    doResearch,
    startPrayer,
    startEvent,
    collectOffering
  } = useGameState(screen, showNotification);

  const startNewGame = () => {
    resetGame();
    setScreen('game');
  };

  const handleBuyBuilding = (type) => {
    if (buyBuilding(type)) {
      setModalType(null);
    }
  };

  const handleHireMissionary = (type) => {
    if (hireMissionary(type)) {
      setModalType(null);
    }
  };

  const handleDoResearch = (type) => {
    if (doResearch(type)) {
      setModalType(null);
    }
  };

  const handleStartPrayer = () => {
    startPrayer(selectedBuilding);
  };

  const handleCollectOffering = () => {
    collectOffering(selectedBuilding);
  };

  const handleBuildingClick = (index) => {
    setSelectedBuilding(index);
    setScreen('building');
  };

  const handleExitBuilding = () => {
    setScreen('game');
    setSelectedBuilding(null);
  };

  if (screen === 'title') {
    return <TitleScreen onStart={startNewGame} />;
  }

  if (gameState.isGameOver) {
    return <GameOverScreen gameState={gameState} onBackToTitle={() => setScreen('title')} />;
  }

  if (screen === 'building' && selectedBuilding !== null) {
    const building = gameState.buildings[selectedBuilding];
    return (
      <BuildingScreen
        building={building}
        onExit={handleExitBuilding}
        onPrayer={handleStartPrayer}
        onEvent={startEvent}
        onCollectOffering={handleCollectOffering}
      />
    );
  }

  return (
    <>
      <MainGameScreen
        gameState={gameState}
        onBuildingClick={handleBuildingClick}
        onOpenBuildModal={() => setModalType('build')}
        onOpenMissionaryModal={() => setModalType('missionary')}
        onOpenResearchModal={() => setModalType('research')}
        onOpenStats={() => setShowStats(true)}
        onBackToTitle={() => setScreen('title')}
      />
      <Modal
        type={modalType}
        gameState={gameState}
        onClose={() => setModalType(null)}
        onBuy={handleBuyBuilding}
        onHire={handleHireMissionary}
        onResearch={handleDoResearch}
      />
      {showStats && <StatsScreen gameState={gameState} onClose={() => setShowStats(false)} />}
      <Notification notification={notification} />
    </>
  );
}
