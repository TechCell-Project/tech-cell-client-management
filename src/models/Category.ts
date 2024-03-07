import { AttributeModel } from './Attribute';
import { PagingResponse } from './Common';

export class CategoryModel {
  _id: string | null = null;
  name: string | null = null;
  label: string | null = null;
  description: string | null = null;
  url: string | null = null;
  requireAttributes: Array<AttributeModel | unknown> = new Array<AttributeModel>();
}

export class CategorySlice {
  categories: PagingResponse<CategoryModel> = new PagingResponse<CategoryModel>();
  category: CategoryModel | null = null;
  isLoading: boolean = false;
  isLoadingDetails: boolean = false;
}