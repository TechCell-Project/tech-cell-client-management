"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "@components/Common";
import { COLUMNS_ACCOUNT } from "@constants/data";
import {
  getAllUserAccount,
  getDetailsUserAccount,
} from "@store/slices/accountSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getRole, getCurrentUserId, isRoleAccepted } from "@utils/index";
import { SnackbarMessage } from "@components/Common";
import { ISnackbarAlert } from "@interface/common";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { ConfirmBlock, ChangeRole, DetailsAccount } from "./Dialog";
import { Tooltip } from "@mui/material";
import { IColumnAccount } from "@interface/data";

export const Account = () => {
  const dispatch = useAppDispatch();
  const { accounts, isLoading } = useAppSelector((state) => state.account);

  const [alert, setAlert] = useState<ISnackbarAlert>();

  const [dataRowSelected, setDataRowSelected] = useState<IColumnAccount>();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
  const [openChangeRole, setOpenChangeRole] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllUserAccount());
  }, []);

  const rows: IColumnAccount[] = useMemo(() => {
    return accounts.map((account, i) => ({
      id: account._id,
      no: i + 1,
      name: `${account.firstName} ${account.lastName}`,
      role: getRole(account.role),
      email: account.email,
      status:
        account.block && account.block.isBlocked ? "Bị chặn" : "Hoạt động",
    }));
  }, [accounts]);

  const loadDataDetails = (id: string) => {
    dispatch(getDetailsUserAccount(id));
  };

  const columns: GridColDef<any>[] = [
    ...COLUMNS_ACCOUNT,
    {
      field: "options",
      headerName: "Thao Tác",
      width: 200,
      align: "center",
      headerAlign: "center",
      type: "actions",
      getActions: (params: GridRowParams<any>) => [
        <Tooltip title="Chi tiết">
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            onClick={() => {
              setOpenDetails(true), loadDataDetails(params.row.id);
            }}
            label="Chi tiết"
          />
        </Tooltip>,
        <Tooltip title="Thay đổi vai trò">
          <span>
            <GridActionsCellItem
              icon={<ChangeCircleOutlinedIcon />}
              onClick={() => {
                setOpenChangeRole(true), setDataRowSelected(params.row);
              }}
              label="Đổi vai trò"
              disabled={
                params.row.id === getCurrentUserId() ||
                !isRoleAccepted(params.row.role)
              }
            />
          </span>
        </Tooltip>,
        <>
          {params.row.status === "Hoạt động" ? (
            <Tooltip title="Chặn">
              <span>
                <GridActionsCellItem
                  icon={<BlockOutlinedIcon />}
                  onClick={() => {
                    setOpenDeleteConfirm(true), setDataRowSelected(params.row);
                  }}
                  label="Chặn tài khoản"
                  disabled={
                    params.row.id === getCurrentUserId() ||
                    !isRoleAccepted(params.row.role)
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
                    setOpenDeleteConfirm(true), setDataRowSelected(params.row);
                  }}
                  label="Mở khóa tài khoản"
                  disabled={
                    params.row.id === getCurrentUserId() ||
                    !isRoleAccepted(params.row.role)
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
      {alert && !isLoading && <SnackbarMessage {...alert} />}
      <DataTable column={columns} row={rows} isLoading={isLoading} />

      {openDetails && (
        <DetailsAccount
          isOpen={openDetails}
          handleClose={() => setOpenDetails(false)}
        />
      )}

      {openChangeRole && (
        <ChangeRole
          isOpen={openChangeRole}
          handleClose={() => setOpenChangeRole(false)}
          dataAccount={dataRowSelected}
          setAlert={setAlert}
        />
      )}

      {openDeleteConfirm && (
        <ConfirmBlock
          isOpen={openDeleteConfirm}
          handleClose={() => setOpenDeleteConfirm(false)}
          dataAccount={dataRowSelected}
          setAlert={setAlert}
        />
      )}
    </>
  );
};
