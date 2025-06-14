import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BoringAvatar from 'boring-avatars';

export function UserAvatar({ src, identifier, size = 40 }: { src?: string; identifier: string; size?: number }) {
  return (
    <Avatar style={{ width: size, height: size }}>
      {src ? (
        <AvatarImage
          src={src}
          alt={identifier}
        />
      ) : (
        <AvatarFallback>
          {/* fallback to boring avatar if src is not provided */}
          <BoringAvatar
            name={identifier}
            variant='beam'
            size={size}
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
