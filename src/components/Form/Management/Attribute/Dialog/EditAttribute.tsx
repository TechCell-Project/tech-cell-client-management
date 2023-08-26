import { ButtonCustom, ShowDialog } from "@components/Common";
import { AttributeModel, CreateAttributeModel } from "@models/Attribute";
import { CircularProgress, Stack, TextField, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/store";
import { createOrEditValidate } from "@validate/attribute.validate";
import { Form, Formik, FormikHelpers } from "formik";
import { editAttribute } from "@store/slices/attributeSlice";
import React from "react";
import { enqueueSnackbar } from "notistack";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const EditAttribute = (props: Props) => {
  const { attribute, isLoadingDetail } = useAppSelector(
    (state) => state.attribute
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleSubmit = async (
    values: AttributeModel,
    { setSubmitting }: FormikHelpers<AttributeModel>
  ) => {
    try {
      const { name, label, description, _id } = values;

      const payload = new CreateAttributeModel();
      payload.name = name;
      payload.label = label;
      payload.description = description;

      await dispatch(editAttribute(payload, String(_id)));
      enqueueSnackbar("Sửa thông số thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra. Chỉnh sửa thất bại!", {
        variant: "error",
      });
    } finally {
      props.handleClose();
      setSubmitting(false);
    }
  };

  return (
    <ShowDialog
      dialogTitle="Chỉnh sửa thông số"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 420 }}
    >
      <Formik
        enableReinitialize
        initialValues={{ ...attribute }}
        validationSchema={createOrEditValidate}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched, isSubmitting, dirty }) => (
          <Form
            style={{
              width: "100%",
              marginTop: "10px",
              textAlign: isLoadingDetail ? "center" : "left",
            }}
          >
            {isLoadingDetail ? (
              <CircularProgress sx={{ color: theme.color.red }} />
            ) : (
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
                    value={values.name}
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
                    value={values.label}
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
                    value={values.description}
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
                    disabled={isSubmitting || !dirty}
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
