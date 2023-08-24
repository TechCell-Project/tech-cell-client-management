import instance from "./instance";
import { CATEGORIES_ENDPOINT } from "@constants/service";
import { CategoryModel } from "@models/Category";
import { SearchModel } from "@models/Common";

export const getCategories = (payload: SearchModel) =>
  instance.get<SearchModel>(
    `${CATEGORIES_ENDPOINT}?page=${payload.page + 1}&pageSize=${
      payload.pageSize
    }`
  );

export const createCategory = (payload: CategoryModel) =>
  instance.post<CategoryModel>(CATEGORIES_ENDPOINT, payload);

export const getCategoryByLabel = (label: string) =>
  instance.get(`${CATEGORIES_ENDPOINT}/label/${label}`);

export const editCategoryById = (id: string) =>
  instance.patch(`${CATEGORIES_ENDPOINT}/${id}`);
