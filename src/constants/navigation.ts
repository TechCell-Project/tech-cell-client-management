import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import BurstModeRoundedIcon from '@mui/icons-material/BurstModeRounded';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

const DASHBOARD_ROUTE = '/dashboard';

export const DRAWER_WIDTH = 240;

export const LIST_NAV_MAIN = [
    { name: 'Trang chủ', to: `${DASHBOARD_ROUTE}`, icon: HouseRoundedIcon },
    { name: 'Sản phẩm', to: `${DASHBOARD_ROUTE}/product`, icon: BurstModeRoundedIcon },
    { name: 'Tài khoản', to: `${DASHBOARD_ROUTE}/account`, icon: SwitchAccountRoundedIcon },
    { name: 'Đơn hàng', to: `${DASHBOARD_ROUTE}/order`, icon: ShoppingCartRoundedIcon },
];

export const LIST_NAV_OTHER = [{ name: 'Đăng xuất', icon: LogoutRoundedIcon }];
