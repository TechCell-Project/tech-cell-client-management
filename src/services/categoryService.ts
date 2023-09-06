import instance from "./instance";
import { CATEGORIES_ENDPOINT } from "@constants/service";
import { CategoryModel } from "@models/Category";
import { PagingCategory } from "@models/Category";

export const getCategories = (payload: PagingCategory) =>
  instance.get<PagingCategory>(
    `${CATEGORIES_ENDPOINT}?page=${payload.page + 1}&pageSize=${
      payload.pageSize
    }`
  );

export const postCategory = (payload: CategoryModel) =>
  instance.post<CategoryModel>(CATEGORIES_ENDPOINT, payload);

export const getCategoryByLabel = (label: string) =>
  instance.get(`${CATEGORIES_ENDPOINT}/label/${label}`);

export const patchCategory = (payload: CategoryModel, id: string) =>
  instance.patch<CategoryModel>(`${CATEGORIES_ENDPOINT}/${id}`, payload);
