import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Board, Card, CardSuit, CardValue, Color, Marble } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function retrieveMarbles(board: Board): Marble[] {
  const allMarbles: Marble[] = [];

  board.spaces.forEach(marble => {
    if (marble) allMarbles.push(marble);
  });
  Object.values(board.safeZones).forEach(safeZone => {
    safeZone.forEach(marble => {
      if (marble) allMarbles.push(marble);
    });
  });
  Object.values(board.reserves).forEach(reserve => {
    allMarbles.push(...reserve);
  });

  return allMarbles;
}

export const getDisplayValue = (value: CardValue): string => {
  switch (value) {
      case CardValue.TWO: return '2';
      case CardValue.THREE: return '3';
      case CardValue.FOUR: return '4';
      case CardValue.FIVE: return '5';
      case CardValue.SIX: return '6';
      case CardValue.SEVEN: return '7';
      case CardValue.EIGHT: return '8';
      case CardValue.NINE: return '9';
      case CardValue.TEN: return '10';
      case CardValue.ACE: return 'A';
      case CardValue.KING: return 'K';
      case CardValue.QUEEN: return 'Q';
      case CardValue.JACK: return 'J';
      case CardValue.JOKER: return 'J';
  }
};

export const exampleCards: Card[] = [
  { cardValue: CardValue.FOUR, cardSuit: CardSuit.HEARTS },
  { cardValue: CardValue.SEVEN, cardSuit: CardSuit.SPADES },
  { cardValue: CardValue.JACK, cardSuit: CardSuit.CLUBS },
  { cardValue: CardValue.ACE, cardSuit: CardSuit.DIAMONDS },
  { cardValue: CardValue.JOKER, cardSuit: CardSuit.JOKER },
  { cardValue: CardValue.FIVE, cardSuit: CardSuit.HEARTS }
];

export function filterMarbles(marbles: Marble[], color: Color, match: boolean): Marble[] {
  return marbles.filter(marble => {
    const isColorMatch = marble.color === color;
    return match ? isColorMatch : !isColorMatch;
  });
}
