import React, { useEffect, useState } from 'react';
import { ButtonCustom, DataTable, LoadingPage, TextFieldCustom } from '@components/Common';
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
import { CategoryModel } from '@models/Category';
import { AttributeModel } from '@models/Attribute';

export const Category = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading, isLoadingDetails } = useAppSelector((state) => state.category);

  const [searchCategory, setSearchCategory] = useState<Paging>(new Paging());
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCategory]);

  const loadCategories = () => {
    dispatch(getAllCategory({ ...searchCategory })).then();
  };

  const handleGetDetails = (label: string) => {
    dispatch(getDetailsCategoryByLabel(label)).then();
  };

  const columns: Array<GridColDef<CategoryModel>> = [
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
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params) => {
        const value = params.row.requireAttributes?.map((attribute: AttributeModel) => attribute.name);
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
      getActions: (params: GridRowParams<CategoryModel>) => [
        <Tooltip title='Chỉnh sửa' key={params.row._id}>
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            onClick={() => {
              handleGetDetails(params.row.label as string);
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
        row={categories.data}
        paginationModel={searchCategory}
        setPaginationModel={setSearchCategory}
        isLoading={isLoading}
        totalRecord={categories.totalRecord}
      />

      {isLoadingDetails ? (
        <LoadingPage isLoading={isLoadingDetails} isBlur />
      ) : (
        <>
          {openEdit && (
            <EditCategory isOpen={openEdit} handleClose={() => setOpenEdit(false)} />
          )}
        </>
      )}
    </>
  );
};
