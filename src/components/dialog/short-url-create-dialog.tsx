'use client';

import { useDialog } from '@/hooks/use-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EDialogType } from '@/types/dialog';
import UrlShortenerForm from '@/components/form/url-shortener-form';

const ShortUrlCreateDialog = () => {
  const { type, isOpen, onClose } = useDialog();

  const open = isOpen && type === EDialogType.SHORT_URL_CREATE;

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
        <UrlShortenerForm className='w-full' />
      </DialogContent>
    </Dialog>
  );
};

export default ShortUrlCreateDialog;
