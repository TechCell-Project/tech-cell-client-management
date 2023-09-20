import { GridColDef, GridPaginationModel } from '@mui/x-data-grid';

export class Paging implements GridPaginationModel {
  page: number;
  pageSize: number;
  keyword?: string;

  constructor() {
    this.page = 0;
    this.pageSize = 10;
  }
}

export class PagingResponse {
  page?: number | string = '';
  pageSize?: number | string = '';
  totalPage?: number | string = '';
  totalRecord?: number | string = '';
}

export class DataTableProps {
  column?: GridColDef<any>[] | null;
  row?: readonly any[];
  isLoading?: boolean;
  isQuickFilter?: boolean;
  totalPage?: number | string;
  totalRecord?: number | string;
  paginationModel?: GridPaginationModel;
  setPaginationModel?: React.Dispatch<React.SetStateAction<Paging>>;
  disabledFilter?: boolean;
}
