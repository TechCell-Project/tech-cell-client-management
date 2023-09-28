import * as Yup from 'yup';

export const loginValidate = Yup.object({
  emailOrUsername: Yup.string().required('Bạn hãy nhập email!'),
  password: Yup.string()
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
    .required('Bạn hãy nhập mật khẩu!'),
});

export const registerValidate = Yup.object({
  userName: Yup.string().min(8, 'Tên tài khoản ít nhất 8 ký tự!').required('Bạn hãy nhập tên tài khoản!'),
  password: Yup.string()
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
    .required('Bạn hãy nhập mật khẩu!'),
  role: Yup.string().required('Bạn hãy chọn vai trò!'),
});

export const forgotPasswordValidate = Yup.object({
  email: Yup.string()
    .email('Sai định dạng email!')
    .required('Email không được bỏ trống!'),
  otpCode: Yup.string()
    .matches(/^\d+$/, 'Mã OTP chỉ được chứa ký tự số!')
    .length(6, 'Mã OTP gồm 6 ký tự số!')
    .required('Mã OTP không được bỏ trống'),
  password: Yup.string()
    .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
    .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
    .required('Mật khẩu mới không được bỏ trống!'),
  re_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Không trùng khớp với mật khẩu mới!')
    .required('Mật khẩu nhập lại không được bỏ trống !'),
});

export const verifyEmailValidate = Yup.object({
  email: Yup.string()
    .email('Sai định dạng email!')
    .required('Email không được bỏ trống!'),
  otpCode: Yup.string()
    .matches(/^\d+$/, 'Mã OTP chỉ được chứa ký tự số!')
    .length(6, 'Mã OTP gồm 6 ký tự số!')
    .required('Mã OTP không được bỏ trống'),
});
