import { LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT } from '@constants/service';
import instance from './instance';
import { ILogin } from '@interface/auth';

export const loginFetching = (payload: ILogin) => instance.post(LOGIN_ENDPOINT, payload);
export const refreshFetching = (refreshToken: string) =>
    instance.post(REFRESH_TOKEN_ENDPOINT, refreshToken);
