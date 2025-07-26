import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Plus, Minus } from 'lucide-react';

const TriangleBoard = ({ paletPlacements, onPaletPlacementChange }) => {
  const zones = [
    { points: 75, position: 'top-0 left-1/2 transform -translate-x-1/2', color: 'bg-red-500 hover:bg-red-600' },
    { points: 40, position: 'top-16 left-1/2 transform -translate-x-1/2', color: 'bg-orange-500 hover:bg-orange-600' },
    { points: 30, position: 'top-32 left-1/2 transform -translate-x-1/2', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { points: 25, position: 'top-48 left-1/2 transform -translate-x-1/2', color: 'bg-green-500 hover:bg-green-600' },
    { points: 10, position: 'top-64 left-8', color: 'bg-blue-500 hover:bg-blue-600' },
    { points: 5, position: 'top-64 left-1/2 transform -translate-x-1/2', color: 'bg-purple-500 hover:bg-purple-600' },
    { points: 10, position: 'top-64 right-8', color: 'bg-blue-500 hover:bg-blue-600' },
    { points: 0, position: 'top-80 left-1/2 transform -translate-x-1/2', color: 'bg-gray-500 hover:bg-gray-600' }
  ];

  const addPalet = (points) => {
    const current = paletPlacements[points] || 0;
    onPaletPlacementChange({
      ...paletPlacements,
      [points]: current + 1
    });
  };

  const removePalet = (points) => {
    const current = paletPlacements[points] || 0;
    if (current > 0) {
      const newPlacements = { ...paletPlacements };
      if (current === 1) {
        delete newPlacements[points];
      } else {
        newPlacements[points] = current - 1;
      }
      onPaletPlacementChange(newPlacements);
    }
  };

  return (
    <div className="relative w-96 h-[500px] mx-auto">
      {/* Triangle outline */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-yellow-200 border-4 border-yellow-800 shadow-2xl"
           style={{
             clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
             filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
           }}>
      </div>

      {/* Wood grain effect */}
      <div className="absolute inset-0 opacity-30"
           style={{
             clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
             background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,69,19,0.1) 2px, rgba(139,69,19,0.1) 4px)'
           }}>
      </div>

      {/* Zones */}
      {zones.map((zone, index) => {
        const paletCount = paletPlacements[zone.points] || 0;
        const isOutside = zone.points === 0;
        
        return (
          <div
            key={index}
            className={`absolute ${zone.position} w-20 h-12 rounded-lg shadow-lg border-2 border-white/50 backdrop-blur-sm transition-all duration-200 hover:scale-105 cursor-pointer ${zone.color}`}
            onClick={() => addPalet(zone.points)}
          >
            <div className="flex flex-col items-center justify-center h-full text-white">
              <span className="text-lg font-bold">
                {isOutside ? 'DEHORS' : zone.points}
              </span>
              {paletCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-white text-black hover:bg-gray-100 min-w-[24px] h-6 flex items-center justify-center">
                  {paletCount}
                </Badge>
              )}
            </div>
          </div>
        );
      })}

      {/* Control panel */}
      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h3 className="text-sm font-medium text-center mb-3">Contrôles des palets</h3>
          <div className="grid grid-cols-4 gap-2">
            {[75, 40, 30, 25, 10, 5, 0].map((points) => {
              const count = paletPlacements[points] || 0;
              return (
                <div key={points} className="flex flex-col items-center space-y-1">
                  <span className="text-xs font-medium">{points === 0 ? 'Dehors' : points}</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePalet(points)}
                      disabled={count === 0}
                      className="w-6 h-6 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm font-medium w-4 text-center">{count}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addPalet(points)}
                      className="w-6 h-6 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriangleBoard;