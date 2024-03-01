import instance from '@config/axios.config';
import { SearchStats, SearchStatsOrder, Statistic, StatisticDataOrder } from '@models/Statistic';
import { getSearchParams } from '@utils/funcs';
import { STATS_ENDPOINT } from '@constants/service';

export const searchStatsRevenue = (params: SearchStats, language?: string) => {
  const url = getSearchParams(params) !== '' ? '?' + getSearchParams(params) : '';
  return instance.get<Statistic>(STATS_ENDPOINT + url, {
    headers: {
      'x-lang': language ?? 'en',
    },
  });
};

export const searchStatsOrder = (params: SearchStatsOrder) => {
  const url = getSearchParams(params) !== '' ? '?' + getSearchParams(params) : '';
  return instance.get<StatisticDataOrder>(`${STATS_ENDPOINT}/orders${url}`, {
    headers: {
      'x-lang': 'vi_VN',
    },
  });
};
