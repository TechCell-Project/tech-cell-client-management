import React, { memo } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { RegisterModel } from '@models/Auth';
import { registerValidate } from '@validate/auth.validate';
import Stack from '@mui/material/Stack';
import { ShowDialog, ButtonCustom } from '@components/Common';
import RegisterForm from './RegisterForm';
import { useAppDispatch } from '@store/store';
import { createNewAccount, getAllUserAccount } from '@store/slices/accountSlice';
import { Paging } from '@models/Common';
import { toast } from 'react-toastify';
import { DialogAction } from '@interface/common';

export const Register = memo((props: DialogAction) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (
    values: RegisterModel,
    { resetForm, setSubmitting }: FormikHelpers<RegisterModel>,
  ) => {
    dispatch(createNewAccount(values))
      .then(() => {
        toast.success('Thêm mới tài khoản thành công!');
        resetForm();
        props.handleClose();
        dispatch(getAllUserAccount(new Paging())).then();
      })
      .catch(() => toast('Thêm mới tài khoản thất bại!'))
      .finally(() => setSubmitting(false));
  };

  return (
    <ShowDialog
      dialogTitle="Thêm mới tài khoản"
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      dialogStyle={{ minWidth: { sm: 380, md: 520 } }}
    >
      <Formik
        enableReinitialize
        initialValues={new RegisterModel()}
        validationSchema={registerValidate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack direction="column" gap={2}>
              <RegisterForm />
              <Stack direction="row" gap={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                <ButtonCustom variant="outlined" content="Hủy bỏ" handleClick={props.handleClose} />
                <ButtonCustom
                  variant="contained"
                  content="Đăng ký"
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
