import { FilterByDatetime } from '@models/Common';

export class SearchStats extends FilterByDatetime {
  splitBy: string = 'day';
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