'use client';
import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// API
import api from 'lib/api';

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
type FormValues = z.infer<typeof formSchema>;

const LoginComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setError(null); 
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const response = await api.post(endpoint, values);
      
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        router.push('/dash');
      }

    } catch (error) {
      form.reset();
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null); 
  };

  return (
    <section className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-4 font-extrabold leading-tight tracking-tighter md:text-6xl">
        {siteConfig.name}
      </h1>
      <h2 className="text-xl mb-8 font-bold leading-tight tracking-tighter md:text-2xl text-muted-foreground">
          {siteConfig.description}
      </h2>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              isLogin ? "Enter your credentials to login" : "Create a new account"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant="link" onClick={toggleMode} className="w-full">
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginComponent;