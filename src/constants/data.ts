import { RootRoutes } from "./enum";

export const TITLE_TECHCELL = "Trang Quản Trị TechCell";

export const COLUMNS_ACCOUNT = [
  { field: "no", headerName: "STT", width: 70 },
  { field: "name", headerName: "Họ Và Tên", width: 220 },
  { field: "role", headerName: "Vai Trò", width: 200 },
  { field: "email", headerName: "Email", minWidth: 280, flex: 1 },
  { field: "status", headerName: "Trạng Thái", width: 120 },
];

export const COLUMNS_PRODUCT = [
  { field: "no", headerName: "STT", width: 70 },
  { field: "name", headerName: "Tên Sản Phẩm", width: 200 },
  {
    field: "categories",
    headerName: "Thể loại",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Tình Trạng Sản Phẩm",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
];

export const COLUMNS_ATTRIBUTE = [
  { field: "no", headerName: "STT", width: 70 },
  {
    field: "name",
    headerName: "Thông số",
    width: 250,
  },
  {
    field: "label",
    headerName: "# Label",
    width: 200,
  },
  {
    field: "description",
    headerName: "Mô tả",
    minWidth: 400,
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
];

export const COLUMNS_CATEGORY = [
  { field: "no", headerName: "STT", width: 70 },
  {
    field: "name",
    headerName: "Thể loại",
    width: 200,
  },
  {
    field: "label",
    headerName: "# Label",
    width: 200,
  },
  {
    field: "requiresAttribute",
    headerName: "Danh sách thông số/thuộc tính",
    flex: 1,
    minWidth: 400,
    headerAlign: "center",
  },
]

export const PATHS = [
  { pathname: RootRoutes.DASHBOARD_ROUTE, name: "Trang chủ" },
  { pathname: RootRoutes.ACCOUNT_ROUTE, name: "Tài khoản" },
  { pathname: RootRoutes.PRODUCT_ROUTE, name: "Sản phẩm" },
  { pathname: RootRoutes.CATEGORY_ROUTE, name: "Thể loại" },
  { pathname: RootRoutes.ATTRIBUTE_ROUTE, name: "Thông số" },
  { pathname: RootRoutes.ORDER_ROUTE, name: "Đơn hàng" },
];
