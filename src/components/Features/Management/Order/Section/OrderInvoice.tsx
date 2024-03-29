import React, { memo, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Typography from '@mui/material/Typography';
import { Chip, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { formatWithCommas } from '@utils/funcs';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@store/store';
import { OrderProduct } from '@models/Order';
import styles from '@styles/components/_common.module.scss';

const InvoiceItem = ({ order }: { order: OrderProduct }) => {
  // @ts-ignore
  const image = order.images.find((img) => img.isThumbnail).url;

  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="flex-start"
        key={order.name}
        gap="20px"
        width="100%"
        mt={3}
        mb="20px"
      >
        <Avatar
          src={String(image)}
          alt="User Avatar"
          sx={{ height: '80px', width: '80px', borderRadius: '5px' }}
          variant="square"
        />
        <Stack flexDirection="column" width="100%">
          <Typography fontSize="16px" fontWeight={600}>
            {order.name}
          </Typography>
          <Typography fontSize="15px" fontWeight={500} textTransform="capitalize">
            {order.attributes.map((attr) => `${attr.v}${attr?.u ?? ''}`).join(', ')}
          </Typography>
          <Typography fontSize="14px">x{order.quantity}</Typography>
          {order.price.special !== 0 ? (
            <Stack flexDirection="row" gap={2} alignItems="baseline" justifyContent="flex-end">
              <Typography fontSize="15px" fontWeight={600} textAlign="right">
                {formatWithCommas(Number(order.price.special))}
              </Typography>
              <span className={styles.priceCrossedOut}>
                {formatWithCommas(Number(order.price.base))}
              </span>
            </Stack>
          ) : (
            <Typography fontSize="15px" fontWeight={600} textAlign="right">
              {formatWithCommas(Number(order.price.base))}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Divider sx={{ ml: 0, mr: 0, width: '100%', bgcolor: 'rgba(0,0,0,0.1)' }} />
    </>
  );
};

const OrderInvoice = () => {
  const theme = useTheme();
  const { order } = useAppSelector((state) => state.order);

  const renderLine = (label: string, content: string, isRed?: boolean) => {
    return (
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="15px" fontStyle="italic">
          {label}
        </Typography>
        <Typography fontSize="15px" color={isRed ? 'secondary' : ''} fontWeight={600}>
          {isRed ? `- ${content}` : content}
        </Typography>
      </Stack>
    );
  };

  const calculateTempPrice = useCallback(() => {
    // @ts-ignore
    return (
      order?.products.reduce((acc, product) => {
        if (product.price.special !== 0) {
          return acc + Number(product.price.special) * Number(product.quantity);
        }
        return acc + Number(product.price.base) * Number(product.quantity);
      }, 0) ?? 0
    );
  }, [order]);

  return (
    <>
      <Stack width="100%" flexDirection="column" alignItems="flex-start">
        <Stack flexDirection="row" alignItems="center" gap="10px" mb={1}>
          <LocalMallOutlinedIcon />
          <Typography variant="h5" fontSize="1.2rem" fontWeight="600" color={theme.color.black}>
            Hóa đơn
            <Chip
              label={`${order?.products.length}`}
              size="small"
              sx={{
                ml: 2,
                backgroundColor: theme.color.lightRed,
                color: theme.color.red,
                minWidth: 'unset',
                height: 'unset',
                p: '5px !important',
              }}
            />
          </Typography>
        </Stack>
        {order?.products.map((item) => <InvoiceItem key={item.sku} order={item} />)}
        <Stack flexDirection="column" p="20px 0" width="100%" gap={1}>
          {renderLine('Tạm tính', formatWithCommas(calculateTempPrice()))}
          {renderLine('Phí vận chuyển', formatWithCommas(Number(order?.checkoutOrder.shippingFee)))}
          {renderLine(
            'Giảm giá',
            formatWithCommas(Number(order?.checkoutOrder.totalApplyDiscount)),
            true,
          )}
          {renderLine(
            'Voucher từ shop',
            formatWithCommas(Number(order?.checkoutOrder.totalApplyDiscount)),
            true,
          )}
        </Stack>
        <Divider sx={{ ml: 0, mr: 0, width: '100%', bgcolor: 'rgba(0,0,0,0.1)' }} />
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mt={3}
      >
        <Typography fontSize="17px" fontWeight={600} fontStyle="italic">
          Tổng tiền
        </Typography>
        <Typography fontSize="17px" fontWeight={700}>
          {formatWithCommas(Number(order?.checkoutOrder.totalPrice))}
        </Typography>
      </Stack>
    </>
  );
};

export default memo(OrderInvoice);
