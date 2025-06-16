'use server';

import { Url } from '@/generated/prisma';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';
import { toBase62 } from '@/lib/utils';
import { TResponse } from '@/types/global';

export const urlShortenerAction = async ({ url, userId }: { url: string; userId?: string }): Promise<TResponse<Url>> => {
  try {
    const createdUrl = await prisma.url.create({
      data: {
        id: BigInt(Date.now()),
        originalUrl: url,
        shortRoute: '',
        userId,
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
      message: 'Short URL created successfully',
      error: null,
    };
  } catch (error: unknown) {
    console.error('Error in urlShortenerAction:', error);
    return {
      success: false,
      error: error as Error,
      data: null,
      message: 'Failed to create short URL',
    };
  }
};

export const addUrlToAccountAction = async ({ shortUrlId }: { shortUrlId: bigint }): Promise<TResponse<Url>> => {
  try {
    const url = await prisma.url.findUnique({
      where: { id: shortUrlId },
    });

    if (!url) {
      return {
        success: false,
        error: new Error('URL not found'),
        data: null,
        message: 'URL not found',
      };
    }

    const userData = await getSession();

    const updatedUrl = await prisma.url.update({
      where: { id: shortUrlId },
      data: { userId: userData.id },
    });

    return {
      success: true,
      data: updatedUrl,
      message: 'URL added to account successfully',
      error: null,
    };
  } catch (error) {
    console.error('Error in addUrlToAccountAction:', error);
    return {
      success: false,
      error: error as Error,
      data: null,
      message: 'Failed to add URL to account',
    };
  }
};

export const getAllUrlsByUserId = async ({ userId }: { userId: string }): Promise<TResponse<Url[]>> => {
  try {
    const urls = await prisma.url.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: urls ?? [],
      message: 'URLs retrieved successfully',
      error: null,
    };
  } catch (error) {
    console.error('Error in getAllUrlsByUserId:', error);
    return {
      success: false,
      error: error as Error,
      data: null,
      message: 'Failed to retrieve URLs',
    };
  }
};
