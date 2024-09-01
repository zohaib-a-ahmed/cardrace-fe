import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"

  interface forfeitAlertProps {
    onForfeit:(forfeit:boolean) => void;
    turn:boolean,
  }
  
  export function ForfeitAlertDialog({onForfeit, turn}:forfeitAlertProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' size='sm' disabled={!turn} >Forfeit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will empty your hand until the next set of cards are dealt. Only do so if you have no other options!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onForfeit(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onForfeit(true)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  