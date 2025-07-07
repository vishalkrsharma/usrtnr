import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/ui/link';
import { Url } from '@/generated/prisma';
import { ExternalLink } from 'lucide-react';

const Urlheader = ({ url }: { url: Url }) => {
  return (
    <header className='flex justify-between items-center  w-full'>
      <div className='flex justify-start items-center gap-4'>
        <Link
          href={url.originalUrl}
          target='_blank'
          className='text-2xl max-md:text-lg font-semibold px-0 text-foreground'
        >
          {url.originalUrl}
        </Link>
        <Badge className='max-md:text-xs'>{url.shortRoute}</Badge>
      </div>
      <div>
        <Link
          href={process.env.NEXT_PUBLIC_BASE_URL + '/' + url.shortRoute}
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
