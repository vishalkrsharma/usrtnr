'use server';

import { Analytics, Prisma, Url } from '@/generated/prisma';
import prisma from '@/lib/prisma';
import { checkSession, getSession } from '@/lib/session';
import { generateSnowflakeId } from '@/lib/snowflake';
import { toBase62 } from '@/lib/utils';
import { TResponse } from '@/types/global';
import { revalidatePath } from 'next/cache';

export const urlShortenerAction = async ({ url }: { url: string }): Promise<TResponse<Url>> => {
  try {
    const userData = await checkSession();

    const createdUrl = await prisma.url.create({
      data: {
        id: generateSnowflakeId(),
        originalUrl: url,
        shortRoute: '',
        userId: userData?.id,
        doAnalyze: !!userData?.id,
      },
    });

    const shortRoute = toBase62({ id: createdUrl.id });

    const updatedUrl = await prisma.url.update({
      where: { id: createdUrl.id },
      data: { shortRoute },
    });

    revalidatePath('/urls');

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
    const userData = await getSession();

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

export const getAllUrlsByUserId = async ({
  page = 1,
  limit = 10,
  query,
}: {
  page?: number;
  limit?: number;
  query?: string;
}): Promise<TResponse<{ urls: Url[]; total: number }>> => {
  try {
    const userData = await getSession();
    const offset = (page - 1) * limit;

    const whereClause: Prisma.UrlWhereInput = { userId: userData.id };
    if (query && query.trim() !== '') {
      whereClause.originalUrl = { contains: query, mode: 'insensitive' };
    }

    const [urlsResult, totalResult] = await Promise.allSettled([
      prisma.url.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.url.count({
        where: whereClause,
      }),
    ]);

    if (urlsResult.status === 'rejected' || totalResult.status === 'rejected') {
      const error = urlsResult.status === 'rejected' ? urlsResult.reason : totalResult.status === 'rejected' ? totalResult.reason : new Error('Unknown error');
      throw error;
    }

    return {
      success: true,
      data: {
        urls: urlsResult.value,
        total: totalResult.value,
      },
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

export const getUrlById = async ({ id }: { id: bigint }): Promise<TResponse<{ url: Url; analytics: Analytics[] }>> => {
  try {
    const userData = await getSession();

    const url = await prisma.url.findUnique({
      where: { id: id, userId: userData.id },
    });

    if (!url) {
      return {
        success: true,
        data: null,
        message: 'URL retrieved successfully',
        error: null,
      };
    }

    const analytics =
      (await prisma.analytics.findMany({
        where: { shortRoute: url.shortRoute },
        orderBy: { createdAt: 'desc' },
      })) ?? [];

    return {
      success: true,
      data: { url, analytics },
      message: 'URL retrieved successfully',
      error: null,
    };
  } catch (error) {
    console.error('Error in getUrlById:', error);
    return {
      success: false,
      error: error as Error,
      data: null,
      message: 'Failed to retrieve URL',
    };
  }
};

export const deleteUrlByIdAction = async ({ id }: { id: bigint }): Promise<TResponse<Url>> => {
  try {
    const url = await prisma.url.delete({
      where: { id: id },
    });

    revalidatePath('/urls');

    return {
      success: true,
      data: url,
      message: 'URL deleted successfully',
      error: null,
    };
  } catch (error) {
    console.error('Error in deleteUrlByIdAction:', error);
    return {
      success: false,
      error: error as Error,
      data: null,
      message: 'Failed to delete URL',
    };
  }
};

export const toggleUrlAnalyticsAction = async ({ id, doAnalyze }: { id: bigint; doAnalyze: boolean }): Promise<TResponse<Url>> => {
  try {
    await prisma.url.update({
      where: { id },
      data: { doAnalyze },
    });

    revalidatePath('/urls');
    revalidatePath(`/urls/${id}`);

    return {
      success: true,
      data: null,
      message: 'URL analytics toggled successfully',
      error: null,
    };
  } catch (error) {
    console.error('Error in toggleUrlAnalyticsAction:', error);
    return {
      success: false,
      error: error as Error,
      data: null,
      message: 'Failed to toggle URL analytics',
    };
  }
};
