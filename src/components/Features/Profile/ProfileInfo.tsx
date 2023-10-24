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
import Stack from '@mui/material/Stack';
import { ProfileAvatar } from '@components/Features/Profile/ProfileAvatar';
import { editProfileInfo, getCurrentUser } from '@store/slices/authSlice';

export const ProfileInfo = memo(({ handleClose }: { handleClose: () => void }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: UserAccount, { setSubmitting }: FormikHelpers<UserAccount>) => {
    const valueChanged: Partial<UserAccount> = {};
    for (const key in values) {
      if ((values as any)[key] !== (user as any)[key]) {
        (valueChanged as any)[key] = (values as any)[key];
      }
    }

    dispatch(editProfileInfo(valueChanged))
      .then(() => dispatch(getCurrentUser()))
      .finally(() => {
        setSubmitting(false);
        handleClose();
      });
  };

  return (
    <Formik
      initialValues={{ ...user as UserAccount }}
      onSubmit={handleSubmit}>
      {({ values, dirty, isSubmitting }) => {
        return (
          <Form>
            <Stack flexDirection='row' alignItems='flex-start' gap={5}>
              <ProfileAvatar />
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
                  <TextFieldCustom name='a' label='Trạng thái' readOnly
                    defaultValue={values?.block && values?.block.isBlocked ? 'Bị chặn' : 'Hoạt động'} />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='b' label='Ngày tạo' readOnly
                    defaultValue={formatDateViVN(String(values?.createdAt))} />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='c' label='Ngày cập nhật' readOnly
                    defaultValue={formatDateViVN(String(values?.updatedAt))} />
                </Grid>
                <Grid item md={4}>
                  <TextFieldCustom name='d' label='Vai trò' readOnly defaultValue={getRole(values.role)} />
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