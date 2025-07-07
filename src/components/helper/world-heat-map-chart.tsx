'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import features from '@/constants/features.json';
import { scaleLinear } from 'd3-scale';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const WorldHeatMapChart = ({ data }: { data: Record<string, number> }) => {
  const values = Object.values(data);
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 1;

  const getColorRange = () => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement);
      const light = style.getPropertyValue('--chart-5').trim() || '#fff7bc';
      const dark = style.getPropertyValue('--chart-1').trim() || '#d73027';
      return [light, dark];
    }
    return ['#fff7bc', '#d73027'];
  };

  const colorRange = getColorRange();
  const colorScale = scaleLinear().domain([minValue, maxValue]).range([colorRange[1], colorRange[0]]);

  return (
    <ComposableMap>
      <Geographies geography={features}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const value = data[geo.id] || 0;
            const fill = value ? colorScale(value) : '#EEE';
            const countryName = geo.properties?.name;
            const countryCode = geo.id;

            return (
              <Tooltip key={geo.rsmKey}>
                <TooltipTrigger asChild>
                  <Geography
                    geography={geo}
                    fill={fill}
                    stroke='#FFF'
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', fill: '#74add1' },
                      pressed: { outline: 'none' },
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent className='capitalize text-lg'>
                  {countryName ?? null} {countryCode}: {value}
                </TooltipContent>
              </Tooltip>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldHeatMapChart;
