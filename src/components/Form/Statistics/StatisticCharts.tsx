import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SumOrderChart, SumRevenueChart } from '@components/Charts';

const StatisticCharts = () => {
  return (
    <Grid container spacing={4} columns={18}>
      <Grid item md={12}>
        <Box sx={{ p: '15px 20px', bgcolor: '#fff', borderRadius: '6px' }}>
          <Typography variant="h6" fontSize="1rem" fontWeight={600} mb={2}>
            Thống kê doanh thu
          </Typography>
          <SumRevenueChart />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box sx={{ p: '15px 20px', bgcolor: '#fff', borderRadius: '6px' }}>
          <Typography variant="h6" fontSize="1rem" fontWeight={600} mb={2}>
            Đơn hàng
          </Typography>
          <SumOrderChart />
        </Box>
      </Grid>
    </Grid>
  );
};

export default StatisticCharts;
