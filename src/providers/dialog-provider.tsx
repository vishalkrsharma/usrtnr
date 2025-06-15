'use client';

import ShortUrlCreateDialog from '@/components/dialog/short-url-create-dialog';
import ShortUrlDialog from '@/components/dialog/short-url-dialog';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DialogProvider() {
  const pathname = usePathname();
  const { onClose } = useDialogStore();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <>
      <ShortUrlDialog />
      <ShortUrlCreateDialog />
    </>
  );
}
