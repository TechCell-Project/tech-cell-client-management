import { GridColDef, GridPaginationModel } from '@mui/x-data-grid/models';

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
  page?: number | null = null;
  pageSize?: number | null = null;
  totalPage?: number | null = null;
  totalRecord?: number | null = null;
}

export class DataTableProps {
  column?: GridColDef<any>[] | null;
  row?: readonly any[];
  isLoading?: boolean;
  isQuickFilter?: boolean;
  totalPage?: number | null = null;
  totalRecord?: number | null = null;
  paginationModel?: GridPaginationModel;
  setPaginationModel?: React.Dispatch<React.SetStateAction<any>>;
  disabledFilter?: boolean;
}
