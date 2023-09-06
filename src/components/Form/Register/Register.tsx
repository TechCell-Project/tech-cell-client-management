import React, { memo, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { RegisterModel } from "@models/Auth";
import { registerValidate } from "@validate/auth.validate";
import { Stack } from "@mui/material";
import { ShowDialog, ButtonCustom } from "@components/Common";
import RegisterForm from "./RegisterForm";
import { useAppDispatch } from "@store/store";
import {
  createNewAccount,
  getAllUserAccount,
} from "@store/slices/accountSlice";
import { enqueueSnackbar } from "notistack";
import { Paging } from "@models/Common";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const Register = memo((props: Props) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (
    values: RegisterModel,
    { resetForm, setSubmitting }: FormikHelpers<RegisterModel>
  ) => {
    dispatch(createNewAccount(values))
      .then(() => {
        enqueueSnackbar("Thêm mới tài khoản thành công!", {
          variant: "success",
        });
        resetForm();
        props.handleClose();
        dispatch(getAllUserAccount(new Paging()));
      })
      .catch(() =>
        enqueueSnackbar("Thêm mới tài khoản thất bại!", { variant: "error" })
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <ShowDialog
      dialogTitle="Thêm mới tài khoản"
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      dialogStyle={{ minWidth: { sm: 380, md: 520 } }}
    >
      <Formik
        enableReinitialize
        initialValues={new RegisterModel()}
        validationSchema={registerValidate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack direction="column" gap={2}>
              <RegisterForm />
              <Stack
                direction="row"
                gap={1}
                justifyContent="flex-end"
                sx={{ mt: 2 }}
              >
                <ButtonCustom
                  variant="outlined"
                  content="Hủy bỏ"
                  handleClick={props.handleClose}
                />
                <ButtonCustom
                  variant="contained"
                  content="Đăng ký"
                  type="submit"
                  disabled={isSubmitting}
                />
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
});
