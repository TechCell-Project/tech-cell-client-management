import * as Yup from 'yup';

export const requestProductValidate = Yup.object({
  name: Yup.string().required('Vui lòng nhập tên!'),
  category: Yup.object().required('Vui lòng nhập mô thể loại!'),
  generalAttributes: Yup.array().of(Yup.object().shape({
    k: Yup.string().required('Vui lòng nhập thuộc tính!'),
    v: Yup.string().required('Vui lòng nhập giá trị!'),
  })),
  variations: Yup.array().of(
    Yup.object().shape({
      attributes: Yup.array().of(
        Yup.object().shape({
          k: Yup.string().required('Vui lòng nhập thuộc tính!'),
          v: Yup.string().required('Vui lòng nhập giá trị!'),
        }),
      ),
      stock: Yup.number().required('Vui lòng nhập số lượng!'),
      price: Yup.object().shape({
        base: Yup.string().required('Vui lòng nhập giá gốc!'),
        special: Yup.string().required('Vui lòng nhập giá khuyến mãi!'),
      }),
    }),
  ),
});
