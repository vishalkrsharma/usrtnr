'use server';

import { Url } from '@/generated/prisma';
import { prisma } from '@/lib/db';
import { toBase62 } from '@/lib/utils';
import { TResponse } from '@/types/global';

export const urlShortenerAction = async ({ url }: { url: string }): Promise<TResponse<Url>> => {
  try {
    const createdUrl = await prisma.url.create({
      data: {
        id: BigInt(Date.now()),
        originalUrl: url,
        shortRoute: '',
      },
      a,
    });

    const shortRoute = toBase62({ id: createdUrl.id });

    const updatedUrl = await prisma.url.update({
      where: { id: createdUrl.id },
      data: { shortRoute },
    });

    return {
      success: true,
      data: updatedUrl,
      message: 'Short URL created successfully',
      error: null,
    };
  } catch (error: unknown) {
    console.error('Error in urlShortenerService:', error);
    return {
      success: false,
      error: error as Error,
      data: null,
      message: 'Failed to create short URL',
    };
  }
};
