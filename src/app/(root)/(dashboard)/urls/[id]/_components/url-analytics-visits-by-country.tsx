import { getIPCountryBatchAction } from '@/actions/ip.action';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCountryCountWithFlag } from '@/lib/countries';
import Image from 'next/image';

const UrlAnalyticsVisitsByCountry = async ({ ipAddr }: { ipAddr: string[] }) => {
  const ipAddrData = await getIPCountryBatchAction({ ipAddr });

  if (!ipAddrData?.success) {
    return null;
  }

  const countryList = getCountryCountWithFlag({ data: ipAddrData?.data ?? [] });

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle>Top Visits by Country</CardTitle>
        <CardDescription>Shows the top countries visiting your link, with flags and visit counts.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4 grid-cols-2'>
        {countryList.map((item) => (
          <div
            className='flex justify-between items-center gap-4'
            key={item.alpha3}
          >
            <div className='flex justify-start items-center gap-4'>
              <Image
                src={item.flag}
                alt={item.alpha3}
                height={40}
                width={40}
                className='rounded-full aspect-square object-cover'
              />
              <span>
                {item.countryName} ({item.alpha3})
              </span>
            </div>
            <div className='text-lg font-semibold'>{item.count}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UrlAnalyticsVisitsByCountry;
