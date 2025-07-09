import PlaceholderText from '@/components/helper/placeholder-text';
import { Link } from '@/components/ui/link';

const UnderDevelopment = ({ buttonTitle, buttonHref }: { buttonTitle: string; buttonHref: string }) => {
  return (
    <div className='flex justify-center items-center flex-col gap-8 flex-1'>
      <PlaceholderText
        className='text-2xl font-semibold text-primary flex-initial'
        text='Page under development :('
      />
      <Link
        href={buttonHref}
        variant='button'
        size='lg'
        className='text-lg'
      >
        {buttonTitle}
      </Link>
    </div>
  );
};

export default UnderDevelopment;
