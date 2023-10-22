export class Location {
  name_extension: Array<string> = [];
  status: number | null = null;
}

export class Province<T = string> extends Location {
  province_id: T | null = null;
  province_name: T | null = null;
  country_id: number | null = null;
}

export class District<T = string> extends Location {
  province_id: T | null = null;
  district_id: T | null = null;
  district_name: T | null = null;
  support_type: number | null = null;
  can_update_cod: boolean = false;
}

export class Ward<T = string> extends Location {
  district_id: T | null = null;
  ward_code: T | null = null;
  ward_name: T | null = null;
  support_type: number | null = null;
  can_update_cod: boolean = false;
}