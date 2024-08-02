import { ReactNode } from "react";
import { useTheme } from "next-themes";
import NumberTicker from "./number-ticker";
import { cn } from "@/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  number,
  className,
  Icon,
  description,
  id,
}: {
  number: number;
  className: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  id: number;
}) => {
  const { theme } = useTheme();

  return (
    <div
      key={id}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-[#080b12] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
    >
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
        <Icon 
          className={`h-9 w-9 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-700'
          }`}
        />
        <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 transition-all duration-300 group-hover:text-neutral-900 dark:group-hover:text-white">
          {number === 0 ? '0' : <NumberTicker value={number} />}
        </h3>
        <p className="max-w-lg text-neutral-400 transition-all duration-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-300">{description}</p>
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
};

export { BentoCard, BentoGrid };