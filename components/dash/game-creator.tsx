import React, { useCallback, useState, useEffect } from 'react';
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
import { Progress } from '../ui/progress';
import { Icons } from '../icons';
import api from '@/lib/api';
import axios from 'axios';

export function CreateGame() {
    const [roomName, setRoomName] = useState('My Room');
    const [numPlayers, setNumPlayers] = useState(4);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        let timer: number | undefined;
        if (loading) {
            timer = window.setInterval(() => {
                setProgress((oldProgress) => {
                    const newProgress = oldProgress + (100 / 10);
                    if (newProgress >= 100) {
                        window.clearInterval(timer);
                        return 100;
                    }
                    return newProgress;
                });
            }, 100);
        }
        return () => {
            if (timer) window.clearInterval(timer);
        };
    }, [loading]);

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleCreateGame = useCallback(async () => {
        try {
            setLoading(true);
            setProgress(0);
            
            const response = await api.post<string>('/games/create', null, {
                params: {
                    gameName: roomName,
                    numPlayers: numPlayers
                }
            });
            const newGameId = response.data;
            await wait(200);
            router.push(`/game/${newGameId}`);
        } catch (error) {
            console.error('Error creating game:', error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setError("Failed to authenticate, try logging in again.")
                } else {
                    setError('Failed to create game. Please try again.');
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }, [roomName, numPlayers, router]);

    const renderCreateForm = () => {
        return (
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
        );
    }

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
                <section className='popup'>
                    {loading ? (
                        <div className="py-4">
                            <Progress value={progress} className="w-full" />
                            <p className="text-center mt-2">Creating game...</p>
                        </div>
                    ) : (
                        renderCreateForm()
                    )}
                </section>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <DialogFooter>
                    <Button onClick={handleCreateGame} className="w-full" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Game'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}