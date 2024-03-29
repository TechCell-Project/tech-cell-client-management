import React, { useEffect, useState } from 'react';
import {
  ButtonCustom,
  DataTable,
  LoadingPage,
  SelectInputCustom,
  TextFieldCustom,
} from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllAttributes, getDetailAttributeById } from '@store/slices/attributeSlice';
import { AttributeModel, PagingAttribute } from '@models/Attribute';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { getIndexNo } from '@utils/index';
import Tooltip from '@mui/material/Tooltip';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded';
import { AttributeDialog } from '@models/Dialog';
import { EditAttribute } from './Dialog/EditAttribute';
import { ConfirmDeleteAttribute } from './Dialog/ConfirmDeleteAttribute';
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
  const [currentAttribute, setCurrentAttribute] = useState<AttributeModel>();
  const [isOpen, setIsOpen] = useState<AttributeDialog>(new AttributeDialog());

  useEffect(() => {
    loadAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchAttribute, paging]);

  const handleGetDetails = (id: string) => {
    dispatch(getDetailAttributeById(id)).then();
  };

  const loadAttributes = () => {
    dispatch(
      getAllAttributes({ ...searchAttribute, page: paging.page, pageSize: paging.pageSize }),
    ).then();
  };

  const columns: Array<GridColDef<AttributeModel>> = [
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
      minWidth: 250,
      flex: 1,
      renderCell: ({ row }) => (
        <b
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
          onClick={() => {
            handleGetDetails(row._id as string);
            setIsOpen((prev) => ({ ...prev, openEdit: true }));
          }}
        >
          {row.name}
        </b>
      ),
    },
    {
      field: 'label',
      headerName: '# Label',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      minWidth: 400,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'options',
      headerName: 'Thao Tác',
      minWidth: 120,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams<AttributeModel>) => [
        <Tooltip title="Chỉnh sửa" key={params.row._id}>
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            onClick={() => {
              handleGetDetails(params.row._id as string);
              setIsOpen((prev) => ({ ...prev, openEdit: true }));
            }}
            label="Chỉnh sửa"
          />
        </Tooltip>,
        <Tooltip title="Xóa" key={params.row._id}>
          <GridActionsCellItem
            icon={<AutoDeleteRoundedIcon />}
            onClick={() => {
              setCurrentAttribute(params.row);
              setIsOpen((prev) => ({ ...prev, openConfirmDelete: true }));
            }}
            label="Xóa"
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
                <TextFieldCustom name="keyword" label="Từ khóa" />
              </Grid>
              <Grid item md={3}>
                <SelectInputCustom
                  name="select_type"
                  label="Trạng thái"
                  options={PRODUCT_TYPE_OPTIONS}
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
        row={attributes.data}
        isLoading={isLoading}
        paginationModel={paging}
        setPaginationModel={setPaging}
        totalRecord={attributes?.totalRecord}
      />

      {isLoadingDetail ? (
        <LoadingPage isLoading={isLoadingDetail} isBlur />
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
          data={currentAttribute}
        />
      )}
    </>
  );
};
