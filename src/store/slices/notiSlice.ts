import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { NotificationModel, PagingNotify } from '@models/Notification';
import { getNotifications } from '@services/notificationService';
import { HttpStatusCode } from 'axios';
import { Socket } from 'socket.io-client';

type TSliceNotify = {
  notifications: Array<NotificationModel>;
  socket: Socket | null;
  isLoading: boolean;
  showReadmore: boolean;
}

const initialState: TSliceNotify = {
  notifications: [],
  socket: null,
  isLoading: false,
  showReadmore: true,
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    setSocket: (state, { payload }) => {
      state.socket = payload;
    },
    setPushNotifySocket: (state, { payload }) => {
      state.notifications.unshift(...payload);
    },
    getSuccess: (state, { payload }: { payload: Array<NotificationModel> }) => {
      if (payload.length < 10) {
        state.showReadmore = false;
      }
      state.notifications = payload;
      state.isLoading = false;
    },
    getMoreSuccess: (state, { payload }: { payload: Array<NotificationModel> }) => {
      if (payload.length < 10) {
        state.showReadmore = false;
      }
      state.notifications.push(...payload);
      state.isLoading = false;
    },
    getFailure: (state) => {
      state.notifications = [];
      state.isLoading = false;
      state.showReadmore = false;
    },
  },
});

export const getAllNotification =
  (payload: PagingNotify, action: 'get' | 'paging') => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
      const { status, data } = await getNotifications(payload);
      if (status === HttpStatusCode.Ok) {
        action === 'get' ? dispatch(getSuccess(data.data)) : dispatch(getMoreSuccess(data.data));
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
  getMoreSuccess,
  setSocket,
  setPushNotifySocket,
} = actions;
export default reducer;