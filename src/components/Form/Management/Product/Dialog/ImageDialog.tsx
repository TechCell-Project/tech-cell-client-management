import { ButtonCustom, ShowDialog } from "@components/Common";
import { Box, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import { UploadFileCustom } from "../../../../Common/FormGroup/UploadFileCustom";
import { useFormikContext } from "formik";
import { ImageModel, ProductRequest } from "@models/Product";
import { FieldImageProps } from "@models/Image";
import { enqueueSnackbar } from "notistack";
import { postImage } from "@services/imageService";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  fieldImage: FieldImageProps;
}

export const ImageDialog = memo((props: Props) => {
  const { isOpen, handleClose, fieldImage } = props;
  const { values, setFieldValue } = useFormikContext<ProductRequest>();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      const imageGeneral = (values as any)[`${fieldImage?.field}`];
      const fieldTemp = (values as any)["images"];

      fieldTemp?.forEach((value: any) => {
        formData.append("images", value);
      });

      const response = await postImage(formData);
      enqueueSnackbar("Tải ảnh thành công!", {
        variant: "success",
      });

      if (response.data) {
        let data: ImageModel[] = response.data?.data;
        if (fieldImage.isThumbnail) {
          data = { ...(data as any)[0], isThumbnail: true };
          setFieldValue(String(fieldImage.field), [...imageGeneral, data]);
        } else {
          setFieldValue(String(fieldImage.field), [...imageGeneral, ...data]);
        }
        (values as any)["images"] = [];
      }
      handleClose();
    } catch (err) {
      enqueueSnackbar("Hệ thống lỗi, tải ảnh thất bại!", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ShowDialog
      dialogTitle="Ảnh"
      handleClose={handleClose}
      isOpen={isOpen}
      dialogStyle={{ minWidth: 560 }}
    >
      <Box sx={{ width: "100%" }}>
        <UploadFileCustom
          name={fieldImage}
          imageInits={(values as any)[`${fieldImage?.field}`]}
        />
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }} gap={1}>
          <ButtonCustom
            variant="outlined"
            handleClick={handleClose}
            content="Đóng"
          />
          <ButtonCustom
            variant="contained"
            handleClick={() => handleUpload()}
            disabled={isLoading}
            content="Tải lên"
          />
        </Stack>
      </Box>
    </ShowDialog>
  );
});
