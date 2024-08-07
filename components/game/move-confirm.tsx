'use client'
import React, { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Marble, Card as CardType, PlayerColor, MoveSpecification } from "@/lib/types"
import PlayingCard from "./playing-card"
import MarbleIcon from "./marble"
import SpecialHandler from "./special"

interface MoveConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    selectedMarble: Marble;
    selectedCard: CardType;
    onFinalSubmit: (marble: Marble, card: CardType, specification: MoveSpecification, targetMarble: Marble | null) => void;
    marbles: Marble[];
    playerColor: PlayerColor;
}

export default function MoveConfirmation({
    isOpen,
    onClose,
    selectedMarble,
    selectedCard,
    onFinalSubmit,
    marbles,
    playerColor
}: MoveConfirmationProps) {
    const [specification, setSpecification] = useState<MoveSpecification | null>(null);
    const [targetMarble, setTargetMarble] = useState<Marble | null>(null);

    const isSpecialCard = ['4', '7', '10', 'J', 'A', 'joker'].includes(selectedCard.value);

    useEffect(() => {
        // Set default specification for non-special cards
        if (!isSpecialCard) {
            setSpecification({ type: 'standard' });
            setTargetMarble(null);
        } else {
            setSpecification(null);
            setTargetMarble(null);
        }
    }, [selectedCard, isSpecialCard]);

    const handleConfirm = () => {
        if (specification) {
            onFinalSubmit(selectedMarble, selectedCard, specification, targetMarble);
            onClose();
        }
    };

    const handleSpecify = (newSpecification: MoveSpecification, newTargetMarble: Marble | null) => {
        setSpecification(newSpecification);
        setTargetMarble(newTargetMarble);
    };

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <div className="flex items-center space-x-2 justify-center px-2">
                            <DrawerTitle>Confirm Your Move For</DrawerTitle>
                            <MarbleIcon marble={selectedMarble} playerColor={playerColor} />
                        </div>
                    </DrawerHeader>
                    <div className="pb-0">
                        <div className="flex flex-col items-center space-y-4 justify-center py-4 text-center">
                            <PlayingCard card={selectedCard} />

                            {isSpecialCard && (
                                <SpecialHandler
                                    selectedMarble={selectedMarble}
                                    selectedCard={selectedCard}
                                    marbles={marbles}
                                    onSpecify={handleSpecify}
                                />
                            )}
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button 
                            onClick={handleConfirm} 
                            disabled={!specification}
                        >
                            Confirm
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}