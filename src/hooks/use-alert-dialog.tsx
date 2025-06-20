import { EAlertDialogType, TAlertDialog } from '@/types/alert-dialog';
import { create } from 'zustand';

export const useAlertDialog = create<TAlertDialog>((set) => ({
  type: null,
  isOpen: false,
  alertDialogData: null,

  onOpen: ({ type, alertDialogData }: { type: EAlertDialogType[keyof EAlertDialogType] | null; alertDialogData?: unknown }) =>
    set({
      type,
      isOpen: true,
      alertDialogData,
    }),
  onClose: () =>
    set({
      isOpen: false,
      alertDialogData: null,
    }),
}));
