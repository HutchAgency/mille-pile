import React, { useState } from 'react';
import TriangleBoard from './TriangleBoard';
import ScoreBoard from './ScoreBoard';
import GameHistory from './GameHistory';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { History, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

const GameBoard = ({
  players,
  currentPlayerIndex,
  gameHistory,
  showHistory,
  onShowHistory,
  onValidateTurn,
  onResetGame
}) => {
  const [paletPlacements, setPaletPlacements] = useState({});
  const [showGameInfo, setShowGameInfo] = useState(false);

  const currentPlayer = players[currentPlayerIndex];

  // Calculate current turn score and palet count
  const calculateTurnScore = () => {
    let totalScore = 0;
    let paletCount = 0;
    
    Object.entries(paletPlacements).forEach(([zone, count]) => {
      const points = parseInt(zone);
      totalScore += points * count;
      paletCount += count;
    });

    return { totalScore, paletCount };
  };

  const { totalScore, paletCount } = calculateTurnScore();
  const projectedScore = currentPlayer.score + totalScore;
  const pointsToWin = 1000 - currentPlayer.score;

  const handleValidateTurn = () => {
    onValidateTurn(paletPlacements);
    setPaletPlacements({});
  };

  const canValidate = paletCount > 0;
  const wouldExceed = projectedScore > 1000;
  const wouldWin = projectedScore === 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Mille Pile
          </h1>
          <p className="text-muted-foreground mt-2">
            Tour de <strong>{currentPlayer.name}</strong>
          </p>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => onShowHistory(!showHistory)}
            className="flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            {showHistory ? 'Masquer' : 'Afficher'} l'historique
          </Button>
          <Button
            variant="outline"
            onClick={onResetGame}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4" />
            Nouvelle partie
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Triangle Board */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Plateau de jeu
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <TriangleBoard
                  paletPlacements={paletPlacements}
                  onPaletPlacementChange={setPaletPlacements}
                />
              </CardContent>
            </Card>

            {/* Turn Info */}
            <Card className="mt-4 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Palets utilisés</p>
                    <p className="text-2xl font-bold text-blue-600">{paletCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Points ce tour</p>
                    <p className="text-2xl font-bold text-green-600">{totalScore}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Score projeté</p>
                    <p className={`text-2xl font-bold ${wouldExceed ? 'text-red-600' : wouldWin ? 'text-yellow-600' : 'text-gray-600'}`}>
                      {projectedScore}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Points restants</p>
                    <p className="text-2xl font-bold text-purple-600">{Math.max(0, pointsToWin)}</p>
                  </div>
                </div>

                {/* Status Messages */}
                {wouldWin && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-800 font-medium">Victoire ! Vous atteindrez exactement 1000 points !</span>
                  </div>
                )}
                
                {wouldExceed && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800 font-medium">Attention ! Vous dépasseriez 1000 points, votre score ne changera pas.</span>
                  </div>
                )}

                <Button
                  onClick={handleValidateTurn}
                  disabled={!canValidate}
                  className={`w-full mt-4 h-12 text-lg ${wouldWin ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'} shadow-lg`}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Valider le tour
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <ScoreBoard players={players} currentPlayerIndex={currentPlayerIndex} />
            {showHistory && (
              <GameHistory 
                history={gameHistory} 
                onClose={() => onShowHistory(false)} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;