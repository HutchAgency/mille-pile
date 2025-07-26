// Mock data for demonstration purposes
export const mockData = {
  players: [
    { name: 'Alice', score: 840, paletCount: 12 },
    { name: 'Bob', score: 950, paletCount: 15 },
    { name: 'Charlie', score: 600, paletCount: 8 }
  ],
  gameHistory: [
    {
      id: 1,
      playerName: 'Alice',
      scoreChange: 75,
      paletCount: 3,
      previousScore: 765,
      newScore: 840,
      timestamp: '14:32:15'
    },
    {
      id: 2,
      playerName: 'Bob',
      scoreChange: 50,
      paletCount: 2,
      previousScore: 900,
      newScore: 950,
      timestamp: '14:31:45'
    },
    {
      id: 3,
      playerName: 'Charlie',
      scoreChange: 0,
      paletCount: 4,
      previousScore: 600,
      newScore: 600,
      timestamp: '14:31:20'
    }
  ]
};

// Helper functions for mock data
export const generateMockPlayer = (name, score = 0) => ({
  name,
  score,
  paletCount: 0
});

export const generateMockHistoryEntry = (playerName, scoreChange, paletCount) => ({
  id: Date.now(),
  playerName,
  scoreChange,
  paletCount,
  previousScore: 0,
  newScore: scoreChange,
  timestamp: new Date().toLocaleTimeString()
});