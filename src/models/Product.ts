import { AttributeDynamics } from "./Attribute";
import { CategoryModel } from "./Category";
import { Paging, PagingResponse } from "./Common";

export class PagingProduct extends Paging {
  all?: boolean = false;
}

export class PriceModel {
  base?: number | null = null;
  sale?: number | null = null;
  special?: number | null = null;
}

export class VariationModel {
  attributes?: Array<AttributeDynamics> = new Array<AttributeDynamics>();
  stock?: number | null = null;
  price?: PriceModel = new PriceModel();
  images?: Array<ImageModel> = new Array<ImageModel>();
  status?: string | number | null = null;
}

export class ImageModel {
  publicId?: string | null = null;
  url?: string | null = null;
  isThumbnail?: boolean = false;
  isPlaceholder?: boolean = false;
  isDeleted?: boolean = false;
}

export class ProductRequest {
  name?: string | null = null;
  description?: string | null = null;
  status?: number | null = null;
  categories?: Array<CategoryModel | any> = new Array<CategoryModel>();
  generalAttributes?: Array<AttributeDynamics> = new Array<AttributeDynamics>();
  variations: Array<VariationModel> = new Array<VariationModel>();
}

export class ProductDataRequest {
  productData: ProductRequest = new ProductRequest();
  general: Array<any> = [];
  general_isthumbnail: Array<any> = [];

  // static create() {
  //   return new Proxy(new ProductDataRequest(), {
  //     get(target, property) {
  //       if (typeof property === 'string' && property.startsWith('variation_')) {
  //         return '';
  //       } else {
  //         return Reflect.get(target, property);
  //       }
  //     }
  //   });
  // }
}

export class ProductModel extends ProductRequest {
  _id?: string | null = null;
  generalImages?: Array<ImageModel> = new Array<ImageModel>();
  createdAt?: string;
  updatedAt?: string;
}

export class ProductData extends PagingResponse {
  data: Array<ProductModel> = [];
}

export class ProductSlice {
  products: ProductData = new ProductData();
  product: ProductModel | null = null;
  isLoading: boolean = false;
  isLoadingDetails: boolean = false;
}
