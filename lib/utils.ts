import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GameState, Marble, Move, Card, MoveSpecification } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAllMarbles(gameState: GameState): Marble[] {
    const marbles: Marble[] = [];

    // Extract marbles from main track
    gameState.board.mainTrack.forEach(position => {
        if (position.marble) marbles.push(position.marble);
    });

    // Extract marbles from homes
    Object.values(gameState.board.homes).forEach(home => {
        home.forEach(position => {
            if (position.marble) marbles.push(position.marble);
        });
    });

    // Extract marbles from safe zones
    Object.values(gameState.board.safeZones).forEach(safeZone => {
        safeZone.forEach(position => {
            if (position.marble) marbles.push(position.marble);
        });
    });

    return marbles;
}

export function createMove(
  playerId: string,
  card: Card,
  marble: Marble,
  targetMarble: Marble | null,
  specification: MoveSpecification
): Move {
  let moveSpecification: MoveSpecification;
  console.log(specification)
  console.log(card.value)

  switch (card.value) {
    case '4':
      moveSpecification = specification || { type: 'forward' };
      break;
    case '7':
      moveSpecification = specification || { type: 'standard' };
      break;
    case '10':
        moveSpecification = specification || { type: 'standard' };
        break
    case 'J':
      if (!targetMarble) {
        throw new Error(`Target marble is required for ${card.value} card`);
      }
      moveSpecification = { type: 'swap' };
      break;
    case 'A':
      moveSpecification = specification || { type: 'move', value: 1 };
      break;
    case 'joker':
      if (!specification || specification.type !== 'joker') {
        throw new Error('Joker specification is required');
      }
      moveSpecification = specification;
      break;
    default:
      moveSpecification = { type: 'standard' };
  }

  return {
    playerId,
    card,
    marble: marble,
    targetMarble: targetMarble,
    specification: moveSpecification,
  };
}