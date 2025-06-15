import { addUrlToAccountAction } from '@/actions/url.action';
import Header from '@/app/(root)/dashboard/_components/header';
import ToastRenderer from '@/components/helper/toast-renderer';

const DashboardPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const shortUrlId = ((await searchParams).shortUrlId as string | undefined) ? BigInt((await searchParams).shortUrlId as string) : undefined;
  let data;

  if (!shortUrlId) {
    return (
      <main className='w-full'>
        <Header title='Dashboard' />
      </main>
    );
  }

  data = await addUrlToAccountAction({ shortUrlId });

  return (
    <main className='w-full'>
      <ToastRenderer
        message={data.message}
        variant={data?.success ? 'success' : 'error'}
      />
      <Header title='Dashboard' />
    </main>
  );
};

export default DashboardPage;
