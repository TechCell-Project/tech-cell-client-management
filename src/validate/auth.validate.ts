import * as Yup from 'yup';

export const loginValidate = Yup.object({
  emailOrUsername: Yup.string().required('Bạn hãy nhập email!'),
    password: Yup.string()
        .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
        .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
        .required('Bạn hãy nhập mật khẩu!'),
});
