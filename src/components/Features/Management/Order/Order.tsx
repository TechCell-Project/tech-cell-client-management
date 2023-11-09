import { ButtonCustom, DataTable, SelectInputCustom, TextFieldCustom } from '@components/Common';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { PagingOrder } from '@models/Order';
import { Paging } from '@models/Common';
import { getAllOrder } from '@store/slices/orderSlice';
import { Form, Formik } from 'formik';
import { getIndexNo, orderStatusMapping } from '@utils/funcs';
import { COLUMNS_ORDER } from '@constants/data';
import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { RootRoutes } from '@constants/enum';
import { useRouter } from 'next/navigation';
import { IColumnOrder } from '@interface/data';
import Grid from '@mui/material/Grid';
import { ORDER_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from '@constants/options';
import Box from '@mui/material/Box';

export const Order = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders, isLoading, isLoadingDetails } = useAppSelector((state) => state.order);

  const [searchOrder, setSearchOrder] = useState<PagingOrder>(new PagingOrder());
  const [paging, setPaging] = useState<Paging>(new Paging());

  useEffect(() => {
    loadOrders();
  }, [searchOrder, paging]);

  const loadOrders = () => {
    dispatch(getAllOrder({ ...searchOrder, page: paging.page, pageSize: paging.pageSize })).then();
  };

  const rows: IColumnOrder[] = orders.data.map((order, i) => ({
    id: order._id,
    no: getIndexNo(i, searchOrder.page, searchOrder.pageSize),
    trackingCode: '# ' + order.trackingCode,
    orderStatus: orderStatusMapping[String(order.orderStatus)],
  }));

  const columns: any[] = [
    ...COLUMNS_ORDER,
    {
      field: 'options',
      headerName: 'Thao Tác',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <Tooltip title='Chi tiết' key={params.row.no}>
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            onClick={() => router.push(`${RootRoutes.ORDER_ROUTE}/${params.row.id}`)}
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
                <ButtonCustom type='submit' variant='outlined' content='Tìm kiếm' />
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>

      <DataTable
        column={columns}
        row={rows}
        isLoading={isLoading}
        paginationModel={paging}
        setPaginationModel={setPaging}
        totalRecord={orders.totalRecord}
      />
    </>
  );
};
