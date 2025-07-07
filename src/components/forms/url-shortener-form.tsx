'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CircleAlert, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { urlShortenerAction } from '@/actions/url.action';
import { useDialog } from '@/hooks/use-dialog';
import { EDialogType } from '@/types/dialog';
import { useAutoTooltip } from '@/hooks/use-auto-tooltip';
import { toast } from 'sonner';

const formSchema = z.object({
  url: z
    .string()
    .min(1, {
      message: 'URL is required',
    })
    .url({
      message: 'Invalid URL format',
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function UrlShortenerForm({ className, showCreateAccountButton = false }: { className?: string; showCreateAccountButton?: boolean }) {
  const { onOpen } = useDialog();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const { isTooltipOpen, setIsTooltipOpen } = useAutoTooltip(!!form.formState.errors.url);

  const onSubmit = async (values: FormSchemaType) => {
    const res = await urlShortenerAction({ ...values });

    if (res.success) {
      onOpen({
        type: EDialogType.SHORT_URL,
        dialogData: { data: res.data, showCreateAccountButton },
      });
    } else {
      toast.error(res.error?.message || 'An error occurred while creating the short URL', {
        action: {
          label: 'Retry',
          onClick: () => {
            onSubmit(values);
          },
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-2/3 max-md:w-full max-w-[800px] flex-1', className)}
      >
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='https://website.com'
                  className='py-7 px-6 pr-12 w-full rounded-3xl'
                  rightElementClassName='right-4'
                  rightElement={
                    form.formState.errors.url ? (
                      <Tooltip
                        open={isTooltipOpen}
                        onOpenChange={setIsTooltipOpen}
                      >
                        <TooltipTrigger>
                          <Badge
                            variant='destructive'
                            className='rounded-full aspect-square [&>svg]:size-5 text-destructive-foreground'
                          >
                            <CircleAlert />
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent
                          className={cn('', form.formState.errors.url ? 'bg-destructive text-destructive-foreground' : null)}
                          tooltipArrowClassName={cn('', form.formState.errors.url ? 'bg-destructive fill-destructive' : null)}
                        >
                          <p>{form.formState.errors.url.message}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button
                        size='icon'
                        variant='default'
                        type='submit'
                        className='rounded-full'
                        isLoading={form.formState.isSubmitting}
                      >
                        <Send />
                      </Button>
                    )
                  }
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
