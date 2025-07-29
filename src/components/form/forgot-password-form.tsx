'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ForgotPasswordFormSchemaType } from '@/types/form';
import { forgotPasswordFormSchema } from '@/schema/auth.schema';
import { forgotPasswordAction } from '@/actions/user.action';

const ForgotPasswordForm = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordFormSchemaType) => {
    const res = await forgotPasswordAction(values);

    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        {form.formState.isSubmitSuccessful ? (
          <>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl'>Check Your Email</CardTitle>
              <CardDescription>Password reset instructions sent</CardDescription>
            </CardHeader>
            <CardContent className='text-center'>
              <p className='text-sm text-muted-foreground'>If you registered using your email and password, you will receive a password reset email.</p>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl'>Reset Your Password</CardTitle>
              <CardDescription>Type in your email and we&apos;ll send you a link to reset your password</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
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
                  <Button
                    type='submit'
                    className='w-full'
                    isLoading={form.formState.isSubmitting}
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}{' '}
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
