import instance from '@services/instance';
import { UserAccount } from '@models/Account';
import { PROFILE_ENDPOINT } from '@constants/service';
import { ProfileAddressRequest, ProfileInfoRequest } from '@models/Profile';

export const getProfile = () => instance.get<UserAccount>(PROFILE_ENDPOINT);

export const patchProfileInfo = (payload: ProfileInfoRequest) => instance.patch<UserAccount>(`${PROFILE_ENDPOINT}/info`, payload);

export const patchProfileAddress = (payload: ProfileAddressRequest) => instance.patch<UserAccount>(`${PROFILE_ENDPOINT}/address`, payload);