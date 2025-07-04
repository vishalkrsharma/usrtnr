import UrlAnalyticsToggle from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-toggle';
import { Analytics, Url } from '@/generated/prisma';

const UrlAnalytics = ({ url, analytics }: { url: Url; analytics: Analytics[] }) => {
  console.log(analytics);
  return (
    <main>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold'>Analytics</h2>
        <UrlAnalyticsToggle
          id={url.id}
          doAnalyzeValue={url.doAnalyze}
        />
      </div>
    </main>
  );
};

export default UrlAnalytics;
