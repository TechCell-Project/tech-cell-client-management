import React, { memo, useState, useEffect } from 'react';
import { ButtonCustom, ShowDialog } from '@components/Common';
import { ForgotPasswordModel } from '@models/Auth';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Form, Formik, FormikHelpers } from 'formik';
import { forgotPasswordValidate } from '@validate/auth.validate';
import { fetchForgotPassword, fetchVerifyForgotPassword } from '@services/authServices';
import { ForgotForm } from './ForgotForm';
import { formatTimeCountdown } from '@utils/funcs';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const ForgotPassword = memo((props: Props) => {
  const [countdown, setCountdown] = useState<number>(5 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);

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

  const sendCode = (email: string) => {
    fetchForgotPassword(email)
      .then(() => {
        if (isActive) {
          setCountdown(5 * 60);
        } else {
          setIsActive(true);
        }
        toast.success('Mã OTP đã được gửi!');
      })
      .catch(() => toast.error('Gửi mã OTP thát bại!'));
  };

  const handleSubmit = (
    values: ForgotPasswordModel,
    { resetForm, setSubmitting }: FormikHelpers<ForgotPasswordModel>,
  ) => {
    fetchVerifyForgotPassword(values)
      .then(() => {
        toast.success('Đổi mật khẩu thành công!');
        resetForm();
        props.handleClose();
      })
      .catch(() => toast.error('Đổi mật khẩu thất bại'))
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <ShowDialog
      dialogTitle="Quên mật khẩu"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: { xs: 320, md: 450 } }}
    >
      <Formik
        enableReinitialize
        initialValues={new ForgotPasswordModel()}
        validationSchema={forgotPasswordValidate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '100%' }}>
            <Stack direction="column" gap={2}>
              <ForgotForm sendCode={sendCode} />

              {isActive && (
                <Typography variant="body2" fontSize="14px" textAlign="center">
                  Mã OTP còn hiệu lực trong vòng: <b>{formatTimeCountdown(countdown)}</b>
                </Typography>
              )}

              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 1 }}>
                <ButtonCustom content="Hủy bỏ" variant="outlined" handleClick={props.handleClose} />
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
  );
});
