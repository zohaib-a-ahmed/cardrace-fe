import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import PlayingCard from './playing-card';
import { Icons } from "../icons";
import { Card as CardType, Color, CardSuit} from '@/lib/types';
import { getDisplayValue } from '@/lib/utils';
import { ForfeitAlertDialog } from './forfeit-alert';

interface PlayingHandProps {
    cards: CardType[];
    playerColor: Color;
    playerName: string;
    onSelect: (card: CardType) => void;
    onForfeit:(forfeit: boolean) => void;
    turn: boolean;
}

export default function PlayingHand({
    cards,
    playerColor,
    onSelect,
    onForfeit,
    turn
}: PlayingHandProps) {
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

    const handleCardClick = (card: CardType) => setSelectedCard(card);

    const handleSubmit = () => {
        if (selectedCard) {
            onSelect(selectedCard);
            setSelectedCard(null);
        }
    };

    const handleForfeit = (choice:boolean) => {
        onForfeit(choice);
    }

    const renderSuitIcon = (suit: CardSuit) => {
        const IconComponent = {
            [CardSuit.SPADES]: Icons.spade,
            [CardSuit.HEARTS]: Icons.heart,
            [CardSuit.DIAMONDS]: Icons.diamond,
            [CardSuit.CLUBS]: Icons.club,
            [CardSuit.JOKER]: Icons.joker,
        }[suit];
        return <IconComponent className="w-4 h-4" />;
    };

    return (
        <Card className="fixed bottom-0 left-0 right-0 p-4 shadow-lg">
            <div className="w-4 h-4 rounded-full absolute top-2 right-2" style={{ backgroundColor: playerColor }}></div>
            <div className="flex flex-col space-y-4 items-center justify-center">
                <div className="flex justify-end items-center justify-center space-x-2 w-full">
                    <div className="flex items-center space-x-2 p-2 bg-secondary rounded-lg">
                        {selectedCard && (
                            <div className="flex items-center space-x-1">
                                <span className="font-bold">{getDisplayValue(selectedCard.cardValue)}</span>
                                {renderSuitIcon(selectedCard.cardSuit)}
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedCard || !turn}
                    >
                        Submit
                    </Button>
                    {/* <Button onClick={handleForfeit} variant='destructive' size='sm' disabled={!turn}>
                        Forfeit
                    </Button> */}
                    <ForfeitAlertDialog onForfeit={handleForfeit} turn={turn}></ForfeitAlertDialog>
                </div>
                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="-ml-4">
                        {cards.map((card, index) => (
                            <CarouselItem key={index} className={`pl-4 basis-1/6`}>
                                <div onClick={() => handleCardClick(card)}>
                                    <PlayingCard card={card} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </Card>
    );
}