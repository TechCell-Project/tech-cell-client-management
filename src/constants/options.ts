import { PaymentMethod, PaymentOrder, PaymentStatus, ProductStatus } from './enum';

export const ROLE_OPTIONS = [
  { value: '', label: 'Không' },
  { value: 'User', label: 'Khách hàng' },
  { value: 'Mod', label: 'Điều hành viên' },
  { value: 'Admin', label: 'Quản trị viên' },
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
  { name: 'Hoạt động', value: 'unblocked' },
  { name: 'Bị chặn', value: 'blocked' },
];

export const ACCOUNT_ROLE_OPTIONS = [
  { value: 'User', name: 'Khách hàng' },
  { value: 'Mod', name: 'Điều hành viên' },
  { value: 'Admin', name: 'Quản trị viên' },
  { value: 'SuperAdmin', name: 'Quản lý' },
];

export const ACCOUNT_EMAIL_OPTIONS = [
  { name: 'Đã xác thực', value: 'verified' },
  { name: 'Chưa xác thực', value: 'unverified' },
];

export const PRODUCT_TYPE_OPTIONS = [
  { name: 'Đang mở', value: 'only_active' },
  { name: 'Đã xóa', value: 'only_deleted' },
  { name: 'Tất cả', value: 'both_deleted_and_active' },
];

export const PAYMENT_METHOD_OPTIONS = [
  { name: 'COD', value: PaymentMethod.COD },
  { name: 'VNPay', value: PaymentMethod.VNPAY },
];

export const PAYMENT_STATUS_OPTIONS = [
  { name: 'Chưa xử lý', value: PaymentStatus.PENDING },
  { name: 'Đã hoàn thành', value: PaymentStatus.COMPLETED },
  { name: 'Hoàn / trả hàng', value: PaymentStatus.REFUNDED },
  { name: 'Đã hủy', value: PaymentStatus.CANCELLED },
  { name: 'Đang xử lý', value: PaymentStatus.PROCESSING },
];

export const ORDER_STATUS_OPTIONS = [
  ...PAYMENT_STATUS_OPTIONS,
  { name: 'Đang vận chuyển', value: PaymentOrder.SHIPPING },
];