import { LogInForm } from '@/components/forms/log-in-form';
import Loader from '@/components/ui/loader';
import { Suspense } from 'react';

const LogInPage = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <Suspense fallback={<Loader />}>
          <LogInForm />
        </Suspense>
      </div>
    </div>
  );
};

export default LogInPage;
