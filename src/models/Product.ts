import { AttributeDynamics } from './Attribute';
import { CategoryModel } from './Category';
import { Paging, PagingResponse } from './Common';

export class PagingProduct extends Paging {
  detail?: boolean = false;
  select_type?: string | null = null;
}

type PriceValue = number | string | null;

export class PriceModel {
  base: PriceValue = null;
  special: PriceValue = null;
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
}

export class ProductRequest {
  name?: string | null = null;
  description?: string = 'Chưa có mô tả!';
  status?: number | null = null;
  category?: CategoryModel | null = null;
  generalAttributes?: Array<AttributeDynamics> = new Array<AttributeDynamics>();
  variations: Array<VariationModel> = new Array<VariationModel>();
  generalImages?: Array<ImageModel> = new Array<ImageModel>();
  descriptionImages?: Array<ImageModel> = new Array<ImageModel>();
  listTempAtt?: Array<AttributeDynamics> = new Array<AttributeDynamics>();
  listAttributePlus?: Array<AttributeDynamics> = [];
}

export class ProductModel extends ProductRequest {
  _id?: string | null = null;
  createdAt?: string;
  updatedAt?: string;
}

export class ProductSlice {
  products: PagingResponse<ProductModel> = new PagingResponse<ProductModel>();
  product: ProductModel | null = null;
  isLoading: boolean = false;
  isLoadingDetails: boolean = false;
}
