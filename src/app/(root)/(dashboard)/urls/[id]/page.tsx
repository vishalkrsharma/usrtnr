import { getUrlById } from '@/actions/url.action';
import UrlAnalytics from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics';
import UrlAnalyticsHeatMap from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics-heat-map';
import Urlheader from '@/app/(root)/(dashboard)/urls/[id]/_components/url-header';
import { notFound } from 'next/navigation';

const UrlPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const url = await getUrlById({ id: BigInt(id) });

  if (!url.success || !url.data || !url.data.url) {
    notFound();
  }

  if (!url.success) {
    throw new Error(url.error?.message || 'Failed to fetch URL');
  }

  return (
    <main className='space-y-8 flex-1 flex flex-col items-stretch'>
      <Urlheader url={url?.data?.url} />
      <UrlAnalytics
        url={url?.data?.url}
        analytics={url?.data?.analytics}
      />
      <UrlAnalyticsHeatMap analytics={url?.data?.analytics} />
    </main>
  );
};

export default UrlPage;
