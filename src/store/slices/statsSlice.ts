import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { SearchStats, SearchStatsOrder, Statistic, StatisticDataOrder } from '@models/Statistic';
import { searchStatsOrder, searchStatsRevenue } from '@services/statsService';
import { HttpStatusCode } from 'axios';

export type TStatsSlice = {
  stats: Statistic | null;
  statsOrder: StatisticDataOrder | null;
  isLoading: boolean;
  ok: boolean;
}

const initialState: TStatsSlice = {
  stats: null,
  statsOrder: null,
  isLoading: false,
  ok: false,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    getSuccessRevenue: (state, { payload }: {
      payload: Statistic
    }) => {
      state.stats = payload;
      state.isLoading = false;
      if (!state.ok) state.ok = true;
    },
    getSuccessOrder: (state, { payload }: { payload: StatisticDataOrder }) => {
      const values = payload.data.map((item) => {
        item.color = '';
        return item;
      });
      state.statsOrder = { ...payload, data: values };
      if (!state.ok) state.ok = true;
    },
    getFailure: (state) => {
      state.stats = null;
      state.isLoading = false;
      state.ok = false;
    },
  },
});

export const getStats = (params: SearchStats) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const { data, status } = await searchStatsRevenue(params, 'vi_VN');
    const { data: dataOrder, status: statusOrder } = await searchStatsOrder(new SearchStatsOrder(params));
    if (status === HttpStatusCode.Ok) {
      dispatch(getSuccessRevenue(data));
    }
    if (statusOrder === HttpStatusCode.Ok) {
      dispatch(getSuccessOrder(dataOrder));
    }
  } catch (err) {
    console.log(err);
    dispatch(getFailure());
  }
};

const { actions, reducer } = statsSlice;

export const {
  isFetching,
  getSuccessRevenue,
  getSuccessOrder,
  getFailure,
} = actions;
export default reducer;