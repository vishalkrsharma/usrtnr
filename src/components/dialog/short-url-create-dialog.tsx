'use client';

import { useDialogStore } from '@/hooks/use-dialog-store';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EDialogType } from '@/types/dialog';
import UrlShortenerForm from '@/components/forms/url-shortener-form';

const ShortUrlCreateDialog = () => {
  const { type, isOpen, onClose, dialogData } = useDialogStore();

  const data = dialogData as { userId: string };
  const open = isOpen && type === EDialogType.SHORT_URL_CREATE;

  if (!data) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Short Url</DialogTitle>
          <DialogDescription>Create a short url that redirects to your destination. Enter the URL you want to shorten below.</DialogDescription>
        </DialogHeader>
        <UrlShortenerForm
          className='w-full'
          userId={data.userId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ShortUrlCreateDialog;
