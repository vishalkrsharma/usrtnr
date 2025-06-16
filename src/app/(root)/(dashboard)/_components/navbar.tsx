import NavLinks from '@/app/(root)/(dashboard)/_components/nav-links';
import ProfileDropdown from '@/app/(root)/(dashboard)/_components/profile-dropdown';
import { Link } from '@/components/ui/link';
import { getSession } from '@/lib/session';

const Navbar = async () => {
  const userData = await getSession();

  return (
    <div className='border-b shadow-2xl fixed w-full bg-background'>
      <div className='container mx-auto px-4'>
        <nav className='h-16 flex justify-between items-center'>
          <Link
            href='/'
            className='font-black text-2xl'
          >
            usrtnr
          </Link>
          <NavLinks />
          <div className='flex justify-end items-center gap-4'>
            <ProfileDropdown userData={userData} />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
