'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Url } from '@/generated/prisma';
import { useAutoTooltip } from '@/hooks/use-auto-tooltip';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { EDialogType } from '@/types/dialog';
import { Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function ShortUrlDialog() {
  const router = useRouter();
  const { type, isOpen, onClose, dialogData } = useDialogStore();

  const data = dialogData as Url;

  const copyShortUrlToClipboard = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_CLIENT_URL + '/' + data.shortRoute);
  };

  if (!data) return null;

  return (
    <Dialog
      open={isOpen && type === EDialogType.SHORTURL}
      onOpenChange={onClose}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className='text-center'>Your URL is ready!</DialogTitle>
        </DialogHeader>
        <div className=' flex flex-col justify-center items-center gap-4'>
          <Link
            href={data.originalUrl}
            className='hover:underline underline-offset-4 text-muted-foreground'
          >
            {data.originalUrl}
          </Link>
          <div className='bg-muted px-4 py-2 rounded-2xl flex justify-between items-center gap-4'>
            <span>{process.env.NEXT_PUBLIC_CLIENT_URL + '/' + data.shortRoute}</span>
            <div className='space-x-2'>
              <Button
                size='icon'
                className='rounded-full'
                onClick={copyShortUrlToClipboard}
              >
                <Copy />
              </Button>
              <Link
                href={process.env.NEXT_PUBLIC_CLIENT_URL + '/' + data.shortRoute}
                target='_blank'
                className="inline-flex items-center justify-center gap-2 transition-all [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9 rounded-full"
              >
                <ExternalLink />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
