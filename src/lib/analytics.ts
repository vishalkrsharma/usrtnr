import { Analytics } from '@/generated/prisma';
import { startOfWeek, formatISO } from 'date-fns';
import { UAParser } from 'ua-parser-js';

export function groupByWeek({ analytics }: { analytics: Analytics[] }): Analytics[][] {
  const grouped = analytics.reduce((acc, item) => {
    const weekStart = formatISO(startOfWeek(item.createdAt, { weekStartsOn: 0 }));

    if (!acc[weekStart]) {
      acc[weekStart] = [];
    }

    acc[weekStart].push(item);
    return acc;
  }, {} as Record<string, Analytics[]>);

  return Object.values(grouped);
}

export const extractUserAgentInfo = ({ analytics }: { analytics: Analytics[] }) => {
  return analytics.filter((item) => item.userAgent !== null).map((item) => UAParser(item.userAgent!));
};

export const groupByBrowser = ({ data }: { data: UAParser.IResult[] }) => {
  const browserCounts: Record<string, number> = {};

  data.forEach((item) => {
    let browserName = item.browser.name?.toLowerCase() || 'other';

    if (browserName.startsWith('mobile ')) {
      browserName = browserName.replace('mobile ', '');
    }

    browserCounts[browserName] = (browserCounts[browserName] || 0) + 1;
  });

  const chartData = Object.entries(browserCounts).map(([browser, visitors]) => ({
    browser,
    visitors,
    fill: `var(--color-${browser})`,
  }));

  return chartData;
};

export const convertUserAgentDataToChartFormat = (userAgentData: UAParser.IResult[]) => {
  const browserCounts: Record<string, number> = {};

  userAgentData.forEach((item) => {
    const browserName = item.browser?.name?.toLowerCase() || 'other';
    browserCounts[browserName] = (browserCounts[browserName] || 0) + 1;
  });

  const chartData = Object.entries(browserCounts).map(([browser, visitors]) => ({
    browser,
    visitors,
    fill: `var(--color-${browser})`,
  }));

  return chartData;
};
