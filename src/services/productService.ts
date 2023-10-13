import { PRODUCTS_ENDPOINT } from '@constants/service';
import instance from './instance';
import { PagingProduct, ProductModel, ProductRequest } from '@models/Product';
import { PagingResponse } from '@models/Common';
import { getSearchParams } from '@utils/funcs';

export const getProducts = (payload: PagingProduct) => {
  const url = getSearchParams(payload);
  return instance.get<PagingResponse<ProductModel>>(PRODUCTS_ENDPOINT + "?" + url);
};

export const postProduct = (payload: ProductRequest) =>
  instance.post<ProductModel>(PRODUCTS_ENDPOINT, payload);

export const getProductById = (id: string, isDetails?: boolean) => {
  let url = `${PRODUCTS_ENDPOINT}/${id}`;
  if (isDetails) {
    url += `?detail=${isDetails}`;
  }
  return instance.get<ProductModel>(url);
};

export const putProduct = (payload: Partial<ProductModel>, id: string) =>
  instance.put<Partial<ProductModel>>(`${PRODUCTS_ENDPOINT}/${id}`, payload);

export const deleteProduct = (id: string) => instance.delete(`${PRODUCTS_ENDPOINT}/${id}`);

export const deleteVariationProduct = (id: string, sku: string) =>
  instance.delete(`${PRODUCTS_ENDPOINT}/${id}/${sku}`);
