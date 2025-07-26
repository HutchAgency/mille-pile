import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Target, Users } from 'lucide-react';

const ScoreBoard = ({ players, currentPlayerIndex, currentTurnScore = 0 }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Classement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedPlayers.map((player, index) => {
          const isCurrentPlayer = players.findIndex(p => p.name === player.name) === currentPlayerIndex;
          const isLeader = index === 0;
          const progress = (player.score / 1000) * 100;
          
          return (
            <div
              key={player.name}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                isCurrentPlayer 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={isLeader ? "default" : "secondary"}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isLeader ? 'bg-yellow-500 text-white' : ''
                    }`}
                  >
                    {index + 1}
                  </Badge>
                  <span className={`font-medium ${isCurrentPlayer ? 'text-green-700' : ''}`}>
                    {player.name}
                  </span>
                  {isCurrentPlayer && (
                    <Badge variant="outline" className="text-xs">
                      En jeu
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{player.score}</div>
                  <div className="text-xs text-muted-foreground">
                    {player.paletCount > 0 ? `${player.paletCount} palets` : ''}
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    player.score === 1000 ? 'bg-yellow-500' : 
                    progress >= 75 ? 'bg-red-500' : 
                    progress >= 50 ? 'bg-orange-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>{1000 - player.score} pts restants</span>
                <span>1000</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;