import { ProductStatus } from "./enum";

export const ROLE_OPTIONS = [
  { value: "", label: "Không" },
  { value: "User", label: "Khách hàng" },
  { value: "Mod", label: "Điều hành viên" },
  { value: "Admin", label: "Quản trị viên" },
  // { value: "SuperAdmin", label: "Quản lý" },
];

export const STATUS_PRODUCT_OPTIONS = [
  { label: "Chọn trạng thái", value: null},
  { label: "Sắp ra mắt", value: ProductStatus.ComingSoon},
  { label: "Hàng mới về", value: ProductStatus.NewArrival},
  { label: "Đặt hàng trước", value: ProductStatus.Pre_order},
  { label: "Đang bán", value: ProductStatus.OnSales},
  { label: "Ẩn", value: ProductStatus.Hide},
  { label: "Không bán", value: ProductStatus.NotSales},
  { label: "Còn ít hàng", value: ProductStatus.LowStock},
  { label: "Tạm thời hết hàng", value: ProductStatus.TemporarilyOutOfStock},
]