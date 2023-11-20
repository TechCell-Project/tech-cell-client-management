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

const data = [
  { month: 'Tháng 1', revenue: 1000000 },
  { month: 'Tháng 2', revenue: 1200000 },
  { month: 'Tháng 3', revenue: 1230000 },
  { month: 'Tháng 4', revenue: 9004040 },
  { month: 'Tháng 5', revenue: 6020300 },
  { month: 'Tháng 6', revenue: 1020000 },
  { month: 'Tháng 7', revenue: 1324000 },
  { month: 'Tháng 8', revenue: 1402000 },
  { month: 'Tháng 9', revenue: 1030000 },
  { month: 'Tháng 10', revenue: 12000000 },
  { month: 'Tháng 11', revenue: 15000000 },
  { month: 'Tháng 12', revenue: 16900000 },
];

export const SumRevenueChart = () => {
  return (
    <Box width="100%" height={400}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 35,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatWithCommas} />
          <Tooltip
            label="Tháng"
            formatter={(value) => `${formatWithCommas(Number(value))}`}
          />
          <Legend />
          <Area type="monotone" dataKey="revenue" fill="#FF6666" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
