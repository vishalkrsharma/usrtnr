'use client';

import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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
});

type FormSchemaType = z.infer<typeof formSchema>;

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: FormSchemaType) => {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      {form.formState.isSubmitSuccessful ? (
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Check Your Email</CardTitle>
            <CardDescription>Password reset instructions sent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>If you registered using your email and password, you will receive a password reset email.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Reset Your Password</CardTitle>
            <CardDescription>Type in your email and we&apos;ll send you a link to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
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
                          placeholder='johndoe@mail.com'
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
                <Button type='submit'>Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
