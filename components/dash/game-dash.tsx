import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from '../icons';
import { cn } from "@/lib/utils";
import { CreateGame } from './game-creator';

export default function GameDash() {
    const [gameCode, setGameCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const validateAndJoinGame = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Placeholder for game validation API call
            const isValid = await checkGameValidity(gameCode);

            if (isValid) {
                router.push(`/game/${gameCode}`);
            } else {
                setError('Invalid game code or game is full.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Error joining game:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Placeholder function for game validity check
    const checkGameValidity = async (code : string) => {
        // TODO: Implement actual API call to check game validity
        // This is a placeholder that always returns true
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000);
        });
    };

    return (
        <Card
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-xl h-full col-span-1 row-span-1",
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.05),0_2px_4px_rgba(0,0,0,.08),0_12px_24px_rgba(0,0,0,.08)]",
                "transform-gpu dark:bg-[#080b12] dark:[border:1px_solid_rgba(255,255,255,.15)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff2f_inset,0_0_0_1px_rgba(255,255,255,.2)]",
            )}
        >
            <CardHeader>
                <CardTitle className='flex justify-center'><Icons.gamepad className="mr-2 h-8 w-8" /></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 z-10">
                <CreateGame/>
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 text-center">
                    or
                </h2>
                <div className="flex flex-col gap-2">
                    <Input 
                        type="text" 
                        placeholder="Enter game code" 
                        value={gameCode}
                        onChange={(e) => setGameCode(e.target.value)}
                    />
                    <Button 
                        className="w-full" 
                        size="lg" 
                        disabled={!gameCode || isLoading}
                        onClick={validateAndJoinGame}
                    >
                        {isLoading ? 'Joining...' : 'Join Game'}
                    </Button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
            </CardContent>
        </Card>
    )
}