'use client'
import React, { useState, useEffect } from 'react';
import { exampleGameState, exampleHandState } from '@/lib/example';
import { GameState, HandState, Marble, Card } from '@/lib/types';
import PlayingHand from '@/components/game/playing-hand';
import MoveConfirmation from '@/components/game/move-confirm';

export default function GameRoom() {
    const [gameState, setGameState] = useState<GameState>(exampleGameState);
    const [handState, setHandState] = useState<HandState>(exampleHandState);
    const [selectedMarble, setSelectedMarble] = useState<Marble | null>(null);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const currentPlayer = gameState.players.find(player => player === gameState.currentTurn);
    const isPlayerTurn = currentPlayer === handState.userName;

    const handleSubmit = (marble: Marble, card: Card) => {
        setSelectedMarble(marble);
        setSelectedCard(card);
        setIsConfirmationOpen(true);
    };

    const handleConfirmationClose = () => {
        setIsConfirmationOpen(false);
        setSelectedMarble(null);
        setSelectedCard(null);
    };

    const pushMove = (marble: Marble, card: Card, targetMarble: Marble | null, specialAction: number | null) => {
        // Implement move logic here
        console.log('Move submitted:', { marble, card, targetMarble, specialAction });
        // Update game state based on the move
        // For now, we'll just remove the card from the player's hand
        setHandState(prevState => ({
            ...prevState,
            hand: prevState.hand.filter(c => c.value !== card.value || c.suit !== card.suit)
        }));
        // In a real game, you'd send this move to the server and update the game state accordingly
    };

    return (
        <div className="p-4 pb-64">
            <div className="mb-4">
                <h2 className="text-xl font-bold">Game Status</h2>
                <p>Current Turn: {currentPlayer ? `${currentPlayer} (${gameState.board.startPositions[currentPlayer]})` : 'Unknown'}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-bold">Players</h3>
                <ul>
                    {gameState.players.map((player, index) => (
                        <li key={index} className={player === gameState.currentTurn ? 'font-bold' : ''}>
                            {player} (Starting position: {gameState.board.startPositions[player]})
                        </li>
                    ))}
                </ul>
            </div>

            <PlayingHand
                cards={handState.hand}
                playerColor={handState.color}
                marbles={handState.marbles}
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
                    marbles={handState.marbles}
                    playerColor={handState.color}
                />
            )}
        </div>
    );
}