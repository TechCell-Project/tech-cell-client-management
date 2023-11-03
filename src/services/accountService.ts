import { USERS_ENDPOINT } from '@constants/service';
import { RegisterModel } from '@models/Auth';
import { PagingResponse } from '@models/Common';
import { PagingAccount, UserAccount } from '@models/Account';
import instance from '@config/axios.config';
import { getSearchParams } from '@utils/funcs';

export const getAllAccounts = (payload: PagingAccount) => {
  let url = getSearchParams(payload)
  return instance.get<PagingResponse<UserAccount>>(USERS_ENDPOINT + "?" + url.toString());
};

export const getDetailsAccount = (id: string) =>
  instance.get<UserAccount>(`${USERS_ENDPOINT}/${id}`);

export const postAccount = (payload: RegisterModel) =>
  instance.post(`${USERS_ENDPOINT}`, payload);

export const patchBlockAccount = (id: string) =>
  instance.patch(`${USERS_ENDPOINT}/${id}/block`);

export const patchUnBlockAccount = (id: string) =>
  instance.patch(`${USERS_ENDPOINT}/${id}/unblock`);

export const patchChangeRoleAccount = (id: string, role: string) =>
  instance.patch(`${USERS_ENDPOINT}/${id}/change-role`, { role });
