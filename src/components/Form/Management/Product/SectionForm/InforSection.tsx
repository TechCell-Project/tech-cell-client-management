import {
  ButtonCustom,
  MultiSelectCustom,
  SelectCustom,
} from "@components/Common";
import React, { useEffect, useState, memo } from "react";
import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { ProductDataRequest } from "@models/Product";
import { STATUS_PRODUCT_OPTIONS } from "@constants/options";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getAllCategory } from "@store/slices/categorySlice";
import { PagingCategory } from "@models/Category";
import { ImageDialog } from "../Dialog/ImageDialog";
import { ProductStatus } from "@constants/enum";

export const InforSection = memo(() => {
  const { handleChange, values, touched, errors } =
    useFormikContext<ProductDataRequest>();

  const [fieldNameImage, setFieldNameImage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory({ ...new PagingCategory(), no_limit: true }));
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <TextField
            id="productData.name"
            name="productData.name"
            label="Tên sản phẩm"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            error={
              touched.productData?.name && Boolean(errors.productData?.name)
            }
            helperText={touched.productData?.name && errors.productData?.name}
          />
        </Grid>

        <Grid item lg={4}>
          <SelectCustom
            name="productData.status"
            options={STATUS_PRODUCT_OPTIONS}
            onChange={handleChange}
            content="Trạng thái"
            error={
              touched.productData?.status && Boolean(errors.productData?.status)
            }
            helperText={
              touched.productData?.status && errors.productData?.status
            }
          />
        </Grid>

        <Grid item lg={4}>
          <MultiSelectCustom
            options={categories.data}
            name="productData.categories"
            label="Thể loại"
            displaySelected="name"
            multiple
            placeholder="Chọn thể loại..."
          />
        </Grid>

        <Grid item lg={5}>
          <TextField
            id="productData.description"
            name="productData.description"
            label="Mô tả"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            size="small"
            error={
              touched.productData?.description &&
              Boolean(errors.productData?.description)
            }
            helperText={
              touched.productData?.description &&
              errors.productData?.description
            }
            multiline
            minRows={3}
            maxRows={4}
          />
        </Grid>

        <Grid item lg={7}>
          <ButtonCustom
            variant="outlined"
            content="Ảnh chính"
            endIcon={<PhotoRoundedIcon />}
            isBadge
            badgeCount={values.general_isthumbnail?.length || 0}
            styles={{ marginLeft: "15px" }}
            handleClick={() => setFieldNameImage("general_isthumbnail")}
          />
          <ButtonCustom
            variant="outlined"
            content="Ảnh phụ"
            endIcon={<CollectionsRoundedIcon />}
            isBadge
            badgeCount={values.general?.length || 0}
            styles={{ marginLeft: "30px" }}
            handleClick={() => setFieldNameImage("general")}
          />
        </Grid>
      </Grid>

      {Boolean(fieldNameImage) && (
        <ImageDialog
          isOpen={Boolean(fieldNameImage)}
          handleClose={() => setFieldNameImage(null)}
          name={String(fieldNameImage)}
        />
      )}
    </>
  );
});
