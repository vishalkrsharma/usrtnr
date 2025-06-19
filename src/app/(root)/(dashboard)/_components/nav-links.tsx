'use client';

import { Link } from '@/components/ui/link';
import { NAV_LINKS } from '@/constants/nav-links';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className='flex justify-center items-center gap-2'>
      {NAV_LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn('font-normal', pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground')}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
