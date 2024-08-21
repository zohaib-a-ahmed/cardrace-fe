import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WaitingGameStateDTO } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface LobbyProps {
  gameState: WaitingGameStateDTO;
  gameId: string;
}

export function Lobby({ gameState, gameId }: LobbyProps) {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Waiting for Players</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold">Game Name:</span>
            <span className="col-span-3">{gameState.gameName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold">Game ID:</span>
            <span className="col-span-2">{gameId}</span>
            <Button 
              className="col-span-1" 
              onClick={() => navigator.clipboard.writeText(gameId)}
              size="sm"
            >
              Copy
            </Button>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <span className="col-span-1 font-semibold">Players:</span>
            <ul className="col-span-3 list-disc pl-5">
              {gameState.players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DisconnectAlertProps {
    deserter: string;
  }
  
  export function DisconnectAlert({ deserter }: DisconnectAlertProps) {
    const router = useRouter();
  
    const handleReturnToDashboard = () => {
      router.push('/dash');
    };
  
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Game Terminated</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{deserter} has disconnected.</p>
          </div>
          <DialogFooter>
            <Button onClick={handleReturnToDashboard}>
              Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }