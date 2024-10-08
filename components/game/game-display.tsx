'use client'
import React, { useEffect, useState } from 'react';
import { MoveDTO, SpecificGameStateDTO, Marble, Card as CardType, CardValue } from "@/lib/types";
import { filterMarblesInPlay, filterMarblesPlayable } from '@/lib/utils';
import PlayingHand from "./playing-hand";
import MoveConfirmation from './move-confirm';
import GameBoard from './game-board';

interface GameDisplayProps {
    gameState: SpecificGameStateDTO;
    onSubmit: (move: MoveDTO) => void;
}

export default function GameDisplay({
    gameState,
    onSubmit
}: GameDisplayProps) {
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
    const [marbles, setMarbles] = useState<Record<number, Marble>>(gameState.board.marbles)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const turn: boolean = gameState.playerColor === gameState.currentColor;
    const marblesInPlay = filterMarblesInPlay(gameState.board.spaces, gameState.board.marbles);
    const marblesPlayable = filterMarblesPlayable(gameState.board.spaces, gameState.board.marbles, gameState.board.reserves[gameState.playerColor])

    useEffect(() => {
        if (gameState.playerColor === gameState.currentColor && gameState.playerHand.cards.length === 0) { handleForfeit(true); }
    }, [gameState])

    const selectCards = (card: CardType) => {
        setSelectedCard(card);
        setMarbles(
          [CardValue.ACE, CardValue.KING, CardValue.JOKER].includes(card.cardValue)
            ? marblesPlayable
            : marblesInPlay
        );
        setIsConfirmationOpen(true);
      };

    const handleForfeit = (choice: boolean) => {
        const username = gameState.player;
        if (choice) {
            const moveDTO: MoveDTO = {
                username, 
                card: null,
                substitute: null,
                distances: new Array,
                forfeit: true
            };    
            onSubmit(moveDTO);        
        }
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
            <section className="flex-grow overflow-auto overflow-x">
                    {/* {JSON.stringify(gameState)} */}
                    <GameBoard
                    player={gameState.player}
                    board={gameState.board}
                    gameName={gameState.gameName}
                    players={gameState.players}
                    playerColorMap={gameState.playerColorMap}
                    currentColor={gameState.currentColor}
                    lastCard={gameState.lastCard}
                    />
            </section>
            <section className="mt-auto">
                <PlayingHand
                    cards={gameState.playerHand.cards}
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
                        marbles={marbles}
                        onFinalSubmit={handleConfirmMove}
                        playerColor={gameState.playerColor}
                        username={gameState.player}
                    />
                )}
            </section>
        </div>
    )
}