import { getAllUrlsByUserId } from '@/actions/url.action';
import { urlsColumns } from '@/app/(root)/(dashboard)/urls/_components/urls-columns';
import UrlsDataTable from '@/app/(root)/(dashboard)/urls/_components/urls-data-table';

const UrlsTable = async ({ page = '1', limit = '5', query, userId }: { page?: string; limit?: string; query?: string; userId: string }) => {
  const urls = await getAllUrlsByUserId({ userId, page: Number(page), limit: Number(limit), query: query as string });

  if (!urls.success) {
    throw new Error(urls.message || 'Failed to fetch URLs');
  }

  return (
    <UrlsDataTable
      data={urls?.data?.urls ?? []}
      columns={urlsColumns}
      page={Number(page) || 1}
      limit={Number(limit) || 10}
      total={urls?.data?.total || 0}
    />
  );
};

export default UrlsTable;
