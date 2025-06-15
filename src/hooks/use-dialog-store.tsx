import { EDialogType, TDialogStore } from '@/types/dialog';
import { create } from 'zustand';

export const useDialogStore = create<TDialogStore>((set) => ({
  type: null,
  isOpen: false,
  dialogData: null,
  onOpen: ({ type, dialogData }: { type: EDialogType[keyof EDialogType]; dialogData?: unknown }) =>
    set({
      type,
      isOpen: true,
      dialogData,
    }),
  onClose: () =>
    set({
      isOpen: false,
      dialogData: null,
    }),
}));
