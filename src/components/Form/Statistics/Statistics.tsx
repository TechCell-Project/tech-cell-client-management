import React from 'react';
import Stack from '@mui/material/Stack';
import StatisticBox from './StatisticBox';
import StatisticCharts from './StatisticCharts';

export const Statistics = () => {
  return (
    <Stack width="100%" flexDirection="column" gap={4}>
      <StatisticBox />
      <StatisticCharts/>
    </Stack>
  );
};
