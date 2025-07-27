'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import { ResetPasswordFormSchemaType } from '@/types/form';
import { resetPasswordFormSchema } from '@/schema/auth.schema';
import { resetPasswordAction } from '@/actions/user.action';
import { toast } from 'sonner';

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [passwordFieldType, setPasswordFieldType] = useState<'password' | 'text'>('password');
  const [repeatPasswordFieldType, setRepeatPasswordFieldType] = useState<'password' | 'text'>('password');
  const router = useRouter();
  const form = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = async (values: ResetPasswordFormSchemaType) => {
    const res = await resetPasswordAction({ values, token });

    if (res.success) {
      toast.success(res.message);
      router.replace('/auth/signin');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <div className='flex justify-center items-start gap-4'>
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
                        size='icon'
                        onClick={() => setPasswordFieldType(passwordFieldType === 'password' ? 'text' : 'password')}
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
        <Button
          type='submit'
          className='w-full'
          isLoading={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
