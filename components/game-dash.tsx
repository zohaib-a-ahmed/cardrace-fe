import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from './icons';
import { cn } from "@/lib/utils";
import { CreateGame } from './game-creator';

export default function GameDash() {
    const [gameCode, setGameCode] = useState('');

    return (
        <Card
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-xl h-full col-span-1 row-span-1",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.05),0_2px_4px_rgba(0,0,0,.08),0_12px_24px_rgba(0,0,0,.08)]",
                // dark styles
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
                        disabled={!gameCode}
                    >
                        Join Game
                    </Button>
                </div>
                <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
            </CardContent>
        </Card>
    )
}