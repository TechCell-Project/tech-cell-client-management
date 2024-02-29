import { FilterByDatetime } from '@models/Common';
import { TimeSplit } from '@constants/enum';

export class SearchStats extends FilterByDatetime {
  splitBy: TimeSplit = TimeSplit.Day;
  refreshCache: boolean | null = null;
  type: 'order' | 'revenue' = 'revenue';
}

export class SearchStatsOrder extends FilterByDatetime {
  refreshCache: boolean = false;
  getBy: 'createdAt' | 'updatedAt' = 'createdAt';

  constructor(stats: SearchStats) {
    super();

    this.fromDate = stats.fromDate;
    this.toDate = stats.toDate;

    if (stats.refreshCache) {
      this.refreshCache = stats.refreshCache;
    }
  }
}

export class Statistic extends FilterByDatetime {
  totalOrders: number = 0;
  totalRevenue: number = 0;
  data: Array<StatisticData> = new Array<StatisticData>();
}


export type StatsOrderDataType = { name: string; value: number, color: string }

export class StatisticDataOrder extends FilterByDatetime{
  data: StatsOrderDataType[] = [];
}

export class StatisticData {
  orders: number = 0;
  revenue: number = 0;
  date: Date | string = '';
  dateString: string = '';
}