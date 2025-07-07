import countries from '@/constants/countries.json';

export const getCountryCount = ({ data }: { data: Record<string, string>[] }): Record<string, number> => {
  const alpha2to3: Record<string, { alpha3: string; name: string }> = {};
  countries.forEach((c) => {
    alpha2to3[c.alpha2] = { alpha3: c.alpha3, name: c.name };
  });

  const counts: Record<string, number> = {};
  data.forEach((item: Record<string, string>) => {
    const countryInfo = alpha2to3[item.countryCode];
    if (!countryInfo) return;
    counts[countryInfo.alpha3] = (counts[countryInfo.alpha3] || 0) + 1;
  });

  return counts;
};

export interface CountryCountWithFlag {
  countryCode: string;
  countryName: string;
  alpha3: string;
  count: number;
  flag: string;
}

export const getCountryCountWithFlag = ({ data }: { data: Record<string, string>[] }): CountryCountWithFlag[] => {
  const alpha2to3: Record<string, { alpha3: string; name: string }> = {};
  countries.forEach((c) => {
    alpha2to3[c.alpha2] = { alpha3: c.alpha3, name: c.name };
  });

  const counts = new Map<string, number>();

  data.forEach((item) => {
    const code = item.countryCode;
    if (!code) return;
    counts.set(code, (counts.get(code) || 0) + 1);
  });

  const result: CountryCountWithFlag[] = [];
  counts.forEach((count, code) => {
    const countryInfo = alpha2to3[code];
    if (!countryInfo) return;
    result.push({
      countryCode: code,
      countryName: countryInfo.name,
      alpha3: countryInfo.alpha3,
      count,
      flag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
    });
  });

  // Sort by count descending
  result.sort((a, b) => b.count - a.count);
  return result;
};
