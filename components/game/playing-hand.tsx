import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import PlayingCard from './playing-card';
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { CardInfo, PlayingHandProps } from '@/lib/utils';


export default function PlayingHand({
    cards,
    playerColor,
    onSubmit,
    turn
}: PlayingHandProps) {
    const [selectedMarble, setSelectedMarble] = useState<string>('A');
    const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);

    const handleCardClick = (card: CardInfo) => {
        setSelectedCard(card);
    };

    const handleSubmit = () => {
        if (selectedMarble && selectedCard) {
            onSubmit(selectedMarble, selectedCard);
            setSelectedCard(null)
            setSelectedMarble('A')
        }
    };

    const getMarbleIcon = (marble: string) => {
        switch (marble) {
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
            <div className="flex flex-col space-y-4 items-center justify-center ">
                <div className="flex justify-between items-center space-x-2">
                    <Tabs value={selectedMarble} onValueChange={setSelectedMarble} className="w-auto">
                        <TabsList>
                            <TabsTrigger value="A"><Icons.A className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="B"><Icons.B className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="C"><Icons.C className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="D"><Icons.D className="w-4 h-4" /></TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2 p-2 bg-secondary rounded-lg">
                            {selectedMarble && (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: playerColor }}>
                                    {getMarbleIcon(selectedMarble)}
                                </div>
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
                                    <PlayingCard cardValue={card.value} cardSuit={card.suit} />
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