import { Marble } from "@/lib/types";

interface MarbleProps {
    marble: Marble,
  }
  
export default function MarbleIcon({ marble }: MarbleProps) {

    return (
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: marble.color }}>
            {marble.type}
        </div>
    )
}