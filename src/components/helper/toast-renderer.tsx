'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

type TToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

const ToastRenderer = ({ message, variant }: { message: string; variant: TToastVariant }) => {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (message && !hasShownToast.current) {
      hasShownToast.current = true;
      toast[variant]?.(message) || toast(message);
    }

    return () => {
      hasShownToast.current = false;
    };
  }, [message, variant]);

  return null;
};

export default ToastRenderer;
