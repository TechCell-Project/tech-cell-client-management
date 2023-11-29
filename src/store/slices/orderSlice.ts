import { OrderSlice, OrderModel, PagingOrder } from '@models/Order';
import { PagingResponse } from '@models/Common';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { getOrderById, getOrders, patchOrderStatus } from '@services/orderService';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

const initialState: OrderSlice = {
  orders: new PagingResponse<OrderModel>(),
  order: null,
  isLoading: false,
  isLoadingDetails: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true;
    },
    isFetchingDetails: (state) => {
      state.isLoadingDetails = true;
    },
    getSuccess: (state, { payload }) => {
      state.orders = payload;
      state.isLoading = false;
    },
    getFailure: (state) => {
      state.orders = new PagingResponse<OrderModel>();
      state.isLoading = false;
    },
    editStatusSuccess: (state, { payload }) => {
      const index = state.orders.data.findIndex(
        (order) => order._id === payload._id,
      );
      if (index !== -1) {
        state.orders.data[index] = payload;
      }
      // @ts-ignore
      state.order.updatedAt = payload.updatedAt;
      // @ts-ignore
      state.order.orderStatus = payload.orderStatus;
      state.isLoadingDetails = false;
    },
    getDetailsSuccess: (state, { payload }) => {
      state.order = payload;
      state.isLoadingDetails = false;
    },
    getDetailsFailure: (state) => {
      state.order = null;
      state.isLoadingDetails = false;
    },
    fetchedDetailsDone: (state) => {
      state.isLoadingDetails = false;
    },
  },
});

export const getAllOrder = (payload: PagingOrder) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const { status, data } = await getOrders(payload);
    if (status === HttpStatusCode.Ok) {
      dispatch(getSuccess(data));
    }
  } catch {
    dispatch(getFailure());
  }
};

export const getOrderDetails = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetchingDetails());
  try {
    const { status, data } = await getOrderById(id);
    if (status === HttpStatusCode.Ok) {
      dispatch(getDetailsSuccess(data));
    }
  } catch {
    dispatch(getDetailsFailure());
  }
};

export const editOrderStatus = (id: string, orderStatus: string) => async (dispatch: Dispatch) => {
  dispatch(isFetchingDetails());
  try {
    const { status, data } = await patchOrderStatus(id, orderStatus);
    if (status === HttpStatusCode.Ok) {
      dispatch(editStatusSuccess(data));
      toast.success('Thay đổi trạng thái đơn hàng thành công!');
    }
  } catch {
    dispatch(fetchedDetailsDone());
    toast.error('Thay đổi trạng thái đơn hàng thất bại!');
  }
};

const { actions, reducer } = orderSlice;

export const {
  fetchedDetailsDone,
  isFetchingDetails,
  isFetching,
  getSuccess,
  getFailure,
  getDetailsSuccess,
  getDetailsFailure,
  editStatusSuccess,
} = actions;
export default reducer;