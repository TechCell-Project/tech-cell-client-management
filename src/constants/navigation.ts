import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import BurstModeRoundedIcon from '@mui/icons-material/BurstModeRounded';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import AttributionRoundedIcon from '@mui/icons-material/AttributionRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { RootRoutes } from '@constants/enum';

export const DRAWER_WIDTH = 260;

export const LIST_PRODUCT_NAV = [
  { name: 'Điện thoại', to: RootRoutes.PRODUCT_ROUTE, icon: PhoneAndroidRoundedIcon },
  { name: 'Thể loại', to: RootRoutes.CATEGORY_ROUTE, icon: CategoryRoundedIcon },
  { name: 'Thông số', to: RootRoutes.ATTRIBUTE_ROUTE, icon: AttributionRoundedIcon },
];

export const STAFF_ROUTES = [
  { name: 'Trang chủ', to: RootRoutes.DASHBOARD_ROUTE, icon: HouseRoundedIcon },
  {
    name: 'Đơn hàng',
    to: RootRoutes.ORDER_ROUTE,
    icon: ShoppingCartRoundedIcon,
  },
  {
    name: 'Sản phẩm',
    isCollapse: true,
    icon: BurstModeRoundedIcon,
    listChildren: LIST_PRODUCT_NAV,
  },
];

export const MANAGER_ROUTES = [
  { name: 'Trang chủ', to: RootRoutes.DASHBOARD_ROUTE, icon: HouseRoundedIcon },
  {
    name: 'Tài khoản',
    to: RootRoutes.ACCOUNT_ROUTE,
    icon: SwitchAccountRoundedIcon,
  },
];

export const LIST_NAV_OTHER = [
  { name: 'Hồ sơ', icon: AccountCircleRoundedIcon, isProfile: true },
  { name: 'Đổi mật khẩu', icon: ManageAccountsRoundedIcon, isChangePass: true },
  { name: 'Đăng xuất', icon: LogoutRoundedIcon, isLogout: true },
];
