import { SearchStats } from '@models/Statistic';
import { getFirstAndLastDayOfMonth } from '@utils/funcs';
import { getStats, TStatsSlice } from '@store/slices/statsSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useCallback, useEffect } from 'react';

type UseStats = TStatsSlice & {
  initialDate: SearchStats;
  handleSearchStats: (params: SearchStats) => void;
}

const useStats = (): UseStats => {
  const dispatch = useAppDispatch();
  const statsState = useAppSelector((state) => state.stats);

  const currentDate = new Date();
  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const minusMonths = useCallback((currentDate: string, months: number) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - months);

    return date.toISOString();
  }, []);


  const initialDate: SearchStats = {
    ...new SearchStats(),
    fromDate: minusMonths(firstDay, 3),
    toDate: lastDay,
  };

  const handleSearchStats = (params: SearchStats) => {
    dispatch(getStats(params)).then();
  };

  useEffect(() => {
    handleSearchStats(initialDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...statsState,
    handleSearchStats,
    initialDate,
  };
};

export default useStats;