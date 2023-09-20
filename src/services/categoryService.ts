import instance from './instance';
import { CATEGORIES_ENDPOINT } from '@constants/service';
import { CategoryModel } from '@models/Category';
import { Paging } from '@models/Common';

export const getCategories = (payload: Paging) => {
  const { page, pageSize, keyword } = payload;
  let url = `${CATEGORIES_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;
  
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  return instance.get<Paging>(url);
};

export const postCategory = (payload: CategoryModel) =>
  instance.post<CategoryModel>(CATEGORIES_ENDPOINT, payload);

export const getCategoryByLabel = (label: string) =>
  instance.get(`${CATEGORIES_ENDPOINT}/label/${label}`);

export const patchCategory = (payload: CategoryModel, id: string) =>
  instance.patch<CategoryModel>(`${CATEGORIES_ENDPOINT}/${id}`, payload);
