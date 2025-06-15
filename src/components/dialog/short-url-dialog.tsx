'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from '@/components/ui/link';
import { Url } from '@/generated/prisma';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { EDialogType } from '@/types/dialog';
import { Copy, ExternalLink, UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

const ShortUrlDialog = () => {
  const { type, isOpen, onClose, dialogData } = useDialogStore();
  const pathname = usePathname();

  const data = dialogData as Url;

  const shortUrl = process.env.NEXT_PUBLIC_BASE_URL + '/' + data?.shortRoute;

  const copyShortUrlToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Short URL copied to clipboard!');
  };

  if (!data) return null;

  return (
    <Dialog
      open={isOpen && type === EDialogType.SHORT_URL}
      onOpenChange={onClose}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className='text-center'>Your URL is ready!</DialogTitle>
          <DialogDescription className='text-center'>Here is your shortened URL. You can copy it or open it in a new tab.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col justify-center items-center gap-6'>
          <Link
            href={data.originalUrl}
            className='text-muted-foreground'
          >
            {data.originalUrl}
          </Link>
          <div className='bg-muted px-4 py-2 rounded-2xl flex justify-between items-center gap-4'>
            <div className='truncate max-w-[300px]'>{shortUrl}</div>
            <div className='space-x-2 flex justify-center items-center gap-2'>
              <Button
                size='icon'
                className='rounded-full'
                onClick={copyShortUrlToClipboard}
              >
                <Copy />
              </Button>
              <Link
                href={shortUrl}
                target='_blank'
                variant='outline'
                size='icon'
                className='rounded-full'
              >
                <ExternalLink />
              </Link>
            </div>
          </div>
          {!pathname.includes('dashboard') ? (
            <div className='flex justify-between items-center'>
              <p className='text-sm text-muted-foreground'>Sign up to track clicks and get detailed analytics for your link.</p>
              <Link
                variant='secondary'
                size='sm'
                href={`/auth/log-in?shortUrlId=${data.id}`}
              >
                <UserPlus />
                <span>Create Account</span>
                <span className='sr-only'>create account</span>
              </Link>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShortUrlDialog;
