import { PagingResponse, Paging } from "./Common";

export class CreateAttributeModel {
  label?: string | null = null;
  name?: string | null = null;
  description?: string | null = null;
}

export class AttributeModel extends CreateAttributeModel {
  _id?: string | null = null;
  updatedAt?: string | Date | null = null;
  createdAt?: string | Date | null = null;
}

export class AttributeDynamics {
  k?: string | null = null;
  v?: string | null = null;
  u?: string | null = null;
  name?: string | null = null;
}

export class PagingAttribute extends Paging {
  select_type?: "only_active" | "only_deleted" | "both_deleted_and_active" =
    "only_active";
}

export class AttributeData extends PagingResponse {
  data: Array<AttributeModel> = [];
}

export class AttributeSlice {
  attributes: AttributeData = new AttributeData();
  attribute: AttributeModel | null = null;
  isLoading: boolean = false;
  isLoadingDetail: boolean = false;
}
