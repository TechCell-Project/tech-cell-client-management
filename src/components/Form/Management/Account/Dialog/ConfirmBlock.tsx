"use client";

import React, { FC, useState, memo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
} from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { IConfirmDialog } from "@interface/common";

export const ConfirmBlock: FC<IConfirmDialog> = memo((props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    props.handleClick();
    handleClose();
  };

  return (
    <>
      {!props.disable && (
        <Tooltip title={props.tooltip}>
          <IconButton
            aria-label="confirm"
            size="medium"
            onClick={handleClickOpen}
          >
            {props.icon}
          </IconButton>
        </Tooltip>
      )}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="dialog-description"
        sx={{ "& .MuiPaper-root.MuiDialog-paper": { maxWidth: 500 } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
          <Typography variant="body1" fontWeight={600} fontSize="17px">
            {props.dialogTitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            {props.dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "0 24px 16px 24px", gap: "10px" }}>
          <Button onClick={handleClose} sx={{ textTransform: "unset" }}>
            Hủy bỏ
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{
              bgcolor: `${theme.color.red} !important`,
              color: "#fff !important",
              textTransform: "unset",
              padding: "6px 20px",
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
