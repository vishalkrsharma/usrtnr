'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { SigninFormSchemaType } from '@/types/form';
import { signinFormSchema } from '@/schema/auth.schema';
import { signinAction } from '@/actions/user.action';
import { Link } from '@/components/ui/link';

const SigninForm = ({ callbackUrl }: { callbackUrl?: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [passwordFieldType, setPasswordFieldType] = useState<'password' | 'text'>('password');

  const form = useForm<SigninFormSchemaType>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (values: SigninFormSchemaType) => {
    setError(null);

    const res = await signinAction(values, callbackUrl);

    if (res.success) {
      router.replace(callbackUrl || '/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
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
              <FormDescription>
                <Link
                  href='/auth/forgot-password'
                  className='p-0 text-sm font-normal h-5'
                >
                  Forgot password?
                </Link>
              </FormDescription>
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
  );
};

export default SigninForm;
