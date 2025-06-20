import { Link } from '@/components/ui/link';

const Utils = () => {
  return (
    <div className='absolute top-4 right-4 flex justify-end items-center gap-4'>
      <Link
        href='/dashboard'
        variant='button'
      >
        Dashboard
      </Link>
    </div>
  );
};

export default Utils;
