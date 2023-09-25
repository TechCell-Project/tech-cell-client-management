import { ProductStatus, Roles } from '@constants/enum';
import { IUser } from '@interface/auth';
import { ImageModel } from '@models/Product';
import jwtDecode, { JwtPayload } from 'jwt-decode';

// get information from local storage
export const getCurrentUserId = () => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const id = user._id;
    return id;
  }
  return null;
};

export const getCurrentUserRole = () => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const id = user.role;
    return id;
  }
  return null;
};

export const getAccessToken = () => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const accessToken = user.accessToken;
    return accessToken;
  }
  return null;
};

export const getRefreshToken = () => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const refreshToken = user.refreshToken;
    return refreshToken;
  }
  return null;
};

// authentication
export const setToken = (accessToken: string, refreshToken: string) => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const decodeAccessToken = () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    return jwtDecode<JwtPayload>(accessToken);
  }

  return null;
};

export const isAccessTokenExpired = () => {
  const accessTokenData = decodeAccessToken();

  if (accessTokenData) {
    const { exp } = accessTokenData;
    const currentTime = Math.floor(Date.now() / 1000);

    return Number(exp) < currentTime;
  }

  return true; // Trả về true nếu không có access token hoặc không thể giải mã
};

// common functions
export const getCountImage = (images: ImageModel[], isThumbnail: boolean = false): number => {
  let count = 0;
  if (isThumbnail) {
    count = images?.filter((image) => image.isThumbnail === true).length;
  } else {
    count = images?.filter(
      (image) => image.isThumbnail === false || image.isThumbnail === undefined,
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
  const formattedDate: string = dateFormatter.format(inputDate);

  return formattedDate;
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

// debounce
// export const debounceWithDelay = <T extends any[]>(func: (...args: T) => void, delay: number) =>
//   debounce(func, delay);
