'use client';

import React, { useState, memo } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  useTheme,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { Formik, Form, FormikHelpers } from 'formik';
import { LoginModel } from 'models';
import { loginValidate } from '@validate/auth.validate';

interface IProps {
  handleSubmit: (values: LoginModel, { resetForm }: FormikHelpers<LoginModel>) => Promise<void>;
}

export const LoginForm = memo(({ handleSubmit }: IProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { color } = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={new LoginModel()}
        validationSchema={loginValidate}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Stack direction="column">
              <TextField
                label="Email"
                name="emailOrUsername"
                value={values.emailOrUsername || ''}
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
                <InputLabel
                  htmlFor="password"
                  error={touched.password && Boolean(errors.password)}
                >
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
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && (
                  <FormHelperText
                    error={touched.password && Boolean(errors.password)}
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Nhớ mật khẩu"
                sx={{ mt: 1, '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  mt: 2,
                  color: '#fff',
                  bgcolor: color.red,
                  boxShadow: 'none',
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  '&:hover': {
                    boxShadow: 'none',
                    bgcolor: color.red,
                  },
                }}
              >
                Đăng nhập
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
});
