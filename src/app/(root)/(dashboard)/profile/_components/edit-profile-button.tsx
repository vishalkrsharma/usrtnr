import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';

const EditProfileButton = ({ className }: { className?: string }) => {
  return (
    <div className={cn('', className)}>
      <Button
        size='icon'
        className='rounded-full'
      >
        <span className='sr-only'>Edit Profile</span>
        <Pencil />
      </Button>
    </div>
  );
};

export default EditProfileButton;
