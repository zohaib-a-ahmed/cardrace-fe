import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import PlayingCard from './playing-card';
import { Icons } from "../icons";
import { CardInfo, PlayingHandProps, Marble } from '@/lib/utils';
import MarbleIcon from './marble';

export default function PlayingHand({
    cards,
    playerColor,
    onSubmit,
    marbles,
    turn
}: PlayingHandProps) {

    const playerMarbles = useMemo(() => 
        marbles.filter(marble => marble.color === playerColor),
    [marbles, playerColor]);

    const [selectedMarble, setSelectedMarble] = useState<Marble | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);

    const handleMarbleSelect = (marble: Marble) => {
        setSelectedMarble(marble);
    };

    const handleCardClick = (card: CardInfo) => {
        setSelectedCard(card);
    };

    const handleSubmit = () => {
        if (selectedMarble && selectedCard) {
            onSubmit(selectedMarble, selectedCard);
            setSelectedCard(null);
            setSelectedMarble(null);
        }
    };

    const getMarbleIcon = (id: string) => {
        switch (id) {
            case 'A': return <Icons.A className="w-4 h-4" />;
            case 'B': return <Icons.B className="w-4 h-4" />;
            case 'C': return <Icons.C className="w-4 h-4" />;
            case 'D': return <Icons.D className="w-4 h-4" />;
            default: return null;
        }
    };

    const getSuitIcon = (suit: string) => {
        switch (suit) {
            case 'spade': return <Icons.spade className="w-4 h-4" />;
            case 'heart': return <Icons.heart className="w-4 h-4" />;
            case 'diamond': return <Icons.diamond className="w-4 h-4" />;
            case 'club': return <Icons.club className="w-4 h-4" />;
            case 'joker': return <Icons.joker className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <Card className="fixed bottom-0 left-0 right-0 p-4 shadow-lg">
            <div className="w-4 h-4 rounded-full absolute top-2 right-2" style={{ backgroundColor: playerColor }}></div>
            <div className="flex flex-col space-y-4 items-center justify-center">
                <div className="flex justify-between items-center space-x-2">
                    <Tabs value={selectedMarble?.id ?? ''} onValueChange={(value) => handleMarbleSelect(playerMarbles.find(m => m.id === value) ?? playerMarbles[0])} className="w-auto">
                        <TabsList>
                            {playerMarbles.map((marble) => (
                                <TabsTrigger key={marble.id} value={marble.id}>
                                    {getMarbleIcon(marble.id)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2 p-2 bg-secondary rounded-lg">
                            {selectedMarble && (
                                <MarbleIcon marble={selectedMarble} playerColor={playerColor}/>
                            )}
                            {selectedCard && (
                                <div className="flex items-center space-x-1">
                                    <span className="font-bold">{selectedCard.value}</span>
                                    {getSuitIcon(selectedCard.suit)}
                                </div>
                            )}
                        </div>
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedCard || !selectedMarble || !turn}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="-ml-4">
                        {cards.map((card, index) => (
                            <CarouselItem key={index} className="pl-4 basis-1/8">
                                <div onClick={() => handleCardClick(card)}>
                                    <PlayingCard value={card.value} suit={card.suit} />
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