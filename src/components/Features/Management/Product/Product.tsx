'use client';

import React, { useEffect, useState } from 'react';
import { ButtonCustom, DataTable, SelectInputCustom, TextFieldCustom } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { getIndexNo, productStatusMapping } from '@utils/index';
import Tooltip from '@mui/material/Tooltip';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Paging } from '@models/Common';
import { useRouter } from 'next/navigation';
import { RootRoutes } from '@constants/enum';
import { IColumnProduct } from '@interface/data';
import { DeleteProductDialog } from './Dialog/DeleteProductDialog';
import { PagingProduct } from '@models/Product';
import { Form, Formik } from 'formik';
import Grid from '@mui/material/Grid';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import Box from '@mui/material/Box';

export const Product = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.product);
  const router = useRouter();

  const [currentProduct, setCurrentProduct] = useState<IColumnProduct>();
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [searchProduct, setSearchProduct] = useState<PagingProduct>(new PagingProduct());
  const [paging, setPaging] = useState<Paging>(new Paging());

  useEffect(() => {
    loadProducts();
  }, [searchProduct, paging]);

  const loadProducts = () => {
    dispatch(getAllProduct({ ...searchProduct, page: paging.page, pageSize: paging.pageSize })).then();
  };

  const columns: Array<GridColDef> = [
    {
      field: 'no',
      headerName: 'STT',
      width: 70,
      renderCell: (params) => {
        const index = params.api.getAllRowIds().indexOf(params.id);
        return getIndexNo(index, paging.page, paging.pageSize);
      },
    },
    { field: 'name', headerName: 'Tên Sản Phẩm', width: 180 },
    {
      field: 'category',
      headerName: 'Thể Loại',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.row.category.name,
    },
    {
      field: 'status',
      headerName: 'Tình Trạng',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => productStatusMapping[Number(params.row.status)],
    },
    {
      field: 'generalAttributes',
      headerName: 'Tổng Số Thông Số',
      width: 170,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.row.generalAttributes.length,
    },
    {
      field: 'variations',
      headerName: 'Tổng Số Biến Thể',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.row.variations.length,
    },
    {
      field: 'options',
      headerName: 'Thao Tác',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <Tooltip title='Chỉnh sửa' key={params.row._id}>
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            onClick={() => router.push(`${RootRoutes.PRODUCT_EDIT_ROUTE}/${params.row._id}`)}
            label='Chỉnh sửa'
          />
        </Tooltip>,
        <Tooltip title='Xóa' key={params.row._id}>
          <GridActionsCellItem
            icon={<DeleteRoundedIcon />}
            onClick={() => {
              setCurrentProduct(params.row);
              setOpenConfirmDelete(true);
            }}
            label='Xóa'
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <>
      <Formik
        initialValues={{ ...searchProduct }}
        onSubmit={(values) => {
          setSearchProduct(values);
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
                <TextFieldCustom name='keyword' label='Từ khóa' />
              </Grid>
              <Grid item md={3}>
                <SelectInputCustom name='select_type' label='Trạng thái' options={PRODUCT_TYPE_OPTIONS} />
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
        row={products.data}
        isLoading={isLoading}
        paginationModel={paging}
        setPaginationModel={setPaging}
        totalRecord={products.totalRecord}
      />

      {openConfirmDelete && currentProduct && (
        <DeleteProductDialog
          isOpen={openConfirmDelete}
          handleClose={() => setOpenConfirmDelete(false)}
          data={currentProduct}
        />
      )}
    </>
  );
};
