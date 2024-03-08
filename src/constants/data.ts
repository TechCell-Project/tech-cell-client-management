import { RootRoutes } from './enum';

export const TITLE_TECHCELL = 'Trang Quản Trị TechCell';

export const EMAIL_TEST = 'suad@techcell.cloud';
export const PASSWORD_TEST = 'test12345';

export const PATHS = [
  { pathname: RootRoutes.DASHBOARD_ROUTE, name: 'Trang chủ' },
  { pathname: RootRoutes.ACCOUNT_ROUTE, name: 'Tài khoản' },
  { pathname: RootRoutes.PRODUCT_ROUTE, name: 'Sản phẩm' },
  { pathname: RootRoutes.CATEGORY_ROUTE, name: 'Thể loại' },
  { pathname: RootRoutes.ATTRIBUTE_ROUTE, name: 'Thông số' },
  { pathname: RootRoutes.ORDER_ROUTE, name: 'Đơn hàng' },
];
