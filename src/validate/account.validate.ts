import * as Yup from 'yup';

export const roleValidate = Yup.object({
  role: Yup.string().required('Hãy chọn vai trò!'),
});

export const changePassValidate = Yup.object({
  oldPassword: Yup.string()
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
    .required('Mật khẩu cũ không được bỏ trống!'),
  newPassword: Yup.string()
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
    .required('Mật khẩu mới không được bỏ trống!'),
  reNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Không trùng khớp với mật khẩu mới!')
    .required('Mật khẩu nhập lại không được bỏ trống !'),
});
