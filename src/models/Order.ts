import { Paging, PagingResponse } from '@models/Common';
import { Address } from '@models/Account';
import { AttributeDynamics } from '@models/Attribute';
import { ImageModel, PriceModel } from '@models/Product';

export class PagingOrder extends Paging {
  orderId?: string | null = null;
  userId?: string | null = null;
  productId?: string | null = null;
  trackingCode?: string | null = null;
  paymentMethod?: string | null = null;
  paymentStatus?: string | null = null;
  orderStatus?: string | null = null;
}

export class OrderModel {
  _id: string | null = null;
  userId: string | null = null;
  products: Array<OrderProduct> = new Array<OrderProduct>();
  checkoutOrder: OrderCheckout = new OrderCheckout();
  shippingOrder: OrderShipping = new OrderShipping();
  paymentOrder: OrderPayment = new OrderPayment();
  trackingCode: string | null = null;
  orderStatus: string | null = null;
  createdAt: string | null = null;
  updatedAt: string | null = null;
}

export class OrderProduct {
  productId: string | null = null;
  quantity: number | null = null;
  sku: string | null = null;
  createdAt: string | null = null;
  updatedAt: string | null = null;
  attributes: Array<AttributeDynamics> = [];
  name: string | null = null;
  price: PriceModel = new PriceModel();
  stock: number | null = null;
  status: number | null = null;
  generalImages: Array<ImageModel> = [];
  images: Array<ImageModel> = [];
}

export class OrderShipping {
  fromAddress?: Address = new Address();
  toAddress: Address = new Address();
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
  orders: PagingResponse<OrderModel> = new PagingResponse<OrderModel>();
  order: OrderModel | null = null;
  isLoading: boolean = false;
  isLoadingDetails: boolean = false;
}
