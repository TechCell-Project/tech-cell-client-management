import { Paging, PagingResponse } from './Common';
import { District, Province, Ward } from '@models/Location';
import { ImageModel } from '@models/Product';

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
  _id: string | null = null;
  email: string | null = null;
  emailVerified: boolean = false;
  role: string | null = null;
  userName: string | null = null;
  avatar: ImageModel | Blob = new ImageModel();
  avatarPublicId?: string | null = null;
  address: Address[] = new Array<Address>();
  accessToken: string | null = null;
  refreshToken: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  password?: string | null = null;
  block?: {
    isBlocked?: boolean;
    activityLogs?: ActivityLog[];
  };
  createdAt: string | null = null;
  updatedAt: string | null = null;
}

export class Address {
  addressName: string | null = null;
  customerName: string | null = null;
  phoneNumbers: string | null = null;
  provinceLevel: Province | Province[] | null = null;
  districtLevel: District | District[] | null = null;
  wardLevel: Ward | Ward[] | null = null;
  detail: string | null = null;
  isDefault: boolean = false;
}

export class ActivityLog {
  activity: string | null = null;
  activityBy: string | null = null;
  activityReason: string | null = null;
  activityNote: string | null = null;
}
