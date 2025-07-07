'use client';

import { toggleUrlAnalyticsAction } from '@/actions/url.action';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useOptimistic, startTransition } from 'react';

const UrlAnalyticsToggle = ({ id, doAnalyzeValue }: { id: bigint; doAnalyzeValue: boolean }) => {
  const [checked, setChecked] = useOptimistic(doAnalyzeValue);
  const onToggle = async () => {
    startTransition(() => {
      setChecked((prev) => !prev);
    });
    const res = await toggleUrlAnalyticsAction({ id, doAnalyze: !checked });
    if (res.success) {
      toast.success(res.message);
    } else {
      startTransition(() => {
        setChecked((prev) => !prev);
      });
      toast.error(res.message || 'An error occurred while toggling the URL analytics', {
        action: {
          label: 'Retry',
          onClick: () => {
            onToggle();
          },
        },
      });
    }
  };

  return (
    <div className='md:border rounded-md px-3 py-2 flex justify-center items-center gap-4'>
      <span className='text-sm text-muted-foreground max-md:hidden'>Toggle Analytics for this url</span>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
      />
    </div>
  );
};

export default UrlAnalyticsToggle;
