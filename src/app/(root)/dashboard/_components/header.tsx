import ShortenUrlButton from '@/app/(root)/dashboard/_components/shorten-url-button';
import { getSession } from '@/lib/session';

const Header = async ({ title }: { title: string }) => {
  const userData = await getSession();

  return (
    <div className='flex justify-between items-center gap-4'>
      <h2>{title}</h2>
      <ShortenUrlButton userId={userData.id} />
    </div>
  );
};

export default Header;
