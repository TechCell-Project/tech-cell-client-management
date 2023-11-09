import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { getOrderDetails } from '@store/slices/orderSlice';

export const OrderDetails = ({ id }: { id: string }) => {
  const { order, isLoadingDetails } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    dispatch(getOrderDetails(id)).then();
  }, [id, dispatch]);

  return (
    <></>
  );
};