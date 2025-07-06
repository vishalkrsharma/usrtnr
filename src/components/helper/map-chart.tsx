'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import features from '@/constants/features.json';

export default function MapChart() {
  return (
    <ComposableMap>
      <Geographies geography={features}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}
