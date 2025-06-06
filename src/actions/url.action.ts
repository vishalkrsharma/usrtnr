'use server';

import { prisma } from '@/lib/db';
import { toBase62 } from '@/lib/utils';

export const urlShortenerAction = async ({ url }: { url: string }) => {
  try {
    const createdUrl = await prisma.url.create({
      data: {
        id: BigInt(Date.now()),
        originalUrl: url,
        shortRoute: '',
      },
    });

    const shortRoute = toBase62({ id: createdUrl.id });

    const updatedUrl = await prisma.url.update({
      where: { id: createdUrl.id },
      data: { shortRoute },
    });

    return {
      success: true,
      data: updatedUrl,
    };
  } catch (error) {
    console.error('Error in urlShortenerService:', error);
    return {
      success: false,
      error: 'Failed to create short URL',
    };
  }
};
