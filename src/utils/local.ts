import { IUser } from '@interface/auth';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const getCurrentUserId = () => {
  if (typeof window !== 'undefined') {
    const userObj = localStorage.getItem('user');
    if (userObj) {
      const user: IUser = JSON.parse(userObj);
      return user._id;
    }
  }
  return null;
};

export const getCurrentUserRole = () => {
  if (typeof window !== 'undefined') {
    const userObj = localStorage.getItem('user');
    if (userObj) {
      const user: IUser = JSON.parse(userObj);
      return user.role;
    }
  }
  return null;
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const userObj = localStorage.getItem('user');
    if (userObj) {
      const user: IUser = JSON.parse(userObj);
      return user.accessToken;
    }
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    const userObj = localStorage.getItem('user');
    if (userObj) {
      const user: IUser = JSON.parse(userObj);
      return user.refreshToken;
    }
  }
  return null;
};

// authentication
export const setToken = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    const userObj = localStorage.getItem('user');
    if (userObj) {
      const user: IUser = JSON.parse(userObj);
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      localStorage.setItem('user', JSON.stringify(user));
    }
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