import instance from '@config/axios.config';
import { Order, PagingOrder } from '@models/Order';
import { getSearchParams } from '@utils/funcs';
import { ORDER_ENDPOINT } from '@constants/service';
import { PagingResponse } from '@models/Common';

export const getOrders = (payload: PagingOrder) => {
  const url = getSearchParams(payload);
  return instance.get<PagingResponse<Order>>(ORDER_ENDPOINT + '?' + url);
};

export const getOrderById = (id: string) =>
  instance.get<Order>(`${ORDER_ENDPOINT}/${id}`);

export const patchOrderStatus = (id: string, orderStatus: string) =>
  instance.patch<Order>(`${ORDER_ENDPOINT}/${id}`, { orderStatus });