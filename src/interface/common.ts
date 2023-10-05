import React from 'react';

export interface IDialog {
  isOpen: boolean;
  handleClose: (event?: any) => void;
  handleSubmit?: (event: any) => void | (({ ...e }) => Promise<void>);
  dialogTitle: string;
  dialogStyle?: any;
  dialogDesc?: string | React.ReactNode;
  children: React.ReactNode;
}

export interface DialogAction {
  isOpen: boolean;
  handleClose: () => void;
}
