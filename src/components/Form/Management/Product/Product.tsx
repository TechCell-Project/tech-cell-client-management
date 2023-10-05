'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';
import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { COLUMNS_PRODUCT } from '@constants/data';
import { getIndexNo, getStatusProduct } from '@utils/index';
import Tooltip from '@mui/material/Tooltip';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Paging } from '@models/Common';
import { useRouter } from 'next/navigation';
import { RootRoutes } from '@constants/enum';
import { IColumnProduct } from '@interface/data';
import { DeleteProductDialog } from '@components/Form/Management/Product/Dialog/DeleteProductDialog';

export const Product = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.product);
  const router = useRouter();

  const [currentProduct, setCurrentProduct] = useState<IColumnProduct>();
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [searchProduct, setSearchProduct] = useState<Paging>(new Paging());

  useEffect(() => {
    dispatch(getAllProduct(searchProduct)).then();
  }, [searchProduct, dispatch]);

  const rows: IColumnProduct[] = products.data.map((product, i) => {
    return {
      id: product._id,
      no: getIndexNo(i, searchProduct.page, searchProduct.pageSize),
      name: product.name,
      category: product.category?.name,
      status: getStatusProduct(Number(product.status)),
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
      getActions: (params: GridRowParams<any>) => [
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
      <DataTable
        column={columns}
        row={rows}
        isLoading={isLoading}
        isQuickFilter
        paginationModel={searchProduct}
        setPaginationModel={setSearchProduct}
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
