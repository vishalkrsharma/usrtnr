import { cn } from '@/lib/utils';
import { PuffLoader } from 'react-spinners';

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center h-screen', className)}>
      <PuffLoader />
    </div>
  );
};

export default Loader;
