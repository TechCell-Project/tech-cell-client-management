import React, { memo, useState, useEffect } from "react";
import { IChangeRoleDialog } from "@interface/common";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
  Stack,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  changeRoleAccount,
  getDetailsUserAccount,
} from "@store/slices/accountSlice";
import { getRole } from "@utils/index";
import { ROLE_OPTIONS } from "@constants/options";
import { roleValidate } from "@validate/account.validate";

export const ChangeRole = memo((props: IChangeRoleDialog) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { account, isLoadingDetails } = useAppSelector(
    (state) => state.account
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      dispatch(getDetailsUserAccount(props.id));
    }
  }, [open, props.id, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (
    values: { role: string },
    { resetForm }: FormikHelpers<{ role: string }>
  ) => {
    try {
      const response = await dispatch(changeRoleAccount(props.id, values.role));
      if (response) {
        props.setAlert({
          type: "success",
          message: "Đổi vai trò thành công",
          timeout: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetForm({ values: { role: "" } });
      handleClose();
    }
  };

  return (
    <>
      <Tooltip title={props.tooltip}>
        <IconButton
          aria-label="change-role"
          size="medium"
          onClick={handleClickOpen}
        >
          {props.icon}
        </IconButton>
      </Tooltip>
      <Dialog
        keepMounted
        onClose={handleClose}
        open={open}
        sx={{ "& .MuiPaper-root.MuiDialog-paper": { minWidth: 370 } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
          <Typography variant="body1" fontWeight={600} fontSize="17px">
            {props.dialogTitle}
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ padding: "0 24px 16px 24px", gap: "10px" }}>
          <Formik
            initialValues={{ role: "" }}
            validationSchema={roleValidate}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              errors,
              touched,
              isSubmitting,
              resetForm,
            }) => (
              <Form
                style={{
                  width: "100%",
                  marginTop: "10px",
                  textAlign: isLoadingDetails ? "center" : "left",
                }}
              >
                {isLoadingDetails ? (
                  <CircularProgress sx={{ color: theme.color.red }} />
                ) : (
                  <>
                    <Stack
                      direction="column"
                      gap={2}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <TextField
                        label="Họ và tên"
                        value={`${account?.firstName} ${account?.lastName}`}
                        fullWidth
                        variant="outlined"
                        size="small"
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        label="Vai trò hiện tại"
                        value={getRole(account?.role) || ""}
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
                        {ROLE_OPTIONS.map((option, i) => (
                          <MenuItem
                            key={i}
                            value={option.value}
                            disabled={account?.role === option.value}
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
                      <Button
                        onClick={() => {
                          setOpen(false);
                          resetForm();
                        }}
                        sx={{ textTransform: "unset" }}
                      >
                        Hủy bỏ
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        sx={{
                          bgcolor: `${theme.color.red} !important`,
                          color: "#fff !important",
                          textTransform: "unset",
                          padding: "6px 20px",
                        }}
                      >
                        Xác nhận
                      </Button>
                    </Stack>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
    </>
  );
});
