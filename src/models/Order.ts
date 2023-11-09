import { Paging, PagingResponse } from '@models/Common';
import { Address } from '@models/Account';

export class PagingOrder extends Paging {
  orderId?: string | null = null;
  userId?: string | null = null;
  productId?: string | null = null;
  trackingCode?: string | null = null;
  paymentMethod?: string | null = null;
  paymentStatus?: string | null = null;
  orderStatus?: string | null = null;
}

export class Order {
  _id: string | null = null;
  userId: string | null = null;
  products: Array<OrderProduct> = new Array<OrderProduct>();
  checkoutOrder: OrderCheckout = new OrderCheckout();
  shippingOrder: OrderShipping = new OrderShipping();
  paymentOrder?: OrderPayment = new OrderPayment();
  trackingCode: string | null = null;
  orderStatus: string | null = null;
}

export class OrderProduct {
  productId: string | null = null;
  quantity: number | null = null;
  sku: string | null = null;
  createdAt: string | null = null;
  updatedAt: string | null = null;
}


type AddressOrder = Omit<Address, 'listDistrict' | 'listWard'>

export class OrderShipping {
  fromAddress?: AddressOrder = new Address();
  toAddress: AddressOrder = new Address();
}

export class OrderCheckout {
  shippingFee: number | null = null;
  totalApplyDiscount: number | null = null;
  totalPrice: number | null = null;
}

export class OrderPayment {
  method: string | null = null;
  status: string | null = null;
}

export class OrderSlice {
  orders: PagingResponse<Order> = new PagingResponse<Order>();
  order: Order | null = null;
  isLoading: boolean = false;
  isLoadingDetails: boolean = false;
}