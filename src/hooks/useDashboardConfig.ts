
import { useState } from 'react';

interface DashboardConfig {
  activeTab: string;
}

export const useDashboardConfig = () => {
  const [config, setConfig] = useState<DashboardConfig>({
    activeTab: 'services'
  });

  return {
    config,
    setConfig
  };
};
