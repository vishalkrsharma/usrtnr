import { cn } from '@/lib/utils';
import { PuffLoader } from 'react-spinners';

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center h-screen w-full', className)}>
      <PuffLoader color='var(--primary)' />
    </div>
  );
};

export default Loader;
