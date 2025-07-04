import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/ui/link';
import { Url } from '@/generated/prisma';
import { ExternalLink } from 'lucide-react';

const Urlheader = ({ url }: { url: Url }) => {
  return (
    <header className='flex justify-between items-center gap-4'>
      <div className='flex justify-start items-center gap-4'>
        <Link
          href={url.originalUrl}
          target='_blank'
          className='text-2xl font-semibold px-0'
        >
          {url.originalUrl}
        </Link>
        <Badge>{url.shortRoute}</Badge>
      </div>
      <div>
        <Link
          href={url.originalUrl}
          target='_blank'
          variant='button'
          size='icon'
          className='rounded-full'
        >
          <ExternalLink />
        </Link>
      </div>
    </header>
  );
};

export default Urlheader;
