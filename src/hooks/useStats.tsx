import { useEffect, useState } from 'react';
import { SearchStats, Statistic } from '@models/Statistic';
import { searchStats } from '@services/statsService';

const useStats = () => {
  const [stats, setStats] = useState<Statistic>(new Statistic());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleSearchStats(new SearchStats());
  }, []);
  
  const handleSearchStats = (params: SearchStats) => {
    setIsLoading(true);
    searchStats(params)
      .then(({ data }) => setStats(data))
      .catch(() => setStats(new Statistic()))
      .finally(() => setIsLoading(false));
  };

  return { stats, handleSearchStats, isLoading };
};

export default useStats;