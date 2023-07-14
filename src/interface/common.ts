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
  row: readonly any[];
  isLoading?: boolean;
}

export interface IConfirmDialog {
  icon?: any;
  tooltip?: string;
  handleClick?: any;
  dialogTitle?: string;
  dialogContentText?: string | React.ReactNode;
  hidden?: boolean;
  disabled?: boolean;
}

export interface IChangeRoleDialog {
  icon?: any;
  tooltip?: string;
  dialogTitle?: string;
  id: string;
  setAlert?: any;
  hidden?: boolean;
  disabled?: boolean;
} 

export interface IDetailsDialog {
  icon?: any;
  tooltip?: string;
  dialogTitle?: string;
  id: string;
} 