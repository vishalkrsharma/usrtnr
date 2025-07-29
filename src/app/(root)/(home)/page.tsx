import Header from '@/app/(root)/(home)/_components/header';
import Utils from '@/app/(root)/(home)/_components/utils';
import UrlShortenerForm from '@/components/form/url-shortener-form';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { checkSession } from '@/lib/session';

const HomePage = async () => {
  const session = await checkSession();

  console.log(session);

  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-4 relative z-0'>
      <Utils />
      <Header />
      <UrlShortenerForm
        className='max-md:px-4'
        showCreateAccountButton={!session?.id}
      />
      <BackgroundBeams className='-z-10' />
      <ModeToggle className='absolute bottom-4 right-4' />
    </main>
  );
};

export default HomePage;
