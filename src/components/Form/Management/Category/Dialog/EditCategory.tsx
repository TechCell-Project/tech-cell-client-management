import {
  ButtonCustom,
  ShowDialog,
  MultiSelectCustom,
} from "@components/Common";
import React, { useEffect } from "react";
import {
  Stack,
  Grid,
  TextField,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { createOrEditValidate } from "@validate/category.validate";
import { useAppDispatch, useAppSelector } from "@store/store";
import { CategoryModel } from "@models/Category";
import { editAttribute, getAllAttributes } from "@store/slices/attributeSlice";
import { enqueueSnackbar } from "notistack";
import { SearchAttributeModel } from "@models/Attribute";
import { editCategory } from "@store/slices/categorySlice";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const EditCategory = (props: Props) => {
  const { category, isLoadingDetails } = useAppSelector(
    (state) => state.category
  );
  const { attributes } = useAppSelector((state) => state.attribute);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleSubmit = async (
    values: CategoryModel,
    { setSubmitting }: FormikHelpers<CategoryModel>
  ) => {
    const listAttributes = values.requireAttributes?.map(
      (attribute) => attribute.label
    );

    try {
      const response = await dispatch(
        editCategory(
          { ...values, requireAttributes: listAttributes },
          String(values._id)
        )
      );

      if (response?.success) {
        enqueueSnackbar("Cập nhật thể loại thành công!", {
          variant: "success",
        });
        props.handleClose();
      } else {
        enqueueSnackbar("Có lỗi xảy ra. Chỉnh sửa thất bại!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra. Chỉnh sửa thất bại!", {
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(
      getAllAttributes({ ...new SearchAttributeModel(), no_limit: true })
    );
  }, []);

  return (
    <ShowDialog
      dialogTitle="Chỉnh sửa thể loại"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 560 }}
    >
      <Formik
        enableReinitialize
        initialValues={{ ...category }}
        validationSchema={createOrEditValidate}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form
            style={{
              width: "100%",
              marginTop: "10px",
              textAlign: isLoadingDetails ? "center" : "left",
            }}
          >
            {isLoadingDetails ? (
              <CircularProgress sx={{ color: theme.color.red }} />
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="name"
                      name="name"
                      label="Thể loại"
                      fullWidth
                      value={values.name}
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
                      value={values.label}
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
                      value={values.url}
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
                      value={values.description}
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
                    content="Xác nhận"
                  />
                </Stack>
              </>
            )}
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
};
