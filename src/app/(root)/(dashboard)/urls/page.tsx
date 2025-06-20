import { getAllUrlsByUserId } from '@/actions/url.action';
import AllURLsTable from '@/app/(root)/(dashboard)/urls/_components/urls-table';
import { urlsColumns } from '@/app/(root)/(dashboard)/urls/_components/urls-columns';
import { getSession } from '@/lib/session';

const AllURLsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const userData = await getSession();

  const { page, limit } = await searchParams;

  const urls = await getAllUrlsByUserId({ userId: userData.id, page: Number(page) || 1, limit: Number(limit) || 5 });

  if (!urls.success) {
    throw new Error(urls.message || 'Failed to fetch URLs');
  }

  return (
    <AllURLsTable
      data={urls?.data?.urls ?? []}
      columns={urlsColumns}
      page={Number(page) || 1}
      limit={Number(limit) || 10}
      total={urls?.data?.total || 0}
    />
  );
};

export default AllURLsPage;
