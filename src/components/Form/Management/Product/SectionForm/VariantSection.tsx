import React, { useState, useEffect, memo } from "react";
import { Grid, IconButton, TextField, Stack } from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { ProductDataRequest, VariationModel } from "@models/Product";
import { ButtonCustom, SelectCustom } from "@components/Common";
import { STATUS_PRODUCT_OPTIONS } from "@constants/options";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import { AttributeDialog } from "../Dialog/AttributeDialog";
import { ImageDialog } from "../Dialog/ImageDialog";

export const VariantSection = memo(() => {
  const { values, handleChange } = useFormikContext<ProductDataRequest>();

  const [openAttribute, setOpenAttribute] = useState<boolean>(false);
  const [indexVariation, setIndexVariation] = useState<number | null>(null);
  const [fieldNameImage, setFieldNameImage] = useState<string | null>(null);

  const handleSetVariationIndex = (index: number) => {
    setIndexVariation(index);
    setOpenAttribute(true);
  };

  return (
    <FieldArray
      name="productData.variations"
      render={(arrayHelpers) => (
        <>
          <Grid container spacing={2} columns={20}>
            {values.productData.variations?.map((item, i) => {
              let renderVariantField = `variation_${i + 1}`;
              let renderVariantFieldThumb = `variation_isthumbnail_${i + 1}`;

              return (
                <React.Fragment key={i}>
                  <Grid item lg={6}>
                    <Stack flexDirection="row" gap={2} alignItems="center">
                      <p>3.{i + 1}</p>
                      <TextField
                        id={`productData.variations[${i}].stock`}
                        name={`productData.variations[${i}].stock`}
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
                      name={`productData.variations[${i}].status`}
                      options={STATUS_PRODUCT_OPTIONS}
                      onChange={handleChange}
                      content="Trạng thái"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      id={`productData.variations[${i}].price.base`}
                      name={`productData.variations[${i}].price.base`}
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
                      id={`productData.variations[${i}].price.sale`}
                      name={`productData.variations[${i}].price.sale`}
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
                      id={`productData.variations[${i}].price.special`}
                      name={`productData.variations[${i}].price.special`}
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
                      handleClick={() =>
                        setFieldNameImage(`variation_isthumbnail_${i + 1}`)
                      }
                      isBadge
                      badgeCount={(values as any)[renderVariantFieldThumb]?.length ?? 0}
                    />
                    <ButtonCustom
                      variant="text"
                      content="Ảnh phụ"
                      endIcon={<CollectionsRoundedIcon />}
                      styles={{ marginLeft: 5 }}
                      handleClick={() =>
                        setFieldNameImage(`variation_${i + 1}`)
                      }
                      isBadge
                      badgeCount={
                        (values as any)[renderVariantField]?.length ?? 0
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
              name={String(fieldNameImage)}
            />
          )}
        </>
      )}
    />
  );
});
