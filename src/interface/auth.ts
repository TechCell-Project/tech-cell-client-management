export interface ILogin {
  emailOrUsername?: string | null;
  password?: string | null;
}

export interface IRegister {
  email?: string | null;
  password?: string | null;
  re_password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export interface IUser {
  _id?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  address?: string[] | null;
  role?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export interface IAuthSlice {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface IForgotPassword {
  email?: string | null;
  otpCode: string | null;
  password: string | null;
  re_password: string | null;
}
