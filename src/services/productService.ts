import { PRODUCTS_ENDPOINT } from "@constants/service";
import instance from "./instance";
import { PagingProduct, ProductRequest } from "@models/Product";

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

export const postProduct = (payload: ProductRequest) =>
  instance.post<ProductRequest>(PRODUCTS_ENDPOINT, payload);

export const getProductById = (id: string) =>
  instance.get(`${PRODUCTS_ENDPOINT}/${id}`);

// export const putProduct = ()
