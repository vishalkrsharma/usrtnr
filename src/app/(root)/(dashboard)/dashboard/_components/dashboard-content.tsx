import ShortenUrlButton from '@/app/(root)/(dashboard)/dashboard/_components/shorten-url-button';
import Header from '@/components/helper/header';

const DashboardContent = async () => {
  return (
    <Header
      title='Dashboard'
      action={<ShortenUrlButton />}
    />
  );
};

export default DashboardContent;
