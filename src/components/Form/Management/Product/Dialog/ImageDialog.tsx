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
  const isVariation = fieldImage.field?.startsWith("variations");

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      let imageGeneral: any;
      const fieldTemp = (values as any)["images"];

      if (isVariation) {
        imageGeneral = (values as any)[`${fieldImage.field}`][
          Number(fieldImage.index)
        ]?.images;
      } else {
        imageGeneral = (values as any)[`${fieldImage?.field}`];
      }

      fieldTemp?.forEach((value: any) => {
        formData.append("images", value);
      });

      const response = await postImage(formData);
      enqueueSnackbar("Tải ảnh thành công!", {
        variant: "success",
      });

      if (response.data) {
        let data: ImageModel[] = response.data?.data;
        const fieldValue = isVariation
          ? String(fieldImage.field) +
            `[${Number(fieldImage.index)}]` +
            ".images"
          : String(fieldImage.field);

        if (fieldImage.isThumbnail) {
          data = { ...(data as any)[0], isThumbnail: true };
          setFieldValue(fieldValue, [...imageGeneral, data]);
        } else {
          setFieldValue(fieldValue, [...imageGeneral, ...data]);
        }
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
      dialogStyle={{ minWidth: 620 }}
    >
      <Box sx={{ width: "100%" }}>
        <UploadFileCustom
          name={{
            ...fieldImage,
            field: isVariation
              ? String(fieldImage.field) +
                `[${Number(fieldImage.index)}]` +
                ".images"
              : fieldImage.field,
          }}
          imageInits={
            isVariation
              ? (values as any)[`${fieldImage.field}`][Number(fieldImage.index)]
                  ?.images
              : (values as any)[`${fieldImage?.field}`]
          }
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
