import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Icons } from '../icons';
import { cn, getDisplayValue } from "@/lib/utils"
import { LucideIcon } from 'lucide-react';
import { Card as CardType, CardSuit, CardValue } from '@/lib/types';

interface PlayingCardProps {
    card: CardType;
}

export default function PlayingCard({ card }: PlayingCardProps) {
    const { cardValue, cardSuit } = card;
    const isRed = cardSuit === CardSuit.HEARTS || cardSuit === CardSuit.DIAMONDS;
    const isJoker = cardSuit === CardSuit.JOKER;

    const getSuitIcon = (): LucideIcon => {
        switch (cardSuit) {
            case CardSuit.SPADES: return Icons.spade;
            case CardSuit.HEARTS: return Icons.heart;
            case CardSuit.DIAMONDS: return Icons.diamond;
            case CardSuit.CLUBS: return Icons.club;
            case CardSuit.JOKER: return Icons.joker;
        }
    };

    const renderCardContent = () => {
        const SuitIcon = getSuitIcon();
        const displayValue = isJoker ? 'J' : getDisplayValue(cardValue);

        return (
            <>
                <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 md:top-2 md:left-2">
                    <div className="text-[8px] sm:text-xs md:text-sm font-bold">{displayValue}</div>
                    <SuitIcon className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                </div>
                <div className="flex items-center justify-center h-full">
                    {isJoker ? (
                        <div className="text-[10px] sm:text-sm md:text-base font-bold">Joker</div>
                    ) : (
                        <div className="text-lg sm:text-2xl md:text-3xl font-bold">
                            {displayValue}
                        </div>
                    )}
                </div>
                <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 md:bottom-2 md:right-2 rotate-180">
                    <div className="text-[8px] sm:text-xs md:text-sm font-bold">{displayValue}</div>
                    <SuitIcon className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                </div>
            </>
        );
    };

    return (
        <Card className={cn(
            "w-10 h-14 sm:w-24 sm:h-32 md:w-32 md:h-44 relative overflow-hidden",
            isRed ? "text-red-500" : "text-black",
            "bg-white"
        )}>
            <CardContent className="p-0 h-full">
                {renderCardContent()}
            </CardContent>
        </Card>
    )
}