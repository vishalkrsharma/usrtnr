import UrlShortenerForm from '@/components/forms/url-shortener-form';

export default function HomePage() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-4'>
      <UrlShortenerForm />
    </main>
  );
}
