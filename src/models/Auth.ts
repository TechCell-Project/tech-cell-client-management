import { UserAccount } from '@models/Account';

export class LoginModel {
  emailOrUsername?: string | null = null;
  password?: string | null = null;

  constructor(initValues?: LoginModel) {
    if(initValues) {
      Object.assign(this, initValues)
    }
  }
}

export class RegisterModel {
  userName?: string | null = null;
  password?: string | null = null;
  role?: string | null = null;
  email?: string | null = null;
  firstName?: string | null = null;
  lastName?: string | null = null;
}

export class ForgotPasswordModel {
  email?: string | null = null;
  otpCode?: string | null = null;
  password?: string | null = null;
  re_password?: string | null = null;
}

export class AccountChangePass {
  oldPassword?: string = '';
  newPassword?: string = '';
  reNewPassword?: string = '';
}

export class AuthSlice {
  user: UserAccount | null = new UserAccount();
  isLoading: boolean = false;
  isLoadingProfile: boolean = false;
  isAuthenticated: boolean = false;
}