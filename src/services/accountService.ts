import { USERS_ENDPOINT } from '@constants/service';
import instance from './instance';
import { RegisterModel } from '@models/Auth';
import { Paging, PagingResponse } from '@models/Common';
import { PagingAccount, UserAccount } from '@models/Account';

export const getAllAccounts = (payload: PagingAccount) => {
  let url = new URLSearchParams();

  Object.entries(payload).map(([key, value]) => {
    if(key === "page") {
      value += 1;
    }
    if(value === null || !value) {
      return;
    }
    url.append(key, value);
  });

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
