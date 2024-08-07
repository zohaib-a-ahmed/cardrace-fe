'use client'
import React, { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { MoveConfirmationProps, Marble } from "@/lib/utils"
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
    const handleConfirm = () => {
        onFinalSubmit(selectedMarble, selectedCard, targetMarble, specialAction);
        onClose();
    };

    const [targetMarble, setTargetMarble] = useState<Marble | null>(null);
    const [specialAction, setSpecialAction] = useState<number | null>(null);

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <div className='flex flex-col justify-center items-center'>
                        <DrawerTitle>Confirm Your Move</DrawerTitle>
                    </div>
                </DrawerHeader>
                <div className="p-4 flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-4">
                        <MarbleIcon marble={selectedMarble} playerColor={playerColor} />
                        <PlayingCard value={selectedCard.value} suit={selectedCard.suit} />
                        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                            <span className="text-sm">Special Effect Placeholder</span>
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    <Button onClick={handleConfirm} className="w-full">Confirm Move</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}