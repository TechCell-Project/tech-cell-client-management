import React, { memo, useMemo } from "react";
import { ChangeRole, ConfirmBlock, DetailsAccount } from "./Dialog";
import { getCurrentUserId, isRoleAccepted } from "@utils/index";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { blockAccount, unBlockAccount } from "@store/slices/accountSlice";
import { ISnackbarAlert } from "@interface/common";
import { useAppDispatch } from "@store/store";

const ActionCell = memo(
  ({ params, setAlert }: { params: any; setAlert: any }) => {
    const dispatch = useAppDispatch();

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
    return (
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
    );
  }
);

export default ActionCell;
