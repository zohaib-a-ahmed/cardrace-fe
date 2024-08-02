'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Particles from '@/components/magicui/particles';
import BlurFade from "@/components/magicui/blur-fade";
import { useTheme } from "next-themes";
import Dash from '@/components/dash';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import axios from 'axios';

interface UserData {
  username: string;
  wins: number;
  turns: number;
  gamesPlayed: number;
}

const DashboardComponent: React.FC = () => {
    const { theme } = useTheme();
    const [color, setColor] = useState<string>("#ffffff");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      setColor(theme === "dark" ? "#ffffff" : "#000000");
    }, [theme]);

    const fetchUserProfile = useCallback(async () => {
      try {
        const response = await api.get<UserData>('/users/profile');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push('/auth');
        } else {
          setError('Failed to load user profile. Please try again.');
        }
      }
    }, [router]);

    useEffect(() => {
      fetchUserProfile();
    }, [fetchUserProfile]);

    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }

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
        {userData ? (
        <BlurFade delay={0.1} inView className="w-full flex items-center justify-center">
            <Dash 
                username={userData.username}
                wins={userData.wins}
                turns={userData.turns}
                gamesPlayed={userData.gamesPlayed}
            />            
        </BlurFade>
        ) : (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100 text-center">
            .:.
        </h1>
        )}
      </section>
    );
};

export default DashboardComponent;