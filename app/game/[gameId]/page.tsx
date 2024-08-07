'use client'
import React, { useState, useEffect } from 'react';
import PlayingHand from '@/components/game/playing-hand';
import MoveConfirmation from '@/components/game/move-confirm';
import { CardInfo, GameState, HandState, exampleGameState, exampleHandState, Marble } from '@/lib/utils';

export default function GameRoom() {
    const [gameState, setGameState] = useState<GameState>(exampleGameState);
    const [handState, setHandState] = useState<HandState>(exampleHandState);
    const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);
    const [selectedMarble, setSelectedMarble] = useState<Marble | null>(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const handleSubmit = (marble: Marble, card: CardInfo) => {
        setSelectedCard(card);
        setSelectedMarble(marble);
        setIsConfirmationOpen(true);
    };

    const handleConfirmationClose = () => {
        setIsConfirmationOpen(false);
        setSelectedCard(null);
        setSelectedMarble(null);
    };

    const pushMove = (marble: Marble, card: CardInfo, targetMarble: Marble | null, specialAction: number | null) => {
        console.log('Final move submission:', 'Marble:', marble.position, 'Card:', card.value, 'of', card.suit, 'Special Action:', specialAction, 'Target Marble:', targetMarble?.position, 'Target Color:', targetMarble?.color);

        // send for move validation
        // if valid move, server will broadcast new game state after processing
        setGameState(prevState => ({
            ...prevState,
            lastMove: { card },
        }));
        // if valid move, new handstate will be returned else error for invalid move
        handleConfirmationClose();
    };

    const currentPlayer = gameState.players.find(player => player.color === gameState.currentTurn.color);
    const isPlayerTurn = handState.color === gameState.currentTurn.color;

    return (
        <div className="p-4 pb-64">
            <div className="mb-4">
                <h2 className="text-xl font-bold">Game Status</h2>
                <p>Current Turn: {currentPlayer ? `${currentPlayer.username} (${currentPlayer.color})` : 'Unknown'}</p>
                <p>Last Move: {gameState.lastMove ? `${gameState.lastMove.card.value} of ${gameState.lastMove.card.suit}` : 'None'}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-bold">Players</h3>
                <ul>
                    {gameState.players.map((player, index) => (
                        <li key={index} className={player.color === gameState.currentTurn.color ? 'font-bold' : ''}>
                            {player.username} ({player.color})
                        </li>
                    ))}
                </ul>
            </div>

            <PlayingHand
                cards={handState.cards}
                playerColor={handState.color}
                marbles={gameState.marbles}
                onSubmit={handleSubmit}
                turn={isPlayerTurn}
            />

            {selectedMarble && selectedCard && (
                <MoveConfirmation
                    isOpen={isConfirmationOpen}
                    onClose={handleConfirmationClose}
                    selectedMarble={selectedMarble}
                    selectedCard={selectedCard}
                    onFinalSubmit={pushMove}
                    marbles={gameState.marbles}
                    playerColor={handState.color}
                />
            )}
        </div>
    );
}