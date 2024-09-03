import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { Board, Card, Color } from "@/lib/types";
import { BoardSection } from "@/lib/types";
import { PlayerSection } from "../pieces/player-section";
import { createBoardSections, getColorCode } from '@/lib/utils';
import { WarningProvider } from '@radix-ui/react-dialog';

interface GameBoardProps {
    gameName: string;
    board: Board;
    players: string[];
    player: string;
    playerColorMap: Record<string, Color>;
    currentColor: Color;
    lastCard?: Card;
}

const BOARD_COLOR = 0xA1662F;

const RADIUS_MULTIPLIER: Record<number, number> = {
    2: 225,
    3: 200,
    4: 180,
    5: 165,
    6: 155
};

const SCALE_BREAKPOINTS = [
    { width: 480, multiplier: 2.3 },
    { width: 768, multiplier: 1.8 },
    { width: 1024, multiplier: 1.6 },
    { width: 1440, multiplier: 1.0 },
    { width: Infinity, multiplier: 0.9 }
];
const PLAYER_COUNT_SCALE: Record<number, number> = {
    2: 1.2,
    3: 1,
    4: 0.75,
    5: 0.7,
    6: 0.65
};

function getScaleMultiplier(width: number, playerCount: number): number {
    const breakpoint = SCALE_BREAKPOINTS.find(bp => width <= bp.width);
    const baseMultiplier = breakpoint ? breakpoint.multiplier : 1;
    const playerCountAdjustment = PLAYER_COUNT_SCALE[playerCount] || 1;

    return baseMultiplier * playerCountAdjustment;
}

export default function GameBoard({
    gameName,
    board,
    players,
    player,
    playerColorMap,
    currentColor,
    lastCard,
}: GameBoardProps) {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const sections: BoardSection[] = createBoardSections(board, players, playerColorMap);
    const numPlayers = sections.length;

    const handleResize = useCallback(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const radius = RADIUS_MULTIPLIER[numPlayers] * Math.max(1, numPlayers / 2);
    const playerIndex = sections.findIndex(section => section.player === player);
    const boardRotation = playerIndex !== -1 ? (playerIndex * 2 * Math.PI / numPlayers) + Math.PI : 0;
    const titleRotation = 2 * Math.PI;
    const scaleMultiplier = getScaleMultiplier(windowSize.width, numPlayers);
    const scale = Math.min(windowSize.width / 1920, windowSize.height / 1080) * scaleMultiplier;

    const textStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 'white',
    });
    const coloredTextStyle = new TextStyle({
        ...textStyle,
        fill: getColorCode(currentColor),
    });

    const colorDesignations = players.map((playerName, index) => {
        const playerColor = playerColorMap[playerName];
        const isTurn = playerColor === currentColor;
        const playerColorStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: isTurn ? 18 : 14,
            fill: getColorCode(playerColor),
        });
        return (
            <Text 
                key={index}
                text={`${playerName}`}
                x={10}
                y={index * 20}
                anchor={[1, 0]}
                style={playerColorStyle}
            />
        );
    });

    return (
        <Stage
            width={windowSize.width}
            height={windowSize.height}
            options={{ backgroundColor: BOARD_COLOR, resizeTo: window }}
        >
            <Container x={0} y={0}>
                <Text text={`Game: ${gameName}`} x={10} y={10} style={textStyle} />
                <Text text={`${lastCard ? lastCard.cardValue : 'FORFEIT'}`} x={10} y={40} style={textStyle} />
                {/* <Text text={`Current Turn: ${currentColor}`} x={10} y={70} style={coloredTextStyle} /> */}
            </Container>
            <Container x={window.innerWidth -30} y={0}>
                {colorDesignations}
            </Container>
            <Container scale={scale} x={windowSize.width / 2} y={windowSize.height / 2.8}>
                {/* Board */}
                <Container rotation={-boardRotation}>
                    {sections.map((section, index) => (
                        <PlayerSectionContainer
                            key={index}
                            section={section}
                            index={index}
                            numPlayers={numPlayers}
                            radius={radius}
                        />
                    ))}
                </Container>
            </Container>
        </Stage>
    );
}

interface PlayerSectionContainerProps {
    section: BoardSection;
    index: number;
    numPlayers: number;
    radius: number;
}

function PlayerSectionContainer({ section, index, numPlayers, radius }: PlayerSectionContainerProps) {
    const { x, y, rotation } = calculatePosition(index, numPlayers, radius);

    return (
        <Container x={x} y={y} rotation={rotation}>
            <PlayerSection section={section} />
        </Container>
    );
}

function calculatePosition(index: number, numPlayers: number, radius: number) {
    if (numPlayers === 2) {
        return {
            x: 0,
            y: index === 0 ? -radius : radius,
            rotation: index === 0 ? Math.PI : 0,
        };
    } else {
        const angleStep = (2 * Math.PI) / numPlayers;
        const angle = index * angleStep - Math.PI / 2;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            rotation: angle + (3 * Math.PI) / 2,
        };
    }
}