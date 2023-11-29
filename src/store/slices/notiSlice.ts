import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { NotificationModel, PagingNotify } from '@models/Notification';
import { getNotifications } from '@services/notificationService';
import { HttpStatusCode } from 'axios';

type TSliceNotify = {
  notifications: Array<NotificationModel>;
  isLoading: boolean;
}

const initialState: TSliceNotify = {
  notifications: [],
  isLoading: false,
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    getSuccess: (state, { payload }) => {
      state.notifications = payload;
      state.isLoading = false;
    },
    getFailure: (state) => {
      state.notifications = [];
      state.isLoading = false;
    },
  },
});

export const getAllNotification =
  (payload: PagingNotify) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      const { status, data } = await getNotifications(payload);
      if (status === HttpStatusCode.Ok) {
        dispatch(getSuccess(data.data));
      }
    } catch {
      dispatch(getFailure());
    }
  };

const { actions, reducer } = notificationSlice;

export const {
  isFetching,
  getSuccess,
  getFailure,
} = actions;
export default reducer;