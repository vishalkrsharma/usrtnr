import { useEffect, useState } from 'react';

export const useAutoTooltip = (shouldShow: boolean, duration = 3000) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    if (shouldShow) {
      setIsTooltipOpen(true);
      const timer = setTimeout(() => {
        setIsTooltipOpen(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [shouldShow, duration]);

  return { isTooltipOpen, setIsTooltipOpen };
};
