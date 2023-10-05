'use client';

import React, { FC, memo } from 'react';
import { ShowDialog, ButtonCustom } from '@components/Common';
import { useAppDispatch } from '@store/store';
import { IColumnAccount } from '@interface/data';
import { blockAccount, unBlockAccount } from '@store/slices/accountSlice';
import { toast } from 'react-toastify';
import { DialogAction } from '@interface/common';

interface Props extends DialogAction{
  dataAccount?: IColumnAccount;
}

export const ConfirmBlock: FC<Props> = memo((props) => {
  const dispatch = useAppDispatch();

  const handleAccountStatus = async (
    id?: string,
    email?: string,
    action?: 'block' | 'unblock',
  ) => {
    let actionFunction;
    let successMessage;

    if (action === 'block') {
      actionFunction = blockAccount;
      successMessage = `Đã chặn ${email} thành công!`;
    } else if (action === 'unblock') {
      actionFunction = unBlockAccount;
      successMessage = `Bỏ chặn ${email} thành công!`;
    }

    if (actionFunction) {
      const response = await dispatch(actionFunction(String(id)));
      if (response) {
        toast.success(successMessage);
      } else {
        toast.error('Có lỗi xảy ra. Chặn thất bại!');
      }
    }
  };

  const handleConfirm = () => {
    if (props.dataAccount?.status === 'Hoạt động') {
      handleAccountStatus(
        props.dataAccount?.id,
        props.dataAccount?.email,
        'block',
      ).then();
    } else {
      handleAccountStatus(
        props.dataAccount?.id,
        props.dataAccount?.email,
        'unblock',
      ).then();
    }
    props.handleClose();
  };

  return (
    <ShowDialog
      dialogTitle={`Xác nhận ${
        props.dataAccount?.status === 'Hoạt động' ? 'xóa' : 'mở khóa'
      }  tài khoản?`}
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      dialogStyle={{ maxWidth: 500 }}
      dialogDesc={
        props.dataAccount?.status === 'Hoạt động' ? (
          <>
            Bạn có chắc chắn muốn chặn tài khoản với email:
            <b style={{ display: 'block' }}>{props.dataAccount?.email}</b>
          </>
        ) : (
          <>
            Bạn có chắc chắn muốn mở khóa tài khoản với email:
            <b style={{ display: 'block' }}>{props.dataAccount?.email}</b>
          </>
        )
      }
    >
      <ButtonCustom
        variant='outlined'
        content='Hủy bỏ'
        handleClick={props.handleClose}
      />
      <ButtonCustom
        variant='contained'
        content='Xác nhận'
        handleClick={handleConfirm}
      />
    </ShowDialog>
  );
});
