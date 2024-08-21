'use client'
import React, { useState } from 'react';
import { MoveDTO, SpecificGameStateDTO, Marble, Card as CardType } from "@/lib/types";
import PlayingHand from "./playing-hand";
import MoveConfirmation from './move-confirm';
import { retrieveMarbles } from '@/lib/utils';
import { exampleCards } from '@/lib/utils';

interface GameDisplayProps {
    gameState: SpecificGameStateDTO;
    onSubmit: (move: MoveDTO) => void;
}

export default function GameDisplay({
    gameState,
    onSubmit
}: GameDisplayProps) {
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const turn: boolean = gameState.playerColor === gameState.currentColor;
    const allMarbles = retrieveMarbles(gameState.board);

    const selectCards = (card: CardType) => {
        console.log("cards selected")
        setSelectedCard(card);
        setIsConfirmationOpen(true);
    }

    const handleForfeit = (forfeit: boolean) => {
        // create new move for forfeit and onSubmit it
    }

    const handleConfirmMove = (move: MoveDTO) => {
        onSubmit(move);
        setSelectedCard(null);
        setIsConfirmationOpen(false);
    };

    const handleClose = () => {
        setSelectedCard(null);
        setIsConfirmationOpen(false);
    }

    return (
        <div className="h-screen flex flex-col">
            <section className="flex-grow p-4 overflow-auto pb-64">
                <div className="bg-secondary p-4 rounded-lg max-w-full overflow-auto">
                    <h1 className="text-2xl font-bold">{gameState.gameName}</h1>
                    <pre>{JSON.stringify(gameState.board, null, 2)}</pre>
                    <pre>{JSON.stringify(gameState.players, null, 2)}</pre>
                    <pre>{JSON.stringify(gameState.currentColor, null, 2)}</pre>
                    <pre>{JSON.stringify(gameState.status, null, 2)}</pre>
                </div>
            </section>
            <section className="mt-auto">
                <PlayingHand
                    cards={exampleCards}
                    playerColor={gameState.playerColor}
                    playerName={gameState.player}
                    onSelect={selectCards}
                    onForfeit={handleForfeit}
                    turn={turn}
                />
                {selectedCard && (
                    <MoveConfirmation
                        isOpen={isConfirmationOpen}
                        onClose={handleClose}
                        selectedCard={selectedCard}
                        marbles={allMarbles}
                        onFinalSubmit={handleConfirmMove}
                        playerColor={gameState.playerColor}
                        username={gameState.player}
                    />
                )}
            </section>
        </div>
    )
}