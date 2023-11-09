import { Paging } from '@models/Common';

export class PagingNotify extends Paging{
  readType?: string | null = null;
}

export class Notification {
  _id: string | null = null;
  content: string | null = null;
  notificationType: string | null = null;
  recipientId?: string | null = null;
  issuerId?: string | null = null;
  readAt?: string | null = null;
  canceledAt?: string | null = null;
  data?: NotificationData = new NotificationData();
}

export class NotificationData {
  order: OrderData = new OrderData();
}

export class OrderData {
  _id: string | null = null;
  userId: string | null = null;

}