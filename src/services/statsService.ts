import instance from '@config/axios.config';
import { SearchStats, Statistic } from '@models/Statistic';
import { getSearchParams } from '@utils/funcs';
import { STATS_ENDPOINT } from '@constants/service';

export const searchStats = (params: SearchStats, language?: string) => {
  const url = getSearchParams(params) !== '' ? '?' + getSearchParams(params) : '';
  return instance.get<Statistic>(STATS_ENDPOINT + url, {
    headers: {
      'x-lang': language ?? 'en',
    },
  });
};