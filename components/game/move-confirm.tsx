'use client'
import React, { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
} from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { Marble, Card, MoveDTO, Color, CardSuit, CardValue } from "@/lib/types"
import { filterMarbles } from '@/lib/utils';
import MarbleIcon from "./marble"
import { Icons } from '@/components/icons';
import { getDisplayValue } from '@/lib/utils';

interface MoveConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCard: Card;
    marbles: Marble[];
    onFinalSubmit: (move: MoveDTO) => void;
    playerColor: Color;
    username: string;
}

export default function MoveConfirmation({
    isOpen,
    onClose,
    selectedCard,
    marbles,
    onFinalSubmit,
    playerColor,
    username
}: MoveConfirmationProps) {
    const [moveDetails, setMoveDetails] = useState<{
        marbles: Marble[];
        distances: number[];
        substitute: Card | null;
    }>({
        marbles: [],
        distances: [],
        substitute: null
    });
    const [actingCard, setActingCard] = useState<Card>(selectedCard);
    const playerMarbles = filterMarbles(marbles, playerColor, true);
    const oppMarbles = filterMarbles(marbles, playerColor, false)

    useEffect(() => {
        setMoveDetails({ marbles: [], distances: [], substitute: null });
        setActingCard(selectedCard);
    }, [selectedCard]);

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

    const handleMarbleSelect = (marble: Marble, index: number) => {
        const newMarbles = [...moveDetails.marbles];
        newMarbles[index] = marble;
        setMoveDetails({ ...moveDetails, marbles: newMarbles });
    };

    const handleDistanceChange = (distance: number, index: number) => {
        const newDistances = [...moveDetails.distances];
        newDistances[index] = distance;
        setMoveDetails({ ...moveDetails, distances: newDistances });
    };

    const handleSubstituteSelect = (cardValue: CardValue) => {
        const substitueCard: Card = { cardValue, cardSuit: CardSuit.HEARTS };
        setMoveDetails({ ...moveDetails, substitute: substitueCard });
        setActingCard(substitueCard);
    };

    const handleSubmit = () => {
        const distancesMap = new Map<Marble, number>();
        moveDetails.marbles.forEach((marble, index) => {
            if (marble && moveDetails.distances[index] !== undefined) {
                distancesMap.set(marble, moveDetails.distances[index]);
            }
        });

        const moveDTO: MoveDTO = {
            username,
            card: selectedCard,
            substitute: moveDetails.substitute,
            distances: distancesMap,
            forfeit: false
        };

        onFinalSubmit(moveDTO);
        onClose();
    };

    const renderMoveOptions = () => {
        if (selectedCard.cardValue === CardValue.JOKER && !moveDetails.substitute) {
            return (
                <Select onValueChange={(value) => handleSubstituteSelect(value as CardValue)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select card to substitute" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(CardValue)
                            .filter(value => value !== CardValue.JOKER)
                            .map((value) => (
                                <SelectItem key={value} value={value}>{getDisplayValue(value)}</SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            );
        }

        switch (actingCard.cardValue) {
            case CardValue.ACE:
                return (
                    <>
                        <MarbleSelect marbles={playerMarbles} onSelect={(marble) => handleMarbleSelect(marble, 0)} />
                        <Select onValueChange={(value) => handleDistanceChange(parseInt(value), 0)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select distance" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="11">11</SelectItem>
                            </SelectContent>
                        </Select>
                    </>
                );
            case CardValue.JACK:
                return (
                    <>
                        <MarbleSelect marbles={playerMarbles} onSelect={(marble) => handleMarbleSelect(marble, 0)} label="Select your marble" />
                        <MarbleSelect marbles={oppMarbles} onSelect={(marble) => handleMarbleSelect(marble, 1)} label="Select opponent's marble" />
                    </>
                );
            case CardValue.FOUR:
                return (
                    <>
                        <MarbleSelect marbles={playerMarbles} onSelect={(marble) => handleMarbleSelect(marble, 0)} />
                        <Select onValueChange={(value) => handleDistanceChange(parseInt(value), 0)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select distance" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="-4">-4</SelectItem>
                            </SelectContent>
                        </Select>
                    </>
                );
            case CardValue.SEVEN:
                return (
                    <SevenHandler
                        marbles={playerMarbles}
                        onMarbleSelect={handleMarbleSelect}
                        onDistanceChange={handleDistanceChange}
                        moveDetails={moveDetails}
                    />
                );
            default:
                return (
                    <>
                        <MarbleSelect marbles={playerMarbles} onSelect={(marble) => handleMarbleSelect(marble, 0)} />
                    </>
                );
        }
    };

    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="flex items-center justify-center space-x-2">
                            <span>Confirm Move:</span>
                            <span className="font-bold">{getDisplayValue(actingCard.cardValue)}</span>
                            {renderSuitIcon(actingCard.cardSuit)}
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 space-y-4">
                        {renderMoveOptions()}
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Confirm Move</Button>
                        {/* <Button variant="outline" onClick={onClose}>Cancel</Button> */}
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

interface MarbleSelectProps {
    marbles: Marble[];
    onSelect: (marble: Marble) => void;
    label?: string;
}

function MarbleSelect({ marbles, onSelect, label = "Select marble" }: MarbleSelectProps) {
    return (
        <Select onValueChange={(value) => onSelect(JSON.parse(value))}>
            <SelectTrigger>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                {marbles.map((marble) => (
                    <SelectItem key={`${marble.type}-${marble.color}`} value={JSON.stringify(marble)}>
                        <MarbleIcon marble={marble} />
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

interface SevenHandlerProps {
    marbles: Marble[];
    onMarbleSelect: (marble: Marble, index: number) => void;
    onDistanceChange: (distance: number, index: number) => void;
    moveDetails: { marbles: Marble[]; distances: number[] };
}

function SevenHandler({ marbles, onMarbleSelect, onDistanceChange, moveDetails }: SevenHandlerProps) {
    const [rows, setRows] = useState(1);

    const addRow = () => setRows(prev => Math.min(prev + 1, 4));
    const removeRow = () => setRows(prev => Math.max(prev - 1, 1));

    const totalDistance = moveDetails.distances.reduce((sum, distance) => sum + (distance || 0), 0);

    return (
        <div className="space-y-2">
            {[...Array(rows)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <MarbleSelect
                        marbles={marbles}
                        onSelect={(marble) => onMarbleSelect(marble, index)}
                    />
                    <Input
                        type="number"
                        min={1}
                        max={7 - totalDistance + (moveDetails.distances[index] || 0)}
                        value={moveDetails.distances[index] || ''}
                        onChange={(e) => onDistanceChange(parseInt(e.target.value) || 0, index)}
                    />
                </div>
            ))}
            <div className="flex justify-between items-center">
                <Button onClick={addRow} disabled={rows >= 7 || totalDistance >= 7}>Add Split</Button>
                <Button onClick={removeRow} disabled={rows <= 1}>Remove Split</Button>
                <div>Total: {totalDistance}/7</div>
            </div>
        </div>
    );
}