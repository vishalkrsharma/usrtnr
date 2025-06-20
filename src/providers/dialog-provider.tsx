'use client';

import ShortUrlCreateDialog from '@/components/dialog/short-url-create-dialog';
import ShortUrlDialog from '@/components/dialog/short-url-dialog';
import { useDialog } from '@/hooks/use-dialog';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function DialogProvider() {
  const pathname = usePathname();
  const { onClose } = useDialog();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <ShortUrlDialog />
      <ShortUrlCreateDialog />
    </>
  );
}
