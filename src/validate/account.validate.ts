import * as Yup from "yup";

export const roleValidate = Yup.object({
  role: Yup.string().required("Hãy chọn vai trò!"),
});
