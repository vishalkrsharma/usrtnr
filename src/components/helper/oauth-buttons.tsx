'use client';

import { socialSigninAction } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { OAUTH_BUTTONS } from '@/constants/oauth-buttons';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface OAuthButtonsProps {
  callbackUrl?: string;
}

const OAuthButtons = ({ callbackUrl }: OAuthButtonsProps) => {
  const router = useRouter();
  const onSubmit = async ({ provider }: { provider: string }) => {
    const res = await socialSigninAction({ provider, callbackUrl });

    if (res.success) {
      router.push(res.data?.url || '');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='flex flex-wrap justify-stretch items-center gap-4'>
      {OAUTH_BUTTONS.map((button) => (
        <Button
          key={button.icon}
          type='submit'
          size='lg'
          variant='outline'
          className="flex-1 [&_svg:not([class*='size-'])]:size-6 h-full py-2"
          onClick={() => onSubmit({ provider: button.name })}
        >
          <Icon icon={button.icon} />
          <span className='sr-only'>{button.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default OAuthButtons;
