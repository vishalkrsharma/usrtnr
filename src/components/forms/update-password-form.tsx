'use client';

import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';

const formSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(255, {
      message: 'Password must be less than 255 characters',
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null);
  const [passwordFieldType, setPasswordFieldType] = useState<'password' | 'text'>('password');
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser(values);
      if (error) throw error;

      router.push('/dashboard');
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
          <CardTitle className='text-2xl'>Reset Your Password</CardTitle>
          <CardDescription>Please enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={passwordFieldType}
                        placeholder='••••••••'
                        rightElement={
                          <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            className='bg-transparent aspect-square rounded-md p-0'
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
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
