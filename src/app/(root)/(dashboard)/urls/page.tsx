import UrlsTable from '@/app/(root)/(dashboard)/urls/_components/urls-table';
import SearchURLs from '@/app/(root)/(dashboard)/urls/_components/urls-table-tools';

const AllURLsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const { page, limit, query } = await searchParams;

  return (
    <main className='space-y-8'>
      <SearchURLs query={query as string} />
      <UrlsTable
        page={page as string}
        limit={limit as string}
        query={query as string}
      />
    </main>
  );
};

export default AllURLsPage;
