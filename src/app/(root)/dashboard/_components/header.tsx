'use client';

import { Button } from '@/components/ui/button';

const Header = ({ title }: { title: string }) => {
  return (
    <div className='flex justify-between items-center gap-4'>
      <h2>{title}</h2>
      <Button></Button>
    </div>
  );
};

export default Header;
