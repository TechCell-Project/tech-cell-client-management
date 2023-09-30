import { AttributeDynamics } from "./Attribute";
import { CategoryModel } from "./Category";
import { Paging, PagingResponse } from "./Common";

export class PagingProduct extends Paging {
  detail?: boolean = false;
}

export class PriceModel {
  base?: number | string | null = null;
  sale?: number | string | null = null;
  special?: number | string | null = null;
}

export class VariationModel {
  attributes?: Array<AttributeDynamics> = new Array<AttributeDynamics>();
  stock?: number | null = null;
  price?: PriceModel = new PriceModel();
  images?: Array<ImageModel> = new Array<ImageModel>();
  status?: string | number | null = null;
  sku?: string | null = null;
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
  description?: string = "Chưa có mô tả!";
  status?: number | null = null;
  category?: CategoryModel | null = null;
  generalAttributes?: Array<AttributeDynamics> = new Array<AttributeDynamics>();
  variations: Array<VariationModel> = new Array<VariationModel>();
  generalImages?: Array<ImageModel> = new Array<ImageModel>();
  descriptionImages?: Array<ImageModel> = new Array<ImageModel>();
}

export class ProductModel extends ProductRequest {
  _id?: string | null = null;
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
