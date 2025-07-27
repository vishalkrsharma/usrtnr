import SigninForm from '@/components/form/signin-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/components/ui/link';

const SigninPage = () => {
  return (
    <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <Card className='flex flex-col gap-6 w-full max-w-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Signin</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm />
        </CardContent>
        <CardFooter>
          <div className='text-xs text-muted-foreground'>
            Don&#39;t have an account? <Link href='/auth/signup$'>Sign up</Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SigninPage;
