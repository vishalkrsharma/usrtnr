export type TPaginationLimit = {
  [EPaginationLimitKeys.URLS_TABLE]?: number;
  setLimit: (key: EPaginationLimitKeys, value: number) => void;
};

export enum EPaginationLimitKeys {
  URLS_TABLE = 'URLS_TABLE',
}
