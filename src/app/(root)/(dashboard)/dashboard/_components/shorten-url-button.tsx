'use client';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';
import { EDialogType } from '@/types/dialog';
import { Link } from 'lucide-react';

const ShortenUrlButton = () => {
  const { onOpen } = useDialog();

  return (
    <Button
      onClick={() =>
        onOpen({
          type: EDialogType.SHORT_URL_CREATE,
        })
      }
    >
      <Link />
      <span>Create URL</span>
      <span className='sr-only'>Create URL</span>
    </Button>
  );
};

export default ShortenUrlButton;
