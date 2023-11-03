import { CATEGORIES_ENDPOINT } from '@constants/service';
import { CategoryModel } from '@models/Category';
import { Paging, PagingResponse } from '@models/Common';
import { getSearchParams } from '@utils/funcs';
import instance from '@config/axios.config';

export const getCategories = (payload: Paging) => {
  const url = getSearchParams(payload);
  return instance.get<PagingResponse<CategoryModel>>(CATEGORIES_ENDPOINT + '?' + url);
};

export const postCategory = (payload: CategoryModel) =>
  instance.post<CategoryModel>(CATEGORIES_ENDPOINT, payload);

export const getCategoryByLabel = (label: string) =>
  instance.get(`${CATEGORIES_ENDPOINT}/label/${label}`);

export const patchCategory = (payload: CategoryModel, id: string) =>
  instance.patch<CategoryModel>(`${CATEGORIES_ENDPOINT}/${id}`, payload);
