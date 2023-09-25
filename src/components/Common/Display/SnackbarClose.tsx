'use client';

import { SnackbarKey, useSnackbar } from 'notistack';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const SnackbarClose = ({ key }: { key: SnackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(key)}>
      <CloseRoundedIcon sx={{ fill: '#fff' }} />
    </IconButton>
  );
};
