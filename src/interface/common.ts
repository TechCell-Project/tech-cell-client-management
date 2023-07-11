import { AlertColor } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export interface IAlert {
  type?: AlertColor;
  status?: 1 | 2 | 3;
  message?: string;
  timeout?: number;
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
  row?: readonly any[] | null;
  isLoading?: boolean;
}

export interface IConfirmDialog {
  icon?: any;
  tooltip?: string;
  handleClick?: any;
  dialogTitle?: string;
  dialogContentText?: string | React.ReactNode;
  disable?: boolean;
}

export interface IChangeRoleDialog {
  icon?: any;
  tooltip?: string;
  dialogTitle?: string;
  id: string;
  setAlert?: any;
  disabled?: boolean;
} 

export interface IDetailsDialog {
  icon?: any;
  tooltip?: string;
  dialogTitle?: string;
  id: string;
} 