import React, { useEffect } from "react";
import {
  ShowDialog,
  ButtonCustom,
  MultiSelectCustom,
} from "@components/Common";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Formik, Form, FormikHelpers } from "formik";
import { CategoryModel } from "@models/Category";
import { createOrEditValidate } from "@validate/category.validate";
import { TextField, Stack, Grid } from "@mui/material";
import { getAllAttributes } from "@store/slices/attributeSlice";
import { SearchAttributeModel } from "@models/Attribute";
import { SearchModel } from "@models/Common";
import { createNewCategory, getAllCategory } from "@store/slices/categorySlice";
import { enqueueSnackbar } from "notistack";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreateCategory = (props: Props) => {
  const dispatch = useAppDispatch();
  const { attributes } = useAppSelector((state) => state.attribute);

  useEffect(() => {
    dispatch(
      getAllAttributes({ ...new SearchAttributeModel(), no_limit: true })
    );
  }, []);

  const handleSubmit = async (
    values: CategoryModel,
    { resetForm, setSubmitting }: FormikHelpers<CategoryModel>
  ) => {
    const listAttribute = values.requireAttributes?.map((item) => item.label);

    try {
      const response = await dispatch(
        createNewCategory({ ...values, requireAttributes: listAttribute })
      );

      if (response?.success) {
        enqueueSnackbar("Thêm mới thuộc tính thành công!", {
          variant: "success",
        });
        resetForm();
        dispatch(getAllCategory(new SearchModel()));
        props.handleClose();
      } else {
        enqueueSnackbar("Có lỗi xảy ra, Thêm mới thất bại!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra, Thêm mới thất bại!", {
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ShowDialog
      dialogTitle="Thêm mới thể loại"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 560 }}
    >
      <Formik
        enableReinitialize
        initialValues={new CategoryModel()}
        validationSchema={createOrEditValidate}
        onSubmit={handleSubmit}
      >
        {({ handleChange, errors, touched, isSubmitting }) => (
          <Form
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          >
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name"
                    name="name"
                    label="Thể loại"
                    fullWidth
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="label"
                    name="label"
                    label="# Label"
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={touched.label && Boolean(errors.label)}
                    helperText={touched.label && errors.label}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="url"
                    name="url"
                    label="URL"
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={touched.url && Boolean(errors.url)}
                    helperText={touched.url && errors.url}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="description"
                    name="description"
                    label="Mô tả"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    multiline
                    minRows={1}
                    maxRows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MultiSelectCustom<CategoryModel>
                    options={attributes.data}
                    name="requireAttributes"
                    label="Thông số kỹ thuật"
                    displaySelected="name"
                    placeholder="Thông số"
                    multiple
                  />
                </Grid>
              </Grid>

              <Stack
                direction="row"
                justifyContent="flex-end"
                gap={2}
                sx={{ mt: 4 }}
              >
                <ButtonCustom
                  variant="outlined"
                  handleClick={props.handleClose}
                  content="Hủy bỏ"
                />
                <ButtonCustom
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  content="Thêm"
                />
              </Stack>
            </>
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
};
