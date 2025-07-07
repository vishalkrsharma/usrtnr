// src/lib/snowflake.ts

const CUSTOM_EPOCH = 1577836800000n; // Jan 1, 2020 UTC

let lastTimestamp = 0n;
let sequence = 0n;

const WORKER_ID_BITS = 10n;
const SEQUENCE_BITS = 12n;

const MAX_WORKER_ID = (1n << WORKER_ID_BITS) - 1n; // 1023n
const MAX_SEQUENCE = (1n << SEQUENCE_BITS) - 1n; // 4095n

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

export function generateSnowflakeId(): bigint {
  let currentTimestamp = BigInt(Date.now());

  if (currentTimestamp === lastTimestamp) {
    sequence = (sequence + 1n) & MAX_SEQUENCE;
    if (sequence === 0n) {
      // Wait for next millisecond if overflow
      while (BigInt(Date.now()) <= lastTimestamp) {}
      currentTimestamp = BigInt(Date.now());
    }
  } else {
    sequence = 0n;
  }

  lastTimestamp = currentTimestamp;

  return ((currentTimestamp - CUSTOM_EPOCH) << (WORKER_ID_BITS + SEQUENCE_BITS)) | (WORKER_ID << SEQUENCE_BITS) | sequence;
}
