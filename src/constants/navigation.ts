import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import BurstModeRoundedIcon from '@mui/icons-material/BurstModeRounded';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

export const LIST_NAV_MAIN = [
    { name: 'Trang chủ', to: '/dashboard', icon: HouseRoundedIcon },
    { name: 'Sản phẩm', to: '/dashboard/product', icon: BurstModeRoundedIcon },
    { name: 'Tài khoản', to: '/dashboard/account', icon: SwitchAccountRoundedIcon },
    { name: 'Đơn hàng', to: '/dashboard/order', icon: ShoppingCartRoundedIcon },
];

export const LIST_NAV_OTHER = [{ name: 'Đăng xuất', icon: LogoutRoundedIcon }];
