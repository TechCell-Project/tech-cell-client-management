import { AlertColor } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export interface IAlert {
    type?: AlertColor;
    status?: 1 | 2 | 3;
    message?: string;
    timeout?: number;
}

export interface ILoading {
  isLoading?: boolean;
}

export interface IDataTable {
  column?: GridColDef<any>[] | null;
  row?: readonly any[] | null;
}
