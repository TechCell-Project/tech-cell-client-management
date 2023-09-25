import React, { memo } from "react";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "@store/store";
import { changeRoleAccount } from "@store/slices/accountSlice";
import { getRole } from "@utils/index";
import { ROLE_OPTIONS } from "@constants/options";
import { roleValidate } from "@validate/account.validate";
import { ButtonCustom, ShowDialog } from "@components/Common";
import { IColumnAccount } from "@interface/data";
import { enqueueSnackbar } from "notistack";

interface Props {
  dataAccount?: IColumnAccount;
  isLoading?: boolean;
  isOpen: boolean;
  handleClose: () => void;
}

export const ChangeRole = memo((props: Props) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: { role: string },
    { resetForm }: FormikHelpers<{ role: string }>
  ) => {
    try {
      const response = await dispatch(
        changeRoleAccount(String(props.dataAccount?.id), values.role)
      );
      if (response.statusCode === 400 || response.statusCode === 403) {
        enqueueSnackbar("Có lỗi xảy ra. Đổi vai trò thất bại!", { variant: "error" });
      } else {
        enqueueSnackbar("Đổi vai trò thành công!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra. Đổi vai trò thất bại!", { variant: "error" });
      console.log(error);
    } finally {
      resetForm({ values: { role: "" } });
      props.handleClose();
    }
  };

  return (
    <ShowDialog
      dialogTitle="Thay đổi vai trò"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 370 }}
    >
      <Formik
        initialValues={{ role: "" }}
        validationSchema={roleValidate}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          >
            <>
              <Stack
                direction="column"
                gap={2}
                alignItems="center"
                justifyContent="center"
              >
                <TextField
                  label="Họ và tên"
                  value={props.dataAccount?.name}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Vai trò hiện tại"
                  value={props.dataAccount?.role || ""}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                />

                <SouthRoundedIcon fontSize="medium" />

                <TextField
                  id="role"
                  name="role"
                  value={values.role}
                  select
                  label="Vai trò mới"
                  onChange={handleChange}
                  defaultValue=""
                  variant="outlined"
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                  size="small"
                  fullWidth
                >
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      disabled={
                        props.dataAccount?.role === getRole(option.value)
                      }
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-end"
                gap={2}
                sx={{ mt: 4 }}
              >
                <ButtonCustom
                  variant="outlined"
                  handleClick={props.handleClose}
                  content="Hủy bỏ"
                />
                <ButtonCustom
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  content="Xác nhận"
                />
              </Stack>
            </>
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
});
