import React, { memo } from 'react';
import { ButtonCustom, PasswordCustom, ShowDialog, TextFieldCustom } from '@components/Common';
import { Form, Formik, FormikHelpers } from 'formik';
import { AccountChangePass } from '@models/Auth';
import Stack from '@mui/material/Stack';
import { postChangePass } from '@services/authServices';
import { toast } from 'react-toastify';
import { changePassValidate } from '@validate/account.validate';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const ChangePassword = memo(({ isOpen, handleClose }: Props) => {
  const handleSubmit = (values: AccountChangePass, { setSubmitting }: FormikHelpers<AccountChangePass>) => {
    postChangePass(values)
      .then(() => {
        toast.success('Đổi mật khẩu thành công!');
        handleClose();
      })
      .catch(() => toast.error('Đổi mật khẩu thất bại!'))
      .finally(() => setSubmitting(false));
  };

  return (
    <ShowDialog dialogTitle='Đổi mật khẩu' isOpen={isOpen} handleClose={handleClose}
                dialogStyle={{ minWidth: { xs: 320, md: 450 } }}>
      <Formik enableReinitialize initialValues={new AccountChangePass()} onSubmit={handleSubmit}
              validationSchema={changePassValidate}>
        {({ isSubmitting, handleChange, touched, errors }) => {
          return <Form style={{ width: '100%' }}>
            <Stack direction='column' gap={2}>
              <PasswordCustom name='oldPassword' content='Mật khẩu cũ' onChange={handleChange}
                              error={touched.oldPassword && Boolean(errors.oldPassword)}
                              helperText={errors.oldPassword}
                              conditionHelper={Boolean(touched.oldPassword && errors.oldPassword)} />

              <PasswordCustom name='newPassword' content='Mật khẩu mới' onChange={handleChange}
                              error={touched.newPassword && Boolean(errors.newPassword)}
                              helperText={errors.newPassword}
                              conditionHelper={Boolean(touched.newPassword && errors.newPassword)} />

              <PasswordCustom name='reNewPassword' content='Nhập lại mật khẩu' onChange={handleChange}
                              error={touched.reNewPassword && Boolean(errors.reNewPassword)}
                              helperText={errors.reNewPassword}
                              conditionHelper={Boolean(touched.reNewPassword && errors.reNewPassword)} />

              <Stack direction='row' justifyContent='flex-end' gap={1} sx={{ mt: 1 }}>
                <ButtonCustom
                  content='Hủy bỏ'
                  variant='outlined'
                  handleClick={handleClose}
                />
                <ButtonCustom
                  content='Lưu'
                  variant='contained'
                  type='submit'
                  disabled={isSubmitting}
                />
              </Stack>
            </Stack>
          </Form>;
        }}
      </Formik>
    </ShowDialog>);
});