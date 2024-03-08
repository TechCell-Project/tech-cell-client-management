import React, { memo, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { formatDateViVN, getAddressLocation, paymentStatusMapping } from '@utils/funcs';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { IconBtnCustom, TextViewCustom } from '@components/Common';
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
    <Stack width="100%" flexDirection="column" alignItems="flex-start">
      <Stack flexDirection="row" alignItems="center" gap="10px" mb={3}>
        <ContactSupportOutlinedIcon />
        <Typography variant="h5" fontSize="1.2rem" fontWeight="600" color={theme.color.black}>
          Thông tin
        </Typography>
      </Stack>
      <Typography fontWeight={600} fontSize="14px" mb="5px">
        ID: # {order?._id}
      </Typography>
      <Typography fontWeight={600} fontSize="14px" mb="5px">
        Tracking Code: {order?.trackingCode}
      </Typography>
      <Typography fontWeight={600} fontSize="14px" sx={{ opacity: 0.7 }}>
        {formatDateViVN(String(order?.createdAt))}
      </Typography>

      <Grid container rowSpacing={3} columnSpacing={2} mt={1}>
        <Grid item md={6}>
          <Stack flexDirection="row" alignItems="flex-start" gap={2}>
            <Avatar sx={{ height: '45px', width: '45px' }}>
              <PersonRoundedIcon />
            </Avatar>
            <Stack flexDirection="column">
              <Typography fontSize="17px" fontWeight={600} mb="5px">
                Khách hàng
              </Typography>
              <TextViewCustom label="Tên" content={`${account?.firstName} ${account?.lastName}`} />
              <TextViewCustom label="Email" content={`${account?.email}`} />
              <TextViewCustom
                label="SĐT"
                content={`${order?.shippingOrder.toAddress.phoneNumbers}`}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack flexDirection="row" alignItems="flex-start" gap={2}>
            <Avatar sx={{ height: '45px', width: '45px' }}>
              <PaymentRoundedIcon />
            </Avatar>
            <Stack flexDirection="column">
              <Stack direction="row" gap={2} alignItems="center" mb="5px">
                <Typography fontSize="17px" fontWeight={600}>
                  Thanh toán
                </Typography>
                <IconBtnCustom
                  icon={<ErrorRoundedIcon fontSize="small" />}
                  tooltip="Đối với những hình thức thanh toán Online, khách hàng cần hoàn tất thanh toán để tiến hành giao hàng"
                  styles={{ padding: 0, backgroundColor: 'tranparent !important' }}
                  colorIcon="secondary"
                />
              </Stack>
              <TextViewCustom
                label="Phương thức"
                content={
                  PAYMENT_METHOD_OPTIONS.find((item) => {
                    return item.value === order?.paymentOrder.method;
                  })?.name
                }
              />
              <TextViewCustom
                label="Trạng thái"
                content={paymentStatusMapping[String(order?.paymentOrder.status)]}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack flexDirection="row" alignItems="flex-start" gap={2}>
            <Avatar sx={{ height: '45px', width: '45px' }}>
              <FmdGoodRoundedIcon />
            </Avatar>
            <Stack flexDirection="column">
              <Typography fontSize="17px" fontWeight={600} mb="5px">
                Vị trí
              </Typography>
              <TextViewCustom
                label="Loại địa chỉ"
                content={`${order?.shippingOrder.toAddress.addressName}`}
              />
              <TextViewCustom
                label="Địa chỉ"
                content={`${getAddressLocation(order?.shippingOrder.toAddress as Address)}`}
              />
              <TextViewCustom label="Cụ thể" content={`${order?.shippingOrder.toAddress.detail}`} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default memo(OrderInfo);
