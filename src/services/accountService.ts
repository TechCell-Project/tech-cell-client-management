import { USERS_ENDPOINT } from "@constants/service";
import instance from "./instance";
import { RegisterModel } from "@models/Auth";
import { Paging } from "@models/Common";

export const getAllAccounts = (payload: Paging) =>
  instance.get(
    `${USERS_ENDPOINT}?page=${Number(payload.page) + 1}&pageSize=${payload.pageSize}`
  );

export const getDetailsAccount = (id: string) =>
  instance.get(`${USERS_ENDPOINT}/${id}`);

export const postAccount = (payload: RegisterModel) =>
  instance.post(`${USERS_ENDPOINT}`, payload);

export const patchBlockAccount = (id: string) =>
  instance.patch(`${USERS_ENDPOINT}/${id}/block`);

export const patchUnBlockAccount = (id: string) =>
  instance.patch(`${USERS_ENDPOINT}/${id}/unblock`);
  
export const patchChangeRoleAccount = (id: string, role: string) =>
  instance.patch(`${USERS_ENDPOINT}/${id}/change-role`, { role });
