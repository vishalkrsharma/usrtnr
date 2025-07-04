import { getUrlById } from '@/actions/url.action';
import UrlAnalytics from '@/app/(root)/(dashboard)/urls/[id]/_components/url-analytics';
import Urlheader from '@/app/(root)/(dashboard)/urls/[id]/_components/url-header';
import { Separator } from '@/components/ui/separator';
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

  console.log(url.data.url);

  return (
    <main className='space-y-4'>
      <Urlheader url={url?.data?.url} />
      <Separator />
      <UrlAnalytics
        url={url?.data?.url}
        analytics={url?.data?.analytics}
      />
    </main>
  );
};

export default UrlPage;
