import ShortenUrlButton from '@/app/(root)/(dashboard)/dashboard/_components/shorten-url-button';
import Header from '@/components/helper/header';
import UnderDevelopment from '@/components/helper/under-development';

const DashboardContent = async () => {
  return (
    <main className='flex flex-1 flex-col items-stretch'>
      <Header
        title='Dashboard'
        action={<ShortenUrlButton />}
      />
      <UnderDevelopment
        buttonTitle='Head over to Urls Page!!'
        buttonHref='/urls'
      />
    </main>
  );
};

export default DashboardContent;
