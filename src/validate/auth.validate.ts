import * as Yup from 'yup';

export const loginValidate = Yup.object({
    email: Yup.string().email('Email không hợp lệ!').required('Bạn hãy nhập email!'),
    password: Yup.string()
        .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
        .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
        .required('Bạn hãy nhập mật khẩu!'),
});
