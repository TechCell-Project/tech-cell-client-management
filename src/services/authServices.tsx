import { LOGIN_ENDPOINT, REFRESH_TOKEN_ENDPOINT, REGISTER_ENDPOINT } from '@constants/service';
import instance from './instance';
import { ILogin, IRegister } from '@interface/auth';

export const loginFetching = (payload: ILogin) => instance.post(LOGIN_ENDPOINT, payload);
export const registerFetching = (payload: IRegister) => instance.post(REGISTER_ENDPOINT, payload);
export const refreshFetching = (refreshToken: string) =>
    instance.post(REFRESH_TOKEN_ENDPOINT, { refreshToken });
