import { PRODUCTS_ENDPOINT } from "@constants/service";
import instance from "./instance";
import { PagingProduct, ProductDataRequest } from "@models/Product";

export const getProducts = (payload: PagingProduct) => {
  const { page, pageSize, all } = payload;
  if (all) {
    return instance.get<PagingProduct>(`${PRODUCTS_ENDPOINT}?all=${all}`);
  } else {
    return instance.get<PagingProduct>(
      `${PRODUCTS_ENDPOINT}?all=${all ?? false}&page=${
        page + 1
      }&pageSize=${pageSize}`
    );
  }
};

export const postProduct = (payload: FormData) =>
  instance.post<FormData>(PRODUCTS_ENDPOINT, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

export const getProductById = (id: string) =>
  instance.get(`${PRODUCTS_ENDPOINT}/${id}`);

// export const putProduct = ()
