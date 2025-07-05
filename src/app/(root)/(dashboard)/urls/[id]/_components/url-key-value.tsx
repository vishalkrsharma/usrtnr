import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const UrlKeyValue = ({ title, children, className }: { title: string; children: ReactNode; className?: string }) => {
  return (
    <div className={cn('border rounded-md space-y-4 px-4 py-3 min-w-[200px] max-w-[250px]', className)}>
      <div className='text-sm'>{title}</div>
      {children}
    </div>
  );
};

export default UrlKeyValue;
