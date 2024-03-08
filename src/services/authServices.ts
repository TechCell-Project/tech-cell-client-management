import { AUTH_ENDPOINT } from '@constants/service';
import { ForgotPasswordModel, AccountChangePass, LoginModel } from '@models/Auth';
import instance from '@config/axios.config';

export const fetchLogin = (payload: LoginModel) => instance.post(`${AUTH_ENDPOINT}/login`, payload);

export const fetchRefresh = (refreshToken: string) =>
  instance.post(`${AUTH_ENDPOINT}/refresh-token`, { refreshToken });

export const fetchForgotPassword = (email: string) =>
  instance.post(`${AUTH_ENDPOINT}/forgot-password`, { email });

export const fetchVerifyForgotPassword = (payload: ForgotPasswordModel) =>
  instance.post(`${AUTH_ENDPOINT}/verify-forgot-password`, payload);

export const postChangePass = (payload: AccountChangePass) =>
  instance.post(`${AUTH_ENDPOINT}/change-password`, payload);

export const verifyEmail = (email: string, otpCode: string) =>
  instance.post(`${AUTH_ENDPOINT}/verify-email`, {
    email,
    otpCode,
  });

export const sendOtpVerify = (email: string) =>
  instance.post(`${AUTH_ENDPOINT}/resend-verify-email-otp`, { email });
