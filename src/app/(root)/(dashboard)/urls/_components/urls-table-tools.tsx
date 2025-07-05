'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ShortenUrlButton from '@/app/(root)/(dashboard)/dashboard/_components/shorten-url-button';

const UrlsTableTools = ({ query = '' }: { query?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(query);
  const [debouncedValue] = useDebounce(value, 400);

  const clearQuery = () => {
    setValue('');
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('query');
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (debouncedValue) {
      params.set('query', debouncedValue);
    } else {
      params.delete('query');
    }
    router.push(`?${params.toString()}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className='flex justify-center items-center gap-4'>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Search URLs...'
        containerClassName='flex-1'
        rightElement={
          <Button
            variant='destructive'
            size='icon'
            onClick={clearQuery}
          >
            <X />
          </Button>
        }
      />
      <ShortenUrlButton />
    </div>
  );
};

export default UrlsTableTools;
