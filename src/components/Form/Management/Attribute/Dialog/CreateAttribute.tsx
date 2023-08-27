import React from "react";
import { ButtonCustom, ShowDialog } from "@components/Common";
import {
  AttributeModel,
  CreateAttributeModel,
  SearchAttributeModel,
} from "@models/Attribute";
import { createOrEditValidate } from "@validate/attribute.validate";
import { Form, Formik, FormikHelpers } from "formik";
import { TextField, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  createNewAttribute,
  getAllAttributes,
} from "@store/slices/attributeSlice";
import { enqueueSnackbar } from "notistack";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreateAttribute = (props: Props) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: CreateAttributeModel,
    { resetForm, setSubmitting }: FormikHelpers<CreateAttributeModel>
  ) => {
    try {
      const response = await dispatch(createNewAttribute(values));

      if(response?.success) {
        enqueueSnackbar("Thêm mới thông số thành công!", {
          variant: "success",
        });
        dispatch(getAllAttributes(new SearchAttributeModel()));
        resetForm();
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
      dialogTitle="Thêm mới thông số"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 420 }}
    >
      <Formik
        enableReinitialize
        initialValues={new CreateAttributeModel()}
        validationSchema={createOrEditValidate}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          >
            <>
              <Stack
                direction="column"
                gap={2}
                alignItems="center"
                justifyContent="center"
              >
                <TextField
                  id="name"
                  name="name"
                  label="Tên thông số"
                  fullWidth
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  id="label"
                  name="label"
                  label="Mã thông số"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={touched.label && Boolean(errors.label)}
                  helperText={touched.label && errors.label}
                />

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
                  minRows={3}
                  maxRows={4}
                />
              </Stack>

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
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
};
