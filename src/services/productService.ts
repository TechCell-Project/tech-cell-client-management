import { PRODUCTS_ENDPOINT } from '@constants/service';
import instance from './instance';
import { PagingProduct, ProductModel, ProductRequest } from '@models/Product';

export const getProducts = (payload: PagingProduct) => {
  const { page, pageSize, keyword } = payload;
  let url = `${PRODUCTS_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  return instance.get<PagingProduct>(url);
};

export const postProduct = (payload: ProductRequest) =>
  instance.post<ProductRequest>(PRODUCTS_ENDPOINT, payload);

export const getProductById = (id: string) => instance.get(`${PRODUCTS_ENDPOINT}/${id}`);

export const putProduct = (payload: ProductModel, id: string) =>
  instance.put<ProductModel>(`${PRODUCTS_ENDPOINT}/${id}`, payload);
