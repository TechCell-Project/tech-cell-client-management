import React from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const CustomLoadingOverLay = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        '& .MuiLinearProgress-root': {
          bgcolor: theme.color.lightRed,
        },
        '& .MuiLinearProgress-root .MuiLinearProgress-bar': {
          bgcolor: theme.color.red,
        },
      }}
    >
      <LinearProgress />
    </Box>
  );
};
