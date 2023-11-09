'use client';

import React, { useEffect, useState } from 'react';
import { ButtonCustom, DataTable, SelectInputCustom, TextFieldCustom } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';
import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { COLUMNS_PRODUCT } from '@constants/data';
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

  const rows: IColumnProduct[] = products.data.map((product, i) => {
    return {
      id: product._id,
      no: getIndexNo(i, searchProduct.page, searchProduct.pageSize),
      name: product.name,
      category: product.category?.name,
      status: productStatusMapping[Number(product.status)],
      generalAttributes: product.generalAttributes?.length,
      variations: product.variations.length,
    };
  });

  const columns: any[] = [
    ...COLUMNS_PRODUCT,
    {
      field: 'options',
      headerName: 'Thao Tác',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <Tooltip title='Chỉnh sửa' key={params.row.no}>
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            onClick={() => router.push(`${RootRoutes.PRODUCT_EDIT_ROUTE}/${params.row.id}`)}
            label='Chỉnh sửa'
          />
        </Tooltip>,
        <Tooltip title='Xóa' key={params.row.no}>
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
        {() => {
          return (
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
                  <Grid item md={2} >
                    <ButtonCustom type='submit' variant='outlined' content='Tìm kiếm' />
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )
        }}
      </Formik>

      <DataTable
        column={columns}
        row={rows}
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
