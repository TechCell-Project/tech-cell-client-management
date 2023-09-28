import React, { memo, useEffect, useState } from 'react';
import { ButtonCustom, ShowDialog, TextFieldCustom } from '@components/Common';
import { Form, Formik } from 'formik';
import { sendOtpVerify, verifyEmail } from '@services/authServices';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { formatTimeCountdown } from '@utils/funcs';
import { verifyEmailValidate } from '@validate/auth.validate';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const VerifyForm = memo(({ isOpen, handleClose }: Props) => {
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
    sendOtpVerify(email)
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

  return (
    <ShowDialog dialogTitle='Xác thực email' isOpen={isOpen} handleClose={handleClose}
      dialogStyle={{ minWidth: { xs: 350, md: 480 } }}>
      <Formik
        enableReinitialize
        initialValues={{ email: '', otpCode: '' }}
        onSubmit={(values, { setSubmitting }) => {
          verifyEmail(values.email, values.otpCode)
            .then(() => {
              toast.success('Xác thực email thành công!');
              handleClose();
            })
            .catch(() => toast.error('Xác thực email thất bại!'))
            .finally(() => setSubmitting(false));
        }}
        validationSchema={verifyEmailValidate}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form style={{ width: '100%' }}>
              <Stack direction='column' gap={2}>
                <Stack direction='row' gap={2} alignItems='baseline'>
                  <TextFieldCustom name='email' label='Email' />
                  <ButtonCustom
                    content='Gửi OTP'
                    variant='text'
                    handleClick={() => {
                      if (values.email) {
                        sendCode(values.email);
                      }
                    }}
                    disabled={!values.email}
                    styles={{ fontSize: '12px' }}
                  />
                </Stack>
                <TextFieldCustom name='otpCode' label='OTP' />

                {isActive && (
                  <Typography variant='body2' fontSize='14px' textAlign='center'>
                    Mã OTP còn hiệu lực trong vòng: <b>{formatTimeCountdown(countdown)}</b>
                  </Typography>
                )}

                <Stack direction='row' justifyContent='flex-end' gap={1} sx={{ mt: 1 }}>
                  <ButtonCustom
                    content='Hủy bỏ'
                    variant='outlined'
                    handleClick={handleClose}
                  />
                  <ButtonCustom
                    content='Xác nhận'
                    variant='contained'
                    type='submit'
                    disabled={isSubmitting}
                  />
                </Stack>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </ShowDialog>
  );
});

export default VerifyForm;