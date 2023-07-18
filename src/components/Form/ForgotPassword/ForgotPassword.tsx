import React, { memo, useState, useEffect } from "react";
import {
  ButtonCustom,
  ShowDialog,
  SnackbarMessage,
  showSnack,
} from "@components/Common";
import { ForgotPasswordModel } from "@models/Auth";
import { Stack, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { forgotPasswordValidate } from "@validate/auth.validate";
import { ISnackbarAlert } from "@interface/common";
import {
  fetchForgotPassword,
  fetchVerifyForgotPassword,
} from "@services/authServices";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const ForgotPassword = memo((props: Props) => {
  const [countdown, setCountdown] = useState<number>(5 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [alert, setAlert] = useState<ISnackbarAlert>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (!isActive && countdown !== 0) {
      clearInterval(interval);
    }

    if (countdown === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, countdown]);

  const formatTime = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const sendCode = (email: string) => {
    setIsLoading(true);
    fetchForgotPassword(email)
      .then(() => {
        if (isActive) {
          setCountdown(5 * 60);
        } else {
          setIsActive(true);
        }
        setAlert({
          message: `Đã gửi mã OTP dến ${email}`,
          type: "info",
        });
      })
      .catch(() =>
        setAlert({
          message: `Có lỗi xảy ra, Gửi mã thất bại!`,
          type: "error",
        })
      )
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = (
    values: ForgotPasswordModel,
    { resetForm, setSubmitting }: FormikHelpers<ForgotPasswordModel>
  ) => {
    fetchVerifyForgotPassword(values)
      .then(() =>
        setAlert({
          message: "Đổi mật khẩu thành công!",
          type: "success",
          timeout: 4000,
        })
      )
      .catch(() =>
        setAlert({
          message: "Đổi mật khẩu thất bại!",
          type: "error",
          timeout: 4000,
        })
      )
      .finally(() => {
        setTimeout(() => {
          resetForm();
          props.handleClose();
          setSubmitting(false);
          setIsLoading(false);
        }, 2000);
      });
  };

  return (
    <>
      <ShowDialog
        dialogTitle="Quên mật khẩu"
        handleClose={props.handleClose}
        isOpen={props.isOpen}
        dialogStyle={{ minWidth: 450 }}
      >
        {alert && !isLoading && <SnackbarMessage {...alert} />}
        <Formik
          enableReinitialize
          initialValues={new ForgotPasswordModel()}
          validationSchema={forgotPasswordValidate}
          onSubmit={handleSubmit}
        >
          {({ handleChange, errors, touched, isSubmitting, values }) => (
            <Form style={{ width: "100%" }}>
              <Stack direction="column" gap={2}>
                <Stack direction="row" gap={2} alignItems="baseline">
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                  <ButtonCustom
                    content="Gửi OTP"
                    variant="text"
                    handleClick={() => {
                      if (values.email) {
                        sendCode(values.email);
                      }
                    }}
                    disabled={!values.email}
                    styles={{ fontSize: "12px" }}
                  />
                </Stack>

                <TextField
                  id="otpCode"
                  name="otpCode"
                  label="Mã OTP"
                  error={touched.otpCode && Boolean(errors.otpCode)}
                  helperText={touched.otpCode && errors.otpCode}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                />

                <TextField
                  id="password"
                  name="password"
                  label="Mật khẩu mới"
                  type="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                />

                <TextField
                  id="re_password"
                  name="re_password"
                  label="Nhập lại mật khảu"
                  type="password"
                  error={touched.re_password && Boolean(errors.re_password)}
                  helperText={touched.re_password && errors.re_password}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                />

                {isActive && (
                  <Typography
                    variant="body2"
                    fontSize="14px"
                    textAlign="center"
                  >
                    Mã OTP còn hiệu lực trong vòng:{" "}
                    <b>{formatTime(countdown)}</b>
                  </Typography>
                )}

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  gap={1}
                  sx={{ mt: 1 }}
                >
                  <ButtonCustom
                    content="Hủy bỏ"
                    variant="outlined"
                    handleClick={props.handleClose}
                  />
                  <ButtonCustom
                    content="Xác nhận"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </ShowDialog>
    </>
  );
});
