import * as Yup from 'yup';

export const profileAddressValidate = Yup.object({
  // address: Yup.object().shape({
  addressName: Yup.string().required('Vui lòng nhập địa chỉ!'),
  customerName: Yup.string().required('Vui lòng nhập tên khách hàng!'),
  phoneNumbers: Yup.string()
    .min(10, 'Số điện thoại phải đủ 10 số!')
    .max(10, 'Số điện thoại phải đủ 10 số!')
    .required('Vui lòng nhập số điện thoại!'),
  provinceLevel: Yup.object().required('Vui lòng chọn tỉnh / thành!'),
  districtLevel: Yup.object().required('Vui lòng chọn quận / huyện!'),
  wardLevel: Yup.object().required('Vui lòng chọn xã / phường!'),
  detail: Yup.string().required('Vui lòng nhập địa chỉ cụ thể!'),
  // }),
});

export const profileInfoValidate = Yup.object({
  firstName: Yup.string().required('Vui lòng nhập tên!'),
  lastName: Yup.string().required('Vui lòng nhập họ!'),
});