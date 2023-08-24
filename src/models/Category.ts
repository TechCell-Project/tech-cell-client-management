import { AttributeModel } from "./Attribute";

export class CategoryModel {
  name?: string | null = null;
  label?: string | null = null;
  description?: string | null = null;
  url?: string | null = null;
  requireAttributes?: Array<AttributeModel> = new Array<AttributeModel>();
}
