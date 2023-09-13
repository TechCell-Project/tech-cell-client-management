import { ButtonCustom, SelectCustom } from "@components/Common";
import React, { useEffect, useState, memo } from "react";
import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { ImageModel, ProductRequest } from "@models/Product";
import { STATUS_PRODUCT_OPTIONS } from "@constants/options";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getAllCategory } from "@store/slices/categorySlice";
import { PagingCategory } from "@models/Category";
import { ImageDialog } from "../Dialog/ImageDialog";
import { FieldImageProps } from "@models/Image";
import { getCountImage } from "@utils/index";

export const InforSection = memo(() => {
  const { handleChange, setFieldValue, values, touched, errors } =
    useFormikContext<ProductRequest>();

  const [fieldNameImage, setFieldNameImage] = useState<FieldImageProps | null>(
    null
  );

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
            id="name"
            name="name"
            label="Tên sản phẩm"
            onChange={handleChange}
            value={values.name}
            fullWidth
            variant="outlined"
            size="small"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </Grid>

        <Grid item lg={4}>
          <SelectCustom
            name="status"
            options={STATUS_PRODUCT_OPTIONS}
            onChange={handleChange}
            content="Trạng thái"
            error={touched.status && Boolean(errors.status)}
            helperText={touched.status && errors.status}
          />
        </Grid>

        <Grid item lg={4}>
          <SelectCustom
            options={categories.data}
            name="categories"
            content="Thể loại"
            onChange={({ target }) =>
              setFieldValue(target.name, [target.value])
            }
            displayValue="label"
            displayOption="name"
            error={touched.categories && Boolean(errors.categories)}
            helperText={touched.categories && errors.categories}
          />
        </Grid>

        <Grid item lg={7}>
          <ButtonCustom
            variant="outlined"
            content="Ảnh chính"
            endIcon={<PhotoRoundedIcon />}
            isBadge
            badgeCount={getCountImage(values.generalImages as ImageModel[], true)}
            handleClick={() =>
              setFieldNameImage({ field: "generalImages", isThumbnail: true })
            }
          />
          <ButtonCustom
            variant="outlined"
            content="Ảnh phụ"
            endIcon={<CollectionsRoundedIcon />}
            isBadge
            badgeCount={getCountImage(values.generalImages as ImageModel[])}
            styles={{ marginLeft: "30px" }}
            handleClick={() =>
              setFieldNameImage({ field: "generalImages", isThumbnail: false })
            }
          />
        </Grid>
      </Grid>

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
