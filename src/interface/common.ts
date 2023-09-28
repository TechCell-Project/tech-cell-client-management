import { AlertColor, SxProps } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export interface IAlert {
  type?: AlertColor;
  status?: 1 | 2 | 3;
  message?: string;
  timeout?: number;
  statusCode?: number;
}

export interface ISnackbarAlert {
  type?: AlertColor;
  message?: string;
  timeout?: number;
}

export interface ILoading {
  isLoading?: boolean;
}

export interface IDataTable {
  column?: GridColDef<any>[] | null;
  row: readonly any[];
  isLoading?: boolean;
  isQuickFilter?: boolean;
  page?: number | string;
  pageSize?: number | string;
  totalPage?: number | string;
  totalRecord?: number | string;
}

export interface IDialog {
  isOpen: boolean;
  handleClose: (event?: any) => void;
  handleSubmit?: (event: any) => void | (({ ...e }) => Promise<void>);
  dialogTitle: string;
  dialogStyle?: any;
  dialogDesc?: string | React.ReactNode;
  children: React.ReactNode;
}
