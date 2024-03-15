import {
  AccountStatus,
  EmailStatus,
  OrderProcessStep,
  PaymentMethod,
  PaymentOrder,
  PaymentStatus,
  ProductStatus,
  ProductType,
  Roles,
  TimeSplit,
} from './enum';
import { TOptions, TOrderStatusOptions } from '@interface/common';

export const ROLE_OPTIONS: TOptions[] = [
  { value: '', name: 'Không' },
  { value: Roles.User, name: 'Khách hàng' },
  { value: Roles.Staff, name: 'Nhân viên' },
  { value: Roles.Manager, name: 'Quản lý' },
  // { value: Roles.Mod, name: 'Điều hành viên' },
  // { value: Roles.Admin, name: 'Quản trị viên' },
];

export const STATUS_PRODUCT_OPTIONS: TOptions[] = [
  { name: 'Chọn trạng thái', value: null },
  { name: 'Sắp ra mắt', value: ProductStatus.ComingSoon },
  { name: 'Hàng mới về', value: ProductStatus.NewArrival },
  { name: 'Đặt hàng trước', value: ProductStatus.Pre_order },
  { name: 'Đang bán', value: ProductStatus.OnSales },
  { name: 'Ẩn', value: ProductStatus.Hide },
  { name: 'Không bán', value: ProductStatus.NotSales },
  { name: 'Còn ít hàng', value: ProductStatus.LowStock },
  { name: 'Tạm thời hết hàng', value: ProductStatus.TemporarilyOutOfStock },
  { name: 'Đã xóa', value: ProductStatus.Deleted },
];

// Filters
export const ACCOUNT_STATUS_OPTIONS: TOptions[] = [
  { name: 'Hoạt động', value: AccountStatus.Unblocked },
  { name: 'Bị chặn', value: AccountStatus.Blocked },
];

export const ACCOUNT_ROLE_OPTIONS: TOptions[] = [
  { value: Roles.User, name: 'Khách hàng' },
  { value: Roles.Staff, name: 'Nhân viên' },
  { value: Roles.Manager, name: 'Quản lý' },
];

export const ACCOUNT_EMAIL_OPTIONS: TOptions[] = [
  { name: 'Đã xác thực', value: EmailStatus.Verified },
  { name: 'Chưa xác thực', value: EmailStatus.Unverified },
];

export const PRODUCT_TYPE_OPTIONS: TOptions[] = [
  { name: 'Đang mở', value: ProductType.OnlyActive },
  { name: 'Đã xóa', value: ProductType.OnlyDeleted },
  { name: 'Tất cả', value: ProductType.BothDeleteAndActive },
];

export const PAYMENT_METHOD_OPTIONS: TOptions[] = [
  { name: 'Thanh toán khi nhận hàng (COD)', value: PaymentMethod.COD },
  { name: 'VNPay', value: PaymentMethod.VNPAY },
  { name: 'ATM', value: PaymentMethod.ATM },
  { name: 'VISA', value: PaymentMethod.VISA },
  { name: 'MASTERCARD', value: PaymentMethod.MASTERCARD },
  { name: 'JCB', value: PaymentMethod.JCB },
];

export const ORDER_STATUS_OPTIONS: TOrderStatusOptions[] = [
  {
    name: 'Chưa xử lý',
    value: PaymentStatus.PENDING,
    step: OrderProcessStep.First_Pending,
    content: 'Xác nhận đơn hàng',
  },
  {
    name: 'Đang chuẩn bị hàng',
    value: PaymentStatus.PROCESSING,
    step: OrderProcessStep.Second_Processing,
    content: 'Tiến hành giao hàng',
  },
  {
    name: 'Đang vận chuyển',
    value: PaymentOrder.SHIPPING,
    step: OrderProcessStep.Third_Shipping,
    content: 'Xác nhận giao thành công',
  },
  {
    name: 'Giao hàng thành công',
    value: PaymentStatus.COMPLETED,
    step: OrderProcessStep.Four_Completed,
  },
  { name: 'Đã hủy', value: PaymentStatus.CANCELLED, step: OrderProcessStep.Five_Cancel },
];

export const LIST_SPLIT_BY: TOptions[] = [
  { name: 'Ngày', value: TimeSplit.Day },
  // { name: 'Tuần', value: TimeSplit.Week },
  { name: 'Tháng', value: TimeSplit.Month },
  { name: 'Năm', value: TimeSplit.Year },
];
