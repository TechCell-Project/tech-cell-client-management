// common functions
import { ImageModel } from '@models/Product';
import { ProductStatus, Roles } from '@constants/enum';
import { getCurrentUserRole } from '@utils/local';

export const getCountImage = (images: ImageModel[], isThumbnail: boolean = false): number => {
  let count = 0;
  if (isThumbnail) {
    count = images?.filter((image) => image.isThumbnail).length;
  } else {
    count = images?.filter(
      (image) => !image.isThumbnail || image.isThumbnail === undefined,
    ).length;
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

// get status product
const productStatusMapping: { [key: number]: string } = {
  [ProductStatus.ComingSoon]: 'Sắp ra mắt',
  [ProductStatus.NewArrival]: 'Hàng mới về',
  [ProductStatus.Pre_order]: 'Đặt hàng trước',
  [ProductStatus.OnSales]: 'Đang bán',
  [ProductStatus.Hide]: 'Ẩn',
  [ProductStatus.NotSales]: 'Không bán',
  [ProductStatus.LowStock]: 'Còn ít hàng',
  [ProductStatus.TemporarilyOutOfStock]: 'Tạm thời hết hàng',
};

export const getStatusProduct = (value: number): string => {
  return productStatusMapping[value] || '?';
};

export const getIndexNo = (index: number, page: number, pageSize: number): number => {
  return index + 1 + page * pageSize;
};

// format
export const formatWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeCommas = (inputString: string) => {
  return parseInt(inputString.replace(/,/g, ''), 10);
};

export const formatTimeCountdown = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatDateViVN = (dateString: string) => {
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