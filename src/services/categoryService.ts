import instance from "./instance";
import { CATEGORIES_ENDPOINT } from "@constants/service";
import { CategoryModel, PagingCategory } from "@models/Category";

export const getCategories = (payload: PagingCategory) => {
  const { no_limit, page, pageSize } = payload;
  if (no_limit) {
    return instance.get<PagingCategory>(
      `${CATEGORIES_ENDPOINT}?no_limit=${no_limit}`
    );
  } else {
    return instance.get<PagingCategory>(
      `${CATEGORIES_ENDPOINT}?no_limit=${no_limit}page=${
        page + 1
      }&pageSize=${pageSize}`
    );
  }
};

export const postCategory = (payload: CategoryModel) =>
  instance.post<CategoryModel>(CATEGORIES_ENDPOINT, payload);

export const getCategoryByLabel = (label: string) =>
  instance.get(`${CATEGORIES_ENDPOINT}/label/${label}`);

export const patchCategory = (payload: CategoryModel, id: string) =>
  instance.patch<CategoryModel>(`${CATEGORIES_ENDPOINT}/${id}`, payload);
