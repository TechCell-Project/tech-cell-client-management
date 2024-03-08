import * as Yup from 'yup';

export const createOrEditValidate = Yup.object({
  label: Yup.string()
    .lowercase('Vui lòng nhập ký tự thường!')
    .required('Vui lòng nhập mã thông số!'),
  name: Yup.string().required('Vui lòng nhập tên!'),
  description: Yup.string().required('Vui lòng nhập mô tả!'),
});
