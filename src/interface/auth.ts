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

export interface IAccountSlice {
  accounts: IUserAccount[] | [];
  account: IUserAccount | null;
  isLoading: boolean;
  isLoadingDetails: boolean;
}

export interface IUserAccount {
  _id?: string;
  email?: string;
  emailVerified?: boolean;
  role?: string;
  address?: Address[];
  firstName?: string;
  lastName?: string;
  block?: {
    isBlocked?: boolean;
    activityLogs?: ActivityLog[];
  };
  createdAt?: string;
  updatedAt?: string;
}

interface Address {
  provinceLevel?: string;
  districtLevel?: string;
  communeLevel?: string;
  detail?: string;
}

interface ActivityLog {
  activity?: string;
  activityBy?: string;
  activityReason?: string;
  activityNote?: string;
}
