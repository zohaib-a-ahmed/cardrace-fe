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
import { getDisplayValue, getRealValue } from '@/lib/utils';

interface MoveConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCard: Card;
    marbles: Record<number, Marble>;
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
        marbleIds: number[];
        distances: number[];
        substitute: Card | null;
    }>({
        marbleIds: [],
        distances: [],
        substitute: null
    });
    const [actingCard, setActingCard] = useState<Card>(selectedCard);
    const [validity, setValidity] = useState<boolean>(false);
    const playerMarbleIds = Object.keys(marbles).filter(id => marbles[parseInt(id)].color === playerColor).map(Number);
    const oppMarbleIds = Object.keys(marbles).filter(id => marbles[parseInt(id)].color !== playerColor).map(Number);

    useEffect(() => {
        setMoveDetails({ marbleIds: [], distances: [], substitute: null });
        setActingCard(selectedCard);
    }, [selectedCard]);

    useEffect(() => {
        setValidity((moveDetails.distances.length === moveDetails.marbleIds.length) && moveDetails.marbleIds.length > 0);
    }, [moveDetails])

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

    const handleMarbleSelect = (marbleId: number, index: number) => {
        const newMarbleIds = [...moveDetails.marbleIds];
        newMarbleIds[index] = marbleId;

        const value = getRealValue(actingCard.cardValue);
        if (value > 0) {
            const newDistances = [...moveDetails.distances]
            newDistances[index] = value;
            setMoveDetails({ ...moveDetails, marbleIds: newMarbleIds, distances: newDistances });
        } else {
            setMoveDetails({ ...moveDetails, marbleIds: newMarbleIds});
        }
    };

    const handleDistanceChange = (distance: number, index: number) => {
        const newDistances = [...moveDetails.distances];
        newDistances[index] = distance;
        setMoveDetails({ ...moveDetails, distances: newDistances });
    };

    const handleSubstituteSelect = (cardValue: CardValue) => {
        const substitueCard: Card = { cardValue, cardSuit: CardSuit.JOKER };
        setMoveDetails({ ...moveDetails, substitute: substitueCard });
        setActingCard(substitueCard);
    };

    const handleSubmit = () => {
        const distancesArray: [number, number][] = moveDetails.marbleIds.map((marbleId, index): [number, number] => {
            if (marbleId !== undefined && moveDetails.distances[index] !== undefined) {
                return [marbleId, moveDetails.distances[index]];
            }
            return [0, 0]; 
        })

        const moveDTO: MoveDTO = {
            username,
            card: selectedCard,
            substitute: moveDetails.substitute,
            distances: distancesArray,
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
                        <MarbleSelect marbleIds={playerMarbleIds} marbles={marbles} onSelect={(marbleId) => handleMarbleSelect(marbleId, 0)} />
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
                        <MarbleSelect marbleIds={playerMarbleIds} marbles={marbles} onSelect={(marbleId) => handleMarbleSelect(marbleId, 0)} label="Select your marble" />
                        <MarbleSelect marbleIds={oppMarbleIds} marbles={marbles} onSelect={(marbleId) => handleMarbleSelect(marbleId, 1)} label="Select opponent's marble" />
                    </>
                );
            case CardValue.FOUR:
                return (
                    <>
                        <MarbleSelect marbleIds={playerMarbleIds} marbles={marbles} onSelect={(marbleId) => handleMarbleSelect(marbleId, 0)} />
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
                        marbleIds={playerMarbleIds}
                        marbles={marbles}
                        onMarbleSelect={handleMarbleSelect}
                        onDistanceChange={handleDistanceChange}
                        moveDetails={moveDetails}
                    />
                );
            default:
                return (
                    <>
                        <MarbleSelect marbleIds={playerMarbleIds} marbles={marbles} onSelect={(marbleId) => handleMarbleSelect(marbleId, 0)} />
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
                        <Button onClick={handleSubmit} disabled={!validity}>Confirm Move</Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

interface MarbleSelectProps {
    marbleIds: number[];
    marbles: Record<number, Marble>;
    onSelect: (marbleId: number) => void;
    label?: string;
}

function MarbleSelect({ marbleIds, marbles, onSelect, label = "Select marble" }: MarbleSelectProps) {
    return (
        <Select onValueChange={(value) => onSelect(parseInt(value))}>
            <SelectTrigger>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                {marbleIds.map((id) => (
                    <SelectItem key={id} value={id.toString()}>
                        <MarbleIcon marble={marbles[id]} />
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

interface SevenHandlerProps {
    marbleIds: number[];
    marbles: Record<number, Marble>;
    onMarbleSelect: (marbleId: number, index: number) => void;
    onDistanceChange: (distance: number, index: number) => void;
    moveDetails: { marbleIds: number[]; distances: number[] };
}

function SevenHandler({ marbleIds, marbles, onMarbleSelect, onDistanceChange, moveDetails }: SevenHandlerProps) {
    const [rows, setRows] = useState(1);
    const [totalDistance, setTotalDistance] = useState(0);

    useEffect(() => {
        setTotalDistance(moveDetails.distances.reduce((sum, distance) => sum + (distance || 0), 0));
    }, [moveDetails])

    const addRow = () => {
        setRows(prev => Math.min(prev + 1, 4));
    }
    const removeRow = () => {
        setRows(prev => Math.max(prev - 1, 1));
    }

    const distances = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="space-y-2">
            {[...Array(rows)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <MarbleSelect
                        marbleIds={marbleIds}
                        marbles={marbles}
                        onSelect={(marbleId) => onMarbleSelect(marbleId, index)}
                    />
                    <Select
                        value={moveDetails.distances[index]?.toString() || ''}
                        onValueChange={(value) => onDistanceChange(parseInt(value), index)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Distance" />
                        </SelectTrigger>
                        <SelectContent>
                            {distances.map((distance) => (
                                <SelectItem key={distance} value={distance.toString()}>
                                    {distance}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ))}
            <div className="flex justify-between items-center">
                <Button onClick={addRow} disabled={rows >= 4}>Add Split</Button>
                <Button onClick={removeRow} disabled={rows <= 1}>Remove Split</Button>
                <div>Total: {totalDistance}/7</div>
            </div>
        </div>
    );
}
