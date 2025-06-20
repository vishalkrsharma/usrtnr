'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, SortingState } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  limit: number;
  total: number;
}

const URLsTable = <TData, TValue>({ columns, data, page, limit, total }: DataTableProps<TData, TValue>) => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);

  const pageCount = Math.ceil(total / limit);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount,
    state: {
      sorting,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;

      router.push(`?page=${next.pageIndex + 1}&limit=${next.pageSize}`);
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader className='bg-muted'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-24 text-center'
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className='flex items-center justify-between px-4 py-3 flex-wrap gap-2'>
        <div>
          <span className='text-sm text-muted-foreground'>
            Page {page} of {pageCount}
          </span>
        </div>

        <div className='flex flex-wrap gap-1'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => router.push(`?page=${page - 1}&limit=${limit}`)}
            disabled={page <= 1}
          >
            Previous
          </Button>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((pg) => (
            <Button
              key={pg}
              variant={pg === page ? 'default' : 'outline'}
              size='sm'
              onClick={() => router.push(`?page=${pg}&limit=${limit}`)}
            >
              {pg}
            </Button>
          ))}

          <Button
            variant='outline'
            size='sm'
            onClick={() => router.push(`?page=${page + 1}&limit=${limit}`)}
            disabled={page >= pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default URLsTable;
