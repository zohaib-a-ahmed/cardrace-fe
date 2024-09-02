import React, { useCallback, useEffect, useRef } from 'react';
import { Stage, Container, Graphics, Text } from '@pixi/react';
import { Graphics as PixiGraphics, Text as PixiText, TextStyle } from 'pixi.js';
import { BoardSection, Color, Marble } from "@/lib/types";
import { getColorCode } from '@/lib/utils';

const SPOT_SIZE = 40;
const SPOT_MARGIN = 8;
const BOARD_COLOR = 0xA1662F;
const BOARD_SPOT_COLOR = 0x000000;
const START_COLOR = 0xFFFFFF;

interface SpotProps {
    x: number;
    y: number;
    color: number;
    marble: Marble | null;
}

const Spot: React.FC<SpotProps> = ({ x, y, color, marble }) => {
    const graphicsRef = useRef<PixiGraphics>(null);
    const textRef = useRef<PixiText | null>(null);

    const draw = useCallback((g: PixiGraphics) => {
        g.clear();
        g.lineStyle(2, color);
        g.beginFill(0xFFFFFF, 0);
        g.drawCircle(0, 0, SPOT_SIZE / 2);
        g.endFill();

        if (marble) {
            g.beginFill(getColorCode(marble.color));
            g.drawCircle(0, 0, SPOT_SIZE / 2.5);
            g.endFill();
        }
    }, [color, marble]);

    const textStyle = new TextStyle({
        fontFamily: 'Arial',
        fontWeight: '600',
        fontSize: 14,
        fill: 0x000000,
        align: 'center',
    });

    return (
        <Container x={x} y={y}>
            <Graphics draw={draw} />
            {marble && (
                <Text
                    text={marble.type}
                    anchor={0.5}
                    x={0}
                    y={0}
                    style={textStyle}
                />
            )}
        </Container>
    );
};


interface PlayerSectionProps {
    section: BoardSection;
}

export const PlayerSection: React.FC<PlayerSectionProps> = ({ section }) => {
    const colorCode = getColorCode(section.color);

    const boardSpots = [
        { x: SPOT_SIZE * 3.0, y: -SPOT_SIZE * 5.0 },
        { x: SPOT_SIZE * 3.0, y: -SPOT_SIZE * 3.8 },
        { x: SPOT_SIZE * 3.0, y: -SPOT_SIZE * 2.6 },
        { x: SPOT_SIZE * 3.0, y: -SPOT_SIZE * 1.4 },
        { x: SPOT_SIZE * 3.0, y: -SPOT_SIZE * 0.2 },
        { x: SPOT_SIZE * 3.0, y: SPOT_SIZE },
        { x: SPOT_SIZE * 1.8, y: SPOT_SIZE },
        { x: SPOT_SIZE * 0.6, y: SPOT_SIZE },
        { x: -SPOT_SIZE * 0.6, y: SPOT_SIZE },
        { x: -SPOT_SIZE * 1.8, y: SPOT_SIZE },
        { x: -SPOT_SIZE * 3.0, y: SPOT_SIZE },
        { x: -SPOT_SIZE * 3.0, y: -SPOT_SIZE * 0.2 },
        { x: -SPOT_SIZE * 3.0, y: -SPOT_SIZE * 1.4 },
        { x: -SPOT_SIZE * 3.0, y: -SPOT_SIZE * 2.6 },
        { x: -SPOT_SIZE * 3.0, y: -SPOT_SIZE * 3.8 },
        { x: -SPOT_SIZE * 3.0, y: -SPOT_SIZE * 5.0 },
    ];

    return (
        <Container>
            {/* Reserve spots */}
            {section.reserve.map((marbleId, i) => (
                <Spot
                    key={`reserve-${i}`}
                    x={SPOT_SIZE * 1.8 - (i * (SPOT_SIZE + SPOT_MARGIN))}
                    y={-SPOT_SIZE * -2.5}
                    color={colorCode}
                    marble={section.marbles[marbleId]}
                />
            ))}

            {/* Safe zone spots */}
            {[...Array(4)].map((_, i) => (
                <Spot
                    key={`safe-${i}`}
                    x={SPOT_SIZE * 1.8 - (i * SPOT_SIZE * 0.9)}
                    y={SPOT_SIZE * -0.2 - (i * SPOT_SIZE * 0.9)}
                    color={colorCode}
                    marble={section.safeZone[i] !== null ? section.marbles[section.safeZone[i]!] : null}
                />
            ))}

            {/* Board spots */}
            {boardSpots.map((spot, index) => (
                <Spot
                    key={`board-${index}`}
                    x={spot.x}
                    y={spot.y}
                    color={index === 5 ? START_COLOR : BOARD_SPOT_COLOR}
                    marble={section.spaces[index] !== null ? section.marbles[section.spaces[index]!] : null}
                />
            ))}
        </Container>
    );
};