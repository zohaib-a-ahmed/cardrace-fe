import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Board, BoardSection, Card, CardSuit, CardValue, Color, Marble } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function retrieveMarbles(board: Board): Marble[] {
//   const allMarbles: Marble[] = [];

//   board.spaces.forEach(marble => {
//     if (marble) allMarbles.push(marble);
//   });
//   Object.values(board.safeZones).forEach(safeZone => {
//     safeZone.forEach(marble => {
//       if (marble) allMarbles.push(marble);
//     });
//   });
//   Object.values(board.reserves).forEach(reserve => {
//     allMarbles.push(...reserve);
//   });

//   return allMarbles;
// }

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

export const getRealValue = (value: CardValue): number => {
  switch (value) {
      case CardValue.TWO: return 2;
      case CardValue.THREE: return 3;
      case CardValue.FOUR: return 0;
      case CardValue.FIVE: return 5;
      case CardValue.SIX: return 6;
      case CardValue.SEVEN: return 0;
      case CardValue.EIGHT: return 8;
      case CardValue.NINE: return 9;
      case CardValue.TEN: return 10;
      case CardValue.ACE: return 0;
      case CardValue.KING: return 13;
      case CardValue.QUEEN: return 12;
      case CardValue.JACK: return 1;
      case CardValue.JOKER: return 0;
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

export function createBoardSections(
  board: Board,
  players: string[],
  playerColorMap: Record<string, Color>
): BoardSection[] {
  const boardSections: BoardSection[] = [];

  players.forEach(player => {
      const color = playerColorMap[player];
      const startPosition = board.startPositions[color];

      // Create the spaces array for this section, handling wrapping
      let spaces: (number | null)[] = [];
      for (let i = 0; i < 16; i++) {
          const boardIndex = (startPosition - 5 + i + board.spaces.length) % board.spaces.length;
          spaces.push(board.spaces[boardIndex]);
      }

      // Create the board section
      const boardSection: BoardSection = {
          spaces,
          marbles: board.marbles,
          safeZone: board.safeZones[color],
          reserve: board.reserves[color],
          player,
          color
      };

      boardSections.push(boardSection);
  });

  return boardSections;
}

export const getColorCode = (color: Color): number => {
  switch (color) {
      case Color.RED: return 0xFF0000;
      case Color.BLUE: return 0x0000FF;
      case Color.GREEN: return 0x2F7317;
      case Color.YELLOW: return 0xFFFF00;
      case Color.PURPLE: return 0x800080;
      case Color.ORANGE: return 0xFFA500;
      default: return 0x000000;
  }
};

export function filterMarblesInPlay(
  spaces: (number | null)[],
  marbles: Record<number, Marble>
): Record<number, Marble> {
  const presentMarbleIds = new Set(spaces.filter((id): id is number => id !== null));
  
  return Object.fromEntries(
    Object.entries(marbles).filter(([id]) => presentMarbleIds.has(Number(id)))
  );
}