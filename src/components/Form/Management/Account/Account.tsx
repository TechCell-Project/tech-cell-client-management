'use client';

import React, { useEffect, useState } from 'react';
import { ButtonCustom, DataTable, SelectInputCustom, TextFieldCustom } from '@components/Common';
import { COLUMNS_ACCOUNT } from '@constants/data';
import { getAllUserAccount, getDetailsUserAccount } from '@store/slices/accountSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getRole, getCurrentUserId, isRoleAccepted, getIndexNo } from '@utils/index';
import { GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { ConfirmBlock, ChangeRole, DetailsAccount } from './Dialog';
import Tooltip from '@mui/material/Tooltip';
import { IColumnAccount } from '@interface/data';
import { Form, Formik } from 'formik';
import { PagingAccount } from '@models/Account';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Paging } from '@models/Common';
import { ACCOUNT_EMAIL_OPTIONS, ACCOUNT_ROLE_OPTIONS, ACCOUNT_STATUS_OPTIONS } from '@constants/options';

export const Account = () => {
  const dispatch = useAppDispatch();
  const { accounts, isLoading } = useAppSelector((state) => state.account);

  const [dataRowSelected, setDataRowSelected] = useState<IColumnAccount>();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
  const [openChangeRole, setOpenChangeRole] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  const [searchAccount, setSearchAccount] = useState<PagingAccount>(new PagingAccount());
  const [paging, setPaging] = useState<Paging>(new Paging());

  useEffect(() => {
    loadUserAccount();
  }, [searchAccount, paging]);

  const loadUserAccount = () => {
    dispatch(getAllUserAccount({
      ...searchAccount,
      page: paging.page,
      pageSize: paging.pageSize,
    })).then();
  };

  const rows: IColumnAccount[] = accounts.data?.map((account, i) => ({
    id: account._id,
    no: getIndexNo(i, searchAccount.page, searchAccount.pageSize),
    name: `${account.firstName} ${account.lastName}`,
    role: getRole(account.role),
    email: account.email,
    status: account.block?.isBlocked ? 'Bị chặn' : 'Hoạt động',
  }));

  const loadDataDetails = (id: string) => {
    dispatch(getDetailsUserAccount(id)).then();
  };

  const columns: GridColDef[] = [
    ...COLUMNS_ACCOUNT,
    {
      field: 'options',
      headerName: 'Thao Tác',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams<any>) => [
        <Tooltip title='Chi tiết' key={params.row.no}>
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            onClick={() => {
              setOpenDetails(true);
              loadDataDetails(params.row.id);
            }}
            label='Chi tiết'
          />
        </Tooltip>,
        <Tooltip title='Thay đổi vai trò' key={params.row.no}>
          <span>
            <GridActionsCellItem
              icon={<ChangeCircleOutlinedIcon />}
              onClick={() => {
                setOpenChangeRole(true);
                setDataRowSelected(params.row);
              }}
              label='Đổi vai trò'
              disabled={params.row.id === getCurrentUserId() || !isRoleAccepted(params.row.role)}
            />
          </span>
        </Tooltip>,
        <>
          {params.row.status === 'Hoạt động' ? (
            <Tooltip title='Chặn'>
              <span>
                <GridActionsCellItem
                  icon={<BlockOutlinedIcon />}
                  onClick={() => {
                    setOpenDeleteConfirm(true);
                    setDataRowSelected(params.row);
                  }}
                  label='Chặn tài khoản'
                  disabled={
                    params.row.id === getCurrentUserId() || !isRoleAccepted(params.row.role)
                  }
                />
              </span>
            </Tooltip>
          ) : (
            <Tooltip title='Mở khóa'>
              <span>
                <GridActionsCellItem
                  icon={<LockOpenOutlinedIcon />}
                  onClick={() => {
                    setOpenDeleteConfirm(true);
                    setDataRowSelected(params.row);
                  }}
                  label='Mở khóa tài khoản'
                  disabled={
                    params.row.id === getCurrentUserId() || !isRoleAccepted(params.row.role)
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
        {({}) => {
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
                    <SelectInputCustom name='status' label='Trạng thái' options={ACCOUNT_STATUS_OPTIONS} />
                  </Grid>
                  <Grid item md={3}>
                    <SelectInputCustom name='role' label='Vai trò' options={ACCOUNT_ROLE_OPTIONS} />
                  </Grid>
                  <Grid item md={3}>
                    <SelectInputCustom name='emailVerified' label='Tình trạng email' options={ACCOUNT_EMAIL_OPTIONS} />
                  </Grid>
                  <Grid item md={12} textAlign="right">
                    <ButtonCustom type='submit' variant='outlined' content='Tìm kiếm' />
                  </Grid>
                </Grid>
              </Box>

              <DataTable
                column={columns}
                row={rows}
                isLoading={isLoading}
                isQuickFilter
                paginationModel={paging}
                setPaginationModel={setPaging}
                totalRecord={accounts?.totalRecord}
              />
            </Form>
          );
        }}
      </Formik>

      {openDetails && (
        <DetailsAccount isOpen={openDetails} handleClose={() => setOpenDetails(false)} />
      )}

      {openChangeRole && (
        <ChangeRole
          isOpen={openChangeRole}
          handleClose={() => setOpenChangeRole(false)}
          dataAccount={dataRowSelected}
        />
      )}

      {openDeleteConfirm && (
        <ConfirmBlock
          isOpen={openDeleteConfirm}
          handleClose={() => setOpenDeleteConfirm(false)}
          dataAccount={dataRowSelected}
        />
      )}
    </>
  );
};
