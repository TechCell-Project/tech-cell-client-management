'use client';

import React, { useState, memo } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { Formik, Form, FormikHelpers } from 'formik';
import { LoginModel } from 'models/Auth';
import { loginValidate } from '@validate/auth.validate';
import { ButtonCustom } from '@components/Common';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import { useAppDispatch } from '@store/store';
import { login } from '@store/slices/authSlice';
import { VerifyForm } from '@components/Features';
import { EMAIL_TEST, PASSWORD_TEST } from '@constants/data';

export const LoginForm = memo(() => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false);
  const [isOpenVerify, setIsOpenVerify] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: LoginModel,
    { resetForm, setSubmitting }: FormikHelpers<LoginModel>,
  ) => {
    try {
      const response = await dispatch(login(values));
      if (response?.isNotVerify) {
        setIsOpenVerify(true);
      }
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={
          new LoginModel({
            emailOrUsername: EMAIL_TEST,
            password: PASSWORD_TEST,
          })
        }
        validationSchema={loginValidate}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange, errors, touched }) => (
          <Form>
            <Stack direction="column">
              <TextField
                label="Tên tài khoản hoặc email"
                name="emailOrUsername"
                value={values.emailOrUsername ?? ''}
                error={touched.emailOrUsername && Boolean(errors.emailOrUsername)}
                helperText={touched.emailOrUsername && errors.emailOrUsername}
                fullWidth
                onChange={handleChange}
                variant="standard"
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AttachEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="password" error={touched.password && Boolean(errors.password)}>
                  Mật khẩu
                </InputLabel>
                <Input
                  name="password"
                  value={values.password || ''}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && (
                  <FormHelperText error={touched.password && Boolean(errors.password)}>
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <Typography
                variant="body2"
                textAlign="right"
                fontWeight={500}
                sx={{ pt: 2, cursor: 'pointer' }}
                onClick={() => setOpenForgotPassword(true)}
              >
                Quên mật khẩu?
              </Typography>

              <ButtonCustom
                variant="contained"
                fullWidth
                type="submit"
                content="Đăng Nhập"
                disabled={isSubmitting}
                size="large"
                styles={{
                  marginTop: '20px',
                  fontWeight: 600,
                  padding: '8px 20px !important',
                }}
              />
            </Stack>
          </Form>
        )}
      </Formik>

      {openForgotPassword && (
        <ForgotPassword
          isOpen={openForgotPassword}
          handleClose={() => setOpenForgotPassword(false)}
        />
      )}

      {isOpenVerify && (
        <VerifyForm isOpen={isOpenVerify} handleClose={() => setIsOpenVerify(false)} />
      )}
    </>
  );
});
