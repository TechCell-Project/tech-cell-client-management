import { Address, UserAccount } from '@models/Account';
import { getDistrict, getWard } from '@services/locationService';
import { District, Province, Ward } from '@models/Location';

export class ProfileAddressRequest {
  address: Array<Address> = new Array<Address>();

  constructor(values: Array<Address>) {
    if (values.length > 0) {
      Object.assign(this, { address: values });
    }
  }
}