import { addUrlToAccountAction } from '@/actions/url.action';
import DashboardContent from '@/app/(root)/(dashboard)/dashboard/_components/dashboard-content';
import ToastRenderer from '@/components/helper/toast-renderer';

const DashboardPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const shortUrlId = ((await searchParams).shortUrlId as string | undefined) ? BigInt((await searchParams).shortUrlId as string) : undefined;

  if (!shortUrlId) {
    return (
      <main className='w-full'>
        <DashboardContent />
      </main>
    );
  }

  const data = await addUrlToAccountAction({ shortUrlId });

  return (
    <main className='w-full'>
      <ToastRenderer
        message={data.message}
        variant={data?.success ? 'success' : 'error'}
      />
      <DashboardContent />
    </main>
  );
};

export default DashboardPage;
