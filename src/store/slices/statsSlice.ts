import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { SearchStats, Statistic } from '@models/Statistic';
import { searchStats } from '@services/statsService';
import { HttpStatusCode } from 'axios';

export type TStatsSlice = {
  stats: Statistic | null;
  isLoading: boolean;
}

const initialState: TStatsSlice = {
  stats: null,
  isLoading: false,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    getSuccess: (state, { payload }: {
      payload: Statistic
    }) => {
      state.stats = payload;
      state.isLoading = false;
    },
    getFailure: (state) => {
      state.stats = null;
      state.isLoading = false;
    },
  },
});

export const getStats = (params: SearchStats) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const { data, status } = await searchStats(params, 'vi_VN');
    if (status === HttpStatusCode.Ok) {
      dispatch(getSuccess(data));
    }
  } catch (err) {
    console.log(err);
    dispatch(getFailure());
  }
};

const { actions, reducer } = statsSlice;

export const {
  isFetching,
  getSuccess,
  getFailure,
} = actions;
export default reducer;