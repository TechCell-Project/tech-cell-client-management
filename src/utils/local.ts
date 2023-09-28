import { IUser } from '@interface/auth';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const getCurrentUserId = () => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    return user._id;
  }
  return null;
};

export const getCurrentUserRole = () => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    return user.role;
  }
  return null;
};

export const getAccessToken = () => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    return user.accessToken;
  }
  return null;
};

export const getRefreshToken = () => {
  const userObj = localStorage.getItem('user');
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    return user.refreshToken;
  }
  return null;
};

// authentication
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

  return true;
};