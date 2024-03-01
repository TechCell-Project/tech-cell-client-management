import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SumOrderChart, SumRevenueChart } from '@components/Charts';
import useStats from '@hooks/useStats';
import { SearchStats } from '@models/Statistic';
import { Form, Formik, useFormikContext } from 'formik';
import { DatetimePickerCustom, IconBtnCustom } from '@components/Common';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { TimeSplit } from '@constants/enum';
import { LIST_SPLIT_BY } from '@constants/options';
import { ShowSnackbar } from '@components/Common/Display/ShowSnackbar';

const ToggleSplit = () => {
  const { setFieldValue, values, handleSubmit } = useFormikContext<SearchStats>();

  return (
    <ToggleButtonGroup
      color='primary'
      value={values.splitBy}
      exclusive
      onChange={(_, newValue: TimeSplit) => {
        setFieldValue('splitBy', newValue).then();
        handleSubmit();
      }}
      aria-label='Platform'
    >
      {LIST_SPLIT_BY.map((item) => (
        <ToggleButton key={item.value} value={item.value as {}}>{item.name}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

const StatisticCharts = () => {
  const { handleSearchStats, initialDate, isLoading, ok } = useStats();
  const [showSnack, setShowSnack] = useState({
    isOpen: false,
    message: '',
  });

  return (
    <>
      <Box sx={{ p: '15px 20px', bgcolor: '#fff', borderRadius: '6px' }}>
        <Formik
          initialValues={initialDate}
          onSubmit={(values) => {
            handleSearchStats(values);
          }}
        >
          {({ values }) => (
            <Form style={{ marginBottom: '25px' }}>
              <Stack direction='row' alignItems='center' justifyContent='space-between' mb='10px'>
                <Typography fontWeight={600} fontSize='20px'>Báo cáo thống kê</Typography>
                <ToggleSplit />
              </Stack>
              <Grid container spacing={3} mt={2}>
                <Grid item md={3}>
                  <DatetimePickerCustom label='Từ ngày' name='fromDate' />
                </Grid>
                <Grid item md={3}>
                  <DatetimePickerCustom label='Đến ngày' name='toDate' />
                </Grid>
                <Grid item md={2}>
                  <Stack direction='row' justifyContent='flex-start' gap={2}>
                    <IconBtnCustom
                      icon={<SearchRoundedIcon />}
                      type='submit'
                      tooltip='Tìm báo cáo'
                      styles={{ cursor: isLoading ? 'wait' : 'pointer' }}
                      onClick={() => setShowSnack({
                        isOpen: true,
                        message: ok ? 'Tìm báo cáo thành công!' : 'Tìm báo cáo thất bại',
                      })}
                    />
                    <IconBtnCustom
                      icon={<RestartAltRoundedIcon />}
                      tooltip='Tính lại báo cáo'
                      styles={{ cursor: isLoading ? 'wait' : 'pointer' }}
                      onClick={() => {
                        handleSearchStats({ ...values, refreshCache: true });
                        setShowSnack({
                          isOpen: true,
                          message: ok ? 'Tính lại báo cáo thành công!' : 'Tính lại báo cáo thất bại',
                        });
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Grid container spacing={4} columns={18} pb={5}>
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

      {showSnack.isOpen && !isLoading && (
        <ShowSnackbar
          isOpen={showSnack.isOpen}
          handleClose={() => setShowSnack({ isOpen: false, message: '' })}
          message={showSnack.message}
        />
      )}
    </>
  );
};

export default StatisticCharts;
