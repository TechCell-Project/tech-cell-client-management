import { UserAccount } from '@models/Account';
import { PROFILE_ENDPOINT } from '@constants/service';
import { ProfileAddressRequest } from '@models/Profile';
import instance from '@config/axios.config';

export const getProfile = () => instance.get<UserAccount>(PROFILE_ENDPOINT);

export const patchProfileInfo = (payload: Partial<UserAccount>) => instance.patch<UserAccount>(`${PROFILE_ENDPOINT}/info`, payload);

export const patchProfileAddress = (payload: ProfileAddressRequest) => instance.patch<UserAccount>(`${PROFILE_ENDPOINT}/address`, payload);