'use client'
import React from 'react';
import { Icons } from "@/components/icons"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Particles from '@/components/magicui/particles';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const features = [
  {
    Icon: Icons.trophy,
    number: 28,
    description: "Wins",
    id: 1,
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="Games Won" />,
    className: "col-span-1 row-span-1",
  },
  {
    Icon: Icons.hourglass,
    number: 1234,
    description: "Turns",
    id: 2,
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="Turns" />,
    className: "col-span-1 row-span-1",
  },
  {
    Icon: Icons.gamepad,
    number: 135,
    description: "Games Played",
    id: 3,
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="Games Played" />,
    className: "col-span-2 row-span-1",
  },
];

const DashboardComponent = () => {
    const { theme } = useTheme();
    const [color, setColor] = useState("#ffffff");
   
    useEffect(() => {
      setColor(theme === "dark" ? "#ffffff" : "#000000");
    }, [theme]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4">
        <Particles
        className="absolute inset-0"
        quantity={200}
        staticity={20}
        size={1}
        ease={80}
        color={color}
        refresh
        />
      <div className="w-full max-w-7xl flex flex-col gap-8 p-8 rounded-lg">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100 text-left">
          Hey, <span className="text-blue-600 dark:text-blue-400">bro</span>
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 p-4 rounded-lg">
            <BentoGrid className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
              {features.map((feature) => (
                <BentoCard key={feature.id} {...feature} />
              ))}
            </BentoGrid>
          </div>
          <div className="w-full lg:w-1/2 p-4 rounded-lg">
            <div className="bg-gray-100 dark:bg-neutral-800 h-full rounded-lg flex items-center justify-center">
              <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">Other Component (To be designed)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardComponent;