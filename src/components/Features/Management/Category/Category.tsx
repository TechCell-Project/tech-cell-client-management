import React, { useEffect, useState } from 'react';
import { ButtonCustom, DataTable, LoadingPage, TextFieldCustom } from '@components/Common';
import { COLUMNS_CATEGORY } from '@constants/data';
import { IColumnCategory } from '@interface/data';
import { Paging } from '@models/Common';
import { getAllCategory, getDetailsCategoryByLabel } from '@store/slices/categorySlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getIndexNo } from '@utils/index';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { EditCategory } from './Dialog/EditCategory';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const Category = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading, isLoadingDetails } = useAppSelector((state) => state.category);

  const [searchCategory, setSearchCategory] = useState<Paging>(new Paging());
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    loadCategories();
  }, [searchCategory]);

  const loadCategories = () => {
    dispatch(getAllCategory({ ...searchCategory })).then();
  };

  const handleGetDetails = (label: string) => {
    dispatch(getDetailsCategoryByLabel(label)).then();
  };

  const rows: Array<IColumnCategory> = categories.data.map((category, i) => ({
    id: category._id,
    no: getIndexNo(i, searchCategory.page, searchCategory.pageSize),
    name: category.name,
    label: category.label,
    requiresAttribute: category.requireAttributes?.map((attribute) => attribute.name).join(', '),
  }));

  const columns: Array<GridColDef> = [
    {
      field: 'no',
      headerName: 'STT',
      width: 70,
      renderCell: (params) => {
        const index = params.api.getAllRowIds().indexOf(params.id);
        return getIndexNo(index, searchCategory.page, searchCategory.pageSize);
      },
    },
    {
      field: 'name',
      headerName: 'Thể loại',
      width: 200,
    },
    {
      field: 'label',
      headerName: '# Label',
      width: 200,
    },
    {
      field: 'requiresAttribute',
      headerName: 'Danh sách thông số/thuộc tính',
      width: 400,
      headerAlign: 'center',
      valueGetter: (params) => {
        const value = params.row.requireAttributes?.map((attribute: any) => attribute.name);
        return value.join(', ');
      },
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
            onClick={() => {
              handleGetDetails(params.row.label);
              setOpenEdit(true);
            }}
            label='Chỉnh sửa'
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <>
      <Formik
        initialValues={{ ...searchCategory }}
        onSubmit={(values) => {
          setSearchCategory({ ...values, page: 0 });
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
              <Grid item md={2}>
                <ButtonCustom type='submit' variant='outlined' content='Tìm kiếm' />
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>

      <DataTable
        column={columns}
        row={categories.data}
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
