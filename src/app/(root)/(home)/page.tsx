import Header from '@/app/(root)/(home)/_components/header';
import UrlShortenerForm from '@/components/forms/url-shortener-form';

export default function HomePage() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-16'>
      <Header />
      <UrlShortenerForm />
      <div className='flex-1' />
    </main>
  );
}
