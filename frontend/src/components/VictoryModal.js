import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trophy, RotateCcw, Crown, Target } from 'lucide-react';

const VictoryModal = ({ winner, players, onRestart }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const playersAt1000 = players.filter(p => p.score === 1000);
  const hasMultipleWinners = playersAt1000.length > 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Partie terminée !
          </CardTitle>
          {hasMultipleWinners ? (
            <p className="text-muted-foreground mt-2">
              Plusieurs joueurs ont atteint 1000 points - Départage par nombre de palets
            </p>
          ) : (
            <p className="text-muted-foreground mt-2">
              Félicitations {winner.name} !
            </p>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Winner highlight */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-yellow-600" />
              <h2 className="text-2xl font-bold text-yellow-800">
                Vainqueur : {winner.name}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/70 rounded-lg p-3">
                <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Score final</p>
                <p className="text-2xl font-bold text-green-600">{winner.score}</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <p className="text-sm text-muted-foreground">Palets utilisés</p>
                <p className="text-2xl font-bold text-blue-600">{winner.paletCount}</p>
              </div>
            </div>
          </div>

          {/* Final rankings */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-center">Classement final</h3>
            {sortedPlayers.map((player, index) => {
              const isWinner = player.name === winner.name;
              const hasReached1000 = player.score === 1000;
              
              return (
                <div
                  key={player.name}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    isWinner 
                      ? 'border-yellow-500 bg-yellow-50 shadow-md' 
                      : hasReached1000
                      ? 'border-orange-300 bg-orange-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={isWinner ? "default" : "secondary"}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isWinner ? 'bg-yellow-500 text-white' : 
                          index === 0 ? 'bg-gray-400 text-white' : ''
                        }`}
                      >
                        {index + 1}
                      </Badge>
                      <span className={`font-medium ${isWinner ? 'text-yellow-700' : ''}`}>
                        {player.name}
                      </span>
                      {isWinner && (
                        <Crown className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">{player.score} pts</div>
                      <div className="text-sm text-muted-foreground">
                        {player.paletCount} palets
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Restart button */}
          <Button
            onClick={onRestart}
            className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Nouvelle partie
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VictoryModal;