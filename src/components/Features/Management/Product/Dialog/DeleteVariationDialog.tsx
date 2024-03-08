import React, { memo, useState } from 'react';
import { DialogAction } from '@interface/common';
import { ProductModel, VariationModel } from '@models/Product';
import { ButtonCustom, ShowDialog } from '@components/Common';
import { useAppDispatch } from '@store/store';
import { deleteVariationProduct } from '@services/productService';
import { useFormikContext } from 'formik';
import { toast } from 'react-toastify';
import { getDetailsProduct } from '@store/slices/productSlice';

interface Props {
  data: VariationModel;
}

export const DeleteVariationDialog = memo(({ isOpen, handleClose, data }: Props & DialogAction) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { values } = useFormikContext<ProductModel>();

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await deleteVariationProduct(values._id as string, data.sku as string);
      if (response.status === 200) {
        toast.success('Xóa biến thể thành công!');
        await dispatch(getDetailsProduct(String(values._id)));
      }
    } catch {
      toast.error('Xóa biến thể thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ShowDialog
      dialogTitle="Xóa sản phẩm"
      handleClose={handleClose}
      isOpen={isOpen}
      dialogStyle={{ maxWidth: 500 }}
      dialogDesc={<>Bạn có chắc chắn muốn xóa biến thể này ?</>}
    >
      <ButtonCustom variant="outlined" content="Hủy bỏ" handleClick={handleClose} />
      <ButtonCustom
        variant="contained"
        content="Xóa"
        handleClick={handleConfirm}
        disabled={isLoading}
      />
    </ShowDialog>
  );
});
