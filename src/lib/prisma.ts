import { PrismaClient } from '@/generated/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create base client
const basePrismaClient = new PrismaClient();

// Extend with Accelerate
const extendedPrisma = basePrismaClient.$extends(withAccelerate());

type ExtendedPrismaClient = typeof extendedPrisma;

// Use globalThis to store the extended client
const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

// Singleton logic
const prisma = globalForPrisma.prisma ?? extendedPrisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
