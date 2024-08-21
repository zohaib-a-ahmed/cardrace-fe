'use client'
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { EarlyTerminationDTO, WaitingGameStateDTO, SpecificGameStateDTO, GameStatus, MoveDTO } from '@/lib/types';
import { Lobby, DisconnectAlert} from '@/components/game/lobby';
import GameDisplay from '@/components/game/game-display';
import { error } from 'console';

type GameState = EarlyTerminationDTO | WaitingGameStateDTO | SpecificGameStateDTO;

function isEarlyTerminationState(state: GameState): state is EarlyTerminationDTO {
    return state.status === GameStatus.TERMINATED;
}

function isWaitingGameState(state: GameState): state is WaitingGameStateDTO {
    return state.status === GameStatus.WAITING;
}

function isSpecificGameState(state: GameState): state is SpecificGameStateDTO {
    return state.status === GameStatus.IN_PROGRESS;
}

export default function GamePage({ params }: { params: { gameId: string } }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [gameState, setGameState] = useState<GameState | null>(null);
    const router = useRouter();
    const socketRef = useRef<Socket | null>(null);
    const hasConnected = useRef(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/auth');
            return;
        }

        if (hasConnected.current) return;

        const newSocket = io('http://localhost:9092', {
            autoConnect: false,
            transports: ['websocket'],
            query: { token, gameId: params.gameId }
        });

        const setupSocketListeners = (socket: Socket) => {
            socket.on('connect', () => {
                setConnectionStatus('Connected');
                hasConnected.current = true;
            });

            socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
                setConnectionStatus('Connection Error');
                router.push('/auth');
            });

            socket.on('disconnect', () => {
                setConnectionStatus('Disconnected');
                hasConnected.current = false;
            });

            socket.on('gameState', (newGameState: GameState) => {
                console.log('Received game state:', newGameState);
                setGameState(newGameState);
            });

            socket.on('moveResult', (error) => {
                console.log("Illegal move:", error);
                // notiify user of illegal move
            })
        };

        setupSocketListeners(newSocket);
        newSocket.connect();

        setSocket(newSocket);
        socketRef.current = newSocket;

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                hasConnected.current = false;
            }
        };
    }, [params.gameId, router]);

    const handleMoveSubmit = (move : MoveDTO) => {
        console.log("submitting move:");
        console.log(move);
    }

    const renderGameState = () => {
        if (!gameState) return null;

        if (isSpecificGameState(gameState)) {
            return (
                <section>
                    <GameDisplay gameState={gameState} onSubmit={handleMoveSubmit}/>
                </section>
            );
        }

        if (isEarlyTerminationState(gameState)) {
            return (
                <section>
                    <DisconnectAlert deserter={gameState.deserter}/>
                </section>
            );
        }

        if (isWaitingGameState(gameState)) {
            return (
                <section>
                    <Lobby gameState={gameState} gameId={params.gameId} />
                </section>
            );
        }
        return <p>An Error Occured</p>;
    };

    return (
        <section>
            {renderGameState()}
        </section>
    );
}