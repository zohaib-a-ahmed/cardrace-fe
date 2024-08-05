'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/dash');
    } else {
      router.push('/auth');
    }
  }, [router]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center items-center justify-center ">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Slow your roll bro
        </h1>
      </div>
    </section>
  );
}