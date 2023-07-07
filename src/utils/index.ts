import { IUser } from '@interface/auth';
import jwtDecode, { JwtPayload } from 'jwt-decode';

// authentication
export const getAccessToken = () => {
    const userObj = localStorage.getItem('user');
    if (userObj) {
        const user: IUser = JSON.parse(userObj);
        const accessToken = user.accessToken;
        return accessToken;
    }
    return null;
};

export const getRefreshToken = () => {
    const userObj = localStorage.getItem('user');
    if (userObj) {
        const user: IUser = JSON.parse(userObj);
        const refreshToken = user.refreshToken;
        return refreshToken;
    }
    return null;
};

export const setToken = (accessToken: string, refreshToken: string) => {
    const userObj = localStorage.getItem('user');
    if (userObj) {
        const user: IUser = JSON.parse(userObj);
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        localStorage.setItem('user', JSON.stringify(user));
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
        case 'User':
            return 'Khách hàng';
        case 'Admin':
            return 'Quản trị viên';
        case 'Mod':
            return 'Điều hành viên';
        case 'SuperAdmin':
            return 'Quản lý';
        default:
            return '';
    }
};