import ShortenUrlButton from '@/app/(root)/(dashboard)/dashboard/_components/shorten-url-button';
import Header from '@/components/helper/header';
import { getSession } from '@/lib/session';

const DashboardContent = async () => {
  const userData = await getSession();
  return (
    <>
      <Header
        title='Dashboard'
        action={<ShortenUrlButton userId={userData.id} />}
      />
    </>
  );
};

export default DashboardContent;
