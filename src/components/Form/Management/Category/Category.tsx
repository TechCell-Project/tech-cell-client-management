import React, { useEffect, useState } from 'react';
import { DataTable, LoadingPage } from '@components/Common';
import { COLUMNS_CATEGORY } from '@constants/data';
import { IColumnCategory } from '@interface/data';
import { Paging } from '@models/Common';
import { getAllCategory, getDetailsCategoryByLabel } from '@store/slices/categorySlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getIndexNo } from '@utils/index';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { EditCategory } from './Dialog/EditCategory';
import { DataTableDynamic } from '@components/Shared';

export const Category = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading, isLoadingDetails } = useAppSelector((state) => state.category);

  const [searchCategory, setSearchCategory] = useState<Paging>(new Paging());
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllCategory(searchCategory));
  }, [searchCategory]);

  const handleGetDetails = (label: string) => {
    dispatch(getDetailsCategoryByLabel(label));
  };

  const rows: Array<IColumnCategory> = categories.data.map((category, i) => ({
    id: category._id,
    no: getIndexNo(i, searchCategory.page, searchCategory.pageSize),
    name: category.name,
    label: category.label,
    requiresAttribute: category.requireAttributes?.map((attribute) => attribute.name).join(', '),
  }));

  const columns: Array<any> = [
    ...COLUMNS_CATEGORY,
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
            onClick={() => {
              handleGetDetails(params.row.label);
              setOpenEdit(true);
            }}
            label="Chỉnh sửa"
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
        isQuickFilter
        paginationModel={searchCategory}
        setPaginationModel={setSearchCategory}
        isLoading={isLoading}
        totalRecord={categories.totalRecord}
      />

      {isLoadingDetails ? (
        <LoadingPage isLoading={isLoadingDetails} isBlur />
      ) : (
        <>{openEdit && <EditCategory isOpen={openEdit} handleClose={() => setOpenEdit(false)} />}</>
      )}
    </>
  );
};
