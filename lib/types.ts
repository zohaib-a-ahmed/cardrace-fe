// types.ts

export enum CardSuit {
  HEARTS = 'HEARTS',
  DIAMONDS = 'DIAMONDS',
  CLUBS = 'CLUBS',
  SPADES = 'SPADES',
  JOKER = 'JOKER'
}

export enum CardValue {
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
  JOKER = 'JOKER'
}

export enum MarbleState {
  PROTECTED = 'PROTECTED',
  UNPROTECTED = 'UNPROTECTED'
}

export enum MarbleType {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum Color {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  PURPLE = 'PURPLE',
  ORANGE = 'ORANGE'
}

export enum GameStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
  TERMINATED = 'TERMINATED'
}

export interface Card {
  cardValue: CardValue;
  cardSuit: CardSuit;
}

export interface Marble {
  state: MarbleState;
  color: Color;
  type: MarbleType;
}

export interface Hand {
  cards: Card[];
  numCards: number;
}

export interface Board {
  spaces: (Marble | null)[];
  safeZones: Record<Color, (Marble | null)[]>;
  reserves: Record<Color, Marble[]>;
  startPositions: Record<Color, number>;
}

export interface EarlyTerminationDTO {
  deserter: string;
  status: GameStatus;
}

export interface WaitingGameStateDTO {
  status: GameStatus;
  gameName: string;
  players: string[];
}

export interface SpecificGameStateDTO {
  gameName: string;
  board: Board;
  players: string[];
  playerColorMap: Record<string, Color>;
  currentColor: Color;
  lastCard?: Card;
  status: GameStatus;
  winner?: string;
  player: string;
  playerHand: Hand;
  playerColor: Color;
}


export interface MoveDTO {
  username: string;
  card: Card;
  substitute: Card | null; 
  distances: Map<Marble, number>; 
  forfeit: boolean;
}

export function createMoveDTO(
  username: string,
  card: Card,
  substitute: Card | null,
  distances: Map<Marble, number>,
  forfeit: boolean
): MoveDTO {
  return {
    username,
    card,
    substitute,
    distances,
    forfeit
  };
}