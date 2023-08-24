import { CreateAttributeModel, SearchAttributeModel } from "@models/Attribute";
import instance from "./instance";
import { ATTRIBUTES_ENDPOINT } from "@constants/service";

export const getAttributes = (payload: SearchAttributeModel) => {
  const { no_limit, select_type, page, pageSize } = payload;

  if (no_limit) {
    return instance.get(
      `${ATTRIBUTES_ENDPOINT}?no_limit=${no_limit}&select_type=${select_type ?? "only_active"}`
    );
  } else {
    return instance.get(
      `${ATTRIBUTES_ENDPOINT}?no_limit=${no_limit ?? false}&select_type=${select_type ?? "only_active"}&page=${page + 1}&pageSize=${pageSize}`
    );
  }
};

export const postAttribute = (payload: CreateAttributeModel) =>
  instance.post<CreateAttributeModel>(`${ATTRIBUTES_ENDPOINT}`, payload);

export const patchAttribute = (payload: CreateAttributeModel, id: string) =>
  instance.patch<CreateAttributeModel>(`${ATTRIBUTES_ENDPOINT}/${id}`, payload);

export const getByIdAttribute = (id: string) =>
  instance.get(`${ATTRIBUTES_ENDPOINT}/${id}`);

export const getByLabelAttribute = (label: string) =>
  instance.get(`${ATTRIBUTES_ENDPOINT}/label/${label}`);

export const deleteAttribute = (id: string) =>
  instance.delete(`${ATTRIBUTES_ENDPOINT}/${id}`);
