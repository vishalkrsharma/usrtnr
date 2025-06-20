export enum EDialogType {
  SHORT_URL = 'SHORT_URL',
  SHORT_URL_CREATE = 'SHORT_URL_CREATE',
}

export type TDialog = {
  type: EDialogType[keyof EDialogType] | null;
  isOpen: boolean;
  dialogData: unknown;
  onOpen: ({ type, dialogData }: { type: EDialogType[keyof EDialogType]; dialogData?: unknown }) => void;
  onClose: () => void;
};
