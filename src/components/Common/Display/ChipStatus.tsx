'use client';

import React from 'react';
import Chip from '@mui/material/Chip';
import { AccountStatusVi, ProductStatus } from '@constants/enum';

type TChip = {
  label: string,
  type: string | number,
}

type TColor = (number | string)[];

const successColor: TColor = [ProductStatus.OnSales, ProductStatus.Pre_order, AccountStatusVi.Unblocked];
const infoColor: TColor = [ProductStatus.ComingSoon, ProductStatus.NewArrival];
const warningColor: TColor = [ProductStatus.Hide, ProductStatus.NotSales, ProductStatus.LowStock];
const errorColor: TColor = [ProductStatus.Deleted, ProductStatus.TemporarilyOutOfStock, AccountStatusVi.Blocked];

export const ChipStatus = ({ label, type }: TChip) => {
  const getColor = () => {
    if (successColor.includes(type)) {
      return 'success';
    } else if (infoColor.includes(type)) {
      return 'info';
    } else if (warningColor.includes(type)) {
      return 'warning';
    } else if (errorColor.includes(type)) {
      return 'error';
    }
    return 'default';
  };

  return (
    <Chip label={label} variant='filled' size='medium' color={getColor()} />
  );
};