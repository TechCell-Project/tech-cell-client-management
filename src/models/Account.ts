import { PagingResponse } from "./Common";

export class AccountSlice {
  accounts: UserDataAccount = new UserDataAccount();
  account: UserAccount | null = null;
  isLoading: boolean = false;
  isLoadingDetails: boolean = false;
}

export class UserDataAccount extends PagingResponse {
  data: Array<UserAccount> = [];
}

export class UserAccount {
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

export class Address {
  provinceLevel?: string;
  districtLevel?: string;
  communeLevel?: string;
  detail?: string;
}

export class ActivityLog {
  activity?: string;
  activityBy?: string;
  activityReason?: string;
  activityNote?: string;
}
