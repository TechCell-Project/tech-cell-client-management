import { FilterByDatetime } from '@models/Common';
import { TimeSplit } from '@constants/enum';

export class SearchStats extends FilterByDatetime {
  splitBy: TimeSplit = TimeSplit.Day;
  refreshCache: boolean | null = null;
}

export class Statistic extends FilterByDatetime {
  totalOrders: number = 0;
  totalRevenue: number = 0;
  data: Array<StatisticData> = new Array<StatisticData>();
}

export class StatisticData {
  orders: number = 0;
  revenue: number = 0;
  date: Date | string = '';
  dateString: string = '';
}