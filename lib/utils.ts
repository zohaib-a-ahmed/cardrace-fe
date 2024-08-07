import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CardInfo {
  value: string;
  suit: 'spade' | 'heart' | 'diamond' | 'club' | 'joker';
}


export interface MarbleProps {
  marble: Marble,
  playerColor: string,
}

// Hand State
export interface HandState {
  cards: CardInfo[];
  color: string;
}

export interface Marble {
  position: number;
  color: string;
  id: string;
}
