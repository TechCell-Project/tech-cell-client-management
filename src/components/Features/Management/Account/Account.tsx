'use client';

import React, { useEffect, useState } from 'react';
import {
  ButtonCustom,
  ChipStatus,
  DataTable,
  SelectInputCustom,
  TextFieldCustom,
} from '@components/Common';
import { getAllUserAccount, getDetailsUserAccount } from '@store/slices/accountSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  getRole,
  getCurrentUserId,
  isRoleAccepted,
  getIndexNo,
  getStatusAccount,
} from '@utils/index';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { ConfirmBlock, ChangeRole, DetailsAccount } from './Dialog';
import Tooltip from '@mui/material/Tooltip';
import { Form, Formik } from 'formik';
import { PagingAccount, UserAccount } from '@models/Account';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Paging } from '@models/Common';
import {
  ACCOUNT_EMAIL_OPTIONS,
  ACCOUNT_ROLE_OPTIONS,
  ACCOUNT_STATUS_OPTIONS,
} from '@constants/options';

export const Account = () => {
  const dispatch = useAppDispatch();
  const { accounts, isLoading } = useAppSelector((state) => state.account);

  const [dataRowSelected, setDataRowSelected] = useState<UserAccount>();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
  const [openChangeRole, setOpenChangeRole] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  const [searchAccount, setSearchAccount] = useState<PagingAccount>(new PagingAccount());
  const [paging, setPaging] = useState<Paging>(new Paging());

  useEffect(() => {
    loadUserAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchAccount, paging]);

  const loadUserAccount = () => {
    dispatch(
      getAllUserAccount({
        ...searchAccount,
        page: paging.page,
        pageSize: paging.pageSize,
      }),
    ).then();
  };

  const loadDataDetails = (id: string) => {
    dispatch(getDetailsUserAccount(id)).then();
  };

  const columns: Array<GridColDef<UserAccount>> = [
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
      headerName: 'Họ Và Tên',
      width: 190,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    {
      field: 'role',
      headerName: 'Vai Trò',
      width: 150,
      valueGetter: (params) => getRole(params.row.role),
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'userName',
      headerName: 'Tài khoản',
      width: 280,
    },
    {
      field: 'status',
      headerName: 'Trạng Thái',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const status = getStatusAccount(params.row.block?.isBlocked);
        return <ChipStatus label={status} type={status} />;
      },
    },
    {
      field: 'options',
      headerName: 'Thao Tác',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams<UserAccount>) => [
        <Tooltip title="Chi tiết" key={params.row._id}>
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            onClick={() => {
              setOpenDetails(true);
              loadDataDetails(params.row._id as string);
            }}
            label="Chi tiết"
          />
        </Tooltip>,
        <Tooltip title="Thay đổi vai trò" key={params.row._id}>
          <span>
            <GridActionsCellItem
              icon={<ChangeCircleOutlinedIcon />}
              onClick={() => {
                setOpenChangeRole(true);
                setDataRowSelected(params.row);
              }}
              label="Đổi vai trò"
              disabled={
                params.row._id === getCurrentUserId() || !isRoleAccepted(params.row.role as string)
              }
            />
          </span>
        </Tooltip>,
        <>
          {!params.row?.block?.isBlocked ? (
            <Tooltip title="Chặn">
              <span>
                <GridActionsCellItem
                  icon={<BlockOutlinedIcon />}
                  onClick={() => {
                    setOpenDeleteConfirm(true);
                    setDataRowSelected(params.row);
                  }}
                  label="Chặn tài khoản"
                  disabled={
                    params.row._id === getCurrentUserId() ||
                    !isRoleAccepted(params.row.role as string)
                  }
                />
              </span>
            </Tooltip>
          ) : (
            <Tooltip title="Mở khóa">
              <span>
                <GridActionsCellItem
                  icon={<LockOpenOutlinedIcon />}
                  onClick={() => {
                    setOpenDeleteConfirm(true);
                    setDataRowSelected(params.row);
                  }}
                  label="Mở khóa tài khoản"
                  disabled={
                    params.row._id === getCurrentUserId() ||
                    !isRoleAccepted(params.row.role as string)
                  }
                />
              </span>
            </Tooltip>
          )}
        </>,
      ],
    },
  ];

  return (
    <>
      <Formik
        initialValues={{ ...searchAccount }}
        onSubmit={(values) => {
          setSearchAccount(values);
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
                  name="status"
                  label="Trạng thái"
                  options={ACCOUNT_STATUS_OPTIONS}
                />
              </Grid>
              <Grid item md={3}>
                <SelectInputCustom name="role" label="Vai trò" options={ACCOUNT_ROLE_OPTIONS} />
              </Grid>
              <Grid item md={3}>
                <SelectInputCustom
                  name="emailVerified"
                  label="Tình trạng email"
                  options={ACCOUNT_EMAIL_OPTIONS}
                />
              </Grid>
              <Grid item md={12} textAlign="right">
                <ButtonCustom
                  type="submit"
                  variant="outlined"
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
        row={accounts.data}
        isLoading={isLoading}
        paginationModel={paging}
        setPaginationModel={setPaging}
        totalRecord={accounts?.totalRecord}
      />

      {openDetails && (
        <DetailsAccount isOpen={openDetails} handleClose={() => setOpenDetails(false)} />
      )}

      {openChangeRole && (
        <ChangeRole
          isOpen={openChangeRole}
          handleClose={() => setOpenChangeRole(false)}
          dataAccount={dataRowSelected as UserAccount}
        />
      )}

      {openDeleteConfirm && (
        <ConfirmBlock
          isOpen={openDeleteConfirm}
          handleClose={() => setOpenDeleteConfirm(false)}
          dataAccount={dataRowSelected as UserAccount}
        />
      )}
    </>
  );
};
