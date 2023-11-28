import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SumOrderChart, SumRevenueChart } from '@components/Charts';
import useStats from '@hooks/useStats';
import { SearchStats } from '@models/Statistic';
import { Form, Formik, useFormikContext } from 'formik';
import { DatetimePickerCustom } from '@components/Common';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const listSplitBy = [
  { name: 'Ngày', value: 'day' },
  { name: 'Tuần', value: 'week' },
  { name: 'Tháng', value: 'month' },
  { name: 'Năm', value: 'year' },
];

const ToggleSplit = () => {
  const { setFieldValue, values } = useFormikContext<SearchStats>();

  return (
    <ToggleButtonGroup
      color='primary'
      value={values.splitBy}
      exclusive
      onChange={(_, newValue) => setFieldValue('splitBy', newValue)}
      aria-label='Platform'
    >
      {listSplitBy.map((item) => (
        <ToggleButton key={item.value} value={item.value}>{item.name}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

const StatisticCharts = () => {
  const { stats } = useStats();

  return (
    <Box sx={{ p: '15px 20px', bgcolor: '#fff', borderRadius: '6px' }}>
      <Formik
        initialValues={new SearchStats()}
        onSubmit={() => {
        }}
      >
        {({ values }) => {
          return (
            <Form style={{ marginBottom: '25px' }}>
              <Stack direction='row' alignItems='center' justifyContent='space-between' mb='10px'>
                <Typography fontWeight={600} fontSize='20px' mb={3}>Báo cáo thống kê</Typography>
                <ToggleSplit />
              </Stack>
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <DatetimePickerCustom label='Từ ngày' name='fromDate' />
                </Grid>
                <Grid item md={3}>
                  <DatetimePickerCustom label='Đến ngày' name='toDate' />
                </Grid>
                <Grid item md={1}>
                  <IconButton aria-label="search-stats">
                    <SearchRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <Grid container spacing={4} columns={18}>
        <Grid item md={12}>
          <Typography variant='h6' fontSize='1rem' fontWeight={600} mb={2}>
            1. Doanh thu
          </Typography>
          <SumRevenueChart />
        </Grid>
        <Grid item md={6}>
          <Typography variant='h6' fontSize='1rem' fontWeight={600} mb={2}>
            2. Đơn hàng
          </Typography>
          <SumOrderChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticCharts;
