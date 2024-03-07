import React, { memo, useState } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import { RegisterModel } from '@models/Auth';
import { useFormikContext } from 'formik';
import { ROLE_OPTIONS } from '@constants/options';
import { SelectInputCustom, TextFieldCustom } from '@components/Common';
import { TOptions } from '@interface/common';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { touched, handleChange, errors } = useFormikContext<RegisterModel>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextFieldCustom name='userName' label='Tên tài khoản' />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant='outlined' size='small'>
          <InputLabel htmlFor='password' error={touched.password && Boolean(errors.password)}>
            Mật khẩu
          </InputLabel>
          <OutlinedInput
            size='small'
            id='password'
            type={showPassword ? 'text' : 'password'}
            error={touched.password && Boolean(errors.password)}
            name='password'
            label='Mật khẩu'
            onChange={handleChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge='end'
                  size='small'
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
      </Grid>
      <Grid item xs={12} md={6}>
        <SelectInputCustom<string, TOptions>
          name='role'
          label='Vai trò'
          options={ROLE_OPTIONS}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextFieldCustom
          name='email'
          label='Email'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextFieldCustom
          name='firstName'
          label='Tên'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextFieldCustom
          name='lastName'
          label='Họ'
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Stack direction='row' gap={1} justifyContent='flex-start' alignItems='center'>
          <PriorityHighRoundedIcon fontSize='small' />
          <Typography variant='body1' fontWeight={600} fontSize={13}>
            Chỉ có quản lý mới có quyền cấp tài khoản cho người dùng.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default memo(RegisterForm);
