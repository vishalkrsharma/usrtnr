'use client';

import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Analytics } from '@/generated/prisma';
import { extractUserAgentInfo, groupByBrowser } from '@/lib/analytics';

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
    <Card className='flex flex-col flex-1'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Browser Analytics</CardTitle>
        <CardDescription>Visitor distribution by browser</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
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
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UrlAnalyticsBrowserChart;
