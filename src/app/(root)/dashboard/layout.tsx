import Navbar from '@/app/(root)/dashboard/_components/navbar';
import React from 'react';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Navbar />
      <main className='container mx-auto flex-1 h-[calc(100svh-64px)] pt-24 px-4'>{children}</main>
    </main>
  );
};

export default DashboardLayout;
