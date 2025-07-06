import { getIPCountryBatchAction } from '@/actions/ip.action';
import WorldHeatMapChart from '@/components/helper/world-heat-map-chart';
import { Analytics } from '@/generated/prisma';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const UrlAnalyticsHeatMap = async ({ analytics }: { analytics: Analytics[] }) => {
  const ipAddr = await getIPCountryBatchAction({
    ipAddr: analytics.map((item) => item.ip).filter((ip): ip is string => ip !== null),
  });

  if (!ipAddr.success) {
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
      <CardContent>
        <WorldHeatMapChart data={ipAddr?.data ?? {}} />
      </CardContent>
      <CardFooter className='text-muted-foreground'>Hover over a country to see visit details.</CardFooter>
    </Card>
  );
};

export default UrlAnalyticsHeatMap;
