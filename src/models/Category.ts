import { AttributeModel } from "./Attribute";
import { PagingResponseModel } from "./Common";

export class CategoryModel {
  _id?: string | null = null;
  name?: string | null = null;
  label?: string | null = null;
  description?: string | null = null;
  url?: string | null = null;
  requireAttributes?: Array<string> = new Array<string>();
}

export class CategorySlice {
  categories: CategoryData = new CategoryData();
  category: CategoryModel | null = null;
  isLoading: boolean = false;
}

export class CategoryData extends PagingResponseModel {
  data: Array<CategoryModel> = [];
}
