import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDialog } from '@/hooks/use-dialog';
import { EDialogType } from '@/types/dialog';

const ProfileDialog = () => {
  const { type, isOpen, onClose } = useDialog();

  const open = isOpen && type === EDialogType.PROFILE;
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
