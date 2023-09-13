import * as Yup from "yup";

export const requestProductValidate = Yup.object({
  productData: Yup.object({
    name: Yup.string().required("Vui lòng nhập tên!"),
    description: Yup.string().required("Vui lòng nhập mô tả!"),
    categories: Yup.array().min(1, "Vui lòng chọn 1 thể loại").max(1, "Chỉ chọn 1 thể loại"),
    status: Yup.number().required("Vui lòng chọn trạng thái"),
    variations: Yup.array().of(
      Yup.object().shape({
        attributes: Yup.array().of(
          Yup.object().shape({
            k: Yup.string().required("Vui lòng nhập thuộc tính!"),
            v: Yup.string().required("Vui lòng nhập giá trị!"),
          })
        ),
        stock: Yup.number().required("Vui lòng nhập số lượng!"),
        price: Yup.object().shape({
          base: Yup.number().required("Vui lòng nhập giá gốc!"),
          sale: Yup.number().required("Vui lòng nhập đơn giá!"),
          special: Yup.number().required("Vui lòng nhập giá khuyến mãi!"),
        }),
      })
    ),
  }),
});
