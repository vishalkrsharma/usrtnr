import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const trendVariants = cva('rounded-full flex justify-center items-center gap-2 px-3 py-2', {
  variants: {
    variant: {
      up: 'bg-green-500/20 text-green-500 fill-green-500 stroke-green-500 flex justify-center items-center',
      down: 'bg-red-500/20 text-red-500 fill-red-500 stroke-red-500',
    },
    size: {
      default: 'h-10 w-10 has-[>svg]:px-2',
      sm: 'h-8 w-8 has-[>svg]:px-2',
      lg: 'h-7 w-7 has-[>svg]:px-1',
    },
  },
  defaultVariants: {
    variant: 'up',
    size: 'default',
  },
});

export function Trend({
  className,
  variant,
  size,
  children,
}: {
  className?: string;
  children: ReactNode;
} & VariantProps<typeof trendVariants>) {
  return <div className={cn(trendVariants({ variant, size, className }))}>{children}</div>;
}
