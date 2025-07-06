import Navbar from '@/app/(root)/(dashboard)/_components/navbar';
import React from 'react';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto pt-24 pb-8 px-4 flex flex-1 items-stretch'>{children}</main>
    </>
  );
};

export default DashboardLayout;
