import UrlAnalyticsBrowserChart from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-browser-chart';
import UrlAnalyticsDisabledPlaceholder from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-disabled-placeholder';
import UrlAnalyticsHeatMap from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-heat-map';
import UrlAnalyticsToggle from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-toggle';
import UrlAnalyticsVisitsByCountry from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-visits-by-country';
import UrlAnalytisAccessChart from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytis-access-types';
import UrlVisits from '@/app/(root)/(dashboard)/urls/[id]/_components/url-visits';
import { Analytics, Url } from '@/generated/prisma';

const UrlAnalytics = ({ url, analytics }: { url: Url; analytics: Analytics[] }) => {
  const ipAddr = analytics.map((item) => item.ip).filter((ip): ip is string => ip !== null);

  return (
    <main className='flex flex-col flex-1 gap-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold text-muted-foreground'>Analytics</h2>
        {url.doAnalyze ? (
          <UrlAnalyticsToggle
            id={url.id}
            doAnalyzeValue={url.doAnalyze}
          />
        ) : null}
      </div>
      {!url.doAnalyze ? (
        <UrlAnalyticsDisabledPlaceholder
          id={url.id}
          doAnalyze={url.doAnalyze}
        />
      ) : null}
      <div className='flex justify-start items-stretch gap-4 flex-wrap'>
        <UrlVisits analytics={analytics} />
      </div>
      <div className='flex justify-start items-stretch gap-4 flex-wrap'>
        <UrlAnalyticsBrowserChart analytics={analytics} />
        <UrlAnalyticsVisitsByCountry ipAddr={ipAddr} />
      </div>
      <UrlAnalytisAccessChart analytics={analytics} />
      <UrlAnalyticsHeatMap ipAddr={ipAddr} />
    </main>
  );
};

export default UrlAnalytics;
