import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { History, X, TrendingUp, TrendingDown } from 'lucide-react';

const GameHistory = ({ history, onClose }) => {
  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Historique
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Aucun tour joué pour l'instant
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {entry.timestamp}
                    </Badge>
                    <span className="font-medium">{entry.playerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {entry.paletCount} palets
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Score:</span>
                    <span>{entry.previousScore}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium">{entry.newScore}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {entry.scoreChange > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : entry.scoreChange < 0 ? (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    ) : null}
                    <span className={`font-medium ${
                      entry.scoreChange > 0 ? 'text-green-600' : 
                      entry.scoreChange < 0 ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {entry.scoreChange > 0 ? '+' : ''}{entry.scoreChange}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameHistory;