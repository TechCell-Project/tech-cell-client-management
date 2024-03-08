import { ImageModel } from '@models/Product';
import {
  AccountStatusVi,
  PaymentOrder,
  PaymentStatus,
  ProductStatus,
  Roles,
} from '@constants/enum';
import { getCurrentUserRole } from '@utils/local';
import { Address } from '@models/Account';
import { District, Province, Ward } from '@models/Location';

export const getCountImage = (images: ImageModel[], isThumbnail: boolean = false): number => {
  let count: number;
  if (isThumbnail) {
    count = images?.filter((image) => image.isThumbnail).length;
  } else {
    count = images?.filter((image) => !image.isThumbnail || false).length;
  }
  return count;
};

export const getRole = (role?: string | null) => {
  switch (role) {
    case Roles.User:
      return 'Khách hàng';
    case Roles.Admin:
      return 'Quản trị viên';
    case Roles.Mod:
      return 'Điều hành viên';
    case Roles.SuperAdmin:
      return 'Quản lý';
    default:
      return '';
  }
};

export const getStatusAccount = (isBlocked?: boolean): string => {
  return isBlocked ? AccountStatusVi.Blocked : AccountStatusVi.Unblocked;
};

// get status ViVN
export const productStatusMapping: { [key: number]: string } = {
  [ProductStatus.ComingSoon]: 'Sắp ra mắt',
  [ProductStatus.NewArrival]: 'Hàng mới về',
  [ProductStatus.Pre_order]: 'Đặt hàng trước',
  [ProductStatus.OnSales]: 'Đang bán',
  [ProductStatus.Hide]: 'Ẩn',
  [ProductStatus.NotSales]: 'Không bán',
  [ProductStatus.LowStock]: 'Còn ít hàng',
  [ProductStatus.TemporarilyOutOfStock]: 'Tạm thời hết hàng',
  [ProductStatus.Deleted]: 'Đã xóa',
};

export const orderStatusMapping: { [key: string]: string } = {
  [PaymentStatus.PENDING]: 'Chưa xử lý',
  [PaymentStatus.COMPLETED]: 'Giao hàng thành công',
  [PaymentStatus.CANCELLED]: 'Đã hủy',
  [PaymentStatus.REFUNDED]: 'Hoàn / trả hàng',
  [PaymentStatus.PROCESSING]: 'Đang chuẩn bị hàng',
  [PaymentOrder.SHIPPING]: 'Đang vận chuyển',
  [PaymentOrder.WAIT_FOR_PAYMENT]: 'Chờ thanh toán',
};

export const paymentStatusMapping: { [key: string]: string } = {
  [PaymentStatus.PENDING]: 'Chưa xử lý',
  [PaymentStatus.COMPLETED]: 'Đã thanh toán',
  [PaymentStatus.PROCESSING]: 'Chờ thanh toán',
  [PaymentOrder.WAIT_FOR_PAYMENT]: 'Chờ thanh toán',
  [PaymentStatus.CANCELLED]: 'Đã hủy',
};

export const getIndexNo = (index: number, page: number, pageSize: number): number => {
  return index + 1 + page * pageSize;
};

// format
export const formatWithCommas = (number: number) => {
  if (number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  }
  return '0 ₫';
};

export const formatTimeCountdown = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatDateViVN = (dateString: string) => {
  try {
    const inputDate: Date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('vi-VN', options);
    return dateFormatter.format(inputDate);
  } catch {
    return '';
  }
};

export const isRoleAccepted = (role?: string): boolean => {
  const currentRole = getCurrentUserRole();

  switch (currentRole) {
    case Roles.SuperAdmin:
      return true;
    case Roles.Admin:
      return role !== getRole(Roles.SuperAdmin) && role !== getRole(Roles.Admin);
    case Roles.Mod:
      return role === getRole(Roles.User);
    default:
      return false;
  }
};

export const getSearchParams = <T extends number | string = any>(
  payload: Record<string, T>,
): string => {
  const url = new URLSearchParams();

  Object.entries(payload).map(([key, value]) => {
    if (key === 'page') {
      value = (parseInt(value as string, 10) + 1) as T;
    }
    if (value === null || !value) {
      return;
    }
    url.append(key, value.toString());
  });

  return url.toString();
};

export const getAddressLocation = (address: Address) => {
  try {
    return `
      ${(address.wardLevel as Ward)?.ward_name ?? ''},
      ${(address.districtLevel as District)?.district_name ?? ''},
      ${(address.provinceLevel as Province)?.province_name ?? ''}
    `;
  } catch {
    return '';
  }
};

export const getFirstAndLastDayOfMonth = (
  year: number,
  month: number,
): { firstDay: string; lastDay: string } => {
  month = Math.max(0, Math.min(11, month));

  const firstDay = new Date(year, month, 1).toISOString();
  const lastDay = new Date(year, month + 1, 0).toISOString();

  return { firstDay, lastDay };
};
