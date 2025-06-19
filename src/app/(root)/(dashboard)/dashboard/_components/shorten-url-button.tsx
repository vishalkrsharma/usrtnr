'use client';

import { Button } from '@/components/ui/button';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { EDialogType } from '@/types/dialog';
import { Link } from 'lucide-react';

const ShortenUrlButton = ({ userId }: { userId: string }) => {
  const { onOpen } = useDialogStore();

  return (
    <Button
      onClick={() =>
        onOpen({
          type: EDialogType.SHORT_URL_CREATE,
          dialogData: {
            userId,
          },
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
