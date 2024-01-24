import React from 'react';
import { ButtonCustom, ShowDialog } from '@components/Common';
import { removeAttribute } from '@store/slices/attributeSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { toast } from 'react-toastify';
import { DialogAction } from '@interface/common';
import { AttributeModel } from '@models/Attribute';

export const ConfirmDeleteAttribute = (props: DialogAction & { data: AttributeModel}) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.attribute);

  const handleConfirm = async () => {
    try {
      const response = await dispatch(removeAttribute(String(props.data?._id)));

      if (response?.success) {
        toast.success('Xóa thông số thành công!');
      } else {
        toast.error('Có lỗi xảy ra, xóa thông số thất bại!');
      }
    } catch (e) {
      toast.error('Có lỗi xảy ra, xóa thông số thất bại!');
    } finally {
      props.handleClose();
    }
  };

  return (
    <ShowDialog
      dialogTitle='Xóa thông số'
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      dialogStyle={{ maxWidth: 500 }}
      dialogDesc={
        <>
          Bạn có chắc chắn muốn xóa thông số:
          <b style={{ display: 'block' }}>{props.data?.name}</b>
        </>
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
        disabled={isLoading}
        handleClick={handleConfirm}
      />
    </ShowDialog>
  );
};
