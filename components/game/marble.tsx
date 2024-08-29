import { Marble } from "@/lib/types";
import { Icons } from "../icons";

interface MarbleProps {
    marble: Marble,
  }
  
export default function MarbleIcon({ marble }: MarbleProps) {

    const getMarbleIcon = (id: string) => {
        switch (id) {
            case 'A': return <Icons.A className="w-4 h-4" />;
            case 'B': return <Icons.B className="w-4 h-4" />;
            case 'C': return <Icons.C className="w-4 h-4" />;
            case 'D': return <Icons.D className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: marble.color }}>
            {marble.type}
        </div>
    )
}