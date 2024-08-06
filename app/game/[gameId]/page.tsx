'use client'
import React, { useState, useEffect } from 'react';
import PlayingHand from '@/components/game/playing-hand';
import { CardInfo, GameState, HandState, exampleGameState, exampleHandState, Marble } from '@/lib/utils';

export default function GameRoom() {
    const [gameState, setGameState] = useState<GameState>(exampleGameState);
    const [handState, setHandState] = useState<HandState>(exampleHandState);
    const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);
    const [selectedMarble, setSelectedMarble] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleSubmit = (marble: string, card: CardInfo) => {
        setSelectedCard(card);
        setSelectedMarble(marble);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedCard(null);
        setSelectedMarble(null);
    };

    const pushMove = (marble: string, card: CardInfo, targetMarble?: Marble, specialAction?:number) => {
        console.log('Final move submission:', 'Marble:', marble, 'Card:', card.value, 'of', card.suit, 'Special Action:', specialAction, 'Target Marble:', targetMarble?.id, 'Target Color:', targetMarble?.color);

        // server will broadcast new game state if valid move + processing
        setGameState(prevState => ({
            ...prevState,
            lastMove: { card },
        }));
        // if valid move, new handstate will be returned else error for invalid move

        setIsDrawerOpen(false);
        setSelectedCard(null);
        setSelectedMarble(null);
    };


    const currentPlayer = gameState.players.find(player => player.color === gameState.currentTurn.color);
    const isPlayerTurn = handState.color === gameState.currentTurn.color;

    useEffect(() => {
        console.log('Current game state:', gameState);
        console.log('Current hand state:', handState);
    }, [gameState, handState]);

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
                onSubmit={handleSubmit}
                turn={isPlayerTurn}
            />

        </div>
    );
}