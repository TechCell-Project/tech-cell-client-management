'use client';

import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { HashLoader } from 'react-spinners';

export const LoadingSection = ({
  isLoading,
  heightSection = 600,
}: {
  isLoading: boolean;
  heightSection?: number;
}) => {
  const theme = useTheme();

  return (
    <Stack width="100%" height={heightSection} justifyContent="center" alignItems="center" gap={2}>
      <HashLoader color={theme.color.red} loading={isLoading} size={45} speedMultiplier={0.8} />
      <Typography variant="caption" fontWeight={600}>
        Đang tải ...
      </Typography>
    </Stack>
  );
};
