import { AttributeModel, CreateAttributeModel, PagingAttribute } from '@models/Attribute';
import { ATTRIBUTES_ENDPOINT } from '@constants/service';
import { getSearchParams } from '@utils/funcs';
import { PagingResponse } from '@models/Common';
import instance from '@config/axios.config';

export const getAttributes = (payload: PagingAttribute) => {
  const url = getSearchParams(payload);
  return instance.get<PagingResponse<AttributeModel>>(ATTRIBUTES_ENDPOINT + '?' + url);
};

export const postAttribute = (payload: CreateAttributeModel) =>
  instance.post(`${ATTRIBUTES_ENDPOINT}`, payload);

export const patchAttribute = (payload: CreateAttributeModel, id: string) =>
  instance.patch(`${ATTRIBUTES_ENDPOINT}/${id}`, payload);

export const getByIdAttribute = (id: string) => instance.get(`${ATTRIBUTES_ENDPOINT}/${id}`);

export const getByLabelAttribute = (label: string) =>
  instance.get(`${ATTRIBUTES_ENDPOINT}/label/${label}`);

export const deleteAttribute = (id: string) => instance.delete(`${ATTRIBUTES_ENDPOINT}/${id}`);
