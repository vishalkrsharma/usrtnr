import { getIPCountryBatchAction } from '@/actions/ip.action';
import PlaceholderText from '@/components/helper/placeholder-text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCountryCountWithFlag } from '@/lib/countries';
import Image from 'next/image';

const UrlAnalyticsVisitsByCountry = async ({ ipAddr }: { ipAddr: string[] }) => {
  const ipAddrData = await getIPCountryBatchAction({ ipAddr });

  const countryList = getCountryCountWithFlag({ data: ipAddrData?.data ?? [] });

  return (
    <Card className='flex-1 min-w-[250px] flex items-stretch flex-col'>
      <CardHeader>
        <CardTitle>Top Visits by Country</CardTitle>
        <CardDescription>Shows the top countries visiting your link, with flags and visit counts.</CardDescription>
      </CardHeader>
      {ipAddrData?.success ? (
        <CardContent className='grid gap-x-8 gap-y-4 grid-cols-2 max-md:grid-cols-1 flex-1'>
          {countryList.length > 0 ? (
            countryList.map((item) => (
              <div
                className='flex justify-between items-center gap-4'
                key={item.alpha3}
              >
                <div className='flex justify-start items-center gap-4'>
                  <Image
                    src={item.flag}
                    alt={item.alpha3}
                    height={30}
                    width={30}
                    className='rounded-full aspect-square object-cover'
                  />

                  <div
                    className='truncate text-ellipsis'
                    title={`${item.countryName} (${item.alpha3})`}
                  >
                    {item.countryName} (${item.alpha3})
                  </div>
                </div>
                <div className='text-lg font-semibold'>{item.count}</div>
              </div>
            ))
          ) : (
            <PlaceholderText className='col-span-2 max-md:col-span-1' />
          )}
        </CardContent>
      ) : (
        <PlaceholderText text={ipAddrData?.error?.message ?? ipAddrData.message} />
      )}
    </Card>
  );
};

export default UrlAnalyticsVisitsByCountry;
