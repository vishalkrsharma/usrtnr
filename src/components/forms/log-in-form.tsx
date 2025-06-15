'use client';

import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { Link } from '@/components/ui/link';

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'Email is required',
    })
    .max(255, {
      message: 'Email must be less than 255 characters',
    })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(255, {
      message: 'Password must be less than 255 characters',
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function LogInForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null);
  const [passwordFieldType, setPasswordFieldType] = useState<'password' | 'text'>('password');
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (values: FormSchemaType) => {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;

      router.push(`/dashboard${queryString ? `?${queryString}` : ''}`);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='johndoe@email.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className='py-5'
                        type={passwordFieldType}
                        placeholder='••••••••'
                        rightElement={
                          <Button
                            type='button'
                            variant='outline'
                            size='icon'
                            className=''
                            onClick={() => setPasswordFieldType(passwordFieldType === 'password' ? 'text' : 'password')}
                          >
                            {passwordFieldType === 'password' ? <EyeClosed /> : <Eye />}
                          </Button>
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p
                  data-slot='form-message'
                  className='text-destructive text-sm'
                >
                  {error}
                </p>
              )}
              <Button
                type='submit'
                isLoading={form.formState.isSubmitting}
                className='w-full'
              >
                Submit
              </Button>
            </form>
          </Form>
          <div className='text-xs text-muted-foreground'>
            Don&#39;t have an account? <Link href={`/auth/sign-up${queryString ? `?${queryString}` : ''}`}>Sign up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
