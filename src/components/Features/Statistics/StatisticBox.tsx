import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { formatWithCommas } from '@utils/index';
import { useAppSelector } from '@store/store';
import { Statistic } from '@models/Statistic';

interface BoxProps {
  name: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  isUpper?: boolean;
  isLower?: boolean;
}

const BoxRender = ({ name, value, icon, isLower, isUpper }: BoxProps) => {
  const theme = useTheme();

  const renderTrend = () => {
    return (
      <>
        {isLower && (
          <Icon fontSize='small'>
            <TrendingDownRoundedIcon sx={{ fill: theme.color.red }} fontSize='small' />
          </Icon>
        )}
        {isUpper && (
          <Icon fontSize='small'>
            <TrendingUpRoundedIcon sx={{ fill: theme.color.green }} fontSize='small' />
          </Icon>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        color: theme.color.black,
        p: '20px',
        borderRadius: '6px',
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
      }}
    >
      <Stack flexDirection='column' gap={1} alignItems='center' justifyContent='center'>
        <IconButton
          aria-label='statistic'
          sx={{
            backgroundColor: theme.color.lightRed,
            padding: '10px',
            borderRadius: '8px',
            mb: '6px',
          }}
        >
          {icon}
        </IconButton>
        <Typography
          variant='h5'
          fontWeight={600}
          fontSize='1.3rem'
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {value}
        </Typography>
        <Stack flexDirection='row' gap={1} alignItems='center'>
          <Typography variant='caption' fontWeight={600}>
            {name}
          </Typography>
          {renderTrend()}
        </Stack>
      </Stack>
    </Box>
  );
};

const StatisticBox = () => {
  const theme = useTheme();
  const { stats, isLoading } = useAppSelector((state) => state.stats);

  const renderSkeletonText = () => {
    return <Skeleton variant='text' sx={{ fontSize: '1.3rem' }} />;
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <BoxRender
            name='Tổng doanh thu'
            icon={<PaidRoundedIcon sx={{ fill: theme.color.red }} />}
            value={isLoading ? renderSkeletonText() : formatWithCommas((stats as Statistic)?.totalRevenue)}
            // isUpper
          />
        </Grid>
        <Grid item md={3}>
          <BoxRender
            name='Doanh số trong tuần'
            icon={<AttachMoneyRoundedIcon sx={{ fill: theme.color.red }} />}
            value={formatWithCommas(9920000)}
            // isLower
          />
        </Grid>
        <Grid item md={3}>
          <BoxRender
            name='Tổng số mặt hàng'
            icon={<PhoneIphoneRoundedIcon sx={{ fill: theme.color.red }} />}
            value={6}
          />
        </Grid>
        <Grid item md={3}>
          <BoxRender
            name='Tổng hóa đơn'
            icon={<SellRoundedIcon sx={{ fill: theme.color.red }} />}
            value={isLoading ? renderSkeletonText() : (stats as Statistic)?.totalOrders ?? 0}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default StatisticBox;
