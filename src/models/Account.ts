import { Paging, PagingResponse } from './Common';

export class PagingAccount extends Paging {
  order_field?: string | null = null;
  sort_order?: string | null = null;
  status?: string | null = null;
  role?: string | null = null;
  emailVerified?: string | null = null;
}

export class AccountSlice {
  accounts: PagingResponse<UserAccount> = new PagingResponse<UserAccount>();
  account: UserAccount | null = null;
  isLoading: boolean = false;
  isLoadingDetails: boolean = false;
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
