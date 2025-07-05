import { TPaginationLimit, EPaginationLimitKeys } from '@/types/pagination-limit';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePaginationLimit = create<TPaginationLimit>()(
  persist(
    (set) => ({
      [EPaginationLimitKeys.URLS_TABLE]: 10,
      setLimit: (key, value) =>
        set((state) => ({
          ...state,
          [key]: value,
        })),
    }),
    {
      name: 'pagination-limit-storage',
      partialize: (state) => ({
        [EPaginationLimitKeys.URLS_TABLE]: state[EPaginationLimitKeys.URLS_TABLE],
      }),
    }
  )
);
