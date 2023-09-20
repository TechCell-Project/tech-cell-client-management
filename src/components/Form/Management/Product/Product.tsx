'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';
import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { COLUMNS_PRODUCT } from '@constants/data';
import { getIndexNo, getStatusProduct } from '@utils/index';
import { Tooltip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Paging } from '@models/Common';
import { useRouter } from 'next/navigation';
import { RootRoutes } from '@constants/enum';

export const Product = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.product);
  const router = useRouter();

  const [searchProduct, setSearchProduct] = useState<Paging>(new Paging());

  useEffect(() => {
    dispatch(getAllProduct(searchProduct));
  }, [searchProduct]);

  const rows = products.data.map((product, i) => {
    return ({
      id: product._id,
      no: getIndexNo(i, searchProduct.page, searchProduct.pageSize),
      name: product.name,
      category: product.category?.name,
      status: getStatusProduct(Number(product.status)),
    })
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
        <Tooltip title="Chỉnh sửa" key={params.row.no}>
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            onClick={() => router.push(`${RootRoutes.PRODUCT_EDIT_ROUTE}/${params.row.id}`)}
            label="Chỉnh sửa"
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <DataTable
      column={columns}
      row={rows}
      isLoading={isLoading}
      isQuickFilter
      paginationModel={searchProduct}
      setPaginationModel={setSearchProduct}
      totalRecord={products.totalRecord}
    />
  );
};
