import { Address } from '@models/Account';

export class ProfileAddressRequest {
  address: Array<Address> = new Array<Address>();

  constructor(values: Array<Address>) {
    if (values.length > 0) {
      Object.assign(this, { address: values });
    }
  }
}
