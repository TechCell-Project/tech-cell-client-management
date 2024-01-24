import React from 'react';
import { DialogAction as SnackbarAction } from '@interface/common';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const ShowSnackbar = ({ isOpen, handleClose, message }: SnackbarAction & { message: string }) => {
  const handleCloseSnackbar = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    handleClose();
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleCloseSnackbar}
      >
        <CloseRoundedIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
      action={action}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      sx={{
        '& .MuiSnackbarContent-root': {
          bgcolor: '#43A047',
          color: '#fff',
          fontWeight: 500,
        },
      }}
    />
  );
};