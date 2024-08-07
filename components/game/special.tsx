import React, { useState, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Marble, Card as CardType, MoveSpecification } from "@/lib/types"
import MarbleIcon from "./marble"

interface SpecialHandlerProps {
    selectedMarble: Marble;
    selectedCard: CardType;
    marbles: Marble[];
    onSpecify: (specification: MoveSpecification, targetMarble: Marble | null) => void;
}

export default function SpecialHandler({
    selectedMarble,
    selectedCard,
    marbles,
    onSpecify
}: SpecialHandlerProps) {
    const [splitValue, setSplitValue] = useState<number>(0);

    const filterMarbles = useCallback((includeOwn: boolean) => 
        marbles.filter(m => includeOwn || m.color !== selectedMarble.color),
    [marbles, selectedMarble.color]);

    const renderMarbleSelection = useCallback((placeholder: string, opponentOnly: boolean = false, onSelect: (marble: Marble) => void) => (
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
                    .filter(marble => opponentOnly ? marble.color !== selectedMarble.color : marble.color === selectedMarble.color)
                    .map(marble => (
                        <SelectItem key={`${marble.color}-${marble.type}`} value={`${marble.color}-${marble.type}`}>
                            <div className="flex items-center space-x-2">
                                <MarbleIcon marble={marble} playerColor={marble.color} />
                            </div>
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    ), [marbles, selectedMarble]);

    switch (selectedCard.value) {
        case '4':
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
        case '7':
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
                    {splitValue > 0 && splitValue < 7 && renderMarbleSelection("Select marble for remaining", false, (marble) => 
                        onSpecify({ type: 'split', splitValue }, marble)
                    )}
                </div>
            );
        case '10':
            return (
                <div className="space-y-4">
                    <p>Select opponent marble</p>
                    {renderMarbleSelection("Select marble to move back", true, (marble) => 
                        onSpecify({ type: 'standard' }, marble)
                    )}
                </div>
            );
        case 'J':
            return (
                <div className="space-y-4">
                    <p></p>
                    {renderMarbleSelection("Switch", true, (marble) => 
                        onSpecify({ type: 'swap' }, marble)
                    )}
                </div>
            );
        case 'A':
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
        case 'joker':
            return (
                <div className="space-y-4">
                    TODO: implement
                </div>
            );
        default:
            return null;
    }
}