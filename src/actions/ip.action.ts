import { TResponse } from '@/types/global';
import countries from '@/constants/countries.json';

export const getIPCountryBatchAction = async ({ ipAddr }: { ipAddr: string[] }): Promise<TResponse<Record<string, number>>> => {
  try {
    const res = await fetch('http://ip-api.com/batch?fields=8194', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ipAddr),
    });
    const data = await res.json();

    // Map 2-letter country codes to 3-letter codes using countries.json
    const alpha2to3: Record<string, { alpha3: string; name: string }> = {};
    countries.forEach((c) => {
      alpha2to3[c.alpha2] = { alpha3: c.alpha3, name: c.name };
    });

    // Count occurrences and build Record<string, number> directly
    const counts: Record<string, number> = {};
    data.forEach((item: Record<string, string>) => {
      const countryInfo = alpha2to3[item.countryCode];
      if (!countryInfo) return;
      counts[countryInfo.alpha3] = (counts[countryInfo.alpha3] || 0) + 1;
    });

    return {
      success: true,
      data: counts,
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
};
