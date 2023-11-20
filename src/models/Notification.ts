import { Paging } from '@models/Common';
import { OrderModel } from '@models/Order';

export class PagingNotify extends Paging {
  readType?: string | null = null;
}

export class NotificationWS {
  time: string | null = null;
  notifications: NotificationModel = new NotificationModel();
}

export class NotificationModel {
  _id: string | null = null;
  content: string | null = null;
  notificationType: string | null = null;
  recipientId?: string | null = null;
  issuerId?: string | null = null;
  readAt?: string | null = null;
  canceledAt?: string | null = null;
  createdAt: string | null = null;
  updatedAt: string | null = null;
  data: NotificationData = new NotificationData();
}

export class NotificationData {
  order: OrderModel = new OrderModel();
}
