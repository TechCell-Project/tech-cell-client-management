import React, { memo } from 'react';
import { DialogAction } from '@interface/common';
import { IColumnProduct } from '@interface/data';
import { ButtonCustom, ShowDialog } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { removeProduct } from '@store/slices/productSlice';

interface Props extends DialogAction {
  data: IColumnProduct;
}

export const DeleteProductDialog = memo(({ isOpen, handleClose, data }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.product);

  const handleConfirm = async () => {
    await dispatch(removeProduct(String(data.id)));
    handleClose();
  };

  return (
    <ShowDialog
      dialogTitle='Xóa sản phẩm'
      handleClose={handleClose}
      isOpen={isOpen}
      dialogStyle={{ maxWidth: 500 }}
      dialogDesc={<>Bạn có chắc chắn muốn xóa <b>{data.name}</b> ?</>}
    >
      <ButtonCustom
        variant='outlined'
        content='Hủy bỏ'
        handleClick={handleClose}
      />
      <ButtonCustom
        variant='contained'
        content='Xóa'
        handleClick={handleConfirm}
        disabled={isLoading}
      />
    </ShowDialog>
  );
});