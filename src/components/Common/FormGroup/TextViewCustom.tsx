'use client';

import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface Props {
  label: string;
  content: string | number;
  stylesLabel?: React.CSSProperties;
  stylesContent?: React.CSSProperties;
  titleNoContent?: string;
}

export const TextViewCustom = memo((
  {
    label,
    content,
    titleNoContent = '.......',
    stylesLabel,
    stylesContent,
  }: Props) => {

  return (
    <Stack flexDirection='row' alignItems='center' justifyContent='center' gap='10px'>
      <Typography sx={{ ...stylesLabel }}>{label}</Typography>
      <Typography sx={{ ...stylesContent }}>{content ?? titleNoContent}</Typography>
    </Stack>
  );
});