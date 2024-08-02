'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from "next-themes";
import { siteConfig } from '@/config/site';
import AuthCard from '@/components/auth-card';
import Particles from '@/components/magicui/particles';  // Adjust the import path as needed

const LoginComponent = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const handleAuthSuccess = (token: string) => {
    localStorage.setItem('accessToken', token);
    router.push('/dash');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4">
      <Particles
        className="absolute inset-0"
        quantity={300}
        size={1.4}
        ease={90}
        color={color}
        refresh
      />
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-8 p-8 rounded-lg">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl">
          {siteConfig.name}
        </h1>
        <h2 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl text-muted-foreground">
          {siteConfig.description}
        </h2>
        <AuthCard onSuccess={handleAuthSuccess} />
      </div>
    </section>
  );
};

export default LoginComponent;