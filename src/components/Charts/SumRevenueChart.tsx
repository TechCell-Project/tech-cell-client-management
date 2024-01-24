import Box from '@mui/material/Box';
import { formatWithCommas } from '@utils/index';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from './ReduceRecharts';
import { useAppSelector } from '@store/store';

export const SumRevenueChart = () => {
  const { stats } = useAppSelector((state) => state.stats);

  return (
    <Box width='100%' height={400}>
      <ResponsiveContainer>
        <AreaChart
          data={stats ? stats.data : []}
          margin={{
            top: 10,
            right: 30,
            left: 35,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='dateString' />
          <YAxis tickFormatter={formatWithCommas} />
          <Tooltip
            label='Tháng'
            formatter={(value) => `${formatWithCommas(Number(value))}`}
          />
          <Legend />
          <Area type='monotone' dataKey='revenue' fill='#FF6666' />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
