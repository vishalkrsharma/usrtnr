const CUSTOM_EPOCH = 1710000000000n; // Mar 10, 2024

let lastTimestamp = 0n;
let sequence = 0n;

const WORKER_ID_BITS = 10n;
const SEQUENCE_BITS = 12n;

const MAX_WORKER_ID = (1n << WORKER_ID_BITS) - 1n;
const MAX_SEQUENCE = (1n << SEQUENCE_BITS) - 1n;

const WORKER_ID = BigInt(
  (() => {
    const envId = Number(process.env.WORKER_ID);
    if (!Number.isInteger(envId) || envId < 0 || envId > Number(MAX_WORKER_ID)) {
      const fallback = Math.floor(Math.random() * Number(MAX_WORKER_ID + 1n));
      console.warn(`[snowflake] Invalid or missing WORKER_ID. Falling back to ${fallback}`);
      return fallback;
    }
    return envId;
  })()
);

export function generateSnowflakeId(): string {
  let currentTimestamp = BigInt(Date.now());

  if (currentTimestamp === lastTimestamp) {
    sequence = (sequence + 1n) & MAX_SEQUENCE;
    if (sequence === 0n) {
      // CPU-safe wait for next millisecond
      while (true) {
        const now = BigInt(Date.now());
        if (now > lastTimestamp) {
          currentTimestamp = now;
          break;
        }
      }
    }
  } else {
    sequence = 0n;
  }

  lastTimestamp = currentTimestamp;

  const rawId = ((currentTimestamp - CUSTOM_EPOCH) << (WORKER_ID_BITS + SEQUENCE_BITS)) | (WORKER_ID << SEQUENCE_BITS) | sequence;

  // Always return as 19-digit string
  return rawId.toString().padStart(19, '0');
}
