import SignupForm from '@/components/form/signup-form';
import OAuthButtons from '@/components/helper/oauth-buttons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { Separator } from '@/components/ui/separator';

const SignUpPage = () => {
  return (
    <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <Card className='flex flex-col gap-6 w-full max-w-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <OAuthButtons />
          <Separator />
          <SignupForm />
        </CardContent>
        <CardFooter>
          <div className='text-xs text-muted-foreground'>
            Already have an account? <Link href='/auth/signin'>Sign in</Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignUpPage;
