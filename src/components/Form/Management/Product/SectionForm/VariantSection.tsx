import React, { useState, memo } from "react";
import {
  Grid,
  IconButton,
  TextField,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { ImageModel, ProductRequest, VariationModel } from "@models/Product";
import { ButtonCustom, SelectCustom } from "@components/Common";
import { STATUS_PRODUCT_OPTIONS } from "@constants/options";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { AttributeDialog } from "../Dialog/AttributeDialog";
import { ImageDialog } from "../Dialog/ImageDialog";
import { FieldImageProps } from "@models/Image";
import { getCountImage } from "@utils/index";

export const VariantSection = memo(() => {
  const theme = useTheme();
  const { values, handleChange } = useFormikContext<ProductRequest>();

  const [openAttribute, setOpenAttribute] = useState<boolean>(false);
  const [indexVariation, setIndexVariation] = useState<number | null>(null);
  const [fieldNameImage, setFieldNameImage] = useState<FieldImageProps | null>(
    null
  );

  const handleSetVariationIndex = (index: number) => {
    setIndexVariation(index);
    setOpenAttribute(true);
  };
  
  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
        <Typography variant="body1" fontWeight={600} fontSize="13px">
          Mỗi biến thể bao gồm: số lượng, giá, ảnh, thuộc tính (Dung lượng, màu
          sắc,...)
        </Typography>
      </Stack>
      <FieldArray
        name="variations"
        render={(arrayHelpers) => (
          <>
            <Grid container spacing={2} columns={20}>
              {values.variations?.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    <Grid item lg={6}>
                      <Stack flexDirection="row" gap={2} alignItems="center">
                        <p>3.{i + 1}</p>
                        <TextField
                          id={`variations[${i}].stock`}
                          name={`variations[${i}].stock`}
                          label="Số lượng"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                          size="small"
                          type="number"
                        />
                      </Stack>
                    </Grid>
                    <Grid item lg={6}>
                      <SelectCustom
                        name={`variations[${i}].status`}
                        options={STATUS_PRODUCT_OPTIONS}
                        onChange={handleChange}
                        content="Trạng thái"
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        id={`variations[${i}].price.base`}
                        name={`variations[${i}].price.base`}
                        label="Giá gốc (VNĐ)"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        type="number"
                      />
                    </Grid>
                    <Grid item lg={2} sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => arrayHelpers.remove(i)}>
                        <RemoveCircleRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item lg={5}>
                      <TextField
                        id={`variations[${i}].price.sale`}
                        name={`variations[${i}].price.sale`}
                        label="Đơn giá (VNĐ)"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        type="number"
                      />
                    </Grid>
                    <Grid item lg={5}>
                      <TextField
                        id={`variations[${i}].price.special`}
                        name={`variations[${i}].price.special`}
                        label="Giá khuyến mãi (VNĐ)"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        type="number"
                      />
                    </Grid>
                    <Grid item lg={10} sx={{ mb: 2 }}>
                      <ButtonCustom
                        variant="text"
                        content="Thuộc tính"
                        handleClick={() => handleSetVariationIndex(i)}
                        isBadge
                        badgeCount={item.attributes?.length ?? 0}
                      />
                      <ButtonCustom
                        variant="text"
                        content="Ảnh chính"
                        endIcon={<PhotoRoundedIcon />}
                        styles={{ marginLeft: 5 }}
                        isBadge
                        badgeCount={getCountImage(item.images as ImageModel[], true)}
                        handleClick={() =>
                          setFieldNameImage({
                            field: `variations`,
                            index: i,
                            isThumbnail: true,
                          })
                        }
                      />
                      <ButtonCustom
                        variant="text"
                        content="Ảnh phụ"
                        endIcon={<CollectionsRoundedIcon />}
                        styles={{ marginLeft: 5 }}
                        isBadge
                        badgeCount={getCountImage(item.images as ImageModel[])}
                        handleClick={() =>
                          setFieldNameImage({
                            field: `variations`,
                            index: i,
                            isThumbnail: false,
                          })
                        }
                      />
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>

            <ButtonCustom
              variant="outlined"
              content="Thêm biến thể"
              startIcon={<AddBoxRoundedIcon />}
              handleClick={() => arrayHelpers.push(new VariationModel())}
            />

            {openAttribute && (
              <AttributeDialog
                isOpen={openAttribute}
                handleClose={() => setOpenAttribute(false)}
                index={Number(indexVariation)}
              />
            )}

            {Boolean(fieldNameImage) && (
              <ImageDialog
                isOpen={Boolean(fieldNameImage)}
                handleClose={() => setFieldNameImage(null)}
                fieldImage={fieldNameImage as FieldImageProps}
              />
            )}
          </>
        )}
      />
    </>
  );
});
