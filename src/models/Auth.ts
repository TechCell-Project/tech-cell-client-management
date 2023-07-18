export class LoginModel {
  emailOrUsername?: string | null = null;
  password?: string | null = null;
}

export class RegisterModel extends LoginModel {
  re_password?: string | null = null;
  firstName?: string | null = null;
  lastName?: string | null = null;
}

export class ForgotPasswordModel {
  email?: string | null = null;
  otpCode?: string | null = null;
  password?: string | null = null;
  re_password?: string | null = null;
}