'use client';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';
import { cn } from '@/lib/utils';
import { EDialogType } from '@/types/dialog';
import { Link } from 'lucide-react';
import { usePathname } from 'next/navigation';

const ShortenUrlButton = () => {
  const { onOpen } = useDialog();
  const pathname = usePathname();

  return (
    <Button
      onClick={() =>
        onOpen({
          type: EDialogType.SHORT_URL_CREATE,
        })
      }
      className={cn('', pathname.includes('/urls') && 'max-md:hidden')}
    >
      <Link />
      <span>Create URL</span>
      <span className='sr-only'>Create URL</span>
    </Button>
  );
};

export default ShortenUrlButton;
