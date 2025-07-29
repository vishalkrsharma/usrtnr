import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignUpSuccessPage = () => {
  return (
    <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <Card className='w-full max-w-lg flex flex-col gap-6'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Thank you for signing up!</CardTitle>
          <CardDescription>Check your email to confirm</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            You&apos;ve successfully signed up. Please check your email to confirm your account before signing in.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUpSuccessPage;
