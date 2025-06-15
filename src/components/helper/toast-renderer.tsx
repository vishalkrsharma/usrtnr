'use client';

import { TToastVariant } from '@/types/toast';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ToastRenderer = ({ message, variant }: { message: string; variant: TToastVariant }) => {
  useEffect(() => {
    if (message) {
      if (variant in toast) {
        (toast[variant] as (message: string) => void)(message);
      } else {
        toast(message);
      }
    }
  }, [message, variant]);

  return null;
};

export default ToastRenderer;
