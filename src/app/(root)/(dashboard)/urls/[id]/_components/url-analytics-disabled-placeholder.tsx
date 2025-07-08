'use client';

import { toggleUrlAnalyticsAction } from '@/actions/url.action';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const UrlAnalyticsDisabledPlaceholder = ({ id, doAnalyze }: { id: string; doAnalyze: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  const turnOnAnalysis = async () => {
    setIsLoading(true);
    const res = await toggleUrlAnalyticsAction({ id, doAnalyze: !doAnalyze });
    setIsLoading(false);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message || 'An error occurred while toggling the URL analytics', {
        action: {
          label: 'Retry',
          onClick: () => {
            turnOnAnalysis();
          },
        },
      });
    }
  };

  return (
    <section className='flex-1 flex flex-col justify-center items-center gap-8'>
      <div>Analytics is currently disabled for this url.</div>
      <Button
        size='lg'
        onClick={turnOnAnalysis}
        isLoading={isLoading}
        className='w-56 text-lg'
      >
        Turn on Analysis
      </Button>
    </section>
  );
};

export default UrlAnalyticsDisabledPlaceholder;
