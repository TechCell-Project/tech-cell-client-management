import { Address, UserAccount } from '@models/Account';
import { getDistrict, getWard } from '@services/locationService';
import { District, Province, Ward } from '@models/Location';

export class ProfileInfoRequest {
  userName: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  avatar: string | null = null;

  constructor(values: UserAccount) {
    Object.assign(this, {
      userName: values.userName,
      firstName: values.firstName,
      lastName: values.lastName,
      avatar: values.avatar,
    });
  }
}

export class ProfileAddressRequest {
  address: Array<Address> = new Array<Address>();

  constructor(values: Array<Address>) {
    if (values.length > 0) {
      Object.assign(this, { address: values });
    }
  }

  static loadDistricts = async (province_id: string) => {
    return getDistrict(province_id)
      .then(({ data }) => data)
      .catch(() => new Array<District>());
  };

  static loadWards = async (district_id: string) => {
    return getWard(district_id)
      .then(({ data }) => data)
      .catch(() => new Array<Ward>());
  };
}