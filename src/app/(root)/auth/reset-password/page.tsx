import ResetPasswordForm from '@/components/form/reset-password-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ResetPasswordPage = async ({ searchParams }: { searchParams: Promise<{ token: string }> }) => {
  const { token } = await searchParams;

  return (
    <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <Card className='flex flex-col gap-6 w-full max-w-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Reset Your Password</CardTitle>
          <CardDescription>Please enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>
    </main>
  );
};

export default ResetPasswordPage;
