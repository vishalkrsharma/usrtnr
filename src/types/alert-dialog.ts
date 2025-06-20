export enum EAlertDialogType {
  DELETE_URL = 'DELETE_URL',
}

export type TAlertDialog = {
  type: EAlertDialogType[keyof EAlertDialogType] | null;
  isOpen: boolean;
  alertDialogData: unknown;
  onOpen: ({ type, alertDialogData }: { type: EAlertDialogType[keyof EAlertDialogType] | null; alertDialogData?: unknown }) => void;
  onClose: () => void;
};
