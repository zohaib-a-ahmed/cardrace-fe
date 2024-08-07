import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CardInfo {
  value: string;
  suit: 'spade' | 'heart' | 'diamond' | 'club' | 'joker';
}


export interface PlayingHandProps {
  cards: CardInfo[];
  marbles: Marble[];
  playerColor: string;
  onSubmit: (marble: Marble, card: CardInfo) => void;
  turn: boolean;
}

export interface MoveConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMarble: Marble;
  selectedCard: CardInfo;
  onFinalSubmit: (marble: Marble, card: CardInfo, targetMarble: Marble | null, specialAction: number | null) => void;
  marbles: Marble[];
  playerColor: string;
}

export interface MarbleProps {
  marble: Marble,
  playerColor: string,
}

export interface SpecialContentProps {
  selectedCard: CardInfo;
  selectedMarble: string;
  playerColor: string;
  marbles: Marble[];
  onSpecialActionChange: (action: number) => void;
  onTargetMarbleChange: (marble: string, color: string) => void;
}

// Hand State
export interface HandState {
  cards: CardInfo[];
  color: string;
}

// Example hand state
export const exampleHandState: HandState = {
  cards: [
    { value: 'A', suit: 'spade' },
    { value: 'K', suit: 'heart' },
    { value: 'Q', suit: 'diamond' },
    { value: 'J', suit: 'club' },
    { value: '10', suit: 'spade' },
    { value: '9', suit: 'heart' },
    { value: '8', suit: 'diamond' },
    { value: '7', suit: 'club' },
    { value: '6', suit: 'spade' },
    { value: '5', suit: 'heart' },
    { value: '4', suit: 'diamond' },
    { value: 'joker', suit: 'joker' },
  ],
  color: 'green'
};

// Function to create a new hand state
export function createHandState(cards: CardInfo[], color: string): HandState {
  return { cards, color };
}

// Game State
export interface Player {
  username: string;
}

export interface Marble {
  position: number;
  color: string;
  id: string;
}

export interface LastMove {
  card: CardInfo;
}
// ... (previous imports and utility functions remain the same)

export interface Player {
  username: string;
  color: string;
}

export interface GameState {
  numPositions: number;
  currentTurn: {
    color: string;
  };
  players: Player[];
  marbles: Marble[];
  lastMove: LastMove | null;
}

export const exampleGameState: GameState = {
  numPositions: 64,
  currentTurn: {
    color: 'green'
  },
  players: [
    { username: 'player1', color: 'blue' },
    { username: 'player2', color: 'red' },
    { username: 'player3', color: 'green' },
  ],
  marbles: [
    // Blue marbles
    { position: 0, color: 'blue', id: 'A' },
    { position: 4, color: 'blue', id: 'B' },
    { position: 24, color: 'blue', id: 'C' },
    { position: -1, color: 'blue', id: 'D' },
    // Red marbles
    { position: 16, color: 'red', id: 'A' },
    { position: -1, color: 'red', id: 'B' },
    { position: -1, color: 'red', id: 'C' },
    { position: 128, color: 'red', id: 'D' },
    // Green marbles
    { position: 128, color: 'green', id: 'A' },
    { position: -1, color: 'green', id: 'B' },
    { position: 36, color: 'green', id: 'C' },
    { position: 44, color: 'green', id: 'D' },
  ],
  lastMove: {
    card: { value: '7', suit: 'heart' } as CardInfo
  }
};

// Function to create a new game state
export function createGameState(
  numPositions: number,
  currentTurnColor: string,
  players: Player[],
  marbles: Marble[],
  lastMove: LastMove | null
): GameState {
  return {
    numPositions,
    currentTurn: { color: currentTurnColor },
    players,
    marbles,
    lastMove
  };
}
