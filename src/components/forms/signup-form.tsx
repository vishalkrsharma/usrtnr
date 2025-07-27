'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import { SignupFormSchemaType } from '@/types/form';
import { signupFormSchema } from '@/schema/auth.schema';
import { signupAction } from '@/actions/user.action';

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [passwordFieldType, setPasswordFieldType] = useState<'password' | 'text'>('password');
  const [repeatPasswordFieldType, setRepeatPasswordFieldType] = useState<'password' | 'text'>('password');
  const router = useRouter();

  const form = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = async (values: SignupFormSchemaType) => {
    setError(null);

    const res = await signupAction(values);

    if (res.success) {
      router.replace('/auth/signup-success');
    } else {
      setError(res.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='John Doe'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className='flex justify-center items-start gap-4'>
          <FormField
            control={form.control}
            name={'password'}
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
                        size='icon'
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
          <FormField
            control={form.control}
            name='repeatPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    type={repeatPasswordFieldType}
                    placeholder='••••••••'
                    rightElement={
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => setRepeatPasswordFieldType(repeatPasswordFieldType === 'password' ? 'text' : 'password')}
                      >
                        {repeatPasswordFieldType === 'password' ? <EyeClosed /> : <Eye />}
                      </Button>
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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

export default SignupForm;
