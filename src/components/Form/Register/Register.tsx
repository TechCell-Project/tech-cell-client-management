import React, { memo, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { RegisterModel } from "@models/Auth";
import { registerValidate } from "@validate/auth.validate";
import { Stack } from "@mui/material";
import { ShowDialog, ButtonCustom, SnackbarMessage } from "@components/Common";
import RegisterForm from "./RegisterForm";
import { ISnackbarAlert } from "@interface/common";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  createNewAccount,
  getAllUserAccount,
} from "@store/slices/accountSlice";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const Register = memo((props: Props) => {
  const [alert, setAlert] = useState<ISnackbarAlert>();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.account);

  const handleSubmit = (
    values: RegisterModel,
    { resetForm, setSubmitting }: FormikHelpers<RegisterModel>
  ) => {
    dispatch(createNewAccount(values))
      .then(() => {
        setAlert({
          message: "Thêm mới tài khoản thành công!",
          type: "success",
        });
        setTimeout(() => {
          resetForm();
          props.handleClose();
        }, 2000);
        dispatch(getAllUserAccount());
      })
      .catch(() =>
        setAlert({
          message: "Thêm mới tài khoản thất bại!",
          type: "error",
        })
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
      {alert && !isLoading && <SnackbarMessage {...alert} />}
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
