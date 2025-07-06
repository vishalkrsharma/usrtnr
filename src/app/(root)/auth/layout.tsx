import { ModeToggle } from '@/components/ui/mode-toggle';
import React from 'react';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <ModeToggle className='absolute right-4 bottom-4 z-50' />
    </>
  );
};

export default AuthLayout;
