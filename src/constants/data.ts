
export const TITLE_TECHCELL = "Trang Quản Trị TechCell";

export const COLUMNS_ACCOUNT = [
  { field: "no", headerName: "STT", width: 70 },
  { field: "name", headerName: "Họ Và Tên", width: 220 },
  { field: "role", headerName: "Vai Trò", width: 150 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "status", headerName: "Trạng Thái", width: 120 },
];

export const PATHS = [
  { pathname: "/dashboard", name: "Trang chủ" },
  { pathname: "/dashboard/account", name: "Tài khoản" },
  { pathname: "/dashboard/product", name: "Sản phẩm" },
  { pathname: "/dashboard/order", name: "Đơn hàng" },
];

