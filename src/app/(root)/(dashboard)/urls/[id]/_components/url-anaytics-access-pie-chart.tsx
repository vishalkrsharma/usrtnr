'use client';

import { Pie, PieChart, Cell } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import PlaceholderText from '@/components/helper/placeholder-text';

const generateChartConfig = (chartData: { field: string; value: number }[]): ChartConfig => {
  const config: Record<string, { label: string; color: string }> = {};
  chartData.forEach((item, idx) => {
    config[item.field] = {
      label: item.field.charAt(0).toUpperCase() + item.field.slice(1),
      color: `var(--chart-${idx + 1})`,
    };
  });
  return config;
};

const UrlAnalyticsAccessPieChart = ({
  title,
  description,
  chartData,
}: {
  title: string;
  description: string;
  chartData: {
    field: string;
    value: number;
  }[];
}) => {
  const chartConfig = generateChartConfig(chartData);
  return (
    <Card className='flex flex-col flex-1'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0 flex justify-center items-center'>
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-[300px] w-full'
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey='value'
                nameKey='field'
              >
                {chartData.map((entry, idx) => (
                  <Cell
                    key={`cell-${entry.field}`}
                    fill={`var(--chart-${idx + 1})`}
                  />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey='field' />}
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

export default UrlAnalyticsAccessPieChart;
