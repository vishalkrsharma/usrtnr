import UrlAnalyticsDisabledPlaceholder from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-disabled-placeholder';
import UrlAnalyticsToggle from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-toggle';
import { Analytics, Url } from '@/generated/prisma';

const UrlAnalytics = ({ url, analytics }: { url: Url; analytics: Analytics[] }) => {
  console.log(analytics);
  return (
    <main className='flex flex-col flex-1 gap-8'>
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
    </main>
  );
};

export default UrlAnalytics;
