// Helper function for division + remainder
function divmod(numStr: string, divisor: number): { quotient: string; remainder: number } {
  let quotient = '';
  let remainder = 0;
  for (let i = 0; i < numStr.length; i++) {
    const digit = Number(numStr[i]);
    const acc = remainder * 10 + digit;
    const q = Math.floor(acc / divisor);
    remainder = acc % divisor;
    if (!(quotient === '' && q === 0)) {
      quotient += q.toString();
    }
  }
  return { quotient: quotient === '' ? '0' : quotient, remainder };
}

// Converts a decimal string to base62
export function toBase62({ id }: { id: string }): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (!/^[0-9]+$/.test(id)) {
    throw new Error('toBase62: id must be a non-negative integer string');
  }
  if (id === '0') return '0';

  let numStr = id;
  let base62 = '';
  while (numStr !== '0') {
    const { quotient, remainder } = divmod(numStr, 62);
    base62 = chars[remainder] + base62;
    numStr = quotient;
  }

  // Always pad to 11 characters
  return base62.padStart(11, '0');
}
