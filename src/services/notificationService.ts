import instance from '@config/axios.config';
import { NOTIFICATION_ENDPOINT } from '@constants/service';
import { NotificationModel, PagingNotify } from '@models/Notification';
import { getSearchParams } from '@utils/funcs';
import { PagingResponse } from '@models/Common';

export const getNotifications = (payload: PagingNotify) => {
  const url = getSearchParams(payload);
  return instance.get<PagingResponse<NotificationModel>>(NOTIFICATION_ENDPOINT + '?' + url);
};