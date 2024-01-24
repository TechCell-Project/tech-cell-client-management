import { SearchStats } from '@models/Statistic';
import { getFirstAndLastDayOfMonth } from '@utils/funcs';
import { getStats, TStatsSlice } from '@store/slices/statsSlice';
import { useAppDispatch, useAppSelector } from '@store/store';

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

  const initialDate: SearchStats = {
    ...new SearchStats(),
    fromDate: firstDay,
    toDate: lastDay,
  };

  const handleSearchStats = (params: SearchStats) => {
    dispatch(getStats(params)).then();
  };

  return {
    ...statsState,
    handleSearchStats,
    initialDate,
  };
};

export default useStats;