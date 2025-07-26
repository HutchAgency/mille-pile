import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UserPlus, Users, Play, Trash2 } from 'lucide-react';

const PlayerSetup = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);

  const addPlayer = () => {
    if (playerName.trim() && !players.includes(playerName.trim())) {
      setPlayers([...players, playerName.trim()]);
      setPlayerName('');
    }
  };

  const removePlayer = (playerToRemove) => {
    setPlayers(players.filter(player => player !== playerToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      addPlayer();
    }
  };

  const startGame = () => {
    if (players.length >= 2) {
      onStartGame(players);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Mille Pile
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Jeu de palets traditionnel - Objectif : 1000 points
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Nom du joueur
              </label>
              <div className="flex gap-2">
                <Input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Entrez le prénom du joueur"
                  className="flex-1"
                />
                <Button type="submit" size="sm" className="px-4">
                  Ajouter
                </Button>
              </div>
            </div>
          </form>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">Joueurs inscrits ({players.length})</span>
            </div>
            {players.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Ajoutez au moins 2 joueurs pour commencer
              </p>
            ) : (
              <div className="space-y-2">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <span className="font-medium">{player}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePlayer(player)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={startGame}
            disabled={players.length < 2}
            className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Commencer la partie
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerSetup;