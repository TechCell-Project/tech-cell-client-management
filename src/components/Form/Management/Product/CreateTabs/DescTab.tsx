import React, { memo, useState } from "react";
import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { useFormikContext } from "formik";
import styles from "@styles/components/_common.module.scss";
import { ImageDialog } from "../Dialog/ImageDialog";
import { ButtonCustom, TinyEditor } from "@components/Common";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { ProductRequest } from "@models/Product";
import { FieldImageProps } from "@models/Image";

export const DescTab = memo(() => {
  const theme = useTheme();
  const { values } = useFormikContext<ProductRequest>();
  const [fieldNameImage, setFieldNameImage] = useState<FieldImageProps | null>(
    null
  );

  return (
    <>
      <Stack
        flexDirection="column"
        alignItems="flex-start"
        gap={3}
        mt="20px"
        width="100%"
      >
        <Typography
          fontSize="0.9rem"
          fontWeight="500"
          className={styles.titleHighlight}
        >
          <i>Mô tả, đánh giá chi tiết</i>
        </Typography>

        <Stack
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap={1}
        >
          <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
          <Typography variant="body1" fontWeight={600} fontSize="13px">
            Lưu ý: Nhấn "Lưu bài" để cập nhật dữ liệu thay đổi, phần chèn ảnh có
            thể lấy url sau khi upload ảnh mô tả, hoặc bất kỳ url image nào.
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} mb={1}>
            <ButtonCustom
              variant="outlined"
              content="Chọn ảnh mô tả"
              endIcon={<CollectionsRoundedIcon />}
              isBadge
              badgeCount={values.descriptionImages?.length ?? 0}
              handleClick={() =>
                setFieldNameImage({
                  field: "descriptionImages",
                  isThumbnail: false,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TinyEditor name="description" value={String(values.description)} />
          </Grid>
        </Grid>
      </Stack>

      {Boolean(fieldNameImage) && (
        <ImageDialog
          isOpen={Boolean(fieldNameImage)}
          handleClose={() => setFieldNameImage(null)}
          fieldImage={fieldNameImage as FieldImageProps}
        />
      )}
    </>
  );
});
