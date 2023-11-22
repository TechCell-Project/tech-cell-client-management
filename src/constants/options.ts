import {
  AccountStatus,
  EmailStatus,
  PaymentMethod,
  PaymentOrder,
  PaymentStatus,
  ProductStatus,
  ProductType,
  Roles,
} from './enum';

export const ROLE_OPTIONS = [
  { value: '', label: 'Không' },
  { value: Roles.User, label: 'Khách hàng' },
  { value: Roles.Mod, label: 'Điều hành viên' },
  { value: Roles.Admin, label: 'Quản trị viên' },
];

export const STATUS_PRODUCT_OPTIONS = [
  { label: 'Chọn trạng thái', value: null },
  { label: 'Sắp ra mắt', value: ProductStatus.ComingSoon },
  { label: 'Hàng mới về', value: ProductStatus.NewArrival },
  { label: 'Đặt hàng trước', value: ProductStatus.Pre_order },
  { label: 'Đang bán', value: ProductStatus.OnSales },
  { label: 'Ẩn', value: ProductStatus.Hide },
  { label: 'Không bán', value: ProductStatus.NotSales },
  { label: 'Còn ít hàng', value: ProductStatus.LowStock },
  { label: 'Tạm thời hết hàng', value: ProductStatus.TemporarilyOutOfStock },
  { label: 'Đã xóa', value: ProductStatus.Deleted },
];

// Filters
export const ACCOUNT_STATUS_OPTIONS = [
  { name: 'Hoạt động', value: AccountStatus.Unblocked },
  { name: 'Bị chặn', value: AccountStatus.Blocked },
];

export const ACCOUNT_ROLE_OPTIONS = [
  { value: Roles.User, name: 'Khách hàng' },
  { value: Roles.Mod, name: 'Điều hành viên' },
  { value: Roles.Admin, name: 'Quản trị viên' },
  { value: Roles.SuperAdmin, name: 'Quản lý' },
];

export const ACCOUNT_EMAIL_OPTIONS = [
  { name: 'Đã xác thực', value: EmailStatus.Verified },
  { name: 'Chưa xác thực', value: EmailStatus.Unverified },
];

export const PRODUCT_TYPE_OPTIONS = [
  { name: 'Đang mở', value: ProductType.OnlyActive },
  { name: 'Đã xóa', value: ProductType.OnlyDeleted },
  { name: 'Tất cả', value: ProductType.BothDeleteAndActive },
];

export const PAYMENT_METHOD_OPTIONS = [
  { name: 'Thanh toán khi nhận hàng', value: PaymentMethod.COD },
  { name: 'VNPay', value: PaymentMethod.VNPAY },
];

export const PAYMENT_STATUS_OPTIONS = [
  { name: 'Chưa xử lý', value: PaymentStatus.PENDING, step: 1, content: 'Xác nhận đơn hàng' },
  { name: 'Giao hàng thành công', value: PaymentStatus.COMPLETED, step: 4, content: 'Hoàn trả / hàng' },
  { name: 'Hoàn / trả hàng', value: PaymentStatus.REFUNDED, step: 5 },
  { name: 'Đã hủy', value: PaymentStatus.CANCELLED, step: 6 },
  { name: 'Đang chuẩn bị hàng', value: PaymentStatus.PROCESSING, step: 2, content: 'Tiến hành giao hàng' },
];

export const ORDER_STATUS_OPTIONS = [
  ...PAYMENT_STATUS_OPTIONS,
  { name: 'Đang vận chuyển', value: PaymentOrder.SHIPPING, step: 3, content: 'Xác nhận giao thành công' },
];