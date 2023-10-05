import { ButtonCustom, ShowDialog } from '@components/Common';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { memo, useState } from 'react';
import { UploadFileCustom } from '@components/Common';
import { useFormikContext } from 'formik';
import { ImageModel, ProductRequest } from '@models/Product';
import { FieldImageProps } from '@models/Image';
import { postImage } from '@services/imageService';
import { toast } from 'react-toastify';
import { DialogAction } from '@interface/common';

interface Props extends DialogAction {
  fieldImage: FieldImageProps;
}

export const ImageDialog = memo((props: Props) => {
  const { isOpen, handleClose, fieldImage } = props;
  const { values, setFieldValue } = useFormikContext<ProductRequest>();
  const [isLoading, setIsLoading] = useState(false);
  const isVariation = fieldImage.field?.startsWith('variations');

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      let imageGeneral: any;
      const fieldTemp = (values as any)['images'];

      if (isVariation) {
        imageGeneral = (values as any)[`${fieldImage.field}`][Number(fieldImage.index)]?.images;
      } else {
        imageGeneral = (values as any)[`${fieldImage?.field}`];
      }

      fieldTemp?.forEach((value: any) => {
        formData.append('images', value);
      });

      const response = await postImage(formData);
      toast.success('Tải ảnh thành công!');

      if (response.data) {
        let data: ImageModel[] = response.data?.data;
        const fieldValue = isVariation
          ? String(fieldImage.field) + `[${Number(fieldImage.index)}]` + '.images'
          : String(fieldImage.field);

        if (fieldImage.isThumbnail) {
          data = { ...(data as any)[0], isThumbnail: true };
          await setFieldValue(fieldValue, [...imageGeneral?.filter((image: ImageModel) => !image.isThumbnail), data]);
        } else {
          await setFieldValue(fieldValue, [...imageGeneral, ...data]);
        }
      }
      handleClose();
    } catch (err) {
      toast.error('Hệ thống lỗi, tải ảnh thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ShowDialog
      dialogTitle='Ảnh'
      handleClose={handleClose}
      isOpen={isOpen}
      dialogStyle={{ minWidth: 620 }}
    >
      <Box sx={{ width: '100%' }}>
        <UploadFileCustom
          name={{
            ...fieldImage,
            field: isVariation
              ? String(fieldImage.field) + `[${Number(fieldImage.index)}]` + '.images'
              : fieldImage.field,
          }}
          imageInits={
            isVariation
              ? (values as any)[`${fieldImage.field}`][Number(fieldImage.index)]?.images
              : (values as any)[`${fieldImage?.field}`]
          }
        />
        <Stack direction='row' justifyContent='flex-end' sx={{ mt: 4 }} gap={1}>
          <ButtonCustom variant='outlined' handleClick={handleClose} content='Đóng' />
          <ButtonCustom
            variant='contained'
            handleClick={() => handleUpload()}
            disabled={isLoading}
            content='Tải lên'
          />
        </Stack>
      </Box>
    </ShowDialog>
  );
});
