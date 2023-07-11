import { USERS_ENDPOINT } from '@constants/service';
import instance from './instance';

export const getAllAccounts = () => instance.get(`${USERS_ENDPOINT}?all=true`);
export const getDetailsAccount = (id: string) => instance.get(`${USERS_ENDPOINT}/${id}`);

export const patchBlockAccount = (id: string) => instance.patch(`${USERS_ENDPOINT}/${id}/block`);
export const patchUnBlockAccount = (id: string) =>
  instance.patch(`${USERS_ENDPOINT}/${id}/unblock`);
export const patchChangeRoleAccount = (id: string, role: string) =>
  instance.patch(`${USERS_ENDPOINT}/${id}/change-role`, { role });
