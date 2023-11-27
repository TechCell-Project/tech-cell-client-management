import React, { useEffect, useState } from 'react';
import { ButtonCustom, DataTable, LoadingPage, SelectInputCustom, TextFieldCustom } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllAttributes, getDetailAttributeById } from '@store/slices/attributeSlice';
import { PagingAttribute } from '@models/Attribute';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { getIndexNo } from '@utils/index';
import Tooltip from '@mui/material/Tooltip';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded';
import { AttributeDialog } from '@models/Dialog';
import { EditAttribute } from './Dialog/EditAttribute';
import { ConfirmDeleteAttribute } from './Dialog/ConfirmDeleteAttribute';
import { IColumnAttribute } from '@interface/data';
import { Paging } from '@models/Common';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';

export const Attribute = () => {
  const dispatch = useAppDispatch();
  const { attributes, isLoading, isLoadingDetail } = useAppSelector((state) => state.attribute);

  const [paging, setPaging] = useState<Paging>(new Paging());
  const [searchAttribute, setSearchAttribute] = useState<PagingAttribute>(new PagingAttribute());
  const [currentAttribute, setCurrentAttribute] = useState<IColumnAttribute>();
  const [isOpen, setIsOpen] = useState<AttributeDialog>(new AttributeDialog());

  useEffect(() => {
    loadAttributes();
  }, [searchAttribute, paging]);

  const handleGetDetails = (id: string) => {
    dispatch(getDetailAttributeById(id)).then();
  };

  const loadAttributes = () => {
    dispatch(getAllAttributes({ ...searchAttribute, page: paging.page, pageSize: paging.pageSize })).then();
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
    {
      field: 'name',
      headerName: 'Thông số',
      width: 250,
    },
    {
      field: 'label',
      headerName: '# Label',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      width: 400,
      align: 'center',
      headerAlign: 'center',
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
              handleGetDetails(params.row._id);
              setIsOpen((prev) => ({ ...prev, openEdit: true }));
            }}
            label='Chỉnh sửa'
          />
        </Tooltip>,
        <Tooltip title='Xóa' key={params.row._id}>
          <GridActionsCellItem
            icon={<AutoDeleteRoundedIcon />}
            onClick={() => {
              setCurrentAttribute(params.row);
              setIsOpen((prev) => ({ ...prev, openConfirmDelete: true }));
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
        initialValues={{ ...searchAttribute }}
        onSubmit={(values) => {
          setSearchAttribute(values);
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
        row={attributes.data}
        isLoading={isLoading}
        paginationModel={paging}
        setPaginationModel={setPaging}
        totalRecord={attributes?.totalRecord}
      />

      {isLoadingDetail ? (
        <LoadingPage isLoading={isLoadingDetail} />
      ) : (
        <>
          {isOpen.openEdit && (
            <EditAttribute
              isOpen={isOpen.openEdit}
              handleClose={() => setIsOpen((prev) => ({ ...prev, openEdit: false }))}
            />
          )}
        </>
      )}

      {isOpen.openConfirmDelete && currentAttribute && (
        <ConfirmDeleteAttribute
          isOpen={isOpen.openConfirmDelete}
          handleClose={() => setIsOpen((prev) => ({ ...prev, openConfirmDelete: false }))}
          dataAttribute={currentAttribute}
        />
      )}
    </>
  );
};
