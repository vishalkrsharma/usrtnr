import NavLinks from '@/app/(root)/(dashboard)/_components/nav-links';
import ProfileDropdown from '@/app/(root)/(dashboard)/_components/profile-dropdown';
import { Link } from '@/components/ui/link';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { getSession } from '@/lib/session';

const Navbar = async () => {
  const userData = await getSession();

  return (
    <div className='border-b shadow-2xl fixed w-full bg-background z-50'>
      <div className='container mx-auto px-4'>
        <nav className='h-16 flex justify-between items-center'>
          <div className='flex-1'>
            <Link
              href='/'
              className='font-black text-2xl px-0'
            >
              usrtnr
            </Link>
          </div>
          <NavLinks />
          <div className='flex justify-end items-center gap-4 flex-1'>
            <ModeToggle />
            <ProfileDropdown userData={userData} />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
