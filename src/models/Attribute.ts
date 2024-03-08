import { PagingResponse, Paging } from './Common';

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
  select_type?: string | null = null;
}

export class AttributeSlice {
  attributes: PagingResponse<AttributeModel> = new PagingResponse<AttributeModel>();
  attribute: AttributeModel | null = null;
  isLoading: boolean = false;
  isLoadingDetail: boolean = false;
}
