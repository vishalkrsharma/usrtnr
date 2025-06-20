import { default as NextLink } from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const linkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'text-primary underline-offset-4 hover:underline',
        button: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      },
      size: {
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        base: 'h-9 px-4 py-2 has-[>svg]:px-3',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
    },
  }
);

function Link({
  className,
  variant,
  size,
  isLoading = false,
  children,
  asButton = false,
  disabled = false,
  ...props
}: (React.ComponentProps<typeof NextLink> | React.ButtonHTMLAttributes<HTMLButtonElement>) &
  VariantProps<typeof linkVariants> & {
    isLoading?: boolean;
    asButton?: boolean;
    disabled?: boolean;
  }) {
  if (asButton) {
    return (
      <button
        disabled={isLoading || disabled}
        aria-disabled={isLoading || disabled}
        className={cn(linkVariants({ variant, size, className }))}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading ? (
          <span
            className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-transparent
              border-t-current'
            aria-label='Loading'
          ></span>
        ) : (
          children
        )}
      </button>
    );
  } else {
    return (
      <NextLink
        aria-disabled={isLoading || disabled}
        className={cn(linkVariants({ variant, size, className }))}
        {...(props as React.ComponentProps<typeof NextLink>)}
      >
        {isLoading ? (
          <span
            className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-transparent
              border-t-current'
            aria-label='Loading'
          ></span>
        ) : (
          children
        )}
      </NextLink>
    );
  }
}

export { Link, linkVariants };
