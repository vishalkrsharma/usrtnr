import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SortIconProps {
  isSorted: false | 'asc' | 'desc';
}

export const SortIcon = ({ isSorted }: SortIconProps) => {
  if (isSorted === 'asc') {
    return <ArrowUp className='h-4 w-4' />;
  }
  if (isSorted === 'desc') {
    return <ArrowDown className='h-4 w-4' />;
  }
  return <ArrowUpDown className='h-4 w-4' />;
};
