import { getIPCountryBatchAction } from '@/actions/ip.action';
import PlaceholderText from '@/components/helper/placeholder-text';
import WorldHeatMapChart from '@/components/helper/world-heat-map-chart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { getCountryCount } from '@/lib/countries';

const UrlAnalyticsHeatMap = async ({ ipAddr }: { ipAddr: string[] }) => {
  const ipAddrData = await getIPCountryBatchAction({ ipAddr });

  if (!ipAddrData?.success) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Analytics</CardTitle>
        <CardDescription>
          Visualize where your link is being accessed from around the world. Each country is highlighted based on visit frequency.
        </CardDescription>
      </CardHeader>
      {ipAddrData?.success ? (
        <>
          <CardContent>
            <WorldHeatMapChart data={getCountryCount({ data: ipAddrData?.data ?? [] })} />
          </CardContent>
          <CardFooter className='text-muted-foreground'>Hover over a country to see visit details.</CardFooter>
        </>
      ) : (
        <PlaceholderText text={ipAddrData?.error?.message ?? ipAddrData.message} />
      )}
    </Card>
  );
};

export default UrlAnalyticsHeatMap;
