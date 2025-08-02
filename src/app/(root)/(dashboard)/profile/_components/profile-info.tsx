import EditProfileButton from '@/app/(root)/(dashboard)/profile/_components/edit-profile-button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { getSession } from '@/lib/session';

const ProfileInfo = async () => {
  const session = await getSession();

  return (
    <section className='flex flex-col items-stretch'>
      <div className='flex flex-col justify-start items-center gap-4 relative'>
        <UserAvatar
          identifier={session.name || session.email}
          size={150}
        />
        <div className='space-y-2 text-center'>
          <h3 className='font-semibold text-3xl'>{session.name}</h3>
          <span className='text-muted-foreground'>{session.email}</span>
        </div>
        <EditProfileButton className='absolute top-0 right-0' />
      </div>
    </section>
  );
};

export default ProfileInfo;
