import { GameState, BoardPosition, PlayerColor } from './types';

export const exampleGameState: GameState = {
  gameId: "game123",
  status: "in_progress",
  currentTurn: "Alice",
  winner: null,
  players: ["Alice", "Bob", "Charlie"],
  board: {
    mainTrack: Array(72).fill(null).map((_, index) => ({
      position: index,
      marble: null
    })) as BoardPosition[],
    homes: {
      Alice: [
        { position: 0, marble: null },
        { position: 1, marble: { color: "red", userName: "Alice", type: "B" } },
        { position: 2, marble: { color: "red", userName: "Alice", type: "C" } },
        { position: 3, marble: null }
      ],
      Bob: [
        { position: 0, marble: { color: "blue", userName: "Bob", type: "A" } },
        { position: 1, marble: { color: "blue", userName: "Bob", type: "B" } },
        { position: 2, marble: null },
        { position: 3, marble: null }
      ],
      Charlie: [
        { position: 0, marble: { color: "green", userName: "Charlie", type: "A" } },
        { position: 1, marble: null },
        { position: 2, marble: { color: "green", userName: "Charlie", type: "C" } },
        { position: 3, marble: { color: "green", userName: "Charlie", type: "D" } }
      ]
    },
    safeZones: {
      Alice: [
        { position: 0, marble: { color: "red", userName: "Alice", type: "A" } },
        { position: 1, marble: null },
        { position: 2, marble: null },
        { position: 3, marble: null }
      ],
      Bob: [
        { position: 0, marble: null },
        { position: 1, marble: null },
        { position: 2, marble: null },
        { position: 3, marble: null }
      ],
      Charlie: [
        { position: 0, marble: null },
        { position: 1, marble: { color: "green", userName: "Charlie", type: "B" } },
        { position: 2, marble: null },
        { position: 3, marble: null }
      ]
    },
    startPositions: {
      Alice: 0,
      Bob: 24,
      Charlie: 48
    }
  }
};

// Place some marbles on the main track
exampleGameState.board.mainTrack[5].marble = { color: "red", userName: "Alice", type: "D" };
exampleGameState.board.mainTrack[30].marble = { color: "blue", userName: "Bob", type: "C" };
exampleGameState.board.mainTrack[31].marble = { color: "blue", userName: "Bob", type: "D" };
exampleGameState.board.mainTrack[55].marble = { color: "green", userName: "Charlie", type: "A" };

import { HandState } from './types';

export const exampleHandState: HandState = {
    userName: "Alice",
    color: "red" as PlayerColor,
    hand: [
        { value: "7", suit: "heart" },
        { value: "K", suit: "spade" },
        { value: "4", suit: "diamond" },
        { value: "A", suit: "club" },
        { value: "joker", suit: "joker" },
        { value: "10", suit: "heart" },
        { value: "J", suit: "spade" },
        { value: "Q", suit: "diamond" },
        { value: "3", suit: "club" },
        { value: "joker", suit: "joker" },
    ],
    marbles: [
        { color: "red", userName: "Alice", type: "A" },
        { color: "red", userName: "Alice", type: "B" },
        { color: "red", userName: "Alice", type: "C" },
        { color: "red", userName: "Alice", type: "D" }
    ]
};
