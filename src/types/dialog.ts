export enum EDialogType {
  SHORTURL = 'SHORTURL',
}

export type TDialogStore = {
  type: EDialogType[keyof EDialogType] | null;
  isOpen: boolean;
  dialogData: unknown;
  onOpen: ({ type, dialogData }: { type: EDialogType[keyof EDialogType]; dialogData: unknown }) => void;
  onClose: () => void;
};
