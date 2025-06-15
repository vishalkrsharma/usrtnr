'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type TToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

const ToastRenderer = ({ message, variant }: { message: string; variant: TToastVariant }) => {
  useEffect(() => {
    console.log('aaa');
    toast[variant]?.(message) || toast(message);
  }, [message, variant]);

  return null;
};

export default ToastRenderer;
