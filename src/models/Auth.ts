export class LoginModel {
    email?: string | null = null;
    password?: string | null = null;
}

export class RegisterModel extends LoginModel {
    re_password?: string | null = null;
    firstName?: string | null = null;
    lastName?: string | null = null;
}

export class UserModel {
    _id?: string | null = null;
    email?: string | null = null;
    address?: string[] | null = null;
    role?: string | null = null;
    accessToken?: string | null = null;
    refreshToken?: string | null = null;
}
