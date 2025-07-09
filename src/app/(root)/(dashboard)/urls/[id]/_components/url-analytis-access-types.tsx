import UrlAnalyticsAccessPieChart from '@/app/(root)/(dashboard)/urls/[id]/_components/url-anaytics-access-pie-chart';
import { Analytics } from '@/generated/prisma';
import { groupFetchFieldValues } from '@/lib/analytics';

const UrlAnalytisAccessChart = ({ analytics }: { analytics: Analytics[] }) => {
  const fetchModeChartData = groupFetchFieldValues({ analytics, fieldName: 'fetchMode' });
  const fetchSiteChartData = groupFetchFieldValues({ analytics, fieldName: 'fetchSite' });
  const fetchDestChartData = groupFetchFieldValues({ analytics, fieldName: 'fetchDest' });

  return (
    <div className='flex max-md:flex-col justify-stretch items-stretch gap-4 min-h-[350px]'>
      <UrlAnalyticsAccessPieChart
        title='Fetch Mode Chart'
        description='Distribution of requests by fetch mode header.'
        chartData={fetchModeChartData}
      />
      <UrlAnalyticsAccessPieChart
        title='Fetch Site Chart'
        description='Breakdown of requests by fetch site header.'
        chartData={fetchSiteChartData}
      />
      <UrlAnalyticsAccessPieChart
        title='Fetch Dest Chart'
        description='Requests grouped by fetch destination header.'
        chartData={fetchDestChartData}
      />
    </div>
  );
};

export default UrlAnalytisAccessChart;
