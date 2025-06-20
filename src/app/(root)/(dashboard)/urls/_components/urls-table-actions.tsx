import { Url } from '@/generated/prisma';
import { Row } from '@tanstack/react-table';
import { ExternalLink, Trash, View } from 'lucide-react';
import { Link } from '@/components/ui/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useAlertDialog } from '@/hooks/use-alert-dialog';
import { EAlertDialogType } from '@/types/alert-dialog';

const UrlsTableActions = ({ row }: { row: Row<Url> }) => {
  const { onOpen } = useAlertDialog();

  return (
    <div className='flex justify-start items-center gap-2'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            variant='outline'
            size='icon'
            className='rounded-full'
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/${row.getValue('shortRoute')}`}
          >
            <ExternalLink />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Visit Link</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            variant='outline'
            size='icon'
            className='rounded-full'
            href={`/urls/${row.original.id}`}
          >
            <View />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='destructive'
            size='icon'
            className='rounded-full'
            onClick={() =>
              onOpen({
                type: EAlertDialogType.DELETE_URL,
                alertDialogData: row.original,
              })
            }
          >
            <Trash />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default UrlsTableActions;
