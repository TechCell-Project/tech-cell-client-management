'use client';

import React from 'react';
import Chip from '@mui/material/Chip';
import { AccountStatusVi, ProductStatus } from '@constants/enum';

type TChip = {
  label: string,
  type: string,
}

type TColor = string[];

const successColor: TColor = [ProductStatus.OnSales.toString(), ProductStatus.Pre_order.toString(), AccountStatusVi.Unblocked];
const infoColor: TColor = [ProductStatus.ComingSoon.toString(), ProductStatus.NewArrival.toString()];
const warningColor: TColor = [ProductStatus.Hide.toString(), ProductStatus.NotSales.toString(), ProductStatus.LowStock.toString()];
const errorColor: TColor = [ProductStatus.Deleted.toString(), ProductStatus.TemporarilyOutOfStock.toString(), AccountStatusVi.Blocked];

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