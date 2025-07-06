import Header from '@/app/(root)/(home)/_components/header';
import Utils from '@/app/(root)/(home)/_components/utils';
import UrlShortenerForm from '@/components/forms/url-shortener-form';
import { BackgroundBeams } from '@/components/ui/background-beams';

const HomePage = () => {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-4'>
      <Utils />
      <Header />
      <UrlShortenerForm />

      <BackgroundBeams />
    </main>
  );
};

export default HomePage;
