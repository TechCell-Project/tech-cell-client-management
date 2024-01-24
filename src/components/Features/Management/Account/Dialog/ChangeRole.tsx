import React, { memo } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import { Form, Formik, FormikHelpers } from 'formik';
import { useAppDispatch } from '@store/store';
import { changeRoleAccount } from '@store/slices/accountSlice';
import { getRole } from '@utils/index';
import { ROLE_OPTIONS } from '@constants/options';
import { roleValidate } from '@validate/account.validate';
import { ButtonCustom, SelectInputCustom, ShowDialog } from '@components/Common';
import { toast } from 'react-toastify';
import { UserAccount } from '@models/Account';
import { DialogAction, TOptions } from '@interface/common';

export const ChangeRole = memo((props: DialogAction & { dataAccount: UserAccount }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: { role: string },
    { resetForm }: FormikHelpers<{ role: string }>,
  ) => {
    try {
      const response = await dispatch(
        changeRoleAccount(String(props.dataAccount?._id), values.role),
      );
      if (response.statusCode === 400 || response.statusCode === 403) {
        toast.error('Có lỗi xảy ra. Đổi vai trò thất bại!');
      } else {
        toast.success('Đổi vai trò thành công!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Đổi vai trò thất bại!');
      console.log(error);
    } finally {
      resetForm({ values: { role: '' } });
      props.handleClose();
    }
  };

  return (
    <ShowDialog
      dialogTitle='Thay đổi vai trò'
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 390 }}
    >
      <Formik
        initialValues={{ role: '' }}
        validationSchema={roleValidate}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form
            style={{
              width: '100%',
              marginTop: '10px',
            }}
          >
            <>
              <Stack
                direction='column'
                gap={2}
                alignItems='center'
                justifyContent='center'
              >
                <TextField
                  label='Họ và tên'
                  value={`${props.dataAccount?.firstName} ${props.dataAccount?.lastName}`}
                  fullWidth
                  variant='outlined'
                  size='small'
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label='Vai trò hiện tại'
                  value={getRole(props.dataAccount?.role) ?? ''}
                  fullWidth
                  variant='outlined'
                  size='small'
                  inputProps={{ readOnly: true }}
                />

                <SouthRoundedIcon fontSize='medium' />

                <SelectInputCustom<string, TOptions>
                  name='role'
                  label='Vai trò mới'
                  options={ROLE_OPTIONS}
                />
              </Stack>
              <Stack
                direction='row'
                justifyContent='flex-end'
                gap={2}
                sx={{ mt: 4 }}
              >
                <ButtonCustom
                  variant='outlined'
                  handleClick={props.handleClose}
                  content='Hủy bỏ'
                />
                <ButtonCustom
                  variant='contained'
                  type='submit'
                  disabled={isSubmitting}
                  content='Xác nhận'
                />
              </Stack>
            </>
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
});
