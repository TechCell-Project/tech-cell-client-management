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

export type TOptions = {
  name: string;
  value: string | number | null;
};

export type TOrderStatusOptions = TOptions & {
  step: number;
  content?: string;
};
