import { AttributeModel, CreateAttributeModel, PagingAttribute } from '@models/Attribute';
import instance from './instance';
import { ATTRIBUTES_ENDPOINT } from '@constants/service';

export const getAttributes = (payload: PagingAttribute) => {
  const { keyword, select_type, page, pageSize } = payload;

  let url = `${ATTRIBUTES_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

  if (select_type) {
    url += `&select_type=${select_type}`;
  }

  if (keyword) {
    url += `&keyword=${keyword}`;
  }

  return instance.get<Array<AttributeModel>>(url);
};

export const postAttribute = (payload: CreateAttributeModel) =>
  instance.post<CreateAttributeModel>(`${ATTRIBUTES_ENDPOINT}`, payload);

export const patchAttribute = (payload: CreateAttributeModel, id: string) =>
  instance.patch<CreateAttributeModel>(`${ATTRIBUTES_ENDPOINT}/${id}`, payload);

export const getByIdAttribute = (id: string) => instance.get(`${ATTRIBUTES_ENDPOINT}/${id}`);

export const getByLabelAttribute = (label: string) =>
  instance.get(`${ATTRIBUTES_ENDPOINT}/label/${label}`);

export const deleteAttribute = (id: string) => instance.delete(`${ATTRIBUTES_ENDPOINT}/${id}`);
