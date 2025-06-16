import { getAllUrlsByUserId } from '@/actions/url.action';
import AllURLsTable from '@/app/(root)/(dashboard)/urls/_components/urls-table';
import { urlsColumns } from '@/app/(root)/(dashboard)/urls/_components/urls-columns';
import { getSession } from '@/lib/session';

const AllURLsPage = async () => {
  const userData = await getSession();

  const urls = await getAllUrlsByUserId({ userId: userData.id });

  if (!urls.success) {
    throw new Error(urls.message || 'Failed to fetch URLs');
  }

  return (
    <main>
      <AllURLsTable
        data={urls?.data ?? []}
        columns={urlsColumns}
      />
    </main>
  );
};

export default AllURLsPage;
