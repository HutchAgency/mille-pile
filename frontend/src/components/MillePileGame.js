import React, { useState, useEffect } from 'react';
import PlayerSetup from './PlayerSetup';
import GameBoard from './GameBoard';
import VictoryModal from './VictoryModal';
import { mockData } from '../data/mockData';

const MillePileGame = () => {
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'finished'
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Initialize with mock data for demonstration
  useEffect(() => {
    if (mockData.players.length > 0) {
      setPlayers(mockData.players);
      setGameHistory(mockData.gameHistory);
    }
  }, []);

  const startGame = (playerList) => {
    setPlayers(playerList.map(name => ({ name, score: 0, paletCount: 0 })));
    setGameState('playing');
    setCurrentPlayerIndex(0);
    setGameHistory([]);
  };

  const addToHistory = (playerName, scoreChange, paletCount, newScore) => {
    const historyEntry = {
      id: Date.now(),
      playerName,
      scoreChange,
      paletCount,
      previousScore: newScore - scoreChange,
      newScore,
      timestamp: new Date().toLocaleTimeString()
    };
    setGameHistory(prev => [historyEntry, ...prev]);
  };

  const validateTurn = (paletPlacements) => {
    const currentPlayer = players[currentPlayerIndex];
    
    // Calculate total score and palet count
    let totalScore = 0;
    let paletCount = 0;
    
    Object.entries(paletPlacements).forEach(([zone, count]) => {
      const points = parseInt(zone);
      totalScore += points * count;
      paletCount += count;
    });

    // Check if score would exceed 1000
    let newScore = currentPlayer.score;
    if (currentPlayer.score + totalScore <= 1000) {
      newScore = currentPlayer.score + totalScore;
    }

    // Update player
    const updatedPlayers = players.map((player, index) => {
      if (index === currentPlayerIndex) {
        return { ...player, score: newScore, paletCount };
      }
      return player;
    });

    setPlayers(updatedPlayers);
    addToHistory(currentPlayer.name, newScore - currentPlayer.score, paletCount, newScore);

    // Check for victory condition
    const playersAt1000 = updatedPlayers.filter(p => p.score === 1000);
    if (playersAt1000.length > 0) {
      // Check if all players have played this round
      const isLastPlayer = currentPlayerIndex === players.length - 1;
      if (isLastPlayer) {
        // Determine winner by fewest palets used
        const winner = playersAt1000.reduce((prev, current) => 
          prev.paletCount < current.paletCount ? prev : current
        );
        setWinner(winner);
        setGameState('finished');
        return;
      }
    }

    // Move to next player
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setGameHistory([]);
    setWinner(null);
    setShowHistory(false);
  };

  if (gameState === 'setup') {
    return <PlayerSetup onStartGame={startGame} />;
  }

  if (gameState === 'finished') {
    return (
      <VictoryModal
        winner={winner}
        players={players}
        onRestart={resetGame}
      />
    );
  }

  return (
    <GameBoard
      players={players}
      currentPlayerIndex={currentPlayerIndex}
      gameHistory={gameHistory}
      showHistory={showHistory}
      onShowHistory={setShowHistory}
      onValidateTurn={validateTurn}
      onResetGame={resetGame}
    />
  );
};

export default MillePileGame;