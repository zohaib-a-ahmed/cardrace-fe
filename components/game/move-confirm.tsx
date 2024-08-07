'use client'
import React, { useState} from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { MoveConfirmationProps, Marble, CardInfo } from "@/lib/utils"
import PlayingCard from "./playing-card"
import MarbleIcon from "./marble"

export default function MoveConfirmation({
    isOpen,
    onClose,
    selectedMarble,
    selectedCard,
    onFinalSubmit,
    marbles,
    playerColor
}: MoveConfirmationProps) {
    const [targetMarble, setTargetMarble] = useState<Marble | null>(null);
    const [specialAction, setSpecialAction] = useState<number | null>(null);
    const [isSpecialCaseResolved, setIsSpecialCaseResolved] = useState(false);

    const handleConfirm = () => {
        onFinalSubmit(selectedMarble, selectedCard, targetMarble, specialAction);
        onClose();
    };

    const isSpecialCard = ['4', '7', '10', 'J', 'A', 'joker'].includes(selectedCard.value);

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
                            <PlayingCard value={selectedCard.value} suit={selectedCard.suit} />

                            {isSpecialCard && (
                                <div>
                                    fuck
                                </div>
                            )}
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleConfirm} disabled={isSpecialCard && !isSpecialCaseResolved}>
                            Confirm
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
