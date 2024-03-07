import React, { memo } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useAppDispatch, useAppSelector } from '@store/store';
import { UserAccount } from '@models/Account';
import Grid from '@mui/material/Grid';
import { ButtonCustom, TextFieldCustom, TextViewCustom } from '@components/Common';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { formatDateViVN, getRole } from '@utils/funcs';
import Stack from '@mui/material/Stack';
import { ProfileAvatar } from '@components/Features/Profile/ProfileAvatar';
import { editProfileInfo, getCurrentUser } from '@store/slices/authSlice';
import { postImage } from '@services/imageService';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { profileInfoValidate } from '@validate/profile.validate';

export const ProfileInfo = memo(({ handleClose }: { handleClose: () => void }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: UserAccount, { setSubmitting }: FormikHelpers<UserAccount>) => {
    const valueChanged: Partial<UserAccount> = {};
    for (const key in values) {
      if ((values as any)[key] !== (user as any)[key]) {
        (valueChanged as any)[key] = (values as any)[key];
      }
    }

    try {
      if (valueChanged.avatar) {
        const formData = new FormData();
        formData.append('image', valueChanged.avatar as Blob);

        const { data, status } = await postImage(formData);
        if (status === HttpStatusCode.Created) {
          valueChanged.avatarPublicId = data.publicId;
          delete valueChanged.avatar;
        }
      }
      dispatch(editProfileInfo(valueChanged))
        .then(() => dispatch(getCurrentUser()))
        .finally(() => {
          setSubmitting(false);
          handleClose();
        });
    } catch {
      toast.error('Cập nhật thông tin hồ sơ thất bại!');
    }
  };

  return (
    <Formik
      initialValues={{ ...user as UserAccount }}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={profileInfoValidate}
    >
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
                  <TextViewCustom
                    label='Email'
                    content={String(values.email)}
                    unit={values?.emailVerified && <CheckCircleRoundedIcon fontSize='small' color='primary' />}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextViewCustom
                    label='Id'
                    content={String(values._id)}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextViewCustom
                    label='Ngày tạo'
                    content={formatDateViVN(String(values?.createdAt))}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextViewCustom
                    label='Ngày cập nhật'
                    content={formatDateViVN(String(values?.updatedAt))}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextViewCustom
                    label='Trạng thái'
                    content={values?.block?.isBlocked ? 'Bị chặn' : 'Hoạt động'}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextViewCustom
                    label='Vai trò'
                    content={getRole(values.role)}
                  />
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