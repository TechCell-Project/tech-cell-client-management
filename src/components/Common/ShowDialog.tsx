"use client";

import React, { FC, memo } from "react";
import {
  useTheme,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { IDialog } from "@interface/common";

export const ShowDialog: FC<IDialog> = memo((props) => {
  const theme = useTheme();

  return (
    <Dialog
      open={props.isOpen}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="dialog-description"
      sx={{ "& .MuiPaper-root.MuiDialog-paper": props.dialogStyle }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
        <Typography variant="body1" fontWeight={600} fontSize="17px">
          {props.dialogTitle}
        </Typography>
      </DialogTitle>
      {props.dialogDesc && (
        <DialogContent>
          <DialogContentText id="dialog-description">
            {props.dialogDesc}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions sx={{ padding: "0 24px 16px 24px", gap: "10px" }}>
        {props.children}
      </DialogActions>
    </Dialog>
  );
});
