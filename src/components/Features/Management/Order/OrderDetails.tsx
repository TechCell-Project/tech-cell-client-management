import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getOrderDetails } from '@store/slices/orderSlice';
import { LoadingSection } from '@components/Common';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { OrderInfo, OrderInvoice, OrderProcess } from './Section';

export const OrderDetails = ({ id }: { id: string }) => {
  const { isLoadingDetails } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id)).then();
  }, [id, dispatch]);

  return isLoadingDetails ? (
    <LoadingSection isLoading={isLoadingDetails} />
  ) : (
    <Box sx={{ bgcolor: '#fff', borderRadius: '8px', padding: '25px 30px' }}>
      <Grid container spacing={4} overflow="hidden">
        <Grid item md={8}>
          <OrderInfo />
        </Grid>
        <Grid item md={4} position="relative">
          <hr
            style={{
              position: 'absolute',
              left: -1,
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
          />
          <OrderInvoice />
        </Grid>
      </Grid>
      <OrderProcess />
    </Box>
  );
};
