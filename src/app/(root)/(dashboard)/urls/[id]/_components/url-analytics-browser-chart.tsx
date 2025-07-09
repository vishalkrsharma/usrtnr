'use client';

import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Analytics } from '@/generated/prisma';
import { extractUserAgentInfo, groupByBrowser } from '@/lib/analytics';
import PlaceholderText from '@/components/helper/placeholder-text';

const chartConfig = {
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const UrlAnalyticsBrowserChart = ({ analytics }: { analytics: Analytics[] }) => {
  const userAgentData = extractUserAgentInfo({ analytics });
  const chartData = groupByBrowser({ data: userAgentData });

  return (
    <Card className='flex flex-col flex-1 min-w-[400px]'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Browser Analytics</CardTitle>
        <CardDescription>Visitor distribution by browser</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0 flex justify-center items-center'>
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square w-full max-h-[250px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey='visitors'
                nameKey='browser'
                innerRadius={40}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey='browser' />}
                className='-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center'
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <PlaceholderText />
        )}
      </CardContent>
    </Card>
  );
};

export default UrlAnalyticsBrowserChart;
