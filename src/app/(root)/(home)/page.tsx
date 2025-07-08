import Header from '@/app/(root)/(home)/_components/header';
import Utils from '@/app/(root)/(home)/_components/utils';
import UrlShortenerForm from '@/components/forms/url-shortener-form';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { checkSession } from '@/lib/session';

const HomePage = async () => {
  const userData = await checkSession();

  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-4 relative z-0'>
      <Utils />
      <Header />
      <UrlShortenerForm
        className='max-md:px-4'
        showCreateAccountButton={!!userData?.id}
      />
      <BackgroundBeams className='-z-10' />
      <ModeToggle className='absolute bottom-4 right-4' />
    </main>
  );
};

export default HomePage;
