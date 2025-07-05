'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Url } from '@/generated/prisma';
import { useAlertDialog } from '@/hooks/use-alert-dialog';
import { EAlertDialogType } from '@/types/alert-dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { deleteUrlByIdAction } from '@/actions/url.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const DeleteUrlAlertDialog = () => {
  const { type, isOpen, alertDialogData, onClose } = useAlertDialog();
  const url = alertDialogData as Url;
  const router = useRouter();

  const formSchema = z.object({
    shortRoute: z.string({ required_error: 'Short route is required' }).refine((val) => val === url.shortRoute, {
      message: 'Short route does not match. Please type the exact short route to confirm.',
    }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { shortRoute: '' },
  });

  const close = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: FormSchemaType) => {
    const res = await deleteUrlByIdAction({
      id: url.id,
    });

    if (res.success) {
      toast(res.message);
      router.refresh();
      close();
    } else {
      toast.error(res.error?.message || 'An error occurred while deleting the URL', {
        action: {
          label: 'Retry',
          onClick: () => {
            onSubmit(values);
          },
        },
      });
    }
  };

  if (!url) return null;

  return (
    <AlertDialog
      open={isOpen && type === EAlertDialogType.DELETE_URL}
      onOpenChange={close}
    >
      <AlertDialogContent className='w-[600px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the url <strong className='bg-muted py-0.5 px-2 rounded-md'>{url.originalUrl}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your short url{' '}
            <strong className='bg-muted py-0.5 px-2 rounded-md'>{url.shortRoute}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='shortRoute'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter the short route</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='******'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                type='button'
                onClick={close}
                className='w-24'
              >
                Cancel
              </AlertDialogCancel>

              <Button
                type='submit'
                variant='destructive'
                isLoading={form.formState.isSubmitting}
                className='text-destructive-foreground w-24'
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUrlAlertDialog;
