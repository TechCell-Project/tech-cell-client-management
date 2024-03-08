import React, { memo } from 'react';
import { DialogAction } from '@interface/common';
import { ButtonCustom, ShowDialog } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { removeProduct } from '@store/slices/productSlice';
import { ProductModel } from '@models/Product';

export const DeleteProductDialog = memo(
  ({ isOpen, handleClose, data }: DialogAction & { data: ProductModel }) => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.product);

    return (
      <ShowDialog
        dialogTitle="Xóa sản phẩm"
        handleClose={handleClose}
        isOpen={isOpen}
        dialogStyle={{ maxWidth: 500 }}
        dialogDesc={
          <>
            Bạn có chắc chắn muốn xóa <b>{data.name}</b> ?
          </>
        }
      >
        <ButtonCustom variant="outlined" content="Hủy bỏ" handleClick={handleClose} />
        <ButtonCustom
          variant="contained"
          content="Xóa"
          handleClick={async () => {
            await dispatch(removeProduct(String(data._id)));
            handleClose();
          }}
          disabled={isLoading}
        />
      </ShowDialog>
    );
  },
);
