import {
  ButtonCustom,
  ChipStatus,
  DataTable,
  SelectInputCustom,
  TextFieldCustom,
} from '@components/Common';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { OrderModel, PagingOrder } from '@models/Order';
import { editOrderStatus, getAllOrder } from '@store/slices/orderSlice';
import { Form, Formik } from 'formik';
import { formatWithCommas, getIndexNo, orderStatusMapping } from '@utils/funcs';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { PaymentStatus, RootRoutes } from '@constants/enum';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import { ORDER_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from '@constants/options';
import Box from '@mui/material/Box';
import usePagination from '@hooks/usePagination';

export const Order = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders, isLoading, isLoadingDetails } = useAppSelector((state) => state.order);

  const {
    paging,
    setPaging,
    handleSearchSubmit,
    searchParams: searchOrder,
  } = usePagination<PagingOrder>(new PagingOrder());

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
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => (
        <b
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
          onClick={() => router.push(`${RootRoutes.ORDER_ROUTE}/${row._id}`)}
        >
          {row.trackingCode}
        </b>
      ),
    },
    {
      field: 'shippingOrder.toAddress.customerName',
      headerName: 'Khách hàng',
      minWidth: 170,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.row.shippingOrder.toAddress.customerName,
    },
    {
      field: 'paymentOrder',
      headerName: 'Thanh toán',
      headerAlign: 'center',
      align: 'center',
      minWidth: 170,
      flex: 1,
      valueGetter: (params) => {
        const value = PAYMENT_METHOD_OPTIONS.find(
          (item) => params.row.paymentOrder && params.row.paymentOrder.method === item.value,
        );
        return value?.name;
      },
    },
    {
      field: 'checkoutOrder',
      headerName: 'Tổng tiền (VND)',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => formatWithCommas(Number(params.row.checkoutOrder.totalPrice)),
    },
    {
      field: 'orderStatus',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      align: 'center',
      minWidth: 220,
      flex: 1,
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
      width: 160,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams<OrderModel>) => [
        <>
          {params.row.orderStatus === PaymentStatus.PENDING && (
            <>
              <Tooltip
                title="Xác nhận"
                key={params.row._id}
                style={{ cursor: isLoadingDetails ? 'wait' : 'pointer' }}
              >
                <GridActionsCellItem
                  icon={<CheckCircleOutlinedIcon />}
                  onClick={() =>
                    dispatch(editOrderStatus(String(params.row._id), PaymentStatus.PROCESSING))
                  }
                  label="Xác nhận"
                />
              </Tooltip>
              <Tooltip
                title="Hủy đơn"
                key={params.row._id}
                style={{ cursor: isLoadingDetails ? 'wait' : 'pointer' }}
              >
                <GridActionsCellItem
                  icon={<HighlightOffOutlinedIcon />}
                  onClick={() =>
                    dispatch(editOrderStatus(String(params.row._id), PaymentStatus.CANCELLED))
                  }
                  label="Hủy đơn"
                />
              </Tooltip>
            </>
          )}
        </>,
        <Tooltip
          title="Chi tiết"
          key={params.row._id}
          style={{ cursor: isLoadingDetails ? 'wait' : 'pointer' }}
        >
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            onClick={() => router.push(`${RootRoutes.ORDER_ROUTE}/${params.row._id}`)}
            label="Chi tiết"
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <>
      <Formik initialValues={searchOrder} onSubmit={(values) => handleSearchSubmit(values)}>
        <Form>
          <Box
            sx={{
              bgcolor: '#fff',
              padding: '25px 20px 20px 20px',
              borderRadius: 2,
              gap: '15px',
              border: 0,
              mb: '30px',
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextFieldCustom name="orderId" label="Mã đơn hàng" />
              </Grid>
              <Grid item md={3}>
                <TextFieldCustom name="userId" label="Mã khách hàng" />
              </Grid>
              <Grid item md={3}>
                <TextFieldCustom name="productId" label="Mã sản phẩm" />
              </Grid>
              <Grid item md={3}>
                <TextFieldCustom name="trackingCode" label="Mã theo dõi (tracking)" />
              </Grid>
              <Grid item md={3}>
                <SelectInputCustom
                  name="paymentMethod"
                  label="Phương thức thanh toán"
                  options={PAYMENT_METHOD_OPTIONS}
                />
              </Grid>
              <Grid item md={3}>
                <SelectInputCustom
                  name="orderStatus"
                  label="Trạng thái đơn hàng"
                  options={ORDER_STATUS_OPTIONS}
                />
              </Grid>
              <Grid item md={2}>
                <ButtonCustom
                  type="submit"
                  variant="contained"
                  content="Tìm kiếm"
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
