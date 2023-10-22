import React, { memo } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useAppDispatch, useAppSelector } from '@store/store';
import { UserAccount } from '@models/Account';
import Grid from '@mui/material/Grid';
import { ButtonCustom, TextFieldCustom } from '@components/Common';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TextField from '@mui/material/TextField';
import { formatDateViVN, getRole } from '@utils/funcs';
import { ProfileInfoRequest } from '@models/Profile';
import Stack from '@mui/material/Stack';
import { ProfileAvatar } from '@components/Features/Profile/ProfileAvatar';
import { editProfileInfo } from '@store/slices/authSlice';

export const ProfileInfo = memo(({ handleClose }: { handleClose: () => void }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: UserAccount, { setSubmitting }: FormikHelpers<UserAccount>) => {
    const payload = new ProfileInfoRequest(values);
    if (!payload.avatar) {
      payload.avatar = '';
    }

    dispatch(editProfileInfo(payload)).then().finally(() => {
      setSubmitting(false);
      handleClose();
    });
  };

  return (
    <Formik
      initialValues={{
        ...user as UserAccount,
        role: getRole(user?.role),
        block: user?.block && user?.block.isBlocked ? 'Bị chặn' : 'Hoạt động',
        createdAt: formatDateViVN(String(user?.createdAt)),
        updatedAt: formatDateViVN(String(user?.updatedAt)),
      }}
      onSubmit={handleSubmit}>
      {({ values, dirty, isSubmitting }) => {
        return (
          <Form>
            <Stack flexDirection='row' alignItems='flex-start' gap={5}>
              <ProfileAvatar initAvatar={values.avatar} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p style={{ fontSize: '13px', fontWeight: 600 }}>1. Thông tin mặc định</p>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label='Email'
                    value={values?.email}
                    fullWidth
                    variant='outlined'
                    size='small'
                    InputProps={{
                      readOnly: true,
                      endAdornment: values?.emailVerified && (
                        <InputAdornment position='end'>
                          <CheckCircleRoundedIcon fontSize='small' color='primary' />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextFieldCustom name='_id' label='ID' readOnly />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='block' label='Trạng thái' readOnly />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='createdAt' label='Ngày tạo' readOnly />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='updatedAt' label='Ngày cập nhật' readOnly />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='role' label='Vai trò' readOnly />
                </Grid>
                <Grid item xs={12} mt={1}>
                  <p style={{ fontSize: '13px', fontWeight: 600 }}>2. Thông tin chỉnh sửa</p>
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='lastName' label='Họ' />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='firstName' label='Tên' />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='userName' label='Tên người dùng' />
                </Grid>
              </Grid>
            </Stack>

            <Stack direction='row' justifyContent='flex-end' gap={1} mt={4}>
              <ButtonCustom
                content='Hủy bỏ'
                variant='outlined'
                handleClick={handleClose}
              />
              <ButtonCustom
                content='Lưu thông tin'
                variant='contained'
                type='submit'
                disabled={!dirty || isSubmitting}
              />
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
});