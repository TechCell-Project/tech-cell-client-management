import axios, { AxiosInstance } from 'axios';
import { ADDRESS_ENDPOINT, API_BASE_URL } from '@constants/service';
import { District, Province, Ward } from '@models/Location';

const instanceLocation: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getProvince = () => instanceLocation.get<Array<Province>>(`${ADDRESS_ENDPOINT}/provinces`)

export const getDistrict = (province_id: string) => instanceLocation.get<Array<District>>(`${ADDRESS_ENDPOINT}/districts/${province_id}`)

export const getWard = (district_id: string) => instanceLocation.get<Array<Ward>>(`${ADDRESS_ENDPOINT}/wards/${district_id}`)