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
  Stack,
  IconButton,
} from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IDialog } from "@interface/common";

export const ShowDialog: FC<IDialog> = memo((props) => {
  const theme = useTheme();

  const handleCloseDialog = (
    event: React.SyntheticEvent<Element, Event>,
    reason: string
  ) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    props.handleClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby="dialog-description"
      sx={{ "& .MuiPaper-root.MuiDialog-paper": props.dialogStyle }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack flexDirection="row" justifyContent="flex-start" alignItems="center" gap={2}>
          <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
          <Typography variant="body1" fontWeight={600} fontSize="17px">
            {props.dialogTitle}
          </Typography>
        </Stack>
        <IconButton
          onClick={props.handleClose}
          aria-label="close"
          sx={{ fill: theme.color.black }}
        >
          <CloseRoundedIcon />
        </IconButton>
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
