"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "@components/Common";
import { COLUMNS_ACCOUNT } from "@constants/data";
import {
  blockAccount,
  getAllUserAccount,
  unBlockAccount,
} from "@store/slices/accountSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getRole, getCurrentUserId, isRoleAccepted } from "@utils/index";
import { SnackbarMessage } from "@components/Common";
import { ISnackbarAlert } from "@interface/common";
import { GridColDef } from "@mui/x-data-grid";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { ConfirmBlock, ChangeRole, DetailsAccount } from "./Dialog";

export const Account = () => {
  const dispatch = useAppDispatch();
  const { accounts, isLoading } = useAppSelector((state) => state.account);
  const [alert, setAlert] = useState<ISnackbarAlert>();

  useEffect(() => {
    dispatch(getAllUserAccount());
  }, []);

  const rows = useMemo(() => {
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

  const handleAccountStatus = async (
    id: string,
    email: string,
    action: "block" | "unblock"
  ) => {
    let actionFunction;
    let successMessage;

    if (action === "block") {
      actionFunction = blockAccount;
      successMessage = `Đã chặn ${email} thành công!`;
    } else if (action === "unblock") {
      actionFunction = unBlockAccount;
      successMessage = `Bỏ chặn ${email} thành công!`;
    }

    if (actionFunction) {
      const response = await dispatch(actionFunction(id));
      if (response) {
        setAlert({
          type: "success",
          message: successMessage,
          timeout: 4000,
        });
      } else {
        setAlert({
          type: "error",
          message: "Có lỗi xảy ra. Chặn thất bại!",
          timeout: 4000,
        });
      }
    }
  };

  const handleConfirmStatus = (
    status: string,
    id: string,
    email: string,
    role: string
  ) => {
    return useMemo(() => {
      if (status === "Hoạt động") {
        return (
          <ConfirmBlock
            icon={<BlockOutlinedIcon />}
            hidden={id === getCurrentUserId()}
            tooltip="Chặn"
            dialogTitle="Xác nhận chặn tài khoản?"
            dialogContentText={
              <>
                Bạn có chắc chắn muốn chặn tài khoản với email: <b>{email}</b>
              </>
            }
            handleClick={() => handleAccountStatus(id, email, "block")}
            disabled={isRoleAccepted(role)}
          />
        );
      } else {
        return (
          <ConfirmBlock
            icon={<LockOpenOutlinedIcon />}
            tooltip="Bỏ chặn"
            hidden={id === getCurrentUserId()}
            dialogTitle="Xác nhận bỏ chặn tài khoản?"
            dialogContentText={
              <>
                Bạn có chắc chắn muốn bỏ chặn tài khoản với email:
                <b>{email}</b>
              </>
            }
            handleClick={() => handleAccountStatus(id, email, "unblock")}
            disabled={isRoleAccepted(role)}
          />
        );
      }
    }, [status, id, email, role]);
  };

  const handleChangeRoleStatus = (id: string, role: string) => {
    return useMemo(() => {
      return (
        <ChangeRole
          dialogTitle="Thay đổi vai trò"
          icon={<ChangeCircleOutlinedIcon />}
          tooltip="Thay đổi vai trò"
          id={id}
          hidden={id === getCurrentUserId()}
          setAlert={setAlert}
          disabled={isRoleAccepted(role)}
        />
      );
    }, [id, role]);
  };

  const viewDetailsAccount = (id: string) => {
    return useMemo(() => {
      return (
        <DetailsAccount
          tooltip="Chi tiết"
          dialogTitle="Thông tin tài khoản"
          id={id}
          icon={<InfoOutlinedIcon />}
        />
      );
    }, [id]);
  };

  const columns: GridColDef[] = [
    ...COLUMNS_ACCOUNT,
    {
      field: "options",
      headerName: "Thao Tác",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {viewDetailsAccount(params.row.id)}
          {handleChangeRoleStatus(params.row.id, params.row.role)}
          {handleConfirmStatus(
            params.row.status,
            params.row.id,
            params.row.email,
            params.row.role
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {alert && !isLoading && <SnackbarMessage {...alert} />}
      <DataTable column={columns} row={rows} isLoading={isLoading} />
    </>
  );
};
