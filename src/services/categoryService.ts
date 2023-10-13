import instance from './instance';
import { CATEGORIES_ENDPOINT } from '@constants/service';
import { CategoryModel } from '@models/Category';
import { Paging } from '@models/Common';
import { getSearchParams } from '@utils/funcs';

export const getCategories = (payload: Paging) => {
  const url = getSearchParams(payload);
  return instance.get<Paging>(CATEGORIES_ENDPOINT + '?' + url);
};

export const postCategory = (payload: CategoryModel) =>
  instance.post<CategoryModel>(CATEGORIES_ENDPOINT, payload);

export const getCategoryByLabel = (label: string) =>
  instance.get(`${CATEGORIES_ENDPOINT}/label/${label}`);

export const patchCategory = (payload: CategoryModel, id: string) =>
  instance.patch<CategoryModel>(`${CATEGORIES_ENDPOINT}/${id}`, payload);
