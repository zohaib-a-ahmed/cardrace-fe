import React from 'react';
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import BlurFade from './magicui/blur-fade';
import { Icons } from "./icons";

interface DashProps {
  username: string;
  wins: number;
  turns: number;
  gamesPlayed: number;
}

interface FeatureItem {
  Icon: any;
  number: number;
  description: string;
  id: number;
  background: React.ReactNode;
  className: string;
}

const Dash: React.FC<DashProps> = ({ username, wins, turns, gamesPlayed }) => {
  const features: FeatureItem[] = [
    {
      Icon: Icons.trophy,
      number: wins,
      description: "Wins",
      id: 1,
      background: <img className="absolute -right-20 -top-20 opacity-60" alt="Games Won" />,
      className: "col-span-1 row-span-1",
    },
    {
      Icon: Icons.hourglass,
      number: turns,
      description: "Turns",
      id: 2,
      background: <img className="absolute -right-20 -top-20 opacity-60" alt="Turns" />,
      className: "col-span-1 row-span-1",
    },
    {
      Icon: Icons.gamepad,
      number: gamesPlayed,
      description: "Games Played",
      id: 3,
      background: <img className="absolute -right-20 -top-20 opacity-60" alt="Games Played" />,
      className: "col-span-2 row-span-1",
    },
  ];

  return (
    <div className="w-full max-w-7xl flex flex-col gap-8 p-8 rounded-lg">
      <BlurFade delay={.25} inView>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100 text-left">
          Hey, <span className="text-blue-600 dark:text-blue-400">{username}</span>
        </h1>        
      </BlurFade>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 p-4 rounded-lg">
        <BlurFade delay={.25 * 2} inView>
            <BentoGrid className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
              {features.map((feature) => (
                <BentoCard key={feature.id} {...feature} />
              ))}
            </BentoGrid>          
        </BlurFade>
        </div>
        <div className="w-full lg:w-1/2 p-4 rounded-lg">
        <BlurFade delay={.25 * 3} inView>
            <div className="bg-gray-100 dark:bg-neutral-800 h-full rounded-lg flex items-center justify-center">
              <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">Other Component (To be designed)</p>
            </div>          
        </BlurFade>
        </div>
      </div>
      <BlurFade delay={.25 * 4} inView>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100 text-right">
          Let's <span className="text-red-600 dark:text-red-400">play.</span>
        </h1>        
      </BlurFade>
    </div>
  );
};

export default Dash;