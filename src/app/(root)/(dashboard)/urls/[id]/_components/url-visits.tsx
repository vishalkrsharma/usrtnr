import UrlKeyValue from '@/app/(root)/(dashboard)/urls/[id]/_components/url-key-value';
import { Trend } from '@/components/ui/trend';
import { Analytics } from '@/generated/prisma';
import { groupByWeek } from '@/lib/analytics';
import { TrendingDown, TrendingUp } from 'lucide-react';

const getTrendVariant = ({ trendByWeek }: { trendByWeek: Analytics[][] }): 'up' | 'down' => {
  if (trendByWeek.length === 1) {
    return 'up';
  }

  const currentWeek = trendByWeek[0].length;
  const previousWeek = trendByWeek[1].length;

  return currentWeek >= previousWeek ? 'up' : 'down';
};

const UrlVisits = ({ analytics }: { analytics: Analytics[] }) => {
  const trendByWeek = groupByWeek({ analytics });
  const trend = getTrendVariant({ trendByWeek: trendByWeek });

  return (
    <UrlKeyValue
      title='Visits'
      className={
        trend === 'up'
          ? 'bg-green-500/20 border-green-500 text-green-500 fill-green-500 stroke-green-500'
          : 'bg-red-500/20 border-red-500 text-red-500 fill-red-500 stroke-red-500'
      }
    >
      <div className='flex justify-between items-center gap-4'>
        <h3 className='text-2xl font-semibold'>{analytics.length}</h3>
        <Trend
          variant={trend}
          size='sm'
        >
          {trend === 'up' ? <TrendingUp /> : <TrendingDown />}
        </Trend>
      </div>
    </UrlKeyValue>
  );
};

export default UrlVisits;
