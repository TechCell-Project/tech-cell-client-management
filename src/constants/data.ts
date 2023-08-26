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
  { field: "name", headerName: "Tên Sản Phẩm", minWidth: 350, maxWidth: 400 },
  {
    field: "categories",
    headerName: "Hệ Điều Hành",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "manufacturer",
    headerName: "Nhà Sản Xuất",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "price",
    headerName: "Giá Niêm Yết (VNĐ)",
    width: 200,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "status",
    headerName: "Tình Trạng",
    width: 150,
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

export enum RootRoutes {
  DASHBOARD_ROUTE = "/dashboard",
  ACCOUNT_ROUTE = "/dashboard/account",
  PRODUCT_ROUTE = "/dashboard/product",
  PRODUCT_CREATE_ROUTE = "/dashboard/product/create",
  CATEGORY_ROUTE = "/dashboard/product/category",
  ATTRIBUTE_ROUTE = "/dashboard/product/attribute",
  ORDER_ROUTE = "/dashboard/order",
}

export const PATHS = [
  { pathname: RootRoutes.DASHBOARD_ROUTE, name: "Trang chủ" },
  { pathname: RootRoutes.ACCOUNT_ROUTE, name: "Tài khoản" },
  { pathname: RootRoutes.PRODUCT_ROUTE, name: "Sản phẩm" },
  { pathname: RootRoutes.CATEGORY_ROUTE, name: "Thể loại" },
  { pathname: RootRoutes.ATTRIBUTE_ROUTE, name: "Thông số" },
  { pathname: RootRoutes.ORDER_ROUTE, name: "Đơn hàng" },
];
