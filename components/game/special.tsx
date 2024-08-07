import React, { useState, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Marble, Card as CardType, MoveSpecification } from "@/lib/types"
import MarbleIcon from "./marble"

interface HandlerProps {
    selectedMarble: Marble;
    selectedCard: CardType;
    marbles: Marble[];
    onSpecify: (specification: MoveSpecification, targetMarble: Marble | null) => void;
}

function FourHandler({ onSpecify }: HandlerProps) {
    return (
        <div className="space-y-4">
            <p>Direction</p>
            <Select onValueChange={(value) => onSpecify({ type: value as 'forward' | 'backward' }, null)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="forward">Forward</SelectItem>
                    <SelectItem value="backward">Backward</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

function SevenHandler({ marbles, selectedMarble, onSpecify }: HandlerProps) {
    const [splitValue, setSplitValue] = useState<number>(0);

    const renderMarbleSelection = useCallback((placeholder: string, onSelect: (marble: Marble) => void) => (
        <Select onValueChange={(value) => {
            const [color, type] = value.split('-');
            const selectedMarble = marbles.find(m => m.color === color && m.type === type);
            if (selectedMarble) onSelect(selectedMarble);
        }}>
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {marbles
                    .filter(marble => marble.color === selectedMarble.color)
                    .map(marble => (
                        <SelectItem key={`${marble.color}-${marble.type}`} value={`${marble.color}-${marble.type}`}>
                            <div className="flex items-center space-x-2">
                                <MarbleIcon marble={marble} playerColor={marble.color} />
                            </div>
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    ), [marbles, selectedMarble.color]);

    return (
        <div className="space-y-4">
            <p># of spaces to move </p>
            <Input
                type="number"
                max={7}
                min={1}
                placeholder='# spaces'
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                        setSplitValue(value);
                        if (value === 7) {
                            onSpecify({ type: 'standard' }, null);
                        }
                    }
                }}
            />
            {splitValue > 0 && splitValue < 7 && renderMarbleSelection("Select marble for remaining", (marble) =>
                onSpecify({ type: 'split', splitValue }, marble)
            )}
        </div>
    );
}

function TenHandler({ marbles, selectedMarble, onSpecify }: HandlerProps) {
    const renderMarbleSelection = useCallback((placeholder: string, onSelect: (marble: Marble) => void) => (
        <Select onValueChange={(value) => {
            const [color, type] = value.split('-');
            const selectedMarble = marbles.find(m => m.color === color && m.type === type);
            if (selectedMarble) onSelect(selectedMarble);
        }}>
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {marbles
                    .filter(marble => marble.color !== selectedMarble.color)
                    .map(marble => (
                        <SelectItem key={`${marble.color}-${marble.type}`} value={`${marble.color}-${marble.type}`}>
                            <div className="flex items-center space-x-2">
                                <MarbleIcon marble={marble} playerColor={marble.color} />
                            </div>
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    ), [marbles, selectedMarble.color]);

    return (
        <div className="space-y-4">
            <p>Select opponent marble</p>
            {renderMarbleSelection("Select marble to move back", (marble) =>
                onSpecify({ type: 'standard' }, marble)
            )}
        </div>
    );
}

function JackHandler({ marbles, selectedMarble, onSpecify }: HandlerProps) {
    const renderMarbleSelection = useCallback((placeholder: string, onSelect: (marble: Marble) => void) => (
        <Select onValueChange={(value) => {
            const [color, type] = value.split('-');
            const selectedMarble = marbles.find(m => m.color === color && m.type === type);
            if (selectedMarble) onSelect(selectedMarble);
        }}>
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {marbles
                    .filter(marble => marble.color !== selectedMarble.color)
                    .map(marble => (
                        <SelectItem key={`${marble.color}-${marble.type}`} value={`${marble.color}-${marble.type}`}>
                            <div className="flex items-center space-x-2">
                                <MarbleIcon marble={marble} playerColor={marble.color} />
                            </div>
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    ), [marbles, selectedMarble.color]);

    return (
        <div className="space-y-4">
            <p>Switch with</p>
            {renderMarbleSelection("Switch", (marble) =>
                onSpecify({ type: 'swap' }, marble)
            )}
        </div>
    );
}

function AceHandler({ onSpecify }: HandlerProps) {
    return (
        <div className="space-y-4">
            <p>Distance</p>
            <Select onValueChange={(value) => onSpecify({ type: 'move', value: parseInt(value) as 1 | 11 }, null)}>
                <SelectTrigger>
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

function JokerHandler({ selectedMarble, selectedCard, marbles, onSpecify }: HandlerProps) {
    const [mimicCard, setMimicCard] = useState<CardType['value'] | null>(null);

    const handleCardSelection = (value: CardType['value']) => {
        setMimicCard(value);
        onSpecify({ type: 'joker', actingAs: value }, null);
    };

    const handleSpecialCase = (new_specification: MoveSpecification, targetMarble: Marble | null) => {
        onSpecify({
            type: 'joker',
            actingAs: mimicCard!,
            specification : new_specification,
        }, targetMarble);
    };

    const renderCardHandler = () => {
        if (!mimicCard) return null;

        const mimicProps = {
            selectedMarble,
            selectedCard: { ...selectedCard, value: mimicCard },
            marbles,
            onSpecify: handleSpecialCase
        };

        switch (mimicCard) {
            case '4': return <FourHandler {...mimicProps} />;
            case '7': return <SevenHandler {...mimicProps} />;
            case '10': return <TenHandler {...mimicProps} />;
            case 'J': return <JackHandler {...mimicProps} />;
            case 'A': return <AceHandler {...mimicProps} />;
            default:
                // For number cards that don't require special handling
                onSpecify({ type: 'joker', actingAs: mimicCard}, null);
                return null;
        }
    };

    return (
        <div className="space-y-4">
            <p>Select card to mimic</p>
            <Select onValueChange={handleCardSelection}>
                <SelectTrigger>
                    <SelectValue placeholder="Select card to mimic" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="J">J</SelectItem>
                    <SelectItem value="Q">Q</SelectItem>
                    <SelectItem value="K">K</SelectItem>
                </SelectContent>
            </Select>
            {renderCardHandler()}
        </div>
    );
}

export default function SpecialHandler(props: HandlerProps) {
    switch (props.selectedCard.value) {
        case '4': return <FourHandler {...props} />;
        case '7': return <SevenHandler {...props} />;
        case '10': return <TenHandler {...props} />;
        case 'J': return <JackHandler {...props} />;
        case 'A': return <AceHandler {...props} />;
        case 'joker': return <JokerHandler {...props} />;
        default: return null;
    }
}