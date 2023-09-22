import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { SumRevenueChart } from '@components/Charts';

const StatisticCharts = () => {
  return (
    <Grid container spacing={4}>
      <Grid item md={8}>
        <Box sx={{ p: '15px 20px 0 20px', bgcolor: '#fff', borderRadius: "6px" }}>
          <Typography variant="h6" fontSize="1.1rem" fontWeight={600} mb={2}>Thống kê doanh thu</Typography>
          <SumRevenueChart />
        </Box>
      </Grid>
      <Grid item md={4}></Grid>
    </Grid>
  );
};

export default StatisticCharts;
