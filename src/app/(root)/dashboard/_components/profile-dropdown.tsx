'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/ui/user-avatar';
import { clearSession } from '@/lib/session';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const ProfileDropdown = ({ userData }: { userData: User }) => {
  const router = useRouter();

  const logout = async () => {
    await clearSession();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar identifier={userData.user_metadata.email} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
