'use client';

import { signoutAction } from '@/actions/user.action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/ui/user-avatar';
import { User } from 'better-auth';

import { useRouter } from 'next/navigation';

const ProfileDropdown = ({ session }: { session: User }) => {
  const router = useRouter();

  const signout = async () => {
    await signoutAction();
    router.push('/auth/signin');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar identifier={session.name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={signout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
