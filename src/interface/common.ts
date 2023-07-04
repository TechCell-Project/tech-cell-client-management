import { AlertColor } from '@mui/material';

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

}
