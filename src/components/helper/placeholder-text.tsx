import { cn } from '@/lib/utils';

const PlaceholderText = ({ text = 'No data found', className }: { text?: string; className?: string }) => {
  return <div className={cn('flex flex-1 justify-center items-center text-muted-foreground text-sm', className)}>{text}</div>;
};

export default PlaceholderText;
