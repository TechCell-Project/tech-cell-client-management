import instance from "./instance";
import {
  FORGOT_PASSWORD,
  LOGIN_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
  REGISTER_ENDPOINT,
  VERIFY_FORGOT_PASSWORD,
} from "@constants/service";
import { IForgotPassword, ILogin, IRegister } from "@interface/auth";
import { ForgotPasswordModel } from "@models/Auth";

export const fetchLogin = (payload: ILogin) =>
  instance.post(LOGIN_ENDPOINT, payload);
export const fetchRefresh = (refreshToken: string) =>
  instance.post(REFRESH_TOKEN_ENDPOINT, { refreshToken });

export const fetchForgotPassword = (email: string) =>
  instance.post(FORGOT_PASSWORD, { email });
export const fetchVerifyForgotPassword = (payload: ForgotPasswordModel) =>
  instance.post(VERIFY_FORGOT_PASSWORD, payload);
