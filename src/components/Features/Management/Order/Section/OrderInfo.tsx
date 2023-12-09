import React, { memo, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { formatDateViVN, getAddressLocation, orderStatusMapping } from '@utils/funcs';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { TextViewCustom } from '@components/Common';
import { getDetailsUserAccount } from '@store/slices/accountSlice';
import Grid from '@mui/material/Grid';
import { Address } from '@models/Account';
import { PAYMENT_METHOD_OPTIONS } from '@constants/options';

const OrderInfo = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.order);
  const { account } = useAppSelector((state) => state.account);

  useEffect(() => {
    if (order?.userId) {
      dispatch(getDetailsUserAccount(String(order?.userId))).then();
    }
  }, [order, dispatch]);

  return (
    <Stack width='100%' flexDirection='column' alignItems='flex-start'>
      <Typography
        variant='h5'
        fontSize='1.2rem'
        fontWeight='600'
        color={theme.color.black}
        mb={2}
      >
        Thông tin
      </Typography>
      <Typography fontWeight={600} fontSize='14px' mb='5px'>ID: # {order?._id}</Typography>
      <Typography fontWeight={600} fontSize='14px' mb='5px'>Tracking Code: {order?.trackingCode}</Typography>
      <Typography
        fontWeight={600}
        fontSize='14px'
        sx={{ opacity: 0.7 }}
      >
        {formatDateViVN(String(order?.createdAt))}
      </Typography>

      <Grid container rowSpacing={3} columnSpacing={2} mt={1}>
        <Grid item md={6}>
          <Stack flexDirection='row' alignItems='flex-start' gap={2}>
            <Avatar sx={{ height: '45px', width: '45px' }}>
              <PersonRoundedIcon />
            </Avatar>
            <Stack flexDirection='column'>
              <Typography fontSize='17px' fontWeight={600} mb='5px'>Khách hàng</Typography>
              <TextViewCustom label='Tên' content={`${account?.firstName} ${account?.lastName}`} />
              <TextViewCustom label='Email' content={`${account?.email}`} />
              <TextViewCustom label='SĐT' content={`${order?.shippingOrder.toAddress.phoneNumbers}`} />
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack flexDirection='row' alignItems='flex-start' gap={2}>
            <Avatar sx={{ height: '45px', width: '45px' }}>
              <PaymentRoundedIcon />
            </Avatar>
            <Stack flexDirection='column'>
              <Typography fontSize='17px' fontWeight={600} mb='5px'>Thanh toán</Typography>
              <TextViewCustom
                label='Phương thức'
                content={PAYMENT_METHOD_OPTIONS.find(
                  (item) => {
                    // @ts-ignore
                    return item.value === order?.paymentOrder.method;
                  })?.name}
              />
              {/*@ts-ignore*/}
              <TextViewCustom label='Trạng thái' content={orderStatusMapping[String(order?.paymentOrder.status)]} />
              {/*<TextViewCustom label='Trạng thái' content={"..."} />*/}
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack flexDirection='row' alignItems='flex-start' gap={2}>
            <Avatar sx={{ height: '45px', width: '45px' }}>
              <FmdGoodRoundedIcon />
            </Avatar>
            <Stack flexDirection='column'>
              <Typography fontSize='17px' fontWeight={600} mb='5px'>Vị trí</Typography>
              <TextViewCustom
                label='Loại địa chỉ'
                content={`${order?.shippingOrder.toAddress.addressName}`}
              />
              <TextViewCustom
                label='Địa chỉ'
                content={`${getAddressLocation(order?.shippingOrder.toAddress as Address)}`}
              />
              <TextViewCustom
                label='Cụ thể'
                content={`${order?.shippingOrder.toAddress.detail}`}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default memo(OrderInfo);
