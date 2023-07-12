import React, { memo, useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/store";
import { IDetailsDialog } from "@interface/common";
import { getDetailsUserAccount } from "@store/slices/accountSlice";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { formatDateViVN, getRole } from "@utils/index";

export const DetailsAccount = memo((props: IDetailsDialog) => {
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

  return (
    <>
      <Tooltip title={props.tooltip}>
        <IconButton
          aria-label="details-account"
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
        sx={{ "& .MuiPaper-root.MuiDialog-paper": { minWidth: 400 } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
          <Typography variant="body1" fontWeight={600} fontSize="17px">
            {props.dialogTitle}
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ padding: "0 24px 16px 24px", gap: "10px" }}>
          <Box
            sx={{
              width: "100%",
              marginTop: "10px",
              textAlign: isLoadingDetails ? "center" : "left",
            }}
          >
            {isLoadingDetails ? (
              <CircularProgress sx={{ color: theme.color.red }} />
            ) : (
              <>
                <Grid container columnSpacing={2} rowSpacing={3}>
                  <Grid item md={6}>
                    <TextField
                      label="Họ và tên"
                      value={`${account?.firstName} ${account?.lastName}`}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Vai trò"
                      value={getRole(account?.role) || ""}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Email"
                      value={account?.email}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        readOnly: true,
                        endAdornment: account?.emailVerified && (
                          <InputAdornment position="end">
                            <CheckCircleRoundedIcon fontSize="small" color="primary"/>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Trạng thái tài khoản"
                      value={
                        account?.block && account?.block.isBlocked
                          ? "Bị chặn"
                          : "Hoạt động"
                      }
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Thời gian tạo"
                      value={formatDateViVN(account?.createdAt || "")}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Thời gian chỉnh sửa"
                      value={formatDateViVN(account?.updatedAt || "")}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  {account?.address && (
                    <>
                      <Grid item md={4}>
                        <TextField
                          label="Tỉnh, Thành phố"
                          value={account?.address[0]?.provinceLevel || "..."}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Quận, Huyện"
                          value={account?.address[0]?.districtLevel || "..."}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Phường, Xã"
                          value={account?.address[0]?.communeLevel || "..."}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          label="Đia chỉ cụ thể"
                          value={account?.address[0]?.detail || "..."}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{ readOnly: true }}
                          multiline
                          minRows={2}
                          maxRows={4}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Stack alignItems="flex-end" sx={{ marginTop: "20px" }}>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                      color: `${theme.color.red} !important`,
                      border: `1px solid ${theme.color.red} !important`,
                      textTransform: "unset",
                      padding: "6px 20px",
                      width: "max-content",
                    }}
                  >
                    Đóng
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
});
