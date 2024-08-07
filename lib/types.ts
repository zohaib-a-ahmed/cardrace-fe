// Card types
export type CardSuit = 'spade' | 'heart' | 'diamond' | 'club' | 'joker';
export type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' | 'joker';

export interface Card {
  value: CardValue;
  suit: CardSuit;
}

// Marble types
export type MarbleType = 'A' | 'B' | 'C' | 'D';
export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow';

export interface Marble {
  color: PlayerColor;
  userName: string;
  type: MarbleType;
}

// Board position types
export interface BoardPosition {
  position: number;
  marble: Marble | null;
}

export interface SafeZonePosition {
  position: number;
  marble: Marble | null;
}

// Game state types
export type GameStatus = 'waiting' | 'in_progress' | 'completed';

export interface GameState {
  gameId: string;
  status: GameStatus;
  currentTurn: string;
  winner: string | null;
  players: string[];
  board: {
    mainTrack: BoardPosition[];
    homes: {
      [userName: string]: BoardPosition[];
    };
    safeZones: {
      [userName: string]: SafeZonePosition[];
    };
    startPositions: {
      [userName: string]: number;
    };
  };
}

// Hand state type
export interface HandState {
  userName: string;
  color: PlayerColor;
  hand: Card[];
  marbles: Marble[];
}

// Utility type for positions
export type Position = number;


// Moves
export type MoveSpecification = 
  | { type: 'standard' }
  | { type: 'forward' | 'backward' } // for 4
  | { type: 'split', splitValue: number } // for 7
  | { type: 'swap' } // for J
  | { type: 'start' | 'move', value: 1 | 11 } // for A
  | { type: 'joker', actingAs: CardValue, specification?: MoveSpecification };

export interface Move {
  playerId: string;
  card: Card;
  marble: Marble;
  targetMarble: Marble | null;
  specification: MoveSpecification;
}