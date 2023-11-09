import instance from '@config/axios.config';
import { NOTIFICATION_ENDPOINT } from '@constants/service';
import { PagingNotify } from '@models/Notification';
import { getSearchParams } from '@utils/funcs';

export const getNotifications = (payload: PagingNotify) => {
  const url = getSearchParams(payload);
  return instance.get(NOTIFICATION_ENDPOINT + '?' + url);
};