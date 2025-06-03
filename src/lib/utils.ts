import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toBase62({ id }: { id: bigint }): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (id === 0n) return '0';

  let base62 = '';
  const base = 62n;

  while (id > 0n) {
    const remainder = id % base;
    base62 = chars[Number(remainder)] + base62;
    id = id / base;
  }

  return base62;
}
