'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePaginationLimit } from '@/hooks/use-pagination-limit';
import { EPaginationLimitKeys } from '@/types/pagination-limit';

const PAGINATION_LIMIT_OPTIONS: Set<number> = new Set([5, 10, 15, 20, 25]);

const PaginationLimitDropdown = ({ limitType }: { limitType: EPaginationLimitKeys }) => {
  const { setLimit, [limitType]: currentLimit } = usePaginationLimit();

  const handleValueChange = (value: string) => {
    setLimit(limitType, parseInt(value));
  };

  return (
    <Select
      value={String(currentLimit)}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className='w-36'>
        <SelectValue placeholder='Page Limit' />
      </SelectTrigger>
      <SelectContent>
        {Array.from(PAGINATION_LIMIT_OPTIONS).map((option) => (
          <SelectItem
            key={option}
            value={String(option)}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PaginationLimitDropdown;
