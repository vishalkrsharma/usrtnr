'use client';

import { Button } from '@/components/ui/button';
import { Url } from '@/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { SortIcon } from '@/components/helper/sort-icon';
import AnalyzeStatusBadge from '@/components/helper/analyze-status-badge';
import UrlsTableActions from '@/app/(root)/(dashboard)/urls/_components/urls-table-actions';

export const urlsColumns: ColumnDef<Url>[] = [
  {
    header: '#',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'originalUrl',
    header: ({ column }) => (
      <div className='flex justify-start items-center gap-2'>
        <span>Original URL</span>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <SortIcon isSorted={column.getIsSorted()} />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: 'shortRoute',
    header: ({ column }) => (
      <div className='flex justify-start items-center gap-2'>
        <span>Short Route</span>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <SortIcon isSorted={column.getIsSorted()} />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: 'doAnalyze',
    header: 'Analysis Status',
    cell: ({ row }) => <AnalyzeStatusBadge doAnalyze={row.getValue('doAnalyze')} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <div className='flex justify-start items-center gap-2'>
        <span>Created At</span>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <SortIcon isSorted={column.getIsSorted()} />
        </Button>
      </div>
    ),
    cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'MMM dd, yyyy HH:mm'),
  },
  {
    header: 'Actions',
    cell: ({ row }) => <UrlsTableActions row={row} />,
  },
];
