'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@components/Common';
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
import { Paging } from '@models/Common';

export const Account = () => {
  const dispatch = useAppDispatch();
  const { accounts, isLoading } = useAppSelector((state) => state.account);

  const [dataRowSelected, setDataRowSelected] = useState<IColumnAccount>();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
  const [openChangeRole, setOpenChangeRole] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  const [searchAccount, setSearchAccount] = useState<Paging>(new Paging());

  useEffect(() => {
    dispatch(getAllUserAccount(searchAccount)).then();
  }, [searchAccount, dispatch]);

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

  const columns: GridColDef<any>[] = [
    ...COLUMNS_ACCOUNT,
    {
      field: 'options',
      headerName: 'Thao Tác',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      type: 'actions',
      getActions: (params: GridRowParams<any>) => [
        <Tooltip title="Chi tiết" key={params.row.no}>
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            onClick={() => {
              setOpenDetails(true);
              loadDataDetails(params.row.id);
            }}
            label="Chi tiết"
          />
        </Tooltip>,
        <Tooltip title="Thay đổi vai trò" key={params.row.no}>
          <span>
            <GridActionsCellItem
              icon={<ChangeCircleOutlinedIcon />}
              onClick={() => {
                setOpenChangeRole(true);
                setDataRowSelected(params.row);
              }}
              label="Đổi vai trò"
              disabled={params.row.id === getCurrentUserId() || !isRoleAccepted(params.row.role)}
            />
          </span>
        </Tooltip>,
        <>
          {params.row.status === 'Hoạt động' ? (
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
                    params.row.id === getCurrentUserId() || !isRoleAccepted(params.row.role)
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
      <DataTable
        column={columns}
        row={rows}
        isLoading={isLoading}
        isQuickFilter
        paginationModel={searchAccount}
        setPaginationModel={setSearchAccount}
        totalRecord={accounts?.totalRecord}
      />

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
