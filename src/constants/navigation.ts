import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import BurstModeRoundedIcon from "@mui/icons-material/BurstModeRounded";
import SwitchAccountRoundedIcon from "@mui/icons-material/SwitchAccountRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import AttributionRoundedIcon from '@mui/icons-material/AttributionRounded';
import { IListNavProps, INavProps } from "@interface/navigation";

const DASHBOARD_ROUTE = "/dashboard";

export const DRAWER_WIDTH = 260;

export const LIST_PRODUCT_NAV = [
  { name: "Điện thoại", to: `${DASHBOARD_ROUTE}/product`, icon: PhoneAndroidRoundedIcon},
  { name: "Thể loại", to: `${DASHBOARD_ROUTE}/product/category`, icon: CategoryRoundedIcon},
  { name: "Thông số", to: `${DASHBOARD_ROUTE}/product/attribute`, icon: AttributionRoundedIcon},
];

export const LIST_NAV_MAIN: INavProps[] = [
  { name: "Trang chủ", to: `${DASHBOARD_ROUTE}`, icon: HouseRoundedIcon },
  {
    name: "Sản phẩm",
    // to: `${DASHBOARD_ROUTE}/product`,
    isAction: true,
    icon: BurstModeRoundedIcon,
    listChildren: LIST_PRODUCT_NAV,
  },
  {
    name: "Tài khoản",
    to: `${DASHBOARD_ROUTE}/account`,
    icon: SwitchAccountRoundedIcon,
  },
  {
    name: "Đơn hàng",
    to: `${DASHBOARD_ROUTE}/order`,
    icon: ShoppingCartRoundedIcon,
  },
];


export const LIST_NAV_OTHER = [
  { name: "Đăng xuất", icon: LogoutRoundedIcon, isAction: true},
];
