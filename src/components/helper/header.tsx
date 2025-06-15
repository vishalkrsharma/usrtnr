import { ReactNode } from 'react';

const Header = ({ title, action = null }: { title: string; action?: ReactNode }) => {
  return (
    <div className='flex justify-between items-center gap-4'>
      <h2 className='text-3xl font-medium'>{title}</h2>
      {action}
    </div>
  );
};

export default Header;
