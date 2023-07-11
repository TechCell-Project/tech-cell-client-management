"use client";

import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import { ISnackbarAlert } from "@interface/common";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarMessage = ({
  type,
  message,
  timeout = 5000,
}: ISnackbarAlert) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      setOpen(false);
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={timeout}
      onClose={handleClose}
      TransitionComponent={TransitionRight}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const showSnack = ({
  type,
  message,
  timeout = 5000,
}: ISnackbarAlert) => {
  return <SnackbarMessage type={type} message={message} timeout={timeout} />;
};
