'use client';

import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface Props {
  label: string;
  content?: string;
  stylesLabel?: React.CSSProperties;
  titleNoContent?: string;
  unit?: React.ReactNode;
}

export const TextViewCustom = memo((
  {
    label,
    content,
    titleNoContent = '.......',
    stylesLabel,
    unit,
  }: Props) => {

  return (
    <Typography
      sx={{ ...stylesLabel, fontSize: '15px' }}
    >
      {label}:
      <b style={{ fontSize: '15px', fontWeight: 500 }}> {content ?? titleNoContent} </b>
      {unit && unit}
    </Typography>
    // <Stack flexDirection='row' alignItems='center' justifyContent='flex-start' gap='8px' width='100%'>
    //   <Typography sx={{ ...stylesLabel, fontSize: '15px' }}>{label}:</Typography>
    //   <Stack flexDirection='row' alignItems='center' gap='5px'>
    //     <Typography sx={{
    //       ...stylesContent,
    //       fontSize: '15px',
    //       fontWeight: 500,
    //     }}
    //     >
    //       {content ?? titleNoContent}
    //     </Typography>
    //     {unit && unit}
    //   </Stack>
    // </Stack>
  );
});