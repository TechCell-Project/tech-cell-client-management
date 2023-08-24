import { IUser } from "@interface/auth";
import jwtDecode, { JwtPayload } from "jwt-decode";

// get information from local storage
export const getCurrentUserId = () => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const id = user._id;
    return id;
  }
  return null;
};

export const getCurrentUserRole = () => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const id = user.role;
    return id;
  }
  return null;
};

export const getAccessToken = () => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const accessToken = user.accessToken;
    return accessToken;
  }
  return null;
};

export const getRefreshToken = () => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const refreshToken = user.refreshToken;
    return refreshToken;
  }
  return null;
};

// authentication
export const setToken = (accessToken: string, refreshToken: string) => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    localStorage.setItem("user", JSON.stringify(user));
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
export const getRole = (role?: string | null) => {
  switch (role) {
    case "User":
      return "Khách hàng";
    case "Admin":
      return "Quản trị viên";
    case "Mod":
      return "Điều hành viên";
    case "SuperAdmin":
      return "Quản lý";
    default:
      return "";
  }
};

// get status product
enum productStatus {
  ComingSoon = 1,
  NewArrival = 2,
  Pre_order = 3,
  OnSales = 4,
  Hide = 5,
  NotSales = 6,
  LowStock = 7,
  TemporarilyOutOfStock = 8,
}

const productStatusMapping: { [key: number]: string } = {
  [productStatus.ComingSoon]: "Sắp ra mắt",
  [productStatus.NewArrival]: "Hàng mới về",
  [productStatus.Pre_order]: "Đặt hàng trước",
  [productStatus.OnSales]: "Đang bán",
  [productStatus.Hide]: "Ẩn",
  [productStatus.NotSales]: "Không bán",
  [productStatus.LowStock]: "Còn ít hàng",
  [productStatus.TemporarilyOutOfStock]: "Tạm thời hết hàng",
};

export const getStatusProduct = (value: number): string => {
  return productStatusMapping[value] || "?"
};

export const getIndexNo = (index: number, page: number, pageSize: number): number => {
  return index + 1 + page * pageSize;
}

// format
export const formatWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const removeCommas = (inputString: string) => {
  return parseInt(inputString.replace(/,/g, ""), 10);
};

export const formatDateViVN = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleString("vi-VN", options);
};

export const isRoleAccepted = (role?: string): boolean => {
  const currentRole = getCurrentUserRole();

  switch (currentRole) {
    case "SuperAdmin":
      return true;
    case "Admin":
      return role !== getRole("SuperAdmin") && role !== getRole("Admin");
    case "Mod":
      return role === getRole("User");
    default:
      return false;
  }
};
