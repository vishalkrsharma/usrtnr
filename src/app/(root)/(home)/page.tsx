import Header from '@/app/(root)/(home)/_components/header';
import Utils from '@/app/(root)/(home)/_components/utils';
import UrlShortenerForm from '@/components/forms/url-shortener-form';

const HomePage = () => {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-16'>
      <Utils />
      <Header />
      <UrlShortenerForm />
      <div className='flex-1' />
    </main>
  );
};

export default HomePage;
