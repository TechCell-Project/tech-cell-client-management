import { ButtonCustom, ChipStatus, DataTable, SelectInputCustom, TextFieldCustom } from '@components/Common';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { OrderModel, PagingOrder } from '@models/Order';
import { Paging } from '@models/Common';
import { getAllOrder } from '@store/slices/orderSlice';
import { Form, Formik } from 'formik';
import { formatWithCommas, getIndexNo, orderStatusMapping } from '@utils/funcs';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { RootRoutes } from '@constants/enum';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import { ORDER_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from '@constants/options';
import Box from '@mui/material/Box';

export const Order = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector((state) => state.order);

  const [searchOrder, setSearchOrder] = useState<PagingOrder>(new PagingOrder());
  const [paging, setPaging] = useState<Paging>(new Paging());

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOrder, paging]);

  const loadOrders = () => {
    dispatch(getAllOrder({ ...searchOrder, page: paging.page, pageSize: paging.pageSize })).then();
  };

  const columns: Array<GridColDef<OrderModel>> = [
    {
      field: 'no',
      headerName: 'STT',
      width: 70,
      renderCell: (params) => {
        const index = params.api.getAllRowIds().indexOf(params.id);
        return getIndexNo(index, paging.page, paging.pageSize);
      },
    },
    {
      field: 'trackingCode',
      headerName: 'Mã theo dõi (Tracking)',
      width: 220,
      valueGetter: (params) => params.row.trackingCode,
    },
    {
      field: 'shippingOrder.toAddress.customerName',
      headerName: 'Khách hàng',
      width: 170,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.row.shippingOrder.toAddress.customerName,
    },
    {
      field: 'paymentOrder',
      headerName: 'Phương thức TT',
      headerAlign: 'center',
      align: 'center',
      width: 180,
      valueGetter: (params) => {
        const value = PAYMENT_METHOD_OPTIONS.find(
          (item) => params.row.paymentOrder && params.row.paymentOrder.method === item.value);
        return value?.name;
      },
    },
    {
      field: 'checkoutOrder',
      headerName: 'Tổng tiền (VND)',
      headerAlign: 'center',
      align: 'center',
      width: 170,
      valueGetter: (params) => formatWithCommas(Number(params.row.checkoutOrder.totalPrice)),
    },
    {
      field: 'orderStatus',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      align: 'center',
      width: 220,
      renderCell: (params) => (
        <ChipStatus
          label={orderStatusMapping[String(params.row.orderStatus)]}
          type={String(params.row.orderStatus)}
        />
      ),
    },
    {
      field: 'options',
      headerName: 'Thao Tác',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams<OrderModel>) => [
        <Tooltip title='Chi tiết' key={params.row._id}>
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            onClick={() => router.push(`${RootRoutes.ORDER_ROUTE}/${params.row._id}`)}
            label='Chi tiết'
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <>
      <Formik
        initialValues={{ ...searchOrder }}
        onSubmit={(values) => {
          setSearchOrder(values);
          setPaging((prev) => ({ ...prev, page: 0 }));
        }}
      >
        <Form>
          <Box sx={{
            bgcolor: '#fff',
            padding: '25px 20px 20px 20px',
            borderRadius: 2,
            gap: '15px',
            border: 0,
            mb: '30px',
          }}>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextFieldCustom name='orderId' label='Mã đơn hàng' />
              </Grid>
              <Grid item md={3}>
                <TextFieldCustom name='userId' label='Mã khách hàng' />
              </Grid>
              <Grid item md={3}>
                <TextFieldCustom name='productId' label='Mã sản phẩm' />
              </Grid>
              <Grid item md={3}>
                <TextFieldCustom name='trackingCode' label='Mã theo dõi (tracking)' />
              </Grid>
              <Grid item md={3}>
                <SelectInputCustom name='paymentMethod' label='Phương thức thanh toán'
                  options={PAYMENT_METHOD_OPTIONS} />
              </Grid>
              <Grid item md={3}>
                <SelectInputCustom name='orderStatus' label='Trạng thái đơn hàng' options={ORDER_STATUS_OPTIONS} />
              </Grid>
              <Grid item md={2}>
                <ButtonCustom
                  type='submit'
                  variant='outlined'
                  content='Tìm kiếm'
                  styles={{ padding: '6px 20px !important' }}
                />
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>

      <DataTable
        column={columns}
        row={orders.data}
        isLoading={isLoading}
        paginationModel={paging}
        setPaginationModel={setPaging}
        totalRecord={orders.totalRecord}
      />
    </>
  );
};
