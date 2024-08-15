import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Icons } from '../icons';
import api from '@/lib/api';
import axios from 'axios';

export function CreateGame() {
    const [roomName, setRoomName] = useState('My Room');
    const [numPlayers, setNumPlayers] = useState(4);
    const [gameId, setGameId] = useState("");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleCreateGame = useCallback(async () => {
        try {
            const response = await api.post<string>('/games/create', null, {
                params: {
                    gameName: roomName,
                    numPlayers: numPlayers
                }
            });
            const newGameId = response.data;
            setGameId(newGameId);
            console.log(`/game/${newGameId}`);
            router.push(`/game/${newGameId}`);
        } catch (error) {
            console.error('Error creating game:', error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    // Handle unauthorized error
                } else {
                    setError('Failed to create game. Please try again.');
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }, [roomName, numPlayers, router]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                    Create New
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Create a New Game</DialogTitle>
                    <DialogDescription>
                        Set up your game room!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="roomName" className="text-left">
                            Room Name
                        </Label>
                        <Input
                            id="roomName"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="numPlayers" className="text-left flex items-center gap-2">
                                <Icons.player className="h-5 w-5" />
                                Number of Players
                            </Label>
                            <span className="font-semibold text-sm">
                                {numPlayers} players
                            </span>
                        </div>
                        <Slider
                            id="numPlayers"
                            min={2}
                            max={6}
                            step={1}
                            value={[numPlayers]}
                            onValueChange={(value) => setNumPlayers(value[0])}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>2</span>
                            <span>6</span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleCreateGame} className="w-full">
                        Create Game
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}