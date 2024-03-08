'use client';

import React from 'react';
import Chip from '@mui/material/Chip';
import { AccountStatusVi, PaymentOrder, PaymentStatus, ProductStatus } from '@constants/enum';

type TChip = {
  label: string;
  type: string;
};

type TColor = string[];

const successColor: TColor = [
  ProductStatus.OnSales.toString(),
  ProductStatus.Pre_order.toString(),
  AccountStatusVi.Unblocked,
  PaymentStatus.COMPLETED,
];
const infoColor: TColor = [
  ProductStatus.ComingSoon.toString(),
  ProductStatus.NewArrival.toString(),
  PaymentOrder.SHIPPING,
  PaymentStatus.PROCESSING,
  PaymentStatus.REFUNDED,
];
const warningColor: TColor = [
  ProductStatus.Hide.toString(),
  ProductStatus.NotSales.toString(),
  ProductStatus.LowStock.toString(),
  PaymentStatus.PENDING,
  PaymentOrder.WAIT_FOR_PAYMENT,
];
const errorColor: TColor = [
  ProductStatus.Deleted.toString(),
  ProductStatus.TemporarilyOutOfStock.toString(),
  AccountStatusVi.Blocked,
  PaymentStatus.CANCELLED,
];

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

  return <Chip label={label} variant="filled" size="medium" color={getColor()} />;
};
