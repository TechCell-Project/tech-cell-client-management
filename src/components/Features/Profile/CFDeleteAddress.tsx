import React, { memo, useState } from 'react';
import { DialogAction } from '@interface/common';
import { ButtonCustom, ShowDialog } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { ProfileAddressRequest } from '@models/Profile';
import { patchProfileAddress } from '@services/profileService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '@store/slices/authSlice';
import { HttpStatusCode } from 'axios';

interface Props extends DialogAction {
  addressIndex: number;
}

const CFDeleteAddress = ({ isOpen, handleClose, addressIndex }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConfirm = () => {
    const newValue = user?.address.filter((_, i) => i !== addressIndex);

    if (newValue) {
      const values = new ProfileAddressRequest(newValue);
      setIsLoading(true);
      patchProfileAddress(values)
        .then(() => {
          toast.success('Xóa địa chỉ thành công!');
          dispatch(getCurrentUser()).then();
        })
        .catch((error) => {
          if (error.response && error.response.status !== HttpStatusCode.Unauthorized) {
            toast.error('Xóa địa chỉ thất bại!');
          }
        })
        .finally(() => {
          setIsLoading(false);
          handleClose();
        });
    }
  };

  return (
    <ShowDialog
      dialogTitle="Xóa địa chỉ"
      isOpen={isOpen}
      handleClose={handleClose}
      dialogStyle={{ maxWidth: 500 }}
      dialogDesc={<>Bạn có chắc chắn muốn xóa địa chỉ này không?</>}
    >
      <ButtonCustom variant="outlined" content="Hủy bỏ" handleClick={handleClose} />
      <ButtonCustom
        variant="contained"
        content="Xác nhận"
        handleClick={handleConfirm}
        disabled={isLoading}
      />
    </ShowDialog>
  );
};

export default memo(CFDeleteAddress);
