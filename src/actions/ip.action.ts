import { TIPAddrRes, TResponse } from '@/types/global';
import { cache } from 'react';

export const getIPCountryBatchAction = cache(async ({ ipAddr }: { ipAddr: string[] }): Promise<TResponse<TIPAddrRes[]>> => {
  try {
    const res = await fetch('http://ip-api.com/batch?fields=8194', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ipAddr),
    });
    const data: TIPAddrRes[] = await res.json();

    return {
      success: true,
      data: data.filter((item) => item.countryCode !== null),
      message: 'Countries grouped by count',
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error as Error,
      data: null,
      message: 'Failed to fetch IP country data',
    };
  }
});
